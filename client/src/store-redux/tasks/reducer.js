// Начальное состояние
export const initialState = {
  data: [],
  waiting: false, // признак ожидания загрузки
};

// Обработчик действий
function reducer(state = initialState, action) {
  switch (action.type) {
    case "tasks/load-start":
      return { ...state, data: [], waiting: true };

    case "tasks/load-success":
      return { ...state, data: action.payload.data, waiting: false };

    case "tasks/load-error":
      return { ...state, data: [], waiting: false };
    case "task/create-start":
      return { ...state, waiting: true };

    case "task/create-success":
      return {
        ...state,
        data: [...state.data, action.payload],
        waiting: false,
      };

    case "task/create-error":
      return { ...state, waiting: false };

    case "task/delete-start":
      return { ...state, waiting: true };

    case "task/delete-success":
      return {
        ...state,
        data: state.data.filter((el) => el._id !== action.payload),
        waiting: false,
      };
    case "task/delete-error":
      return { ...state, waiting: false };

    case "task/edit-start":
      return { ...state, waiting: true };

    case "task/edit-success":
      return {
        ...state,
        data: state.data.map((el) => {
          if (el._id === action.payload._id) {
            return (el = action.payload);
          }
          return el;
        }),
        waiting: false,
      };
    case "task/edit-error":
      return { ...state, waiting: false };
    default:
      // Нет изменений
      return state;
  }
}

export default reducer;
