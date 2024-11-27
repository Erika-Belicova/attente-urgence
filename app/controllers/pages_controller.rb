class PagesController < ApplicationController
  skip_before_action :authenticate_patient!, only: [ :home ]

  def index
    raise
  end

  def home
  end
end
