const Router = require('koa-router');
const router = new Router();
const accountBookRouter = require('./accountBook');
const userRouter = require('./user');

router.use('/accountBook', accountBookRouter.routes(), accountBookRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;