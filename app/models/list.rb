class List
  include Mongoid::Document  
  field :name, type: String
  field :creator, type: String, default: "dq"
  has_and_belongs_to_many :entities
  
  def es
	  #self.entities.pluck(:name)
       self.entities.map{ |x| {"name"=>x.name,"url"=>self.name+'/'+x.name}}
       # self.entities.reduce({}){|agg,x| agg.merge(x.name => x.query)}
  end
end