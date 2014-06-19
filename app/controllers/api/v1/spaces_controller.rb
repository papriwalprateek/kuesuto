class Api::V1::SpacesController < ApplicationController
  respond_to :json
skip_before_action :verify_authenticity_token
 
  def show
    d = Space.find(params[:id])
    respond_to do |format|
      format.json {render :json => d}
    end
  end

  def index
  @f = current_user.spaces
  @f = {"spaces"=>@f}
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  
  def create
  para = params[:space]
  @d = Space.create(:name=>para[:name],:short_desc=>para[:short_desc])
  @d.user = User.find(para[:userId])
  #d = Duple.create(params[:duple])
  
  respond_to do |format|
      if @d.save
        @d.id = @d.id.to_s
        @s = @d.attributes.merge({"id"=>@d.id.to_s})
        @s['profileId'] = @d.user_id.to_s
        puts @s
        format.json { render :json=> {"space"=>@s}, :status=> :created }
      else
        format.json { render :json=> @d.errors, :status=> :unprocessable_entity }
      end
  end 
  
  end
  def destroy
    @d = Space.find(params[:id])
    respond_to do |format|
      if @d.destroy
        @s = {"id"=>@d.id.to_s}.merge(@d.attributes)

        format.json { render :json=> {"space"=>@s}, :status=> 204 }
      else
        format.json { render :json=> @d.errors, :status=> :unprocessable_entity }
      end
    end
  end
private

 def space_params
    params.require(:space).permit(:name,:short_desc,:user_id)
 end
 end