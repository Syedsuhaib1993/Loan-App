import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminTable from "../components/AdminTable";
import {
  PieChart,
  Pie,
  Cell,
  Legend,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";

export default function Admin() {
  const MONTHLY_LIMIT = 1000000;
  const [applications, setApplications] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get("http://localhost:8080/api/form");
      setApplications(res.data.loan);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`http://localhost:8080/api/${id}`, { status: "Approved" });
      setToastMessage("Application approved!");
      fetchApplications();
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${id}`);
      setToastMessage("Application deleted!");
      fetchApplications();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = async (id, newAmount) => {
    try {
      const response = await axios.patch(`http://localhost:8080/api/${id}`, {
        amount: newAmount,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id ? { ...app, amount: response.data.updatedLoan.amount } : app
        )
      );
      console.log("Loan updated:", response.data);
    } catch (error) {
      console.error("Error updating loan:", error);
    }
  };

  const approvedTotal = applications
    .filter((a) => a.status === "Approved")
    .reduce((sum, a) => sum + a.amount, 0);
  const remaining = MONTHLY_LIMIT - approvedTotal;

  const pieData = [
    { name: "Approved", value: approvedTotal },
    { name: "Remaining", value: remaining },
  ];

  const loanTypes = ["Home Loan", "Car Loan", "Education Loan"];
  const barData = loanTypes.map((type) => ({
    type,
    total: applications
      .filter((a) => a.status === "Approved" && a.type === type)
      .reduce((sum, a) => sum + a.amount, 0),
  }));

  const COLORS = ["#00C49F", "#FF8042"];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#12565F]">
        Admin Dashboard
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Table - 3/5 width */}
        <div className="w-full md:w-3/5 bg-white p-6 rounded shadow overflow-auto">
          <h2 className="text-xl text-center font-bold mb-4">Applications</h2>
          <AdminTable
            applications={applications}
            onApprove={handleApprove}
            onDelete={handleDelete}
            onEdit={handleEdit}
            showToast={setToastMessage}
          />
        </div>

        {/* Charts - 2/5 width */}
        <div className="w-full md:w-2/5 items-center flex flex-col gap-8 bg-white">
          {/* Pie Chart */}
          <div className="bg-white p-4 w-full  rounded shadow">
            <h2 className="text-xl font-bold mb-4">Monthly Limit</h2>
            <PieChart width={400} height={300}>
              <Pie
                data={pieData}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                label
                dataKey="value"
              >
                {pieData.map((_, i) => (
                  <Cell key={i} fill={COLORS[i % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </div>

          {/* Bar Chart */}
          <div className="bg-white p-6 rounded shadow">
            <h2 className="text-xl font-bold mb-4">Approved by Loan Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="total"
                  fill="#12565F"
                  barSize={40}
                  radius={[10, 10, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-[#12565F] text-white px-4 py-3 rounded shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
