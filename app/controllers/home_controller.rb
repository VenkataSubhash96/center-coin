class HomeController < ApplicationController
  include Rails.application.routes.url_helpers

  def index
    render component: 'HomePage', props: {
      script_url: script_url,
      sleep_tracking_graph_url: ActionController::Base.helpers.asset_path(
        'sleep_tracking_graph.png'
      )
    }
  end

  def run_script
    input_text = params[:input_text]
    system('rm output.txt') if File.exist?('output.txt')
    system("python3 get_patient_movements.py '#{input_text}' >> output.txt")
    file = File.open('output.txt')
    file_data = file.read

    render json: { response: file_data }, status: 200
  end

  private

  def script_url
    Rails.application.routes.url_helpers.home_run_script_path
  end
end
