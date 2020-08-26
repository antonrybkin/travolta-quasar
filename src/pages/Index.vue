<template>
  <q-page>
    <SearchForm />
    
    <div class="row">
      <div class="col">
        <h1 class="text-h3">Travel With <span class="text-primary">Travolta</span></h1>
        <p>Lorem ipsum, dolor sit amet consectetur adipisicing elit. Nam nemo illo dolorem incidunt, blanditiis dolores rerum nisi aperiam, similique ratione voluptate id quidem, explicabo error vel? Modi necessitatibus perspiciatis culpa.</p>
      </div>
    </div>
  </q-page>
</template>

<script>
import SearchForm from 'components/SearchForm'

export default {
  name: 'PageIndex',
  components: {
    SearchForm
  }
}
</script>