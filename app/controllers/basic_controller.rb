class BasicController < ApplicationController
  
def ember_test
  
end
  def show
    #@e  = Entity.find_by("name"=>/bubble/i)
    #@mc = Entity.find_by("type"=>@e.type+"/crawler")
    #eval(@mc["code"])
    if params[:q]
      @query = params[:q]
     # @e  = Entity.find_by("name"=>/#{@query}/i)
    #@mc = Entity.find_by("type"=>@e.type+"/crawler")
    #eval(@mc["code"])
    end
  end

  def showa       
    f = params[:q]
    puts 'hi'
    f=get_contents(f)
    @s=''        
    if(f[0]=='source')            
      puts 'hi source'+f.class.to_s+ 'recieved'            
      puts f.class            
      puts f.length            
      puts f            
      @s<<f[1]['title'].to_s<<'<br>'<<'taken from '<<f[1]['url']<<'<br>'<<f[1]['out_html'].to_s           
    else            
      if(f[0]=='leaf')                
        puts ('hi leaf recieved'+f.length.to_s)                
        puts f                
        k=0                
        f.each do |tile|                    
          if k>0                        
            @s<<'<h1>'<<tile['tile_title']<<tile['tile_content'].length.to_s<<'</h1>'                        
            i=0                        
            puts tile['tile_content'].length==tile['ids'].length                        
            tile['tile_content'].each do |c|                            
              @s<< '{'<<i.to_s<<'} '<<c<<'<br>'<<tile['ids'][i]                            
              i=i+1                        
            end                    
          end                    
              k=k+1                
          end                
              else                
              if (f[0]=='notleaf'||f[0]=='repo')                    
                puts 'hi'+ f[0] +'recieved'                    
                puts f                    
                k=0                    
                f.each do |r1|                        
                  if k>0                            
                    puts r1                            
                    @s<<'{'<<k.to_s<<'} '
                    @s<< r1['name']                           
              @s<< '<br>'                       
            end                        
            k=k+1                    
          end
        end            
      end       
    end        
    puts @s
  end 
end