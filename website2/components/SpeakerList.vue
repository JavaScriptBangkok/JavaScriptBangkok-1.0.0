<template>
  <div>
    <ul>
      <li v-for="(speaker, index) of speakers" :key="index">
        <div class="image-wrapper">
          <img src="https://picsum.photos/120/120">
        </div>
        <div class="talk-info">
          <h3>{{ speaker.name }}</h3>
          <p>{{ speaker.title }}</p>
        </div>
        <!--p>
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
    background: linear-gradient(90.38deg, #FAE9AD 0.14%, #FFFFFF 50.01%);
    border-radius: 10px;
    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
    display: flex;
    align-items: center;
    padding: 15px;
  }
  .talk-info {
    text-align: right;
    margin-left: auto;
  }
  h3 {
    color: #EABA06;
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
      default: () => []
    }
  }
}
</script>