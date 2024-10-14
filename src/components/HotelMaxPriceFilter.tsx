type Props = {
  maxPrice?: number | undefined;
  onChange: (value: number | undefined) => void;
};

const HotelMaxPriceFilter = ({ maxPrice, onChange }: Props) => {
  return (
    <div>
      <h4 className="text-md font-semibold">Max Price</h4>
      <select
        value={maxPrice ?? ""}
        onChange={(event) =>
          onChange(
            event.target.value ? parseInt(event.target.value) : undefined
          )
        }
      >
        <option value="">Set Max Price</option>
        {[500, 1000, 2000, 4000].map((price) => (
          <option value={price}>Rs {price}</option>
        ))}
      </select>
    </div>
  );
};

export default HotelMaxPriceFilter;
