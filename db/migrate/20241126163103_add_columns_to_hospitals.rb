class AddColumnsToHospitals < ActiveRecord::Migration[7.1]
  def change
    add_column :hospitals, :name, :string
    add_column :hospitals, :address, :string
    add_column :hospitals, :doctor_nb, :integer
    add_column :hospitals, :latitude, :float
    add_column :hospitals, :longitude, :float
  end
end
