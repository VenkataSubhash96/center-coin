# frozen_string_literal: true

module Services
  class JoinRoom
    include ActiveModel::Validations

    validate :room_identifier_to_be_valid
    validate :user_name_not_to_exist_already

    def initialize(room_identifier, user_name)
      @room_identifier = room_identifier
      @user_name = user_name
    end

    def process
      return unless valid?

      add_user_to_game
    end

    def room
      @room ||= Room.where(identifier: room_identifier, active: true).last
    end

    private

    attr_reader :room_identifier, :user_name

    def add_user_to_game
      game.users.push({ name: user_name })
      game.save!
    end

    def game
      @game ||= room.game
    end

    def room_identifier_to_be_valid
      return if room

      errors.add(:base, "No room found with id - #{room_identifier}")
    end

    def user_name_not_to_exist_already
      return unless room
      return unless game.user_names.include?(user_name)

      errors.add(:base,
                 "Oops! There is someone already in the game with #{user_name}! I hope you have some other nick names to choose")
    end
  end
end
