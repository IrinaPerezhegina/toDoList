import { Routes, Route } from "react-router-dom";
import Main from "./main";
import { useSelector } from "react-redux";
import Task from "./task/index";

/**
 * Приложение
 * @returns {React.ReactElement}
 */
function App() {
  const activeModal = useSelector((state) => state.modals.name);
  return (
    <>
      <Routes>
        <Route path={""} element={<Main />} />
      </Routes>

      {activeModal === "modal" && <Task />}
    </>
  );
}

export default App;
