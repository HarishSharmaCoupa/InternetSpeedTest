FactoryBot.define do
    factory :place do
        place
        download_speed {Faker::Number.decimal(l_digits: 2, r_digits: 2)}
        download_units {"mbps"}
    end
end