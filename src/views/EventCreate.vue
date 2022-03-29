<template>
<h1>Create an event</h1>

<div class="form-container">

  <form @submit.prevent="onSubmit">
    <label>Select a category: </label>
    <select v-model="eventNow.category">
      <option
        v-for="option in categories"
        :value="option"
        :key="option"
        :selected="option === eventNow.category"
      >{{ option }}</option>
    </select>

    <h3>Name & describe your event</h3>

    <label>Title</label>
    <input
      v-model="eventNow.title"
      type="text"
      placeholder="Title"
    >

    <label>Description</label>
    <input
      v-model="eventNow.description"
      type="text"
      placeholder="Description"
    />

    <h3>Where is your event?</h3>

    <label>Location</label>
    <input
      v-model="eventNow.location"
      type="text"
      placeholder="Location"
    />

    <h3>When is your event?</h3>
    <label>Date</label>
    <input
      v-model="eventNow.date"
      type="text"
      placeholder="Date"
    />

    <label>Time</label>
    <input
      v-model="eventNow.time"
      type="text"
      placeholder="Time"
    />

    <button type="submit">Submit</button>
  </form>
  <div>{{ event.currentEvent }}</div>
  <p>events</p>
  <div>{{ event.events }}</div>
</div>
</template>

<script>
import { v4 as uuidv4 } from 'uuid'
import { mapState, mapActions} from 'vuex' // ADD

export default {
  data () {
    return {
      categories: [
        'sustainability',
        'nature',
        'animal welfare',
        'housing',
        'education',
        'food',
        'community'
      ],
      eventNow: {
        id: '',
        category: '',
        title: '',
        description: '',
        location: '',
        date: '',
        time: '',
        organizer: ''
      }
    }
  },
  methods: {
    ...mapActions('event', ['createEvent']),

    onSubmit() {
      const eventNow = {
        ...this.eventNow,
        id: uuidv4(),
        organizer: this.user.userInfo.name
      }
      this.createEvent(eventNow)
        .then(() => {
          this.$router.push({
            name: 'EventDetails',
            params: { id: eventNow.id}
          })
        })
        .catch(error => {
          this.$router.push({
            name: 'ErrorDisplay',
            params: { error: error}
          })
        })
    }
  },
  computed: {
    ...mapState(['user', 'event']) 
  }
}
</script>