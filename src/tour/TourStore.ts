import { create } from "zustand";

interface TourStore {
  open: boolean,
  currentStep: number,
  isOnTour: boolean,
  setIsOnTour: (isOnTour: boolean) => void
  setCurrentStep: (step: number) => void
  setOpen: (open: boolean) => void
}

const useTourStore = create<TourStore>((set) => ({
  open: false,
  currentStep: 0,
  isOnTour: false,
  setIsOnTour: (isOnTour: boolean) => set({ isOnTour }),
  setCurrentStep: (step: number) => set({ currentStep: step }),
  setOpen: (open: boolean) => set({ open })
}))

export default useTourStore;