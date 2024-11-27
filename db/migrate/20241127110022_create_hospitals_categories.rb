class CreateHospitalsCategories < ActiveRecord::Migration[7.1]
  def change
    create_table :hospitals_categories do |t|
      t.references :hospital, null: false, foreign_key: true
      t.references :category, null: false, foreign_key: true

      t.timestamps
    end
  end
end
