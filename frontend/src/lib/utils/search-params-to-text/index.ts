export function searchParamsToText(
  searchParams: Record<string, string | number | boolean>,
) {
  return Object.keys(searchParams)
    .map((key) => `${key}=${searchParams[key as keyof typeof searchParams]}`)
    .join("&");
}
