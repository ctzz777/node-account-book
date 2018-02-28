const Account = require('../models/account');

class AccountController {
  async save(ctx) {
    const account = await new Account(ctx.request.body).save();
    ctx.body = account;
  }

  async findAll(ctx) {
    const accounts = await Account.find({});
    ctx.body = accounts;
  }

  async findByAccountBookAndDate(ctx) {
    const accountBookId = ctx.params.accountBookId;
    const date = ctx.params.date;
    const accounts = await Account.find({
      accountBookId,
      date,
    });
    ctx.body = accounts;
  }
}

module.exports = new AccountController();