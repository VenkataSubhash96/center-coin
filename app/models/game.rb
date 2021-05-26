# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :room
  serialize :users, Array

  def host_user
    @host_user ||= User.where(id: users, host: true).last
  end

  def user_names
    @user_names ||= users.map { |user_id| User.find(user_id).name }
  end
end
