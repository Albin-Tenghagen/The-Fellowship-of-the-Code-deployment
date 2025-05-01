import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tipsData, setTips] = useState([]);

  const [infrastructureData, setInfrastructure] = useState([]);
  const [monitoringData, setMonitoring] = useState([]);
  const [adminData, setAdmin] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const [tipsRes, infraRes, monitoringRes, adminRes] = await Promise.all([
          fetch("http://localhost:5000/api/tips"),
          fetch("http://localhost:5000/api/infrastructure"),
          fetch("http://localhost:5000/api/monitoring"),
          fetch("http://localhost:5000/api/admin"),
        ]);

        if (!tipsRes.ok || !infraRes.ok || !monitoringRes.ok || !adminRes.ok) {
          throw new Error("One or more data sources failed to load.");
        }
        const [tips, infrastructure, monitoring, admin] = await Promise.all([
          tipsRes.json(),
          infraRes.json(),
          monitoringRes.json(),
          adminRes.json(),
        ]);
        setTips(tips);
        setInfrastructure(infrastructure);
        setMonitoring(monitoring);
        setAdmin(admin);
      } catch (err) {
        setError(err.message || "Something went wrong while fetching data.");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  return (
    <DataContext.Provider
      value={{
        tipsData,
        infrastructureData,
        monitoringData,
        adminData,
        loading,
        error,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export const useAppData = () => {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error("useAppData must be used within a DataProvider.");
  }
  return context;
};

// consider adding refetchData function to allow manual data refresh