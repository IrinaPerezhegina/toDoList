import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function TextField({ label, type, name, value, setValue, onChange, error }) {
  const onChangeDebounce = useCallback(
    debounce((value) => onChange(value, name), 600),
    [onChange, name]
  );

  // Обработчик изменений в поле
  const handleChange = ({ target }) => {
    setValue((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
    onChangeDebounce(target.value);
  };

  const cn = bem("InputField");
  return (
    <div className={cn()}>
      <label htmlFor={name}>{label}</label>
      <div>
        <input
          type={type}
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
TextField.defaultProps = {
  type: "text",
};
TextField.propTypes = {
  label: PropTypes.string,
  type: PropTypes.string,
  name: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
};

export default memo(TextField);
