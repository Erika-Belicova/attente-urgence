Categories.destroy_all

Categories.create!([
  {name: "Urgences cardio-vasculaires"},
  {name: "Urgences respiratoires"},
  {name: "Urgences traumatiques"},
  {name: "Urgences neurologiques"},
  {name: "Urgences digestives"},
  {name: "Urgences pediatriques"},
  {name: "Urgences gynécologiques et obstétricales"},
  {name: "Urgences psychiatriques"},
  {name: },

])
p "Created #{Categories.count} categories"

# Hospitals.destroy_all

# Hospitals.create!([
#   {name: "Urgences cardio-vasculaires"},
#   {name: "Urgences respiratoires"},
#   {name: "Urgences traumatiques"},
#   {name: "Urgences neurologiques"},
#   {name: "Urgences digestives"},
#   {name: "Urgences pediatriques"},
#   {name: "Urgences gynécologiques et obstétricales"},
#   {name: "Urgences psychiatriques"},
#   {name: '', description: ''},

# ])

# Urgences cardio-vasculaires : infarctus, AVC, embolie pulmonaire
# Urgences respiratoires : asthme sévère, OBSTRUCTION des voies aériennes
# Urgences traumatiques : fractures, brûlures étendues, plaies profondes
# Urgences neurologiques : convulsions, méningite, coma
# Urgences digestives : appendicite, occlusion intestinale, hémorragie digestive
# Urgences pediatriques
# Urgences gynécologiques et obstétricales
# Urgences psychiatriques
