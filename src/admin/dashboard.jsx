import React, { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { collection, getDocs, orderBy, query } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import { db } from "../lib/firebase";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";

const customStyles = {
  rows: { style: { minHeight: "55px" } },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      backgroundColor: "#7e22ce",
      color: "white",
      fontSize: "15px",
    },
  },
  cells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      borderRight: "1px solid #eaeaea",
    },
  },
};

const Export = ({ onExport }) => (
  <button
    className="px-5 py-1.5 text-sm text-white bg-green-600 rounded"
    onClick={onExport}
  >
    Export to Excel
  </button>
);

function Dashboard() {
  const { city } = useParams();
  const selectedCity = city?.toUpperCase() || "ALL";

  const [active, setActive] = useState(true);
  const [search] = useState("");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [fromDate] = useState("");
  const [toDate] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const rowsPerPage = 10;

  const handleActive = () => setActive(!active);

  useEffect(() => {
    setLoading(true);
    const fetchData = async () => {
      try {
        const q = query(collection(db, "leads"), orderBy("timestamp", "desc"));
        const querySnapshot = await getDocs(q);

        const list = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        const unique = list.filter(
          (lead, index, self) =>
            index ===
            self.findIndex(
              (l) =>
                (l.mobile && l.mobile === lead.mobile) ||
                (l.email && l.email === lead.email)
            )
        );

        setData(unique);
        setFilteredData(unique);
        setLoading(false);
      } catch (error) {
        console.error(error);
        toast.error("Something went wrong!");
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const formatTimestamp = (timestamp) => {
    if (!timestamp?.seconds) return "Invalid date";
    const date = new Date(timestamp.seconds * 1000);
    return date.toLocaleDateString("en-CA");
  };

  /* FIXED FUNCTION */
  const downloadExcel = useCallback(() => {
    const formatted = filteredData.map((row, index) => ({
      ID: index + 1,
      Name: row.name,
      Email: row.email,
      Phone: row.mobile,
      Model: row.model,
      City: row.city ?? "N/A",
      Timestamp: formatTimestamp(row.timestamp),
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Leads");

    const excelBuffer = XLSX.write(workbook, {
      bookType: "xlsx",
      type: "array",
    });

    const blob = new Blob([excelBuffer], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });

    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = `${selectedCity}-leads.xlsx`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }, [filteredData, selectedCity]);

  const actionsMemo = useMemo(
    () => <Export onExport={downloadExcel} />,
    [downloadExcel]
  );

  const columns = [
    {
      name: "ID",
      selector: (row, index) => (currentPage - 1) * rowsPerPage + index + 1,
      width: "70px",
    },
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.mobile },
    { name: "Model", selector: (row) => row.model },
    { name: "City", selector: (row) => row.city ?? "N/A" },
    {
      name: "Timestamp",
      selector: (row) => formatTimestamp(row.timestamp),
      sortable: true,
    },
  ];

  useEffect(() => {
    let result = data.filter((item) => {
      const ts = item.timestamp?.seconds;
      if (!ts) return false;

      const itemDate = new Date(ts * 1000);
      const from = fromDate ? new Date(fromDate) : null;
      const to = toDate ? new Date(toDate) : null;

      const matchSearch =
        item.name?.toLowerCase().includes(search.toLowerCase()) ||
        item.email?.toLowerCase().includes(search.toLowerCase()) ||
        item.mobile?.toLowerCase().includes(search.toLowerCase());

      const matchDate =
        (!from || itemDate >= from) && (!to || itemDate <= to);

      const matchCity =
        selectedCity === "ALL" || item.city?.toUpperCase() === selectedCity;

      return matchSearch && matchDate && matchCity;
    });

    result = result.filter(
      (lead, index, self) =>
        index ===
        self.findIndex(
          (l) =>
            (l.mobile && l.mobile === lead.mobile) ||
            (l.email && l.email === lead.email)
        )
    );

    setFilteredData(result);
  }, [search, fromDate, toDate, selectedCity, data]);

  return (
    <div className="flex flex-row h-screen">
      <Sidebar active={active} />
      <div className="flex-auto overflow-auto bg-gray-50">
        <Navbar handleActive={handleActive} />

        <div className="mx-5 mt-5">
          {loading ? (
            <CgSpinner className="flex mx-auto animate-spin" size={50} color="#7e22ce" />
          ) : (
            <DataTable
              title={`Leads - ${selectedCity}`}
              columns={columns}
              data={filteredData}
              pagination
              paginationPerPage={rowsPerPage}
              onChangePage={(page) => setCurrentPage(page)}
              fixedHeader
              highlightOnHover
              customStyles={customStyles}
              actions={actionsMemo}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
