import React from 'react'

import { getImagePath } from '../../../utils/get_path'
import { AspectRatioBox } from '../../foundation/AspectRatioBox'
import { CoveredImage } from '../../foundation/CoveredImage'

/**
 * @typedef {object} Props
 * @property {Array<Models.Image>} images
 */

/** @type {React.VFC<Props>} */
const ImageArea = ({ images }) => {
  const imagesWithClassName = images.map((image, idx) => {
    let className = 'bg-gray-300'
    if (images.length !== 1) {
      className += ' col-span-1'
    }
    if (images.length === 1) {
      className += ' col-span-2'
    }
    if (images.length > 2 && (images.length !== 3 || idx !== 0)) {
      className += ' row-span-1'
    }
    if (images.length <= 2 || (images.length === 3 && idx === 0)) {
      className += ' row-span-2'
    }
    return {
      ...image,
      className,
    }
  })

  return (
    <AspectRatioBox aspectHeight={9} aspectWidth={16}>
      <div className="grid gap-1 grid-cols-2 grid-rows-2 w-full h-full border border-gray-300 rounded-lg overflow-hidden">
        {imagesWithClassName.map((image) => {
          return (
            <div
              key={image.id}
              // CSS Grid で表示領域を指定する
              className={image.className}
            >
              <CoveredImage alt={image.alt} src={getImagePath(image.id)} />
            </div>
          )
        })}
      </div>
    </AspectRatioBox>
  )
}

export { ImageArea }
