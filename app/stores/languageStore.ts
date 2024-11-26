import { create } from "zustand";

interface LanguageState {
  language: string;
  setLanguage: (language: string) => void;
}

export const useLanguageStore = create<LanguageState>((set) => ({
  language: "javascript",
  setLanguage: (language: string) => set({ language }),
}));
