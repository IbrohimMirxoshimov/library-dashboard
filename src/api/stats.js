import mainCaller from "./main";

export const StatsAPI = {
  getStats: () => mainCaller("/stats", "GET"),
  getSummary: () => mainCaller("/stats/summary", "GET"),
  getRange: (from, to) =>
    mainCaller(`/stats/range?from=${from}&to=${to}`, "GET"),
};
