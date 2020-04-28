import React, { useRef, useState, useEffect } from 'react';

function TextArea(props) {
  const { allowResize, value, onChange, minRows = 1, maxRows, ...restProps } = props;
  const [rows, setRows] = useState(minRows);
  const [textareaDimensions, setTextareaDimensions] = useState();
  const textareaRef = useRef();

  useEffect(() => {
    const style = getComputedStyle(textareaRef.current);
    const lineHeight = parseInt(style.lineHeight, 10);
    const paddingHeight = parseInt(style.paddingTop, 10) + parseInt(style.paddingBottom, 10);
    setTextareaDimensions({ lineHeight, paddingHeight });
  }, []);

  const handleChange = (event) => {
    onChange(event);

    const { lineHeight, paddingHeight } = textareaDimensions;
    const previousRows = event.target.rows;
    event.target.rows = minRows;

    const currentRows = ~~((event.target.scrollHeight - paddingHeight) / lineHeight);

    if (currentRows === previousRows) {
      event.target.rows = currentRows;
    }

    if (maxRows && currentRows >= maxRows) {
      event.target.rows = maxRows;
      event.target.scrollTop = event.target.scrollHeight;
    }

    setRows((maxRows && currentRows > maxRows) ? maxRows : currentRows);
  };

  return (
    <textarea
      {...restProps}
      ref={textareaRef}
      onChange={handleChange}
      style={{ resize: allowResize ? undefined : 'none' }}
      rows={rows}
      value={value}
    />
  );
};

export default TextArea;
