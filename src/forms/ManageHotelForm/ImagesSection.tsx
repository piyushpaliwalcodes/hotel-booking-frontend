import { useFormContext } from "react-hook-form";
import { HotelFormData } from "./ManageHotelForm";

const ImagesSection = () => {
  const {
    register,
    formState: { errors },
    watch,
    setValue,
  } = useFormContext<HotelFormData>();

  const existingImageUrls = watch("imageUrls");

  const handleDelete = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    imageUrl: string
  ) => {
    event.preventDefault();
    setValue(
      "imageUrls",
      existingImageUrls.filter((url) => url !== imageUrl)
    );
  };
  return (
    <div>
      <h2 className="text-2xl font-bold mb-3">Insert images</h2>
      <div className="border rounded p-4 flex flex-col gap-4">
        {existingImageUrls && (
          <div className="grid grid-cols-6 gap-4">
            {existingImageUrls.map((url) => (
              <div className="relative group">
                <img src={url} className="min-h-full object-cover" />
                <button
                  className="absolute inset-0 flex items-center justify-center bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 text-white"
                  onClick={(event) =>
                    handleDelete(
                      event as React.MouseEvent<HTMLButtonElement, MouseEvent>,
                      url
                    )
                  }
                >
                  DELETE
                </button>
              </div>
            ))}
          </div>
        )}
        <input
          type="file"
          multiple
          className="w-full text-gray-700"
          {...register("imageFiles", {
            validate: (imageFiles) => {
              const totalLenghth =
                imageFiles.length + (existingImageUrls.length || 0);

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
