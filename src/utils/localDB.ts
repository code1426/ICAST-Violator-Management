import Dexie, { EntityTable } from "dexie";
import { CaughtViolator, Violation, SyncQueue } from "../types/violator.types";

const db = new Dexie("ICAST-DB") as Dexie & {
  CaughtViolators: EntityTable<CaughtViolator, "id">;
  Violations: EntityTable<Violation, "id">;
  SyncQueue: EntityTable<SyncQueue, "id">;
};

db.version(3).stores({
  CaughtViolators: "id, [first_name+last_name+date_of_birth], created_at",
  Violations: "id, violator_id, violation_place, created_at",
  SyncQueue: "++id, table_name, action, payload",
});

export default db;
