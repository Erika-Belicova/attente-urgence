class RemoveCategoryReferenceFromHospital < ActiveRecord::Migration[7.1]
  def change
    remove_reference :hospitals, :category, index: true
  end
end
