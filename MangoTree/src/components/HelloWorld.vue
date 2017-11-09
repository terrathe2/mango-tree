<template>
  <div class="hello">
    <img :src="mango.imgUrl" alt="" width="300px">
    <h2>Mango Tree</h2>
    <h3>{{ mango.message }}</h3>
    <h5>
      Umur Bertambah 1 tahun, saat ini pohon berumur {{ mango.umur }} Tahun<br>
      saat ini pohon memiliki tinggi {{ mango.tinggi }} centimeter<br>
      Status: {{ mango.status }}
    </h5>
    <button type="button" name="button" @click="startCron" v-if="!isPlay">Start Grow</button>
    <button type="button" name="button" @click="reset">Reset</button>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  data () {
    return {
      mango: {},
      isPlay: false
    }
  },
  methods: {
    reset () {
      this.$db.ref('mangotree').set({
        tinggi: 0,
        umur: 0,
        status: 'live'
      })
    },

    startCron () {
      this.reset()
      this.isPlay = true

      this.$db.ref('mangotree').on('value', (snapshot) => {
        this.mango = snapshot.val()

        if (this.mango.umur <= 8) {
          this.mango.message = 'Siram akuuuuuuu!!'
          this.mango.imgUrl = 'https://s-media-cache-ak0.pinimg.com/originals/82/47/d1/8247d11f67c00f022c4135159fa1637f.gif'
        } else if (this.mango.umur < 15) {
          this.mango.message = 'waw, aku sudah tumbuh besaarr'
          this.mango.imgUrl = 'https://media.giphy.com/media/PkiDwrlAoyZyw/giphy.gif'
        } else if (this.mango.umur === 15) {
          this.mango.message = 'Sepertinya ak sudah tua, selamat tinggal :('
          this.mango.imgUrl = 'https://ysidrohartzell.files.wordpress.com/2015/04/tall-tree-fall.gif'
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
