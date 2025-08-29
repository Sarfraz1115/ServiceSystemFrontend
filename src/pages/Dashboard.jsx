import { useContext, useState, useEffect } from "react";
import AuthContext from "../context/AuthContext";
import CustomerList from "../components/CustomerList";
import CustomerForm from "../components/CustomerForm";
import api from "../services/api";
import {
  Users,
  CheckCircle2,
  Calendar,
  Search,
  PlusCircle,
  LogOut,
  Zap,
} from "lucide-react";
import "../CSS/Dashboard.css";

const Dashboard = () => {
  const { logout } = useContext(AuthContext);
  const [showForm, setShowForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [customers, setCustomers] = useState([]);
  const [stats, setStats] = useState({
    totalCustomers: 0,
    activeServices: 0,
    thisMonth: 0,
  });

  const fetchCustomers = async () => {
    try {
      const response = await api.get("/customers");
      setCustomers(response.data);
      calculateStats(response.data);
    } catch (error) {
      console.error("Error fetching customers:", error);
    }
  };

  const calculateStats = (customerData) => {
    const totalCustomers = customerData.length;

    // A service is active if the last service date plus the service interval is in the future
    const activeServices = customerData.filter((customer) => {
      const lastServiceDate = new Date(customer.lastServiceDate);
      const nextServiceDate = new Date(
        lastServiceDate.setMonth(
          lastServiceDate.getMonth() + customer.serviceInterval
        )
      );
      return nextServiceDate > new Date();
    }).length;

    // Count customers whose last service date is in the current month
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();
    const thisMonth = customerData.filter((customer) => {
      const lastServiceDate = new Date(customer.lastServiceDate);
      return (
        lastServiceDate.getMonth() === currentMonth &&
        lastServiceDate.getFullYear() === currentYear
      );
    }).length;

    setStats({
      totalCustomers,
      activeServices,
      thisMonth,
    });
  };

  useEffect(() => {
    fetchCustomers();
  }, []);

  return (
    <div className="dashboard">
      {/* Header */}
      <header className="dashboard-header">
        <div className="header-content">
          <div className="header-left">
            <div className="logo-box">
              <Zap className="logo-icon" />
            </div>
            <div>
              <h1 className="title">Service System</h1>
              <p className="subtitle">Customer Management Dashboard</p>
            </div>
          </div>

          <button onClick={logout} className="logout-btn">
            <LogOut className="icon" />
            <span>Logout</span>
          </button>
        </div>
      </header>

      {/* Main */}
      <main className="dashboard-main">
        {/* Stats Cards */}
        <div className="stats-grid">
          <div className="stat-card blue">
            <Users className="stat-icon" />
            <div>
              <p className="stat-label">Total Customers</p>
              <p className="stat-value">{stats.totalCustomers}</p>
            </div>
          </div>

          <div className="stat-card green">
            <CheckCircle2 className="stat-icon" />
            <div>
              <p className="stat-label">Active Services</p>
              <p className="stat-value">{stats.activeServices}</p>
            </div>
          </div>

          <div className="stat-card purple">
            <Calendar className="stat-icon" />
            <div>
              <p className="stat-label">This Month</p>
              <p className="stat-value">{stats.thisMonth}</p>
            </div>
          </div>
        </div>

        {/* Search + Action */}
        <div className="action-bar">
          <div className="search-box">
            <Search className="search-icon" />
            <input
              type="text"
              placeholder="Search customers..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <button onClick={() => setShowForm(!showForm)} className="add-btn">
            <PlusCircle className="icon" />
            <span>{showForm ? "Close Form" : "Add New Customer"}</span>
          </button>
        </div>

        {/* Customer Form */}
        {showForm && (
          <div className="form-wrapper">
            <CustomerForm onCustomerAdded={fetchCustomers} />
          </div>
        )}

        {/* Customer List */}
        <div className="list-wrapper">
          <div className="list-header">
            <h2>Customer Records</h2>
            <p>Manage your customer database</p>
          </div>
          <CustomerList searchTerm={searchTerm} customers={customers} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;