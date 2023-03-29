import styled from "styled-components";

export const CommonStyled = styled.div`
  background-color: #efefef;
  width: 100%;
  height: 100vh;
`;

export const CommonBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: #fff;
  padding: 50px 40px;
  border-radius: 10px;
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
`;

export const Title = styled.h2`
  text-align: center;
  display: block;
  font-weight: bold;
`;

export const InputLabelBlock = styled.label`
  display: inline-block;
  margin-bottom: 5px;
  font-size: 14px;
  color: #939393;
  cursor: pointer;
`;

export const InputTextBlock = styled.input`
  display: block;
  width: 400px;
  height: 45px;
  border-radius: 10px;
  outline: none;
  border: 1px solid #dadada;
  padding: 5px 15px;
`;

export const ButtonPrimary = styled.button`
  padding: 8px 20px;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #0984e3;
  color: white;
  cursor: pointer;
  transition: all .3s;

  &.block {
    width: 100%;
  }
  
  &:hover {
    background-color: #0975c9;
  }
`;

export const ButtonSecondary = styled.button`
  padding: 8px 20px;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #939393;
  color: white;
  cursor: pointer;
  transition: all .3s;

  &.block {
    width: 100%;
  }

  &:hover {
    background-color: #888888;
  }
`;

export const ButtonSuccess = styled.button`
  padding: 8px 20px;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #10cb6a;
  color: white;
  cursor: pointer;
  transition: all .3s;

  &.block {
    width: 100%;
  }

  &:hover {
    background-color: #0ae171;
  }
`;
export const ButtonInfo = styled.button`
  padding: 8px 20px;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #23d7be;
  color: white;
  cursor: pointer;
  transition: all .3s;

  &.block {
    width: 100%;
  }

  &:hover {
    background-color: #50dab1;
  }
`;
export const ButtonWarning = styled.button`
  padding: 8px 20px;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #e8dd36;
  color: white;
  cursor: pointer;
  transition: all .3s;

  &.block {
    width: 100%;
  }

  &:hover {
    background-color: #d5ca2f;
  }
`;
export const ButtonDanger = styled.button`
  padding: 8px 20px;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #ef2929;
  color: white;
  cursor: pointer;
  transition: all .3s;

  &.block {
    width: 100%;
  }

  &:hover {
    background-color: #de2525;
  }
`;
export const ButtonLight = styled.button`
  padding: 8px 20px;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #e7e7e7;
  color: #333;
  cursor: pointer;
  transition: all .3s;

  &.block {
    width: 100%;
  }

  &:hover {
    background-color: #d7d7d7;
  }
`;
export const ButtonDark = styled.button`
  padding: 8px 20px;
  line-height: 30px;
  box-sizing: border-box;
  border-radius: 10px;
  border: none;
  background-color: #4f4f4f;
  color: #fff;
  cursor: pointer;
  transition: all .3s;

  &.block {
    width: 100%;
  }

  &:hover {
    background-color: #d7d7d7;
  }
`;

export const MessageBox = styled.div`
  padding: 5px 0;
  font-size: 13px;

  &.center {
    text-align: center;
  }

  &.error {
    color: red;
  }

  &.desc {
    color: #a8a8a8;
  }
  
  &.m-0 {
    margin: 0;
  }
`;

export const DividerText = styled.div`
  padding: 0 10px;
  font-size: 12px;
  color: #ccc;
  white-space: nowrap;
`;
export const Divider = styled.div`

  width: 100%;
  height: 1px;
  background-color: #ccc;
  margin: 10px 0;
  
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

