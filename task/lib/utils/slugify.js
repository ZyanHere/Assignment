export function slugify(str) {
  if (!str) return '';
  return String(str)
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')  // collapse non-alphanumerics to hyphen
    .replace(/^-+|-+$/g, '');     // trim leading/trailing hyphens
}