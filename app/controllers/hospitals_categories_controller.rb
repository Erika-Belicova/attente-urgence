class HospitalsCategoriesController < ApplicationController
  def index
    authorize @hospitals_categories
    @hospitals_categories = HospitalCategory.all
  end
end
