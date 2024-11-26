class RemoveCheckedInPatientFromAppointments < ActiveRecord::Migration[7.1]
  def change
    remove_column :appointments, :checked_in_patient, :boolean
  end
end
