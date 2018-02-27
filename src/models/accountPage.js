const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const AccountPage = new Schema({
  accountBookId: {type: Schema.Types.ObjectId, ref: 'AccountBook', required: true},
  date: {type: String, required: true},
  accounts: [{type: Schema.Types.ObjectId, ref: 'Account', required: true}],
});

AccountPage.statics.findByDateOrCreate = async function (accountBookId, date) {
  const condition = {
    accountBookId,
    date
  };
  const exist = await this.findOne(condition);
  if (!exist) {
    const accountPage = await new this(condition).save();
    return accountPage;
  }
  return exist;
}

module.exports = mongoose.model('AccountPage', AccountPage, 'AccountPage');