import { registerTourAction } from "./tourActions";

export function useTourAction<T extends HTMLElement = HTMLElement>(fn?: () => void) {
  const ref = useRef<T>(null);
  const fnRef = useRef(fn)

  useEffect(() => {
    fnRef.current = fn
  })

  useEffect(() => {
    if (ref.current && fn) {
      registerTourAction(ref.current, () => fnRef.current?.())
    }
  }, [])

  return ref
}