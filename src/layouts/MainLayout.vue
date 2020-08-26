<template>
  <q-layout view="lHh Lpr lFf">
    <q-page-container>
      <div class="q-pa-md doc-container">
        <div class="row q-pb-lg">
          <div class="col-12 col-md-8">
            <div class="logo" @click="$route.path === '/' ? 0 : $router.push('/')">
              TRAVOLTA
            </div>
          </div>
          <div class="col-12 col-md-4 flex justify-end items-center q-gutter-sm desktop-only">
            <q-btn color="purple" label="About Us" />
            <q-btn color="purple" label="My Bookings" />
            <q-btn color="purple" label="Sign-In" />
          </div>
        </div>
        <router-view />
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
export default {
  name: 'MainLayout',
}
</script>

<style lang="sass">
.q-layout
  max-width: 1200px
  margin: auto
.logo
  font-size: 50px
  padding-left: 60px
  position: relative
  cursor: pointer
  &::before
    content: ""
    position: absolute
    top: 12px
    left: 0
    background: purple
    height: 50px
    width: 50px
    border-radius: 50%
</style>
