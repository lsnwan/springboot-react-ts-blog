import styled from "styled-components";

export const SidebarBox = styled.div`
  padding: 66px 10px 10px 10px;
  box-sizing: border-box;
  background-color: ${props => props.theme === 'light' ? "#f0f0f0" : "#0f0f0f"};
  color: ${props => props.theme === 'light' ? "#333" : "#fff"};
  width: 240px;
  height: 100vh;
  transition: all .3s;
  flex-shrink: 0;
  
  &.close {
    width: 60px;
  }
  
`