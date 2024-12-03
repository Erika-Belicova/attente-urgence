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

    # test start

    @time_per_patient = 20
    @waiting_time = @waiting_list.length * @time_per_patient

    @start_time = Time.now.utc

    @end_time = @start_time + @waiting_time.minutes

    # Convert both times to ISO8601 format (compatible with JavaScript's Date object)
    @start_time_iso = @start_time.iso8601
    @end_time_iso = @end_time.iso8601

    # test end
    authorize @appointment

  end

  def new
    @appointment = Appointment.new
    authorize @appointment
  end

  def create

    @appointment = Appointment.new
    @hospital = Hospital.find(params[:hospital_id])
    @appointment.hospital = @hospital
    @appointment.category = Category.find_by(name: params[:category]) || @hospital.categories.first
    @appointment.patient = current_patient
    @appointment.latitude = @hospital.latitude
    @appointment.longitude = @hospital.longitude
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
    longitude = Appointment.find(params[:appointment_id]).hospital.longitude
    latitude = Appointment.find(params[:appointment_id]).hospital.latitude
    @marker = {
      lat: latitude,
      lng: longitude,
    }
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
