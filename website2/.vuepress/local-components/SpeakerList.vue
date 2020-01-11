<template>
  <div>
    <!-- <button @click="$emit('testModal')">test modal</button> -->
    <ul>
      <li
        v-for="(speaker, index) of speakers"
        :key="index"
        @click="$emit('clickSpeaker', speaker)">
        <div class="image-wrapper">
          <img :src="speaker.image || 'https://picsum.photos/120/120'" />
        </div>
        <div class="talk-info">
          <h3>{{ speaker.name }}</h3>
          <p>{{ speaker.title }}</p>
        </div>
        <img
          src="./subtract-frame.svg"
          alt="Subtract Frame"
          class="subtract-frame"
        />
        <!--<p>
          {{ speaker.description }}
        </p-->
      </li>
    </ul>
  </div>
</template>

<style scoped>
.image-wrapper > img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}
ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 16px;
}
li {
  background: linear-gradient(90.38deg, #fae9ad 0.14%, #ffffff 50.01%);
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 30px;
  position: relative;
}
.subtract-frame {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.talk-info {
  text-align: right;
  margin-left: auto;
}
h3 {
  color: #eaba06;
}
p {
  color: #767676;
}
</style>

<script>
export default {
  name: 'SpeakerList',
  props: {
    speakers: {
      type: Array,
      default: () => [],
    },
  },
}
</script>
