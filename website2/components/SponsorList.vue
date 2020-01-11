<template>
  <div class="sponsors-wrapper">
    <div class="sponsors-group">
      <img src="./sponsors-svg/platinum/kbtg.svg" alt="KBTG Logo" height="130">
    </div>

    <div class="sponsors-group pt-50">
      <img src="./sponsors-svg/gold/oozou.svg" alt="OOZOU Logo" height="45">
      <img src="./sponsors-svg/gold/exxonmobil.svg" alt="ExxonMobil Logo" height="53">
      <img src="./sponsors-svg/gold/odds.svg" alt="OODS Logo" height="45">
    </div>

    <div class="sponsors-group pt-15">
      <img src="./sponsors-svg/silver/nextzy.svg" alt="NEXTZY Logo" height="42">
      <img src="./sponsors-svg/silver/nextmo.svg" alt="nextmo Logo" height="45">
      <img src="./sponsors-svg/silver/appman.svg" alt="APPMAN Logo" height="73">
    </div>

    <div class="sponsors-group pt-15">
      <img src="./sponsors-svg/silver/nexthop.svg" alt="next hop Logo" height="40">
      <img src="./sponsors-svg/silver/eventpop.svg" alt="eventpop Logo" height="30">
      <img src="./sponsors-svg/silver/hotnow.svg" alt="HOTNOW Logo" height="38">
    </div>
  </div>
</template>

<script>
export default {
  name: 'SponsorList'
}
</script>

<style scoped>
  .sponsors-group {
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .sponsors-group > img {
    padding-left: 25px;
    padding-right: 25px;
  }

  .pt-15 {
    padding-top: 15px;
  }

  .pt-50 {
    padding-top: 50px;
  }
</style>