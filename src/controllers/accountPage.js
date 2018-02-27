const AccountPage = require('../models/accountPage');

class AccountPageController {
  async findByDate(ctx) {
    const accountBookId = ctx.params.accountBookId;
    const date = ctx.params.date;
    const accountPage = await AccountPage.findByDateOrCreate(accountBookId, date);
    ctx.body = accountPage;
  }
}

module.exports = new AccountPageController();