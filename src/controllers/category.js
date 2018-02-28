const Category = require('../models/category');

class CategoryController {
  async save(ctx) {
    const category = await new Category(ctx.request.body).save();
    ctx.body = category;
  }

  async findAll(ctx) {
    const categorys = await Category.find({});
    ctx.body = categorys;
  }
}

module.exports = new CategoryController();