class BasicController < ApplicationController
  
def ember_test
  
end
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

def showa
        puts 'hi'
        @f=get_contents(params[:q])
  respond_to do |format|
    format.json {render :json => @f}
  end
end
 
end