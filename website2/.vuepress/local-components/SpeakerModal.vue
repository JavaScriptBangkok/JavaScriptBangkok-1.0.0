<template>
  <div
    class="speaker-modal"
    @click.self="onCloseModal">
    <div class="modal-content">
      <div class="modal-gradient"></div>
      <span class="close" @click="onCloseModal">&times;</span>
      <div class="image-wrapper">
        <img :src="image" alt="Speaker Image">
      </div>
      <div class="talk-info">
        <div class="speaker-name text-center fs-24 fw-800">{{ name }}</div>
        <div class="speaker-position text-center fs-24 fw-800">{{ position }}</div>
        <div class="speaker-title text-center fs-36 fw-800">{{ title }}</div>
        <template v-if="about">
          <div class="speaker-paragraph-title fs-36 fw-800">
            About The Speaker
          </div>
          <div class="speaker-paragraph-content">{{ about }}</div>
        </template>
        <div class="speaker-paragraph-title fs-36 fw-800">
          Talk Abstract
        </div>
        <div class="speaker-paragraph-content">{{ description }}</div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "SpeakerModal",
  props: {
    name: {
      type: String,
      default: ""
    },
    position: {
      type: String,
      default: ""
    },
    title: {
      type: String,
      default: ""
    },
    image: {
      type: String,
      default: ""
    },
    about: {
      type: String,
      default: "",
    },
    description: {
      type: String,
      default: ""
    }
  },
  methods: {
    onCloseModal() {
      this.$emit("closeModal");
    }
  }
};
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
  background-color: rgb(0, 0, 0);
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 24px auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 960px;

  /* background: linear-gradient(90.38deg, #fae9ad 0.14%, #ffffff 50.01%); */
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.1);

  padding: 24px 24px;
  position: relative;
  box-sizing: border-box;
  z-index: -2;
}
@media (min-width: 720px) {
  .modal-content {
    padding: 60px 100px;
  }
}

.modal-gradient {
  position: absolute;
  width: 100%;
  height: 250px;
  top: 0;
  left: 0;
  border-radius: 10px;
  background: linear-gradient(179.94deg, #FAE9AD 0.06%, #FFFFFF 100%);
  z-index: -1
}

.image-wrapper {
  text-align: center;
}

.image-wrapper > img {
  border-radius: 50%;
  height: 120px;
  width: 120px;
}

.speaker-name {
  padding-top: 30px;
  color: #eaba06;
}

.speaker-position {
  padding-top: 10px;
  color: #164194;
}

.speaker-title {
  padding-top: 60px;
}

.speaker-paragraph-title {
  padding-top: 40px;
  color: #CE716F;
}

.speaker-paragraph-content {
  padding-top: 20px;
}

h4 {
  color: #164194;
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
  transition: color ease-out 0.3s;
}

.close:hover,
.close:focus {
  color: black;
  text-decoration: none;
  cursor: pointer;
}

.fs-24 {
  font-size: 24px;
}

.fs-36 {
  font-size: 36px;
}

.fw-800 {
  font-weight: 800;
}

.text-center {
  text-align: center;
}
</style>
