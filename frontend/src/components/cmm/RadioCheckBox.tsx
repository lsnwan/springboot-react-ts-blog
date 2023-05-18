import React, {useState} from 'react';
import styled from "styled-components";
import {useSelector} from "react-redux";
import {AppState} from "../../store";
import * as T from "../../store/theme";

const RadioCheckStyled = styled.div`

  display: inline-block;
  margin-right: 5px;

  &:last-child {
    margin-right: 0;
  }

  input {
    display: none;
  }

  input[type="checkbox"] + label {
    display: inline;
    height: 30px;
    position: relative;
    padding: 3px 7px;
    background-color: #adadad;
    color: #7e7e7e;
    border-radius: 5px;
    cursor: pointer;
    font-size: 14px;
  }

  input[type="checkbox"]:checked + label {
    background-color: #0d89d9;
    color: #ffffff;
  }

`;

  type RadioOption = {
  label: string;
  value: string;
};

type RadioProps = {
  options: RadioOption[];
  name: string;
  initValue?: string;
  onChange: (selectedValue: string) => void;
  labelStyle?: React.CSSProperties;
};


const RadioCheckbox: React.FC<RadioProps> = ({options, initValue, name, onChange, labelStyle}) => {

  const theme = useSelector<AppState, T.State>(state => state.themeType);
  const [selectedValue, setSelectedValue] = useState<string>(initValue && (initValue) || (''));

  const handleRadioChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSelectedValue(newValue);
    onChange(newValue);
  };

  return (
    <>
      {options.map((option) => (
        <RadioCheckStyled theme={theme} key={option.value}>
          <input
            type="checkbox"
            id={option.value}
            name={name}
            value={option.value}
            checked={selectedValue === option.value}
            onChange={handleRadioChange}
          />
          <label style={labelStyle} htmlFor={option.value}>{option.label}</label>
        </RadioCheckStyled>
      ))}
    </>
  );
};

export default RadioCheckbox;