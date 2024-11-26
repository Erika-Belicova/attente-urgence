class CreateAppointments < ActiveRecord::Migration[7.1]
  def change
    create_table :appointments do |t|
      t.references :hospital, null: false, foreign_key: true
      t.references :patient, null: false, foreign_key: true
      t.integer :time_to_hospital
      t.string :qr_code_url
      t.boolean :checked_in_patient
      t.float :latitude
      t.float :longitude
      t.datetime :appointment_time

      t.timestamps
    end
  end
end
