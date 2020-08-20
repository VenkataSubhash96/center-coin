class HomeController < ApplicationController
  include Rails.application.routes.url_helpers

  def index
    render component: 'HomePage', props: { script_url: script_url }
  end

  def run_script
    system('python python_script.py')
    file = File.open('response.txt')
    file_data = file.read

    render json: { response: file_data }, status: 200
  end

  private

  def script_url
    Rails.application.routes.url_helpers.home_run_script_path
  end
end
