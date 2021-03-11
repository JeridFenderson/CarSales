import styled from 'styled-components'

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  position: -webkit-sticky;
  position: sticky;
  top: 0;
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
      display: flex;
      justify-content: space-between;

      &:not(:first-of-type) {
        border-top: 0.2em solid black;
        border-radius: 1em;
        text-align: center;
      }
    }
  }
`

export const StyledBurger = styled.div`
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

export const Nav = styled.nav`
  background-color: rgba(0, 0, 0, 0.9);
  width: 100%;
  height: 4em;
  border-bottom: 2px solid gold;
  padding: 1em 2em;
  display: flex;
  justify-content: space-between;
  align-items: center;
  @media (min-width: 768px) {
    position: sticky;
    top: 0;
  }
  .logo {
    padding: 15px 0;
  }
`
