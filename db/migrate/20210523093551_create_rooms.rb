# frozen_string_literal: true

class CreateRooms < ActiveRecord::Migration[6.0]
  def change
    create_table :rooms do |t|
      t.text :identifier
      t.string :source_game
      t.boolean :active
      t.timestamps
    end
  end
end
