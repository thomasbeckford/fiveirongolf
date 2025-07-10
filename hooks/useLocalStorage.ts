// hooks/useLocalStorage.ts
import { useState, useEffect } from 'react';

export function useLocalStorage(key: string, initialValue: string = ''): [string, (value: string) => void, boolean] {
  const [value, setValue] = useState<string>(initialValue);
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key);
        setValue(item || initialValue);
      } catch {
        setValue(initialValue);
      }
    }
  }, [key, initialValue]);

  const setStoredValue = (newValue: string) => {
    setValue(newValue);
    if (typeof window !== 'undefined') {
      try {
        if (newValue) {
          localStorage.setItem(key, newValue);
        } else {
          localStorage.removeItem(key);
        }
      } catch (error) {
        console.error('Error with localStorage:', error);
      }
    }
  };

  return [mounted ? value : initialValue, setStoredValue, mounted];
}
