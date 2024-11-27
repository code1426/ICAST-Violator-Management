import { FormData } from "../../types/formData.type";

interface Props {
  formData: FormData;
  errors: FormData;
  handleChange: (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => void;
}

const PaymentDetails = ({ formData, errors, handleChange }: Props) => {
  return (
    <div className="text-black flex flex-col w-full">
      <h2 className="font-semibold text-lg mb-4">Payment Details</h2>
      <div className="flex flex-col gap-2">
        <label className="block text-sm">OR Number:</label>
        <input
          type="text"
          name="ORNumber"
          value={formData.ORNumber}
          onChange={handleChange}
          className={`w-full px-3 py-2 border-2 focus:outline-none focus:ring-1 focus:ring-${
            errors.ORNumber ? "red-700" : "gray-700"
          } ${
            errors.ORNumber ? "border-red-700" : "border-gray-700"
          } rounded-md`}
          required
        />
        {errors.ORNumber && (
          <p className="text-red-700 text-sm">{errors.ORNumber}</p>
        )}

        <div>
          <label className="block text-sm">Payment Status:</label>
          <select
            name="PaymentStatus"
            value={formData.PaymentStatus}
            onChange={handleChange}
            className={`w-full px-3 py-2 border-2 focus:outline-none focus:ring-1 focus:ring-${
              errors.PaymentStatus ? "red-700" : "gray-700"
            } ${
              errors.PaymentStatus ? "border-red-700" : "border-gray-700"
            } rounded-md`}
            required
          >
            <option value="">Select</option>
            <option value="Paid">Paid</option>
            <option value="Unpaid">Unpaid</option>
          </select>
          {errors.PaymentStatus && (
            <p className="text-red-700 mt-2 text-sm">{errors.PaymentStatus}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default PaymentDetails;
