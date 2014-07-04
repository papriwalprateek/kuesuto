class DqMailer < ActionMailer::Base
 include SendGrid
 default :from => "DaQwest <noreply@daqwest.com>"
  def feedback(user,content)
    @content = content
    @user = user
    @url  = "http://www.daqwest.com/"
    mail(:to => "vinayrajchoudhary@gmail.com", :subject => "Feedback at DQ")
    
  end
 end