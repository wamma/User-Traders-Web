import Vue from 'vue';
import Vuex from 'vuex';
import users from './user/users';
import auth from './user/auth';

Vue.use(Vuex);

export default new Vuex.Store({
	state: {},
	mutations: {},
	actions: {},
	modules: { users, auth },
});
