export function normalizeString(str: string) {
  return str.split(" ").join("-").toLowerCase();
}
