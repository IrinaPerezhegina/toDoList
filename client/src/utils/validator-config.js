export const validatorConfig = {
  title: {
    isRequired: {
      message: "Наименование задачи обязательно для заполнения",
    },
  },

  description: {
    isRequired: {
      message: "Описание задачи обязательно для заполнения",
    },
  },
  status: {
    isRequired: {
      message: "Обязательно выберите статус задачи",
    },
  },
};
