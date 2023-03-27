import styled from "styled-components";

export const BodyBox = styled.div`
  display: flex;
`

export const ContentBody = styled.div`
  padding: 66px 25px 10px 25px;
  background-color: #0f0f0f;
  color: white;
  flex: auto;
  height: 100vh;
  box-sizing: border-box;
`

export const Container = styled.div`
  width: 1150px;
  height: 500px;
  background-color: cornflowerblue;
  margin: 0 auto;
  
  @media (max-width: 1440px) {
    width: 100%;
  }
`