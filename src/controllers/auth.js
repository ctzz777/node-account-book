const passport = require('koa-passport');

class AuthController {
  async login(ctx) {
    return passport.authenticate('local',
      (err, user, info, status) => {
        if (user) {
          const token = user.generateToken();
          ctx.body = {
            user,
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
          ctx.body = {
            user,
          };
        } else {
          ctx.throw(401);
        }
      })(ctx);
  }

  async googleCallback(ctx) {
    const user = ctx.state.user;
    if (user) {
      const token = user.generateToken();
      console.log(user);
      ctx.body = {
        user,
        token,
      };
    } else {
      ctx.throw(401);
    }
  }
}

module.exports = new AuthController();