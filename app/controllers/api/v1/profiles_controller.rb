class Api::V1::ProfilesController < ApplicationController
before_filter :restrict_access
  respond_to :json
skip_before_action :verify_authenticity_token
  def index
  @f = @user.duples
  @f = {"user"=>@user,"duples"=>@f}
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  def create
  end
private
def restrict_access
  authenticate_or_request_with_http_token do |token, options|
   @user =  User.find_by(oauth_token: token)
  end
  
end
end