class Api::V1::EntitiesController < ApplicationController
  respond_to :json

  def index
    addr = params[:addr]
    
    if params[:addr]=="bubble sort"
      has = "card"
    else
      has = "list"
    end
   @out = {"entities"=> [{"type"=>addr+"a","name"=>"Sequence Sorting","id"=>4},
                          {"type"=>addr,"name"=>"Sequence Sorting","id"=>3},
                          {"type"=>addr,"name"=>"Sequence Sorting","id"=>2}
                         ],
           "has"=>has
      }
    respond_to do |format|
      format.json { render :json => @out}
    end
  end
private

  def entity_params
    params.require(:entity).permit(:type)
  end
 end