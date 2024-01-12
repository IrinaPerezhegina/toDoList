import { memo } from "react";
import PropTypes from "prop-types";
import "./style.css";
import { MdAddTask } from "react-icons/md";

function Controls({ openModal }) {
  return (
    <div className="Controls">
      <button onClick={() => openModal()}>
        <MdAddTask size={30} />
      </button>
    </div>
  );
}

Controls.propTypes = {
  openModal: PropTypes.func,
};

Controls.defaultProps = {
  openModal: () => {},
};

export default memo(Controls);
