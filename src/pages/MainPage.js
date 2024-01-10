/** @format */

// src/pages/MainPage.js
import React, { useEffect, useState } from "react";
import PropertyCard from "../components/PropertyCard";
import FilterBar from "../components/FilterBar";
import { mockProperties } from "../utils/mockProperties";
import heroImage from "../assets/heroImage.jpg";
import { useBookedProperties } from "../context/BookedPropertiesContext";
import SwipeableViews from "react-swipeable-views";
import { CardSwiper } from "react-card-rotate-swiper";

const MainPage = () => {
  const { jsonArray, jsonFilters, updateJsonArray, updateJsonFilters } =
    useBookedProperties();
  const [instantSearchTerm, setInstantSearchTerm] = useState("");
  const [category, setCategory] = useState("");
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [bedrooms, setBedrooms] = useState(0);
  const [bathrooms, setBathrooms] = useState(0);
  const [isSearchApplied, setIsSearchApplied] = useState(false);
  const [selectedTab, setSelectedTab] = useState("Buy");

  const [minRentPrice, setMinRentPrice] = useState("");
  const [maxRentPrice, setMaxRentPrice] = useState("");

  const [appliedFilters, setAppliedFilters] = useState({
    searchTerm: "",
    category: "",
    minPrice: "",
    maxPrice: "",
    bathrooms: 0,
    bedrooms: 0,
    minRentPrice: "",
    maxRentPrice: "",
  });

  useEffect(() => {
    if (jsonFilters) {
      console.log("jsonFilters:", jsonFilters);
      // Update applied filters based on jsonFilters
      setAppliedFilters({
        searchTerm: "", // Assuming jsonFilters doesn't contain a searchTerm
        category: jsonFilters.category || "",
        minPrice: jsonFilters.minPrice || "",
        maxPrice: jsonFilters.maxPrice || "",
        bedrooms: jsonFilters.bedrooms || 0,
        bathrooms: jsonFilters.bathrooms || 0,
        minRentPrice: jsonFilters.minRentPrice || "",
        maxRentPrice: jsonFilters.maxRentPrice || "",
      });
      setIsSearchApplied(true); // Set isSearchApplied to true if jsonFilters is present
    } else {
      setIsSearchApplied(false); // Reset isSearchApplied if jsonFilters is null
    }
  }, [jsonFilters]);

  const applyFilters = () => {
    if (selectedTab === "Rent") {
      setAppliedFilters({
        searchTerm: instantSearchTerm,
        category: category,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
        minRentPrice: minRentPrice,
        maxRentPrice: maxRentPrice,
      });
    } else {
      setAppliedFilters({
        searchTerm: instantSearchTerm,
        category: category,
        minPrice: minPrice,
        maxPrice: maxPrice,
        bedrooms: bedrooms,
        bathrooms: bathrooms,
      });
    }
    setIsSearchApplied(true);
  };

  const resetFilters = () => {
    setInstantSearchTerm("");
    setCategory("");
    setMinPrice("");
    setMaxPrice("");
    setMinRentPrice("");
    setMaxRentPrice("");
    setBedrooms(0);
    setBathrooms(0);
    setAppliedFilters({
      searchTerm: "",
      category: "",
      minPrice: "",
      maxPrice: "",
      minRentPrice: "",
      maxRentPrice: "",
      bathrooms: 0,
      bedrooms: 0,
    });
    setIsSearchApplied(false);
    updateJsonArray([]);
    updateJsonFilters(null);
  };

  const filteredProperties =
    jsonArray && jsonArray.length > 0
      ? jsonArray[0]
      : mockProperties.filter((property) => {
          const matchesInstantSearchTerm = property.name
            .toLowerCase()
            .includes(instantSearchTerm.toLowerCase());
          const matchesSearchTerm = property.name
            .toLowerCase()
            .includes(appliedFilters.searchTerm.toLowerCase());
          const matchesCategory = appliedFilters.category
            ? property.category === appliedFilters.category
            : true;

          const propertyPrice = parseInt(property.price);
          const propertyRentPrice = parseInt(property.rentPrice);

          const matchesMinPrice = appliedFilters.minPrice
            ? propertyPrice >= parseInt(appliedFilters.minPrice)
            : true;
          const matchesMaxPrice = appliedFilters.maxPrice
            ? propertyPrice <= parseInt(appliedFilters.maxPrice)
            : true;

          const matchesMinRentPrice = appliedFilters.minRentPrice
            ? propertyRentPrice >= parseInt(appliedFilters.minRentPrice)
            : true;
          const matchesMaxRentPrice = appliedFilters.maxRentPrice
            ? propertyRentPrice <= parseInt(appliedFilters.maxRentPrice)
            : true;

          const matchesBedrooms = appliedFilters.bedrooms
            ? property.bedrooms >= appliedFilters.bedrooms
            : true;

          const matchesBathrooms = appliedFilters.bathrooms
            ? property.bathrooms >= appliedFilters.bathrooms
            : true;

          return (
            matchesInstantSearchTerm &&
            matchesSearchTerm &&
            matchesCategory &&
            (selectedTab === "Rent"
              ? matchesMinRentPrice && matchesMaxRentPrice
              : matchesMinPrice && matchesMaxPrice) &&
            matchesBedrooms &&
            matchesBathrooms
          );
        });

  useEffect(() => {
    console.log("FILTERED: ", filteredProperties);
  }, [filteredProperties]);

  const handleSwipe = (d) => {
    console.log("d", d);
  };

  return (
    <>
      <div className="md:relative bg-cover bg-center bg-no-repeat h-screen mx-24 mt-12 z-0">
        <img
          className="absolute top-20 md:top-0 left-0 w-full h-auto md:h-[70%] object-cover md:rounded-3xl md"
          src={heroImage}
          alt="house"
          style={{ objectPosition: "50% 50%" }} // Center the image regardless of screen size
        />
        <div className="relative flex justify-center items-end h-full pb-0 md:pb-48">
          <FilterBar
            instantSearchTerm={instantSearchTerm}
            onInstantSearchTermChange={setInstantSearchTerm}
            onApplyFilters={applyFilters}
            onResetFilters={resetFilters}
            setCategory={setCategory}
            setMinPrice={setMinPrice}
            setMaxPrice={setMaxPrice}
            bedrooms={jsonFilters?.bedrooms || bedrooms}
            bathrooms={jsonFilters?.bathrooms || bathrooms}
            setBedrooms={setBedrooms}
            setBathrooms={setBathrooms}
            category={jsonFilters?.category || category}
            minPrice={jsonFilters?.minPrice || minPrice}
            maxPrice={jsonFilters?.maxPrice || maxPrice}
            isSearchApplied={isSearchApplied}
            minRentPrice={minRentPrice}
            setMinRentPrice={setMinRentPrice}
            maxRentPrice={maxRentPrice}
            setMaxRentPrice={setMaxRentPrice}
            selectedTab={selectedTab}
            setSelectedTab={setSelectedTab}
          />
        </div>
      </div>
      <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        {/* CardSwiper for Mobile Views */}
        <div className="lg:hidden">
          {" "}
          {/* Hide on large screens */}
          {filteredProperties.map((property, index) => (
            <div key={index} className="flex justify-center">
              <CardSwiper
                onSwipe={handleSwipe}
                className={"swiper"}
                contents={<PropertyCard {...property} />}
              />
            </div>
          ))}
        </div>

        {/* Grid Layout for Desktop Views */}
        <div className="hidden lg:grid lg:grid-cols-3 gap-4">
          {" "}
          {/* Show only on large screens */}
          {filteredProperties.map((property, index) => (
            <PropertyCard key={index} {...property} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MainPage;
