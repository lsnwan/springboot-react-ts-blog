import styled from "styled-components";

export const BodyBox = styled.div`
  display: flex;
  background-color: ${props => props.theme === 'light' ? '#f0f0f0' : '#0f0f0f'};
`

export const ContentBody = styled.div`
  padding: 66px 13px 10px 13px;
  color: white;
  flex: auto;
  height: 100vh;
  box-sizing: border-box;
`

export const Container = styled.div`
  width: 1100px;
  height: 500px;
  margin: 0 auto;
  
`