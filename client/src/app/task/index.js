import { memo, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import ModalLayout from "../../components/modal-layout";
import modalsActions from "../../store-redux/modals/actions";
import { validatorConfig } from "../../utils/validator-config";
import { validator } from "../../utils/validator";
import TaskForm from "../../components/task-form";
import tasksActions from "../../store-redux/tasks/actions";
import shallowEqual from "shallowequal";

function Task() {
  const dispatch = useDispatch();
  const [task, setTask] = useState({ title: "", description: "", status: "" });
  const [data, setData] = useState({
    title: task.title || "",
    description: task.description || "",
    status: task.status || "",
  });
  const [errors, setErrors] = useState({});
  const select = useSelector(
    (state) => ({
      data: state.tasks.data,
      waiting: state.tasks.waiting,
      modalDate: state.modals.id,
    }),
    shallowEqual
  );
  // console.log(task);
  // console.log(data);
  useEffect(() => {
    if (select.modalDate) {
      const task = select.data.find((el) => el._id === select.modalDate);
      task && setTask(task);
      setData(task);
    }
  }, [select.modalDate]);
  useEffect(() => {
    validate();
  }, [data]);
  const validate = () => {
    const errors = validator(data, validatorConfig);
    setErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const callbacks = {
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      dispatch(modalsActions.close());
    }, []),
    handleChange: useCallback((target) => {
      setData((prevState) => ({
        ...prevState,
        [target.name]: target.value,
      }));
    }, []),
    handleSubmit: useCallback(
      (e) => {
        e.preventDefault();
        const isValid = validate();
        if (!isValid) return;
        if (!select.modalDate) {
          dispatch(
            tasksActions.createTask({
              title: data.title,
              description: data.description,
              status: data.status,
            })
          );
          dispatch(modalsActions.close());
        } else {
          dispatch(
            tasksActions.editTask({
              title: data.title,
              description: data.description,
              status: data.status,
              _id: select.modalDate,
            })
          );
          dispatch(modalsActions.close());
        }
      },
      [data]
    ),
  };

  const isValid = Object.keys(errors).length === 0;

  return (
    <ModalLayout
      title={
        select.modalDate ? "Редактирование задачи" : "Создание новой задачи"
      }
      labelClose="Закрыть"
      onClose={callbacks.closeModal}
    >
      <TaskForm
        isId={select.modalDate}
        handleSubmit={callbacks.handleSubmit}
        setData={setData}
        data={data}
        handleChange={callbacks.handleChange}
        errors={errors}
        isValid={isValid}
      />
    </ModalLayout>
  );
}

export default memo(Task);
