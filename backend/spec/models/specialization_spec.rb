require 'rails_helper'

RSpec.describe Specialization, type: :model do
  describe '#validations' do
    context 'Saving Specialization - create' do
      context 'with invalid params' do
        before(:each) do
          @specialization = Specialization.new(name: 'specialization')
        end

        context 'name presence case:' do
          before do
            @specialization.name = ''
          end

          it "should expect name can't be blank error" do
            expect(@specialization.save).to eq false
            expect(@specialization.errors.present?).to eq true
            expect(@specialization.errors[:name]).to include "can't be blank"
          end
        end

        context 'name uniqueness case:' do
          before do
            create_specialization({ name: 'specialization' })
          end

          it "should expect name has already been taken error" do
            expect(@specialization.save).to eq false
            expect(@specialization.errors.present?).to eq true
            expect(@specialization.errors[:name]).to include "has already been taken"
          end
        end
      end

      context 'with valid params' do
        before(:each) do
          @specialization = Specialization.new(name: 'valid specialization')
        end

        it "should save the records in the database" do
          expect(@specialization.save).to eq true
          expect(@specialization.errors.present?).to eq false
        end
      end
    end
  end
end
