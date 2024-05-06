export const swap = (page) => {
    return {
      type: "SWAP",
      payload: {
        item: page,
      },
    };
  }
  