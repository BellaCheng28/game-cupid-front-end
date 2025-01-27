import React, { useState ,useEffect } from "react";
import axios from "axios";
const AddressAutocomplete = ({ onAddressSelect }) => {
  const [query, setQuery] = useState("");
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchAddresses = async (e) => {
    const API_KEY = import.meta.env.VITE_API_KEY;
    const BASE_URL = import.meta.env.VITE_BASE_URL;
    const url = `${BASE_URL}?q=${encodeURIComponent(
      query
    )}&key=${API_KEY}&limit=5&language=en`;
    try {
      const response = await axios.get(url);
      const results = response.data.results.map((result) => result.formatted);
      setSuggestions(results);
    } catch (error) {
      console.error("Error fetching addresses:", error);
    }
  };

  // 输入框变化时更新 query 并重新获取地址建议
  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true); // 当用户输入时显示建议
  };

  // 用户选择地址后
  const handleAddressSelect = (address) => {
    setQuery(address); // 将选中的地址填充到输入框
    setShowSuggestions(false); // 隐藏建议列表
    if (onAddressSelect) {
      onAddressSelect(address); // 通知父组件选中的地址
    }
  };

  // 当 query 改变时获取推荐地址
  useEffect(() => {
    if (query.trim().length > 0) {
      fetchAddresses();
    } else {
      setSuggestions([]); // 如果输入为空，清空建议列表
    }
  }, [query]);

  return (
    <div className="relative">
      <input
        id="address"
        type="text"
        value={query}
        onChange={handleInputChange} // 更新输入框内容
        onClick={(e) => e.stopPropagation()} // 防止点击输入框关闭建议列表
        placeholder="city, state, country"
        className="w-full p-2 border border-gray-300 rounded text-black"
      />
      {showSuggestions && suggestions.length > 0 && (
        <ul className="absolute z-10 bg-gray-100  text-black border border-gray-300 rounded-md mt-1 w-full max-h-48 overflow-y-auto shadow-lg">
          {suggestions.map((address, index) => (
            <li
              key={index}
              className="p-2 text-sm  hover:bg-gray-100 cursor-pointer"
              onClick={() => handleAddressSelect(address)} // 点击后填充地址
            >
              {address}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default AddressAutocomplete;