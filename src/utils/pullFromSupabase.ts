import db from "./localDB";
import supabase from "./supabase";

const pullFromSupabase = async () => {
  const { data: violators, error: violatorsError } = await supabase
    .from("CaughtViolators")
    .select("*, Violations (*)");

  if (!violatorsError && violators) {
    await db.CaughtViolators.bulkPut(violators); // Upserts violators
  }

  const { data: violations, error: violationsError } = await supabase
    .from("Violations")
    .select("*");

  if (!violationsError && violations) {
    await db.Violations.bulkPut(violations); // Upserts violations
  }
};

export default pullFromSupabase;
