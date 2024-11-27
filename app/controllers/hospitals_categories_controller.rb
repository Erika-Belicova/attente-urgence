class HospitalsCategoriesController < ApplicationController
  def index
    @hospitals_categories = HospitalCategory.all
    authorize @hospitals_categories
  end
end
