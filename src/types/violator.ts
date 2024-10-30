import { Database } from "./database.types";

export interface Violation {
  OR_number: number;
  apprehender_name: string;
  apprehender_type: Database["public"]["Enums"]["Apprehendor_type"];
  paid: boolean;
  violation_date: string;
  id: string;
  violation_place: string;
  violator_id: string;
  violator_type: Database["public"]["Enums"]["Violator_type"];
}

export interface CaughtViolator {
  Violations: Violation[];
  address: string;
  civil_status: Database["public"]["Enums"]["Civil_status"];
  date_of_birth: string;
  first_name: string;
  last_name: string;
  middle_name: string | null;
  sex: Database["public"]["Enums"]["Sex"];
  id: string;
  institution: string | null;
}