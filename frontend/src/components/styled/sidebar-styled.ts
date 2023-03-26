import styled from "styled-components";

export const SidebarBox = styled.div`
  padding: 66px 10px 10px 10px;
  background-color: coral;
  width: 240px;
  height: 100vh;
  transition: .3s ease;
  
  &.close {
    width: 50px;
  }
  
  @media (max-width: 660px) {
    display: block;
    position: absolute;
    top: 56px;
    padding-top: 10px;
    width: 100%;
    box-sizing: border-box;
  }
`