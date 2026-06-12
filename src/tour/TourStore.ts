import { create } from "zustand";

interface TourStore {
  open: boolean,
  currentStep: number,
  setCurrentStep: (step: number) => void
  setOpen: (open: boolean) => void
}

const useTourStore = create<TourStore>((set) => ({
  open: false,
  currentStep: 0,
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setOpen: (open: boolean) => set({ open })
}))

export default useTourStore;

