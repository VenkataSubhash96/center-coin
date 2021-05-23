# frozen_string_literal: true

module Services
  class CreateRoom
    class << self
      def process(details = {})
        room = Room.create!(identifier: SecureRandom.hex(3), source_game: details['source_game'], active: true)
        Game.create!(room_id: room.id, users: [{ name: details['user_name'], host: true }])
      end
    end
  end
end
