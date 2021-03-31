Rails.application.routes.draw do
  # get '/providers', to: 'providers#index'
  # resources :providers, only: [:index]
  resources :users, only: [] do
    collection do
      post :login
    end
  end

  resources :customers, only: [:create, :index]
  resources :providers, only: [:create, :update, :index, :destroy] do
    collection do
      get :valid_username
      get :valid_email
      get :search_provider
    end
  end
end
