import { create } from "zustand";
import { createJSONStorage, persist } from "zustand/middleware";
import AsyncStorage from "@react-native-async-storage/async-storage";

export default useTasksStore = create(
  persist(
    (set, get) => ({
      undoneTasks: [],
      doneTasks: [],
      addTask: (task) => {
        set((state) => ({
          ...state,
          undoneTasks: [...state.undoneTasks, task],
        }));
      },
      setTaskAsDone: (task) => {
        set((state) => ({
          ...state,
          undoneTasks: [
            ...state.undoneTasks.filter((taskTemp) => task.id != taskTemp.id),
          ],
          doneTasks: [{ ...task, done: true }, ...state.doneTasks],
        }));
      },
      setTaskAsNotDone: (task) => {
        set((state) => ({
          ...state,
          doneTasks: [
            ...state.doneTasks.filter((taskTemp) => task.id != taskTemp.id),
          ],
          undoneTasks: [{ ...task, done: false }, ...state.undoneTasks],
        }));
      },
      deleteTask: (task) => {
        set((state) => {
          if (task.done) {
            return {
              ...state,
              doneTasks: [
                ...state.doneTasks.filter((taskTemp) => task.id != taskTemp.id),
              ],
            };
          } else {
            return {
              ...state,
              undoneTasks: [
                ...state.undoneTasks.filter(
                  (taskTemp) => task.id != taskTemp.id
                ),
              ],
            };
          }
        });
      },
    }),
    {
      name: "tasks",
      storage: createJSONStorage(() => AsyncStorage),
    }
  )
);
