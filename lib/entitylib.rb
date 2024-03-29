module EntityLib

	# name --> Name of the repo to be created 
	# Conditions --> name should end with 's'
	# json --> the corpus

	# 
	# r = 
	#{
	#	addr:"dq/osconcepts"
	#	author:""
	#	merge:false
	#	mapping:{"video"=>"video","diagram"=>"image","description"=>"url","lectures"=>"url"}
	#}

	class Repo
		def initialize(corpus,r)
			i = 0
			corpus.each do |k|
				if Entity.find_by(name:k[0].capitalize) == nil
				puts "entity creation started"
				entity_addition(k,r["addr"],r["author"],r["merge"],r["mapping"])
				puts k[0] + " entity saved"
				i = i + 1
				puts i.to_s + " entities saved ........"
				end
			end		

		end


	# entityjson format
	# ["Operating System", {"video"=>["MaA0vFKt-ew", "55FeqGGzE5Q"]


		def entity_addition(entityjson,base_addr,author,merge,mapping)
			e = Entity.new
			l = entityjson[0].capitalize
			e.update_attributes("name"=>l)

			t = base_addr.split('/')
			x = t[1].split('')
			x.pop()
			x = x.join
			l = '/' + t[0] + '/' + x
			e.update_attributes("type"=>l)

			l = base_addr
			e.update_attributes("addr"=>l)
			l = true
			e.update_attributes("isleaf"=>l)
			l = base_addr + '/' + e['name']
			e.update_attributes("query"=>l)
			
			
			e_p_list = {}

			entityjson[1].each do |k,v|
				c = []
				e_p_list[k] = 0
				

				if mapping[k] == 'video'

					v.each do |x|

					d = Entity.new
					l = '/' + t[0] + 's/videopage'
					d.update_attributes("type"=>l)
					l = e['query'].downcase + '/' + k + '/' + d.id
					d.update_attributes("addr"=>l)
					l = d['addr']
					d.update_attributes("query"=>l)
					l = "video"
					d.update_attributes("out_type"=>l)
					l = 6
					d.update_attributes("prank"=>l)
					l = Entity.find('537c9a316c6f631767060000').id
					d.update_attributes("presentation"=>l)
					l = "http://www.youtube.com/embed/" + x
					d.update_attributes("url"=>l)



					c << d.id
					e_p_list[k] = e_p_list[k] + 1 
					d.save
					end

				elsif mapping[k] == 'image'

					v.each do |x|
					d = Entity.new
					l = '/' + t[0] + 's/imagepage'
					d.update_attributes("type"=>l)
					l = e['query'].downcase + '/' + k + '/' + d.id
					d.update_attributes("addr"=>l)
					l = d['addr']
					d.update_attributes("query"=>l)
					l = "image"
					d.update_attributes("out_type"=>l)
					l = 6
					d.update_attributes("prank"=>l)
					l = x
					d.update_attributes("url"=>l)

					c << d.id
					e_p_list[k] = e_p_list[k] + 1
					d.save

					end

				elsif mapping[k] == 'url'
					v.each do |x|

					d = Entity.new
					l = '/' + t[0] + 's/' + k
					d.update_attributes("type"=>l)
					l = e['query'].downcase + '/' + k + '/' + d.id
					d.update_attributes("addr"=>l)
					l = d['addr']
					d.update_attributes("query"=>l)
					l = x
					d.update_attributes("url"=>l)
					if merge == true
						l = r['author']
						d.update_attributes("author"=>l)
						l = 'merged'
						d.update_attributes("review_status"=>l)
					end
					l = "url"
					d.update_attributes("in_type"=>l)

					c << d.id
					e_p_list[k] = e_p_list[k] + 1 
					
					d.save
					end



				else                  # this is for properties which would have out_type as text 

					v.each do |x|
				
					d = Entity.new
					l = '/' + t[0] + 's/' + k
					d.update_attributes("type"=>l)
					l = e['query'].downcase + '/' + k + '/' + d.id
					d.update_attributes("addr"=>l)
					l = d['addr']
					d.update_attributes("query"=>l)
					l = ''
					d.update_attributes("url"=>l)
					if merge == true
						l = r['author']
						d.update_attributes("author"=>l)
						l = 'merged'
						d.update_attributes("review_status"=>l)
					end
					l = x
					d.update_attributes("cache"=>l)
					l = 'text'
					d.update_attributes("out_type"=>l)
					c << d.id
					e_p_list[k] = e_p_list[k] + 1 

					d.save
					end

				end
				e.update_attributes(k=>nil)
				e.update_attributes(k=>c)		

				puts "attributes saved"
			end	
			e.update_attributes("p_list"=>e_p_list)
			e.update_attributes("p_list"=>e_p_list)
			e.save

		#	l = {r['init_property']=>1}
		#	e.update_attributes("p_list"=>l)	

		end
	end

	class ArticleEntity

		def article_entity_addition(entityjson)
			require 'dbupdate'
			l = entityjson[0].capitalize
			e = Entity.find_by(name:l)
			v = entityjson[1]
			c = []
			e_p_list = e.p_list
			e_p_list['article'] = 0
				if v.length > 0
					v.each do |x|
						d = Entity.new
						puts d.id
						l = '/dqs/webpage'
						d.update_attributes("type"=>l)
						l = e['query'].downcase + '/article' + '/' + d.id
						d.update_attributes("addr"=>l)
						l = d['addr']
						d.update_attributes("query"=>l)
						l = x[0]
						d.update_attributes("url"=>l)
						l = x[1]
						d.update_attributes("title"=>l)
						l = x[2]
						d.update_attributes("prank"=>l)
						l = "url"
						d.update_attributes("in_type"=>l)
						l = Entity.find_by(name_ref:'extraction for webpages').id
						d.update_attributes("extraction_tech_id"=>l)
						
						ic = DBUpdate::ItemCache.new
						ic.url2html(d.id)
						c << d.id
						e_p_list['article'] = e_p_list['article'] + 1 
					end
					l = true
					e.update_attributes("cached_articles"=>l)
					l = c
					e.update_attributes("article"=>nil)
					e.update_attributes("article"=>c)
					l = e_p_list
					e.update_attributes("p_list"=>nil)
					e.update_attributes("p_list"=>e_p_list)
				else
					l = false
					e.update_attributes("cached_articles"=>l)
				end

		end

	end

	class DeleteTree
		# Paramenter id - ID of the entity to be deleted
		# It will delete the entity itself and its child as well.
		# Similar to file folder delete philosophy

		def delete_entity(id)
			e = Entity.find(id)
			r = Regexp.new(e.query.downcase,'i')
			collection = Entity.where(query:r)
			collection.each do |x|
			x.delete
			end 
		end

		def delete_by_addr(addr)
			r = Regexp.new(addr,'i')
			collection = Entity.where(addr:r)
			i = 0
			collection.each do |x|
				x.delete
				i = i + 1
				puts i
			end
		end

		def delete_source_entity(id)
			d = Entity.find(id)
			t = d.addr.split('/')
			property = t[-2]
			t.delete_at(-1)
			t.delete_at(-1)
			parent_query = t.join('/')
			r = /#{Regexp.escape(parent_query)}$/i
#			r = Regexp.new(parent_query+'$','i')
			parent_entity = Entity.find_by(query:r)
			l = parent_entity[property]
			l.delete(d.id)
			parent_entity.update_attributes(property=>nil)
			parent_entity.update_attributes(property=>l)
			e_p_list = parent_entity['p_list']
			e_p_list[property] = parent_entity[property].length
			parent_entity.update_attributes("p_list"=>nil)
			parent_entity.update_attributes('p_list'=>e_p_list)
			puts "parent_entity succesfully updated"
			d.delete
			puts "source entity deleted"
		end


	end

	class TestCorpus

		def check_nil_source_nodes
			x = Entity.where(isleaf:true)

			#temp = Entity.find_by(name:/heapsort/i)

			x.each do |temp|
			puts temp.name
			temp.p_list.each do |l,v|
				puts l
				t = []
				flag = 0
				if temp[l] != nil
				temp[l].each do |c|
					if Entity.find(c) == nil
						puts c
						flag = 1
					else
						t << c
					end
				end
				end
				if flag == 1
				temp.update_attributes(l=>t)
				e_p_list = temp['p_list']
				e_p_list[l] = t.length
				puts e_p_list	
				temp.update_attributes("p_list"=>e_p_list)
				end
			end

			end

		end

		def update_p_list
			x = Entity.where(isleaf:true)
			x.each do |temp|
				e_p_list = temp['p_list']
				puts temp.name
				e_p_list.each do |l,v|
					if temp[l] != nil
						if v!=temp[l].length
							puts l.to_s + " " + e_p_list[l].to_s
							e_p_list[l] = temp[l].length
							temp.update_attributes("p_list"=>nil)
							temp.update_attributes("p_list"=>e_p_list)
							puts e_p_list[l]
						end
					else
						if v != 0
							puts l.to_s + " " + e_p_list[l].to_s
							e_p_list[l] = 0
							temp.update_attributes("p_list"=>nil)
							temp.update_attributes("p_list"=>e_p_list)
							puts e_p_list[l]
						end
					end
				end

			end
		end


		def check_nil_article
			x = Entity.where("addr"=>/\/article\//i).where("cache"=>nil)
			l = DBUpdate::ItemCache.new
			y = EntityLib::DeleteTree.new
			
			x.each do |t|
				begin
					l.url2html(t.id)
				rescue
					y.delete_source_entity(t.id)
				end
			end
		end

	end

end