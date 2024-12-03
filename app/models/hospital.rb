class Hospital < ApplicationRecord
  # has_many :hospital_categories, through: :hospital_categories, dependent: :destroy
  has_many :hospital_categories
  has_many :categories, through: :hospital_categories
  has_many :appointments, dependent: :destroy
  has_one_attached :photo

  validates :name, uniqueness: { scope: :address }
  validates :name, presence: true
  validates :address, presence: true
  validates :latitude, presence: true
  validates :longitude, presence: true
  validates_length_of :name, minimum: 2, message: "doit contenir au moins 2 caractères"
  validates_length_of :address, minimum: 6, message: "doit contenir au moins 6 caractères"
  geocoded_by :address
  after_validation :geocode, if: :will_save_change_to_address?
end
