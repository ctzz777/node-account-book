const Account = require('../models/account');
const accountUtil = require('../utils/account');
const logger = require('../utils/logger').getLogger('error');

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
    const conditions = {
      accountBookId,
      date,
    }
    const count = await Account.count(conditions);
    if (count === 0) {
      try {
        const routineAccounts = await accountUtil.addRoutineAccounts(conditions);
      } catch (err) {
        logger.error(err.stack);
      }
    }
    const accounts = await Account.find(conditions);
    ctx.body = accounts;
  }

  async findById(ctx) {
    const id = ctx.params.id;
    const account = await Account.findById(id);
    if (!account) {
      ctx.throw(404);
    }
    ctx.body = account;
  }

  async updateById(ctx) {
    const id = ctx.params.id;
    const update = ctx.request.body;
    const account = await Account.findByIdAndUpdate(id, update, {new: true});
    if (!account) {
      ctx.throw(404);
    }
    ctx.body = account;
  }

  async removeById(ctx) {
    const id = ctx.params.id;
    const account = await Account.findByIdAndRemove(id);
    if (!account) {
      ctx.throw(404);
    }
    ctx.body = account;
  }
}

module.exports = new AccountController();