/** @format */

// src/components/PropertyCard.js
import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Card,
  CardBody,
  CardFooter,
  Typography,
  Button,
  CardHeader,
  IconButton,
} from "@material-tailwind/react";
import BedIcon from "@mui/icons-material/Bed";
import BathroomIcon from "@mui/icons-material/Bathtub";
import FavoriteIcon from "@mui/icons-material/Favorite";
import SquareFootIcon from "@mui/icons-material/SquareFoot";

const PropertyCard = ({
  id,
  image,
  name,
  squareSpace,
  bedrooms,
  bathrooms,
  price,
  location,
  rentPrice,
}) => {
  const [isFavorite, setIsFavorite] = useState(false);

  const toggleFavorite = () => {
    setIsFavorite(!isFavorite);
  };
  return (
    <Card className="w-full max-w-sm shadow-lg">
      <CardHeader floated={false} color="blue-gray">
        <img
          src="https://images.unsplash.com/photo-1499696010180-025ef6e1a8f9?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          alt="ui/ux review check"
        />
        <div className="to-bg-black-10 absolute inset-0 h-full w-full bg-gradient-to-tr from-transparent via-transparent to-black/60 " />
        <IconButton
          onClick={toggleFavorite}
          size="sm"
          color="red"
          variant="text"
          className={`!absolute top-4 right-4 rounded-full ${
            isFavorite ? "text-red-500" : "text-white"
          }`}
        >
          <FavoriteIcon />
        </IconButton>
      </CardHeader>
      <CardBody>
        <div>
          <Typography color="blue-gray" className="text-lg font-semibold">
            {name}
          </Typography>
          <Typography color="gray" className="text-base">
            {location}
          </Typography>
        </div>

        <hr className="my-4" />
        <div className="flex flex-row justify-between">
          <div className="flex flex-row items-center justify-center">
            <SquareFootIcon color="success" />
            <Typography className="text-lg font-thin ml-2">
              {squareSpace} sqft
            </Typography>
          </div>
          <div className="flex items-center">
            <BedIcon color="success" />
            <Typography className="text-lg font-thin ml-2">
              {bedrooms} Beds
            </Typography>
          </div>
          <div className="flex items-center">
            <BathroomIcon color="success" />
            <Typography className="text-lg font-thin ml-2">
              {bathrooms} Baths
            </Typography>
          </div>
        </div>
        <hr className="my-4" />
        <div className="flex flex-row justify-between">
          <div>
            <Typography className="text-[#c4c4c4] text-base font-medium">
              Price
            </Typography>
            <Typography className="text-lg font-thin">${price}</Typography>
          </div>
          <div>
            <Typography className="text-[#c4c4c4] text-base font-medium">
              Rent
            </Typography>
            <Typography className="text-lg font-thin">${rentPrice}</Typography>
          </div>
        </div>
      </CardBody>
      <CardFooter className="flex justify-between items-center pt-3">
        <Link to={`/property/${id}`} className="w-full">
          <Button color="green" size="sm" className="capitalize w-full">
            View Details
          </Button>
        </Link>
      </CardFooter>
    </Card>
  );
};

export default PropertyCard;
