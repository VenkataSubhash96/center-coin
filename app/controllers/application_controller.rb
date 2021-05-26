class ApplicationController < ActionController::Base
  def set_user_session(user_id)
    session[:current_user_id] = user_id
  end

  def current_user
    User.where(id: session[:current_user_id]).last
  end
end
