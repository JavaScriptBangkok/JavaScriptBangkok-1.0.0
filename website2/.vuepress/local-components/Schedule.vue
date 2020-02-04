<template>
  <section class="schedule">
    <ul v-for="(items, index) of chunks" :key="index">
      <li v-for="(item, index) of items" :key="index">
        <div class="time">{{ item.time }}</div>
        <template v-if="item.type === 'session'">
          <Session :image="item.image" :title="item.title" :speaker="item.speaker" />
        </template>
        <template v-else>
          <BreakTime :title="item.title" :primary="item.primary" />
        </template>
      </li>
    </ul>
  </section>
</template>

<style scoped>
.schedule {
  display: flex;
}

ul {
  flex: 1;
  padding: 0;
}

ul:not(:first-child) {
  margin-left: 80px;
}

li {
  display: flex;
  align-items: center;
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
    items: {
      type: Array,
      default: () => [
        {
          type: 'session',
          time: '8:30 - 9:00',
          title: '📝Registration',
        },
        {
          type: 'session',
          time: '9:00 - 9:10',
          title: 'Opening remarks',
        },
        {
          type: 'session',
          time: '9:10 - 9:35',
          title: 'A journey of building large-scale reusable web components',
          speaker: {
            name: 'Varayut Lerdkanlayanawat',
            from: '🇩🇪Germany',
          },
        },
        {
          type: 'session',
          time: '9:40 - 10:05',
          title: 'Optimization design patterns - from games to web',
          speaker: {
            name: 'Yonatan Kra',
            from: '🇮🇱Israel',
          },
        },
        {
          type: 'session',
          time: '10:10 - 10:35',
          title: 'The Art of Crafting Codemods',
          speaker: {
            name: 'Rajasegar Chandran',
            from: '🇮🇳India',
          },
        },
        {
          time: '10:40 - 10:50',
          title: '👑Our lovely sponsor: KBTG',
        },
        {
          type: 'session',
          time: '10:55 - 11:20',
          title: 'How I met my superset of Javascript',
          speaker: {
            name: 'Sirirat Rungpetcharat',
            from: '🇹🇭Thailand',
          },
        },
        {
          type: 'session',
          time: '11:25 - 11:50',
          title: 'What happens when you cancel an HTTP request?',
          speaker: {
            name: 'Younes Jaaidi',
            from: '🇫🇷France',
          },
        },
        {
          type: 'session',
          time: '11:55 - 12:20',
          title:
            'Talking about “Scale”: Takeaways from our attempt on scaling a small system in the Gojek Universe',
          speaker: {
            name: 'Tino Thamjarat',
            from: '🇹🇭Thailand',
          },
        },
        {
          time: '12:25 - 13:25',
          title: 'Lunch Break',
          primary: false,
        },
        {
          type: 'session',
          time: '13:25 - 13:50',
          title: 'Adventures with the Event Loop',
          speaker: {
            name: 'Erin Zimmer',
            from: '🇦🇺Australia',
          },
        },
        {
          type: 'session',
          time: '13:55 - 14:20',
          title: 'End-to-end Type-Safe GraphQL Apps',
          speaker: {
            name: 'Carlos Rufo',
            from: '🇪🇸Spain',
          },
        },
        {
          time: '14:25 - 14:30',
          title: '👑Our lovely sponsor: Oozou',
        },
        {
          type: 'session',
          time: '14:35 - 15:00',
          title:
            'Applying SOLID principle in JavaScript without Class and Object',
          speaker: {
            name: 'Chakrit Likitkhajorn',
            from: '🇹🇭Thailand',
          },
        },
        {
          type: 'session',
          time: '15:05 - 15:30',
          title: 'DevTools, the CSS advocate in your browser',
          speaker: {
            name: 'Chen Hui Jing',
            from: '🇸🇬Singapore',
          },
        },
        {
          time: '15:35 - 15:40',
          title: '👑Our lovely sponsor: ODDS',
        },
        {
          type: 'session',
          time: '15:45 - 16:10',
          title:
            "Poor Man's Patcher: A game modder's adventure through serverless sea without money",
          speaker: {
            name: 'Atthaporn Thanongkiatisak',
            from: '🇹🇭Thailand',
          },
        },
        {
          type: 'session',
          time: '16:15 - 16:40',
          title: 'Building your first malicious chrome extension 😈',
          speaker: {
            name: 'Alon Kiriati',
            from: '🇮🇱Israel',
          },
        },
        {
          time: '16:45 - 16:50',
          title: '👑Our lovely sponsor: ExxonMobil',
        },
        {
          type: 'session',
          time: '16:55 - 17:20',
          title: 'Just go for it: The story of dance-mat.js',
          speaker: {
            name: 'Ramón Huidobro',
            from: '🇦🇹Austria',
          },
        },
        {
          type: 'session',
          time: '17:25 - 17:50',
          title:
            '[TBD] Speed up heavy data visualization with Rust and WebAssembly',
          speaker: {
            name: 'Rujira Aksornsin',
            from: '🇹🇭Thailand',
          },
        },
        {
          type: 'session',
          time: '17:55 - 18:20',
          title: 'A love story written in JavaScript',
          speaker: {
            name: 'Ramón Guijarro',
            from: '🇪🇸Spain',
          },
        },
        {
          type: 'session',
          time: '18:25 - 18:35',
          title: 'Closing remarks',
        },
        {
          time: '18:35 - 23:00',
          title: '🎉Networking party',
          primary: false,
        },
      ],
    },
  },
  computed: {
    chunks() {
      const halfIndex = this.items.length / 2
      const firstChunk = this.items.slice(0, halfIndex)
      const secondChunk = this.items.slice(halfIndex)

      return [firstChunk, secondChunk]
    },
  },
}
</script>
