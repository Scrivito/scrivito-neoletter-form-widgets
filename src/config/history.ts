import { BrowserHistory, createBrowserHistory } from "history";

let currentHistory: BrowserHistory;
/** A copy of the Scrivito getHistory() function */
export function getHistory(): BrowserHistory | undefined {
  if (typeof window === "undefined") return;

  if (!currentHistory) currentHistory = createBrowserHistory();
  return currentHistory;
}
