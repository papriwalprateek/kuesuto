class Api::V1::SpacesController < ApplicationController
  respond_to :json
skip_before_action :verify_authenticity_token
 
  def show
    d = Space.find(params[:id])
    respond_to do |format|
      format.json {render :json => d}
    end
  end

  def index
  @f = current_user.spaces
  @f = {"spaces"=>@f}
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  
  def create
  d = Space.create(:name=>params[:name],:short_desc=>params[:short_desc])
  d.user = User.find(params[:user_id])
  #d = Duple.create(params[:duple])
  d.save
  respond_to do |format|
  
    format.json {render :json => {}}
  end
  end
private

 def space_params
    params.require(:duple).permit(:name,:short_desc,:user_id)
 end
 end