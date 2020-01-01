import Vue from 'vue'
import Vuex from 'vuex'
import Axios from 'axios'
const ajaxUrl = 'https://calendar.whorizon.ru/wp-admin/admin-ajax.php';
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    events: [],
    successSend: null
  },
  getters: {
  	getEvents: state => state.events,
  	getSuccessSend: state => state.successSend,
  },
  mutations: {
    setEvents: (state, payload) => state.events = payload,
    setSuccessSend: (state, payload) => state.successSend = payload,
  },
  actions: {
    getEvents: context => {
      return Axios.get(ajaxUrl, {
        params: {
          action: 'get_events'
        }
      })
      .then(response => context.commit('setEvents', response.data))
    },
    sendForm: ( context, payload) => {
      return Axios.get(ajaxUrl, {
        params: {
          action: 'send_form',
          message: payload
        }
      })
      .then(response => {
        context.commit('setSuccessSend', response.data);
      })
      .catch(error=>{
        context.commit('setSuccessSend', false);
      })
    }
  }
})
