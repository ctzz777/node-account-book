const Router = require('koa-router');
const accountPageController = require('../../controllers/accountPage');
const router = new Router();

router.get('/:accountBookId/:date', accountPageController.findByDate);

module.exports = router;