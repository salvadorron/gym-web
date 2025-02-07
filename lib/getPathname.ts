import { headers } from "next/headers";

export async function getPathname() {
  const allHeaders = await headers();
  const pathname = new URL(allHeaders.get('referer') || '', 'http://localhost').pathname;

  return pathname;
}