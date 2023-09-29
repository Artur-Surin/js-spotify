// Підключаємо технологію express для back-end сервера
const express = require('express')
// Cтворюємо роутер - місце, куди ми підключаємо ендпоїнти
const router = express.Router()

// ================================================================

class Track {
  static #list = []

  constructor(name, author, image) {
    this.id = Math.floor(1000 + Math.random() * 9000)
    this.name = name
    this.author = author
    this.image = image
  }

  static create(name, author, image) {
    const newTrack = new Track(name, author, image)
    this.#list.push(newTrack)
    return newTrack
  }

  static getList() {
    return this.#list.reverse()
  }
}

Track.create(
  'Інь Ян',
  'MONATIK і ROXOLANA',
  'https://picsum.photos/100/100',
)
Track.create(
  'Baila Comnigo (Remix)',
  'Selena Gomes i Rauw Alejandro',
  'https://picsum.photos/100/100',
)
Track.create(
  'Shameless',
  'Camila Cabello',
  'https://picsum.photos/100/100',
)
Track.create(
  '11 PM',
  'MALUMA',
  'https://picsum.photos/100/100',
)
Track.create(
  'Інша любов',
  'Enleo',
  'https://picsum.photos/100/100',
)

//console.log(Track.getList())

class PlayList {
  static #list = []

  constructor(name) {
    this.id = Math.floor(1000 + Math.random() * 9000)
    this.name = name
    this.tracks = []
    this.image = 'https://picsum.photos/100/100'
  }

  static create(name) {
    const newPlayList = new PlayList(name)
    this.#list.push(newPlayList)
    return newPlayList
  }

  static getList() {
    return this.#list.reverse()
  }

  static makeMix(playlist) {
    const allTracks = Track.getList()

    let randomTracks = allTracks
      .sort(() => 0.5 - Math.random())
      .slice(0, 3)

    playlist.tracks.push(...randomTracks)
  }

  static getById(id) {
    return (
      PlayList.#list.find(
        (playlist) => playlist.id === id,
      ) || null
    )
  }

  deleteTrackById(trackId) {
    this.tracks = this.tracks.filter(
      (track) => track.id !== trackId,
    )
  }

  addTrack(trackId) {
    const trackAdd = Track.getList().find(
      (track) => track.id === trackId,
    )
    this.tracks.push(trackAdd)
  }

  static findListByValue(name) {
    return this.#list.filter((playList) =>
      playList.name
        .toLowerCase()
        .includes(name.toLowerCase()),
    )
  }
}

PlayList.makeMix(PlayList.create('Test'))
PlayList.makeMix(PlayList.create('Test2'))
PlayList.makeMix(PlayList.create('Test3'))
PlayList.makeMix(PlayList.create('Test4'))



class User {
  static #list = []
  constructor(email, login, password) {
    this.email = email
    this.login = login
    this.password = password
    this.id = new Date().getTime()
  }


  verifyPassword = (password) => this.password === password

  static add = (user) => {
    this.#list.push(user)
  }


  static getList = () => {
    return this.#list
  }

  static getById = (id) => {
    return this.#list.find((user) => user.id === id)
  }

  static deleteById = (id) => {
    const index = this.#list.findIndex(
      (user) => user.id === id,
    )
    if (index !== -1) {
      this.#list.splice(index, 1)
      return true
    } else {
      return false
    }
  }

  static updateById = (id, data) => {
    const user = User.getById(id)

    if (user) {
      User.update(user, data)
    }
  }

  static getList = () =>  this.#list
 
  static getById = (id) => 
    this.#list.find((user) => user.id === id)

    static deleteById = (id) => {
      const index = this.#list.findIndex(
        (user) => user.id === id,
        )

        if(index !== -1) {
          this.#list.splice(index, 1)
          return true
        } else {
          return false
        }
    }
    

  static updateById = (id, data) => {
    const user = this.getById(id)

    if(user) {
      this.update(user, data)


      return true
    } else {
      return false
    }
  }


  static update = (user, { email }) => {
    if (email) {
    }}
  static update = (user, { email}) => {
    if(email) {

      user.email = email
    }
  }
}


// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = PlayList.getList()
  console.log(list)
  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-index', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі
    style: 'spotify-index',

    data: {
      lib: list,
    },
  })
  // ↑↑ сюди вводимо JSON дані
})


// ================================================================

// router.get Створює нам один ентпоїнт

// ↙️ тут вводимо шлях (PATH) до сторінки
router.get('/spotify-choose', function (req, res) {
  // res.render генерує нам HTML сторінку

  const list = User.getList()

  // ↙️ cюди вводимо назву файлу з сontainer
  res.render('spotify-choose', {
    // вказуємо назву папки контейнера, в якій знаходяться наші стилі

    style: 'spotify-choose',

    data: {},

    style: 'index',



    data: {
      users: {
        list,
        isEmpty: list.length === 0,
      },
    },

  })
  // ↑↑ сюди вводимо JSON дані
})

// ================================================================


router.get('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix
  res.render('spotify-create', {

    style: 'spotify-create',

    data: {
      isMix,
    },
  })
})


router.post('/spotify-create', function (req, res) {
  const isMix = !!req.query.isMix

  const name = req.body.name

  if (!name) {
    return res.render('alert', {
      style: 'alert',

      data: { 
        message: 'Помилка',
        info: 'Введіть назву плейліста',
        link: isMix 
        ? '/spotify-create?isMix=true' 
        : '/spotify-create',

      },
    })
  }

  const playListNew = PlayList.create(name)

  if (isMix) {
    PlayList.makeMix(playListNew)
  }

  console.log(playListNew)

  res.render('alert', {
    style: 'alert',

    data: {
      playlistId: playListNew.id,
      tracks: playListNew.tracks,
      name: 'test'
    },
  })
})


router.get('/spotify-playlist', function (req, res) {
  const id = Number(req.query.id)

  const playlist = PlayList.getById(id)

  if (!playlist) {
    return res.render('alert', {
      style: 'alert',

      data: { 
        message: 'Помилка',
        info: 'Такого плейліста не знайдено',
        link: '/spotify-choose' ,
      },
    })
  }

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playlistId: playlist.id,
      tracks: playlist.tracks,
      name: playlist.name,
    },
  })
})

router.get('/spotify-track-delete', function (req, res) {
  const playListId = Number(req.query.playListId)

  const trackId = Number(req.query.trackId)

  const playList = PlayList.getById(playListId)

  if (!playList) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: `/spotify-playlist?id=${playList.Id}`,
      },
    })
  }

  playList.deleteTrackById(trackId)

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playListId: playList.id,
      tracks: playList.tracks,
      name: playList.name,
    },
  })
})

router.get('/spotify-playlist-add', function (req, res) {
  const playListId = Number(req.query.id)

  const playlist = PlayList.getById(playListId)

  if (!playlist) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: `/spotify-playlist?id=${playListId}`,
      },
    })
  }

  res.render('spotify-playlist-add'), {
    style: 'spotify-playlist-add',

    data: {
      playlistId: playlist.id,
      tracks: Track.getList(),
      name: playlist.name,
    },
  }
})

// ================================================================


router.get('/spotify-track-add', function (req, res) {
  const playListId = Number(req.query.playListId)

  const trackId = Number(req.query.trackId)

  const playList = Playlist.getById(playListId)

  playList.addTrack(trackId)

  if (!playList) {
    return res.render('alert', {
      style: 'alert',

      data: {
        message: 'Помилка',
        info: 'Такого плейлиста не знайдено',
        link: `/spotify-playlist?id=${playListId}`,
      },
    })
  }

  res.render('spotify-playlist', {
    style: 'spotify-playlist',

    data: {
      playListId: playList.id,
      tracks: playList.tracks,
      name: playList.name,
    },
  })
})



router.get('/spotify-search', function (req, res) {
  const value = ''

  const list = PlayList.findListByValue(value)

  res.render('spotify-search', {
    style: 'spotify-search',

    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        amount: tracks.length,
      })),
      value,
    },
  })
})

router.post('/spotify-search', function (req, res) {
  const value = req.body.value || ''

  const list = PlayList.findListByValue(value)

  console.log(value)

  res.render('spotify-search', {
    style: 'spotify-search',

    data: {
      list: list.map(({ tracks, ...rest }) => ({
        ...rest,
        amount: tracks.length,
      })),
      value,
    },
  })
})
// ===============================================================

// Підключаємо роутер до бек-енду
module.exports = router