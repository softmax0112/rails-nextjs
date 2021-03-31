class CustomersController < ApplicationController
  skip_before_action :user_authorized, only: [:create]
  skip_before_action :verify_admin, only: [:create]

  #POST /customers
  def create
    @customer = Customer.create(customer_params)
    if @customer.valid?
      render json: { success: true, message: "Created Successfully" }, status: 200
    else
      render json: { success: false, error: @customer.errors.full_messages }, status: 400
    end
  end

  #GET /customers
  def index
    @customers = Customer.where(provider_id: customer_params[:provider_id]).paginate(paginate_params)
    if @customers.present?
      render json: { meta: { total_pages: @customers.total_pages, count: @customers.total_entries }, customers: @customers, prev: @customers.previous_page, self: @customers.current_page, next: @customers.next_page }, status: 200
    else
      render json: { error: "No customer present in the database" }, status: 200
    end
  end

  private

  def customer_params
    params.permit(:email, :provider_id)
  end
end