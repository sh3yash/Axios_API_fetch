// UserListPage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import UserFormModal from '../components/UserFormModal';
// import SplineBackground from '../components/SplineBackground';
import './UserListPage.css';

const UserListPage = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await axios.get('https://jsonplaceholder.typicode.com/users');
        setUsers(response.data);
        setLoading(false);
      } catch (error) {
        alert('Error fetching users');
        setLoading(false);
      }
    };
    fetchUsers();
  }, []);

  const handleEdit = (user) => {
    setEditingUser(user);
    setShowModal(true);
  };

  const handleDelete = async (id) => {
    if (window.confirm('Are you sure you want to delete this user?')) {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      const updatedUsers = users.filter((user) => user.id !== id);
      setUsers(updatedUsers.map((user, index) => ({ ...user, id: index + 1 }))); 
    }
  };

  const handleUserUpdate = async (newUser) => {
    if (editingUser) {
      const updatedUsers = users.map((user) =>
        user.id === editingUser.id ? { ...user, ...newUser } : user
      );
      setUsers(updatedUsers.map((user, index) => ({ ...user, id: index + 1 }))); 
      await axios.put(`https://jsonplaceholder.typicode.com/users/${editingUser.id}`, newUser);
    } else {
      const newUserWithId = { ...newUser, id: users.length + 1 };
      const updatedUsers = [...users, newUserWithId];
      setUsers(updatedUsers.map((user, index) => ({ ...user, id: index + 1 }))); 
      await axios.post('https://jsonplaceholder.typicode.com/users', newUserWithId);
    }
    handleModalClose(); 
  };

  const handleModalClose = () => {
    setShowModal(false);
    setEditingUser(null); 
  };

  return (
    <div className="user-list-container">

      <h2>User List</h2>
      <button className="create-user-button" onClick={() => { setEditingUser(null); setShowModal(true); }}>
        Create User
      </button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <table className="user-table">
          <thead>
            <tr>
              <th>ID</th>
              <th>Name</th>
              <th>Email</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user) => (
              <tr key={user.id}>
                <td>{user.id}</td>
                <td>{user.name}</td>
                <td>{user.email}</td>
                <td>
                  <button onClick={() => handleEdit(user)}>Edit</button>
                  <button onClick={() => handleDelete(user.id)}>Delete</button>
                  <button onClick={() => handleEdit(user)}>View</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {showModal && (
        <UserFormModal
          show={showModal}
          onClose={handleModalClose}
          user={editingUser}
          onUserUpdate={handleUserUpdate} 
        />
      )}
    </div>
  );
};

export default UserListPage;
