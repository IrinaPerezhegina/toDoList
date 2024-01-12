import { memo } from "react";
import PropTypes from "prop-types";
import { cn as bem } from "@bem-react/classname";
import { MdDeleteForever } from "react-icons/md";
import { MdModeEdit } from "react-icons/md";
import "./style.css";
import Select from "../select";

function Item(props) {
  const cn = bem("Item");
  const callbacks = {
    onDelete: (e) => props.onDelete(props.list._id),
    onEdit: (e) => props.onEdit(props.list._id),
  };

  return (
    <div className={cn()}>
      <div className={cn("task")}>
        <div className={cn("description")}>
          <span>{props.list.title}</span>
          <span>{props.list.description}</span>
        </div>
        <div className={cn("status")}>
          <Select value={props.list.status} />
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
