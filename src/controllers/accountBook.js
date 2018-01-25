const AccountBook = require('../models/accountBook');

class AccountBookController {
  async findAccountBook(ctx) {
    const accountBook = await AccountBook.findOne({
      userId: ctx.state.user._id,
    });
    ctx.body = accountBook;
  }
}

module.exports = new AccountBookController();