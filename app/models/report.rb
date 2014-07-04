class Report
	include Mongoid::Document
	include Mongoid::Timestamps::Short # For c_at and u_at.
  	field :status, type: String
  	field :reason, type: String
  	belongs_to :entity 
  	belongs_to :user
end