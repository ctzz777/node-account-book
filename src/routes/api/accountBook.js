const Router = require('koa-router');
const accountBookController = require('../../controllers/accountBook');
const router = new Router();

router.get('/', accountBookController.findAll);
router.get('/mine', accountBookController.findByUser);

module.exports = router;