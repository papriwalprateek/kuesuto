class Autocomplete
	include Mongoid::Document
    include Mongoid::Attributes::Dynamic 
<<<<<<< HEAD
	field :value, type: String
=======
	field :value, type: Array
>>>>>>> master
end