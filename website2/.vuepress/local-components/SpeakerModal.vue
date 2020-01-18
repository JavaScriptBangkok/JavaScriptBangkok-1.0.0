<template>
  <div class="speaker-modal" @click.self="onCloseModal">
    <div class="modal-content">
      <div class="modal-gradient">
        <div class="modal-svg">
          <svg
            width="626"
            height="231"
            viewBox="0 0 626 231"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M432.137 -172.49H399.452V-205.454L313.162 -292.479L226.871 -205.454V-172.49H194.197L107.907 -85.4767L194.197 1.54852H226.871V34.5121L313.162 121.537L399.452 34.5121V1.54852H432.137L518.416 -85.4767L432.137 -172.49Z"
              fill="#CE716F"
              fill-opacity="0.1"
            />
            <path
              d="M555.661 159.614H523.521L517.429 153.483L511.35 159.614H479.198V127.201L485.29 121.058L479.198 114.926V82.5006H511.35L517.429 88.644L523.521 82.5006H555.661V114.926L549.581 121.058L555.661 127.201V159.614Z"
              fill="#CE716F"
              fill-opacity="0.1"
            />
            <path
              d="M146.079 159.614H113.939L107.848 153.483L101.768 159.614H69.6165V127.201L75.708 121.058L69.6165 114.926V82.5006H101.768L107.848 88.644L113.939 82.5006H146.079V114.926L140 121.058L146.079 127.201V159.614Z"
              fill="#CE716F"
              fill-opacity="0.1"
            />
            <path
              d="M312.86 230.047L176.631 92.6576V51.9124H136.229L0 -85.4767L136.229 -222.866H176.631V-263.611L312.86 -401L449.089 -263.611V-222.866H489.491L625.72 -85.4767L489.491 51.9124H449.089V92.6576L312.86 230.047ZM199.836 82.9686L312.86 196.954L425.884 82.9686V28.5091H479.883L592.907 -85.4767L479.883 -199.462H425.884V-253.922L312.86 -367.908L199.836 -253.922V-199.462H145.837L32.8129 -85.4767L145.837 28.5091H199.836V82.9686Z"
              fill="#CE716F"
              fill-opacity="0.1"
            />
          </svg>
        </div>
      </div>
      <span class="close" @click="onCloseModal">&times;</span>
      <div class="image-wrapper">
        <img :src="image" alt="Speaker Image" />
      </div>
      <div class="talk-info">
        <div class="speaker-name text-center fs-24 fw-800">{{ name }}</div>
        <div class="speaker-position text-center fs-24 fw-800">{{ position }}</div>
        <div class="speaker-title text-center fs-36 fw-800">{{ title }}</div>
        <div class="speaker-paragraph-content">{{ description }}</div>

        <template v-if="about">
          <div class="speaker-paragraph-title fs-36 fw-800">About The Speaker</div>
          <div class="speaker-paragraph-content" v-html="about"></div>
        </template>

        <div class="speaker-paragraph-title fs-36 fw-800">Contact</div>
        <div class="speaker-paragraph-content" v-if="url">
          <div v-if="url">
            Website:
            <a :href="url" target="_blank">{{ url }}</a>
          </div>
          <div v-if="email">Email: {{ email }}</div>
        </div>
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
    url: {
      type: String,
      default: '',
    },
    email: {
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
  background: linear-gradient(179.94deg, #fae9ad 0.06%, #ffffff 100%);
  z-index: -1;
}

.modal-svg {
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
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
