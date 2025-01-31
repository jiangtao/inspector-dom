var VALID_CLASSNAME = /^[_a-zA-Z\- ]*$/

var constructCssPath = el => {
  if (!(el instanceof Element)) return
  let path = []
  while (el.nodeType === Node.ELEMENT_NODE) {
    let selector = el.nodeName.toLowerCase()
    if (el.id) {
      selector += `#${el.id}`
      path.unshift(selector)
      break
    } else if (el.className && VALID_CLASSNAME.test(el.className)) {
      selector += `.${(el.className.trim()).replace(/\s+/g, '.')}`
    } else {
      let sib = el,
        nth = 1
      while ((sib = sib.previousElementSibling)) {
        if (sib.nodeName.toLowerCase() == selector) nth++
      }
      if (nth != 1) selector += ':nth-of-type(' + nth + ')'
    }
    path.unshift(selector)
    el = el.parentNode
  }
  return path.join(' > ')
}


var defaultProps = {
  root: 'body',
  outlineStyle: '5px solid rgba(204, 146, 62, 0.3)',
  onClick: el => console.log('el', constructCssPath(el))
}

var Inspector = ((props = {}) => {
  const {root, excluded, included, outlineStyle, highlightClass} = {
    ...defaultProps,
    ...props
  }
  let onClick = props.onClick
  let isValidHandler = fn => typeof fn === 'function'

  let selected, excludedElements, includedElements

  const removeHighlight = el => {
    if (el) {
      el.style.outline = 'none'
      el.classList.remove(highlightClass)
    }
  }

  const highlight = el => {
    el.classList.add(highlightClass)
    el.style.outline = outlineStyle
    el.style.outlineOffset = `-${el.style.outlineWidth}`

  }

  const shouldBeExcluded = ev => {
    if (excludedElements && excludedElements.length && excludedElements.some(parent => (parent === ev.target || parent.contains(ev.target)))){
      return true
    }
  }
  const shouldIncluded = ev => {
    return includedElements && includedElements.length && includedElements.some(parent => (parent === ev.target))
  }

  const handleMouseOver = ev => {
    if (shouldBeExcluded(ev)){
      return
    }
    if (!shouldIncluded(ev)) {
      return
    }
    selected = ev.target
    highlight(selected)
  }

  const handleMouseOut = ev => {
    if (shouldBeExcluded(ev)){
      return
    }
    if (!shouldIncluded(ev)) {
      return
    }
    removeHighlight(ev.target)
  }

  const handleClick = ev => {
    if (shouldBeExcluded(ev)){
      return
    }
    if (!shouldIncluded(ev)) {
      return
    }
    ev.preventDefault()
    ev.stopPropagation()
    onClick(ev.target)
    return false
  }

  const prepareExcluded = (rootEl) => {
    if (!excluded.length){
      return []
    }
    const excludedNested = excluded.flatMap(element => {
      if (typeof element === 'string' || element instanceof String){
        return Array.from(rootEl.querySelectorAll(element))
      } else if (element instanceof Element){
        return [element]
      } else if (element.length>0 && element[0] instanceof Element){
        return Array.from(element)
      }
    })
    return Array.from(excludedNested).flat()
  }
  const prepareIncluded = (rootEl) => {
    if (!included.length){
      return []
    }
    const includedNested = included.flatMap(element => {
      if (typeof element === 'string' || element instanceof String){
        return Array.from(rootEl.querySelectorAll(element))
      } else if (element instanceof Element){
        return [element]
      } else if (element.length>0 && element[0] instanceof Element){
        return Array.from(element)
      }
    })
    return Array.from(includedNested).flat()
  }

  const enable = onClickCallback => {
    const rootEl = document.querySelector(root)
    if (!rootEl)
      return

    if (excluded){
      excludedElements = prepareExcluded(rootEl)
    }
    if (included){
      includedElements = prepareIncluded(rootEl)
    }
    rootEl.addEventListener('mouseover', handleMouseOver, true)
    rootEl.addEventListener('mouseout', handleMouseOut, true)
    if(isValidHandler(onClick)) rootEl.addEventListener('click', handleClick, true)
    if (onClickCallback){
      onClick = onClickCallback
    }
  }
  const cancel = () => {
    const rootEl = document.querySelector(root)
    if (!rootEl)
      return
    rootEl.removeEventListener('mouseover', handleMouseOver, true)
    rootEl.removeEventListener('mouseout', handleMouseOut, true)
    if (isValidHandler(onClick)) rootEl.removeEventListener('click', handleClick, true)
    removeHighlight(selected)
  }
  return {
    enable,
    cancel
  }
})

module.exports = Inspector
