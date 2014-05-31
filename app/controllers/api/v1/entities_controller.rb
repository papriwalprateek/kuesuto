class Api::V1::EntitiesController < ApplicationController
  respond_to :json

  def index
    addr = params[:addr]
    addr = addr.split("/dq/")[1]
    respond_with [
      {"type"=>addr,"name"=>"Sequence Sorting","id"=>4},
      {"type"=>addr,"name"=>"Sequence Sorting","id"=>3},
      {"type"=>addr,"name"=>"Sequence Sorting","id"=>2}
      ]

  end
private

  def entity_params
    params.require(:entity).permit(:type)
  end
 end