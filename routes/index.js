const router = require('koa-router')()
const postControler = require('../controllers/posts')

  router.get('/', postControler.index)
  .get('/post/:id', postControler.PostById)
  .get('/tag/:tag', postControler.PostsByTag)


module.exports = router
