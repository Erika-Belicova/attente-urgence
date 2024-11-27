class PatientsController < ApplicationController
  def index
    authorize @patients
    @patients = Patient.all
  end

  def show
    authorize @patient
    @patient = Patient.find(params[:id])
  end

  def new
    authorize @patient
    @patient = Patient.new
  end

  def create
    authorize @patient
    @patient = Patient.new(params[:patient])
    @patient.save
  end

  def edit
    authorize @patient
    @patient = Patient.find(params[:id])
  end

  def update
    authorize @patient
    @patient = Patient.find(params[:id])
    @patient.update(patient_params)

    redirect_to patient_path(@patient)
  end

  def destroy
    authorize @patient
    @patient = Patient.find(params[:id])
    @patient.destroy

    redirect_to patients_path, status: :see_other
  end

  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :online_patient, :email)
  end
end
