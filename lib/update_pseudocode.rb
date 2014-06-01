## Attention creates new source entities for the wiki parts
puts 'hi'
count=0
Entity.where(type:'/dq/algorithm').each do |e|
        begin
    count=count+1
#if(count>25)
#e=Entity.find_by(name:/stooge/i)
    puts count
   @arr=[]
    e1=Entity.find(e['wiki'][0])
    e2=Entity.find_by(name_ref:'extraction for wikipedia')
    property_url=e1['url']
    dq_bind=binding()
    eval(e2['code'],dq_bind)
    property_list_old=e['property_list']
    e['property_list']=nil
    e.save
    e['property_list']=property_list_old
    if (@pseudocode != [] && @pseudocode!=nil)
        puts 'helo'
        k=0
        e['property_list'].each do |p|
            if p[0]=='pseudocode'
                e['property_list'][k]=['pseudocode',1]
                e.save
            end
            k=k+1
        end
        if e['pseudocode']==nil
            e['pseudocode']=[]
            temp=Entity.new
            else
            temp=e['pseudocode'][0]
        end
        temp["url"]=e1["url"]
        temp["title"]=e1["title"]
        temp["img_url"]=e1["img_url"]
        temp["prank"]=e1["prank"]
        temp.type="/dqs/pseudocode"
        temp["extraction_tech_id"]=e1["extraction_tech_id"]
        temp["cache"]=nil
        temp["cache_timestamp"]=nil
        temp.save
        temp['cache']=''
        puts @pseudocode.class
        @pseudocode.each do |node|
            s=node.to_html.html_safe
            temp["cache"]<<s
            temp["cache_timestamp"]=Time.now
        end
        temp.save
        e['pseudocode']=[]
        e['pseudocode']<<temp['_id']
        puts e['pseudocode']
        e.save
        temp['addr'] = e['addr']+"/"+e['name'].downcase+"/"+p[0].downcase+"/"+temp['_id'].to_s.downcase
        temp.save
        e.save
    end
    rescue
    File.open('log/mylog.log', 'a') {|f| f.write( Time.now.to_s) }
    File.open('log/mylog.log', 'a') {|f| f.write( e['name']+"update_propertycache.rb\n") }

    end
end