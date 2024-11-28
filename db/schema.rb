# This file is auto-generated from the current state of the database. Instead
# of editing this file, please use the migrations feature of Active Record to
# incrementally modify your database, and then regenerate this schema definition.
#
# This file is the source Rails uses to define your schema when running `bin/rails
# db:schema:load`. When creating a new database, `bin/rails db:schema:load` tends to
# be faster and is potentially less error prone than running all of your
# migrations from scratch. Old migrations may fail to apply correctly if those
# migrations use external dependencies or application code.
#
# It's strongly recommended that you check this file into your version control system.

ActiveRecord::Schema[7.1].define(version: 2024_11_27_143414) do
  # These are extensions that must be enabled in order to support this database
  enable_extension "plpgsql"

  create_table "appointments", force: :cascade do |t|
    t.bigint "hospital_id", null: false
    t.bigint "patient_id", null: false
    t.integer "time_to_hospital"
    t.string "qr_code_url"
    t.float "latitude"
    t.float "longitude"
    t.datetime "appointment_time"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.bigint "category_id", null: false
    t.boolean "checked_in_patient", default: false
    t.index ["category_id"], name: "index_appointments_on_category_id"
    t.index ["hospital_id"], name: "index_appointments_on_hospital_id"
    t.index ["patient_id"], name: "index_appointments_on_patient_id"
  end

  create_table "categories", force: :cascade do |t|
    t.string "name"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
  end

  create_table "hospitals", force: :cascade do |t|
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "name"
    t.string "address"
    t.integer "doctor_nb"
    t.float "latitude"
    t.float "longitude"
    t.bigint "category_id"
    t.index ["category_id"], name: "index_hospitals_on_category_id"
  end

  create_table "hospitals_categories", force: :cascade do |t|
    t.bigint "hospital_id", null: false
    t.bigint "category_id", null: false
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.index ["category_id"], name: "index_hospitals_categories_on_category_id"
    t.index ["hospital_id"], name: "index_hospitals_categories_on_hospital_id"
  end

  create_table "patients", force: :cascade do |t|
    t.string "email", default: "", null: false
    t.string "encrypted_password", default: "", null: false
    t.string "reset_password_token"
    t.datetime "reset_password_sent_at"
    t.datetime "remember_created_at"
    t.datetime "created_at", null: false
    t.datetime "updated_at", null: false
    t.string "first_name"
    t.string "last_name"
    t.boolean "online_patient", default: true
    t.index ["email"], name: "index_patients_on_email", unique: true
    t.index ["reset_password_token"], name: "index_patients_on_reset_password_token", unique: true
  end

  add_foreign_key "appointments", "categories"
  add_foreign_key "appointments", "hospitals"
  add_foreign_key "appointments", "patients"
  add_foreign_key "hospitals_categories", "categories"
  add_foreign_key "hospitals_categories", "hospitals"
end
