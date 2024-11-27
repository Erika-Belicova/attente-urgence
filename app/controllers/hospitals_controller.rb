class HospitalsController < ApplicationController
  def index
    @hospitals = Hospital.all
    @patient = current_patient
    # @hospitals = policy_scope(Hospital)
  end

  def show
    @hospital = Hospital.find(params[:id])
    authorize @hospital
  end

  def new
    @hospital = Hospital.new
    authorize @hospital
  end

  def create
    @hospital = Hospital.new(params[:hospital])
    @hopital.save
    authorize @hospital
  end

  private

  def hospital_params
    params.require(:hospital).permit(:name, :address, :doctor_nb, :latitude, :longitude)
  end
end
