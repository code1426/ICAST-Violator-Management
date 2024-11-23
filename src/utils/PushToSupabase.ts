import db from "./localDB";
import supabase from "./supabase";

const pushToSupabase = async () => {
  const syncQueue = await db.SyncQueue.toArray();

  for (const item of syncQueue) {
    const { table_name, action, payload } = item;
    console.log("table_data: ", payload);
    try {
      if (navigator.onLine) {
        switch (action) {
          case "add":
            const { error: InsertError } = await supabase
              .from(table_name)
              .insert([payload]);
            if (InsertError) {
              throw InsertError;
            }
            break;
          case "update":
            const { error: updateError } = await supabase
              .from(table_name)
              .update(payload)
              .eq("id", payload.id);
            if (updateError) {
              throw updateError;
            }
            break;
          case "delete":
            const { error: deleteError } = await supabase
              .from(table_name)
              .delete()
              .eq("id", payload.id);
            if (deleteError) {
              throw deleteError;
            }
            break;
          default:
            console.error(`Invalid action: ${action}`);
            continue;
        }

        // Remove successfully synced item from SyncQueue
        await db.SyncQueue.delete(item.id);
        console.log("removed unsynced item: ", item.id);
      } else {
        return;
      }
    } catch (error) {
      console.log(`Failed to sync ${action} for ${table_name}:`, error);
    }
  }
};

export default pushToSupabase;
