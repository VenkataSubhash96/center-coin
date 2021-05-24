# frozen_string_literal: true

module Services
  class CreateRoom
    class << self
      def process(source_game, user_name)
        room = Room.create!(identifier: SecureRandom.hex(3), source_game: source_game, active: true)
        Game.create!(room_id: room.id, users: [{ name: user_name, host: true }])
      end
    end
  end
end
