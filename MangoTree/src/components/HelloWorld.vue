<template>
  <div class="hello">
    <img :src="data.imgUrl" alt="" width="300px">
    <h2>Mango Tree</h2>
    <h3>{{ data.message }}</h3>
    <h5>
      Umur Bertambah 1 tahun, saat ini pohon berumur {{ data.umur }} Tahun<br>
      Tinggi Bertambah {{ pertambahaanTinggi }} centimeter, saat ini pohon memiliki tinggi {{ data.tinggi }} centimeter<br>
      Status: {{ data.status }}
    </h5>
    <button type="button" name="button" @click="startCron" v-if="!isPlay">Start Grow</button>
    <button type="button" name="button" @click="reset">Reset</button>
  </div>
</template>

<script>
import cron from 'cron'

export default {
  name: 'HelloWorld',
  data () {
    return {
      data: '',
      isPlay: false,
      pertambahaanTinggi: 0,
      sehat: true
    }
  },
  methods: {
    reset () {
      this.$db.ref('mangotree').set({
        tinggi: 0,
        umur: 0,
        status: '',
        message: '',
        imgUrl: ''
      })
    },

    startCron () {
      this.isPlay = true
      // const CronJob = cron.CronJob

      let Cron = new cron.CronJob('*/5 * * * * *', () => {
        this.grow()

        if (this.sehat === true) {
          this.data.status = 'Pohon Masih dalam keadaan sehat :)'
        } else {
          this.data.status = 'Pohon telah mati :('
        }

        this.$db.ref('mangotree').set(this.data)
      }, null, false, 'Asia/Jakarta')

      Cron.start()
    },

    grow () {
      let maxUmur = 15
      if (this.data.umur === maxUmur) {
        this.sehat = false
      }

      if (this.data.umur < 5) {
        this.data.message = 'Siram akuuuuuuu!!'
        this.data.imgUrl = 'https://s-media-cache-ak0.pinimg.com/originals/82/47/d1/8247d11f67c00f022c4135159fa1637f.gif'
      } else if (this.data.umur < 14) {
        this.data.message = 'waw, aku sudah tumbuh besaarr'
        this.data.imgUrl = 'https://media.giphy.com/media/PkiDwrlAoyZyw/giphy.gif'
      } else if (this.data.umur < 15) {
        this.data.message = 'Sepertinya ak sudah tua, selamat tinggal :('
        this.data.imgUrl = 'https://ysidrohartzell.files.wordpress.com/2015/04/tall-tree-fall.gif'
      } else {
        this.data.message = ''
      }

      this.data.umur++
      this.pertambahaanTinggi = Math.ceil(Math.random() * 100)
      this.data.tinggi += this.pertambahaanTinggi
    }
  },
  created () {
    this.$db.ref('mangotree').on('value', (snapshot) => {
      // console.log(snapshot.val())
      this.data = snapshot.val()
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
