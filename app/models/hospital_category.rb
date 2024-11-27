class HospitalCategory < ApplicationRecord
  belongs_to :hospital
  belongs_to :category
end
