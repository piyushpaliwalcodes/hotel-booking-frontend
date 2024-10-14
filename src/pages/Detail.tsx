import { useQuery } from "react-query";
import { useParams } from "react-router-dom";
import * as apiClient from "../api-client";
import { AiFillStar } from "react-icons/ai";
import { HotelType } from "../types/hoteltype";
import GuestInfoForm from "../forms/GuestInfoForm/GuestInfoForm";

const Detail = () => {
  const { hotelId } = useParams();

  const { data: hotel } = useQuery<HotelType>(
    "fetchHotelById",
    () => {
      return apiClient.fetchMyHotelById(hotelId as string);
    },
    { enabled: !!hotelId }
  );
  if (!hotel) {
    return <h3>HOTEL NOT FOUND</h3>;
  }
  return (
    <div className="space-y-6 bg-white rounded-md p-2">
      <div>
        <span className="flex flex-row">
          {[1, 2, 3, 4, 5].map((i) =>
            i <= hotel.starRating ? (
              <AiFillStar className="fill-yellow-500" />
            ) : (
              <AiFillStar className="fill-gray-500" />
            )
          )}
        </span>
        <h1 className="text-3xl font-bold">{hotel.name}</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-3">
          {hotel.imageUrls.map((url) => (
            <div className="h-[300px]">
              <img
                src={url}
                className="w-full h-full object-cover object-center"
              />
            </div>
          ))}
        </div>
        <div className="grid grid-cols-3  gap-2  items-center justify-between w-full my-1">
          {hotel.facilities.map((facility) => (
            <span className="border border-slate-400 rounded-sm p-3">
              {facility}
            </span>
          ))}
        </div>
        <div className="grid grid-cols-1 lg:grid-cols-[2fr_1fr] justify-between w-full">
          <div className="whiteSpace-pre-;ine">{hotel.description}</div>
          <div className="h-fit flex justify-end">
            <GuestInfoForm
              hotelId={hotel._id}
              pricePerNight={hotel.pricePerNight}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Detail;
