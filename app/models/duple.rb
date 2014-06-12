class Duple
  include Mongoid::Document
  field :name, type: String
  field :value, type: Array
  belongs_to :parent, polymorphic: true 
  
  #need to create it with .create(:parent=> parent) or update by changing both parent_id and parent_type manually
end