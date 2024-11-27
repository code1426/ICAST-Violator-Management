import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { formDataFormatter } from "../utils/formDataFormatter";
import { Spinner } from "react-activity";
import "react-activity/dist/Spinner.css";
import toast, { Toaster } from "react-hot-toast";
import Header from "../components/Header";

import type { FormData } from "../types/formData.type";
import useInsertViolator from "../hooks/useInsertViolator";

// FORM COMPOENENTS
import PersonalDetails from "../components/forms/PersonalDetails";
import AddressAndDemographics from "../components/forms/AddressAndDemographics";
import ViolationDetails from "../components/forms/ViolationDetails";
import PaymentDetails from "../components/forms/PaymentDetails";

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
  const [currentStep, setCurrentStep] = useState(1);
  const {
    insertData,
    loading,
    setLoading,
    checkViolatorExists,
    existingViolator,
  } = useInsertViolator();
  const [formData, setFormData] = useState<FormData>(formInitialvalues);
  const [errors, setErrors] = useState({
    ...formInitialvalues,
    PaymentStatus: "",
  });

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

  const getEndSliceValue = () => {
    let value = 4;
    if (currentStep === 2) {
      value = 8;
    } else if (currentStep === 3) {
      value = 13;
    } else if (currentStep === 4) {
      value = 15;
    }
    return value;
  };

  const getStartSliceValue = () => {
    let value = 0;
    if (currentStep === 2) {
      value = 4;
    } else if (currentStep === 3) {
      value = 8;
    } else if (currentStep === 4) {
      value = 13;
    }
    return value;
  };

  const handleCheckErrors = (): boolean => {
    let hasErrors = false;
    const newErrors: FormData = { ...formInitialvalues, PaymentStatus: "" };

    Object.keys(formData)
      .slice(getStartSliceValue(), getEndSliceValue())
      .forEach((key) => {
        if (
          key === "ORNumber" &&
          isNaN(parseInt(formData[key as keyof typeof formData]))
        ) {
          newErrors[key as keyof FormData] =
            "OR Number must be a valid number.";
          hasErrors = true;
        }

        if (formData[key as keyof typeof formData] === "") {
          newErrors[key as keyof FormData] = `Please fill out the ${key.replace(
            /([A-Q, S-Z])/g,
            " $1"
          )}.`;
          hasErrors = true;
        }

        setErrors(newErrors);
      });
    return hasErrors;
  };

  const submitData = async (data: FormData) => {
    const { violatorData, ViolationData } = formDataFormatter(data);
    await insertData(violatorData, ViolationData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const hasErrors = handleCheckErrors();

    if (!hasErrors) {
      await toast.promise(submitData(formData), {
        loading: "Saving data… Please wait.",
        success: <b>Violator record has been added.</b>,
        error: <b>Something went wrong!</b>,
      });
      setLoading(false);
      setFormData(formInitialvalues);
      setCurrentStep(() => 1);
    }
  };

  const handleNextClick = async () => {
    const hasErrors = handleCheckErrors();

    if (!hasErrors) {
      setErrors({
        ...formInitialvalues,
        PaymentStatus: "",
      });
      if (currentStep === 1) {
        const violatorExists = await checkViolatorExists(formData);
        if (violatorExists) {
          setCurrentStep((prev) => prev + 2);
        } else {
          setCurrentStep((prev) => prev + 1);
        }
      } else {
        setCurrentStep((prev) => prev + 1);
      }
    }
  };

  const handleBackClick = () => {
    if (existingViolator && currentStep === 3) {
      setCurrentStep((prev) => prev - 2);
    } else {
      setCurrentStep((prev) => prev - 1);
    }
  };

  const handleCancel = () => {
    navigate("/home");
  };

  return (
    <div className="bg-color6 min-h-screen">
      <Header />
      <Toaster position="top-center" reverseOrder={false} />
      <div className=" flex flex-col w-full h-[92vh] justify-center items-center">
        <div className=" text-white main-form flex flex-col w-[60%] min-h-[70%] justify-between bg-color3 border-2 border-black shadow-md shadow-gray-500 p-6 rounded-lg">
          <div className=" flex w-full items-center justify-center">
            {currentStep === 1 && (
              <PersonalDetails
                formData={formData}
                checkViolatorExists={checkViolatorExists}
                handleChange={handleChange}
                errors={errors}
              />
            )}

            {currentStep === 2 && (
              <AddressAndDemographics
                errors={errors}
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {currentStep === 3 && (
              <ViolationDetails
                errors={errors}
                formData={formData}
                handleChange={handleChange}
              />
            )}

            {currentStep === 4 && (
              <PaymentDetails
                errors={errors}
                formData={formData}
                handleChange={handleChange}
              />
            )}
          </div>

          <div className="flex w-full items-center mt-6">
            <div className="flex justify-between w-full">
              {currentStep === 1 ? (
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-4 py-2 w-20 h-11 bg-red-700 hover:bg-[#e93b3b] transition-all text-white rounded-md"
                >
                  Cancel
                </button>
              ) : (
                <>
                  <button
                    type="button"
                    onClick={handleBackClick}
                    className="px-4 py-2 h-11 w-20 bg-color1 text-white rounded-md"
                  >
                    Back
                  </button>
                </>
              )}

              <div>
                {currentStep < 4 ? (
                  <button
                    type="button"
                    onClick={handleNextClick}
                    className="flex px-4 py-2 bg-color1 hover:bg-color2 transition-all h-11 w-20 text-white rounded-md items-center justify-center"
                  >
                    {loading ? (
                      <Spinner size={10} color="#fff" animating={loading} />
                    ) : (
                      "Next"
                    )}
                  </button>
                ) : (
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    className="flex px-4 py-2 h-11 w-20 bg-green-700 hover:bg-[#24b258] text-white rounded-md items-center justify-center"
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
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormInputPage;
