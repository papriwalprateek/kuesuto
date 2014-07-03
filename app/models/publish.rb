class Publish
	include Mongoid::Document
	include Mongoid::Attributes::Dynamic
	include Mongoid::Timestamps::Short # For c_at and u_at.
  	field :publish_status, type: Boolean
  	field :reason, type: String
  	belongs_to :entity 
  	belongs_to :user
end