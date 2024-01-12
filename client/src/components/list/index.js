import { memo } from "react";
import PropTypes from "prop-types";
import Item from "../item";
import "./style.css";

function List({ list, onDelete, editTask }) {
  return (
    <>
      <div className="Header">
        <div>Наименование и описание задачи</div>
        <div>Статус</div>
        <div>Редактирование</div>
      </div>
      <div className="List">
        {list.map((item) => (
          <div key={item._id} className="List-item">
            <Item list={item} onDelete={onDelete} onEdit={editTask} />
          </div>
        ))}
      </div>
    </>
  );
}

List.propTypes = {
  list: PropTypes.array.isRequired,
  editTask: PropTypes.func.isRequired,
};

export default memo(List);
