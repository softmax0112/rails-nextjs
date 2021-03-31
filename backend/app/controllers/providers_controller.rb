class ProvidersController < ApplicationController
  skip_before_action :user_authorized, only: [:index, :search_provider]
  skip_before_action :verify_admin, only: [:index, :search_provider]

  before_action :find_or_create_specialization, only: [:create, :update]

  #POST /providers
  def create
    provider = @specialization.providers.build(provider_params)
    if provider.save
      serialized_provider = ActiveModelSerializers::SerializableResource.new(provider, {}).as_json
      render json: { provider: serialized_provider }, status: 200
    else
      render json: { error: provider.errors.full_messages }, status: 200
    end
  end

  #PATCH /providers/:id
  def update
    provider = Provider.find_by(id: provider_params[:id])
    provider.specialization_id = @specialization.id if provider.present? && @specialization.present?
    if provider.present? && provider.update(provider_params)
      serialized_provider = ActiveModelSerializers::SerializableResource.new(provider, {}).as_json
      render json: { provider: serialized_provider }, status: 200
    else
      render json: { error: provider.present? ? provider.errors.full_messages : 'Provider does not exist' }, status: 400
    end
  end

  #GET /providers
  def index
    @providers = Provider.recent.paginate(paginate_params)
    if @providers.present?
      serialized_providers = ActiveModelSerializers::SerializableResource.new(@providers, {}).as_json
      render json: { meta: { total_pages: @providers.total_pages, count: @providers.total_entries }, providers: serialized_providers, prev: @providers.previous_page, self: @providers.current_page, next: @providers.next_page }, status: 200
    else
      render json: { error: "No provider present in the database" }, status: 400
    end
  end

  #DELETE /providers/:id
  def destroy
    @provider = Provider.find_by(id: provider_params[:id])
    if @provider.present? && @provider.destroy
      render json: { delete: true, message: 'Deleted Successfuly' }, status: 200
    else
      render json: { delete: false, error: @provider.present? ? @provider.errors.full_messages : 'Provider does not exist' }, status: 404
    end
  end

  #GET /providers/search_provider
  def search_provider
    if provider_params[:username].present?
      provider = Provider.find_by(username: provider_params[:username])
    elsif provider_params[:email].present?
      provider = Provider.find_by(email: provider_params[:email])
    end
    if provider.present?
      serialized_provider = ActiveModelSerializers::SerializableResource.new(provider, {}).as_json
      render json: { provider: serialized_provider }, status: 200
    else
      render json: { error: "Provider does not exist with this username" }, status: 404
    end
  end

  #GET /providers/valid_email
  def valid_email
    provider_exist = Provider.exists?(email: provider_params[:email])
    if provider_exist
      render json: { error: 'Email Already exist', email: false }, status: 200
    else
      render json: { message: 'Valid Email', email: true }, status: 200
    end
  end

  #GET /providers/username
  def valid_username
    provider_exist = Provider.exists?(username: provider_params[:username])
    if provider_exist
      render json: { error: 'Username Already exist', username: false }, status: 200
    else
      render json: { message: 'Valid Username', username: true }, status: 200
    end
  end

  private

  def find_or_create_specialization
    @specialization = Specialization.find_or_create_by(name: specialization_params[:specialization]) if specialization_params[:specialization].present?
  end

  def provider_params
    params.permit(:id, :first_name, :last_name, :city, :state, :email, :username, :address)
  end

  def specialization_params
    params.permit(:specialization)
  end
end