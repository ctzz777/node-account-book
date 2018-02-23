const Router = require('koa-router');
const authController = require('../controllers/auth');
const passport = require('koa-passport');
const router = new Router();

router.post('/login', authController.login);
router.get('/checkAuth', authController.checkAuth);
router.get('/google', passport.authenticate('google', {session: false, scope: ['email', 'profile']}));
router.get('/google/callback', passport.authenticate('google', {session: false}), authController.googleCallback);

module.exports = router;