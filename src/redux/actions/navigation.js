export const trocar = (page) => {
    return {
      type: "TROCAR",
      payload: {
        item: page,
      },
    };
  }
  