export const simulateClick = (vm, button) => {
  const clickEvent = new window.Event('click')
  button.dispatchEvent(clickEvent)
  vm._watcher.run()
}

export const triggerEvent = (elm, name) => {
  if (/^mouse|click/.test(name)) {
    const event = new MouseEvent(name)
    elm.dispatchEvent
    ? elm.dispatchEvent(event)
    : elm.fireEvent('on' + name, event)
  }
}
