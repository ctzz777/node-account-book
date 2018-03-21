const Router = require('koa-router');
const categoryController = require('../../controllers/category');
const router = new Router();

router.post('/', categoryController.save);
router.get('/', categoryController.findAll);
router.get('/:id', categoryController.findById);
router.put('/:id', categoryController.updateById);
router.delete('/:id', categoryController.removeById);

module.exports = router;