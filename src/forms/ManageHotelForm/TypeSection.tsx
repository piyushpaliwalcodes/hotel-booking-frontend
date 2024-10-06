import { useFormContext } from "react-hook-form";
import { hotelTypes } from "../../config/hotel-options-config";
import { HotelFormData } from "./ManageHotelForm";
const TypeSection = () => {
  const {
    register,
    watch,
    formState: { errors },
  } = useFormContext<HotelFormData>();
  const typeWatch = watch("type");

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Type</h2>
      <div className="grid grid-cols-5 gap-2">
        {hotelTypes.map((type) => (
          <label
            className={
              typeWatch === type
                ? "cursor-poinger bg-blue-300 text-sm rounded-full px-4 py-w font-semibold"
                : "cursor-poinger bg-gray-300 text-sm rounded-full px-4 py-w font-semibold"
            }
          >
            <input
              className="hidden "
              style={{ caretColor: "transparent" }}
              type="radio"
              value={type}
              {...register("type", { required: "This field is required" })}
            />
            <span>{type}</span>
          </label>
        ))}
      </div>
      {errors.type && (
        <span className="text-red-500 text-sm-font">{errors.type.message}</span>
      )}
    </div>
  );
};

export default TypeSection;
