<template>
  <div class="sponsors-wrapper">
    <div class="sponsors-group">
      <img src="./sponsors-svg/platinum/kbtg.svg" alt="KBTG" height="130" />
    </div>

    <div class="sponsors-group pt-50">
      <img src="./sponsors-svg/gold/oozou.svg" alt="OOZOU" height="45" />
      <img
        src="./sponsors-svg/gold/exxonmobil.svg"
        alt="ExxonMobil"
        height="53"
      />
      <img src="./sponsors-svg/gold/odds.svg" alt="OODS" height="45" />
    </div>

    <div class="sponsors-group pt-15">
      <img src="./sponsors-svg/silver/nextzy.svg" alt="Nextzy" height="42" />
      <img src="./sponsors-svg/silver/nextmo.svg" alt="NEXMO" height="45" />
      <img src="./sponsors-svg/silver/appman.svg" alt="APPMAN" height="73" />
    </div>

    <div class="sponsors-group pt-15">
      <img src="./sponsors-svg/silver/nexthop.svg" alt="next hop" height="40" />
      <img
        src="./sponsors-svg/silver/eventpop.svg"
        alt="Eventpop"
        height="30"
      />
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
  display: flex;
  justify-content: center;
  align-items: center;
}

.sponsors-group > img {
  padding-left: 10px;
  padding-right: 10px;
}

@media (min-width: 640px) {
  .sponsors-group > img {
    padding-left: 25px;
    padding-right: 25px;
  }
}

.pt-15 {
  padding-top: 15px;
}

.pt-50 {
  padding-top: 50px;
}
</style>
