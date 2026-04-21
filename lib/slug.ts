// lib/slug.ts

// id في الأول + اسم العقار  →  "42-فندق-النيل-كايرو"
export function toSlug(id: string | number, name: string): string {
  const slugName = name
    .trim()
    .replace(/\s+/g, "-")
    .replace(/[^\u0600-\u06FFa-z0-9-]/g, "")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");

  return `${id}-${slugName}`;
}

// "42-فندق-النيل-كايرو"  →  "42"
export function idFromSlug(slug: string): string {
  if (!slug || typeof slug !== 'string') {
    return '';
  }
  return slug.split("-")[0];
}