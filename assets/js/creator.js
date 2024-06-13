

export const createError = (text) => {
  if (!document.querySelectorAll('.errorContainer')[0]) {
    const container = document.querySelectorAll('.container')[0]
    const errorContainer = document.createElement("div")
    errorContainer.classList.add('errorContainer', 'animSlideDown')
    errorContainer.innerHTML = `
      <span class="errorText">${text}</span>
      <span class="sliderRight animSlideRight"></span>
    `
    container.appendChild(errorContainer)

    setTimeout(() => {
      errorContainer.classList.remove('animSlideDown')
      errorContainer.classList.add('animSlideTop')
      setTimeout(() => document.querySelectorAll('.errorContainer')[0].remove(), 500)
    }, 5000)
  }
}
