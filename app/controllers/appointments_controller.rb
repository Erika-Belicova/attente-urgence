class AppointmentsController < ApplicationController
  before_action :set_appointment, only: [:show, :destroy, :map, :arrived]

  def index
    @appointments = Appointment.all
    authorize @appointments
  end

  def appointment_params
    params.require(:appointment).permit(:name, :addres, :qd_code)
  end

  def show
    @appointments_hospital = @appointment.hospital.appointments
    @hospital = @appointment.hospital

    @waiting_list = []
    @appointments_hospital.each do |appointment|
      puts appointment
      @waiting_list.push(appointment) if appointment.created_at <= @appointment.created_at && appointment.hospital.id == @appointment.hospital.id && appointment.checked_in_patient == false
    end

    # @duration = hospital.distance_to([@latitude, @longitude]).round * 5
    @waiting_list = @waiting_list.sort_by(&:created_at)

    @leaves_queue = @waiting_list.select do |patient|
      patient.id != @appointment.id
    end.first
    # test start

    @time_per_patient = 20
    @waiting_time = (@waiting_list.length - 1) * @time_per_patient
    @start_time = Time.now.utc
    @end_time = @start_time + @waiting_time.minutes

    # Convert both times to ISO8601 format (compatible with JavaScript's Date object)
    @start_time_iso = @start_time.iso8601
    @end_time_iso = @end_time.iso8601



    #adding geolocation

    # @marker = {
    #   lat: @appointment.latitude,
    #   lng: @appointment.longitude,
    #   # info_window_html: render_to_string(partial: "info_window", locals: {hospital: @hospital})
    # }
    # @latitude = params[:latitude].to_f
    # @longitude = params[:longitude].to_f

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
    @appointment.latitude = params[:latitude]
    @appointment.longitude = params[:longitude]
    @appointment.checked_in_patient = false
    @appointment.save!

    @id = @appointment.id
    authorize @appointment
    redirect_to appointment_path(@appointment)
  end

  def destroy
    @appointment = Appointment.find(params[:id])
    @appointment.checked_in_patient = true
    authorize @appointment
    @appointment.destroy

    redirect_to root_path, status: :see_other
  end

  def delete_from_queue
    if params[:leaves_id].present?
      @leaves_queue = Appointment.find(params[:leaves_id])
      @leaves_queue.destroy
    end

    # Recalculate the waiting list for the JavaScript update
    @appointment = Appointment.find(params[:appointment_id])
    @appointments_hospital = @appointment.hospital.appointments

    # Rebuild the waiting list logic (same as in `show`)
    @waiting_list = @appointments_hospital.select do |appointment|
      appointment.created_at <= @appointment.created_at &&
        appointment.hospital.id == @appointment.hospital.id &&
        !appointment.checked_in_patient
    end.sort_by(&:created_at)

    # Remove the appointment if it's not the primary one
    @leaves_queue = @waiting_list.reject { |patient| patient.id == @appointment.id }.first

    redirect_to appointment_path(@appointment)
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
    @id = @appointment.id
    @patient = current_patient
    @qr_code = RQRCode::QRCode.new(@appointment.id.to_s)
    @svg = @qr_code.as_svg(
      offset: 0,
      color: '000',
      shape_rendering: 'crispEdges',
      standalone: true
    )
    # @appointment.checked_in_patient
  end

  private

  def set_appointment
    # @appointment = Appointment.find_by(@id)
    @appointment = if params[:id]
                      Appointment.find(params[:id])
                    elsif params[:appointment_id]
                      Appointment.find(params[:appointment_id])
                    else
                      raise ActiveRecord::RecordNotFound, "Appointment ID not provided"
                   end
  end
end
