<template>
  <ul>
    <li
      v-for="(speaker, index) of speakers"
      tabindex="0"
      :key="index"
      @click="$emit('clickSpeaker', speaker)"
      @keypress="$event.keyCode === 1
      3 && $emit('clickSpeaker', speaker)"
    >
      <div class="image-wrapper">
        <img :src="speaker.image || 'https://picsum.photos/120/120'">
      </div>
      <div class="talk-info">
        <h3>{{ speaker.name }}</h3>
        <p>{{ speaker.title }}</p>
      </div>
    </li>
  </ul>
</template>

<style scoped>
.image-wrapper > img {
  border-radius: 50%;
  height: 96px;
  width: 96px;
}
ul {
  list-style: none;
  padding: 0;
  display: grid;
  grid-template-columns: 1fr;
  grid-gap: 16px;
}
@media (min-width: 640px) {
  ul {
    grid-template-columns: 1fr 1fr;
  }
}
@media (min-width: 1024px) {
  ul {
    grid-template-columns: 1fr 1fr 1fr 1fr;
  }
}
@media (min-width: 1100px) {
  .image-wrapper > img {
    height: 120px;
    width: 120px;
  }
}
li {
  background: #fff;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 30px;
  position: relative;
  cursor: pointer;
  transition: opacity ease-out 0.3s;
}

li:hover {
  opacity: 0.7;
}
.subtract-frame {
  position: absolute;
  bottom: 0;
  left: 50%;
  transform: translateX(-50%);
}
.talk-info {
  text-align: center;
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
  name: "SpeakerList",
  props: {
    speakers: {
      type: Array,
      default: () => []
    }
  }
};
</script>
