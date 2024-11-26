class AddCheckedInPatientToAppointments < ActiveRecord::Migration[7.1]
  def change
    add_column :appointments, :checked_in_patient, :boolean, default: false
  end
end
