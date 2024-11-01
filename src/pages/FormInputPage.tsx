import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

import Header from '../components/Header';

const FormInputPage: React.FC = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    address: "",
    civilStatus: "",
    sex: "",
    institution: "",
    location: "",
    dateApprehended: "",
    violatorType: "",
    apprehender: "",
    apprehenderType:"",
    orNumber: "",
    paymentStatus:""
  });

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    middleName: "",
    dateOfBirth: "",
    address: "",
    civilStatus: "",
    sex: "",
    institution: "",
    location: "",
    dateApprehended: "",
    violatorType: "",
    apprehender: "",
    apprehenderType:"",
    orNumber: "",
    paymentStatus:""
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

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    let hasErrors = false;
    const newErrors: any = {};

    Object.keys(formData).forEach((key) => {
      if (key === "paymentStatus" && (formData[key as keyof typeof formData] === "Unpaid" || formData[key as keyof typeof formData] === "")) {
        return; 
    }

      if (formData[key as keyof typeof formData] === "") {
        newErrors[key] = `Please fill out the ${key.replace(
          /([A-Z])/g,
          " $1"
        )}.`;
        hasErrors = true;
      }
      
    });

    setErrors(newErrors);

    if (!hasErrors) {
      console.log("Form Data:", formData);
    }
  };

  const navigate = useNavigate();
  const handleCancel = () => { 
    navigate("/home/admin")
  }

  return (
    <div className="w-full mx-auto">
      <Header></Header>
      <form onSubmit={handleSubmit} noValidate>
      <div className="w-full max-w-4xl mx-auto">
      <div className="my-10 gap-4">
          <div className="col-span-2 font-semibold">Personal Details</div>

            <div className="flex space-x-4 my-5">
              <div className="flex-1 w-full">
              <label className="block text-sm">Last Name:</label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.lastName ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              />
              {errors.lastName && <p className="text-red-500 text-sm">{errors.lastName}</p>}
            </div>

            <div className="flex-1 w-full">
              <label className="block text-sm">First Name:</label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.firstName ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              />
              {errors.firstName && <p className="text-red-500 text-sm">{errors.firstName}</p>}
            </div>
              
            <div className="flex-1 w-full">
              <label className="block text-sm">Middle Name:</label>
              <input
                type="text"
                name="middleName"
                value={formData.middleName}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.middleName ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              />
              {errors.middleName && <p className="text-red-500 text-sm">{errors.middleName}</p>}
            </div>
          </div>

          <div className="flex space-x-4 my-5">

            <div className="flex-1 w-full">
                <label className="block text-sm">Address:</label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.address ? "border-red-500" : "border-gray-300"} rounded-md`}
                  required
                />
                {errors.address && <p className="text-red-500 text-sm">{errors.address}</p>}
              </div>

            <div className="flex-1 w-full">
              <label className="block text-sm">Institution:</label>
              <input
                type="text"
                name="institution"
                value={formData.institution}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.institution ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              />
              {errors.institution && <p className="text-red-500 text-sm">{errors.institution}</p>}
            </div>

          </div>

          <div className="flex space-x-4 my-5">

          <div className="flex-1" >
              <label className="block text-sm">Sex:</label>
              <select
                name="sex"
                value={formData.sex}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.sex ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              >
                <option value="">--Select--</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              {errors.sex && <p className="text-red-500 text-sm">{errors.sex}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm">Date of Birth:</label>
              <input
                type="date"
                name="dateOfBirth"
                value={formData.dateOfBirth}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.dateOfBirth ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              />
              {errors.dateOfBirth && <p className="text-red-500 text-sm">{errors.dateOfBirth}</p>}
            </div>
            
            <div className="flex-1">
              <label className="block text-sm">Civil Status:</label>
              <select
                name="civilStatus"
                value={formData.civilStatus}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.civilStatus ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              >
                <option value="">--Select--</option>
                <option value="Single">Single</option>
                <option value="Married">Married</option>
              </select>
              {errors.civilStatus && <p className="text-red-500 text-sm">{errors.civilStatus}</p>}
            </div>
          </div>

          <div className="col-span-2 font-semibold ">Violation Details</div>
          <div className="flex space-x-4 my-5">
            
            <div className="flex-1">
              <label className="block text-sm ">Location:</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.location ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              />
              {errors.location && <p className="text-red-500 text-sm">{errors.location}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm">Apprehender:</label>
              <input
                type="text"
                name="apprehender"
                value={formData.apprehender}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.apprehender ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              />
              {errors.apprehender && <p className="text-red-500 text-sm">{errors.apprehender}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm">Apprehender Type:</label>
              <select
                  name="apprehenderType"
                  value={formData.apprehenderType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.apprehenderType ? "border-red-500" : "border-gray-300"} rounded-md`}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Student">Police</option>
                  <option value="Civilian">Agent</option>
                </select>
                {errors.apprehenderType && <p className="text-red-500 text-sm">{errors.apprehenderType}</p>}
            </div>
            
          </div>
          
          <div className="flex space-x-4 my-5">

            <div className="flex-1">
                <label className="block text-sm">Violator Type:</label>
                <select
                  name="violatorType"
                  value={formData.violatorType}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.violatorType ? "border-red-500" : "border-gray-300"} rounded-md`}
                  required
                >
                  <option value="">--Select--</option>
                  <option value="Student">Student</option>
                  <option value="Civilian">Civilian</option>
                </select>
                {errors.violatorType && <p className="text-red-500 text-sm">{errors.violatorType}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm">Date Apprehended:</label>
              <input
                type="date"
                name="dateApprehended"
                value={formData.dateApprehended}
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.dateApprehended ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
              />
              {errors.dateApprehended && <p className="text-red-500 text-sm">{errors.dateApprehended}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm">OR Number:</label>
              <input
                type="text"
                name="orNumber"
                value={formData.orNumber} 
                onChange={handleChange}
                className={`w-full px-3 py-2 border ${errors.orNumber ? "border-red-500" : "border-gray-300"} rounded-md`}
                required
                />
                {errors.orNumber && <p className="text-red-500 text-sm">{errors.orNumber}</p>}
            </div>

            <div className="flex-1">
              <label className="block text-sm">Payment Status:</label>
              <select
                  name="paymentStatus"
                  value={formData.paymentStatus}
                  onChange={handleChange}
                  className={`w-full px-3 py-2 border ${errors.paymentStatus ? "border-red-500" : "border-gray-300"} rounded-md`}
                  required
                >
                  <option value="">Unpaid</option>
                  <option value="Student">Paid</option>
                </select>
                {errors.paymentStatus && <p className="text-red-500 text-sm">{errors.paymentStatus}</p>}
            </div>
       
          </div>

        </div>

        <div className="flex justify-center mt-6 gap-x-96">

        <button 
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 bg-red-800 text-white font-semibold rounded-md hover:bg-graSuby-700"
            >
             Cancel
            </button>

          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-graSuby-700"
          >
            Submit
          </button>
          
        </div>
      </div>
      
      </form>
    </div>
  );
};

export default FormInputPage;
