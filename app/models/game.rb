# frozen_string_literal: true

class Game < ApplicationRecord
  belongs_to :room
  serialize :users, Array
end
