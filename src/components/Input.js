import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components/macro';
import TextArea from '../components/TextArea';
import { rgba } from '../utils/StyleUtils';

const genId = prefix => `${prefix}-${Math.random().toString(32).substring(2, 8)}`;

function Input(props) {
  const { id, label, hasValue, multiline, className, ...restProps } = props;
  const inputId = useRef(id || genId('input'));
  const [focused, setFocused] = useState(false);

  return (
    <InputWrapper className={className}>
      <InputLabel
        id={`${inputId.current}-label`}
        hasValue={!!props.value}
        htmlFor={inputId.current}
        focused={focused}
      >
        {label}
      </InputLabel>
      <InputElement
        as={multiline ? TextArea : null}
        id={inputId.current}
        aria-labelledby={`${inputId.current}-label`}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
        {...restProps}
      />
      <InputUnderline focused={focused} />
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
`;

const InputElement = styled.input`
  background: transparent;
  color: ${props => props.theme.colorText};
  box-shadow: inset 0 -2px 0 0 ${props => rgba(props.theme.colorText, 0.2)};
  transition: box-shadow 0.4s ease;
  height: 34px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  margin: 0;
  border: 0;
  padding: 16px 0;
  z-index: 16;
  appearance: none;
  border-radius: 0;
  min-height: 54px;
  line-height: 1.4;

  &::-webkit-contacts-auto-fill-button {
    background-color: ${props => rgba(props.theme.colorText, 0.4)};
    transition: background-color 0.3s ease;
  }

  &:focus {
    outline: none;
  }

  &::-webkit-contacts-auto-fill-button:hover {
    background-color: ${props => props.theme.colorPrimary};
  }
`;

const InputUnderline = styled.div`
  background: ${props => props.theme.colorPrimary};
  transform: scale3d(${props => props.focused ? 1 : 0}, 1, 1);
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};
  transform-origin: left;
`;

const InputLabel = styled.label`
  color: ${props => rgba(props.theme.colorText, 0.8)};
  position: absolute;
  top: 18px;
  left: 0;
  display: block;
  transform-origin: top left;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};

  ${props => (props.hasValue || props.focused) && css`
    color: ${rgba(props.theme.colorText, 0.4)};
    transform: scale(0.8) translateY(-28px);
  `}
`;

export default React.memo(Input);
