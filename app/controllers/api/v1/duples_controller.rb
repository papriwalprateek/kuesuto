class Api::V1::DuplesController < ApplicationController
  respond_to :json
skip_before_action :verify_authenticity_token
 
  def show
    d = Duple.find(params[:id])
    respond_to do |format|
      format.json {render :json => d}
    end
  end

  def index
  @f = current_user.duples
  @f = {"duples"=>@f}
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  def create
    puts params[:duple]
  d = Duple.create(:parent_type=>"User",:parent_id=>User.find(params[:parent_id]).id,:name=>params[:name],:value=>params[:value])
  #d = Duple.create(params[:duple])
  d.save
  respond_to do |format|
  
    format.json {render :json => {}}
  end
  end
private

 def duple_params
    params.require(:duple).permit(:name,:value,:parent_id,:parent_type)
 end
 end