import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {
  const [tipsData, setTipsData] = useState([]);

  const [infrastructureData, setInfrastructureData] = useState([]);
  const [monitoringData, setMonitoringData] = useState([]);
  const [adminData, setAdminData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);

        const response = await fetch("/data/tips.json");

        // const [tipsRes, infraRes, monitoringRes, adminRes] = await Promise.all([
        //   fetch("http://localhost:5000/api/tips"),
        //   fetch("http://localhost:5000/api/infrastructure"),
        //   fetch("http://localhost:5000/api/monitoring"),
        //   fetch("http://localhost:5000/api/admin"),
        // ]);

        // if (!tipsRes.ok || !infraRes.ok || !monitoringRes.ok || !adminRes.ok) {
        //   throw new Error("One or more data sources failed to load.");
        // }
        // const [tips, infrastructure, monitoring, admin] = await Promise.all([
        //   tipsRes.json(),
        //   infraRes.json(),
        //   monitoringRes.json(),
        //   adminRes.json(),
        // ]);
        // setTips(tips);
        // setInfrastructure(infrastructure);
        // setMonitoring(monitoring);
        // setAdmin(admin);

        if (!response.ok) throw new Error("Failed to fetch tips.");

        const data = await response.json();
        setTipsData(data);

        setInfrastructureData([]);
        setMonitoringData([]);
        setAdminData([]);

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
