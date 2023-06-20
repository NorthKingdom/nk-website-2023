import { lerp } from './math'
import mergeDeepRight from 'ramda/es/mergeDeepRight'
import { v4 as uuidv4 } from 'uuid'

type DeepPartial<T> = T extends object
  ? {
      [P in keyof T]?: DeepPartial<T[P]>
    }
  : T

interface RenderedStyles {
  tx: { previous: number; current: number; amt: number }
  ty: { previous: number; current: number; amt: number }
}

export interface CursorChild {
  id: string
  el: HTMLElement
  bounds: DOMRect
  renderedStyles: RenderedStyles
  limit: { x?: (pointerX: number) => number; y?: (pointerY: number) => number }
}

class Cursor {
  pointer = {
    x: 0,
    y: 0,
  }
  children: CursorChild[] = []

  constructor() {
    this._bind('onMove', 'removeMouseEventListeners', 'render')
    if (typeof window === 'undefined') return
    this.addEventListeners()
    requestAnimationFrame(this.render)
  }

  addEventListeners() {
    window.addEventListener('mousemove', this.onMove, { passive: false })
    window.addEventListener('touchmove', this.onMove, { passive: false })
    window.addEventListener('touchstart', this.removeMouseEventListeners, false) // remove mouse event listeners if a touch event is detected
  }

  removeEventListeners() {
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('touchmove', this.onMove)
    window.removeEventListener('touchstart', this.removeMouseEventListeners)
  }

  removeMouseEventListeners() {
    window.removeEventListener('mousemove', this.onMove)
    window.removeEventListener('touchstart', this.removeMouseEventListeners)
  }

  onMove(event: TouchEvent | MouseEvent) {
    const { clientX, clientY } = (event as TouchEvent).changedTouches
      ? (event as TouchEvent).changedTouches[0]
      : (event as MouseEvent)
    this.pointer.x = clientX
    this.pointer.y = clientY
  }

  render() {
    for (let i = 0; i < this.children.length; i++) {
      const child = this.children[i]

      child.renderedStyles['tx'].current =
        (child.limit.x ? child.limit.x(this.pointer.x) : this.pointer.x) - child.bounds.width / 2
      child.renderedStyles['ty'].current =
        (child.limit.y ? child.limit.y(this.pointer.y) : this.pointer.y) - child.bounds.height / 2
      let key: keyof typeof child.renderedStyles
      for (key in child.renderedStyles) {
        child.renderedStyles[key].previous = lerp(
          child.renderedStyles[key].previous,
          child.renderedStyles[key].current,
          child.renderedStyles[key].amt
        )
      }
      child.el.style.transform = `translateX(${child.renderedStyles['tx'].previous}px) translateY(${child.renderedStyles['ty'].previous}px)`
    }
    requestAnimationFrame(this.render)
  }

  subscribe(
    el: HTMLElement,
    config: DeepPartial<RenderedStyles> = {}
  ): {
    effect: CursorChild
    unsubscribe: () => void
  } {
    const id = uuidv4()
    const child = {
      id,
      el,
      bounds: el.getBoundingClientRect(),
      limit: {
        x: undefined,
        y: undefined,
      },
      renderedStyles: mergeDeepRight(
        {
          tx: { previous: 0, current: 0, amt: 0.15 },
          ty: { previous: 0, current: 0, amt: 0.15 },
        },
        config
      ),
    } as CursorChild
    this.children.push(child)

    return {
      effect: child,
      unsubscribe: () => {
        this.children = this.children.filter((child) => child.id !== id)
      },
    }
  }

  setLimit(id: string | undefined, { x, y }: { x?: (pointerX: number) => number; y?: (pointerY: number) => number }) {
    const child = this.children.find((child) => child.id === id)
    if (!child) return
    child.limit.x = x
    child.limit.y = y
  }

  destroy() {
    console.log('destroying cursor')
    this.removeEventListeners()
  }

  _bind(...args: string[]) {
    for (const fn of args) {
      // @ts-ignore
      if (!this[fn]) {
        throw new Error(`The function ${fn} is not defined`)
      }
      // @ts-ignore
      this[fn] = this[fn].bind(this)
    }
  }
}

export default new Cursor()
