class PagesController < ApplicationController
  skip_before_action :authenticate_patient!, only: [ :home ]

  def home
  end
end
