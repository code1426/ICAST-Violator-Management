import Dexie, { EntityTable } from "dexie";
import { Violator, Violation } from "../types/localDB.types";

const db = new Dexie("ICAST-DB") as Dexie & {
  CaughtViolators: EntityTable<Violator, "id">;
  Violations: EntityTable<Violation, "id">;
};

db.version(1).stores({
  CaughtViolators: "id, first_name, last_name, date_of_birth, created_at",
  Violations: "id, violator_id, violation_place, created_at",
});

export default db;
