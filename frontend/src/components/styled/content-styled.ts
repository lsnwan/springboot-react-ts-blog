import styled from "styled-components";

export const BodyBox = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? '#f0f0f0' : '#0f0f0f'};
  color: ${props => props.theme === 'light' ? '#333' : '#fff'};
  transition: all .3s;
`

export const ContentBody = styled.div`
  padding: 66px 13px 10px 13px;
  flex: auto;
  height: 100vh;
  box-sizing: border-box;
`

export const Container = styled.div`
  width: 1100px;
  height: 500px;
  margin: 0 auto;
  
`