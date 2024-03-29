Rails.application.routes.draw do
  resources :reports

 get 'showa' => 'basic#showa'
  get 'repo/:repo'=>'repo#show'
  get 'ember' => 'basic#ember_test'
constraints subdomain: "algorithm" do   
  get "/" => redirect { |params| "http://www.daqwest.com" }
end 

get '/',to: 'repo#generic'
get '/repo/*path',to:'repo#generic'
get '/repo',to:'repo#generic'
get '/list',to: 'repo#generic'
get '/list/*path',to: 'repo#generic'
get '/bin',to: 'repo#generic'
get '/contributions',to: 'repo#generic'
get '/me', to:'repo#generic'
  get 'test' => 'test#show'
match 'auth/:provider/callback', to: 'sessions#create', via: [:get, :post]
match 'auth/failure', to: redirect('/'), via: [:get, :post]
match 'signout', to: 'sessions#destroy', as: 'signout', via: [:get, :post]
match '/search', to: 'basic#show', via: [:get, :post]
  # The priority is based upon order of creation: first created -> highest priority.
  # See how all your routes lay out with "rake routes".

  # You can have the root of your site routed with "root"
   root 'basic#show'

  # Example of regular route:
  #   get 'products/:id' => 'catalog#view'

  # Example of named route that can be invoked with purchase_url(id: product.id)
  #   get 'products/:id/purchase' => 'catalog#purchase', as: :purchase

  # Example resource route (maps HTTP verbs to controller actions automatically):
  #   resources :products

  # Example resource route with options:
  #   resources :products do
  #     member do
  #       get 'short'
  #       post 'toggle'
  #     end
  #
  #     collection do
  #       get 'sold'
  #     end
  #   end

  # Example resource route with sub-resources:
  #   resources :products do
  #     resources :comments, :sales
  #     resource :seller
  #   end

  # Example resource route with more complex sub-resources:
  #   resources :products do
  #     resources :comments
  #     resources :sales do
  #       get 'recent', on: :collection
  #     end
  #   end

  # Example resource route with concerns:
  #   concern :toggleable do
  #     post 'toggle'
  #   end
  #   resources :posts, concerns: :toggleable
  #   resources :photos, concerns: :toggleable

  # Example resource route within a namespace:
  #   namespace :admin do
  #     # Directs /admin/products/* to Admin::ProductsController
  #     # (app/controllers/admin/products_controller.rb)
  #     resources :products
  #   end
  namespace :api do
    namespace :v1 do
      resources :entities, only: [:index,:create]
      resources :lists, only:[:index,:create]
      resources :profiles, only:[:index,:create,:show]
      resources :duples, only:[:index,:create,:show,:destroy,:update]
      resources :spaces, only:[:index,:create,:show,:destroy]
      resources :autocompletes, only:[:index]
      resources :reports, only:[:create]
      resources :posts, only:[:index,:create]##post create is used for feedback creating now
    end
  end
end