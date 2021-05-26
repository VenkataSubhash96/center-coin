# frozen_string_literal: true

class RoomSerializer < ActiveModel::Serializer
  attributes :identifier, :users, :host_user, :user_name

  def users
    game.user_names
  end

  def host_user
    game.host_user.name
  end

  def user_name
    current_user.try(:name)
  end

  def game
    @game ||= object.game
  end

  def current_user
    @current_user ||= instance_options[:context][:current_user]
  end
end
