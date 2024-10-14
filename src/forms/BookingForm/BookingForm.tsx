import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { PaymentIntentResponse, UserType } from "../../types/hoteltype";
import { useContext, useEffect, useState } from "react";
import { CardElement, useElements, useStripe } from "@stripe/react-stripe-js";
import { StripeCardElement } from "@stripe/stripe-js";
import { useSearchContext } from "../../contexts/SearchContext";
import * as apiClient from "../../api-client";
import { useAppContext } from "../../contexts/AppContext";

type Props = {
  currentUser: UserType | undefined;
  paymentIntent: PaymentIntentResponse;
};

export type BookingFormData = {
  firstName: string;
  lastName: string;
  email: string;
  adultCount: number;
  childCount: number;
  checkIn: string;
  checkOut: string;
  hotelId: string;
  paymentIntentId: string;
  amount: number;
};

const BookingForm = ({ currentUser, paymentIntent }: Props) => {
  const { showToast } = useAppContext();
  const stripe = useStripe();
  const elements = useElements();
  const search = useSearchContext();
  const { hotelId } = useParams();

  const { mutate: bookRoom, isLoading } = useMutation(
    apiClient.createRoomBooking,
    {
      onSuccess: () => {
        showToast({ message: "Booking saved!", type: "SUCCESS" });
      },
      onError: () => {
        showToast({ message: "Error saving booking", type: "ERROR" });
      },
    }
  );
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<BookingFormData>({
    defaultValues: {
      firstName: currentUser?.firstName,
      lastName: currentUser?.lastName,
      email: currentUser?.email,
      adultCount: search.adultCount,
      childCount: search.childCount,
      checkIn: search.checkIn.toISOString(),
      checkOut: search.checkOut.toISOString(),
      hotelId: hotelId,
      amount: paymentIntent.amount,
    },
  });

  console.log("PAYMENT INTENT RESPONSE", paymentIntent);
  console.log("CURRENT USER ", currentUser);

  const onSubmit = async (formData: BookingFormData) => {
    if (!stripe || !elements) {
      return;
    }
    const result = await stripe.confirmCardPayment(paymentIntent.clientSecret, {
      payment_method: {
        card: elements.getElement(CardElement) as StripeCardElement,
      },
    });

    if (result.paymentIntent?.status === "succeeded") {
      bookRoom({ ...formData, paymentIntentId: result.paymentIntent.id });
    }
  };

  return (
    <form
      className="grid grid-cols-1 gap-5  rounded-lg border border-slate-300 p-5"
      onSubmit={handleSubmit(onSubmit)}
    >
      <span className="text-exl font-bold">CONFIRM YOUR DETAILS</span>
      <div
        className="
        grid grid-cols-2 gap-6"
      >
        <label className="text-gray-700 flex-1 text-sm font-bold">
          First Name:
          <input
            type="text"
            className="bg-gray-300 p-1 text-gray-700 w-full "
            placeholder="enter first name"
            readOnly
            disabled
            {...register("firstName")}
          />
        </label>
        <label className="text-gray-700 text-sm font-bold flex-1">
          Last Name:
          <input
            type="text"
            readOnly
            disabled
            className="bg-gray-300 p-1 text-gray-700 w-full "
            placeholder="enter last name"
            {...register("lastName")}
          />
        </label>
        <label className="text-sm font-bold text-gray-700 flex-1">
          Email:
          <input
            type="email"
            className="bg-gray-300 w-full text-gray-700 p-1"
            placeholder="enter email.."
            readOnly
            disabled
            {...register("email")}
          />
        </label>
      </div>
      <div className="space-y-2">
        <h2 className="text-xl font-semibold">Your Price Summary</h2>
        <div className="bg-blue-200 p-4 rounded-md">
          <div className="font-semibold text-lg">
            Total Cost: Rs
            {` ${
              paymentIntent?.amount ? paymentIntent.amount.toFixed(2) : "0.00"
            }`}
          </div>
          <div className="text-xs">Includes taxes and charges</div>
        </div>
      </div>

      <div className="space-y-2">
        <h3 className="text-xs">Payment Details</h3>
        <CardElement
          id="payment-element"
          className="border rounded-md p-2 text-sm"
        />
      </div>
      <div className="flex justify-end bg-blue-600 text-white-2 hover:bg-blue-500 disabled:bg-gray-500">
        <button type="submit" disabled={isLoading}>
          {isLoading ? "Saving..." : "Confirm Booking"}
        </button>
      </div>
    </form>
  );
};

export default BookingForm;
