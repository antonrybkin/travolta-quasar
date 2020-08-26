<template>
  <q-page>
    <div class="row">
      <div class="col-md-3 q-pr-lg desktop-only">
        <q-card class="my-card q-pa-md q-mb-md">
          <h2 class="text-h6 q-ma-none">Filter Box</h2>
          <p v-if="query">
            {{ query }}
            <sup class="hotel-x" @click="query = null">x</sup>
          </p>
          <q-input outlined v-model="searchText" label="Filter by hotel name" stack-label />
          <h3 class="text-h6 q-mb-none">Filter by rating:</h3>
          <q-rating
            max="5"
            v-model="searchRating"
            size="1em"
            color="purple"
            icon="star_border"
            icon-selected="star"
            icon-half="star_half"
          />
          <span class="text-primary"> +</span>
        </q-card>
      </div>

      <div class="col-12 col-md-9">
        <q-card 
          v-if="!hotels || hotels.length < 1" 
          class="q-py-lg text-center"
        >
          0 hotels match your search. 
          <template v-if="filterByDestination().length < 1">
            Try <router-link :to="{ name: 'Hotels', query: { destination: 'Boston' } }">Boston</router-link>, for example.
          </template>

        </q-card>
        <q-card 
          v-else
          v-for="hotel in hotels"
          :key="hotel.id"
          class="my-card q-mb-md">
          <div class="row q-pa-md">
            <div class="col-5 col-md-2">
              <div class="hotel-img" />
            </div>
            <div class="col-7">
              <h2 class="text-h6 q-ma-none">{{ hotel.name }}</h2>
              <q-rating
                max="5"
                :value="!hotel.hotel_rating ? 0 : hotel.hotel_rating"
                size="1em"
                color="purple"
                icon="star_border"
                icon-selected="star"
                icon-half="star_half"
                readonly
              />
              <p>
                <template v-if="hotel.address">
                  {{ hotel.address }},
                </template>
                <template v-if="hotel.state">
                  {{ hotel.state }},
                </template>
                <template v-if="hotel.country_code">
                  {{ hotel.country_code }}
                </template>
                <template v-else>
                  No country :)
                </template>
              </p>
            </div>
            <div class="col-2 desktop-only">
              <q-btn color="purple" label="Show Details" />
            </div>
          </div>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'HotelList',
  data () {
    return {
      allHotels: this.$store.state.hotels.hotels,
      query: this.$route.query.destination || null,
      searchText: '',
      searchRating: 0
    }
  },
  computed: {
    hotels () {
      if (this.searchText !== '') {
        return this.filterByRating()
                .filter(h => h.name.toLowerCase().indexOf(this.searchText.toLowerCase()) > -1)
      }
      return this.filterByRating()
    }
  },
  methods: {
    filterByRating () {
      return this.filterByDestination().filter(h => {
        const rating = !h.hotel_rating ? 0 : h.hotel_rating
        return rating >= this.searchRating
      })
    },

    filterByDestination () {
      if (!this.query) {
        return this.allHotels
      } else {
        const query = this.$route.query.destination.toLowerCase();
        return this.allHotels.filter(h => {
          const city = h.city === undefined ? 'No city' : h.city.toLowerCase()
          console.log(city);
          return city.indexOf(query) > -1
        })
      }
    }
  }
}
</script>

<style lang="sass">
.hotel
  &-img
    height: 100px
    width: 100px
    border: 1px solid black
    display: flex
    align-items: center
    justify-content: center
    cursor: pointer
    &::before
      content: "Hotel Image"
  &-x
    cursor: pointer
</style>