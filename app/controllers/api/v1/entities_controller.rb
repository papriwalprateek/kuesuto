class Api::V1::EntitiesController < ApplicationController
  respond_to :json

  def index
    
  @f=get_contents(params[:addr])
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
private

  def entity_params
    params.require(:entity).permit(:type)
  end
 end