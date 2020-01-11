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
      <h3>{{ name }}</h3>
      <p>{{ title }}</p>
      <p>{{ description }}</p>
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
  background-color: rgb(0,0,0); /* Fallback color */
  background-color: rgba(0,0,0,0.4); /* Black w/ opacity */
}

/* Modal Content/Box */
.modal-content {
  background-color: #fefefe;
  margin: 15% auto; /* 15% from the top and centered */
  padding: 20px;
  border: 1px solid #888;
  width: 80%; /* Could be more or less, depending on screen size */
}

/* The Close Button */
.close {
  color: #aaa;
  float: right;
  font-size: 28px;
  font-weight: bold;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}
</style>
