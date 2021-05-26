# frozen_string_literal: true

class RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    service = Services::CreateRoom.new(create_params['source_game'], create_params['user_name'])
    room = service.process
    set_user_session(service.user.id)
    render json: { success: true, room_id: room.id }
  end

  def show
    room = Room.find(params[:id])
    room_details = RoomSerializer.new(room, context: { current_user: current_user }).as_json
    render component: 'GameLobby', props: { room_details: room_details }
  end

  def join
    service = Services::JoinRoom.new(join_params['identifier'], join_params[:user_name])
    if service.process
      set_user_session(service.user.id)
      ActionCable.server.broadcast 'room', room_id: service.room.id
      render json: { success: true, room_id: service.room.id }
    else
      render json: { success: false, errors: service.errors.full_messages }, status: 422
    end
  end

  private

  def create_params
    params.permit(:source_game, :user_name)
  end

  def join_params
    params.permit(:user_name, :identifier)
  end
end
