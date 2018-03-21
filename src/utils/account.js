const moment = require('moment');
const Account = require('../models/account');
const AccountBook = require('../models/accountBook');

async function addRoutineAccounts({accountBookId, date}) {
  const weekday = moment(date).format('dddd');
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
  return routineAccounts;
}

module.exports = {
  addRoutineAccounts,
};