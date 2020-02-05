<template>
  <section class="schedule">
    <ul v-for="(items, index) of chunks" :key="index">
      <li v-for="(item, index) of items" :key="index">
        <div class="time">{{ item.time }}</div>
        <template v-if="item.type === 'session'">
          <Session :speaker="speakers[item.speakerName]" />
        </template>
        <template v-else>
          <BreakTime
            :title="item.title"
            :primary="item.type === 'sponsor'"
            :secondary="item.type === 'break'"
          />
        </template>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.schedule {
  display: flex;
  flex-direction: column;
}

ul {
  flex: 1;
  padding: 0;
}

li {
  display: block;
}

li:not(:last-child) {
  margin-bottom: 20px;
}

li:focus {
  outline: none;
}

.time {
  flex: none;
  width: 138px;
  font-weight: 800;
  font-size: 18px;
  color: #164194;
  margin-bottom: 12px;
}

@media (min-width: 640px) {
  li {
    display: flex;
    align-items: center;
  }

  .time {
    margin-bottom: none;
  }
}

@media (min-width: 1100px) {
  .schedule {
    flex-direction: row;
  }

  ul:not(:first-child) {
    margin-left: 80px;
  }
}
</style>

<script>
import Session from './Session.vue'
import BreakTime from './BreakTime.vue'

export default {
  components: {
    Session,
    BreakTime,
  },
  name: 'Schedule',
  props: {
    speakers: {
      type: Object,
      default: () => [],
    },
    schedule: {
      type: Array,
      default: () => [],
    },
  },
  computed: {
    chunks() {
      const halfIndex = this.schedule.length / 2
      const firstChunk = this.schedule.slice(0, halfIndex)
      const secondChunk = this.schedule.slice(halfIndex)

      return [firstChunk, secondChunk]
    },
  },
}
</script>
