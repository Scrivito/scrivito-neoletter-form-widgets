export function scrollIntoView(element: HTMLFormElement): void {
  window.scrollTo({
    top: getTop(element) - 95,
    behavior: "smooth"
  });
}

function getTop(element: HTMLFormElement): number {
  const rect = element.getBoundingClientRect();
  return rect.top + window.pageYOffset;
}
