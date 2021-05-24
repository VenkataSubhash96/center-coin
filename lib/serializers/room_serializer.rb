# frozen_string_literal: true

class RoomSerializer < ActiveModel::Serializer
  attributes :identifier, :users, :host_user

  def users
    game_users.map { |user| user[:name] }
  end

  def host_user
    game_users.find { |user| user[:host] == true }[:name]
  end

  def game_users
    @game_users ||= object.game.users
  end
end
