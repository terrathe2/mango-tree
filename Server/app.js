const CronJob = require('cron').CronJob
const firebase = require('firebase')

var config = {
  apiKey: 'AIzaSyCj_TuXjyQymYyD_HLiYzhAF8kAhY4w1Zk',
  databaseURL: 'https://one-for-all-b4f1e.firebaseio.com',
  projectId: 'one-for-all-b4f1e'
}

firebase.initializeApp(config)
var db = firebase.database()

let Cron = new CronJob('*/1 * * * * *', () => {

  db.ref('mangotree/status').once('value', function(snapshot){
    if (snapshot.val() !== 'dead') {
      db.ref('mangotree/umur').once('value', function(snapshot){
        if (snapshot.val() == 15) {
          db.ref('mangotree/status').set('dead')
        } else {
          let umur = parseInt(snapshot.val()) + 1

          db.ref('mangotree/umur').set(umur)
        }
      })

      db.ref('mangotree/tinggi').once('value', function(snapshot){
        let pertambahaanTinggi = Math.ceil(Math.random() * 100)
        let tinggi = parseInt(snapshot.val()) + pertambahaanTinggi

        db.ref('mangotree/tinggi').set(tinggi)
      })
    } else {

    }
  })

}, null, false, 'Asia/Jakarta')

Cron.start()
