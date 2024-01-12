import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import "./style.css";
import TextField from "../form/text-field";
import TextAreaField from "../form/text-area-field";
import SelectField from "../form/select-field";

function TaskForm({
  handleSubmit,
  setData,
  data,
  handleChange,
  errors,
  isValid,
  isId,
}) {
  const cn = bem("TaskForm");

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
    <form onSubmit={handleSubmit} className={cn()}>
      <TextField
        label="Наименование задачи:"
        name="title"
        setValue={setData}
        value={data.title}
        onChange={handleChange}
        error={errors.title}
      />
      <TextAreaField
        label="Описание задачи:"
        name="description"
        setValue={setData}
        value={data.description}
        onChange={handleChange}
        error={errors.description}
      />
      <SelectField
        label="Выбери статус новой задачи"
        defaultOption="Choose..."
        options={options.status}
        name="status"
        setValue={setData}
        onChange={handleChange}
        value={data.status}
        error={errors.status}
      />
      <button type="submit" disabled={!isValid}>
        {isId ? "Редактировать задачу" : "Создать задачу"}
      </button>
    </form>
  );
}

TaskForm.propTypes = {
  handleSubmit: PropTypes.func,
  handleChange: PropTypes.func,
  isValid: PropTypes.bool,
  setData: PropTypes.func,
  errors: PropTypes.object,
  options: PropTypes.array,
  data: PropTypes.object,
  isId: PropTypes.string,
};

TaskForm.defaultProps = {
  handleSubmit: () => {},
  handleChange: () => {},
};

export default memo(TaskForm);
