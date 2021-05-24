# frozen_string_literal: true

class RoomSerializer < ActiveModel::Serializer
  attributes :identifier, :users, :host_user

  def users
    game.user_names
  end

  def host_user
    game.users.find { |user| user[:host] == true }[:name]
  end

  def game
    @game ||= object.game
  end
end
