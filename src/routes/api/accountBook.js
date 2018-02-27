const Router = require('koa-router');
const accountBookController = require('../../controllers/accountBook');
const router = new Router();

router.get('/', accountBookController.findAll);

module.exports = router;