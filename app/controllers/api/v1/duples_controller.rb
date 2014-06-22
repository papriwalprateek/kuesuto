class Api::V1::DuplesController < ApplicationController
  respond_to :json
#skip_before_action :verify_authenticity_token
 
  def show
    @d = Duple.find(params[:id])
    s = {"id"=>@d.id.to_s,"name"=>@d.name,"parentId"=>@d.parent_id.to_s,"parentType"=>par_type(@d.parent_type),'value'=>@d.value}
       
    respond_to do |format|
      format.json {render :json => s}
    end
  end

  def index
  @f = current_user.duples
  @f = {"duples"=>@f}
  respond_to do |format|
    format.json {render :json => @f}
  end
  end
  def create
    para = params[:duple]
    if(para[:parentType]=="profile")
      t = "User"
      d = User.find(para[:parent]).id    
    else
      t = "Space"
      d = Space.find(para[:parent]).id
    end
  @d = Duple.create(:parent_type=>t,:parent_id=>d,:name=>para[:name],:value=>para[:value])
  #d = Duple.create(params[:duple])
  #d.save
  respond_to do |format|
      if @d.save
          @s = {"id"=>@d.id.to_s,"name"=>@d.name,"parentId"=>@d.parent_id.to_s,"parentType"=>par_type(@d.parent_type),'value'=>@d.value}
       
        format.json { render :json=> {"duple"=>@s}, :status=> :created }
      else
        format.json { render :json=> @d.errors, :status=> :unprocessable_entity }
      end
  end 
  end
  def update
    @d = Duple.find(params[:id])
    @u = {"name"=>params[:duple][:name],"value"=>params[:duple][:value]}
    respond_to do |format|
      if @d.update_attributes(@u)
        @s = {"id"=>@d.id.to_s,"name"=>@d.name,"parentId"=>@d.parent_id.to_s,"parentType"=>par_type(@d.parent_type),"value"=>@d.value}
       
        format.json { render :json=>{"duple"=>@s}, status: :ok }
      else
        format.json { render :json=> @d.errors, :status=> 422 }
      end
    end
  end

  def destroy
     @d = Duple.find(params[:id])
    respond_to do |format|
      if @d.destroy
        @s = {"id"=>@d.id.to_s,"name"=>@d.name,"parentId"=>@d.parent_id.to_s,"parentType"=>par_type(@d.parent_type)}
        format.json { render :json=> {"duple"=>@s}, :status=> 204 }
      else
        format.json { render :json=> @d.errors, :status=> :unprocessable_entity }
      end
    end
  end
private
  def par_type(p)
    if (p=="User")
      return "Profile"
    else
      return "Space"
    end
  end
 def duple_params
    params.require(:duple).permit(:name,:parentId,:parentType,:value => [])
 end
 end