class Entity
  include Mongoid::Document 
  include Mongoid::Attributes::Dynamic 
  field :type, type: String
  field :addr, type: String
  has_and_belongs_to_many :lists
  has_many :reports
end