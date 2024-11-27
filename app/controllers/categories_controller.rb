class CategoriesController < ApplicationController
  def index
    authorize @categories
    @categories = Category.all
  end

  def new
    authorize @category
    @category = Category.new
  end

  def create
    authorize @category
    @category = Category.new(category_params)
    @category.save
  end

  private

  def category_params
    params.require(:category).permit(:name)
  end
end
