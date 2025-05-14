import baseUrl from "./urlConfig";

export const fetchTips = async () => {
    try {
        const response = await fetch(`${baseUrl}/users/tips`);
        if (!response.ok) {
            throw new Error("Något gick fel vid hämtning av tips");
        }
        const data = await response.json();
        return data.tips; // returnar hela tips-arrayen
    } catch (error) {
        console.error("Fel vid hämtning av tips: ", error.message);
        throw error;
    }
}

export const fetchMonitoringData = async () => {
    try {
        const response = await fetch(`${baseUrl}/monitoring`);
        if (!response.ok) {
            throw new Error("Något gick fel vid hämtning av övervakningsdata");
        }
        const data = await response.json();
        return data; // returnar hela övervakningsdata
    } catch (error) {
        console.error("Fel vid hämtning av övervakningsdata: ", error.message);
        throw error;
    }
}import baseUrl from "./urlConfig";

export const fetchSafety = async () => {
  try {
    const response = await fetch(`${baseUrl}/users/safety`);
    const text = await response.text();
    console.log("🚀 RAW API response:", text);
    const data = JSON.parse(text);
    console.log("✅ Parsed JSON:", data);

    return data.products ?? []; // Returnera arrayen med data
  } catch (error) {
    console.error("❌ Fel vid hämtning av tips:", error.message);
    throw error;
  }
};


