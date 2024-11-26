class AddLastNameToPatients < ActiveRecord::Migration[7.1]
  def change
    add_column :patients, :last_name, :string
  end
end
