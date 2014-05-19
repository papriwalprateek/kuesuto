class RepoController < ApplicationController
  def show
    @repo = params[:repo]
  end
end
