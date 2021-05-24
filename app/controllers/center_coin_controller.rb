# frozen_string_literal: true

class CenterCoinController < ApplicationController
  include Rails.application.routes.url_helpers

  def index
    render component: 'GameRequest', props: {
      create_room_url: create_room_url, join_room_url: join_room_url, game_lobby_url: game_lobby_url, game: 'center_coin'
    }
  end

  private

  def create_room_url
    Rails.application.routes.url_helpers.rooms_path
  end

  def join_room_url
    Rails.application.routes.url_helpers.join_rooms_path
  end

  def game_lobby_url
    Rails.application.routes.url_helpers.room_path(:id)
  end
end
