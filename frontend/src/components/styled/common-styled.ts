import styled from "styled-components";

export const CommonStyled = styled.div`
  background-color: ${(props) => (props.theme === "light" ? "#f0f0f0" : "#0f0f0f")};
  color: ${(props) => (props.theme === "light" ? "#333" : "#fff")};
  width: 100%;
  height: 100vh;
`;

export const CommonBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  width: 460px;
  transform: translate(-50%, -50%);
  background-color: ${(props) => (props.theme === "light" ? "#f0f0f0" : "#333333")};
  color: ${(props) => (props.theme === "light" ? "#333" : "#fff")};
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
  width: 100%;
  height: 45px;
  border-radius: ${(props) => props.theme === "light" ? "10px;" : "0"};
  outline: none;
  ${( props ) => props.theme === 'light' ? `
    border: 1px solid #dadada;
  ` : 'border-bottom: 1px solid #dadada; border-top: 0; border-left: 0; border-right: 0;'}
  padding: ${(props) => props.theme === "light" ? "5px 15px;" : "5px 5px;"};
  background-color: ${(props) => (props.theme === "light" ? "#f0f0f0" : "#333333")};
  color: ${(props) => (props.theme === "light" ? "#333" : "#fff")};
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

  &.small {
    padding: 4px 20px;
  }
  
  &.block {
    width: 100%;
    padding-left: 0;
    padding-right: 0;
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

  &.small {
    padding: 4px 20px;
  }
  
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

  &.small {
    padding: 4px 20px;
  }
  
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

  &.small {
    padding: 4px 20px;
  }
  
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

  &.small {
    padding: 4px 20px;
  }
  
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

  &.small {
    padding: 4px 20px;
  }
  
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

  &.small {
    padding: 4px 20px;
  }
  
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

  &.small {
    padding: 4px 20px;
  }

  &.block {
    width: 100%;
  }

  &:hover {
    background-color: #424242;
  }
`;

export const MessageBox = styled.div`
  padding: 5px 0;
  font-size: 13px;

  &.center {
    text-align: center;
  }

  &.error {
    color: #de2e2e;
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

  &.dark {
    background-color: #414141;
  }
`;

export const FlexStart = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: start;
`;

export const FlexBetween = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  &.block {
    flex: 1;
  }
`;

export const FlexCenter = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const MyModal = styled.div`
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100vh;
  background-color: rgba(0, 0, 0, .3);
  z-index: 1;
`;

export const ModalBody = styled.div`
  position: absolute;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  box-shadow: rgba(0, 0, 0, 0.24) 0 3px 8px;
  min-width: 200px;
  min-height: 300px;
  background-color: ${(props) => (props.theme === "light" ? "#f0f0f0" : "#343434")};
  color: ${(props) => (props.theme === "light" ? "#333333" : "#f0f0f0")};
  padding: 15px 25px;
  border-radius: 10px;
`;

export const ModalClose = styled.div`
  cursor: pointer;
`;

export const ModalContentStyle = styled.div`
  margin-top: 1.2rem;
  p {
    text-align: center;
    margin-bottom: 0;
  }

  h1, h2, h3, h4, h5, h6 {
    text-align: center;
  }
`;

export const LinkTeg = styled.a`
  font-size: 14px;
  text-decoration: none;
  color: ${(props) => (props.theme === "light" ? "#333333" : "#f0f0f0")};
  
  &:hover {
    color: ${(props) => (props.theme === "light" ? "#333333" : "#f0f0f0")};
    text-decoration: underline;
  }
`;