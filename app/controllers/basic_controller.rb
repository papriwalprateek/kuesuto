class BasicController < ApplicationController
  def show
    #@e  = Entity.find_by("name"=>/bubble/i)
    #@mc = Entity.find_by("type"=>@e.type+"/crawler")
    #eval(@mc["code"])
    if params[:q]
      @query = params[:q]
     # @e  = Entity.find_by("name"=>/#{@query}/i)
    #@mc = Entity.find_by("type"=>@e.type+"/crawler")
    #eval(@mc["code"])
    end
  end

end
