import React, { useState } from "react";

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
    agentPolice: "",
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
    agentPolice: "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
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
      if (formData[key as keyof typeof formData] === "") {
        newErrors[key] = `Please fill out the ${key.replace(/([A-Z])/g, " $1")}.`;
        hasErrors = true;
      }
    });

    setErrors(newErrors);

    if (!hasErrors) {
      console.log("Form Data:", formData);
    }
  };

  return (
    <div className="w-full max-w-lg mx-auto mt-10 p-6 border border-gray-300 rounded-lg shadow-md bg-white">
      <h1 className="text-center text-lg font-semibold mb-4">ILOILO CITY ANTI-SMOKING TASK FORCE</h1>
      <form onSubmit={handleSubmit} noValidate>
        <div className="grid grid-cols-2 gap-4">

          
          <div className="col-span-2 font-semibold">Personal Details</div>
          <div>
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


          <div>
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


          <div>
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


          <div>
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


          <div>
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


          <div>
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


          <div className="col-span-2 font-semibold">Violation Details</div>
          <div>
            <label className="block text-sm">Location:</label>
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


          <div>
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


          <div>
            <label className="block text-sm">Agent/Police:</label>
            <input
              type="text"
              name="agentPolice"
              value={formData.agentPolice}
              onChange={handleChange}
              className={`w-full px-3 py-2 border ${errors.agentPolice ? "border-red-500" : "border-gray-300"} rounded-md`}
              required
            />
            {errors.agentPolice && <p className="text-red-500 text-sm">{errors.agentPolice}</p>}
          </div>


          <div>
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


          <div>
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

         
          <div>
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
        </div>

        <div className="flex justify-center mt-6">
          <button
            type="submit"
            className="px-6 py-2 bg-gray-800 text-white font-semibold rounded-md hover:bg-gray-700"
          >
            Add
          </button>
        </div>
      </form>
    </div>
  );
};

export default FormInputPage;
