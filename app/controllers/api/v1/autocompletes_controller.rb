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
		carrier << {"v"=>p["name"],"d"=>p["addr"]}
	end
	
	else
		af = Autocomplete.first
		if(!af)
			carrier = Entity.where("isleaf"=>true).all.map{ |x| {"v"=>x.name,"d"=>"repo/"+x.query,"t"=>"e"}}
		
			collect = Entity.where("isleaf"=>true).all

			collect.each do |l|
				l.p_list.each do |k,v|
					if v!=0
					y = {"v"=>l.name+" "+k,"d"=>"repo/"+l.query+"/i:"+k,"t"=>"k"}
					carrier << y
					end
				end
			end

			lists = List.all
			lists.each do |l|
				y = {"v"=>l.name,"d"=>"list/"+l.name,"t"=>"l"}
				carrier << y
			end
			an = Autocomplete.new
			an.value = carrier
			an.save
		else
			carrier = af.value
		end

	end	
	#@f['query'] = params[:query]
		@f = carrier
	
	respond_to do |format|
		format.json {render :json => @f}
	end
  end

end
