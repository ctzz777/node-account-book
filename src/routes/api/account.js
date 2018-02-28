const Router = require('koa-router');
const accountController = require('../../controllers/account');
const router = new Router();

router.post('/', accountController.save);
router.get('/', accountController.findAll);
router.get('/accountBook/:accountBookId/date/:date', accountController.findByAccountBookAndDate);

module.exports = router;