# frozen_string_literal: true

class CreateGames < ActiveRecord::Migration[6.0]
  def change
    create_table :games do |t|
      t.integer :room_id
      t.text :users
      t.timestamps
    end
  end
end
