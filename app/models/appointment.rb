class Appointment < ApplicationRecord
  belongs_to :hospital
  belongs_to :patient
  belongs_to :category

  validates :hospital_id, presence: true
  validates :patient_id, presence: true
  # validates :category_id, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates :checked_in_patient, inclusion: { in: [true, false] }
end
