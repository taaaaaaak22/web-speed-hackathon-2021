import React from 'react'
import { FontAwesomeIcon as FontAwesomeIconLib } from '@fortawesome/react-fontawesome'

/**
 * @typedef {object} Props
 * @property {string} iconType
 * @property {'solid' | 'regular'} styleType
 */

/** @type {React.VFC<Props>} */
const FontAwesomeIcon = ({ icon }) => {
  return (
    <span>
      <FontAwesomeIconLib
        icon={icon}
        className="inline-block leading-none fill-current"
        style={{ height: '1em', verticalAlign: '-0.125em', width: '1em' }}
      ></FontAwesomeIconLib>
    </span>
  )
}

export { FontAwesomeIcon }
