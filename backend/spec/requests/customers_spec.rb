require 'rails_helper'

RSpec.describe CustomersController, type: :controller do
  before(:all) do
    @token = login_user
  end

  describe '#index' do
    before(:all) do
      customer1 = load_customer
      customer2 = load_customer
      customer3 = load_customer
      @params   = { provider_id: customer1.provider_id }
    end

    it 'returns a success response' do
      request.headers.merge!({ Authorization: @token })
      get :index, params: @params
      expect(response).to have_http_status(:ok)
    end

    it 'returns a proper JSON' do
      request.headers.merge!({ Authorization: @token })
      get :index, params: @params
      request_response = JSON.parse(response.body)

      expect(request_response['customers'].size).to be >= 3
    end

    it 'paginates results' do
      request.headers.merge!({ Authorization: @token })
      get :index, params: @params.merge!({ page: 1, per_page: 10 })
      request_response = JSON.parse(response.body)

      expect(request_response['meta']['count']).to be >= 3
      expect(request_response['meta']['total_pages']).to be >= 1
      expect(request_response['customers'].size).to be >= 3
    end
  end

  describe '#create' do
    before do
      provider1 = load_provider
      params    = { email: 'createcustomer1@gmail.com', provider_id: provider1.id }
      post :create, params: params
    end

    it 'creates the provider along with specialization' do
      expect(response).to have_http_status(:ok)
      expect(Customer.find_by(email: 'createcustomer1@gmail.com').present?).to eq true
    end
  end
end