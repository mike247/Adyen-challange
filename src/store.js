import Vue from 'vue';
import Vuex from 'vuex';
import orchestration from './api/index';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    latitude: 25,
    longtitude: 25,
    mapZoom: 1,
    near: '',
    googleMapKey: 0,
    query: '',
    venues: [],
    loading: false,
  },
  actions: {
    updateLatitude({ commit }, lat) {
      commit('setLatitude', lat);
    },
    updateLongtitude({ commit }, long) {
      commit('setLongtitude', long);
    },
    updateNear({ commit }, near) {
      commit('setNear', near);
    },
    updateQuery({ commit }, query) {
      commit('setQuery', query);
    },
    updateMapZoom({ commit }, zoom) {
      commit('setMapZoom', zoom);
    },
    updateLoading({ commit }, loading) {
      commit('setLoading', loading);
    },
    async getVenuesByGps({ commit, state }) {
      if (state.query) {
        try {
          commit('setLoading', true);
          const houseData = await orchestration.getByGps(state.query, `${state.latitude},${state.longtitude}`);
          commit('setVenueData', houseData.data.groups);
          commit('setLoading', false);
        } catch (e) {
          console.error(e); // Could show a toast here or something
        }
      }
    },
    async getVenuesByNear({ commit, state }) {
      if (state.query && state.near) {
        try {
          commit('setLoading', true);
          const houseData = await orchestration.getByNear(state.query, state.near);
          commit('setVenueData', houseData.data.groups);
          commit('setLongtitude', houseData.data.geocode.center.lng);
          commit('setLatitude', houseData.data.geocode.center.lat);
          commit('setLoading', false);
        } catch (e) {
          console.error(e);
        }
      }
    },
  },
  mutations: {
    setLatitude(state, lat) {
      state.latitude = lat;
    },
    setLongtitude(state, long) {
      state.longtitude = long;
    },
    setNear(state, near) {
      state.near = near;
    },
    setQuery(state, query) {
      state.query = query;
    },
    setVenueData(state, data) {
      state.venues = data;
    },
    setMapZoom(state, zoom) {
      state.mapZoom = zoom;
    },
    setLoading(state, loading) {
      state.loading = loading;
    },
  },
});
