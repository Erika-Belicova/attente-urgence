class HospitalsCategories < ApplicationRecord
  belongs_to :hospital
  belongs_to :category
end
