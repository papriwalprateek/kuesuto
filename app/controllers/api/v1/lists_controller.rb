class Api::V1::ListsController < ApplicationController
  respond_to :json
skip_before_action :verify_authenticity_token
  def index
  @f = {"error"=>"not found"}
 
  if params[:l_name]
    l  = List.find_by("name"=>params[:l_name])
       
    if l
      if params[:e_name]  #entity in the list is needed
       e = l.entities.find_by("name"=>/^#{Regexp.escape(params[:e_name])}$/i)
       if e
          @f = {"has"=> "tiles"}.merge(get_tiles(e))
       end
      else #only list is needed
          @f = {"has"=>"list","list"=>l.es}      
      end
    end
  elsif params[:all]
    l = List.all.map{ |x| {"name"=>x.name,"entities_count"=>x.entities.count,"creator"=>x.user.name}}
    @f = { "has" => "lists", "lists"=>l}
  end
    
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  def create
  para = params[:list]
  @l = List.create(:name=>para[:name])
  para[:entities].each do |et|
    e =  Entity.find_by('name'=>et)
    if e
      @l.entities.push(e)
    end
  end
  @l.user = User.find(para[:user])
  respond_to do |format|
      if @l.save
        format.json { render :json=> {"list"=>@l}, :status=> :created }
      else
        format.json { render :json=> @d.errors, :status=> :unprocessable_entity }
      end
  end 
  
  end
private

 # def entity_params
  #  params.require(:entity).permit(:type)
  #end
 end