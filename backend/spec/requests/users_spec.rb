require 'rails_helper'

RSpec.describe UsersController, type: :controller do
  describe '#login' do
    context 'with username and password' do
      before do
        user   = load_user
        params = { email: user.email, password: user.password }
        post :login, params: params
      end

      it 'should return a token' do
        request_response = JSON.parse(response.body)

        expect(response).to have_http_status(:ok)
        expect(request_response['user'].present?).to eq true
        expect(request_response['token'].present?).to eq true
      end
    end
  end
end