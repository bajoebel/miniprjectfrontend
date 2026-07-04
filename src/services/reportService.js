import api from "./api";

export const getVisitReport = (start, end) => {
  return api.get("/report/visit", {
    params: {
      start,
      end,
    },
  });
};