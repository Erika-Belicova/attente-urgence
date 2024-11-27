class AddCategoriesHospitalsToHospitals < ActiveRecord::Migration[7.1]
  def change
    add_reference :hospitals, :category, index: true
  end
end
