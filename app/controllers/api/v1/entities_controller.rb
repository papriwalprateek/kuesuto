class Api::V1::EntitiesController < ApplicationController
  respond_to :json
skip_before_action :verify_authenticity_token
before_filter :restrict_access, only: :create
  def index
    
  @f=get_contents(params[:addr])
  @f = @f.merge({"query"=>params[:addr]})
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  def create
    r=params[:p]
    r['review_status']='under_review'
    r['author_id']=@user.id
    r['author']=@user.name
    puts r
    x=commit_content(r)
     respond_to do |format|
        format.json {render :json => x}
      end
  end
private
def restrict_access
  authenticate_or_request_with_http_token do |token, options|
   @user =  User.find_by(oauth_token: token)
  end
  
end

  def entity_params
    params.require(:entity).permit(:type)
  end
 end