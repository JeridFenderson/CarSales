import styled from 'styled-components'

export const Ul = styled.ul`
  list-style: none;
  display: flex;
  flex-flow: row nowrap;
  justify-content: space-between;
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
    width: 16em;
    padding-top: 3em;
    transition: transform 0.3s ease-in-out;
    li {
      color: black;
      display: flex;
      justify-content: space-between;
      &:last-of-type {
        padding-bottom: 2em;
      }
    }
  }
`

export const StyledBurger = styled.div`
  width: 2rem;
  height: 2rem;
  position: fixed;
  top: 1em;
  right: 1em;
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
  max-width: 100%;
  @media (min-width: 768px) {
    position: sticky;
    top: 0;
  }
`
