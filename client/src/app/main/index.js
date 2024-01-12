import { memo, useCallback, useEffect, useState } from "react";
import PageLayout from "../../components/page-layout";
import Head from "../../components/head";
import List from "../../components/list";
import Controls from "../../components/controls";
import { useDispatch } from "react-redux";
import modalsActions from "../../store-redux/modals/actions";
import { useSelector } from "react-redux";
import shallowEqual from "shallowequal";
import tasksActions from "../../store-redux/tasks/actions";
import Spinner from "../../components/spinner/index";

function Main() {
  const dispatch = useDispatch();

  const select = useSelector(
    (state) => ({
      data: state.tasks.data,
      waiting: state.tasks.waiting,
    }),
    shallowEqual
  );

  useEffect(() => {
    dispatch(tasksActions.load());
  }, []);

  const callbacks = {
    // Редактирвоание задачи
    editTask: useCallback((id) => {
      dispatch(modalsActions.open("modal", id));
    }, []),
    // Удаление задачи
    removeFromBasket: useCallback((_id) => {
      dispatch(tasksActions.deleteTask(_id));
    }, []),
    // Закрытие любой модалки
    closeModal: useCallback(() => {
      dispatch(modalsActions.close());
    }, []),
    // Открытие любой модалки
    openModal: useCallback(() => {
      dispatch(modalsActions.open("modal", ""));
    }, []),
  };

  return (
    <PageLayout>
      <Head title="Список задач">
        <Controls openModal={callbacks.openModal} />
      </Head>
      <Spinner active={select.waiting}>
        <List
          editTask={callbacks.editTask}
          list={select.data}
          onDelete={callbacks.removeFromBasket}
        />
      </Spinner>
    </PageLayout>
  );
}

export default memo(Main);
