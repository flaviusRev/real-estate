/** @format */

import React from "react";
import { useParams, useNavigate } from "react-router-dom";
import { mockProperties } from "../utils/mockProperties";
import {
  Button,
  IconButton,
  Tooltip,
  Typography,
} from "@material-tailwind/react";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathtub";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareFootIcon from "@mui/icons-material/SquareFoot";
import LocalPhoneIcon from "@mui/icons-material/LocalPhone";
import { useBookedProperties } from "../context/BookedPropertiesContext";

const PropertyDetail = () => {
  let navigate = useNavigate();
  let { id } = useParams();
  const { addProperty } = useBookedProperties();

  const addToCart = () => {
    addProperty(property);
  };

  const property = mockProperties.find((p) => p.id.toString() === id);

  if (!property) {
    return <div>Property not found</div>;
  }

  const handleFavoriteClick = () => {
    // Implement favorite click functionality
  };

  return (
    <div className="container mx-auto p-4">
      <Button onClick={() => navigate(-1)} color="green" className="mb-4">
        Return
      </Button>
      <div className="mb-8">
        <img
          className="w-full h-64 object-cover"
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt={property.name}
        />
      </div>
      <div className="flex flex-row justify-between">
        <div className="flex flex-col space-y-8">
          <div className="w-full lg:w-2/3 flex flex-col justify-around pr-4">
            <Typography className="text-2xl font-bold mb-2">
              {property.name}
            </Typography>
            <div className="flex items-center text-lg mb-4 justify-around bg-[#f8fafc] px-6 py-2 rounded-lg">
              <div>
                <SquareFootIcon className="text-green-600" />
                <span className="ml-2">{property.squareSpace} sqft</span>
              </div>
              <div>
                <BedIcon className="text-green-600 ml-4" />
                <span className="ml-2">{property.bedrooms} Beds</span>
              </div>
              <div>
                <BathroomIcon className="text-green-600 ml-4" />
                <span className="ml-2">{property.bathrooms} Baths</span>
              </div>
            </div>
            <div>
              <Typography className="text-xl font-bold mb-2">
                Location
              </Typography>
              <Typography className="text-base font-light mb-2">
                {property.location}
              </Typography>
            </div>
            <div className="mb-8">
              <Typography className="text-xl font-bold mb-2">
                Description
              </Typography>
              <Typography className="text-base font-light mb-2">
                {property.description}
              </Typography>
            </div>
          </div>
          <div className="lg:w-1/2 mt-12">
            <div className="aspect-w-16 aspect-h-9">
              <iframe
                title="property-location"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3430.5364256615543!2d-95.46054508444806!3d29.74894808198407!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8640bf26db794291%3A0xfed768f9ec3c8508!2sGerald%20D.%20Hines%20Waterwall%20Park!5e0!3m2!1sen!2sus!4v1655489254597!5m2!1sen!2sus"
                width="600"
                height="450"
                style={{ border: 0 }}
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>
        <div className="flex flex-col space-y-8">
          <div className="w-[20rem] h-fit bg-[#f8fafc] p-6 rounded-lg">
            <Typography className="text-xl font-bold mb-2">Price</Typography>
            <div className="flex flex-row justify-between items-center mb-2">
              <Typography className="text-lg font-normal">
                ${property.price}
              </Typography>
              <Typography className="bg-[#e1f2ea] text-[#2eac5d] text-xs p-1 px-2 rounded-md">
                For Sale
              </Typography>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <Typography className="text-xs text-gray-500">
                Days on RevEstate
              </Typography>
              <Typography className="text-xs ">124 Days</Typography>
            </div>
            <div className="flex flex-row justify-between mb-2">
              <Typography className="text-xs text-gray-500">
                Price per sq ft
              </Typography>
              <Typography className="text-xs ">
                ${(property.price / property.squareSpace).toFixed(2)}
              </Typography>
            </div>
            <div className="flex flex-row justify-between">
              <Button
                onClick={addToCart}
                color="green"
                fullWidth
                className="mt-4 mr-2"
              >
                Book Now
              </Button>
              <Button color="green" fullWidth className="mt-4 ml-2">
                Offer Now
              </Button>
            </div>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-green-700 text-sm font-medium mb-2">
              Have Question? Get in touch!
            </p>
            <Button className="bg-white text-black flex items-center px-4 rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-700 focus:ring-opacity-50 transition duration-300 ease-in-out">
              <LocalPhoneIcon />
              Contact us
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PropertyDetail;
