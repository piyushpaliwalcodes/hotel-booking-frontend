import { BiStar } from "react-icons/bi";
import { HotelType } from "../types/hoteltype";
import { Link } from "react-router-dom";

type Props = {
  hotel: HotelType;
};

const renderStars = (rating: number) => {
  const totalStars = 5;
  const starIcons = [];

  for (let i = 1; i <= totalStars; i++) {
    if (i <= rating) {
      starIcons.push(<BiStar className="text-yellow-500" />);
    } else {
      starIcons.push(<BiStar className="text-gray-500" />);
    }
  }

  return starIcons;
};

const SearchResultsCard = ({ hotel }: Props) => {
  return (
    <div className="grid grid-cols-1 xl:grid-cols-[2fr_3fr] border border-slate-500 rounded-md p-3 bg-white">
      <div className="w-full h-[300px] mr-2">
        <img
          className="w-full h-full  object-cover object-center"
          src={hotel.imageUrls[0]}
        />
      </div>
      <div className="flex flex-col justify-between ml-2 ">
        <div className="flex flex-row justify-left items-center">
          <span className="flex flex-row justify-center items-center">
            {renderStars(hotel.starRating)}
          </span>
          <span>{hotel.type}</span>
        </div>
        <Link to={`./detail/${hotel._id}`}>
          <h1 className="font-bold  text-2xl cursor-pointer">{hotel.name}</h1>
        </Link>
        <div className="justify-left line-clamp-4">{hotel.description}</div>
        <div className="grid grid-cols-2 items-end whitespace-nowrap">
          <div className="flex gap-1 items-center">
            {hotel.facilities.slice(0, 3).map((facility) => (
              <span className="bg-slate-300 p-2 rounded-lg font-bold text-xs whitespace-nowrap">
                {facility}
              </span>
            ))}
            <span className="text-sm">
              {hotel.facilities.length > 3 &&
                `+${hotel.facilities.length - 3} facilities`}
            </span>
          </div>
          <div className="flex flex-col items-end gap-1">
            <span className="font-bold">${hotel.pricePerNight} per night</span>
            <Link to={`./detail/${hotel._id}`}>
              <button className="bg-blue-600 text-white h-full p-2 font-bold text-md max-w-fit hover:bg-blue-500">
                View More
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchResultsCard;
