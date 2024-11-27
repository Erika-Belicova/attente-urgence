class AppointmentsController < ApplicationController
  def index
    authorize @appointments
    @appointments = Appointment.all
  end

  def show
    authorize @appointment
    @appointment = Appointment.find(params[:id])
  end

  def new
    authorize @appointment
    @appointment = Appointment.new
  end

  def create
    authorize @appointment
    @appointment = Appointment.new(appointment_params)
    @appointment.save
  end

  def destroy
    authorize @appointment
    @appointment = Appointment.find(params[:id])
    @appointment.destroy

    redirect_to appointments_path, status: :see_other
  end

  private

  def appointment_params
    params.require(:appointment).permit(:name)
  end
end
