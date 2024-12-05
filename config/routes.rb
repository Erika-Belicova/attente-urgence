Rails.application.routes.draw do
  devise_for :patients
  root to: "pages#home"
  # get "hospitals", to: "hospitals#index"
  # get "hospitals/:id", to: "hospitals#show"
  # get "hospitals/new", to: "hospitals#new", as: :new_hospital
  # post "hospitals", to: "hospitals#create"
  # Define your application routes per the DSL in https://guides.rubyonrails.org/routing.html

  # Reveal health status on /up that returns 200 if the app boots with no exceptions, otherwise 500.
  # Can be used by load balancers and uptime monitors to verify that the app is live.
  # get "up" => "rails/health#show", as: :rails_health_check

  # Defines the root path route ("/")
  # root "posts#index"

  get "style", to: "pages#style"

  resources :patients
  resources :categories, only: [:index, :new, :create]
  resources :hospitals_categories, only: [:index]
  resources :appointments, only: [:index, :new, :create, :show, :destroy] do
    get "map", to: "appointments#map", as: "map"
    get "arrived", to: "appointments#arrived", as: "arrived"
    member do
      delete :delete_from_queue
    end
  end
  resources :hospitals, only: [:index, :show, :new, :create]
end
