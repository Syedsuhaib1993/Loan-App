import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminTable from "../components/AdminTable";
import AdminLoanForm from "../components/AdminLoanForm";
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
import EditModal from "../components/EditModal";

export default function Admin() {
  const MONTHLY_LIMIT = 1000000;
  const [applications, setApplications] = useState([]);
  const [toast, setToast] = useState({ message: "", type: "" });

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(50000);

  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);

  const handleEditClick = (id, amount) => {
    setEditId(id);
    setCurrentAmount(amount);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    await handleEdit(editId, currentAmount);
    setToast({ message: "Loan updated!", type: "success" });
    setTimeout(() => setToast({ message: "", type: "" }), 3000);
    setIsModalOpen(false);
  };

  useEffect(() => {
    fetchApplications();
  }, []);

  const fetchApplications = async () => {
    try {
      const res = await axios.get(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/form`);
      setApplications(res.data.loan);
    } catch (error) {
      console.error("Error fetching applications:", error);
    }
  };

  const handleApprove = async (id) => {
    try {
      await axios.patch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/${id}`, {
        status: "Approved",
      });
      setToast({ message: "Application approved!", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
      fetchApplications();
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/${id}`);
      setToast({ message: "Application deleted!", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
      fetchApplications();
    } catch (error) {
      console.error("Error deleting:", error);
    }
  };

  const handleEdit = async (id, newAmount) => {
    try {
      const response = await axios.patch(`${import.meta.env.VITE_API_URL || "http://localhost:8080"}/api/${id}`, {
        amount: newAmount,
      });
      setApplications((prev) =>
        prev.map((app) =>
          app._id === id
            ? { ...app, amount: response.data.updatedLoan.amount }
            : app
        )
      );
      setToast({ message: "Application updated!", type: "success" });
      setTimeout(() => setToast({ message: "", type: "" }), 3000);
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

  const COLORS = ["#10B981", "#F59E0B"];

  return (
    <div className="p-8">
      <h1 className="text-3xl font-bold mb-4 text-center text-[#10B981]">
        Admin Dashboard
      </h1>

      <div className="flex flex-col md:flex-row gap-8">
        {/* Table with Button */}
        <div className="w-full md:w-3/5 bg-white p-6 rounded shadow overflow-auto">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-xl font-bold">Applications</h2>
            <button
              onClick={() => setIsCreateModalOpen(true)}
              className="bg-[#10B981] text-white px-4 py-2 rounded hover:bg-[#0f8a6f]"
            >
              + Create Application
            </button>
          </div>

          <AdminTable
            applications={applications}
            onApprove={handleApprove}
            onDelete={handleDelete}
            onEdit={(id, amount) => handleEditClick(id, amount)}
          />

          <EditModal
            isOpen={isModalOpen}
            amount={currentAmount}
            setAmount={setCurrentAmount}
            onSave={handleSave}
            onClose={() => setIsModalOpen(false)}
          />
        </div>

        {/* Charts */}
        <div className="w-full md:w-2/5 flex flex-col gap-8">
          {/* Pie Chart */}
          <div className="bg-white p-4 w-full rounded shadow">
            <h2 className="text-xl text-center font-bold mb-4">
              Monthly Limit
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={pieData}
                  cx="50%"
                  cy="50%"
                  innerRadius={70}
                  outerRadius={100}
                  fill="#10B981"
                  paddingAngle={5}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name}: ${(percent * 100).toFixed(0)}%`
                  }
                >
                  {pieData.map((_, i) => (
                    <Cell key={`cell-${i}`} fill={COLORS[i % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </div>

          {/* Bar Chart */}
          <div className="bg-white w-full p-6 rounded shadow">
            <h2 className="text-xl text-center font-bold mb-4">
              Approved by Loan Type
            </h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart
                data={barData}
                margin={{ top: 20, right: 30, left: 0, bottom: 5 }}
              >
                <defs>
                  <linearGradient id="colorBar" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8} />
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.2} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="type" />
                <YAxis />
                <Tooltip />
                <Bar
                  dataKey="total"
                  fill="url(#colorBar)"
                  barSize={40}
                  radius={[8, 8, 0, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>

      {toast.message && (
        <div
          className={`fixed bottom-8 right-8 px-4 py-3 rounded shadow-lg animate-fade-in-out
          ${toast.type === "success" ? "bg-green-500 text-white" : "bg-red-500 text-white"}`}
        >
          {toast.message}
        </div>
      )}

      {/* ✅ Create Application Modal */}
      {isCreateModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <AdminLoanForm
            setToast={setToast}
            onClose={() => setIsCreateModalOpen(false)}
            refreshList={fetchApplications}
          />
        </div>
      )}
    </div>
  );
}
