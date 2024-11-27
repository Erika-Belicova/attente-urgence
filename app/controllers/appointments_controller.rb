class AppointmentsController < ApplicationController
  def index
    @appointments = Appointment.all
    authorize @appointments
  end

  def show
    @appointment = Appointment.find(params[:id])
    @appointments = Appointment.all
    @waiting_list = []
    @appointments.each do |appointment|
      @waiting_list.push(appointment) if appointment.created_at <= @appointment.created_at
    end
    authorize @appointment
  end

  def new
    @appointment = Appointment.new
    authorize @appointment
  end

  def create
    @appointment = Appointment.new(appointment_params)
    @appointment.save
    authorize @appointment
  end

  def destroy
    @appointment = Appointment.find(params[:id])
    authorize @appointment
    @appointment.destroy

    redirect_to appointments_path, status: :see_other
  end

  private

  def appointment_params
    params.require(:appointment).permit(:name)
  end
end
