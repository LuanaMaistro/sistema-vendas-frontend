const tourActions = new WeakMap<Element, () => void>()

export function registerTourAction(el: Element, fn:() => void) {
  tourActions.set(el, fn)
}

export function getTourAction(el: Element | null){
  return el ? tourActions.get(el) : undefined
}