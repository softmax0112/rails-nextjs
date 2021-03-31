class ApplicationController < ActionController::API
  before_action :user_authorized
  before_action :verify_admin

  def encode_token(payload)
    payload[:exp] = Time.now.to_i + 1.day.to_i
    JWT.encode(payload, Rails.application.secrets.secret_key_base)
  end

  def decoded_token
    auth_header = request.headers['Authorization']
    if auth_header
      token = auth_header.split(' ').last
      begin
        JWT.decode(token, Rails.application.secrets.secret_key_base, true, algorithm: 'HS256')
      rescue JWT::DecodeError
        nil
      end
    end
  end

  def logged_in_user
    @current_user   = nil
    if decoded_token
      user_id       = decoded_token[0]['user_id']
      @current_user = User.find_by(id: user_id)
    end
    @current_user
  end

  def logged_in?
    logged_in_user
  end

  def user_authorized
    render json: { message: 'Please log in First to Continue' }, status: 401 unless logged_in?
  end

  private

  def verify_admin
    render json: { message: "You don't have access to perform this action" }, status: 401 unless @current_user.is_admin?
  end

  def paginate_params
    paginate_params = params.permit(:page, :per_page)
    { page: paginate_params[:page] || 1, per_page: paginate_params[:per_page] || DEFAULT_PAGINATION_SIZE }
  end
end
