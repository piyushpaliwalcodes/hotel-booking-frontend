import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import { HotelType } from "../types/hoteltype";
import { getDate, newDate } from "react-datepicker/dist/date_utils";
const Myhotelbookings = () => {
  const { data: hotelData, isLoading } = useQuery<HotelType[]>(
    "fetchmyhotel",
    apiClient.fetchMyHotels
  );
  const day = (bookingDate: Date) => {
    return bookingDate.toLocaleDateString(undefined, {
      weekday: "long",
    });
  };

  if (!hotelData) return <>No hotel data found</>;

  return (
    <div className="flex flex-col">
      {hotelData.map((hotel) => (
        <div className="border rounded-md p-2 ">
          <h3 className="my-0">{hotel.name}</h3>
          <span className="text-sm my-0">
            {hotel.city},{hotel.country}
          </span>
          {hotel.bookings.map((booking) => (
            <div className="details my-2 ">
              <div className="date ">
                <span className="font-bold">Dates:</span>
                <span>
                  {day(new Date(booking.checkIn))},
                  {new Date(booking.checkIn).toLocaleDateString()}-
                  {day(new Date(booking.checkOut))},
                  {new Date(booking.checkOut).toLocaleDateString()}
                </span>
              </div>
              <div className="Guests ">
                <span className="font-bold">Guests:</span>
                <span>
                  {`${booking.adultCount} Adults,
                  ${booking.childCount} Children`}
                </span>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Myhotelbookings;
