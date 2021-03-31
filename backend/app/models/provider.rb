class Provider < ApplicationRecord
  validates :last_name, presence: true
  validates :first_name, presence: true
  validates :city, presence: true
  validates :state, presence: true
  validates :email, uniqueness: true, presence: true
  validates :username, uniqueness: true, presence: true

  belongs_to :specialization
  has_many   :customers, dependent: :destroy

  scope :recent, -> { order(created_at: :desc) }

  def full_name
    "#{first_name} #{last_name}"
  end
end
