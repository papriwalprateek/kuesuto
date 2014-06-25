class List
  include Mongoid::Document 
  include Mongoid::Timestamps::Short # For c_at and u_at. 
  field :name, type: String
  has_and_belongs_to_many :entities
  belongs_to :user
  
  def es
	  #self.entities.pluck(:name)
       self.entities.map{ |x| {"name"=>x.name,"url"=>self.name+'/'+x.name}}
       # self.entities.reduce({}){|agg,x| agg.merge(x.name => x.query)}
  end
end