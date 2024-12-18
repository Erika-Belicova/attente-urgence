class HospitalsController < ApplicationController
  def index
    if params[:category].present?
      @hospitals = Hospital.joins(:categories).where(categories: { name: params[:category] })
    else
      @hospitals = Hospital.all
    end

    @latitude = params[:latitude].to_f
    @longitude = params[:longitude].to_f

    authorize @hospitals
    @time_per_patient = 20
  end

  def show
    @hospital = Hospital.find(params[:id])
    @time_per_patient = 20
    @appointments = Appointment.all
    @hospital.appointments = @appointments.select do |appointment|
                                                    appointment.hospital.id == @hospital.id
                                                  end
    authorize @hospital
    @categories = @hospital.categories

    @marker = {
        lat: @hospital.latitude,
        lng: @hospital.longitude,
        # info_window_html: render_to_string(partial: "info_window", locals: {hospital: @hospital})
      }

      @latitude = params[:latitude].to_f
      @longitude = params[:longitude].to_f
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
