import { createStore } from 'vuex'
import EventService from '../services/EventService'

export default createStore({
  state: {
    user: 'Adam Jahr',
    events: [],
    event: {}
  },
  mutations: {
    ADD_EVENT(state, event) {
      state.events.push(event)
    },
    SET_EVENTS(state, events) {
      state.events = events
    },
    SET_EVENT(state, event) {
      state.event = event
    }
  },
  actions: {
    createEvent({ commit }, event) {
      return EventService.postEvent(event)  //必须return 不return 的话没有效果
      .then(() => {
        commit('ADD_EVENT', event)
      })
      .catch(error => {
        throw(error)
      })
    },
    fetchEvents({ commit }) {
      return EventService.getEvents()
        .then(response => {
          commit('SET_EVENTS', response.data)
        })
        .catch(error => {
          throw(error)
        })
    },
    fetchEvent({ commit, state }, id) {
      const existingEvent = state.events.find(event => event.id == id)
      if (existingEvent) {
        commit('SET_EVENT', existingEvent)
        console.log('existingEvent ' + typeof existingEvent.id)
        console.log('existingEvent ' + typeof id)
        console.log('event.id: ' + id)
      } else {
        return EventService.getEvent(id) //return result
          .then(response => {
            commit('SET_EVENT', response.data)
          })
          .catch(error => {
            throw(error) // throw error
          })
      }
    }
  },
  modules: {}
})