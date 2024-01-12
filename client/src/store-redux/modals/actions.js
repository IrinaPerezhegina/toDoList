export default {
  /**
   * Открытие модалки по названию
   * @param name
   */
  open: (name, id) => {
    console.log(name, id);
    return { type: "modal/open", payload: { name, id } };
  },

  /**
   * Закрытие модалки
   * @param name
   */
  close: () => {
    return { type: "modal/close" };
  },
};
