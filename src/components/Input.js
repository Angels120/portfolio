import React from 'react';
import styled, { css } from 'styled-components/macro';
import TextArea from '../components/TextArea';

function Input(props) {
  const { id, label, hasValue, multiline, className, ...restProps } = props;

  return (
    <InputWrapper className={className}>
      <InputElement
        as={multiline ? TextArea : null}
        id={id}
        name={id}
        aria-labelledby={`${id}-label`}
        {...restProps}
      />
      <InputUnderline />
      <InputLabel
        id={`${id}-label`}
        hasValue={!!props.value}
        htmlFor={id}
      >
        {label}
      </InputLabel>
    </InputWrapper>
  );
};

const InputWrapper = styled.div`
  position: relative;
  display: flex;
  margin-top: 16px;
`;

const InputElement = styled.input`
  background: transparent;
  color: ${props => props.theme.colorText(1)};
  box-shadow: inset 0 -2px 0 0 ${props => props.theme.colorText(0.2)};
  transition: box-shadow 0.4s ease;
  height: 34px;
  width: 100%;
  font-size: 16px;
  font-family: inherit;
  margin: 0;
  padding: 0;
  border: 0;
  padding: 16px 0;
  z-index: 16;
  appearance: none;
  -webkit-border-radius: 0;
  min-height: 54px;
  line-height: 1.4;

  &:focus {
    outline: none;
  }

  &::-webkit-contacts-auto-fill-button {
    background-color: ${props => props.theme.colorText(0.4)};
    transition: background-color 0.3s ease;
  }

  &::-webkit-contacts-auto-fill-button:hover {
    background-color: ${props => props.theme.colorPrimary(1)};
  }
`;

const InputUnderline = styled.div`
  background: ${props => props.theme.colorPrimary(1)};
  transform: scale3d(0, 1, 1);
  width: 100%;
  height: 2px;
  position: absolute;
  bottom: 0;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};
  transform-origin: left;

  ${InputElement}:focus ~ & {
    transform: scale3d(1, 1, 1);
  }
`;

const InputLabelFocus = props => `
  color: ${props.theme.colorText(0.4)};
  transform: scale(0.8) translateY(-28px);
`;

const InputLabel = styled.label`
  color: ${props => props.theme.colorText(0.8)};
  position: absolute;
  top: 18px;
  left: 0;
  display: block;
  transform-origin: top left;
  transition: all 0.4s ${props => props.theme.curveFastoutSlowin};

  ${InputElement}:focus ~ & {
    ${props => InputLabelFocus(props)}
  }

  ${props => props.hasValue && css`
    ${InputLabelFocus(props)}
  `}
`;

export default React.memo(Input);
