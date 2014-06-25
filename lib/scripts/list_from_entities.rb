ets = ["Bubble sort","Merge sort","Radix sort","Heap sort", "Dynamic Programming","Prim's algorithm","Dijkstra's algorithm"]
l_name = "Must Know Algorithms"


c_name = "dq"
count = 0
not_found = []

l = List.find_by("name"=>l_name)
if l
  puts "list already exists will add new entities"
else  
  puts "creating new list"
  l = List.new
  l.name = l_name
  l.save
end

ets.each do |et|
  e =  Entity.find_by('name'=>et)
  if e
  l.entities.push(e)
  puts e.name
  puts e.lists.name
  else
   not_found << et
  end
end

puts "Following were not found"
not_found.each do |n|
puts n
end