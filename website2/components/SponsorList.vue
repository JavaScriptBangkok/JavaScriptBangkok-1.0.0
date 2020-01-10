<template>
    <div>
        hello sponsor list
    </div>
</template>


<script>
export default {
  name: 'SponsorList',
  props: {
    speakers: {
      type: Array,
      default: () => []
    }
  }
}
</script>