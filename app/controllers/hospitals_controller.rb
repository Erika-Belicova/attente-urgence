class HospitalsController < ApplicationController
  # def index
  #   @hospitals = Hospital.all
  #   authorize @hospitals
  # end

  def index
    if params[:category].present?
      @hospitals = Hospital.joins(:categories).where(categories: { name: params[:category] })
    else
      @hospitals = Hospital.all
      authorize @hospitals
    end

  end


  def show
    @hospital = Hospital.find(params[:id])
    authorize @hospital
    @categories = @hospital.categories

    @marker = {
        lat: @hospital.latitude,
        lng: @hospital.longitude,
        # info_window_html: render_to_string(partial: "info_window", locals: {hospital: @hospital})
      }

  end

  def new
    @hospital = Hospital.new
    authorize @hospital
  end

  def create
    @hospital = Hospital.new(params[:hospital])
    @hospital.save
    authorize @hospital
  end

  private

  def hospital_params
    params.require(:hospital).permit(:name, :address, :doctor_nb, :latitude, :longitude)
  end
end
