const Router = require('koa-router');
const router = new Router();
const accountBookRouter = require('./accountBook');

router.use('/accountBook', accountBookRouter.routes(), accountBookRouter.allowedMethods());

module.exports = router;