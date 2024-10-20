export const debounce = <T extends (...args: Parameters<T>) => ReturnType<T>>(
  fn: T,
  delay: number
) => {
  let timeoutId: number;
  return (...args: Parameters<T>) => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }

    // create a timeout based on a delay prop
    timeoutId = setTimeout(() => {
      fn(...args);
    }, delay);
  };
};
