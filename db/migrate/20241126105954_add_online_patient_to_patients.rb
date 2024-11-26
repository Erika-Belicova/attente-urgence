class AddOnlinePatientToPatients < ActiveRecord::Migration[7.1]
  def change
    add_column :patients, :online_patient, :boolean, default: true
  end
end
