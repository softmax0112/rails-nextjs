require 'rails_helper'

RSpec.describe ProvidersController, type: :controller do
  before(:all) do
    @token = login_user
  end

  describe '#index' do
    before(:all) do
      spec      = Specialization.find_or_create_by(name: 'Neuropsychology')
      provider1 = Provider.find_or_create_by(first_name: 'person', last_name: '1', city: 'new york', state: 'new york', username: 'person1', email: 'person1@example.com', specialization: spec)
      provider2 = Provider.find_or_create_by(first_name: 'person', last_name: '2', city: 'new york', state: 'new york', username: 'person2', email: 'person2@example.com', specialization: spec)
      provider3 = Provider.find_or_create_by(first_name: 'person', last_name: '3', city: 'new york', state: 'new york', username: 'person3', email: 'person3@example.com', specialization: spec)
    end

    it 'returns a success response' do
      get :index
      expect(response).to have_http_status(:ok)
    end

    it 'returns a proper JSON' do
      get :index
      request_response = JSON.parse(response.body)

      expect(request_response['providers'].size).to be >= 1
    end

    it 'paginates results' do
      get :index, params: { page: 1, per_page: 10 }
      request_response = JSON.parse(response.body)

      expect(request_response['meta']['count']).to be >= 3
      expect(request_response['meta']['total_pages']).to be >= 1
      expect(request_response['providers'].size).to be >= 3
    end
  end

  describe '#create' do
    before do
      params = { first_name: 'provider', last_name: '1', username: 'createprovider1', specialization: 'create_specialization', email: 'createprovider1@gmail.com', city: 'new york', state: 'new york', address: '79th street' }
      request.headers.merge!({ Authorization: @token })
      post :create, params: params
      request_response = JSON.parse(response.body)
    end

    it 'creates the provider along with specialization' do
      expect(response).to have_http_status(:ok)
      expect(Provider.find_by(username: 'createprovider1').present?).to eq true
      expect(Specialization.find_by(name: 'create_specialization').present?).to eq true
    end
  end

  describe '#destroy' do
    before do
      provider = load_provider
      params   = { id: provider.id }
      request.headers.merge!({ Authorization: @token })
      delete :destroy, params: params
      request_response = JSON.parse(response.body)
    end

    it 'should delete the given provider' do
      expect(response).to have_http_status(:ok)
      expect(Provider.find_by(username: 'provider1').blank?).to eq true
    end
  end

  describe '#search_provider' do
    before do
      @provider1 = create_provider({ username: 'testprovider1', email: 'testprovider1@gmail.com' })
      @provider2 = create_provider({ username: 'testprovider2', email: 'testprovider2@gmail.com' })
    end

    context 'with username' do
      before do
        params = { username: 'testprovider1' }
        get :search_provider, params: params
      end

      it "should retrun provider1" do
        request_response = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(request_response['provider']['id']).to eq @provider1.id
      end
    end

    context 'with email' do
      before do
        params = { email: 'testprovider2@gmail.com' }
        get :search_provider, params: params
      end

      it "should retrun provider2" do
        request_response = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(request_response['provider']['id']).to eq @provider2.id
      end
    end
  end

  describe '#valid_email' do
    before do
      @provider1 = create_provider({ username: 'testprovider1', email: 'testprovider1@gmail.com' })
    end

    context 'with invalid email' do
      before do
        params = { email: 'testprovider1@gmail.com' }
        request.headers.merge!({ Authorization: @token })
        get :valid_email, params: params
      end

      it 'should return email: false' do
        request_response = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(request_response['email']).to eq false
      end
    end

    context 'with valid email' do
      before do
        params = { email: 'validemail1@gmail.com' }
        request.headers.merge!({ Authorization: @token })
        get :valid_email, params: params
      end

      it 'should return email: true' do
        request_response = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(request_response['email']).to eq true
      end
    end
  end

  describe '#valid_username' do
    before do
      @provider1 = create_provider({ username: 'testprovider1', email: 'testprovider1@gmail.com' })
    end

    context 'with invalid username' do
      before do
        params = { username: 'testprovider1' }
        request.headers.merge!({ Authorization: @token })
        get :valid_username, params: params
      end

      it 'should return username: false' do
        request_response = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(request_response['username']).to eq false
      end
    end

    context 'with valid username' do
      before do
        params = { username: 'validemail1' }
        request.headers.merge!({ Authorization: @token })
        get :valid_username, params: params
      end

      it 'should return username: true' do
        request_response = JSON.parse(response.body)
        expect(response).to have_http_status(:ok)
        expect(request_response['username']).to eq true
      end
    end
  end

  describe '#update' do
    before do
      provider = load_provider
      params   = { id: provider.id, username: 'provider2' }
      request.headers.merge!({ Authorization: @token })
      patch :update, params: params
      request_response = JSON.parse(response.body)
    end

    it 'should update the given provider' do
      expect(response).to have_http_status(:ok)
      expect(Provider.find_by(username: 'provider1').blank?).to eq true
      expect(Provider.find_by(username: 'provider2').present?).to eq true
    end
  end
end


