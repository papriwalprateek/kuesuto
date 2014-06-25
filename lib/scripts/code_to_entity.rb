s = File.read(File.open("lib/ext_wiki.rb","r"))
e = Entity.find_by("name_ref"=> "extraction for webpages")
e['code'] = s
e.save