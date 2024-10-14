import { useAppContext } from "./contexts/AppContext";
import { BookingFormData } from "./forms/BookingForm/BookingForm";
import { RegisterFormData } from "./pages/Register";
import { SignInFormData } from "./pages/Signin";
import { useNavigate } from "react-router-dom";
import {
  BookingType,
  HotelSearchResponse,
  HotelType,
  PaymentIntentResponse,
  UserType,
} from "./types/hoteltype";
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || "";

export const fetchCurrentUser = async (): Promise<UserType> => {
  const response = await fetch(`${API_BASE_URL}/api/users/me`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error fetching user");
  }
  return response.json();
};

export const register = async (formData: RegisterFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/users/register`, {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });

  const responseBody = await response.json();
  if (!response.ok) {
    throw new Error(responseBody.message);
  }
};

export const validateToken = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
    credentials: "include",
  });
  console.log(response);
  if (!response.ok) {
    console.log("HERROE");
    throw new Error("Token Invalid");
  }
  return response.json();
};

export const signIn = async (formData: SignInFormData) => {
  const response = await fetch(`${API_BASE_URL}/api/auth/login`, {
    credentials: "include",
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(formData),
  });
  const body = await response.json();
  if (!response.ok) {
    throw new Error(body.message);
  }
  return body;
};

export const signOut = async () => {
  const response = await fetch(`${API_BASE_URL}/api/auth/logout`, {
    method: "POST",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("ERROR DURING SIGN OUT");
  }
};

export const addMyHotel = async (hotelFormData: FormData) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`, {
    method: "POST",
    credentials: "include",
    body: hotelFormData,
  });
  if (!response.ok) {
    throw new Error("Failed to add hotel");
  }

  return response.json();
};

export const fetchMyHotels = async (): Promise<HotelType[]> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels`, {
    method: "GET",
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("Error Fetching hotels");
  }

  return response.json();
};

export const fetchMyHotelById = async (
  hotelId: string | undefined
): Promise<HotelType> => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/${hotelId}`, {
    credentials: "include",
  });
  if (!response.ok) {
    throw new Error("ERROR IN FETCHMYHOTELAPI");
  }
  return response.json();
};

export const updateMyHotelById = async (hotelFormData: FormData) => {
  const response = await fetch(
    `${API_BASE_URL}/api/hotels/${hotelFormData.get("HotelId")}`,
    {
      method: "PUT",
      body: hotelFormData,
      credentials: "include",
    }
  );

  if (!response.ok) {
    throw new Error("Failed to update Hotel");
  }

  return response.json();
};

//search parameters

export type SearchParams = {
  destination: string;
  adultCount: string;
  checkIn: string;
  checkOut: string;
  childCount: string;
  page?: string;
  fascilities?: string[];
  types?: string[];
  stars?: string[];
  maxPrice?: string;
  sortOption?: string;
};

export const searchHotels = async (
  searchParams: SearchParams
): Promise<HotelSearchResponse> => {
  const queryParams = new URLSearchParams();
  queryParams.append("destination", searchParams.destination || "");
  queryParams.append("checkIn", searchParams.checkIn || "");
  queryParams.append("checkOut", searchParams.checkOut || "");
  queryParams.append("adultCount", searchParams.adultCount);
  queryParams.append("childCount", searchParams.childCount);
  queryParams.append("page", searchParams.page || "");
  queryParams.append("maxPrice", searchParams.maxPrice || "");
  queryParams.append("sortOption", searchParams.sortOption || "");
  searchParams.fascilities?.forEach((facility) => {
    queryParams.append("facilities", facility);
  });

  searchParams.types?.forEach((type) => queryParams.append("types", type));
  searchParams.stars?.forEach((star) => queryParams.append("stars", star));

  const response = await fetch(
    `${API_BASE_URL}/api/searchhotels/search?${queryParams.toString()}`
  );

  if (!response.ok) {
    throw new Error("Error fetching hotels");
  }

  return response.json();
};

export const CreatePaymentIntent = async (
  hotelId: string,
  numberOfNights: string
): Promise<PaymentIntentResponse> => {
  console.log(
    `Sending POST request to: ${API_BASE_URL}/api/searchhotels/${hotelId}/bookings/payment-intent`
  );
  console.log("Request Body:", { numberOfNights });
  const response = await fetch(
    `${API_BASE_URL}/api/searchhotels/${hotelId}/bookings/payment-intent`,
    {
      credentials: "include",
      method: "POST",
      body: JSON.stringify({ numberOfNights }),
      headers: {
        "Content-Type": "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Error occured while posting for payment intent");
  }
  console.log("PAYMENT INTENT RSPONE", response);
  return response.json();
};

export const createRoomBooking = async (formData: BookingFormData) => {
  console.log("FORMDATA", formData);
  const response = await fetch(
    `${API_BASE_URL}/api/searchhotels/${formData.hotelId}/bookings`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify(formData),
    }
  );

  if (!response.ok) {
    throw new Error("Error booking room");
  }
};

export const deleteMyHotel = async (hotelId: string) => {
  const response = await fetch(`${API_BASE_URL}/api/hotels/delete/${hotelId}`, {
    method: "DELETE",
    credentials: "include",
  });

  if (!response.ok) {
    throw new Error("ERROR WHILE DELETING");
  }
};
