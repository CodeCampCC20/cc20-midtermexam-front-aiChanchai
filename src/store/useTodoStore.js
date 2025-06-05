import { create } from "zustand";
import todoApi from "../api/todoApi";

const useTodoStore = create((set) => ({
  todos: [],
  actionFetchTodo: async (userId) => {
    const res = await todoApi.getAllTodoByUserID(userId);
    console.log("res", res);

    set({ todos: res.data.todos });
  },
}));

export default useTodoStore;
