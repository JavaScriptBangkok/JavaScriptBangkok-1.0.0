---
title: JavaScript Bangkok 1.0.0
homepage: true
---

<Intro />

<main>

## Speakers

<div v-if="!$flags.preview">
  <SpeakerGroup :groupName="'#TeamEngineering'">
    <OldSpeakerList
    slot="content"
    :speakers="getSpeakersByGroup('Engineering')"
    @clickSpeaker="openSpeakerModal"></OldSpeakerList>
  </SpeakerGroup>
  <SpeakerGroup :groupName="'#TeamExperience'">
    <OldSpeakerList
    slot="content"
    :speakers="getSpeakersByGroup('Experience')"
    @clickSpeaker="openSpeakerModal"></OldSpeakerList>
  </SpeakerGroup>
  <SpeakerGroup :groupName="'#TeamKnowhow'">
    <OldSpeakerList
    slot="content"
    :speakers="getSpeakersByGroup('Knowledge')"
    @clickSpeaker="openSpeakerModal"></OldSpeakerList>
  </SpeakerGroup>
  <SpeakerGroup :groupName="'#TeamPerformance'">
    <OldSpeakerList
    slot="content"
    :speakers="getSpeakersByGroup('Performance')"
    @clickSpeaker="openSpeakerModal"></OldSpeakerList>
  </SpeakerGroup>
  <SpeakerModal
  v-if="isSpeakerModalActive"
  v-bind="speakerModalData"
  @closeModal="setIsSpeakerModalActive(false)">
  </SpeakerModal>
</div>

<div v-if="$flags.preview">
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

<template v-if="$flags.preview">

## Schedule

TODO

</template>

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
import Footer from './.vuepress/local-components/Footer.vue'
import speakers from 'json-loader!yaml-loader!./.vuepress/data/speakers.yml'

export default {
  components: { 
    Intro,
    OldSpeakerList,
    SpeakerList,
    SpeakerModal,
    SponsorList,
    SpeakerGroup,
    Footer
  },
  data () {
    return {
      isSpeakerModalActive: false,
      speakerModalData: {
        name: '',
        title: '',
        image: '',
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
