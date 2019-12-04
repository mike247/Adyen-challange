<template>
  <div class="searchForm">
    <div v-if="loading" class="searchForm_loading_wrapper">
      <div class="searchForm_lds-dual-ring"></div>
    </div>
    <div class="searchForm_row">
      <CustomInput
        type="text"
        placeholder="What are you looking for?"
        @queryChangeHandler="updateQuery"
        inputEvent="queryChangeHandler"
      />
    </div>
    <div class="searchForm_row">
      <CustomButton
        text="Search with GPS"
        :debounce="true"
        clickEvent="searchButtonAction"
        @searchButtonAction="gpsSearch"
        :disabled="queryEmpty"
      />
      <span>Or</span>
      <form role="search" @submit="customSearch">
        <CustomInput
          type="text"
          name="near"
          placeholder="Search for a location"
          @nearChangeHandler="updateNear"
          inputEvent="nearChangeHandler"
          :disabled="queryEmpty"
        />
      </form>
    </div>
    <ResultsList :results="formattedResults" />
  </div>
</template>

<style scoped>
  .searchForm {
    background-color: rgba(255, 255, 255, 0.8);
    width: 455px;
    padding: 10px 20px;
    border-radius: 5px;
    position: absolute;
    top: 20px;
    left: 20px;
    z-index: 2;
  }

  .searchForm_row {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin: 10px 0;
  }

  .searchForm_loading_wrapper {
    position: absolute;
    border-radius: 5px;
    left: 0;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 120px;
    opacity: 1;
    background-color:rgba(256, 256, 256, 0.8);
  }

  .searchForm_lds-dual-ring {
    display: inline-block;
    width: 80px;
    height: 80px;
  }

  .searchForm_lds-dual-ring:after {
    content: " ";
    display: block;
    width: 64px;
    height: 64px;
    margin: 8px;
    border-radius: 50%;
    border: 6px solid #1565C0;
    border-color: #1565C0 transparent #1565C0 transparent;
    animation: searchForm_lds-dual-ring 1.2s linear infinite;
  }
  @keyframes searchForm_lds-dual-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }

</style>

<script>
import { mapState } from 'vuex';
import CustomButton from './reusable/CustomButton.vue';
import CustomInput from './reusable/CustomInput.vue';
import ResultsList from './reusable/ResultsList.vue';

export default {
  name: 'SearchForm',
  components: {
    CustomButton,
    CustomInput,
    ResultsList,
  },
  computed: {
    ...mapState({
      loading: state => state.loading,
      venues: state => state.venues,
    }),
    queryEmpty() {
      return this.$store.state.query.length === 0;
    },
    formattedResults() {
      return this.venues.map(group => ({
        name: group.type,
        locations: group.items.map(location => ({
          name: location.venue.name,
          reasons: location.reasons.items,
          address: location.venue.location.address,
          city: location.venue.location.city,
        })),
      }));
    },
  },
  methods: {
    gpsSearch() {
      const t = this;
      t.$store.dispatch('updateLoading', true);

      const geoSuccess = (position) => {
        t.$store.dispatch('updateLatitude', position.coords.latitude);
        t.$store.dispatch('updateLongtitude', position.coords.longitude);
        t.$store.dispatch('getVenuesByGps');
        t.$store.dispatch('updateMapZoom', 15);
      };

      const geoError = (error) => {
        console.error(error);
        t.$store.dispatch('updateLoading', false);
        // Showing some form of toast or notification would be good here
      };

      navigator.geolocation.getCurrentPosition(geoSuccess, geoError, { timeout: 10000 });
    },
    customSearch(e) {
      e.preventDefault();
      this.$store.dispatch('getVenuesByNear');
      this.$store.dispatch('updateMapZoom', 15);
    },
    updateQuery(e) {
      e.preventDefault();
      this.$store.dispatch('updateQuery', e.target.value);
    },
    updateNear(e) {
      e.preventDefault();
      this.$store.dispatch('updateNear', e.target.value);
    },
  },
};
</script>
