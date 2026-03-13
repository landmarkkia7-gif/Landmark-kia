import React, { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import { collection, getDocs, orderBy, query, doc, updateDoc } from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import { db } from "../lib/firebase";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";

/* =====================
   TABLE STYLES
===================== */
const customStyles = {
  rows: { style: { minHeight: "55px" } },
  headCells: {
    style: {
      paddingLeft: "8px",
      paddingRight: "8px",
      backgroundColor: "black",
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

/* =====================
   EXPORT BUTTON
===================== */
const Export = ({ onExport }) => (
  <button
    className="px-5 py-1.5 text-sm text-white bg-green-600 rounded"
    onClick={onExport}
  >
    Export to Excel
  </button>
);

/* =====================
   UPDATE STATUS FUNCTION
===================== */
const updateStatus = async (id, status) => {
  try {
    const ref = doc(db, "serviceAppointments", id);

    await updateDoc(ref, {
      status: status,
    });

    toast.success("Status updated successfully");
  } catch (error) {
    console.error(error);
    toast.error("Failed to update status");
  }
};

const EditableStatus = ({ row }) => {
  const [value, setValue] = useState(row.status || "");
  const [isEditing, setIsEditing] = useState(!row.status); // if empty start editing

  const handleSave = async () => {
    await updateStatus(row.id, value);
    setIsEditing(false);
  };

  return (
    <div className="flex flex-col w-full gap-1">
      <textarea
        value={value}
        disabled={!isEditing}
        onChange={(e) => setValue(e.target.value)}
        className="w-full px-2 py-1 text-sm border rounded"
        placeholder="Write review"
      />

      {/* If editing show Save */}
      {isEditing && value.trim() !== "" && (
        <button
          onClick={handleSave}
          className="px-2 py-1 text-xs text-white bg-blue-600 rounded"
        >
          Save
        </button>
      )}

      {/* If not editing show Edit */}
      {!isEditing && (
        <button
          onClick={() => setIsEditing(true)}
          className="px-2 py-1 text-xs text-white bg-gray-600 rounded"
        >
          Edit
        </button>
      )}
    </div>
  );
};
/* =====================
   MAIN COMPONENT
===================== */
function ServiceDashboard() {
  const { city } = useParams();
  const selectedCity = city?.toUpperCase() || "ALL";

  const [active, setActive] = useState(true);
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const rowsPerPage = 10;
  const handleActive = () => setActive(!active);

  /* =====================
     FETCH DATA
  ===================== */
  useEffect(() => {
    const fetchData = async () => {
      try {
        const q = query(
          collection(db, "serviceAppointments"),
          orderBy("timestamp", "desc")
        );

        const snap = await getDocs(q);

        const list = snap.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));

        setData(list);
        setFilteredData(list);
      } catch (error) {
        console.error(error);
        toast.error("Failed to load service appointments");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  /* =====================
     DATE FORMAT
  ===================== */
  const formatTimestamp = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-CA");
  };

  /* =====================
     FILTER BY CITY
  ===================== */
  useEffect(() => {
    const result =
      selectedCity === "ALL"
        ? data
        : data.filter(
            (item) => item.city?.toUpperCase() === selectedCity
          );

    setFilteredData(result);
  }, [selectedCity, data]);

  /* =====================
     EXCEL EXPORT
  ===================== */
  const downloadExcel = useCallback(() => {
    const formatted = filteredData.map((row, index) => ({
      ID: index + 1,
      Name: row.name,
      Email: row.email,
      Phone: row.mobile,
      Model: row.model,
      City: row.city,
      Pickup: row.pickup,
      CreatedAt: formatTimestamp(row.timestamp),
      Status: row.status || "",
    }));

    const worksheet = XLSX.utils.json_to_sheet(formatted);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Service Appointments");

    XLSX.writeFile(
      workbook,
      `${selectedCity}-service-appointments.xlsx`
    );
  }, [filteredData, selectedCity]);

  const actionsMemo = useMemo(
    () => <Export onExport={downloadExcel} />,
    [downloadExcel]
  );

  /* =====================
     TABLE COLUMNS
  ===================== */
  const columns = [
    {
      name: "ID",
      selector: (_, index) =>
        (currentPage - 1) * rowsPerPage + index + 1,
      width: "70px",
    },
    { name: "Name", selector: (row) => row.name },
    { name: "Email", selector: (row) => row.email },
    { name: "Phone", selector: (row) => row.mobile },
    { name: "Model", selector: (row) => row.model },
    { name: "City", selector: (row) => row.city },
    { name: "Pickup", selector: (row) => row.pickup },

    {
      name: "Customer Review",
      cell: (row) => <EditableStatus row={row} />,
    },

    {
      name: "Created At",
      selector: (row) => formatTimestamp(row.timestamp),
      sortable: true,
    },
  ];

  /* =====================
     RENDER
  ===================== */
  return (
    <div className="flex flex-row h-screen">
      <Sidebar active={active} />
      <div className="flex-auto overflow-auto bg-gray-50">
        <Navbar handleActive={handleActive} />

        <div className="mx-5 mt-5">
          {loading ? (
            <CgSpinner
              className="flex mx-auto animate-spin"
              size={50}
              color="#7e22ce"
            />
          ) : (
            <DataTable
              title={`Service Appointments - ${selectedCity}`}
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

export default ServiceDashboard;