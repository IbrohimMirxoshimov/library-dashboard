import qs from "qs";
import mainCaller from "./main";

// kutubxona kartasiga tushgan hissalar; faqat owner
export const DonationsAPI = {
  getLocations: () => mainCaller("/donations/locations", "GET"),
  getStats: (params) =>
    mainCaller(`/donations/stats?${qs.stringify(params)}`, "GET"),
  getList: (params) =>
    mainCaller(`/donations?${qs.stringify(params, { skipNulls: true })}`, "GET"),
};
