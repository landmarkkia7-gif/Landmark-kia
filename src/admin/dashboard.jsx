import React, { useEffect, useState, useMemo, useCallback } from "react";
import Navbar from "./navbar";
import Sidebar from "./sidebar";
import {
  collection,
  getDocs,
  orderBy,
  query,
  doc,
  updateDoc,
  onSnapshot,
} from "firebase/firestore";
import { CgSpinner } from "react-icons/cg";
import { db } from "../lib/firebase";
import DataTable from "react-data-table-component";
import toast from "react-hot-toast";
import * as XLSX from "xlsx";
import { useParams } from "react-router-dom";

/* ===================== STYLES ===================== */
const customStyles = {
  rows: { style: { minHeight: "48px" } },

  headCells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "6px",
      backgroundColor: "black",
      color: "white",
      fontSize: "14px",
      whiteSpace: "nowrap",
    },
  },

  cells: {
    style: {
      paddingLeft: "6px",
      paddingRight: "6px",
      borderRight: "1px solid #eee",
      whiteSpace: "nowrap",
    },
  },
};

/* ===================== EXPORT ===================== */
const Export = ({ onExport }) => (
  <button
    className="px-4 py-1.5 text-sm text-white bg-green-600 rounded"
    onClick={onExport}
  >
    Export
  </button>
);

/* ===================== UPDATE STATUS ===================== */
const updateStatus = async (id, status) => {
  try {
    await updateDoc(doc(db, "serviceAppointments", id), { status });
    toast.success("Status updated");
  } catch {
    toast.error("Update failed");
  }
};

/* ===================== EDITABLE STATUS ===================== */
const EditableStatus = ({ row }) => {
  const [value, setValue] = useState(row.status || "");
  const [edit, setEdit] = useState(!row.status);

  const save = async () => {
    await updateStatus(row.id, value);
    setEdit(false);
  };

  return (
    <div className="flex flex-col gap-1">
      <textarea
        value={value}
        disabled={!edit}
        onChange={(e) => setValue(e.target.value)}
        className="px-8 py-1 text-sm border rounded"
      />
      {edit ? (
        <button
          onClick={save}
          className="px-2 py-1 text-xs text-white bg-blue-600 rounded"
        >
          Save
        </button>
      ) : (
        <button
          onClick={() => setEdit(true)}
          className="px-2 py-1 text-xs text-white bg-gray-500 rounded"
        >
          Edit
        </button>
      )}
    </div>
  );
};

/* ===================== MAIN ===================== */
function ServiceDashboard() {
  const { city } = useParams();
  const selectedCity = city?.toUpperCase() || "ALL";
  const [active, setActive] = useState("ServiceDashboard");
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState(1);

  const [prevCount, setPrevCount] = useState(0);
  const [newLeadIds, setNewLeadIds] = useState(new Set());
  const [todayCount, setTodayCount] = useState(0);
  const [duplicateNumbers, setDuplicateNumbers] = useState(new Set());

  const rowsPerPage = 10;

  /* ===================== REALTIME ===================== */
  useEffect(() => {
    const q = query(
      collection(db, "serviceAppointments"),
      orderBy("timestamp", "desc")
    );

    const unsub = onSnapshot(q, (snap) => {
      const list = snap.docs.map((d) => ({
        id: d.id,
        ...d.data(),
      }));

      // NEW LEAD DETECT
      if (prevCount && list.length > prevCount) {
        const newItems = list.slice(0, list.length - prevCount);
        const ids = new Set(newItems.map((i) => i.id));
        setNewLeadIds(ids);

        const latest = newItems[0];
        toast(`🚗 ${latest.name} - ${latest.mobile}`);

        const audio = new Audio("/notification.wav");
        audio.play().catch(() => { });

        setTimeout(() => setNewLeadIds(new Set()), 10000);
      }

      setPrevCount(list.length);

      // TODAY COUNT
      const today = new Date().toISOString().split("T")[0];
      const todayLeads = list.filter((i) => {
        if (!i.timestamp?.seconds) return false;
        return (
          new Date(i.timestamp.seconds * 1000)
            .toISOString()
            .split("T")[0] === today
        );
      });
      setTodayCount(todayLeads.length);

      // DUPLICATES
      const map = {};
      const dup = new Set();
      list.forEach((i) => {
        if (!i.mobile) return;
        if (map[i.mobile]) dup.add(i.mobile);
        else map[i.mobile] = true;
      });
      setDuplicateNumbers(dup);

      setData(list);
      setLoading(false);
    });

    return () => unsub();
  }, [prevCount]);

  /* ===================== FILTER ===================== */
  useEffect(() => {
    setFilteredData(
      selectedCity === "ALL"
        ? data
        : data.filter(
          (i) => i.city?.toUpperCase() === selectedCity
        )
    );
  }, [data, selectedCity]);

  /* ===================== DATE ===================== */
  const formatDate = (t) =>
    t?.seconds
      ? new Date(t.seconds * 1000).toLocaleDateString("en-CA")
      : "N/A";

  /* ===================== REFRESH ===================== */
  const refresh = async () => {
    setLoading(true);
    const snap = await getDocs(
      query(collection(db, "serviceAppointments"), orderBy("timestamp", "desc"))
    );
    const list = snap.docs.map((d) => ({ id: d.id, ...d.data() }));
    setData(list);
    toast.success("Refreshed");
    setLoading(false);
  };

  /* ===================== EXPORT ===================== */
  const exportExcel = useCallback(() => {
    const ws = XLSX.utils.json_to_sheet(
      data.map((r, i) => ({
        ID: i + 1,
        Name: r.name,
        Email: r.email,
        Phone: r.mobile,
        City: r.city,
        Model: r.model,
        Pickup: r.pickup,

        // ✅ ADD THIS
        CustomerReview: r.status || "",

        Date: formatDate(r.timestamp),
      }))
    );

    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Service Data");

    XLSX.writeFile(wb, `ALL-Service-Data.xlsx`);
  }, [data]);


  const formatTimestamp = (timestamp) => {
    if (!timestamp?.seconds) return "N/A";
    return new Date(timestamp.seconds * 1000).toLocaleDateString("en-CA");
  };


  const actions = useMemo(
    () => (
      <div className="flex gap-2">
        <button
          onClick={refresh}
          className="px-3 py-1 text-white bg-blue-600 rounded"
        >
          Refresh
        </button>
        <Export onExport={exportExcel} />
      </div>
    ),
    [exportExcel]
  );

  const columns = [
  {
    name: "ID",
    selector: (_, i) =>
      (currentPage - 1) * rowsPerPage + i + 1,
    width: "60px",
    center: true,
  },

  {
    name: "Name",
    minWidth: "180px",
    cell: (row) => (
      <div>
        <div className="font-medium">{row.name}</div>
        <div className="flex gap-1 mt-1">
          {newLeadIds.has(row.id) && (
            <span className="px-1 text-xs text-white bg-red-500 rounded">
              NEW
            </span>
          )}
          {duplicateNumbers.has(row.mobile) && (
            <span className="px-1 text-xs text-white bg-yellow-500 rounded">
              DUP
            </span>
          )}
        </div>
      </div>
    ),
  },

  { name: "Email", selector: (row) => row.email, minWidth: "190px" },

  {
    name: "Phone",
    selector: (r) => r.mobile,
    width: "120px",
  },

  {
    name: "City",
    selector: (r) => r.city,
    width: "120px",
  },

  {
    name: "Model",
    selector: (r) => r.model,
    width: "140px",
  },

  {
    name: "Pickup",
    selector: (row) => row.pickup,
    width: "110px",
    center: true,
  },

  {
    name: "Customer Review",
    minWidth: "220px",
    cell: (row) => <EditableStatus row={row} />,
  },

  {
    name: "Created At",
    selector: (row) => formatTimestamp(row.timestamp),
    sortable: true,
    width: "110px",
    center: true,
  },
];

  /* ===================== UI ===================== */
  return (
    <div className="flex">
      <div className="hidden md:block">
        <Sidebar active={active} />
      </div>
      <div className="flex-1 bg-gray-50">
        <Navbar />

        {loading ? (
          <CgSpinner className="mx-auto animate-spin" size={40} />
        ) : (
          <DataTable
            title={`Service - ${selectedCity}`}
            columns={columns}
            data={filteredData}
            pagination
            onChangePage={setCurrentPage}
            customStyles={customStyles}
            actions={actions}
            conditionalRowStyles={[
              {
                when: (row) => newLeadIds.has(row.id),
                style: { backgroundColor: "#dcfce7" },
              },
            ]}
          />
        )}

      </div>
    </div>
  );
}

export default ServiceDashboard;