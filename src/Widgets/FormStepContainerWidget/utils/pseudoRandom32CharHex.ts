import times from "lodash-es/times";

export function pseudoRandom32CharHex(): string {
  return times(32).map(pseudoRandomHex).join("");
}

function pseudoRandomHex(): string {
  return Math.floor(Math.random() * 16).toString(16);
}
