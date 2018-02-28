const Router = require('koa-router');
const router = new Router();
const accountBookRouter = require('./accountBook');
const accountRouter = require('./account');
const categoryRouter = require('./category');
const userRouter = require('./user');

router.use('/accountBook', accountBookRouter.routes(), accountBookRouter.allowedMethods());
router.use('/account', accountRouter.routes(), accountRouter.allowedMethods());
router.use('/category', categoryRouter.routes(), categoryRouter.allowedMethods());
router.use('/user', userRouter.routes(), userRouter.allowedMethods());

module.exports = router;