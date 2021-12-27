import React from 'react'

import { useFetch } from '../../../hooks/use_fetch'
import { fetchBinary } from '../../../utils/fetchers'
import { AspectRatioBox } from '../AspectRatioBox'
import { FontAwesomeIcon } from '../FontAwesomeIcon'

/**
 * @typedef {object} Props
 * @property {string} src
 */

/**
 * クリックすると再生・一時停止を切り替えます。
 * @type {React.VFC<Props>}
 */
const PausableMovie = ({ src }) => {
  const { data, isLoading } = useFetch(src, fetchBinary)

  const videoRef = React.useRef(null)

  const [isPlaying, setIsPlaying] = React.useState(true)

  React.useEffect(() => {
    // 視覚効果 off のときは自動再生しない
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      videoRef.current?.pause()
      setIsPlaying(false)
    } else {
      videoRef.current?.play()
      setIsPlaying(true)
    }
  }, [])

  const handleClick = React.useCallback(() => {
    setIsPlaying((isPlaying) => {
      if (isPlaying) {
        videoRef.current.pause()
      } else {
        videoRef.current.play()
      }
      return !isPlaying
    })
  }, [])

  const [playClass, setPlayClass] = React.useState('')
  React.useEffect(() => {
    let baseName =
      'absolute left-1/2 top-1/2 flex items-center justify-center w-16 h-16 text-white text-3xl bg-black bg-opacity-50 rounded-full transform -translate-x-1/2 -translate-y-1/2'
    if (isPlaying) {
      baseName += ' opacity-0 group-hover:opacity-100'
    }
    setPlayClass(baseName)
  }, [isPlaying])

  if (isLoading || data === null) {
    return null
  }

  return (
    <AspectRatioBox aspectHeight={1} aspectWidth={1}>
      <button
        className="group relative block w-full h-full"
        onClick={handleClick}
        type="button"
      >
        <video
          ref={videoRef}
          muted
          loop
          autoPlay={isPlaying}
          className="w-full"
        >
          <source src={src} type="video/webm" />
        </video>
        <div className={playClass}>
          <FontAwesomeIcon
            iconType={isPlaying ? 'pause' : 'play'}
            styleType="solid"
          />
        </div>
      </button>
    </AspectRatioBox>
  )
}

export { PausableMovie }
