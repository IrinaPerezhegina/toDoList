import { memo, useMemo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import "./style.css";

function Item(props) {
  const cn = bem("Item");
  const callbacks = {
    onDelete: (e) => props.onDelete(props.list._id),
    onEdit: (e) => props.onEdit(props.list._id),
  };
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
  function getStatus() {
    return options.status.find((item) => item.value == props.list.status);
  }
  function getClassName() {
    return getStatus().value === "done"
      ? "done"
      : getStatus().value === "inProgress"
      ? "inProgress"
      : "awaitingExecution";
  }
  function getClassNameN() {
    return getStatus().value === "done"
      ? "taskDone"
      : getStatus().value === "inProgress"
      ? "taskInProgress"
      : "taskAwaitingExecution";
  }

  return (
    <div className={cn()}>
      <div className={cn(`${getClassNameN()}`)}>
        <div className={cn("description")}>
          <span>{props.list.title}</span>
          <span>{props.list.description}</span>
        </div>
        <div className={cn(`${getClassName()}`)}>
          <div> {getStatus().title}</div>
        </div>
        <div className={cn("actions")}>
          <button onClick={callbacks.onEdit}>
            <MdModeEdit size={25} />
          </button>
          <button onClick={callbacks.onDelete}>
            <MdDeleteForever size={25} />{" "}
          </button>
        </div>
      </div>
    </div>
  );
}

Item.propTypes = {
  onDelete: PropTypes.func.isRequired,
  onEdit: PropTypes.func.isRequired,
};

Item.defaultProps = {
  onDelete: () => {},
  onEdit: () => {},
};

export default memo(Item);
