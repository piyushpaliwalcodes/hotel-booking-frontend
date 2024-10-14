import { Link } from "react-router-dom";
import * as apiClient from "../api-client";
import { useMutation, useQuery } from "react-query";
import { BsBuilding, BsMap } from "react-icons/bs";
import { BiHotel, BiMoney, BiStar } from "react-icons/bi";
import { useAppContext } from "../contexts/AppContext";
import { useEffect } from "react";
const MyHotels = () => {
  const { showToast } = useAppContext();
  const { mutate, isLoading } = useMutation(apiClient.deleteMyHotel, {
    onSuccess: () => {
      showToast({ message: "Hotel deleted successfully", type: "SUCCESS" });
      refetch();
    },
    onError: (error: any) => {
      showToast({ message: `Deletion error ${error}`, type: "ERROR" });
    },
  });

  const handleDelete = (hotelId: string) => {
    mutate(hotelId);
  };

  const { data: hotelData, refetch } = useQuery(
    "fetchMyHotels",
    apiClient.fetchMyHotels,
    {
      onError: () => {
        handleDelete;
      },
    }
  );
  if (!hotelData) {
    return <span>NO HOTELS FOUND</span>;
  }

  return (
    <div className="space-y-5 bg-white rounded-md p-2">
      <span className="flex justify-between">
        <h1 className="text-3xl font-bold">My Hotels</h1>
        <Link
          to="/add-hotel"
          className="flex bg-blue-600 text-white text-xl fong-bold p-2 hover:bg-blue-300"
        >
          Add Hotel
        </Link>
      </span>
      <div className="grid grid-cols-1 gap-2">
        {hotelData?.map((hotel) => (
          <div className="flex flex-col justify-between border border-slate-300 rounded-lg p-3 gap-1">
            <div className="flex flex-row h-[20%] gap-3">
              {hotel.imageUrls.map((url) => (
                <img className="" src={url} alt={hotel.name} />
              ))}
            </div>
            <h2 className="text-2xl font-bold">{hotel.name}</h2>
            <div className="whitespace-pre-line ">{hotel.description}</div>
            <div className="grid grid-cols-3 md:grid-cols-5 gap-2">
              <div className="border border-slate-300 rounded-sm p-2 flex items-center justify-center whitespace-nowrap">
                <BsMap className="mr-1" />
                {hotel.city}, {hotel.country}
              </div>
              <div className="border border-slate-300 rounded-sm p-2 flex items-center justify-center whitespace-nowrap">
                <BsBuilding className="mr-1" />
                {hotel.type}
              </div>
              <div className="border border-slate-300 rounded-sm p-2 flex items-center justify-center whitespace-nowrap">
                <BiMoney className="mr-1" />${hotel.pricePerNight}
              </div>
              <div className="border border-slate-300 rounded-sm p-2 flex items-center justify-center whitespace-nowrap">
                <BiHotel className="mr-1" />
                {hotel.adultCount} adults, {hotel.childCount} children
              </div>
              <div className="border border-slate-300 rounded-sm p-2 flex items-center justify-center whitespace-nowrap">
                <BiStar className="mr-1" />
                {hotel.starRating}
              </div>
            </div>
            <span className="flex justify-end gap-2 ">
              <Link
                to={`/edit-hotel/${hotel._id}`}
                className="flex bg-blue-600 text-white text-xl fong-bold p-2 hover:bg-blue-300"
              >
                View Details
              </Link>
              <button
                className="flex bg-blue-600 text-white text-xl fong-bold p-2 hover:bg-blue-300"
                onClick={() => handleDelete(hotel._id)}
              >
                Delete
              </button>
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyHotels;
