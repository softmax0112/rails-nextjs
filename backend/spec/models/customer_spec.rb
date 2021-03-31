require 'rails_helper'

RSpec.describe Customer, type: :model do
  describe '#validations' do
    context 'Saving customer - create' do
      before(:all) do
        @provider = load_provider
      end

      context 'with invalid params' do
        before(:each) do
          @customer = Customer.new(email: 'customer1@gmail.com', provider_id: @provider.id)
        end

        context 'email presence case:' do
          before do
            @customer.email = ''
          end

          it "should expect email can't be blank error" do
            expect(@customer.save).to eq false
            expect(@customer.errors.present?).to eq true
            expect(@customer.errors[:email]).to include "can't be blank"
          end
        end

        context 'provider_id presence case:' do
          before do
            @customer.provider_id = nil
          end

          it "should expect provider_id must exist error" do
            expect(@customer.save).to eq false
            expect(@customer.errors.present?).to eq true
            expect(@customer.errors[:provider]).to include "must exist"
          end
        end
      end

      context 'with valid params' do
        before(:each) do
          @customer = Customer.new(email: 'customer2@gmail.com', provider_id: @provider.id)
        end

        it "should save the records in the database" do
          expect(@customer.save).to eq true
          expect(@customer.errors.present?).to eq false
        end
      end
    end
  end
end