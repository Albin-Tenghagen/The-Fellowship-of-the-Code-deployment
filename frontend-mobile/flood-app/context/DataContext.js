import React, { createContext, useContext, useState, useEffect } from "react";

const DataContext = createContext();

export const DataProvider = ({ children }) => {

  const [tipsData, setTipsData] = useState([]);
  const [infrastructureData, setInfrastructureData] = useState([]);
  const [monitoringData, setMonitoringData] = useState([]);

  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchData = async () => {
    try {
      setLoading(true);
      setError(null);

      const [tipsRes, infraRes, monitoringRes] = await Promise.all([
        fetch("http://localhost:5001/users/tips"),
        fetch("http://localhost:5001/admins/authenticated/infrastructureIssues"),
        fetch("http://localhost:5001/admins/authenticated/monitoring"),
      ]);

      if (!tipsRes.ok || !infraRes.ok || !monitoringRes.ok) {
        throw new Error("One or more data sources failed to load.");
      }
      const [tips, infrastructure, monitoring] = await Promise.all([
        tipsRes.json(),
        infraRes.json(),
        monitoringRes.json(),
      ]);

      setTipsData(tips);
      setInfrastructureData(infrastructure);
      setMonitoringData(monitoring);
    } catch (err) {
      setError(err.message || "Something went wrong while fetching data.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  const refetchData = () => {
    fetchData();
  };
  
  return (
    <DataContext.Provider
      value={{
        tipsData,
        infrastructureData,
        monitoringData,
        refetchData,
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


