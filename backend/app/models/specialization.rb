class Specialization < ApplicationRecord
  validates :name, uniqueness: true, presence: true

  has_many :providers
end
