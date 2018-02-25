const User = require('../models/user');
const AccountBook = require('../models/accountBook');

class UserController {
  async addUser(ctx) {
    console.log(ctx.request.body);
    const user = await new User(ctx.request.body).save();
    ctx.body = user;
  }
}

module.exports = new UserController();