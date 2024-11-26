import { FormData } from "../../types/formData.type";

interface Props {
  formData: FormData;
  errors: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const ViolationDetails = ({ formData, errors, handleChange }: Props) => {
  return (
    <div className="text-black flex flex-col w-full">
      <h2 className="font-semibold text-lg mb-4">Violation Details</h2>
      <div className="flex flex-col gap-2">
        <div>
          <label className="block text-sm">Location:</label>
          <input
            type="text"
            name="Location"
            value={formData.Location}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.Location ? "border-red-500" : "border-gray-500"
            } rounded-md`}
            required
          />
          {errors.Location && (
            <p className="text-red-500 text-sm">{errors.Location}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Apprehender Name:</label>
          <input
            type="text"
            name="ApprehenderName"
            value={formData.ApprehenderName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.ApprehenderName ? "border-red-500" : "border-gray-500"
            } rounded-md`}
            required
          />
          {errors.ApprehenderName && (
            <p className="text-red-500 text-sm">{errors.ApprehenderName}</p>
          )}
        </div>

        <div>
          <label className="block text-sm">Date Apprehended:</label>
          <input
            type="date"
            name="DateApprehended"
            value={formData.DateApprehended}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.DateApprehended ? "border-red-500" : "border-gray-500"
            } rounded-md`}
            required
          />
          {errors.DateApprehended && (
            <p className="text-red-500 text-sm">{errors.DateApprehended}</p>
          )}
        </div>

        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-sm">Apprehender Type:</label>
            <select
              name="ApprehenderType"
              value={formData.ApprehenderType}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.ApprehenderType ? "border-red-500" : "border-gray-500"
              } rounded-md`}
              required
            >
              <option value="">--Select--</option>
              <option value="Police">Police</option>
              <option value="Agent">Agent</option>
            </select>
            {errors.ApprehenderType && (
              <p className="text-red-500 text-sm">{errors.ApprehenderType}</p>
            )}
          </div>

          <div className="flex-1">
            <label className="block text-sm">Violator Type:</label>
            <select
              name="ViolatorType"
              value={formData.ViolatorType}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.ViolatorType ? "border-red-500" : "border-gray-500"
              } rounded-md`}
              required
            >
              <option value="">--Select--</option>
              <option value="Student">Student</option>
              <option value="Civilian">Minor</option>
              <option value="Civilian">Civilian</option>
            </select>
            {errors.ViolatorType && (
              <p className="text-red-500 text-sm">{errors.ViolatorType}</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ViolationDetails;
