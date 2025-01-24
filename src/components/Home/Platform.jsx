import React, { useState, useEffect } from "react";
import axios from "axios";
const Platform = () => {
  const [brands, setBrands] = useState([]); // State to store brand choices
  const [selectedBrand, setSelectedBrand] = useState(""); // State for the selected brand
  useEffect(() => {
    // Fetch brand choices from the backend
    const fetchBrands = async () => {
      try {
        const response = await profilePlateforms(); // Replace with your backend URL
        setBrands(response.data); // Update state with fetched brand choices
      } catch (error) {
        console.error("Error fetching brand choices:", error);
      }
    };
    fetchBrands();
  }, []); // Empty dependency array ensures this runs once
  const handleSelectChange = (event) => {
    setSelectedBrand(event.target.value); // Update the selected brand
    console.log("Selected Brand:", event.target.value);
  };
  return (
    <div>
      <label htmlFor="brand-dropdown">Select a brand:</label>
      <select
        id="brand-dropdown"
        value={selectedBrand}
        onChange={handleSelectChange}
        required
      >
        <option value="" disabled>
          Choose a brand
        </option>
        {brands.map((brand) => (
          <option key={brand.value} value={brand.value}>
            {brand.label}
          </option>
        ))}
      </select>
      {selectedBrand && <p>You selected: {selectedBrand}</p>}
    </div>
  );
};
export default Platform;
