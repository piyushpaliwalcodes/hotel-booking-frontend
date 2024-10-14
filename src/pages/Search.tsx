import { useQuery } from "react-query";
import { useSearchContext } from "../contexts/SearchContext";
import * as apiClient from "../api-client";

import SearchResultsCard from "../components/SearchResultsCard";
import Pagination from "../components/Pagination";
import StarRatingFilter from "../components/StarRatingFilter";
import HotelTypesFilter from "../components/HotelTypesFilter";
import { useState } from "react";
import HotelFacilitiesFilter from "../components/HotelFacilitiesFilter";
import HotelMaxPriceFilter from "../components/HotelMaxPriceFilter";

const Search = () => {
  const search = useSearchContext();
  const [page, setPage] = useState<number>(1);
  const [sortOption, setSortOption] = useState<string>("");
  const [selectedStars, setSelectedStars] = useState<string[]>([]);
  const [hotelSelectedTypes, setHotelSelectedTypes] = useState<string[]>([]);
  const [hotelSelectedFacilities, setHotelSelectedFacilities] = useState<
    string[]
  >([]);
  const [maxPrice, setMaxPrice] = useState<number | undefined>();

  const handlePriceChange = (value: number | undefined) => {
    setMaxPrice(value);
  };

  const handleTypesChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const hotelType = event.target.value;
    setHotelSelectedTypes((prevTypes) =>
      event.target.checked
        ? [...prevTypes, hotelType]
        : prevTypes.filter((type) => type !== hotelType)
    );
  };

  const handleStarsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const starRating = event.target.value;
    setSelectedStars((prevStars) =>
      event.target.checked
        ? [...prevStars, starRating]
        : prevStars.filter((star) => star !== starRating)
    );
  };

  const handleFacilitiesChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const facility = event.target.value;
    setHotelSelectedFacilities((prevFacilities) =>
      event.target.checked
        ? [...prevFacilities, facility]
        : prevFacilities.filter((facilityType) => facilityType !== facility)
    );
  };
  //starratingn renderer

  const searchParams = {
    destination: search.destination,
    checkIn: search.checkIn.toISOString(),
    checkOut: search.checkOut.toISOString(),
    adultCount: search.adultCount.toString(),
    childCount: search.childCount.toString(),
    page: page.toString(),
    stars: selectedStars,
    types: hotelSelectedTypes,
    facilities: hotelSelectedFacilities,
    maxPrice: maxPrice?.toString(),
    sortOption,
  };

  const { data: hotelData } = useQuery(["searchHotels", searchParams], () => {
    return apiClient.searchHotels(searchParams);
  });

  return (
    <div className="grid  grid-cols-[180px_1fr] gap-5">
      <div className="rounded-lg border border-slate-300 p-5 h-fit sticky top-10">
        <div className=" space-y-5">
          <h3 className="text-lg font-semibold border-b  border-slate-300 pb-5">
            Filter by:
          </h3>
          <StarRatingFilter
            selectedStars={selectedStars}
            onChange={handleStarsChange}
          />
          <HotelTypesFilter
            selectedHotelTypes={hotelSelectedTypes}
            onChange={handleTypesChange}
          />
          <HotelFacilitiesFilter
            onChange={handleFacilitiesChange}
            selectedFacilitiesTypes={hotelSelectedFacilities}
          />
          <HotelMaxPriceFilter
            maxPrice={maxPrice}
            onChange={handlePriceChange}
          />
        </div>
      </div>

      <div className="flex flex-col gap-5">
        <div className="flex justify-between items-center">
          <span>{`${hotelData?.pagination.total} Hotels Found`}</span>
          <select
            value={sortOption}
            onChange={(event) => setSortOption(event.target.value)}
            className="p-2 boroder rounded-md"
          >
            <option value="">Sort by</option>
            <option value="starRating">Star Rating</option>
            <option value="pricePerNightAsc">
              Price Per Night (low to high)
            </option>
            <option value="pricePerNightDsc">
              Price Per Night (high to low)
            </option>
          </select>
        </div>
        {hotelData?.data?.map((hotel) => (
          <SearchResultsCard hotel={hotel} />
        ))}
        <div>
          <Pagination
            page={hotelData?.pagination.page || 1}
            pages={hotelData?.pagination.pages || 1}
            onPageChange={(page) => setPage(page)}
          />
        </div>
      </div>
    </div>
  );
};

export default Search;
