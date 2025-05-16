import baseUrl from "./urlConfig";
export const fetchSafety = async () => {
  try {
    const response = await fetch(`${baseUrl}/users/safety`);
    const text = await response.text();
    console.log(":rocket: RAW API response:", text);
    const data = JSON.parse(text);
    console.log(":white_check_mark: Parsed JSON:", data);
    return data.products ?? []; 
  } catch (error) {
    console.error(":x: Fel vid hämtning av tips:", error.message);
    throw error;
  }
};


export const fetchMonitoring = async () => {
  try {
    const response = await fetch(`${baseUrl}/admins/authenticated/monitoring`);
    
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    
    const text = await response.text();
    console.log(":rocket: RAW monitoring response:", text);
    
    const data = JSON.parse(text);
    console.log(":white_check_mark: Parsed monitoring JSON:", data);
    
    return data.data || [];
  } catch (error) {
    console.error(":x: Error fetching monitoring data:", error.message);
    throw error;
  }
};