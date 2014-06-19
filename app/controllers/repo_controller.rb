class RepoController < ApplicationController
  def show
    @repo = params[:repo]
  end
  def generic
    respond_to do |format|
      format.js
      format.html
    end
  end
end
