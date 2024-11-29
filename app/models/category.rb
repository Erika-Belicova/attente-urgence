class Category < ApplicationRecord
  has_many :appointments, dependent: :destroy
  # has_many :hospital_categories, dependent: :destroy
  has_many :hospitals, through: :hospital_categories

  validates :name, presence: true
end
