class Customer < ApplicationRecord
  validates :email, presence: true
  
  belongs_to :provider
  
  after_create_commit :send_email_to_provider, :send_email_to_customer

  def send_email_to_provider
    UserNotificationMailer.notify_provider(self).deliver_now
  end

  def send_email_to_customer
    UserNotificationMailer.notify_customer(self).deliver_now
  end
end