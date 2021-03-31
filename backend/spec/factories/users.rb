FactoryBot.define do
  factory :user do
    association :provider
    email { "andrew@example.com" }
  end
end
