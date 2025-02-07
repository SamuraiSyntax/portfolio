import { useEffect, useState } from "react";

interface CacheOptions {
  key: string;
  ttl?: number; // Time to live in milliseconds
}

export function useCache<T>({ key, ttl = 5 * 60 * 1000 }: CacheOptions) {
  const [data, setData] = useState<T | null>(null);

  const setCacheData = (newData: T) => {
    const cacheEntry = {
      data: newData,
      timestamp: Date.now(),
    };

    localStorage.setItem(key, JSON.stringify(cacheEntry));
    setData(newData);
  };

  const getCacheData = (): T | null => {
    const cached = localStorage.getItem(key);
    if (!cached) return null;

    const { data, timestamp } = JSON.parse(cached);
    const isExpired = Date.now() - timestamp > ttl;

    if (isExpired) {
      localStorage.removeItem(key);
      return null;
    }

    return data;
  };

  useEffect(() => {
    const cachedData = getCacheData();
    if (cachedData) {
      setData(cachedData);
    }
  }, [key]);

  return {
    data,
    setData: setCacheData,
    clearCache: () => localStorage.removeItem(key),
  };
}
