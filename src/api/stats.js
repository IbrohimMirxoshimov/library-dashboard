import mainCaller from "./main";

export const StatsAPI = {
  getStats: () => mainCaller("/stats", "GET"),
};
