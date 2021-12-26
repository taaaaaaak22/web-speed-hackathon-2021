import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

/**
 * @typedef {object} Props
 * @property {React.ReactNode} icon
 * @property {string} text
 * @property {string} [href]
 * @property {() => void} [onClick]
 */

/** @type {React.VFC<Props>} */
const NavigationItem = ({ href, icon, onClick, text }) => {
  const router = useRouter()

  const [linkClass, setLinkClass] = React.useState('')
  React.useEffect(() => {
    let baseName =
      'flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full'
    if (router.pathname === href) {
      baseName += ' text-green-800'
    }
    setLinkClass(baseName)
  }, [router.pathname, href])

  return (
    <li>
      {href !== undefined ? (
        <Link href={href}>
          <a onClick={onClick} className={linkClass}>
            <span className="text-xl lg:pr-2 lg:text-3xl">{icon}</span>
            <span className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">
              {text}
            </span>
          </a>
        </Link>
      ) : (
        <button
          className="flex flex-col items-center justify-center w-12 h-12 hover:bg-green-50 rounded-full sm:px-2 sm:w-24 sm:h-auto sm:rounded lg:flex-row lg:justify-start lg:px-4 lg:py-2 lg:w-auto lg:h-auto lg:rounded-full"
          onClick={onClick}
        >
          <span className="text-xl lg:pr-2 lg:text-3xl">{icon}</span>
          <span className="hidden sm:inline sm:text-sm lg:text-xl lg:font-bold">
            {text}
          </span>
        </button>
      )}
    </li>
  )
}

export { NavigationItem }
