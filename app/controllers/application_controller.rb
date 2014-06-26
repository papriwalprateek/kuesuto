class ApplicationController < ActionController::Base
  # Prevent CSRF attacks by raising an exception.
  # For APIs, you may want to use :null_session instead.
  protect_from_forgery with: :exception

  def get_contents(a)                  ### gives children or htmloutput in case of type /dqs/...
      a=a.downcase
      a_split= a.split('/')
      k=0
      p=''
      a_split.each do
          p<<a_split[k]
          k=k+1
          if k>a_split.length - 2
              break
          end
          p<<'/'
      end
      puts('p: '+p)
      if a_split.length>1
          q=a_split.last
          a=p+'/'+q
          else
          a=p
          q=''
      end
      err={}
      if (Entity.where(addr:a).count==0 && Entity.where(addr:p).where(name:/^#{Regexp.escape(q)}$/i).count==0 && Repo.where(addr:a).count==0)
          err['error']='not found'
          err['details']='addr: '+a+" \n Entity.where(addr:a).count="+Entity.where(addr:a).count.to_s+" \n count addr p name q "+Entity.where(addr:p).where(name:/^#{Regexp.escape(q)}$/i).count.to_s+" \n repo count"+Repo.where(addr:a).count.to_s
          puts err['details']
          err['has']='error'
          return err
          else
      r=Hash.new
      if a_split.length==1
          r['has']='repos'
          r['repos'] = []
          Repo.where(addr:a).each do |repo|
              r1=Hash.new
              r1['name']=repo['name']
              r1['type']='notleaf'
              r1['query'] = repo['addr']+'/'+repo['name']
              r['repos']<<r1
          end
          else
      
      if Entity.where(addr:a).where(type:/dqs/i).count > 0 #### seeking contents of a source
          r['has']='source'
          r['source']=[]
          #Entity.find_by(addr:a)['cache']
          r1=Hash.new
          r1["type"]='content'
          r1["node"]=Entity.find_by(addr:a)
          r1["title"]=r1['node']['title']
          if(r1['node']['type']=='/dqs/videopage')
              r1['out_type']='video'
              else
              r1['out_type']='text'
          end
          r1["out_html"]=r1['node']['cache']
          r1["url"]=r1['node']['url']
          r['source']<<r1
          else
          if a_split.length == 2
              r['has']='list'
              r['list']=[]
              Entity.where(addr:a).each do |e1|
                  r1=Hash.new
                  if e1['isleaf']
                      r1["type"]='leaf'
                      else
                      r1["type"] ='notleaf'
                  end
                  r1['name']=e1['name']
                  r1['query']=e1['addr']+'/'+e1['name']
                  r['list']<<r1
                end
                else
                e=Entity.where(addr:p).find_by(name:/^#{Regexp.escape(q)}$/i)
                if e['isleaf']
                    r['has']='tiles'
                    r['tiles']=[]
                    e['p_list'].each do |p,n|
                        if n>0
                            puts p
                            r1=Hash.new
                            r1["tile_title"]=p
                            r1["tile_url"]=e['addr']+"/"+e['name']+'/i:'+p
                            r1["tile_nodes"]=[]
                            e[p].each do |id|
                                r2=Hash.new
                                r2['query']=e['addr']+'/'+e['name']+'/'+p+'/'+id.to_s
                                r2['node']=Entity.find(id)
                                if p=='video'
                                    r2['node']['out_type']='video'
                                    else
                                    r2['node']['out_type']='text'
                                end
                                r1['tile_nodes']<<r2
                            end
                            r['tiles']<<r1
                        end
                    end
                    else
                    r['has']='list'
                    r['list']=[]
                    puts (e['name']+e['isleaf'].to_s+e.type)
                    puts Entity.where(addr:a).count
                    Entity.where(addr:a).each do |e1|
                        r1=Hash.new
                        if e1['isleaf']
                            r1["type"]='leaf'
                            else
                            r1["type"] ='notleaf'
                        end
                        r1['name']=e1['name']
                        r1['query']=e1['addr']+'/'+e1['name']
                        r['list']<<r1
                    end
                end
            end
        end
    end
          return r
          end
      end
  
#in_type=='url'   then content will be ignored and sourcenode['imm_content'] will be set false.
#in_type=='imm_content' then content will be taken and sourcenode['imm_content'] will be set true.

# Necessary fileds: parent_query, in_type, out_type, url or content,review_status
# Helpful fields: property,author, title
# in_type may be "imm_content" or "url"
# out_type may be "text" or "video"
# parent_query is the query parameter provided by the get_contents(a) to you.
# you should not use any of ['type','addr'] as fields of your input Hash r.
#
# for example if you want to add a description in bubble sort, the hash would look like
#   {
#   has:source
#   parent_query:'dq/algorithms/sequence sorting/bubble sort'
#   property:'description'
#   out_type:'text'
#   in_type:'imm_content'
#   author:'vinay'
#   content:'Bubble sort means you put everything in water, make some soap bubbles and they shall sort evrything ;)'
#   review_status:'under_review'
#
#
#   }


def commit_content(r)# r is a Hash(json) containing parent_query,property,content,author,url.
    if r['title']==nil
        r['title']='untitled'
        end
    err={}
    err['error']='not supported'
    err['has']='error'
    if(r.keys.include?('type')||r.keys.include?('addr'))
        err['error']='input not allowed'
        err['details']='not allowed to use type or addr as fields in input hash.'
        return err
    end
    get=get_entity(r['parent_query'])
    if(r['in_type']!='url' &&r['in_type']!='imm_content')
        err['details']=" in_type: \"   "+r['intype'].to_s+"   \" not supported, add support in commit_content."
        return err
    end
        
    if(get['has']=='error')
        return get
        else
        if(get['has']=='leaf')
            e=get[get['has']]
            if r['review_status']=='under_review'
                es,e=create_sourcenode('under_review',e,r['out_type'])
                else
                err['details']='not yet supported review_status other than under_review'
                return err
            end
            
            if(r['in_type']=='url')
                es['imm_content']=false
                r['content']=nil
                else
                if(r['in_type']=='imm_content')
                    es['imm_content']=true
                    else
                    err['details']=" in_type: \"   "+r['intype'].to_s+"   \" not supported, add support in commit_content."
                    puts err
                    return err
                end
            end
            r.each do |k,v|
                if(k!='content')
                    es[k]=v
                    else
                    if k=='content'
                        es['cache']=v
                    end
                end
            end
            es.save
            send={}
            send['has']='query'
            send['query']=es['addr']
            return send
            else
            return err
        end
    end
end

def create_sourcenode(property,e,out_type)##e is parent ##return sourcenode,parent
    if property==nil
        property="not assigned"
    end
    temp=Entity.new
    temp['property']=property
    
    temp['out_type']=out_type
    temp["prank"]= 7
    property_a=['description','algorithm','complexity','math_analysis','pseudocode']
    property_b=['wiki','code','video']
    property_c=['article']
    if property_b.include?(property)
        temp.type="/dqs/"+property+"page"
        else
        if property_c.include?(property)
            temp.type="/dqs/webpage"
            else
            if property_a.include?(property)
                temp.type="/dqs/"+property
                else
                if (property!=nil && property!='under_review')
                    temp.type="/dqs/"+property
                    puts( "warning unknown property : "+property)
                    else
                    temp.type="/dqs/not assigned"
                end
            end
        end
    end
    
        
    temp.save
    temp['addr']=e['addr'].downcase+'/'+e['name'].downcase+'/'+property+'/'+temp['_id'].to_s.downcase
    print (property+temp['_id'].to_s)
    temp.save
    if(e[property]==nil)
        e[property]=[]
    end
    e_property=e[property]
    e_property<<temp['_id']
    e_property=e_property.uniq
    e.update_attributes(property=>nil)
    e.update_attributes(property=>e_property)
    e['p_list'][property]=e[property].length
    e_p_list=e['p_list']
    e.update_attributes(p_list:nil)
    e.update_attributes(p_list:e_p_list)
    e['commited']=true
    e.save
    return temp,e
end

def get_entity(query)
    a=query.downcase
    a_split= a.split('/')
    k=0
    p=''
    a_split.each do
        p<<a_split[k]
        k=k+1
        if k>a_split.length - 2
            break
        end
        p<<'/'
    end
    puts('p: '+p)
    if a_split.length>1
        q=a_split.last
        a=p+'/'+q
        else
        a=p
        q=''
    end
    err={}
    out={}
    if (Entity.where(addr:a).count==0 && Entity.where(addr:p).where(name:/^#{Regexp.escape(q)}$/i).count==0 && Repo.where(addr:a).count==0)
        err['error']='not found'
        err['details']='addr: '+a+" \n Entity.where(addr:a).count="+Entity.where(addr:a).count.to_s+" \n count addr p name q "+Entity.where(addr:p).where(name:/^#{Regexp.escape(q)}$/i).count.to_s+" \n repo count"+Repo.where(addr:a).count.to_s
        puts err['details']
        err['has']='error'
        return err
        else
        n=Entity.where(addr:p).where(name:/^#{Regexp.escape(q)}$/i).count
        if n>0
            out['has']='leaf'
            out['leaf']=Entity.where(addr:p).where(name:/^#{Regexp.escape(q)}$/i).first
            out['repo']=Repo.where(addr:a_split.first)
            if n>1
                out['warning']='More than 1 leaf with same addr+name, query= '+a
            end
            return out
            else
                err['has']='error'
                err['error']='not a leaf. Adding content here is not yet supported'
                err['details']="query:"+a+"addr p , name q count="+Entity.where(addr:p).where(name:/^#{Regexp.escape(q)}$/i).count.to_s
                return err
        end
    end
end

  def get_tiles(e)
  r={}
  r['tiles']=[]
                    e['p_list'].each do |p,n|
                        if n>0
                            puts p
                            r1=Hash.new
                            r1["tile_title"]=p
                            r1["tile_url"]=e['addr']+"/"+e['name']+'/i:'+p
                            r1["tile_nodes"]=[]
                            e[p].each do |id|
                                r2=Hash.new
                                r2['query']=e['addr']+'/'+e['name']+'/'+p+'/'+id.to_s
                                r2['node']=Entity.find(id)
                               
                               # if p=='video'
                                #    r2['node']['out_type']='video'
                                #    else
                                 #   r2['node']['out_type']='text'
                                #end
                                r1['tile_nodes']<<r2
                            end
                            r['tiles']<<r1
                        end
                    end
        return r                  
      end
  private
  def current_user
    @current_user ||= User.find(session[:user_id]["$oid"]) if session[:user_id]
  end
  helper_method :current_user, :get_contents, :commit_content, :get_tiles

end
