import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import "./style.css";

function Select(props) {
  const options = {
    status: useMemo(
      () => [
        { value: "done", title: "выполнено" },
        { value: "inProgress", title: "в процессе" },
        { value: "awaitingExecution", title: "ожидает выполнения" },
      ],
      []
    ),
  };

  return (
    <select className="Select" defaultValue={props.value}>
      {options.status.map((item) => (
        <option key={item.value} value={item.value}>
          {item.title}
        </option>
      ))}
    </select>
  );
}

Select.propTypes = {
  value: PropTypes.any,
};

export default memo(Select);
