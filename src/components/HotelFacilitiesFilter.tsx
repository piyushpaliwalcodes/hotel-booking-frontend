import { hotelFacilities, hotelTypes } from "../config/hotel-options-config";

type Props = {
  selectedFacilitiesTypes: string[];
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};
const HotelFacilitiesFilter = ({
  selectedFacilitiesTypes,
  onChange,
}: Props) => {
  return (
    <div className="border-b border-slate-300 pb-5">
      <h4 className="text-md font-semibold mb-2">Hotel Facilities</h4>
      {hotelFacilities.map((type) => (
        <label className="flex items-center space-x-2">
          <input
            type="checkbox"
            className="rounded"
            value={type}
            checked={selectedFacilitiesTypes.includes(type)}
            onChange={onChange}
          />
          <span>{type}</span>
        </label>
      ))}
    </div>
  );
};

export default HotelFacilitiesFilter;
