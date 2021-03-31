require 'rails_helper'

RSpec.describe User, type: :model do
  describe '#validations' do
    context 'Saving user - create' do
      context 'with invalid params' do
        before(:each) do
          @user = User.new(email: 'admin1@gmail.com', password: 'testing1', is_admin: true)
        end

        context 'email presence case:' do
          before do
            @user.email = ''
          end

          it "should expect email can't be blank error" do
            expect(@user.save).to eq false
            expect(@user.errors.present?).to eq true
            expect(@user.errors[:email]).to include "can't be blank"
          end
        end

        context 'email uniqueness case:' do
          before do
            create_user({ email: 'admin1@gmail.com', password: 'testing1', is_admin: true })
          end

          it "should expect email has already been taken error" do
            expect(@user.save).to eq false
            expect(@user.errors.present?).to eq true
            expect(@user.errors[:email]).to include "has already been taken"
          end
        end
      end

      context 'with valid params' do
        before(:each) do
          @user = User.new(email: 'admin2@gmail.com', password: 'testing1', is_admin: true)
        end

        it "should save the records in the database" do
          expect(@user.save).to eq true
          expect(@user.errors.present?).to eq false
        end
      end
    end
  end
end
