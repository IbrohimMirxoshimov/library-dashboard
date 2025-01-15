import mainCaller, { mainUrl } from "./main";
import qs from "qs";
import { addNews, deleteResource } from "my-redux/actions/resource";
import store from "my-redux/store";
import { clearNullishKeysFromObject } from "utils/array";
import axios from "axios";
import { getTOKEN } from "my-redux/reducers/Auth";

export default class FetchResource {
	constructor(endpoint) {
		this.endpoint = endpoint;
	}
	getOne(id) {
		return mainCaller(`/${this.endpoint}/` + id, "GET");
	}

	getList(query) {
		return mainCaller(`/${this.endpoint}?` + qs.stringify(query), "GET");
	}

	update(id, data) {
		return mainCaller(
			`/${this.endpoint}/` + id,
			"PUT",
			clearNullishKeysFromObject(data)
		);
	}

	create(data) {
		return mainCaller(`/${this.endpoint}`, "POST", data);
	}

	destroy(id) {
		return mainCaller(`/${this.endpoint}/`, "DELETE");
	}

	static getOne(endpoint, id) {
		return mainCaller(`/${endpoint}/` + id, "GET");
	}

	static getList(endpoint, query) {
		return mainCaller(`/${endpoint}?` + qs.stringify(query), "GET");
	}

	static async getListAll(endpoint) {
		let allData = [];
		let size = 20;
		let total = 1;

		for (let i = 1; total > allData.length; i++) {
			let page = await this.getList(endpoint, { page: i, size: size });

			allData.push(...page.items);

			total = page.totalCount;
		}

		return allData;
	}

	static update(endpoint, id, data) {
		deleteResource(endpoint, id)
		return mainCaller(
			`/${endpoint}/` + id,
			"PUT",
			clearNullishKeysFromObject(data)
		).then((res) => {
			// agar object yangilangani qaytsa stateni yangilab qo'yish
			if (res.message !== "Updated") {
				store.dispatch(addNews(endpoint, [res]));
			}

			return res;
		});
	}

	static create(endpoint, data) {
		return mainCaller(`/${endpoint}`, "POST", data);
	}

	static destroy(endpoint, id) {
		return mainCaller(`/${endpoint}/` + id, "DELETE");
	}

	static download(endpoint) {
		return axios.post(`${mainUrl()}/api/${endpoint}/download`, null, {
			responseType: "blob",
			headers: {
				authorization: `Bearer ${getTOKEN()}`,
			},
		});
	}
}
