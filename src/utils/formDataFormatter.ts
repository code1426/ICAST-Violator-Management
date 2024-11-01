import type { FormData } from "../types/formData.type";
import type { Violator, Violation } from "../types/violator";
import { v4 as uuid } from "uuid";

export const formDataFormatter = (data: FormData) => {
  const violatorData: Violator = {
    address: data.Address,
    civil_status: data.CivilStatus === "Single" ? "Single" : "Married",
    date_of_birth: data.DateOfBirth,
    first_name: data.FirstName,
    last_name: data.LastName,
    middle_name: data.MiddleName,
    sex: data.Sex === "Male" ? "Male" : "Female",
    id: uuid(),
    institution: data.Institution,
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
  };

  return { violatorData, ViolationData };
};
