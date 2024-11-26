import { FormData } from "../../types/formData.type";

interface Props {
  formData: FormData;
  errors: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const AddressAndDemographics = ({ formData, errors, handleChange }: Props) => {
  return (
    <div className="text-black flex flex-col w-full">
      <h2 className="font-semibold text-lg mb-4">Address & Demographics</h2>
      <div className="flex flex-col gap-2">
        <label className="block text-sm">Address:</label>
        <input
          type="text"
          name="Address"
          value={formData.Address}
          onChange={handleChange}
          className={`w-full px-3 py-2 border ${
            errors.Address ? "border-red-500" : "border-gray-500"
          } rounded-md`}
          required
        />
        {errors.Address && (
          <p className="text-red-500 text-sm">{errors.Address}</p>
        )}

        {/* civi status and sex */}
        <div className="flex gap-4 w-full">
          <div className="flex-1 w-full">
            <label className="block text-sm">Civil Status:</label>
            <select
              name="CivilStatus"
              value={formData.CivilStatus}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.CivilStatus ? "border-red-500" : "border-gray-500"
              } rounded-md`}
              required
            >
              <option value="">Select</option>
              <option value="Single">Single</option>
              <option value="Married">Married</option>
            </select>
            {errors.CivilStatus && (
              <p className="text-red-500 text-sm">{errors.CivilStatus}</p>
            )}
          </div>

          <div className="flex-1 w-full">
            <label className="block text-sm">Sex:</label>
            <select
              name="Sex"
              value={formData.Sex}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${
                errors.Sex ? "border-red-500" : "border-gray-500"
              } rounded-md`}
              required
            >
              <option value="">Select</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.Sex && <p className="text-red-500 text-sm">{errors.Sex}</p>}
          </div>
        </div>


        <div>
          <label className="block text-sm">Institution:</label>
          <input
            type="text"
            name="Institution"
            value={formData.Institution}
            onChange={handleChange}
            className={`w-full px-3 py-2 border ${
              errors.Institution ? "border-red-500" : "border-gray-500"
            } rounded-md`}
            required
          />
          {errors.Institution && (
            <p className="text-red-500 text-sm">{errors.Institution}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AddressAndDemographics;
