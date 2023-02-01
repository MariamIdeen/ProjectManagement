import { create } from "zustand";

export const useUserStore = create((set) => ({
  // User Data
  userData: [],
  setUserData: (userData: object) => set(() => ({ userData: userData })),

  // Task
  taskData: [],
  setTask: (taskData: object) => set(() => ({ taskData: taskData })),

  // Project
  projectData: [],
  setProject: (projectData: object) =>
    set(() => ({ projectData: projectData })),
}));
