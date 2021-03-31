class ProviderSerializer < ActiveModel::Serializer
  attributes :id, :first_name, :last_name, :username, :email, :address, :city, :state, :created_at, :updated_at, :specialization_name

  def specialization_name
    object.specialization.name
  end
end
