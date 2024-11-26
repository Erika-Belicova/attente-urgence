class AddFirstNameToPatients < ActiveRecord::Migration[7.1]
  def change
    add_column :patients, :first_name, :string
  end
end
