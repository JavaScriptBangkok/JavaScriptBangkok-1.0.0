---
title: JavaScript Bangkok 1.0.0
homepage: true
---

<Intro />

<main>

## Speakers

<div>
  <SpeakerGroup :groupName="'#TeamEngineering'">
    <SpeakerList
    slot="content"
    :speakers="getSpeakersByGroup('Engineering')"
    @clickSpeaker="openSpeakerModal"></SpeakerList>
  </SpeakerGroup>
  <SpeakerGroup :groupName="'#TeamExperience'">
    <SpeakerList
    slot="content"
    :speakers="getSpeakersByGroup('Experience')"
    @clickSpeaker="openSpeakerModal"></SpeakerList>
  </SpeakerGroup>
  <SpeakerGroup :groupName="'#TeamKnowhow'">
    <SpeakerList
    slot="content"
    :speakers="getSpeakersByGroup('Knowledge')"
    @clickSpeaker="openSpeakerModal"></SpeakerList>
  </SpeakerGroup>
  <SpeakerGroup :groupName="'#TeamPerformance'">
    <SpeakerList
    slot="content"
    :speakers="getSpeakersByGroup('Performance')"
    @clickSpeaker="openSpeakerModal"></SpeakerList>
  </SpeakerGroup>
  <SpeakerModal
  v-if="isSpeakerModalActive"
  v-bind="speakerModalData"
  @closeModal="setIsSpeakerModalActive(false)">
  </SpeakerModal>
</div>

## Schedule

<div>
  <Schedule :speakers="speakers" :schedule="schedule" />
</div>

## Sponsors

<SponsorList />

</main>

<Footer></Footer>

<script>
import Intro from './.vuepress/local-components/Intro.vue'
import OldSpeakerList from './.vuepress/local-components/OldSpeakerList.vue'
import SpeakerList from './.vuepress/local-components/SpeakerList.vue'
import SpeakerModal from './.vuepress/local-components/SpeakerModal.vue'
import SponsorList from './.vuepress/local-components/SponsorList.vue'
import SpeakerGroup from './.vuepress/local-components/SpeakerGroup.vue'
import Schedule from './.vuepress/local-components/Schedule.vue'
import Footer from './.vuepress/local-components/Footer.vue'
import speakers from 'json-loader!yaml-loader!./.vuepress/data/speakers.yml'
import schedule from 'json-loader!yaml-loader!./.vuepress/data/schedule.yml'

export default {
  components: {
    Intro,
    OldSpeakerList,
    SpeakerList,
    SpeakerModal,
    SponsorList,
    SpeakerGroup,
    Schedule,
    Footer,
  },
  data () {
    return {
      speakers: speakers.reduce(
        (acc, speaker) => ({ ...acc, [speaker.name]: speaker }),
        {},
      ),
      schedule,
      isSpeakerModalActive: false,
      speakerModalData: {
        name: '',
        title: '',
        image: '',
        url: '',
        email: '',
        description: '',
        about: '',
      }
    }
  },
  methods: {
    setIsSpeakerModalActive (value) {
      this.isSpeakerModalActive = value
    },
    openSpeakerModal (speaker) {
      this.speakerModalData = speaker
      this.setIsSpeakerModalActive(true)
    },
    getSpeakersByGroup (groupName) {
      return speakers.filter(speaker => speaker.group === groupName)
    }
  }
}
</script>

<style scoped>
h2 {
  text-align: center;
  font-size: 36px;
}
@media (min-width: 640px) {
  h2 {
    font-size: 64px;
  }
}
.header-anchor {
  display: none;
}
main {
  display: block;
  padding: 16px;
  max-width: 1100px;
  margin: 0 auto;
}
</style>
