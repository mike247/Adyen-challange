<template>
  <div class="googleMap">
    <div id="map" ref="map">
    </div>
  </div>
</template>

<style scooped>
  #map {
    width: 100vw;
    height: 100vh;
    position: absolute;
    top: 0;
    left: 0;
  }
</style>

<script>
/* global google */
import gmapsInit from '../utils/gmapInit';

export default {
  name: 'GoogleMap',
  props: {
    options: Object,
    center: Object,
    zoom: Number,
    markers: Array,
  },
  data() {
    return {
      map: null,
      google: null,
      existingMarkers: [],
    };
  },
  watch: {
    center() {
      this.map.setCenter(this.center);
      this.map.setZoom(this.zoom);
    },
    markers() {
      this.existingMarkers = this.markers.map(marker => new google.maps.Marker({
        position: marker,
        map: this.map,
      }));
    },
  },
  async created() {
    try {
      this.google = await gmapsInit();
      this.map = new google.maps.Map(this.$refs.map, {
        zoom: this.zoom,
        center: this.center,
        ...this.options,
      });
    } catch (error) {
      console.error(error);
    }
  },
};
</script>
