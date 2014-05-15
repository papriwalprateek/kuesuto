class BasicController < ApplicationController
  def show
    #@e  = Entity.find_by("name"=>/bubble/i)
    #@mc = Entity.find_by("type"=>@e.type+"/crawler")
    #eval(@mc["code"])
    puts @current_user
  end
end
