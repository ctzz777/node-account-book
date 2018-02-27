const AccountBook = require('../models/accountBook');

class AccountBookController {
  async findAll(ctx) {
    const accountBook = await AccountBook.find({});
    ctx.body = accountBook;
  }

  async findByUser(ctx) {
    const accountBook = await AccountBook.findOne({
      userId: ctx.state.user._id,
    });
    ctx.body = accountBook;
  }
}

module.exports = new AccountBookController();