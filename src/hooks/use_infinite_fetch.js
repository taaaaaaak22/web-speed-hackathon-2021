import React from 'react'

const LIMIT = 20

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
export function useInfiniteFetch(apiPath, fetcher, initialData = []) {
  const internalRef = React.useRef({
    isLoading: false,
    offset: initialData.length,
    isLoadedAllData: false,
  })

  const [result, setResult] = React.useState({
    data: initialData,
    error: null,
    isLoading: false,
  })

  const fetchMore = () => {
    const { isLoading, offset, isLoadedAllData } = internalRef.current
    if (isLoading || isLoadedAllData) {
      return
    }

    setResult((cur) => ({
      ...cur,
      isLoading: true,
    }))
    internalRef.current.isLoading = true

    return fetcher(apiPath, { offset, limit: LIMIT })
      .then((data) => {
        setResult((cur) => ({
          ...cur,
          data: data ? [...cur.data, ...data] : [...cur.data],
          isLoading: false,
        }))
        internalRef.current.isLoading = false
        internalRef.current.offset = offset + LIMIT

        if (!data || data.length === 0) {
          internalRef.current.isLoadedAllData = true
          return
        }
      })
      .catch((error) => {
        setResult((cur) => ({
          ...cur,
          error,
          isLoading: false,
        }))
      })
  }

  return {
    ...result,
    fetchMore,
  }
}
