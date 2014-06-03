
#needs link of webpage stored in source
require "dq-readability"
#def webpages_read(a)
a=property_url    
begin
out = DQReadability::Document.new(a,:tags=>%w[div pre p h1 h2 h3 h4 td table tr b a img br li ul ol center br hr blockquote em strong sub sup font tbody tt span dl dd t code figure fieldset legend dir noscript textarea], :attributes=>%w[href src align width color height], :math=>!@mobile).content
rescue OpenURI::HTTPError
    l = "http://web.archive.org/web/20140215060902/"+a
out = DQReadability::Document.new(l,:tags=>%w[div pre p h1 h2 h3 h4 td table tr b a img br li ul ol center br hr blockquote em strong sub sup font tbody tt span dl dd t code figure fieldset legend dir noscript textarea], :attributes=>%w[href src align width color height], :math=>!@mobile).content
end