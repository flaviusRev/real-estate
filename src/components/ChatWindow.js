/** @format */

import React, { useState, useEffect } from "react";
import chatService from "../services/chatService"; // Import the chatService
import { useBookedProperties } from "../context/BookedPropertiesContext";

const ChatWindow = () => {
  const {
    chatMessages,
    chatThreadId,
    clearChat,
    addMessage,
    updateThreadId,
    addProperty,
    updateJsonArray,
    updateJsonFilters,
  } = useBookedProperties();

  const [isOpen, setIsOpen] = useState(false);
  const [userInput, setUserInput] = useState("");

  const handleUserInput = (event) => {
    setUserInput(event.target.value);
  };

  const sendMessage = async () => {
    if (userInput.trim() !== "") {
      const userMessage = { sender: "user", text: userInput };
      addMessage(userMessage);
      setUserInput("");

      const response = await chatService.sendMessage(
        userInput,
        chatThreadId,
        null,
        addProperty
      );
      if (response && response.reply && response.reply.length > 0) {
        const responseText = response.reply[0].text.value;

        try {
          const jsonRegex = /```json\s+([\s\S]*?)\s+```/g;
          let jsonMatches = [...responseText.matchAll(jsonRegex)];

          if (jsonMatches.length === 1) {
            // Single JSON bracket with both properties and filters
            const jsonData = jsonMatches[0][1];
            const parsedData = parseStructuredJsonData(jsonData);
            if (parsedData) {
              updateJsonArray(parsedData.properties);
              updateJsonFilters(parsedData.filters);
            }
          } else if (jsonMatches.length === 2) {
            // Separate JSON brackets for properties and filters
            const properties = JSON.parse(jsonMatches[0][1]);
            const filters = JSON.parse(jsonMatches[1][1]);
            updateJsonArray([properties]); // Wrap properties in an array if needed
            updateJsonFilters(filters);
          } else {
            // Handle unstructured data
            const extractedData = parseUnstructuredData(responseText);
            if (extractedData) {
              updateJsonArray(extractedData.properties);
              updateJsonFilters(extractedData.filters);
            }
          }
        } catch (error) {
          console.error("Error processing response:", error);
        }
      }
      if (Array.isArray(response.reply)) {
        response.reply.forEach((item) => {
          addMessage({ sender: "bot", text: item.text.value });
        });
      } else {
        addMessage({ sender: "bot", text: response.reply });
      }
      if (response.threadId) {
        updateThreadId(response.threadId);
      }
    }
  };

  const parseUnstructuredData = (text) => {
    const jsonRegex = /\{[\s\S]*?\}/g; // Regex to match JSON objects
    const matches = text.match(jsonRegex);

    if (matches && matches.length >= 2) {
      try {
        // The last JSON object is assumed to be the filters
        const filters = JSON.parse(matches[matches.length - 1]);

        // All preceding JSON objects are assumed to be properties
        const properties = matches.slice(0, -1).map(JSON.parse);

        return { properties, filters };
      } catch (error) {
        console.error("Error parsing unstructured data:", error);
        return null;
      }
    }

    return null;
  };

  const parseStructuredJsonData = (jsonData) => {
    try {
      const dataRegex = /(\[\s*{[\s\S]*}\s*\])\s*({[\s\S]*})/;
      const matches = jsonData.match(dataRegex);
      if (matches && matches.length === 3) {
        const properties = JSON.parse(matches[1]);
        const filters = JSON.parse(matches[2]);
        return { properties, filters };
      }
      return null;
    } catch (error) {
      console.error("Error parsing structured JSON data:", error);
      return null;
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      sendMessage();
    }
  };

  const toggleChatWindow = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <button
        onClick={toggleChatWindow}
        className="fixed bottom-2 right-5 z-50 p-3 bg-blue-600 text-white w-[5rem] rounded-full shadow-md cursor-pointer hover:bg-blue-700"
        aria-label="Toggle Chat Window"
      >
        {isOpen ? "Close" : "Chat"}
      </button>
      {isOpen && (
        <div className="fixed bottom-16 right-5 w-[400px] h-[400px] border border-gray-300 bg-white shadow-lg rounded-lg flex flex-col justify-between z-50">
          <div className="p-4 flex-grow overflow-y-auto">
            {chatMessages.map((message, index) => (
              <div
                key={index}
                className={`mb-2 p-2 rounded max-w-4/5 break-words ${
                  message.sender === "user"
                    ? "self-end bg-blue-600 text-white"
                    : "self-start bg-gray-200 text-black"
                }`}
              >
                {message.text}
              </div>
            ))}
          </div>
          <div className="flex p-4 border-t border-gray-300">
            <input
              type="text"
              value={userInput}
              onChange={handleUserInput}
              onKeyPress={handleKeyPress}
              className="w-3/4 p-2 border border-gray-300 rounded-xl"
            />
            <button
              onClick={sendMessage}
              className="w-1/4 ml-4 p-2 bg-blue-600 text-white rounded-xl cursor-pointer hover:bg-blue-700"
            >
              Send
            </button>
            <button
              onClick={clearChat}
              className="w-1/4 ml-4 p-1 bg-red-600 text-white rounded-xl cursor-pointer hover:bg-red-700"
            >
              Clear
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWindow;
