class UserNotificationMailer < ApplicationMailer
  def notify_provider(customer)
    @provider = customer.provider
    @customer = customer
    mail(to: @provider.email, subject: "Inquiry for Consultation")
  end

  def notify_customer(customer)
    @customer = customer
    mail(to: @customer.email, subject: "Thank you for your Interest")
  end
end
