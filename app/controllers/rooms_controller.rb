# frozen_string_literal: true

class RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    room = Services::CreateRoom.process(create_params['source_game'], create_params['user_name'])
    render json: { success: true, room_id: room.id }
  end

  def show
    room = Room.find(params[:id])
    room_details = RoomSerializer.new(room).as_json
    render component: 'GameLobby', props: { room_details: room_details }
  end

  private

  def create_params
    params.permit(:source_game, :user_name)
  end
end
