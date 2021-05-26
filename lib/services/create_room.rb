# frozen_string_literal: true

module Services
  class CreateRoom
    include RoomHelper

    def initialize(source_game, user_name)
      @source_game = source_game
      @user_name = user_name
    end

    def process
      create_room
      create_game

      room
    end

    def user
      @user ||= create_user(name: user_name, host: true)
    end

    private

    attr_reader :source_game, :user_name, :room

    def create_room
      @room = Room.create!(identifier: SecureRandom.hex(4), source_game: source_game, active: true)
    end

    def create_game
      Game.create!(room_id: room.id, users: [user.id])
    end
  end
end
