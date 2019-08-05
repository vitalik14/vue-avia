import Vue from "vue";
import Vuex from "vuex";
import axios from "axios";

/* eslint-disable */
const app_id = "c6744783c6";
let apiServer = axios.create({
	baseURL: "http://crm.etm-system.com/api/"
});

Vue.use(Vuex);

export default new Vuex.Store({
	state: {
		auth: false,
		airList: null,
		status: false,
		errorInfo: "",
		apiTimeout: 2000,
		load: false,
		apiLoad: false,
		_interval: null
	},

	mutations: {
		setAuth(state, status) {
			state.auth = status;
		},

		load(state, status) {
			state.load = status;
		},

		setInfo(state, message) {
			state.errorInfo = message;
		},

		interval(state, link) {
			state._interval = link;
		},

		apiLoad(state, status) {
			state.apiload = status;
		},

		setAirList(state, items) {
			state.airList = items;
		},

		clearResults(state) {
			state.airList = [];
		}
	},

	actions: {
		async authorization({ commit }) {

			return await apiServer.get(`login/${app_id}`)
				.then(({ data }) => {
					commit("setAuth", data.hasOwnProperty("etm_auth_key"));
				})
				.catch(error => {
					commit("setInfo", "Ошибка соединения " + error);
					console.log(error);
				})
		},

		search({ commit, dispatch }, data) {
			const request = { // default search
				"directions": [
					data.params
				],
				"adult_qnt": 1,
				"child_qnt": 0,
				"infant_qnt": 0,
				"travel_policy_id": 0,
				"one_order_id": 0,
				"class": data.class,
				"direct": true,
				"flexible": false,
				"max_price": 99999,
				"fare_types": [
					"PUB",
					"NEG",
					"ETLH",
					"ETKL",
					"PSET"
				]
			};

			apiServer.post(`air/search`, request).then(({ data: { request_id } }) => {
				dispatch("offers", request_id);
			})
				.catch(error => {
					commit("setInfo", "Ошибка соединения " + error);
				})
		},

		offers({ state, commit, dispatch }, request_id) {
			if (!state.load) {
				commit("load", true);
				commit("interval", setInterval(dispatch, state.apiTimeout, "checkOffers", request_id));
			}
		},

		checkOffers({ state, commit }, request_id) {
			if (!state.apiLoad) {
				commit("apiLoad", true);

				apiServer.get(`air/offers?request_id=${ request_id }`)
					.then(({ data }) => {

						if (data.status === "Ready") {
							clearInterval(state._interval);
							commit("setAirList", data.offers);
							commit("load", false);
							console.log(data);
						}

					}).catch(error => {
						clearInterval(state._interval);
						commit("load", false);
						commit("setInfo", "Ошибка соединения " + error);

					}).finally(() => {
						commit("apiLoad", false);
					});
			}
		}
	},

	getters: {
		AUTH: state => state.auth,

		AIR_LIST: state => state.airList,

		LOADER: state => state.load,

		INFO: state => state.errorInfo
	}
});
