<template>
  <div class="search">
    <SearchForm />
    <GoogleMap
      :options="googleMapOptions"
      :zoom="mapZoom"
      :center="mapCenter"
      :markers="mapMarkers"
    />
  </div>
</template>

<script>
import { mapState } from 'vuex';
import GoogleMap from '@/components/GoogleMap.vue';
import SearchForm from '@/components/SearchForm.vue';

export default {
  name: 'search',
  components: {
    GoogleMap,
    SearchForm,
  },
  data() {
    return {
      googleMapOptions: {
        fullscreenControl: false,
        mapTypeControlOptions: {
          position: 6, // Google Map bottom left
        },
      },
    };
  },
  computed: {
    ...mapState({
      longtitude: state => state.longtitude,
      latitude: state => state.latitude,
      mapZoom: state => state.mapZoom,
    }),
    mapCenter() {
      return {
        lat: this.latitude,
        lng: this.longtitude,
      };
    },
    mapMarkers() {
      let markers = [];
      if (Object.keys(this.$store.state.venues).length) {
        this.$store.state.venues.forEach((group) => {
          markers = markers.concat(group.items.map(location => ({
            lat: location.venue.location.lat,
            lng: location.venue.location.lng,
          })));
        });
      }
      return markers;
    },
  },
};
</script>
