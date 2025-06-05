import { persist } from "zustand/middleware";

const useTodoStore = create(
  persist((set) => ({
    taskName: [],
    actionFetchAllToda: async () => {
      const data = await fetchAllTodo();
      console.log("data", data);
      set({ taskName: data });
    },
  }))
);
