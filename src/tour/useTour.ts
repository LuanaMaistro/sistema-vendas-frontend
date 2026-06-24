import { useLocation } from "react-router-dom"
import useTourStore from "./TourStore";
import { stepsByPath } from "./stepsByRoute";
import type { TourProps } from "antd";

export const useTour = () => {
  const location = useLocation()
  const {
    open,
    setOpen,
    currentStep,
    setCurrentStep,
    isOnTour,
    setIsOnTour
  } = useTourStore()

  const curretSteps = stepsByPath[location.pathname] || []
  const currentStepObj = curretSteps[currentStep]

  const startTour = () => {
    setIsOnTour(true)
    setOpen(true)
  }

  const stopTour = () => {
    setIsOnTour(false)
    setOpen(false)
    setCurrentStep(0)
  }

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


  const waitForTarget = (step: NonNullable<TourProps['steps']>[number], signal: AbortSignal): Promise<void> => {
    return new Promise((resolve, reject) => {
      if (signal.aborted) return reject();
      if (!step?.target) return resolve();

      const getEl = () =>
        typeof step.target === 'function' ? step.target() : step.target;

      if (getEl()) return resolve();

      setOpen(false)
      const observer = new MutationObserver(() => {
        if (getEl()) {
          observer.disconnect();
          resolve();
        }
      });

      signal.addEventListener('abort', () => {
        observer.disconnect();
        reject();
      });

      observer.observe(document.body, {
        childList: true,
        subtree: true,
      });
    });
  };


  const abortRef = useRef<AbortController | null>(null)

  const handleChangeStep = async (current: number) => {
    currentStepObj.onStepChange()
    abortRef.current?.abort()
    abortRef.current = new AbortController()
    waitForTarget(curretSteps[current], abortRef.current?.signal).then(() => {
      setCurrentStep(current)
      setOpen(true)
    })
  }

  const handleCloseTour = () => {
    abortRef.current?.abort()
    stopTour()
  }

  const handleClose = () => {
    handleCloseTour()
  }

  return {
    curretSteps,
    open,
    setOpen,
    currentStep,
    handleClose,
    handleChangeStep,
    handleCloseTour,
    isOnTour,
    setIsOnTour,
    startTour,
    stopTour
  }
}