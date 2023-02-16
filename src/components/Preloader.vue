<script>
export default {
  name: `Preloader`,
};
</script>

<template>
  <div id="preloader">
    <div class="loading">
      <lottie-player
        src="https://assets6.lottiefiles.com/packages/lf20_16bo07fy.json"
        background="transparent"
        speed="1"
        style="width: 300px; height: 300px"
        loop
        autoplay
      ></lottie-player>
    </div>
  </div>
</template>
