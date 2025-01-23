import { create } from "zustand";

interface CodeState {
  storedCode: string;

  setStoredCode: (code: string) => void;
}

export const useCodeStore = create<CodeState>((set) => ({
  storedCode: "",
  setStoredCode: (code: string) => set({ storedCode: code }),
}));
