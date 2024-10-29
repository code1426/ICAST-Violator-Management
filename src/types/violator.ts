import { Database } from "./database.types";

export interface Violation {
  OR_number: number;
  apprehendor_name: string;
  apprehendor_type: Database["public"]["Enums"]["Apprehendor_type"];
  paid: boolean;
  violation_date: string;
  violation_id: string;
  violation_place: string;
  violator_id: string;
  violator_type: Database["public"]["Enums"]["Violator_type"];
}

export interface Violator {
  Violations: Violation[];
  address: string;
  civil_status: Database["public"]["Enums"]["Civil_status"];
  date_of_birth: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  sex: Database["public"]["Enums"]["Sex"];
  violator_id: string;
}