<template>
  <q-card class="my-card">
    <q-form
      @submit="onSubmit"
      class="q-py-sm q-px-lg q-pt-lg"
    >
      <div class="row q-col-gutter-lg">
        <div class="col-12 col-md-4">
          <q-select
            outlined
            v-model="destination"
            ref="destination"
            use-input
            input-debounce="0"
            label="Destination"
            hide-dropdown-icon
            :options="destinations"
            :rules="[val => !!val || 'Destination is required']"
            @filter="filterFn"
          >
            <template v-slot:no-option>
              <q-item>
                <q-item-section class="text-grey">
                  No results
                </q-item-section>
              </q-item>
            </template>
          </q-select>
        </div>

        <div class="col-12 col-md-2">
          <q-input 
            outlined 
            v-model="checkIn" 
            ref="checkIn"
            mask="date" 
            label="Check-In" 
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="checkIn">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-2">
          <q-input 
            outlined 
            v-model="checkOut" 
            ref="checkOut"
            mask="date" 
            label="Check-Out" 
            :rules="['date']"
          >
            <template v-slot:append>
              <q-icon name="event" class="cursor-pointer">
                <q-popup-proxy ref="qDateProxy" transition-show="scale" transition-hide="scale">
                  <q-date v-model="checkOut">
                    <div class="row items-center justify-end">
                      <q-btn v-close-popup label="Close" color="primary" flat />
                    </div>
                  </q-date>
                </q-popup-proxy>
              </q-icon>
            </template>
          </q-input>
        </div>

        <div class="col-12 col-md-1">
          <q-input 
            outlined 
            v-model="adults" 
            ref="adults"
            label="Adults"
            type="number"
            :rules="['required', 'number']" />
        </div>
        
        <div class="col-12 col-md-1">
          <q-input 
            outlined 
            v-model="children" 
            ref="children"
            label="Children"
            type="number"
            :rules="['number']" />
        </div>

        <div class="col-12 col-md-2">
          <q-btn label="Search" type="submit" color="primary" class="full-width q-py-sm" />
        </div>
      </div>
    </q-form>
  </q-card>
</template>

<script>
export default {
  name: 'SearchForm',
  data () {
    return {
      destination: null,
      allDestinations: this.$store.state.hotels.destinations.map((d) => d.name),
      destinations: null,
      adults: 0,
      children: 0,
      checkIn: '2020/08/26',
      checkOut: '2020/08/26',
    }
  },
  methods: {
    filterFn (val, update) {
      update(() => {
        const needle = val.toLowerCase()
        this.destinations = this.allDestinations.filter(d => d.toLowerCase().indexOf(needle) > -1)
      })
    },
  
    onSubmit () {
      this.$refs.destination.validate()
      this.$refs.checkIn.validate()
      this.$refs.checkOut.validate()
      this.$refs.adults.validate()
      this.$refs.children.validate()
      if (this.$refs.destination.hasError || this.$refs.checkIn.hasError || this.$refs.checkOut.hasError || this.$refs.adults.hasError || this.$refs.children.hasError) {
        this.formHasError = true
      } else {
        this.$router.push({ name: 'Hotels', query: { destination: this.destination } })
      }
    },
  }
}
</script>
