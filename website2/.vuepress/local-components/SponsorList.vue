<template>
  <div class="sponsors-wrapper">
    <div class="sponsors-background sponsors-background--top"></div>
    <div class="sponsors-background sponsors-background--bottom"></div>

    <div class="sponsors-group">
      <img src="./sponsors-svg/platinum/kbtg.svg" alt="KBTG" height="130" />
    </div>

    <div class="sponsors-group sponsors-tier2">
      <img src="./sponsors-svg/gold/oozou.svg" alt="OOZOU" height="45" />
      <img src="./sponsors-svg/gold/exxonmobil.svg" alt="ExxonMobil" height="53" />
      <img src="./sponsors-svg/gold/odds.svg" alt="OODS" height="45" />
    </div>

    <div class="sponsors-group sponsors-tier3 pt-15">
      <img src="./sponsors-svg/silver/nextzy.svg" alt="Nextzy" height="42" />
      <img src="./sponsors-svg/silver/nextmo.svg" alt="NEXMO" height="45" />
      <img src="./sponsors-svg/silver/appman.svg" alt="APPMAN" height="73" />
    </div>

    <div class="sponsors-group sponsors-tier3 pt-15">
      <img src="./sponsors-svg/silver/nexthop.svg" alt="next hop" height="40" />
      <img src="./sponsors-svg/silver/eventpop.svg" alt="Eventpop" height="30" />
      <img src="./sponsors-svg/silver/hotnow.svg" alt="HOTNOW" height="38" />
    </div>
  </div>
</template>

<script>
export default {
  name: 'SponsorList',
}
</script>

<style scoped>
.sponsors-group {
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
}

.sponsors-group > img {
  padding-left: 10px;
  padding-right: 10px;
}

.sponsors-wrapper {
  background-color: white;
  width: 100vw;
  position: relative;
  left: 50%;
  right: 50%;
  margin-left: -50vw;
  margin-right: -50vw;
  padding: 7rem 0;
  overflow-x: hidden;
  pointer-events: none;
}

.sponsors-background {
  position: absolute;
  height: 150px;
  width: 100%;
  background-image: url('/speaker-section-background.svg');
  background-repeat: repeat-x;
}

.sponsors-background--top {
  top: 0;
}

.sponsors-background--bottom {
  bottom: 0;
  transform: rotateX(180deg) rotateY(180deg);
}

@media (max-width: 639px) {
  .sponsors-tier2 {
    flex-direction: column;
    padding-top: 15px;
    padding-bottom: 15px;
  }
  .sponsors-tier2 > img {
    padding-top: 30px;
    max-height: 32px;
  }
  .sponsors-tier2 > img:nth-child(2) {
    max-height: 38px;
  }
  .sponsors-tier3 > img {
    max-width: 100%;
    height: auto;
  }
}

@media (min-width: 640px) {
  .sponsors-tier2 {
    padding-top: 50px;
  }
  .sponsors-group > img {
    padding-left: 25px;
    padding-right: 25px;
  }
}

.pt-15 {
  padding-top: 15px;
}
</style>
