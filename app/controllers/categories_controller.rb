class CategoriesController < ApplicationController
  def index
    @categories = Category.all
    authorize @categories
  end

  def new
    @category = Category.new
    authorize @category
  end

  def create
    @category = Category.new(category_params)
    @category.save
    authorize @category
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
