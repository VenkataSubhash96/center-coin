# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :room
  serialize :users, Array

  def user_names
    @user_names ||= users.map { |user| user[:name] }
  end
end
