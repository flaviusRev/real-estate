/** @format */

import React, { useMemo } from "react";
import {
  Button,
  ButtonGroup,
  Input,
  Select,
  Option,
} from "@material-tailwind/react";
import SearchIcon from "@mui/icons-material/Search";

const FilterBar = ({
  instantSearchTerm,
  isSearchApplied,
  onInstantSearchTermChange,
  onApplyFilters,
  onResetFilters,
  setCategory,
  setMinPrice,
  setMaxPrice,
  category,
  minPrice,
  maxPrice,
  setBedrooms,
  setBathrooms,
  bedrooms,
  bathrooms,
  minRentPrice,
  setMinRentPrice,
  maxRentPrice,
  setMaxRentPrice,
  selectedTab,
  setSelectedTab,
}) => {
  const handleTabChange = (tab) => {
    onResetFilters();
    setSelectedTab(tab);
  };

  const showClearButton = instantSearchTerm || isSearchApplied;
  const generatePriceOptions = (start, end, increment) => {
    let options = [];
    for (let price = start; price <= end; price += increment) {
      options.push({ value: price, label: `$${price.toLocaleString()}` });
    }
    return options;
  };

  const priceOptions = useMemo(() => {
    let start, end, increment;
    if (selectedTab === "Rent") {
      start = 500;
      end = 6500;
      increment = 500;
    } else {
      start = 150000;
      end = 750000;
      increment = 50000;
    }
    return generatePriceOptions(start, end, increment);
  }, [selectedTab]);

  const filteredMinPriceOptions = priceOptions.filter(
    (option) => !maxPrice || option.value <= maxPrice
  );
  const filteredMaxPriceOptions = priceOptions.filter(
    (option) => !minPrice || option.value >= minPrice
  );

  const handlePriceChange = (isMin, value) => {
    if (selectedTab === "Rent") {
      isMin ? setMinRentPrice(value) : setMaxRentPrice(value);
    } else {
      isMin ? setMinPrice(value) : setMaxPrice(value);
    }
  };

  return (
    <div>
      <div className="flex justify-between p-4 bg-white w-fit rounded-t-lg border-b-2">
        <ButtonGroup color="green">
          {["Buy", "Sell", "Rent"].map((tab) => (
            <Button
              color={selectedTab === tab ? "green" : "white"}
              className={`${
                selectedTab === tab
                  ? "text-white mx-1 rounded-lg border-none"
                  : "text-black mx-1 rounded-lg bg-white border-none"
              }`}
              onClick={() => handleTabChange(tab)}
            >
              {tab}
            </Button>
          ))}
        </ButtonGroup>
      </div>
      <div className="bg-white shadow rounded-tl-none rounded-tr rounded-bl rounded-br">
        <div className="flex flex-col p-4 space-y-4 md:flex-row md:space-y-0 md:space-x-4">
          <div className="flex flex-col md:flex-row md:space-x-4 mb-4">
            <div className="flex flex-col">
              <label htmlFor="search-field" className="mb-2">
                Search
              </label>
              <Input
                id="search-field"
                icon={<SearchIcon />}
                placeholder="Search your Keywords"
                value={instantSearchTerm}
                onChange={(e) => onInstantSearchTermChange(e.target.value)}
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="select-category" className="mb-2">
                Select Categories
              </label>
              <Select
                id="select-category"
                color="green"
                value={category}
                onChange={(e) => setCategory(e)}
              >
                {["Apartment", "Offices", "Townhome"].map((category) => (
                  <Option key={category} value={category}>
                    {category}
                  </Option>
                ))}
              </Select>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex flex-col">
                <label htmlFor="select-bedrooms" className="mb-2">
                  Bedrooms
                </label>
                <Select
                  id="select-bedrooms"
                  color="green"
                  value={bedrooms}
                  onChange={(e) => setBedrooms(e)}
                >
                  {[1, 2, 3, "4 or more"].map((bedrooms) => (
                    <Option
                      key={bedrooms}
                      value={bedrooms === "4 or more" ? 4 : bedrooms}
                    >
                      {bedrooms}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="select-bathrooms" className="mb-2">
                  Bathrooms
                </label>
                <Select
                  id="select-bathrooms"
                  color="green"
                  value={bathrooms}
                  onChange={(e) => setBathrooms(e)}
                >
                  {[1, 2, 3, "4 or more"].map((bathrooms) => (
                    <Option
                      key={bathrooms}
                      value={bathrooms === "4 or more" ? 4 : bathrooms}
                    >
                      {bathrooms}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
            <div className="flex flex-col md:flex-row md:space-x-4">
              <div className="flex flex-col">
                <label htmlFor="min-price" className="mb-2">
                  Min Price
                </label>
                <Select
                  key={`min-price-${selectedTab}`}
                  id="min-price"
                  color="green"
                  value={selectedTab === "Rent" ? minRentPrice : minPrice}
                  onChange={(e) => handlePriceChange(true, e)}
                >
                  {filteredMinPriceOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
              <div className="flex flex-col">
                <label htmlFor="max-price" className="mb-2">
                  Max Price
                </label>
                <Select
                  key={`max-price-${selectedTab}`}
                  id="max-price"
                  color="green"
                  value={selectedTab === "Rent" ? maxRentPrice : maxPrice}
                  onChange={(e) => handlePriceChange(false, e)}
                >
                  {filteredMaxPriceOptions.map((option) => (
                    <Option key={option.value} value={option.value}>
                      {option.label}
                    </Option>
                  ))}
                </Select>
              </div>
            </div>
          </div>
          <div className="flex flex-col md:flex-row justify-between">
            <Button
              className="bg-green-500 text-white px-6 py-2 rounded-lg focus:outline-none self-start"
              onClick={onApplyFilters}
            >
              Search
            </Button>
            {showClearButton && (
              <Button
                className="bg-red-500 text-white px-6 py-2 rounded-lg focus:outline-none self-start"
                onClick={onResetFilters}
              >
                Clear Filters
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FilterBar;
