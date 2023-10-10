import { createBrowserHistory } from "history";

let currentHistory;
/** A copy of the Scrivito getHistory() function */
export function getHistory() {
  if (typeof window === "undefined") return;

  if (!currentHistory) currentHistory = createBrowserHistory();
  return currentHistory;
}
