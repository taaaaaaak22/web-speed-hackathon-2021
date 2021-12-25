import React from 'react';

const LIMIT = 20;

/**
 * @template T
 * @typedef {object} ReturnValues
 * @property {Array<T>} data
 * @property {Error | null} error
 * @property {boolean} isLoading
 * @property {() => Promise<void>} fetchMore
 */

/**
 * @template T
 * @param {string} apiPath
 * @param {(apiPath: string) => Promise<T[]>} fetcher
 * @returns {ReturnValues<T>}
 */
export function useInfiniteFetch(apiPath, fetcher) {
  const internalRef = React.useRef({ isLoading: false, offset: 0, isLoadedAllData: false });

  const [result, setResult] = React.useState({
    data: [],
    error: null,
    isLoading: false,
  });

  const fetchMore = React.useCallback(() => {
    const { isLoading, offset, isLoadedAllData } = internalRef.current;
    if (isLoading || isLoadedAllData) {
      return;
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }));
    internalRef.current.isLoading = true;

    const promise = fetcher(apiPath, { offset, limit: LIMIT });

    promise.then((data) => {
      setResult((cur) => ({
        ...cur,
        data: [...cur.data, ...data],
        isLoading: false,
      }));
      internalRef.current.isLoading = false;
      internalRef.current.offset = offset + LIMIT;

      if (data.length === 0) {
        internalRef.current.isLoadedAllData = true;
        return;
      }
    });

    promise.catch((error) => {
      setResult((cur) => ({
        ...cur,
        error,
        isLoading: false,
      }));
    });
  }, [apiPath, fetcher]);

  React.useEffect(() => {
    fetchMore();
  }, []);

  return {
    ...result,
    fetchMore,
  };
}
