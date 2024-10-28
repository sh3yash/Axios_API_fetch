import React, { useEffect, useState } from 'react';
import './UserFormModal.css'; // UserFormModal-specific styles

const UserFormModal = ({ show, onClose, user, onUserUpdate }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    username: '',
    address: {
      street: '',
      city: '',
    },
    companyName: '',
    website: '',
  });

  useEffect(() => {
    if (user) {
      setFormData({
        name: user.name,
        email: user.email,
        phone: user.phone,
        username: user.username,
        address: {
          street: user.address.street,
          city: user.address.city,
        },
        companyName: user.company.name,
        website: user.website,
      });
    } else {
      setFormData({
        name: '',
        email: '',
        phone: '',
        username: 'USER-' + Math.random().toString(36).substr(2, 5),
        address: {
          street: '',
          city: '',
        },
        companyName: '',
        website: '',
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleAddressChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      address: {
        ...prevData.address,
        [name]: value,
      },
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUserUpdate({
      ...formData,
      address: {
        street: formData.address.street,
        city: formData.address.city,
      },
      company: {
        name: formData.companyName,
      },
    });
  };

  return (
    <div className={`modal ${show ? 'show' : ''}`}>
      <div className="modal-content">
        <h2>{user ? 'Edit User' : 'Create User'}</h2>
        <form onSubmit={handleSubmit}>
          <label>
            Name:
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Email:
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Phone:
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </label>
          <label>
            Username:
            <input
              type="text"
              name="username"
              value={formData.username}
              readOnly // Prevent editing of username
            />
          </label>
          <label>
            Address (Street):
            <input
              type="text"
              name="street"
              value={formData.address.street}
              onChange={handleAddressChange}
              required
            />
          </label>
          <label>
            Address (City):
            <input
              type="text"
              name="city"
              value={formData.address.city}
              onChange={handleAddressChange}
              required
            />
          </label>
          <label>
            Company Name:
            <input
              type="text"
              name="companyName"
              value={formData.companyName}
              onChange={handleChange}
              minLength="3"
            />
          </label>
          <label>
            Website:
            <input
              type="text"
              name="website"
              value={formData.website}
              onChange={handleChange}
            />
          </label>
          <button type="submit">Save Changes</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </form>
      </div>
    </div>
  );
};

export default UserFormModal;
