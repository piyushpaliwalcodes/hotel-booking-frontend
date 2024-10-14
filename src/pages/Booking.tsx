import { useQuery } from "react-query";
import * as apiClient from "../api-client";
import BookingForm from "../forms/BookingForm/BookingForm";
import { useParams } from "react-router-dom";
import BookingDetail from "../components/BookingDetail";
import { useEffect, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { PaymentIntentResponse } from "../types/hoteltype";
import { Elements } from "@stripe/react-stripe-js";
import { useAppContext } from "../contexts/AppContext";

const Booking = () => {
  const { stripePromise } = useAppContext();
  const [numberOfNights, setNumberOfNights] = useState<number>(0);
  const search = useSearchContext();

  useEffect(() => {
    if (search.checkIn && search.checkOut) {
      const nights =
        Math.abs(search.checkOut.getTime() - search.checkIn.getTime()) /
        (1000 * 24 * 60 * 60);

      setNumberOfNights(Math.ceil(nights));
    }
  }, [search.checkIn, search.checkOut]);

  const { data: currentUser } = useQuery(
    "fetchCurrentUser",
    apiClient.fetchCurrentUser
  );
  console.log(currentUser?.email);
  const params = useParams();
  const { data: hotelData } = useQuery(
    ["fetchMyHotelById", params.hotelId],
    () => apiClient.fetchMyHotelById(params.hotelId),
    {
      enabled: !!params.hotelId,
    }
  );

  console.log("HOTEL ID", params.hotelId, "Number of Nights", numberOfNights);
  const { data: paymentIntentData } = useQuery(
    "createPaymentIntent",
    (): Promise<PaymentIntentResponse> =>
      apiClient.CreatePaymentIntent(
        params.hotelId as string,
        numberOfNights.toString()
      ),
    { enabled: !!params.hotelId && numberOfNights > 0 }
  );

  console.log(
    "INFO BEFRO FORM",
    currentUser,
    "PAYMENT DATA",
    paymentIntentData
  );
  if (!hotelData) return <></>;
  console.log("HOTEL DATA", hotelData);
  return (
    <div className="grid grid-cols-[1fr_2fr] bg-white rounded-md p-2">
      <div className="border border-slate-300 mr-2 rounded-lg">
        <BookingDetail
          hotelData={hotelData}
          checkIn={search.checkIn}
          checkOut={search.checkOut}
          adultCount={search.adultCount}
          childCount={search.childCount}
          numberOfNights={numberOfNights}
        />
      </div>

      {currentUser && paymentIntentData && (
        <Elements
          stripe={stripePromise}
          options={{ clientSecret: paymentIntentData.clientSecret }}
        >
          <BookingForm
            currentUser={currentUser}
            paymentIntent={paymentIntentData}
          />
        </Elements>
      )}
    </div>
  );
};

export default Booking;
