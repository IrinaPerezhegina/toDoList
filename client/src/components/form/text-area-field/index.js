import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function TextAriaField({ label, name, value, setValue, onChange, error }) {
  const onChangeDebounce = useCallback(
    debounce((value) => onChange(value, name), 600),
    [onChange, name]
  );
  console.log(error);
  // Обработчик изменений в поле
  const handleChange = ({ target }) => {
    setValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    onChangeDebounce(target.value);
  };

  const cn = bem("TextAriaField");
  return (
    <div className={cn()}>
      <label htmlFor={name}>{label}</label>
      <div>
        <textarea
          type={"text"}
          id={name}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder="Заполните данные..."
        />

        {error && <div className={cn("error")}>{error}</div>}
      </div>
    </div>
  );
}
TextAriaField.defaultProps = {
  type: "text",
};
TextAriaField.propTypes = {
  error: PropTypes.string,
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default memo(TextAriaField);
