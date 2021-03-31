class UsersController < ApplicationController
  skip_before_action :user_authorized, only: [:login]
  skip_before_action :verify_admin, only: [:login]

  #POST /users/login
  def login
    @user = User.find_by(email: user_params[:email], password: user_params[:password])
    if @user
      token = encode_token({ user_id: @user.id })
      render json: { user: @user, token: token }, status: 200
    else
      render json: { error: "Invalid Email or Password" }, status: 400
    end
  end

  private

  def user_params
    params.permit(:email, :password)
  end
end