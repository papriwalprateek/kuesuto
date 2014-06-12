class Space
  include Mongoid::Document  
  field :name, type: String
  field :short_desc, type: String
  has_many :duples, as: :parent
  belongs_to :user
  
end