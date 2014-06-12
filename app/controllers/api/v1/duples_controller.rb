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
  end
private

 # def entity_params
  #  params.require(:entity).permit(:type)
  #end
 end