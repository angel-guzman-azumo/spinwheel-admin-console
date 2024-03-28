import { useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const get = (): T => {
    const item = window.localStorage.getItem(key);
    return item ? JSON.parse(item) : initialValue;
  };

  const [data, setData] = useState<T>(get());

  const set = (value: T) => {
    window.localStorage.setItem(key, JSON.stringify(value));
    setData(value);

    return value;
  };

  return [data, set] as const;
}
