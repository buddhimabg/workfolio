import { create } from "zustand";
import { persist } from "zustand/middleware";

interface AppState {
  savedJobIds: string[];
  toggleSaveJob: (jobId: string) => void;
  isJobSaved: (jobId: string) => boolean;
  searchQuery: string;
  setSearchQuery: (query: string) => void;
  selectedCategory: string | null;
  setSelectedCategory: (category: string | null) => void;
}

export const useAppStore = create<AppState>()(
  persist(
    (set, get) => ({
      savedJobIds: [],
      toggleSaveJob: (jobId: string) => {
        const { savedJobIds } = get();
        if (savedJobIds.includes(jobId)) {
          set({ savedJobIds: savedJobIds.filter((id) => id !== jobId) });
        } else {
          set({ savedJobIds: [...savedJobIds, jobId] });
        }
      },
      isJobSaved: (jobId: string) => get().savedJobIds.includes(jobId),
      searchQuery: "",
      setSearchQuery: (query: string) => set({ searchQuery: query }),
      selectedCategory: null,
      setSelectedCategory: (category: string | null) =>
        set({ selectedCategory: category }),
    }),
    {
      name: "jobly-app-storage",
    }
  )
);

