class Api::V1::ListsController < ApplicationController
  respond_to :json
skip_before_action :verify_authenticity_token
  def index
  @f = {"error"=>"not found"}
 
  if params[:l_name]
    l  = List.where("creator"=>"dq").find_by("name"=>params[:l_name])
       
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
  end
  
  
  
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  def create
  end
private

 # def entity_params
  #  params.require(:entity).permit(:type)
  #end
 end