class RepoController < ApplicationController
  def show
    @repo = params[:repo]
  end
  def generic
    if params[:a]=="graph"
     @selected = ["dijkistras","richmond","bellman-ford","Winkinsons"]
     else
      @selected = ["bubble sort", "sequence sort","Insertion sort", "Merge Sort", "Quick sort" ]
     end
    @repo = params[:a]
    respond_to do |format|
      format.js
      format.html
    end
  end
end
