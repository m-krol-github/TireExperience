/**
 * To operate in both vite and nextjs, we need to check if image is imported as string (vite)
 * or is imported as object with src (nextjs)
 * @param img
 * @returns
 */
export function interopImage(img: string | Record<string, string>) {
  if (typeof img === "string") {
    return img;
  }

  return img.src;
}
