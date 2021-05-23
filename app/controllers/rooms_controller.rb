# frozen_string_literal: true

class RoomsController < ApplicationController
  skip_before_action :verify_authenticity_token

  def create
    room = Services::CreateRoom.process(create_params)
    redirect_to action: 'show', id: room.id
  end

  def show
    room = Room.find(params[:id])
    # Add game show component here
  end

  private

  def create_params
    params.permit(:source_game, :user_name)
  end
end
