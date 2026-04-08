import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cls(...inputs) {
  return twMerge(clsx(inputs));
}
