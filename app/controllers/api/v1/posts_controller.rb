class Api::V1::PostsController < ApplicationController
  respond_to :json
#skip_before_action :verify_authenticity_token
 
  def show
  
  end

  def index
    @p = Post.k_board
    respond_to do |format|
     
        format.json { render :json=> @p, :status=> :created }
    
  end 
  end
  def create 
    DqMailer.feedback(User.find(params[:u_id]),params[:content]).deliver

  respond_to do |format|
        
        format.json { render :json=> {}, :status=> :created }
     
  end 
  end
  def update

  end

  def destroy
 end
private

 
 end