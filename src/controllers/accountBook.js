const AccountBook = require('../models/accountBook');

class AccountBookController {
  async findAll(ctx) {
    const accountBooks = await AccountBook.find({});
    ctx.body = accountBooks;
  }
}

module.exports = new AccountBookController();