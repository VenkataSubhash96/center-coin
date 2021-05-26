# frozen_string_literal: true

module Services
  module RoomHelper
    def create_user(params)
      User.create!(params)
    end
  end
end
