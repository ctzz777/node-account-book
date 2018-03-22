const Router = require('koa-router');
const accountBookController = require('../../controllers/accountBook');
const router = new Router();

router.get('/', accountBookController.findAll);
router.get('/mine', accountBookController.findByUser);
router.post('/:id/routine', accountBookController.addRoutine);
router.delete('/:id/routine/:routineId', accountBookController.removeRoutine);
router.post('/:id/common', accountBookController.addCommon);
router.delete('/:id/common/:commonId', accountBookController.removeCommon);

module.exports = router;