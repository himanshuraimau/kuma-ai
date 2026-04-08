import type { MemoryItem } from "./memory.types";

export function describeMemoryFeature() {
  return "Persistent memory for user preferences, context, and project notes.";
}

export function createMemoryItem(key: string, value: string): MemoryItem {
  return {
    key,
    value,
  };
}