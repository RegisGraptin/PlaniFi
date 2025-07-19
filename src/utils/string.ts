export function normalizeString(input: string): string {
  return input.toLowerCase().replace(/\s+/g, '-');
}