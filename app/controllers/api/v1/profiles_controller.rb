class Api::V1::ProfilesController < ApplicationController
#before_filter :restrict_access
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
  def show
  @user = User.find(params[:id])
  @x = {}
  @x['profile'] = {}
  @x['spaces'] = []
  @x['duples'] = []
  @x['profile']['id'] = @user.id.to_s
  @x['profile']['name'] = @user.name
  @x['profile']['spaces'] = []
  @x['profile']['duples'] = []
  
  @user.spaces.each do |s|
  @x['profile']['spaces'] << s.id.to_s
  temp = {}
  temp['id'] = s.id.to_s
  temp['name'] = s.name
  temp['short_desc'] = s.short_desc
  temp['duples'] = []
  s.duples.each do |d|
    tem = {}
    tem['id'] = d.id.to_s
    tem['name'] = d.name
    tem['value'] = d.value
    tem['parentType'] = "Space"
    tem['parentId'] = d.parent_id.to_s
    @x['duples'] << tem
    temp['duples'] << d.id.to_s
  end
  @x['spaces'] << temp
  end
  
  @user.duples.each do |d|
  @x['profile']['duples'] << d.id.to_s
  temp = {}
  temp['id'] = d.id.to_s
  temp['name'] = d.name
  temp['value'] = d.value
  temp['parentType'] = "Profile"
  temp['parentId'] = d.parent_id.to_s
  @x['duples'] << temp
  end
  

  
  respond_to do |format|
    format.json {render :json => @x}
  end
  
  end
private
def restrict_access
  authenticate_or_request_with_http_token do |token, options|
   @user =  User.find_by(oauth_token: token)
  end
  
end
end