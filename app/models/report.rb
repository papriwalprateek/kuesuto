class Report
	include Mongoid::Document
  	field :status, type: String
  	field :reason, type: String
  	belongs_to :entity 
  	belongs_to :user
end