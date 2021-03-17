import React, { useEffect, useState } from 'react'
import { Nav } from './nav/Nav'
import '../../css/header.scss'

export function Header() {
  const [headerHeight, setHeaderHeight] = useState(0)
  const [scrollDistance, setScrollDistance] = useState(0)
  const [scrollBottom, setScrollBottom] = useState(false)

  useEffect(() => {
    const header = document.getElementsByTagName('header')[0]
    setHeaderHeight(header.offsetHeight)
    const onScroll = (e) => {
      setScrollDistance(e.target.documentElement.scrollTop)
      setScrollBottom(scrollDistance > headerHeight)
      console.log(scrollBottom)
    }
    window.addEventListener('scroll', onScroll)

    return () => window.removeEventListener('scroll', onScroll)
  }, [headerHeight, scrollBottom, scrollDistance])

  return (
    <div id="header">
      <header>
        <h1>Cheap &amp; Easy Auto</h1>
      </header>
      <Nav />
    </div>
  )
}
