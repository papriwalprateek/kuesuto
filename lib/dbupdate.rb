module DBUpdate
	class ItemCache
		def url2html(id)
		# This meythod is used when a URL is to be converted into html/text through some extraction technique
			e = Entity.find(id)
			property_url = e.url
			dq_bind=binding()
			extract=Entity.find(e['extraction_tech_id'])
		    present=Entity.find(extract['presentation'])
		    eval(extract['code'],dq_bind)
		    eval(present['code'],dq_bind)
			begin    
			e.update_attributes("in_type"=>nil)
			l = "text"
			e.update_attributes("out_type"=>l)
		    e['cache'] = @html_out[0]
		    e['cache_timestamp'] = Time.now
		    e['cached'] = true
			rescue
			e['cached'] = false
			end
			puts e['cached']
		    e.save
		end


		def url2video(id)
			e = Entity.find(id)
			t = e['addr'].split('/')
			l = '/' + t[0] + 's/videopage'
			e.update_attributes("type"=>l)
			l = "video"
			e.update_attributes("out_type"=>l)
			l = 6
			e.update_attributes("prank"=>l)
			l = Entity.find('537c9a316c6f631767060000').id
			e.update_attributes("presentation"=>l)	
			l = e.url.gsub(/watch/,"embed")
			e.update_attributes("url"=>l)
			e.update_attributes("in_type"=>nil)
			e.save
		end


		def url_to_ET(url,type)
			# This script matches url to the extraction technique name_ref
			et_list = nil
			et_list = {"webopedia.com"=>"extraction for webopedia","techopedia.com"=>"extraction for techopedia","nist.gov"=>"extraction for nist","mathworld.wolfram"=>"extraction for wolfram","rosettacode.org"=>"extraction for rosettacodes","wikipedia.org"=>"extraction for wikipedia"}
			
			if type == "/dqs/webpage"
				return "dq-readability"
			else
				flag = 0
				et = nil
				et_list.each do |k,v|
					if url.include?(k)
						et = v
						flag = 1
						break
					end
				end
				if flag == 0
					et = "no ET available"
				end
				
				return et
			end
		end



		def add_et_in_entities(corpus_domain)
		#corpus_domain is the part of the whole corpus in which this script is to be run
			i = 0
			corpus_domain.each do |c|
				et_name = url_to_ET(c.url,c.type)
				l = Entity.find_by(name_ref:et_name).id
				c.update_attributes("extraction_tech_id"=>l)
				url2html(c.id)
				i = i + 1
				puts i
			end
		end

	end


	class AddTechniques

# recommended to add pt first and then et

		def add_pt(path_to_code,name)
			e = Entity.new
			file = File.new(path_to_code,'r')
			s = ''
			while (line=file.gets)
				s<<line
			end
			puts s
			e.update_attributes("name_ref"=>name)
			e.update_attributes("code"=>s)
			l = "/dqp"
			e.update_attributes("type"=>l)
			e.save
		end

		def add_et(path_to_code,name,pt)
			e = Entity.new
			file = File.new(path_to_code,'r')
			s = ''
			while (line=file.gets)
				s<<line
			end
			puts s
			e.update_attributes("name_ref"=>name)
			e.update_attributes("code"=>s)
			l = "/dqe"
			e.update_attributes("type"=>l)
			e.update_attributes("presentation"=>pt.id)
			e.save
		end



		def update_code(path_to_code,name)
			e = Entity.find_by(name_ref:name)
			file = File.new(path_to_code,'r')
			s = ''
			while (line=file.gets)
				s<<line
			end
			puts s
			e.update_attributes("code"=>s)
			e.save
		end

	end

end