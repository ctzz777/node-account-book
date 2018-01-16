const passport = require('koa-passport');

class AuthController {
  async login(ctx) {
    return passport.authenticate('local',
      (err, user, info, status) => {
        if (user) {
          const username = user.username;
          const token = user.generateToken();
          ctx.body = {
            username,
            token,
          };
        } else {
          ctx.throw(401);
        }
      })(ctx);
  }
  
  async checkAuth(ctx) {
    return passport.authenticate('jwt',
      (err, user, info, status) => {
        if (user) {
          const username = user.username;
          ctx.body = {
            username,
          };
        } else {
          ctx.throw(401);
        }
      })(ctx);
  }
}

module.exports = new AuthController();