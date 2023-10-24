const jwt = require("jsonwebtoken");
const Expense = require("../model/expensemodel");
const User = require("../model/userModel");
const sequelize = require("../util/db");

module.exports.postExpenseController = async (req, res) => {
  try {
    console.log(`in the post expese controller`);
    req.body.UserId = req.tokenData.user.userId;
    let newExpense = await Expense.create(req.body);
    let updateUser = await User.findById(req.body.UserId);
    console.log(`15 in post expense tracker`);
    let sum =
      Number.parseInt(req.body.expenseInput) +
      Number.parseInt(updateUser.total_expenses);
    let wait_user_update = await User.findByIdAndUpdate(req.body.UserId, {
      total_expenses: sum,
      $push: { expenses: newExpense._id },
    });
    console.log(wait_user_update);
    res.json({ data: newExpense });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.getExpenseController = async (req, res) => {
  try {
    let page = 1;
    let offset = 10;
    let limit = 50;
    let pageAsNumber = Number.parseInt(req.query.page);
    let offsetAsNumber = Number.parseInt(req.query.offset);
    if (!Number.isNaN(pageAsNumber) && pageAsNumber > 1) page = pageAsNumber;
    if (
      !Number.isNaN(offsetAsNumber) &&
      offsetAsNumber >= 5 &&
      offsetAsNumber <= limit
    )
      offset = offsetAsNumber; //I should write limit and also pass it into sql
    const result = await User.findById(req.tokenData.user.userId).populate({
      path: "expenses",
    });
    console.log(`42 in get expense`);
    console.log(result);
    // limit: offset,
    // offset: offset * (page - 1),// where:{ index of record >= offset}
    // order: [['createdAt', 'DESC']]
    const total_pages = Math.ceil(result.count / offset);
    let nextPage;
    let prevPage;
    let hasNextPage = false;
    let hasPrevPage = false;
    if (total_pages > 1 && page < total_pages) {
      hasNextPage = true;
      nextPage = page + 1;
    }
    if (page <= total_pages && page > 1) {
      hasPrevPage = true;
      prevPage = page - 1;
    }
    console.log(result);
    res.json({
      result: result.expenses,
      total_pages: Math.ceil(result.count / offset),
      currentPage: page,
      nextPage,
      prevPage,
      hasNextPage,
      hasPrevPage,
    });
  } catch (error) {
    res.json({ message: error.message });
  }
};

module.exports.deleteExpenseController = async (req, res) => {
  try {
    console.log(req.token);
    console.log(req.params.id);
    const delete_data_expense = await Expense.findByIdAndDelete(req.params.id);
    console.log(delete_data_expense);
    let wait_user_result = await User.findById(req.tokenData.user.userId);
    let sum =
      Number.parseInt(wait_user_result.total_expenses) -
      Number.parseInt(delete_data_expense.expenseInput);
    await User.findByIdAndUpdate(req.tokenData.user.userId, {
      total_expenses: sum,
      // $pop:{expenses:delete_data_expense._id},
    });
    res.json({ message: `Expense deleted` });
  } catch (error) {
    console.log(error);
    res.json({ message: error.message });
  }
};
