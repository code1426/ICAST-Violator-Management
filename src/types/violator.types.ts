import { Database } from "./database.types";

export interface CaughtViolator {
  Violations: Violation[];
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  sex: Database["public"]["Enums"]["Sex"];
  civil_status: Database["public"]["Enums"]["Civil_status"];
  address: string;
  institution: string;
  created_at: string;
}

// This is just the same as the caughtViolator except it does not have the Violations.
export interface Violator {
  address: string;
  civil_status: Database["public"]["Enums"]["Civil_status"];
  date_of_birth: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  sex: Database["public"]["Enums"]["Sex"];
  id: string;
  institution: string;
  created_at: string;
}

export interface Violation {
  id: string;
  violator_id: string;
  violation_place: string;
  violation_date: string;
  violator_type: Database["public"]["Enums"]["Violator_type"];
  apprehender_type: Database["public"]["Enums"]["Apprehendor_type"];
  apprehender_name: string;
  OR_number: number;
  paid: boolean;
  created_at: string;
}

export interface SyncQueue {
  id: Int8Array;
  table_name: "CaughtViolators" | "Violations";
  action: string;
  payload: Violation | Violator | Violation[] | Violator[];
}
