# frozen_string_literal: true

Rails.application.routes.draw do
  get 'home/index'
  root to: 'home#index'
  get 'home/run_script'
  get 'center_coin/index'
  resources :rooms, only: %i[create show] do
    collection do
      post :join
    end
  end
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
