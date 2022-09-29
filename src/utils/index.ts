export function parseStringToId(str: string) {
  return str.toLowerCase().replace(/\s/, '-');
}

export function getRandomNumberFromRangeOf(min: number, max: number): number {
  return Math.round(Math.random() * (max - min) + min);
}

export function getFirstItemHasValue<T>(arr: Array<T>): T {
  const [firstItem, ...restItem] = arr;
  if (!firstItem) return getFirstItemHasValue(restItem);
  return firstItem;
}

export function debounce(cb: () => void, timeout: number) {
  let timerId: ReturnType<typeof setTimeout>;
  return function() {
    if (timerId) clearTimeout(timerId);
    timerId = setTimeout(() => cb(), timeout);
  }
}
