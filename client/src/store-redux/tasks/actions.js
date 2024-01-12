export default {
  /**
   * Загрузка товара
   * @param id
   * @return {Function}
   */
  load: () => {
    return async (dispatch, getState, services) => {
      // Сброс текущих задач и установка признака ожидания загрузки
      dispatch({ type: "tasks/load-start" });

      try {
        const res = await services.api.request({
          url: `tasks`,
        });
        // Задачи загружены успешно
        dispatch({
          type: "tasks/load-success",
          payload: { data: res.data },
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "tasks/load-error" });
      }
    };
  },

  // Создание задачи
  createTask: (data) => {
    return async (dispatch, getState, services) => {
      //  ожидания отправки
      dispatch({ type: "task/create-start" });
      try {
        const res = await services.api.request({
          url: `tasks`,
          method: "POST",
          body: JSON.stringify({
            data,
          }),
        });

        dispatch({
          type: "task/create-success",
          payload: res.data,
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "task/create-error" });
      }
    };
  },

  // Удаление задачи
  deleteTask: (_id) => {
    return async (dispatch, getState, services) => {
      //  ожидания отправки
      dispatch({ type: "task/delete-start" });

      try {
        dispatch({
          type: "task/delete-success",
          payload: _id,
        });
        await services.api.request({
          url: `tasks`,
          method: "DELETE",
          body: JSON.stringify({
            _id,
          }),
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "task/delete-error" });
      }
    };
  },

  // Редактирование задачи
  editTask: (data) => {
    return async (dispatch, getState, services) => {
      //  ожидания отправки
      dispatch({ type: "task/edit-start" });

      try {
        const res = await services.api.request({
          url: `tasks`,
          method: "PATCH",
          body: JSON.stringify({
            data,
            id: data._id,
          }),
        });
        console.log(res.data);
        dispatch({
          type: "task/edit-success",
          payload: res.data,
        });
      } catch (e) {
        //Ошибка загрузки
        dispatch({ type: "task/edit-error" });
      }
    };
  },
};
