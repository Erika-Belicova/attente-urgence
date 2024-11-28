# Clear existing records
HospitalCategory.destroy_all
Category.destroy_all
Hospital.destroy_all

# Create categories
categories = Category.create!([
  { name: "Cardiologie" },
  { name: "Pneumologie" },
  { name: "Traumatologie" },
  { name: "Neurologie" },
  { name: "Gastroentérologie" },
  { name: "Pédiatrie" },
  { name: "Gynécologiques" },
  { name: "Psychiatrie" }
])

p "Created #{Category.count} categories"

# Create hospitals
hospitals = Hospital.create!([
  {
    name: "Hôpital Purpan Urgences",
    address: "1 Pl. du Dr Joseph Baylac, 31300 Toulouse",
    doctor_nb: 20,
    latitude: "43.608888630492004",
    longitude: "1.4014851981476228"
  },
  {
    name: "Hôpital Paule De Viguier",
    address: "330 Avenue de Grande Bretagne, 31300 Toulouse",
    doctor_nb: 15,
    latitude: "43.60887956736012",
    longitude: "1.4030678441802693"
  },
  { name: "Hôpital Pierre Paul Riquet Toulouse",
    address: "Av. du Professeur Jean Dausset, 31300 Toulouse",
    doctor_nb: 15,
    latitude: "43.609937806253704",
    longitude: "1.4002308134918389"
  },

  { name: "Hôpital Rangueil",
    address: "1 Av. du Professeur Jean Poulhès, 31400 Toulouse",
    doctor_nb: 13,
    latitude: "43.559095057758164",
    longitude: "1.4535444355819729"
  },

  { name: "Clinique Ambroise Paré",
    address: "387 Rte de Saint-Simon, 31100 Toulouse",
    doctor_nb: 12,
    latitude: "43.589635431947436",
    longitude: "1.4140508797622424"
  },

  { name: "Hôpital Joseph Ducuing",
    address: "15 Rue Varsovie, 31300 Toulouse",
    doctor_nb: 15,
    latitude: "43.596801204281284",
    longitude: "1.4297290189621883"
  },

  { name: "Hôpital Larrey",
    address: "24  Chem. de Pouvourville, 31400 Toulouse",
    doctor_nb: 10,
    latitude: "43.55274110797328",
    longitude: "1.4528204140666308"
  },

  { name: "Clinique La Coix du Sud",
    address: "52 Chem. de Ribaute, 31130 Quint-Fonsegrives",
    doctor_nb: 15,
    latitude: "43.58409277782023",
    longitude: "1.5084919188912003"
  },

  { name: "Clinique de l'Union",
    address: "Bd de Ratalens, 31240 Saint-Jean",
    doctor_nb: 15,
    latitude: "43.649903764975086",
    longitude: "1.5237243103819809"
  },

  {  name: "Clinique Rive Gauche",
     address: "49 All. Charles de Fitte, 31300 Toulouse",
     doctor_nb: 15,
     latitude:"43.59690695816545",
     longitude:"1.431340073011936"
    }
])

p "Created #{Hospital.count} hospitals"

# Associate multiple categories with each hospital
hospitals.each_with_index do |hospital, index|
  # Assign a mix of categories to each hospital
  selected_categories = categories.sample(4) # Randomly pick 3 categories for each hospital
  selected_categories.each do |category|
    HospitalCategory.create!(
      hospital: hospital,
      category: category
    )
  end
end

p "Created #{HospitalCategory.count} hospital-category associations"
