class Category < ApplicationRecord
  has_many :appointments, dependent: :destroy
  has_many :hospitals_categories, dependent: :destroy

  validates :name, presence: true
end
