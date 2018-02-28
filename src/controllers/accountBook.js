const AccountBook = require('../models/accountBook');

class AccountBookController {
  async findAll(ctx) {
    const accountBooks = await AccountBook.find({});
    ctx.body = accountBooks;
  }

  async findByUser(ctx) {
    const user = ctx.state.user;
    if (!user) {
      ctx.throw(401);
    }
    const userId = user._id;
    const accountBook = await AccountBook.findOne({userId});
    if (!accountBook) {
      ctx.throw(404);
    }
    ctx.body = accountBook;

  }
}

module.exports = new AccountBookController();