// src/utils/helpers.ts

export function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

// Add any other generic helpers you want here
