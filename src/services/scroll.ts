import { Ref } from 'vue'

function getScrollParent(
  node: Element | null,
  until = document.body
): Element | null {
  if (!node || node === until) {
    return null
  }

  const style = (value: Element, prop: string) =>
    getComputedStyle(value, null).getPropertyValue(prop)

  const regex = /(auto|scroll)/

  const scroll = regex.test(
    style(node, 'overflow') +
      style(node, 'overflow-y') +
      style(node, 'overflow-x')
  )

  return scroll ? node : getScrollParent(node.parentElement, until)
}
function scrollTo(element: Element, to: number, duration = 0) {
  // jump to target if duration zero
  if (duration <= 0) {
    requestAnimationFrame(() => {
      element.scrollTop = to
    })
    return
  }
  const difference = to - element.scrollTop
  const tick = (difference / duration) * 10
  requestAnimationFrame(() => {
    const scrollTop = element.scrollTop + tick
    if (scrollTop >= to) {
      element.scrollTop = to
      return
    }
    element.scrollTop = scrollTop
    scrollTo(element, to, duration - 10)
  })
}

export function scrollToSelected(
  duration: number,
  time_picker: Ref<HTMLElement | undefined>
) {
  const elements = time_picker.value?.querySelectorAll('.active')
  if (!elements) return
  for (let i = 0; i < elements.length; i++) {
    const element = elements[i] as HTMLElement
    const scrollElement = getScrollParent(element, time_picker.value)
    if (scrollElement) {
      const to = element.offsetTop - 42
      scrollTo(scrollElement, to, duration)
    }
  }
}
