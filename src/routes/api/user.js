const Router = require('koa-router');
const userController = require('../../controllers/user');
const router = new Router();

router.post('/', userController.addUser);

module.exports = router;