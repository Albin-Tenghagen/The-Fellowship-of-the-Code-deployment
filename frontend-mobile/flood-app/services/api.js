import baseUrl from "./urlConfig";

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


