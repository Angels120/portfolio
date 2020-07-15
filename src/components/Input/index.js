import React, { useState, useRef } from 'react';
import classNames from 'classnames';
import { TransitionGroup, Transition } from 'react-transition-group';
import TextArea from 'components/TextArea';
import { useId } from 'hooks';
import './index.css';
import { isVisible } from 'utils/transition';
import { msToNum, tokens } from 'app/theme';
import Icon from 'components/Icon';

const Input = ({
  id,
  label,
  hasValue,
  value,
  multiline,
  className,
  style,
  error,
  ...rest
}) => {
  const [focused, setFocused] = useState(false);
  const generatedId = useId();
  const errorRef = useRef();
  const inputId = id || `input-${generatedId}`;
  const labelId = `${inputId}-label`;
  const errorId = `${inputId}-error`;
  const InputElement = multiline ? TextArea : 'input';

  return (
    <div
      className={classNames('input', className, { 'input--error': !!error })}
      style={style}
    >
      <div className="input__content">
        <label
          className={classNames('input__label', {
            'input__label--focused': focused,
            'input__label--has-value': !!value,
          })}
          id={labelId}
          htmlFor={inputId}
        >
          {label}
        </label>
        <InputElement
          className="input__element"
          id={inputId}
          aria-labelledby={labelId}
          aria-describedby={!!error ? errorId : undefined}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          value={value}
          {...rest}
        />
        <div
          className={classNames('input__underline', {
            'input__underline--focused': focused,
          })}
        />
      </div>
      <TransitionGroup component={null}>
        {!!error && (
          <Transition timeout={msToNum(tokens.base.durationM)}>
            {status => (
              <div
                className={classNames('input__error', `input__error--${status}`)}
                id={errorId}
                role="alert"
                style={{
                  '--height': isVisible(status)
                    ? `${errorRef.current?.getBoundingClientRect().height}px`
                    : '0px',
                }}
              >
                <div className="input__error-message" ref={errorRef}>
                  <Icon icon="error" />
                  {error}
                </div>
              </div>
            )}
          </Transition>
        )}
      </TransitionGroup>
    </div>
  );
};

export default Input;
