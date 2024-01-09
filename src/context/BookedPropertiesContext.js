/** @format */

import React, { createContext, useState, useContext } from "react";

const BookedPropertiesContext = createContext();

export const useBookedProperties = () => useContext(BookedPropertiesContext);

export const BookedPropertiesProvider = ({ children }) => {
  const [bookedProperties, setBookedProperties] = useState([]);
  const [chatMessages, setChatMessages] = useState([]);
  const [chatThreadId, setChatThreadId] = useState(null);
  const [jsonArray, setJsonArray] = useState([]); // To store the array of JSON objects
  const [jsonFilters, setJsonFilters] = useState(null); // To store the last JSON object as filters

  const addProperty = (property) => {
    setBookedProperties((prevProperties) => [...prevProperties, property]);
  };

  const removeProperty = (propertyId) => {
    setBookedProperties((prevProperties) =>
      prevProperties.filter((property) => property.id !== propertyId)
    );
  };

  const completePurchase = () => {
    setBookedProperties([]);
  };

  const clearChat = () => {
    setChatMessages([]);
    setChatThreadId(null);
  };

  const addMessage = (message) => {
    setChatMessages((prevMessages) => [...prevMessages, message]);
  };

  const updateThreadId = (id) => {
    setChatThreadId(id);
  };

  const updateJsonArray = (array) => {
    setJsonArray(array);
  };

  const updateJsonFilters = (filters) => {
    setJsonFilters(filters);
  };

  return (
    <BookedPropertiesContext.Provider
      value={{
        bookedProperties,
        addProperty,
        removeProperty,
        completePurchase,
        chatMessages,
        chatThreadId,
        clearChat,
        addMessage,
        updateThreadId,
        jsonArray,
        updateJsonArray,
        jsonFilters,
        updateJsonFilters,
      }}
    >
      {children}
    </BookedPropertiesContext.Provider>
  );
};
