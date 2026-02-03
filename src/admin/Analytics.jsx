import React, { useState, useEffect, useMemo } from "react";
import Sidebar from "./sidebar";
import Navbar from "./navbar";
import { Line, Bar } from "react-chartjs-2";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../lib/firebase";
import * as XLSX from "xlsx";

import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const Analytics = () => {
  const [active, setActive] = useState("analytics");
  const [leads, setLeads] = useState([]);
  const [rangeType, setRangeType] = useState("weekly"); // weekly | monthly | yearly
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");

  /* ======================
     REALTIME FIRESTORE
  ====================== */
  useEffect(() => {
    const unsub = onSnapshot(
      collection(db, "serviceAppointments"),
      (snapshot) => {
        setLeads(snapshot.docs.map(doc => doc.data()));
      }
    );
    return () => unsub();
  }, []);

  /* ======================
     DATE RANGE FILTER
  ====================== */
  const filteredLeads = useMemo(() => {
    return leads.filter(l => {
      if (!l.timestamp) return false;
      const d = l.timestamp.toDate();
      if (fromDate && d < new Date(fromDate)) return false;
      if (toDate && d > new Date(toDate + "T23:59:59")) return false;
      return true;
    });
  }, [leads, fromDate, toDate]);

  /* ======================
     SUMMARY COUNTS
  ====================== */
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  const todayLeads = filteredLeads.filter(l => {
    const d = l.timestamp.toDate();
    d.setHours(0, 0, 0, 0);
    return d.getTime() === today.getTime();
  }).length;

  /* ======================
     GROWTH %
  ====================== */
  const getGrowth = (current, previous) => {
    if (previous === 0) return 100;
    return (((current - previous) / previous) * 100).toFixed(1);
  };

  const currentCount = filteredLeads.length;
  const previousCount = leads.length - currentCount;
  const growthPercent = getGrowth(currentCount, previousCount);

  /* ======================
     GRAPH DATA
  ====================== */
  const weeklyGraph = (() => {
    const days = [...Array(7)].map((_, i) => {
      const d = new Date();
      d.setDate(d.getDate() - (6 - i));
      d.setHours(0, 0, 0, 0);
      return d;
    });

    return {
      labels: days.map(d =>
        d.toLocaleDateString("en-IN", { weekday: "short" })
      ),
      data: days.map(day =>
        filteredLeads.filter(l => {
          const d = l.timestamp.toDate();
          d.setHours(0, 0, 0, 0);
          return d.getTime() === day.getTime();
        }).length
      ),
    };
  })();

  const monthlyGraph = (() => {
    const months = [
      "Jan","Feb","Mar","Apr","May","Jun",
      "Jul","Aug","Sep","Oct","Nov","Dec"
    ];
    const counts = Array(12).fill(0);
    filteredLeads.forEach(l => {
      counts[l.timestamp.toDate().getMonth()]++;
    });
    return { labels: months, data: counts };
  })();

  const yearlyGraph = (() => {
    const map = {};
    filteredLeads.forEach(l => {
      const y = l.timestamp.toDate().getFullYear();
      map[y] = (map[y] || 0) + 1;
    });
    return { labels: Object.keys(map), data: Object.values(map) };
  })();

  const graphMap = {
    weekly: weeklyGraph,
    monthly: monthlyGraph,
    yearly: yearlyGraph,
  };

  /* ======================
     MODEL & CITY
  ====================== */
  const modelCounts = {};
  const cityCounts = {};

  filteredLeads.forEach(l => {
    modelCounts[l.model] = (modelCounts[l.model] || 0) + 1;
    cityCounts[l.city] = (cityCounts[l.city] || 0) + 1;
  });

  /* ======================
     EXCEL EXPORT
  ====================== */
  const exportExcel = () => {
    const data = filteredLeads.map(l => ({
      Name: l.name,
      Mobile: l.mobile,
      Email: l.email || "",
      Model: l.model,
      City: l.city,
      Pickup: l.pickup,
      Date: l.timestamp.toDate().toLocaleDateString(),
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "Leads");
    XLSX.writeFile(wb, "Leads_Report.xlsx");
  };

  return (
    <div className="flex h-screen bg-gray-100">
      <div className="hidden md:block">
        <Sidebar active={active} />
      </div>

      <div className="flex flex-col flex-1 overflow-hidden">
        <Navbar handleActive={setActive} />

        <div className="flex-1 p-4 space-y-6 overflow-y-auto">

          {/* FILTER BAR */}
          <div className="flex flex-wrap gap-3 p-4 bg-white shadow rounded-xl">
            <input type="date" onChange={e => setFromDate(e.target.value)} className="px-3 py-2 border rounded" />
            <input type="date" onChange={e => setToDate(e.target.value)} className="px-3 py-2 border rounded" />

            <select
              value={rangeType}
              onChange={e => setRangeType(e.target.value)}
              className="px-3 py-2 border rounded"
            >
              <option value="weekly">Weekly</option>
              <option value="monthly">Monthly</option>
              <option value="yearly">Yearly</option>
            </select>

            <button
              onClick={exportExcel}
              className="px-4 py-2 ml-auto text-white bg-green-600 rounded"
            >
              Export Excel
            </button>
          </div>

          {/* SUMMARY */}
          <div className="grid gap-4 sm:grid-cols-3">
            <div className="p-4 bg-white shadow rounded-xl">
              <p className="text-sm text-gray-500">Today</p>
              <p className="text-3xl font-bold">{todayLeads}</p>
            </div>

            <div className="p-4 bg-white shadow rounded-xl">
              <p className="text-sm text-gray-500">Selected Range</p>
              <p className="text-3xl font-bold">{currentCount}</p>
            </div>

            <div className="p-4 bg-white shadow rounded-xl">
              <p className="text-sm text-gray-500">Growth</p>
              <p className={`text-3xl font-bold ${growthPercent >= 0 ? "text-green-600" : "text-red-600"}`}>
                {growthPercent}%
              </p>
            </div>
          </div>

          {/* GRAPH */}
          <div className="p-6 bg-white shadow rounded-xl">
            <div className="h-[300px]">
              <Line
                data={{
                  labels: graphMap[rangeType].labels,
                  datasets: [{
                    data: graphMap[rangeType].data,
                    borderColor: "#2563eb",
                    backgroundColor: "rgba(37,99,235,.15)",
                    fill: true,
                    tension: 0.4,
                  }],
                }}
                options={{ maintainAspectRatio: false }}
              />
            </div>
          </div>

          {/* BAR CHARTS */}
          <div className="grid gap-6 md:grid-cols-2">
            <div className="p-6 bg-white shadow rounded-xl">
              <h3 className="mb-2 font-semibold">Leads by Model</h3>
              <div className="h-[260px]">
                <Bar
                  data={{
                    labels: Object.keys(modelCounts),
                    datasets: [{ data: Object.values(modelCounts), backgroundColor: "#3b82f6" }],
                  }}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>

            <div className="p-6 bg-white shadow rounded-xl">
              <h3 className="mb-2 font-semibold">Leads by City</h3>
              <div className="h-[260px]">
                <Bar
                  data={{
                    labels: Object.keys(cityCounts),
                    datasets: [{ data: Object.values(cityCounts), backgroundColor: "#16a34a" }],
                  }}
                  options={{ maintainAspectRatio: false }}
                />
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default Analytics;
