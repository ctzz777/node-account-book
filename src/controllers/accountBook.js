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

  async addRoutine(ctx) {
    const id = ctx.params.id;
    const routine = ctx.request.body;
    const accountBook = await AccountBook.findByIdAndUpdate(id, {
      $push: {
        routines: routine,
      }
    }, {
      new: true,
      runValidators: true,
    });
    ctx.body = accountBook;
  }

  async removeRoutine(ctx) {
    const id = ctx.params.id;
    const routineId = ctx.params.routineId;
    const accountBook = await AccountBook.findByIdAndUpdate(id, {
      $pull: {
        routines: {
          _id: routineId,
        }
      }
    }, {
      new: true,
      runValidators: true,
    });
    ctx.body = accountBook;
  }
}

module.exports = new AccountBookController();