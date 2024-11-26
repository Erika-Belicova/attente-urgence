class AddCategoryToAppointments < ActiveRecord::Migration[7.1]
  def change
    add_reference :appointments, :category, null: false, foreign_key: true
  end
end
