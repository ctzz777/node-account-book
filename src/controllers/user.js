const User = require('../models/user');
const AccountBook = require('../models/accountBook');

class UserController {
  async save(ctx) {
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }
}

module.exports = new UserController();