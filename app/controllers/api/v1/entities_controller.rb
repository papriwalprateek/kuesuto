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
    r=params[:p]
    r['review_status']='under review'
    r['author']='raj'
    puts r
     respond_to do |format|
        format.json {render :json => r}
      end
  end
private

  def entity_params
    params.require(:entity).permit(:type)
  end
 end