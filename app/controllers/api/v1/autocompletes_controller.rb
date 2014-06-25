class Api::V1::AutocompletesController < ApplicationController
  def index
	if(params[:query])
	query = Regexp.new(params[:query],'i')
	#x = Duple.where(name:query)
	#@f = {}
	#@f['duples'] = x
	
	#x = Space.where(name:query)
	#@f['spaces'] = x

	r = Regexp.new(/dq\/[A-Za-z0-9]+$/) # search in the dq repositories only
	x = Entity.where(type:r).where(name:query)
	
	carrier = []
	#valid_keys = ['_id','addr','name','type']
	parsed = JSON.parse(x.to_json)
	parsed.each do |p|
	#	carrier << p.slice(*valid_keys)
		carrier << {"value"=>p["name"],"data"=>p["addr"]}
	end
	
	else
		carrier = Entity.where("isleaf"=>true).all.map{ |x| {"value"=>x.name,"data"=>"repo/"+x.query,"type"=>"Entity"}}
		
		collect = Entity.where("isleaf"=>true).all

		collect.each do |l|
			l.p_list.each do |k,v|
				if v!=0
				y = {"value"=>l.name+" "+k,"data"=>"repo/"+l.query+"/i:"+k,"type"=>"Knowledge Item"}
				carrier << y
				end
			end
		end

		lists = List.all
		lists.each do |l|
			y = {"value"=>l.name,"data"=>"list/"+l.name,"type"=>"List"}
			carrier << y
		end

	end	
	#@f['query'] = params[:query]
		@f = carrier
	
	respond_to do |format|
		format.json {render :json => @f}
	end
  end

end
