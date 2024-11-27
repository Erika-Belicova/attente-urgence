class HospitalsController < ApplicationController
  def index
    authorize @hospitals
    @hospitals = Hospital.all
  end

  def show
    authorize @hospital
    @hospital = Hospital.find(params[:id])
  end

  def new
    authorize @hospital
    @hospital = Hospital.new
  end

  def create
    authorize @hospital
    @hospital = Hospital.new(params[:hospital])
    @hopital.save
  end

  private

  def hospital_params
    params.require(:hospital).permit(:name, :address, :doctor_nb, :latitude, :longitude)
  end
end
