import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formDataFormatter } from "../utils/formDataFormatter";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";

import type { FormData } from "../types/formData.type";
import useInsertViolator from "../hooks/useInsertViolator";

const FormInputPage: React.FC = () => {
  const formInitialvalues: FormData = {
    FirstName: "",
    LastName: "",
    MiddleName: "",
    DateOfBirth: "",
    Address: "",
    CivilStatus: "",
    Sex: "",
    Institution: "",
    Location: "",
    DateApprehended: "",
    ViolatorType: "",
    ApprehenderName: "",
    ApprehenderType: "",
    ORNumber: "",
    PaymentStatus: "Unpaid",
  };

  const navigate = useNavigate();
  const { insertData, loading, setLoading, error } = useInsertViolator();
  const [formData, setFormData] = useState<FormData>(formInitialvalues);
  const [errors, setErrors] = useState({
    ...formInitialvalues,
    PaymentStatus: "",
  });

  const [currentStep, setCurrentStep] = useState(1);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });

    // Clear errors when user types/selects a value
    if (e.target.value !== "") {
      setErrors((prevErrors) => ({
        ...prevErrors,
        [e.target.name]: "",
      }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors: any = {};

    Object.keys(formData).forEach((key) => {
      if (
        key === "PaymentStatus" &&
        (formData[key as keyof typeof formData] === "Unpaid" ||
          formData[key as keyof typeof formData] === "Paid")
      ) {
        return;
      }

      if (formData[key as keyof typeof formData] === "") {
        newErrors[key] = `Please fill out the ${key.replace(
          /([A-Q, S-Z])/g,
          " $1"
        )}.`;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      await toast.promise(submitData(formData), {
        loading: "Saving data… Please wait.",
        success: <b>Violator record has been added.</b>,
        error: <b>Something went wrong!</b>,
      });
      setLoading(false);
      setFormData(formInitialvalues);
      navigate("/home/admin");
    }
  };

  const submitData = async (data: FormData) => {
    const { violatorData, ViolationData } = formDataFormatter(data);
    await insertData(violatorData, ViolationData);
  };

  const handleNextClick = () => {
    setCurrentStep(currentStep + 1);
  };
  

  const handleBackClick = () => {
    setCurrentStep((prev) => prev - 1);
  };

  const handleCancel = () => {
    navigate("/home/admin");
  };

  return (
    <div className="bg-color6 min-h-screen">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className="w-full max-w-4xl mx-auto">
        <form onSubmit={handleSubmit} noValidate>
          <div className="my-10">
            {currentStep === 1 && (
              <div>
                <h2 className="font-semibold text-lg mb-4">Step 1: Personal Details</h2>
                
                <div className="flex space-x-4">
                  <div className="flex-1">
                    <label className="block text-sm">Last Name:</label>
                    <input
                      type="text"
                      name="LastName"
                      value={formData.LastName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.LastName ? "border-red-500" : "border-gray-500"
                      } rounded-md`}
                      required
                    />
                    {errors.LastName && (
                      <p className="text-red-500 text-sm">{errors.LastName}</p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm">First Name:</label>
                    <input
                      type="text"
                      name="FirstName"
                      value={formData.FirstName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.FirstName ? "border-red-500" : "border-gray-500"
                      } rounded-md`}
                      required
                    />
                    {errors.FirstName && (
                      <p className="text-red-500 text-sm">{errors.FirstName}</p>
                    )}
                  </div>

                  <div className="flex-1">
                    <label className="block text-sm">Middle Name:</label>
                    <input
                      type="text"
                      name="MiddleName"
                      value={formData.MiddleName}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.MiddleName ? "border-red-500" : "border-gray-500"
                      } rounded-md`}
                    />
                    {errors.MiddleName && (
                      <p className="text-red-500 text-sm">{errors.MiddleName}</p>
                    )}
                  </div>
                </div>

                <div>
                  <div className="flex justify-center my-5">
                    <div className="w-1/3">
                      <label className="block text-sm">Date of Birth:</label>
                      <input
                        type="date"
                        name="DateOfBirth"
                        value={formData.DateOfBirth}
                        onChange={handleChange}
                        className={`w-full px-3 py-2 border ${errors.DateOfBirth ? "border-red-500" : "border-gray-500"} rounded-md`}
                        required
                      />
                      {errors.DateOfBirth && (
                        <p className="text-red-500 text-sm">{errors.DateOfBirth}</p>
                      )}
                    </div>
                  </div>
                </div>
                
              </div>
            )}

            {currentStep === 2 && (
              <div>
                <h2 className="font-semibold text-lg mb-4">Step 2: Address & Demographics</h2>
                <div className="mt-4">
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

                </div>

                <div className="flex space-x-4 my-5">
                  
                  <div className="flex-1 w-full">
                    <label className="block text-sm">Civil Status:</label>
                    <select
                      name="CivilStatus"
                      value={formData.CivilStatus}
                      onChange={handleChange}
                      className={`w-full px-3 py-2 border ${
                        errors.CivilStatus
                          ? "border-red-500"
                          : "border-gray-500"
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
                    {errors.Sex && (
                      <p className="text-red-500 text-sm">{errors.Sex}</p>
                    )}
                  </div>
                </div>

                <div className="mt-4">
                  <label className="block text-sm">Institution:</label>
                  <input
                    type="text"
                    name="Institution"
                    value={formData.Institution}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.Institution
                        ? "border-red-500"
                        : "border-gray-500"
                    } rounded-md`}
                    required
                  />
                  {errors.Institution && (
                    <p className="text-red-500 text-sm">
                      {errors.Institution}
                    </p>
                  )}
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  Step 3: Violation Details
                </h2>
                <div className="mt-4">
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
                <div className="mt-4">
                  <label className="block text-sm">Date Apprehended:</label>
                  <input
                    type="date"
                    name="DateApprehended"
                    value={formData.DateApprehended}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.DateApprehended
                        ? "border-red-500"
                        : "border-gray-500"
                    } rounded-md`}
                    required
                  />
                  {errors.DateApprehended && (
                    <p className="text-red-500 text-sm">
                      {errors.DateApprehended}
                    </p>
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
                <div className="mt-4">
                  <label className="block text-sm">Apprehender Name:</label>
                  <input
                    type="text"
                    name="ApprehenderName"
                    value={formData.ApprehenderName}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.ApprehenderName
                        ? "border-red-500"
                        : "border-gray-500"
                    } rounded-md`}
                    required
                  />
                  {errors.ApprehenderName && (
                    <p className="text-red-500 text-sm">
                      {errors.ApprehenderName}
                    </p>
                  )}
                </div>
                <div className="flex-1 mt-4">
                <label className="block text-sm">Apprehender Type:</label>
                <select
                  name="ApprehenderType"
                  value={formData.ApprehenderType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${
                    errors.ApprehenderType
                      ? "border-red-500"
                      : "border-gray-500"
                  } rounded-md`}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Police">Police</option>
                  <option value="Agent">Agent</option>
                </select>
                {errors.ApprehenderType && (
                  <p className="text-red-500 text-sm">
                    {errors.ApprehenderType}
                  </p>
                )}
              </div>
              </div>
            )}

            {currentStep === 4 && (
              <div>
                <h2 className="font-semibold text-lg mb-4">
                  Step 4: Payment Details
                </h2>
                <div className="mt-4">
                  <label className="block text-sm">OR Number:</label>
                  <input
                    type="text"
                    name="ORNumber"
                    value={formData.ORNumber}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.ORNumber ? "border-red-500" : "border-gray-500"
                    } rounded-md`}
                    required
                  />
                  {errors.ORNumber && (
                    <p className="text-red-500 text-sm">{errors.ORNumber}</p>
                  )}
                </div>
                <div className="mt-4">
                  <label className="block text-sm">Payment Status:</label>
                  <select
                    name="PaymentStatus"
                    value={formData.PaymentStatus}
                    onChange={handleChange}
                    className={`w-full px-3 py-2 border ${
                      errors.PaymentStatus
                        ? "border-red-500"
                        : "border-gray-500"
                    } rounded-md`}
                    required
                  >
                    <option value="">Select</option>
                    <option value="Paid">Paid</option>
                    <option value="Unpaid">Unpaid</option>
                  </select>
                  {errors.PaymentStatus && (
                    <p className="text-red-500 text-sm">
                      {errors.PaymentStatus}
                    </p>
                  )}
                </div>
              </div>
            )}
          </div>

          <div className="flex justify-between items-center mt-8">
            <div className="flex gap-4">
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 bg-red-500 text-white rounded-md"
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={ handleBackClick }
                    className="px-4 py-2 bg-gray-500 text-white rounded-md"
                  >
                    Back
                  </button>
                </>
              )}
            </div>

            <div>
              {currentStep < 4 ? (
                <button
                  type="button"
                  onClick={ handleNextClick }
                  className="px-4 py-2 bg-blue-500 text-white rounded-md"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-md"
                >
                  {loading ? (
                <Spinner size={10} color="#fff" animating={loading} />
              ) : (
                "Submit"
              )}
                </button>
              )}
            </div>
          </div>


        </form>
      </div>
    </div>
  );
};

export default FormInputPage;

