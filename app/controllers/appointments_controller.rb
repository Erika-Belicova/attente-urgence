class AppointmentsController < ApplicationController
  before_action :set_appointment, only: [:destroy, :map, :arrived]

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
    # count = 10
    # if count != 0
    #   sleep 10
    # end

    authorize @appointment
  end

  def new
    @appointment = Appointment.new
    authorize @appointment
  end

  def create
    @appointment = Appointment.new

    @appointment.hospital = Hospital.last
    @appointment.category = Category.last
    @appointment.patient = current_patient
    @appointment.latitude = 1.0
    @appointment.longitude = 1.0
    @appointment.checked_in_patient = false
    @appointment.save!
    @id = @appointment.id
    authorize @appointment
    redirect_to appointment_path(@appointment)
  end

  def destroy
    authorize @appointment
    @appointment.destroy

    redirect_to appointments_path, status: :see_other
  end

  def map
    # @appointment.longitude
    # @appointment.latitude
  end

  def arrived
    @patient = current_patient
    # @appointment.checked_in_patient
  end

  private

  def set_appointment
    @appointment = Appointment.find_by(@id)
  end
end
