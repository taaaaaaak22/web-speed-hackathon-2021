import lmax from 'lodash/max'
import lchunk from 'lodash/chunk'
import lmean from 'lodash/mean'
import React from 'react'

/**
 * @param {ArrayBuffer} data
 * @returns {Promise<{ max: number, peaks: number[] }}
 */
async function calculate(data) {
  const audioCtx = new AudioContext()

  // 音声をデコードする
  /** @type {AudioBuffer} */
  const buffer = await new Promise((resolve, reject) => {
    audioCtx.decodeAudioData(data.slice(0), resolve, reject)
  })
  // 左の音声データの絶対値を取る
  const leftData = buffer.getChannelData(0).map(Math.abs)
  // 右の音声データの絶対値を取る
  const rightData = buffer.getChannelData(1).map(Math.abs)

  // 左右の音声データの平均を取る
  const normalized = []
  for (let i = 0; i < leftData.length; i++) {
    normalized.push((leftData[i] + rightData[i]) / 2)
  }

  // 100 個の chunk に分ける
  const chunks = lchunk(normalized, Math.ceil(normalized.length / 100))
  // chunk ごとに平均を取る
  const peaks = chunks.map(lmean)
  // chunk の平均の中から最大値を取る
  const max = lmax(peaks)

  return { max, peaks }
}

/**
 * @typedef {object} Props
 * @property {ArrayBuffer} soundData
 */

/**
 * @type {React.VFC<Props>}
 */
const SoundWaveSVG = ({ soundData }) => {
  const uniqueIdRef = React.useRef(Math.random().toString(16))
  const [{ max, peaks }, setPeaks] = React.useState({ max: 0, peaks: [] })

  React.useEffect(() => {
    calculate(soundData).then(({ max, peaks }) => {
      setPeaks({ max, peaks })
    })
  }, [soundData])

  return (
    <svg
      className="w-full h-full"
      preserveAspectRatio="none"
      viewBox="0 0 100 1"
    >
      {peaks.map((peak, idx) => {
        const ratio = peak / max
        return (
          <rect
            key={`${uniqueIdRef.current}#${idx}`}
            fill="#2563EB"
            height={ratio}
            width="1"
            x={idx}
            y={1 - ratio}
          />
        )
      })}
    </svg>
  )
}

export { SoundWaveSVG }
