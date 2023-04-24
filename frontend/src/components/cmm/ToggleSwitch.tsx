import React from 'react';
import styled from "styled-components";

type Props = {};

const ToggleSwitchLabel = styled.label`
  width: 50px;
  height: 30px;
  display: block;
  position: relative;
  border-radius: 15px;
  background-color: #383838;
  box-shadow: 0 0 16px 3px rgba(0 0 0 / 15%);
  cursor: pointer;
  margin: 30px;
  transition: all 0.2s ease-in;

  .toggleButton {
    width: 23px;
    height: 23px;
    position: absolute;
    top: 50%;
    left: 5px;
    transform: translateY(-50%);
    border-radius: 50%;
    background: #5b5b5b;
  }

  .toggleButton {
    transition: all 0.2s ease-in;
  }
`;

const ToggleInputCheck = styled.input`
  &:checked ~ .toggleSwitch {
    background: #0669b6;
  }

  &:checked ~ .toggleSwitch .toggleButton {
    left: calc(100% - 28px);
    background: #ffffff;
  }
`;

const ToggleSwitch = (props: Props) => {
  return (
    <>
      <ToggleInputCheck type="checkbox" id="toggle" hidden />
      <ToggleSwitchLabel htmlFor="toggle" className="toggleSwitch">
        <span className="toggleButton"></span>
      </ToggleSwitchLabel>
    </>
  );
};

export default ToggleSwitch;