class Api::V1::ProfilesController < ApplicationController
before_filter :restrict_access
  respond_to :json
skip_before_action :verify_authenticity_token
  def index
 # @user = User.first
  @f = @user.duples
  @s = []
  @user.spaces.each do |s|
    d = s.attributes
    ss = d.merge({"duples"=>s.duples})
    @s<<ss
  end
  @f = {"user"=>@user,"duples"=>@f,"spaces"=>@s}
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