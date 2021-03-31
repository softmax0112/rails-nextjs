require 'rails_helper'

RSpec.describe Provider, type: :model do
  before(:all) do
    @specialization = load_specialization
  end

  describe '#validations' do
    context 'Saving provider (create and update)' do
      context 'with invlaid params' do
        before(:each) do
          @provider = Provider.new(first_name: 'provider', last_name: '1', username: 'provider1', specialization_id: @specialization.id, email: 'provider1@gmail.com', city: 'new york', state: 'new york', address: '79th street')
        end

        context 'first name presence case: ' do
          before do
            @provider.first_name = ''
          end

          it "should raise first_name can't be blank error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:first_name]).to include "can't be blank"
          end
        end

        context 'last name presence case: ' do
          before do
            @provider.last_name = ''
          end

          it "should raise last_name can't be blank error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:last_name]).to include "can't be blank"
          end
        end

        context 'username presence case: ' do
          before do
            @provider.username = ''
          end

          it "should raise username can't be blank error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:username]).to include "can't be blank"
          end
        end

        context 'username uniqueness case: ' do
          before do
            @provider1 = create_provider({ username: 'provider1', email: 'provider2@gmail.com' })
          end

          it "should raise username already taken error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:username]).to include "has already been taken"
          end
        end

        context 'email presence case: ' do
          before do
            @provider.email = ''
          end

          it "should raise email can't be blank error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:email]).to include "can't be blank"
          end
        end

        context 'email uniqueness case: ' do
          before do
            @provider1 = create_provider({ username: 'provider2', email: 'provider1@gmail.com' })
          end

          it "should raise email already taken error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:email]).to include "has already been taken"
          end
        end

        context 'city presence case: ' do
          before do
            @provider.city = ''
          end

          it "should raise city can't be blank error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:city]).to include "can't be blank"
          end
        end

        context 'state presence case: ' do
          before do
            @provider.state = ''
          end

          it "should raise state can't be blank error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:state]).to include "can't be blank"
          end
        end

        context 'specialization presence case: ' do
          before do
            @provider.specialization_id = nil
          end

          it "should raise specialization must exist error" do
            expect(@provider.save).to eq false
            expect(@provider.errors.present?).to eq true
            expect(@provider.errors[:specialization]).to include "must exist"
          end
        end
      end

      context 'with valid params' do
        before(:each) do
          @provider = Provider.new(first_name: 'provider', last_name: '1', username: 'validprovider1', specialization_id: @specialization.id, email: 'validprovider1@gmail.com', city: 'new york', state: 'new york', address: '79th street')
        end

        it "should save provider in the database" do
          expect(@provider.save).to eq true
          expect(@provider.errors.present?).to eq false
        end
      end
    end
  end

  describe 'scopes' do
    before(:all) do
      @provider1 = create_provider({ username: 'providerscope1', email: 'providerscope1@gmail.com' })
      @provider2 = create_provider({ username: 'providerscope2', email: 'providerscope2@gmail.com' })
      @provider3 = create_provider({ username: 'providerscope3', email: 'providerscope3@gmail.com' })
      @provider4 = create_provider({ username: 'providerscope4', email: 'providerscope4@gmail.com' })
      @provider5 = create_provider({ username: 'providerscope5', email: 'providerscope5@gmail.com' })
    end

    context 'recent:' do
      before do
        @providers = Provider.recent
      end

      it "should retreive all the providers from the database order by created_at" do
        expect(@providers.present?).to eq true
        expect(@providers.first).to eq @provider5
      end
    end
  end
end


