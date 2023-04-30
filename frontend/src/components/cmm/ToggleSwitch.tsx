import React from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";

const ToggleSwitchLabel = styled.label`
  width: 50px;
  height: 30px;
  display: block;
  position: relative;
  border-radius: 15px;
  background-color: ${(props) => (props.theme === 'light' ? "#a2a2a2" : "#383838")};
  cursor: pointer;
  margin: 30px;
  transition: all 0.2s ease-in;

  .toggleButton {
    width: 23px;
    height: 23px;
    position: absolute;
    top: 50%;
    left: 4px;
    transform: translateY(-50%);
    border-radius: 50%;
    background: ${(props) => (props.theme === 'light' ? "#c4c4c4" : "#5b5b5b")};
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

type Props = {
  enabledForm: {enabled: boolean};
  changeEnabled: () => void;
}

const ToggleSwitch = (props: Props) => {
  const theme = useSelector<AppState, T.State>(state => state.themeType);
  return (
    <>
      <ToggleInputCheck theme={theme} type="checkbox" id="toggle" checked={props.enabledForm.enabled} onChange={props.changeEnabled} hidden />
      <ToggleSwitchLabel theme={theme} htmlFor="toggle" className="toggleSwitch">
        <span className="toggleButton"></span>
      </ToggleSwitchLabel>
    </>
  );
};

export default ToggleSwitch;