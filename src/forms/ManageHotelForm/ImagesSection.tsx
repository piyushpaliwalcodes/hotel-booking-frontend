import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
  } = useFormContext<HotelFormData>();

  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Insert images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        <input
          type="file"
          multiple
          className="w-full text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLenghth = imageFiles.length;

              if (totalLenghth === 0) {
                return "At least one image should be added";
              }

              if (totalLenghth > 6) {
                return "Total number of image should not be more than 6";
              }
            },
          })}
        />
      </div>
      {errors.imageFiles && <span>{errors.imageFiles.message}</span>}
    </div>
  );
};

export default ImagesSection;
