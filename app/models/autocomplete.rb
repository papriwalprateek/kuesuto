class Autocomplete
	include Mongoid::Document
    include Mongoid::Attributes::Dynamic 
	field :value, type: Array
	field :addrs, type: Array
end