import { FormEvent, useState } from "react";
import { useSearchContext } from "../contexts/SearchContext";
import { MdTravelExplore } from "react-icons/md";
import "react-datepicker/dist/react-datepicker.css";
import DatePicker from "react-datepicker";
import { useNavigate } from "react-router-dom";
import * as apiClient from "../api-client";
import { validateToken } from "../api-client";
const SearchBar = () => {
  const search = useSearchContext();
  const navigate = useNavigate();
  const [destination, setDestination] = useState<string>(search.destination);
  const [checkIn, setCheckIn] = useState<Date>(search.checkIn);
  const [checkOut, setCheckOut] = useState<Date>(search.checkOut);
  const [adultCount, setAdultCount] = useState<number>(search.adultCount);
  const [childCount, setChildCount] = useState<number>(search.childCount);

  const handleSubmit = async (event: FormEvent) => {
    event.preventDefault();
    console.log("AT HANLDE SUBMIT");
    search.saveSearchValues(
      destination,
      checkIn,
      checkOut,
      adultCount,
      childCount
    );

    try {
      await apiClient.validateToken();
      navigate("/search");
    } catch (error) {
      navigate("/sign-in");
    }
  };
  const maxDate = new Date();
  maxDate.setFullYear(maxDate.getFullYear() + 1);

  const handleClear = (event: FormEvent) => {
    event.preventDefault();
    // Reset form state
    setDestination("");
    setCheckIn(new Date());
    setCheckOut(new Date());
    setAdultCount(1);
    setChildCount(0);

    // Clear session storage
    sessionStorage.clear();

    // Clear values in the context (SearchContext)
    search.saveSearchValues("", new Date(), new Date(), 1, 0);
  };
  return (
    <form
      onSubmit={handleSubmit}
      className="-mt-8 p-3 bg-orange-400 rounded shadow-md grid grid-cols-2 lg:grid-cols-3 2xl:grid-cols-5 items-center gap-4"
    >
      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <MdTravelExplore size={25} className="mr-2" />

        <input
          placeholder="Where to?"
          className="text-md w-full focus:outline-none"
          value={destination}
          onChange={(event) => setDestination(event.target.value)}
        />
      </div>

      <div className="flex flex-row items-center flex-1 bg-white p-2">
        <label className="items-center flex">
          Adults:
          <input
            type="number"
            placeholder="How many adults"
            className="text-md w-full focus:outline-none"
            min={1}
            max={20}
            value={adultCount}
            onChange={(event) => setAdultCount(parseInt(event.target.value))}
          />
        </label>
        <label className="items-center flex">
          Children:
          <input
            type="number"
            placeholder="How many adults"
            className="text-md w-full focus:outline-none"
            min={0}
            max={20}
            value={childCount}
            onChange={(event) => setChildCount(parseInt(event.target.value))}
          />
        </label>
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => {
            setCheckIn(date as Date);
          }}
          selectStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={new Date()}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div>
        <DatePicker
          selected={checkIn}
          onChange={(date) => {
            setCheckOut(date as Date);
          }}
          selectStart
          startDate={checkIn}
          endDate={checkOut}
          minDate={new Date()}
          maxDate={maxDate}
          placeholderText="Check-in Date"
          className="min-w-full bg-white p-2 focus:outline-none"
          wrapperClassName="min-w-full"
        />
      </div>
      <div className="flex gap-1">
        <button
          type="submit"
          className="w-2/3 bg-blue-600 text-white h-full p-2 font-bold text-xl hover:bg-blue-500"
        >
          Search
        </button>
        <button
          onClick={(event) => handleClear(event)}
          className="w-2/3 bg-red-600 text-white h-full p-2 font-bold text-xl hover:bg-red-500"
        >
          Clear
        </button>
      </div>
    </form>
  );
};

export default SearchBar;
