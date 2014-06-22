class Api::V1::SearchController < ApplicationController
  def index
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
	
	@f = carrier
	#@f['query'] = params[:query]

	respond_to do |format|
		format.json {render :json => @f}
	end
  end

end
