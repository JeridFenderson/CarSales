import React, { useEffect, useState } from 'react'
import { Nav } from './nav/Nav'
import '../../css/header.scss'
import { Link } from 'react-router-dom'

export function Header() {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [scrollDistance, setScrollDistance] = useState(0)
  const [scrollBottom, setScrollBottom] = useState(false)
  const [headerClass, setHeaderClass] = useState('no-scroll')

  useEffect(() => {
    const header = document.getElementsByTagName('header')[0]
    setHeaderHeight(header.offsetHeight)
    const onScroll = (e) => {
      setScrollDistance(e.target.documentElement.scrollTop)
      setScrollBottom(scrollDistance > headerHeight)
      if (scrollBottom) {
        setHeaderClass('scroll')
      } else {
        setHeaderClass('no-scroll')
      }
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [headerHeight, scrollBottom, scrollDistance])

  return (
    <header>
      <div className={headerClass}>
        <Link to="/">
          <h1>Cheap &amp; Easy Auto</h1>
        </Link>
        <Nav />
      </div>
    </header>
  )
}
