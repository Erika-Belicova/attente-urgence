class PatientsController < ApplicationController
  def index
    @patients = Patient.all
    authorize @patients
  end

  def show
    @patient = Patient.find(params[:id])
    authorize @patient
  end

  def new
    @patient = Patient.new
    authorize @patient
  end

  def create
    @patient = Patient.new(params[:patient])
    @patient.save
    authorize @patient
  end

  def edit
    @patient = Patient.find(params[:id])
    authorize @patient
  end

  def update
    @patient = Patient.find(params[:id])
    authorize @patient
    @patient.update(patient_params)

    redirect_to patient_path(@patient)
  end

  def destroy
    @patient = Patient.find(params[:id])
    authorize @patient
    @patient.destroy

    redirect_to patients_path, status: :see_other
  end

  private

  def patient_params
    params.require(:patient).permit(:first_name, :last_name, :online_patient, :email)
  end
end
