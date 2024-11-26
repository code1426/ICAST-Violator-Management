import { FormData } from "../../types/formData.type";

interface Props {
  formData: FormData;
  errors: FormData;
  handleChange: (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void;
  checkViolatorExists: (value: Partial<FormData>) => Promise<boolean>;
}

const PersonalDetails = ({formData, errors, handleChange}: Props) => {
  return (
    <div className="text-black flex flex-col w-full">
      <h2 className="font-semibold text-lg mb-4">Personal Details</h2>
      <div className="flex flex-col gap-2">
        {/* First Name */}
        <div className="flex-1">
          <label className="block text-sm">First Name:</label>
          <input
            type="text"
            name="FirstName"
            value={formData.FirstName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border bg-color6 ${errors.FirstName ? "border-red-500" : "border-gray-500"} rounded-md`}
            required
          />
          {errors.FirstName && <p className="text-red-500 text-sm">{errors.FirstName}</p>}
        </div>

        {/* Last Name */}
        <div className="flex-1">
          <label className="block text-sm">Last Name:</label>
          <input
            type="text"
            name="LastName"
            value={formData.LastName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border bg-color6 ${errors.LastName ? "border-red-500" : "border-gray-500"} rounded-md`}
            required
          />
          {errors.LastName && <p className="text-red-500 text-sm">{errors.LastName}</p>}
        </div>

        {/* Middle Name */}
        <div className="flex-1">
          <label className="block text-sm">Middle Name:</label>
          <input
            type="text"
            name="MiddleName"
            value={formData.MiddleName}
            onChange={handleChange}
            className={`w-full px-3 py-2 border bg-color6 ${errors.MiddleName ? "border-red-500" : "border-gray-500"} rounded-md`}
          />
          {errors.MiddleName && <p className="text-red-500 text-sm">{errors.MiddleName}</p>}
        </div>

        <div className="flex-col">
          <label className="block text-sm">Date of Birth:</label>
          <input
            type="date"
            name="DateOfBirth"
            value={formData.DateOfBirth}
            onChange={handleChange}
            className={`w-full px-3 py-2 border bg-color6 ${errors.DateOfBirth ? "border-red-500" : "border-gray-500"} rounded-md`}
            required
          />
          {errors.DateOfBirth && <p className="text-red-500 text-sm">{errors.DateOfBirth}</p>}
        </div>
      </div>
    </div>
  )
}

export default PersonalDetails;
