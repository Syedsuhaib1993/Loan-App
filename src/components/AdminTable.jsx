import React, { useState } from "react";
import { FaCheckCircle, FaEdit, FaTrashAlt } from "react-icons/fa";

export default function AdminTable({
  applications,
  onApprove,
  onDelete,
  onEdit,
  showToast,
}) {
  const [editingId, setEditingId] = useState(null);
  const [newAmount, setNewAmount] = useState(0);
  const [confirmDeleteId, setConfirmDeleteId] = useState(null);


  return (
    <div className="relative">
      <table className="min-w-full text-left text-sm">
        <thead>
          <tr className="border-b">
            <th className="py-2 px-4">Name</th>
            <th className="py-2 px-4">Email</th>
            <th className="py-2 px-4">Loan Type</th>
            <th className="py-2 px-4">Amount</th>
            <th className="py-2 px-4">Status</th>
            <th className="py-2 px-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {applications.map((app) => (
            <tr
              key={app._id}
              className={`border-b space-y-4 hover:bg-gray-50 ${
                app.status == "Approved" ? "bg-green-50" : ""
              }`}
            >
              <td className="py-2 px-4">{app.name}</td>
              <td className="py-2 px-4">{app.email}</td>
              <td className="py-2 px-4">{app.type}</td>
              <td className="py-2 px-4">
                {editingId === app.id ? (
                  <input
                    type="number"
                    value={newAmount}
                    onChange={(e) => setNewAmount(Number(e.target.value))}
                    className="border p-1 rounded w-24"
                  />
                ) : (
                 `$${Number(app.amount || 0).toLocaleString()}`
                )}
              </td>
              <td className="py-2 px-4">
                {app.status === "Approved" ? (
                  <span className="text-green-600 font-bold">Approved</span>
                ) : (
                  <span className="text-yellow-600 font-bold">Pending</span>
                )}
              </td>
              <td className="py-2 px-4 flex items-center space-x-3">
                {!app.approved && (
                  <FaCheckCircle
                    onClick={() => {
                      onApprove(app._id);
                    }}
                    size={18}
                    className={`text-green-600 ${app.status==='Approved'? 'hidden':"block" } cursor-pointer hover:scale-110 transition`}
                    title="Approve"
                  />
                )}

                {editingId === app._id ? (
                  <FaCheckCircle
                    onClick={() => {
                      onEdit(app._id, newAmount);
                      showToast("");
                      setEditingId(null);
                    }}
                    size={18}
                    className="text-blue-600 cursor-pointer hover:scale-110 transition"
                    title="Save"
                  />
                ) : (
                  <FaEdit
                    className="text-yellow-500 cursor-pointer hover:text-yellow-600"
                    onClick={() => {
                    //   const newAmount = prompt("Enter new amount:");
                    //   if (newAmount) {
                    //     onEdit(app._id, Number(newAmount));
                    //   }
                    onEdit(app._id, app.amount)
                    }}
                  />
                )}

                <FaTrashAlt
                  onClick={() => setConfirmDeleteId(app._id)}
                  size={18}
                  className="text-red-600 cursor-pointer hover:scale-110 transition"
                  title="Delete"
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Delete Confirmation Modal */}
      {confirmDeleteId && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-sm text-center animate-fade-in">
            <h2 className="text-lg font-bold mb-4 text-[#12565F]">
              Confirm Delete
            </h2>
            <p className="mb-6">
              Are you sure you want to delete this application?
            </p>
            <div className="flex justify-center gap-4">
              <button
                onClick={() => {
                  onDelete(confirmDeleteId);
                  setConfirmDeleteId(null);
                }}
                className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-500"
              >
                Yes, Delete
              </button>
              <button
                onClick={() => setConfirmDeleteId(null)}
                className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
