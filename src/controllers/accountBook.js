class AccountBookController {
  async findAccountBook(ctx) {
    ctx.body = ctx.state.user;
  }
}

module.exports = new AccountBookController();