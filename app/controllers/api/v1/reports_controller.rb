class Api::V1::ReportsController < ApplicationController
  respond_to :json
#skip_before_action :verify_authenticity_token
 
  def show
  
  end

  def index
  end
  def create
        r = Report.new
        r.entity = Entity.find(report_params['e_id'])
        r['status'] = 'unchecked'
        r['reason'] = report_params['reason']
        r.user = User.find(report_params['u_id'])
        r.save

  respond_to do |format|
      if r.save
        
        format.json { render :json=> {}, :status=> :created }
      else
        format.json { render :json=> @d.errors, :status=> :unprocessable_entity }
      end
  end 
  end
  def update

  end

  def destroy
 end
private

 def report_params
    params.require(:report).permit(:reason,:u_id,:e_id)
 end
 end