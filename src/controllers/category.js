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

  async findById(ctx) {
    const id = ctx.params.id;
    const category = await Category.findById(id);
    if (!category) {
      ctx.throw(404);
    }
    ctx.body = category;
  }

  async updateById(ctx) {
    const id = ctx.params.id;
    const update = ctx.request.body;
    const category = await Category.findByIdAndUpdate(id, update, {new: true});
    if (!category) {
      ctx.throw(404);
    }
    ctx.body = category;
  }

  async removeById(ctx) {
    const id = ctx.params.id;
    const category = await Category.findByIdAndRemove(id);
    if (!category) {
      ctx.throw(404);
    }
    ctx.body = category;
  }
}

module.exports = new CategoryController();