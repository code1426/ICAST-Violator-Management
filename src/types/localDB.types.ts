// enum SEX {
//   "Male",
//   "Female",
// }

// enum CIVIL_STATUS {
//   "Single",
//   "Married",
// }

// enum VIOLATOR_TYPE {
//   "Student",
//   "Civillian",
// }

// enum APPREHENDER_TYPE {
//   "Police",
//   "Agent",
// }

export interface Violator {
  Violations: Violation[];
  id: string;
  first_name: string;
  last_name: string;
  middle_name: string;
  date_of_birth: string;
  sex: string;
  civil_status: string;
  address: string;
  institution: string;
  created_at: string;
  synced: boolean;
  synced_at: string | null;
}

export interface Violation {
  id: string;
  violator_id: string;
  violation_place: string;
  violation_date: string;
  violator_type: string;
  apprehender_type: string;
  apprehender_name: string;
  OR_number: number;
  paid: boolean;
  created_at: string;
  synced: boolean;
  synced_at: string | null;
}
