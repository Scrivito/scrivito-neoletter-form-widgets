export function scrollIntoView(element: HTMLFormElement): void {
  const currentScrollPosition = window.scrollY;
  const targetScrollPosition = getTop(element) - 95;
  const threshold = 15;

  // scroll the form content in order to always start from top (fixed height)
  element.scroll(0, 0);
  // only scroll if the position has changed
  if (Math.abs(currentScrollPosition - targetScrollPosition) > threshold) {
    window.scrollTo({
      top: targetScrollPosition,
      behavior: "smooth"
    });
  }
}

function getTop(element: HTMLFormElement): number {
  const rect = element.getBoundingClientRect();
  return rect.top + window.pageYOffset;
}
