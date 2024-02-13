import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function constructMoneroUri(
  subaddress: string,
  description: string,
  amount: number,
) {
  return `monero:${subaddress}?tx_description=${description}&tx_amount=${amount}`;
}

export function addHyphensTo16CharacterString(inputString: string) {
  let result = "";
  for (let i = 0; i < inputString?.length; i++) {
    result += inputString[i];
    if ((i + 1) % 4 === 0 && i !== inputString.length - 1) {
      result += "-";
    }
  }

  return result;
}

export function shortenMoneroSubaddress(
  inputString: string,
  truncateLength = 10,
) {
  return `${inputString.substring(
    0,
    truncateLength,
  )}...${inputString?.substring(inputString.length - truncateLength)}`;
}

export function clearWalletLocalStorage() {
  localStorage.removeItem("address");
  localStorage.removeItem("key");
  localStorage.removeItem("height");
}
