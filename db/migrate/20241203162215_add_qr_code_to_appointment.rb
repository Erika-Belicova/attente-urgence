class AddQrCodeToAppointment < ActiveRecord::Migration[7.1]
  def change
    add_column :appointments, :qr_code, :string
  end
end
