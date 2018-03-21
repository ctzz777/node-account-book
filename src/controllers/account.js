const moment = require('moment');
const Account = require('../models/account');
const AccountBook = require('../models/accountBook');

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
    const weekday = moment(date).format('dddd');
    const count = await Account.count({
      accountBookId,
      date,
    });
    const accountBook = await AccountBook.findById(accountBookId);
    const routines = accountBook.routines;
    const routineAccounts = await routines.reduce(async (acc, routine) => {
      acc = await acc;
      if (routine.frequency.includes(weekday) && !routine.history.includes(date)) {
        const accountItem = routine.accountItem.toObject();
        delete accountItem._id;
        const account = await new Account({
          ...accountItem,
          accountBookId,
          date,
        }).save();
        routine.history.push(date);
        await accountBook.save();
        return [
          ...acc,
          account,
        ];
      }
      return acc;
    }, Promise.resolve([]));
    console.log(accountBook)
    const accounts = await Account.find({
      accountBookId,
      date,
    });
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