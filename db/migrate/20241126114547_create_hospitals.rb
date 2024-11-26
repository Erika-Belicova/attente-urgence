class CreateHospitals < ActiveRecord::Migration[7.1]
  def change
    create_table :hospitals do |t|
      t.string :name
      t.string :address
      t.integer :doctor_nb
      t.integer :latitude
      t.integer :longitude
      t.timestamps
    end
  end
end
