import { Violator, Violation } from "../types/violator.types";
import db from "./localDB";

const insertUnsyncedTable = async (
  tableName: "CaughtViolators" | "Violations",
  action: "add" | "update" | "delete",
  payload: Violator | Violation
) => {
  await db.SyncQueue.add({
    table_name: tableName,
    action: action,
    payload: payload,
  });
};

export default insertUnsyncedTable;
