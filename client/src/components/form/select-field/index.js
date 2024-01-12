import React, { memo, useCallback } from "react";
import PropTypes from "prop-types";
import debounce from "lodash.debounce";
import { cn as bem } from "@bem-react/classname";
import "./style.css";

function SelectField({
  label,
  value,
  setValue,
  onChange,
  defaultOption,
  options,
  error,
  name,
}) {
  const cn = bem("SelectField");

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

  return (
    <div className={cn()}>
      <label htmlFor={name}>{label}</label>
      <select id={name} name={name} value={value} onChange={handleChange}>
        <option disabled value="">
          {defaultOption}
        </option>
        {options.map((option) => (
          <option value={option.value} key={option.value}>
            {option.title}
          </option>
        ))}
      </select>
      {error && <div className={cn("error")}>{error}</div>}
    </div>
  );
}

SelectField.propTypes = {
  defaultOption: PropTypes.string,
  label: PropTypes.string,
  value: PropTypes.string,
  onChange: PropTypes.func,
  error: PropTypes.string,
  options: PropTypes.oneOfType([PropTypes.object, PropTypes.array]),
  name: PropTypes.string,
};

export default memo(SelectField);
