import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatEventTitle(artist: string, tour?: string): string {
  if (typeof tour !== 'undefined') {
    const lowerCaseTour: string = tour.toLowerCase();
    if (tour.length > 4 && lowerCaseTour.slice(-2)) {
      return `${artist}: ${tour} Tour`
    } else {
      return `${artist}: ${tour}`
    }
  } else {
    return artist;
  }
}