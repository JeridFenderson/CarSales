import React from 'react'
import { Link } from 'react-router-dom'
import '../../css/footer.scss'

export function Footer() {
  return (
    <footer>
      <nav>
        <ul>
          <li>
            <Link to="/">Cheap and Easy Auto &#169;</Link>
          </li>
          <li>
            <a
              href="https://www.facebook.com/cheapandeasyautoinc"
              rel="noreferrer"
              target="_blank"
            >
              Find Us on Facebook
            </a>
          </li>
          <li>
            <a
              href="https://www.linkedin.com/in/jeridfenderson/"
              rel="noreferrer"
              target="_blank"
            >
              Made with <i className="fas fa-heart"></i> by Jerid Fenderson
            </a>
          </li>
        </ul>
      </nav>
    </footer>
  )
}
