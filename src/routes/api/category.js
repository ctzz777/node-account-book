const Router = require('koa-router');
const categoryController = require('../../controllers/category');
const router = new Router();

router.post('/', categoryController.save);
router.get('/', categoryController.findAll);

module.exports = router;