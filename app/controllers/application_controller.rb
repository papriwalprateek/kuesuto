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
          if k==a_split.length - 1
              break
          end
          p<<'/'
      end
      q=a_split.last
      r=[]
      if a_split.length==1
          r<<'repo'
          Repo.each do |repo|
              r1=Hash.new
              r1['name']=repo['name']
              r1['isleaf']=repo['isleaf']
              r<<r1
          end
          else
      
      if Entity.where(addr:a).where(type:/dqs/i).count > 0 #### seeking contents of a source
          r<<'source'
          Entity.find_by(addr:a)['cache']
          r1=Hash.new
          r1["out_html"]=Entity.find_by(addr:a)['cache']
          r1["type"]='source'
          r1["node"]=Entity.find_by(addr:a)
          r1["title"]=r1['node']['title']
          r1['url']=r1['node']['url']
          r<<r1
          else if a_split.length == 2
              r<<'notleaf'
              Entity.where(addr:a).each do |e1|
                  r1=Hash.new
                  if e1['isleaf']
                      r1["type"]='leaf'
                      else
                      r1["type"] ='notleaf'
                  end
                  r1['isleaf']=e1['isleaf']
                  r1['name']=e1['name']
                  r<<r1
                  end
                  else
                    e=Entity.where(addr:p).find_by(name:/^#{Regexp.escape(q)}$/i)
                    if e['isleaf']
                        r<<'leaf'
                        e['property_list'].each do |p|
                            if p[1]>0
                                r1=Hash.new
                                r1["tile_title"]=p[0]
                                r1["tile_content"]=[]
                                r1['ids']=[]
                                e[p[0]].each do |id|
                                    if (p[0] != 'description')
                                        r1["tile_content"]<<Entity.find(id)['title']
                                        r1["ids"]<<id
                                        else
                                        r1["tile_content"]<<Entity.find(id)['content']   ### change to cache later
                                        r1["ids"]<<id
                                    end
                                end
                                r1['tile_nodes']=Entity.find(e[p[0]])
                                r<<r1
                            end
                        end
                        else
                        r<<'notleaf'
                        puts (e['name']+e['isleaf'].to_s+e.type)
                        puts Entity.where(addr:a).count
                        Entity.where(addr:a).each do |e1|
                            r1=Hash.new
                            if e1['isleaf']
                                r1["type"]='leaf'
                                else
                                r1["type"] ='notleaf'
                            end
                            r1['isleaf']=e1['isleaf']
                            r1['name']=e1['name']
                            r<<r1
                        end
                    end
              end
          end
      end
          return r
      end
  
  private
  def current_user
    @current_user ||= User.find(session[:user_id]["$oid"]) if session[:user_id]
  end
  helper_method :current_user
  helper_method :get_contents

end
