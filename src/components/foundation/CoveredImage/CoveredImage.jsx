// import sizeOf from 'image-size'
import React from 'react'
// import Image from 'next/image'

import { useFetch } from '../../../hooks/use_fetch'
import { fetchBinary } from '../../../utils/fetchers'

/**
 * @typedef {object} Props
 * @property {string} alt
 * @property {string} src
 */

/**
 * アスペクト比を維持したまま、要素のコンテンツボックス全体を埋めるように画像を拡大縮小します
 * @type {React.VFC<Props>}
 */
const CoveredImage = ({ alt, src }) => {
  const { data, isLoading } = useFetch(src, fetchBinary)

  if (isLoading || data === null) {
    return null
  }

  return (
    // <div className="">
    <img
      alt={alt}
      className="'relative w-full h-full overflow-hidden'"
      style={{ objectFit: 'cover' }}
      src={src}
      loading="lazy"
    />
    // </div>
  )
}

export { CoveredImage }
