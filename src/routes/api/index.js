const Router = require('koa-router');
const router = new Router();
const accountBookRouter = require('./accountBook');
const accountPageRouter = require('./accountPage');
const userRouter = require('./user');

router.use('/accountBook', accountBookRouter.routes(), accountBookRouter.allowedMethods());
router.use('/accountPage', accountPageRouter.routes(), accountPageRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;