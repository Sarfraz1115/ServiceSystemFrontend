import { useState } from "react";
import api from "../services/api";
import "../CSS/CustomerForm.css"; // ✅ Import CSS

const CustomerForm = () => {
  const [customerName, setCustomerName] = useState("");
  const [vehicleNumber, setVehicleNumber] = useState("");
  const [contactNumber, setContactNumber] = useState("");
  const [lastServiceDate, setLastServiceDate] = useState("");
  const [serviceInterval, setServiceInterval] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCustomer = {
      customerName,
      vehicleNumber,
      contactNumber,
      lastServiceDate,
      serviceInterval,
    };
    await api.post("/customers", newCustomer);

    // Clear form
    setCustomerName("");
    setVehicleNumber("");
    setContactNumber("");
    setLastServiceDate("");
    setServiceInterval("");
  };

  return (
    <div className="form-card">
      <h2 className="form-title">Add New Customer</h2>

      <form onSubmit={handleSubmit} className="form-grid">
        <div className="form-group">
          <label htmlFor="customerName">Customer Name</label>
          <input
            id="customerName"
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="vehicleNumber">Vehicle Number</label>
          <input
            id="vehicleNumber"
            type="text"
            value={vehicleNumber}
            onChange={(e) => setVehicleNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="contactNumber">Contact Number</label>
          <input
            id="contactNumber"
            type="text"
            value={contactNumber}
            onChange={(e) => setContactNumber(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="lastServiceDate">Last Service Date</label>
          <input
            id="lastServiceDate"
            type="date"
            value={lastServiceDate}
            onChange={(e) => setLastServiceDate(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="serviceInterval">Service Interval (months)</label>
          <input
            id="serviceInterval"
            type="number"
            value={serviceInterval}
            onChange={(e) => setServiceInterval(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Customer
        </button>
      </form>
    </div>
  );
};

export default CustomerForm;