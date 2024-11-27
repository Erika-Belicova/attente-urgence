class Hospital < ApplicationRecord
  has_many :hospital_categories, dependent: :destroy
  has_many :appointments, dependent: :destroy


  validates :name, uniqueness: { scope: :address }
  validates :name, presence: true
  validates :address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates_length_of :name, minimum: 2, message: "doit contenir au moins 2 caractères"
  validates_length_of :address, minimum: 6, message: "doit contenir au moins 6 caractères"
end
