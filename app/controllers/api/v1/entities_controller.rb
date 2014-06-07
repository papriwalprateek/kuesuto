class Api::V1::EntitiesController < ApplicationController
  respond_to :json
skip_before_action :verify_authenticity_token
  def index
    
  @f=get_contents(params[:addr])
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  def create
    puts params[:p]
    sleep(1);
     respond_to do |format|
        format.json {render :json => {}}
      end
  end
private

  def entity_params
    params.require(:entity).permit(:type)
  end
 end