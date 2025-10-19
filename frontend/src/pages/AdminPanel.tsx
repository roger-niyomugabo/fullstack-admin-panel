import React, { useState } from "react";
import { UserForm } from "../components/UserForm";
import { UserGraph } from "../components/UserGraph";
import { UserTable } from "../components/UserTable";
import { ConfirmModal } from "../components/ConfirmModal";
import { Toast } from "../components/Toast";
import { useUsers } from "../hooks/useUsers";
import { useStats } from "../hooks/useStats";
import "../App.css";

export const AdminPanel: React.FC = () => {
  const {
    users,
    verifiedUsers,
    createUser,
    updateUser,
    deleteUser,
    reloadUsers,
    loading,
  } = useUsers();
  const { stats, loadStats } = useStats();

  const [showForm, setShowForm] = useState(false);
  const [editingUser, setEditingUser] = useState<any>(null);
  const [confirmDelete, setConfirmDelete] = useState<string | null>(null);

  const handleCreateUser = async (data: any) => {
    await createUser(data);
    await reloadUsers();
    await loadStats();
    setShowForm(false);
  };

  const handleUpdateUser = async (data: any) => {
    if (!editingUser) return;
    await updateUser(editingUser.id, data);
    await reloadUsers();
    await loadStats();
    setEditingUser(null);
  };

  const handleDelete = async () => {
    if (confirmDelete) {
      await deleteUser(confirmDelete);
      await reloadUsers();
      await loadStats();
      setConfirmDelete(null);
    }
  };

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="app">
      <Toast />

      <header className="app-header">
        <h1>Admin Panel</h1>
        <div className="header-actions">
          <button onClick={() => setShowForm(true)}>Add User</button>
        </div>
      </header>

      <main className="app-main">
        <section className="stats-section">
          <UserGraph data={stats} />
        </section>

        <section className="users-section">
          <h2>
            Users ({verifiedUsers.length}/{users.length} verified)
          </h2>
          {verifiedUsers.length > 0 ? (
            <UserTable
              users={verifiedUsers}
              onEdit={setEditingUser}
              onDelete={(id) => setConfirmDelete(id)}
            />
          ) : (
            <p>No users found</p>
          )}
        </section>
      </main>

      {(showForm || editingUser) && (
        <div
          className="modal"
          onClick={(e) => {
            if (e.target === e.currentTarget) {
              setShowForm(false);
              setEditingUser(null);
            }
          }}
        >
          <div className="modal-content">
            <h2>{editingUser ? "Edit User" : "Create User"}</h2>
            <UserForm
              onSubmit={editingUser ? handleUpdateUser : handleCreateUser}
              onCancel={() => {
                setShowForm(false);
                setEditingUser(null);
              }}
              initialData={editingUser || undefined}
            />
          </div>
        </div>
      )}

      {confirmDelete && (
        <ConfirmModal
          title="Delete User"
          message="Are you sure you want to delete this user?"
          onConfirm={handleDelete}
          onCancel={() => setConfirmDelete(null)}
        />
      )}
    </div>
  );
};
