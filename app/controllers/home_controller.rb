# frozen_string_literal: true

class HomeController < ApplicationController
  include Rails.application.routes.url_helpers

  def index
    render component: 'HomePage', props: {
      center_coin_game_url: center_coin_game_url
    }
  end

  private

  def center_coin_game_url
    Rails.application.routes.url_helpers.center_coin_index_path
  end
end
