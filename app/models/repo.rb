class Repo
  include Mongoid::Document  
  field :type, type: String
  field :addr, type: String
end