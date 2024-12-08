import axios from "axios";

const fetchDistrictData = async (state, city) => {
  try {
    if (!state || !city) {
      throw new Error(`Invalid inputs: state=${state}, city=${city}`);
    }

    const response = await axios.get("http://localhost:5000/emergency/getData");

    console.log("Response from server:", response.data);

    if (response.data && Array.isArray(response.data)) {
      for (let i = 0; i < response.data.length; i++) {
        const currentState = response.data[i];
        if (currentState.state?.toLowerCase() === state.toLowerCase()) {
          for (let j = 0; j < currentState.districts?.length; j++) {
            const currentDistrict = currentState.districts[j];
            if (currentDistrict.name?.toLowerCase() === city.toLowerCase()) {
              console.log("Matched District:", currentDistrict);
              return currentDistrict; 
            }
          }
        }
      }
      console.error("No matching district found for the given state and city");
      return null; 
    } else {
      console.error("Invalid data format received from the server");
      return null;
    }
  } catch (error) {
    console.error("Error fetching district data:", error);
    throw error;
  }
};

export default fetchDistrictData;
