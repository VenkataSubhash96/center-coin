class HomeController < ApplicationController
  def index
    render component: 'HomePage'
  end
end
