import { useLocation } from "react-router-dom"
import useTourStore from "./TourStore";
import { stpesByPath } from "./stepsByRoute";
import type { TourProps } from "antd";

export const useTour = () => {
  const location = useLocation()
  const {
    open,
    setOpen,
    currentStep,
    setCurrentStep
  } = useTourStore()

  const curretSteps = stpesByPath[location.pathname] || []

  const addShortcut = () => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'm' && e.altKey) {
        e.preventDefault()
        setOpen(true)
      }
    }
    window.addEventListener('keydown', handleKeyDown)
  }

  const removeShortcut = () => {
    window.removeEventListener('keydown', () => {})
  }

  useEffect(() => {
    addShortcut()
    return () => removeShortcut()
  }, [])


  const waitForTarget = (step: NonNullable<TourProps['steps']>[number]): Promise<void> => {
    return new Promise((resolve) => {
      if (!step?.target) return resolve();

      setOpen(false)
      const check = () => {
        const el = typeof step.target === 'function' ? step.target() : step.target;
        if (el) return resolve();
        requestAnimationFrame(check);
      };
      check();
    });
  };

  const handleClose = () => {
    setOpen(false)
  }

  const handleChangeStep = async (current: number) => {
    setCurrentStep(current)
    waitForTarget(curretSteps[current]).then(() => {
      setOpen(true)
    })
  }

  const handleCloseTour = () => {
    setCurrentStep(0)
    setOpen(false)
  }


  return {
    curretSteps,
    open,
    currentStep,
    handleClose,
    handleChangeStep,
    handleCloseTour
  }
}

