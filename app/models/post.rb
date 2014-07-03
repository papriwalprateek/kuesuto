class Post
	include Mongoid::Document
	include Mongoid::Timestamps::Short # For c_at and u_at.
  	field :p_status, type: Boolean
  	field :content, type: String
  	field :e_id
  	def entity
  		e = Entity.find(self.e_id)
  		r = {}
  		r["name"] = e.name
  		q = e.query
  		r["properties"] = e.p_list.map{|k,v| {"title"=>k,"url"=>q+"/i:"+k} if(v!=0)}.compact
  		r["add_k"] = e.query+"/i:add"
  		return r
  	end
  	def self.k_board
  		 #self.entities.pluck(:name)
        Post.where(:p_status=>true).map{ |x| {"content"=>x.content,"e_content"=>x.entity}}
       # self.entities.reduce({}){|agg,x| agg.merge(x.name => x.query)}
  	end
end