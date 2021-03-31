FactoryBot.define do
  factory :provider do
    first_name { "Robert" }
    last_name { "Cray" }
    username { "rocr" }
    association :specialization
    email { "robert@example.com" }
    address { "2706 Red Hawk Road" }
    city { "Maple Lake" }
    state { "MN" }
  end
end
