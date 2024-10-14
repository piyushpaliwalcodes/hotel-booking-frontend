import { useForm } from "react-hook-form";
import { HotelType } from "../types/hoteltype";

type Props = {
  checkIn: Date;
  checkOut: Date;
  adultCount: number;
  childCount: number;
  numberOfNights: number;
  hotelData: HotelType;
};

const BookingDetail = ({
  checkIn,
  checkOut,
  childCount,
  adultCount,
  numberOfNights,
  hotelData,
}: Props) => {
  const { register, watch } = useForm<HotelType>({
    defaultValues: {
      city: hotelData.city,
      country: hotelData.country,
      name: hotelData.name,
    },
  });
  return (
    <div className="grid grid-cols-1 justify-center items-center p-2">
      <h3 className="font-bold text-lg ">YOUR BOOKING DETAILS</h3>
      <div>
        Location:
        <div className="text-sm font-bold">{`${hotelData.name},${hotelData.city},${hotelData.country}`}</div>
        <div className="flex">
          <div>
            Check-in <div className="font-bold">{checkIn.toDateString()}</div>
          </div>
        </div>
        <div className="flex ">
          <div>
            Check-out
            <div className="font-bold text-sm">{checkOut.toDateString()}</div>
          </div>
        </div>
        <div className="border-t border-b py-2">
          Total Length of stay:
          <div className="font-bold">{numberOfNights}</div>
        </div>
        <div>
          Guests
          <div className="">
            <span className="font-bold">{adultCount}</span> adults &{" "}
            <span className="font-bold">{childCount}</span> children
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingDetail;
