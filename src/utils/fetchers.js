import { gzip } from 'pako'
// import $ from 'jquery'

/**
 * @param {string} url
 * @returns {Promise<ArrayBuffer>}
 */
async function fetchBinary(url) {
  try {
    const res = await fetch(url)
    const buf = res.arrayBuffer()
    return buf
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * @template T
 * @param {string} url
 * @param {object} params
 * @returns {Promise<T>}
 */
async function fetchJSON(url, data) {
  const query = data ? new URLSearchParams(data) : null
  try {
    const res = await fetch(query ? `${url}?${query}` : url)
    if (res.status >= 400) {
      throw new Error(`${res.status} ${res.statusText}`)
    }
    return res.json()
  } catch (error) {
    console.log(error)
    return null
  }
}

/**
 * @template T
 * @param {string} url
 * @param {File} file
 * @returns {Promise<T>}
 */
async function sendFile(url, file) {
  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/octet-stream',
    },
    body: file,
  })

  // const result = await $.ajax({
  //   async: false,
  //   data: file,
  //   dataType: 'json',
  //   headers: {
  //     'Content-Type': 'application/octet-stream',
  //   },
  //   method: 'POST',
  //   processData: false,
  //   url,
  // })
  return result.json()
}

/**
 * @template T
 * @param {string} url
 * @param {object} data
 * @returns {Promise<T>}
 */
async function sendJSON(url, data) {
  const jsonString = JSON.stringify(data)
  const uint8Array = new TextEncoder().encode(jsonString)
  const compressed = gzip(uint8Array)

  const result = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Encoding': 'gzip',
      'Content-Type': 'application/json',
    },
    body: compressed,
  })

  // const result = await $.ajax({
  //   async: false,
  //   data: compressed,
  //   dataType: 'json',
  //   headers: {
  //     'Content-Encoding': 'gzip',
  //     'Content-Type': 'application/json',
  //   },
  //   processData: false,
  //   url,
  // })
  return result.json()
}

export { fetchBinary, fetchJSON, sendFile, sendJSON }
