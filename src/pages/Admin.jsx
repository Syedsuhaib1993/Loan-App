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
import EditModal from "../components/EditModal";

export default function Admin() {
  const MONTHLY_LIMIT = 1000000;
  const [applications, setApplications] = useState([]);
  const [toastMessage, setToastMessage] = useState("");

   const [isModalOpen, setIsModalOpen] = useState(false);
  const [editId, setEditId] = useState(null);
  const [currentAmount, setCurrentAmount] = useState(50000);
    const handleEditClick = (id, amount) => {
    setEditId(id);
    setCurrentAmount(amount);
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    await handleEdit(editId, currentAmount);
    setIsModalOpen(false);
  };

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
      setTimeout(() => {
        setToastMessage("");
      }, 2000);
      fetchApplications();
    } catch (error) {
      console.error("Error approving:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8080/api/${id}`);
      setToastMessage("Application deleted!");
      setTimeout(() => {
        setToastMessage("");
      }, 2000);
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
      setToastMessage("Application Updated!");
      setTimeout(() => {
        setToastMessage("");
      }, 2000);
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
        {/* Table */}
        <div className="w-full md:w-3/5 bg-white p-6 rounded shadow overflow-auto">
          <h2 className="text-xl text-center font-bold mb-4">Applications</h2>
          <AdminTable
            applications={applications}
            onApprove={handleApprove}
            onDelete={handleDelete}
            // onEdit={handleEdit}
             onEdit={(id, amount) => handleEditClick(id, amount)}
            showToast={setToastMessage}
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
        <div className="w-full md:w-2/5 flex flex-col gap-8 bg-white">
          {/* Pie Chart */}
          <div className="bg-white p-4 w-full rounded shadow">
            <h2 className="text-xl text-center font-bold mb-4">Monthly Limit</h2>
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
            <h2 className="text-xl text-center font-bold mb-4">Approved by Loan Type</h2>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={barData} margin={{ top: 20, right: 30, left: 0, bottom: 5 }}>
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

      {toastMessage && (
        <div className="fixed bottom-8 right-8 bg-[#10B981] text-white px-4 py-3 rounded shadow-lg animate-fade-in-out">
          {toastMessage}
        </div>
      )}
    </div>
  );
}
