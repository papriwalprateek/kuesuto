count=0
puts 'hi'
property_a=['definition','algorithm','complexity','math_analysis','pseudocode']
property_b=['article','wiki','code','video','description']
ext_wiki=Entity.find_by(name_ref:'extraction for wikipedia')
id_gen=Entity.find_by(name_ref:'extraction for webpages')['_id']
Entity.where(type:'/dq/algorithm').where(cached_new:false).each do |e|
#A8.each do |e|
    puts ' '
    print(count.to_s+' '+e['name'])
    count=count+1
if count>0    
if true
        e['property_list']='hi'
        e['cached_new']=false
        property_a.each do |p|
            if(e[p] != nil)
                if e[p].length==0
                    e[p]=nil
                end
            end
        end
        e.save
        begin
            e['property_list']=[]
            @arr=[]
            e_wiki=Entity.find(e['wiki'][0])
            prank=e_wiki['prank']
            property_url=e_wiki['url']
            property_title=e_wiki['title']
            property_img_url=e_wiki['img_url']
            dq_bind=binding()
            eval(ext_wiki['code'],dq_bind)
            property_a.each do |property|
                print property
                request_out=[]
                dq_bind=binding()
                present=Entity.find(ext_wiki['presentation'])
                eval(present['code'],dq_bind)
                if request_out[0][0] !=''
                    e['property_list']<<[property,1]
                    begin
                        temp=Entity.find(e[property][0])
                        rescue
                        e[property]=[]
                        temp=Entity.new
                    end
                    temp["url"]=e_wiki["url"]
                    temp["title"]=e_wiki["title"]
                    temp["img_url"]=e_wiki["img_url"]
                    temp["prank"]=e_wiki["prank"]
                    temp.type="/dqs/"+property
                    temp["extraction_tech_id"]=ext_wiki['_id']
                    temp["cache"]=request_out[0][0]
                    temp["cache_timestamp"]=Time.now
                    temp.save
                    temp['addr']=e['addr'].downcase+'/'+e['name'].downcase+'/'+property+'/'+temp['_id'].to_s.downcase
                    print (property+temp['_id'].to_s)
                    temp.save
                    e[property]<<temp['_id']
                    else
                    print ('insite else'+property)
                    e['property_list']<<[property,0]
                    begin
                        Entity.find(e[property][0]).destroy
                        e[property]=nil
                        rescue
                        e[property]=nil
                    end
                end
            end
            property_b.each do |property|
                e['property_list']<<[property,e[property].length]
                if(e[property].length>0 && property !='video' && property !='description' )
                    if(property=='wiki')
                        ew=Entity.find(e['wiki']).first
                        ew['extraction_tech_id']=id_gen
                        ew.save
                    end
                    e[property].each do |property_source_id|
                        request_out=[]
                        @arr=[]
                        e1=Entity.find(property_source_id)
                        prank=e1['prank']
                        property_url=e1['url']
                        property_title=e1['title']
                        property_img_url=e1['img_url']
                        print(property_url)
                        extract=Entity.find(e1['extraction_tech_id'])
                        present=Entity.find(extract['presentation'])
                        dq_bind2=binding()
                        eval(extract['code'],dq_bind2)
                        eval(present['code'],dq_bind2)
                        e1['cache']=request_out[0][0]
                        e1["cache_timestamp"]=Time.now
                        e1.save
                    end
                end
            end
            e['cached_new']=true
            e.save
            rescue 
            File.open('log/mylog.log', 'a') {|f| f.write( Time.now.to_s+e['name']+"update_cache_new.rb\n") }
            puts $!
            
            end
    end
else
puts "skipped"
end
end