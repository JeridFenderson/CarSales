import React, { useState } from 'react'
import styled from 'styled-components'
import './custom.scss'

const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  li {
    color: white;
    padding: 1em;
  }
  @media (max-width: 767px) {
    background-color: gold;
    flex-flow: column nowrap;
    position: fixed;
    transform: ${({ open }) => (open ? 'translateX(0)' : 'translateX(100%)')};
    top: 0;
    right: 0;
    height: 32em;
    width: 16em;
    padding-top: 3em;
    border-radius: 0 0 0 1em;
    transition: transform 0.3s ease-in-out;
    li {
      color: black;
      &:first-of-type {
        display: flex;
        justify-content: space-between;
      }
      &:not(:first-of-type) {
        border-top: 0.2em solid black;
        border-radius: 1em;
        text-align: center;
      }
    }
  }
`

const RightNav = ({ open }) => {
  return (
    <Ul open={open}>
      <li>
        <a href="#">Log In</a>
        <span> Or </span> <a href="#">Sign Up</a>
      </li>
      <li>
        Home <i className="fas fa-home-lg-alt"></i>
      </li>
      <li>
        Specific Car Request <i className="fas fa-car"></i>
      </li>
      <li>
        Pre-owned Inventory <i className="fas fa-cars"></i>
      </li>
      <li>
        Sell My Car <i className="far fa-car"></i>
      </li>
      <li>
        Contact Us <i className="fas fa-address-card"></i>
      </li>
      <li>
        About Us <i className="fas fa-id-card-alt"></i>
      </li>
    </Ul>
  )
}

const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 1em;
  right: 1.5em;
  z-index: 20;
  display: none;
  @media (max-width: 767px) {
    display: flex;
    justify-content: space-around;
    flex-flow: column nowrap;
  }
  div {
    width: 2rem;
    height: 0.25rem;
    background-color: ${({ open }) => (open ? 'black' : 'gold')};
    border-radius: 10px;
    transform-origin: 1px;
    transition: all 0.3s linear;
    &:nth-child(1) {
      transform: ${({ open }) => (open ? 'rotate(45deg)' : 'rotate(0)')};
    }
    &:nth-child(2) {
      transform: ${({ open }) => (open ? 'translateX(100%)' : 'translateX(0)')};
      opacity: ${({ open }) => (open ? 0 : 1)};
    }
    &:nth-child(3) {
      transform: ${({ open }) => (open ? 'rotate(-45deg)' : 'rotate(0)')};
    }
  }
`

const Burger = () => {
  const [open, setOpen] = useState(false)

  return (
    <>
      <StyledBurger open={open} onClick={() => setOpen(!open)}>
        <div />
        <div />
        <div />
      </StyledBurger>
      <RightNav open={open} />
    </>
  )
}

const Nav = styled.nav`
  width: 100%;
  height: 6em;
  border-bottom: 2px solid gold;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  .logo {
    padding: 15px 0;
  }
`

const Navbar = () => {
  return (
    <Nav>
      <Burger />
    </Nav>
  )
}

export function App() {
  return (
    <>
      <header>
        <h1>Cadeem's Cars</h1>
        <Navbar />
      </header>
      <main>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="year make model"
          />
          <ul>
            <li>
              <h2>Year Make Model</h2>
            </li>
            <li className="desktop">
              Odometer Miles. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Odit perspiciatis nihil iure enim molestias eius at quasi
              ratione quae sint nemo modi.
            </li>
            <li>
              <h3>Price</h3>
            </li>
          </ul>
        </figure>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="year make model"
          />
          <ul>
            <li>
              <h2>Year Make Model</h2>
            </li>
            <li className="desktop">
              Odometer Miles. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Odit perspiciatis nihil iure enim molestias eius at quasi
              ratione quae sint nemo modi.
            </li>
            <li>
              <h3>Price</h3>
            </li>
          </ul>
        </figure>
        <figure>
          <img
            src="https://images.unsplash.com/photo-1597404294360-feeeda04612e?ixid=MXwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHw%3D&ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="year make model"
          />
          <ul>
            <li>
              <h2>Year Make Model</h2>
            </li>
            <li className="desktop">
              Odometer Miles. Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Odit perspiciatis nihil iure enim molestias eius at quasi
              ratione quae sint nemo modi.
            </li>
            <li>
              <h3>Price</h3>
            </li>
          </ul>
        </figure>
      </main>
      <footer>
        <ul>
          <li>Cadeem's Cars</li>
          <li>Telephone Number</li>
          <li>Facebook Page</li>
          <li>Physical Address</li>
        </ul>
      </footer>
    </>
  )
}
