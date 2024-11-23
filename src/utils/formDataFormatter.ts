import type { FormData } from "../types/formData.type";
import type { Violation, Violator } from "../types/violator.types";
import { v4 as uuid } from "uuid";

export const formDataFormatter = (data: FormData) => {
  const currentDate = new Date().toISOString().slice(0, 10);

  const violatorData: Violator = {
    address: data.Address,
    date_of_birth: data.DateOfBirth,
    first_name: data.FirstName,
    last_name: data.LastName,
    middle_name: data.MiddleName,
    sex: data.Sex === "Male" ? "Male" : "Female",
    civil_status: data.CivilStatus === "Single" ? "Single" : "Married",
    id: uuid(),
    institution: data.Institution,
    created_at: currentDate,
  };

  const ViolationData: Omit<Violation, "violator_id"> = {
    OR_number: parseInt(data.ORNumber),
    apprehender_name: data.ApprehenderName,
    apprehender_type: data.ApprehenderType === "Agent" ? "Agent" : "Officer",
    paid: data.PaymentStatus === "Paid" ? true : false,
    violation_date: data.DateApprehended,
    id: uuid(),
    violation_place: data.Location,
    violator_type: data.ViolatorType === "Student" ? "Student" : "Civilian",
    created_at: currentDate,
  };

  return { violatorData, ViolationData };
};
