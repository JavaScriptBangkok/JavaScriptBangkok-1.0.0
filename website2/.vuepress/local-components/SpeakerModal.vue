<template>
  <div class="speaker-modal">
    <div class="modal-content">
      <span
        class="close"
        @click="onCloseModal">
        &times;
      </span>
      <div class="image-wrapper">
        <img :src="image" alt="Speaker Image" />
      </div>
      <div class="talk-info">
        <h3>{{ name }}</h3>
        <p>{{ title }}</p>
        <p>{{ description }}</p>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SpeakerModal',
  props: {
    name: {
      type: String,
      default: ''
    },
    title: {
      type: String,
      default: ''
    },
    image: {
      type: String,
      default: 'https://picsum.photos/120/120'
    },
    description: {
      type: String,
      default: ''
    }
  },
  methods: {
    onCloseModal () {
      this.$emit('closeModal')
    }
  }
}
</script>

<style scoped>
.speaker-modal {
  /* display: none; */
  position: fixed; /* Stay in place */
  z-index: 1; /* Sit on top */
  left: 0;
  top: 0;
  width: 100%; /* Full width */
  height: 100%; /* Full height */
  overflow: auto; /* Enable scroll if needed */
  background-color: rgb(0,0,0);
  background-color: rgba(0,0,0,0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 960px;

  /* background: linear-gradient(90.38deg, #fae9ad 0.14%, #ffffff 50.01%); */
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);
  display: flex;
  align-items: center;
  padding: 30px;
  position: relative;
}

.image-wrapper > img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}

h3 {
  color: #eaba06;
}
p {
  color: #767676;
}

/* The Close Button */
.close {
  color: #aaa;
  font-size: 28px;
  font-weight: bold;
  position: absolute;
  top: 30px;
  right: 30px;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
