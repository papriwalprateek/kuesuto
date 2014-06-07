class Entity
  include Mongoid::Document 
  include Mongoid::Attributes::Dynamic 
  field :type, type: String
  field :addr, type: String
end