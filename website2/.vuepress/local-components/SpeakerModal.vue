<template>
  <div class="speaker-modal" @click.self="onCloseModal">
    <div class="modal-content">
      <div class="modal-gradient"></div>
      <span class="close" @click="onCloseModal">&times;</span>
      <div class="image-wrapper">
        <img :src="image" alt="Speaker Image" />
      </div>
      <div class="talk-info">
        <div class="speaker-name text-center fs-20 fs-sm-24 fw-800">{{ name }}</div>
        <div class="speaker-position text-center fs-20 fs-sm-24 fw-800">
          {{ position }}
        </div>
        <div class="speaker-title text-center fs-24 fs-sm-36 fw-800">{{ title }}</div>

        <div class="speaker-paragraph-content">{{ description }}</div>

        <template v-if="about">
          <div class="speaker-paragraph-title fs-24 fs-sm-36 fw-800">
            About The Speaker
          </div>
          <div class="speaker-paragraph-content" v-html="about"></div>
        </template>
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
      default: '',
    },
    position: {
      type: String,
      default: '',
    },
    title: {
      type: String,
      default: '',
    },
    image: {
      type: String,
      default: '',
    },
    about: {
      type: String,
      default: '',
    },
    description: {
      type: String,
      default: '',
    },
  },
  methods: {
    onCloseModal() {
      this.$emit('closeModal')
    },
  },
}
</script>

<style scoped>
.speaker-modal {
  position: fixed;
  z-index: 1;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  overflow: auto;
  background-color: rgba(0, 0, 0, 0.4);
}

.modal-content {
  background-color: #fefefe;
  margin: 24px auto;
  padding: 20px;
  border: 1px solid #888;
  width: 80%;
  max-width: 960px;

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
  background: linear-gradient(179.94deg, #fae9ad 0.06%, #ffffff 100%);
  z-index: -1;
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
  color: #ce716f;
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

.fs-20 {
  font-size: 20px;
}

.fs-24 {
  font-size: 24px;
}

@media (min-width: 640px) {
  .fs-sm-24 {
    font-size: 24px;
  }

  .fs-sm-36 {
    font-size: 36px;
  }
}

.fw-800 {
  font-weight: 800;
}

.text-center {
  text-align: center;
}
</style>
