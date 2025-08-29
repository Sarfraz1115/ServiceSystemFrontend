import { useState, useEffect } from "react";
import api from "../services/api";
import "../CSS/CustomerList.css"; // ✅ Import CSS

const CustomerList = ({ searchTerm }) => {
  const [customers, setCustomers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCustomers = async () => {
      try {
        setLoading(true);
        setError(null);
        const { data } = await api.get(`/customers/search?query=${searchTerm}`);
        setCustomers(data);
      } catch (error) {
        console.error("Error fetching customers:", error);
        setError(error.response?.data?.message || "Failed to fetch customers");
        if (error.response?.status === 401) {
          window.location.href = "/login";
        }
      } finally {
        setLoading(false);
      }
    };

    if (searchTerm !== undefined) {
      fetchCustomers();
    }
  }, [searchTerm]);

  const handleDelete = async (id) => {
    try {
      await api.delete(`/customers/${id}`);
      setCustomers(customers.filter((customer) => customer._id !== id));
    } catch (error) {
      console.error("Error deleting customer:", error);
      if (error.response?.status === 401) {
        window.location.href = "/login";
      }
    }
  };

  if (loading) {
    return (
      <div className="loading-box">
        <div className="spinner"></div>
      </div>
    );
  }

  if (error) {
    return <div className="error-box">⚠️ {error}</div>;
  }

  if (customers.length === 0) {
    return (
      <div className="empty-state">
        <h3>No customers found</h3>
        <p>
          {searchTerm
            ? `No customers found for "${searchTerm}"`
            : "Get started by adding a new customer."}
        </p>
      </div>
    );
  }

  return (
    <div className="customer-list">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Vehicle Number</th>
            <th>Contact Number</th>
            <th>Last Service Date</th>
            <th>Service Interval (months)</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {customers.map((customer) => (
            <tr key={customer._id}>
              <td>{customer.customerName}</td>
              <td>{customer.vehicleNumber}</td>
              <td>{customer.contactNumber}</td>
              <td>{new Date(customer.lastServiceDate).toLocaleDateString()}</td>
              <td>{customer.serviceInterval}</td>
              <td>
                <button
                  onClick={() => handleDelete(customer._id)}
                  className="delete-btn"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomerList;