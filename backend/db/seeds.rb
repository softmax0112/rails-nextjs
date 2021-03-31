# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the bin/rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)


user = User.where(email: "admin@example.com", password: "password", is_admin: true).first_or_create

specialization1 = Specialization.where(name: 'Social Psychology').first_or_create
specialization1 = Specialization.where(name: 'Social Psychology').first_or_create
specialization2 = Specialization.where(name: 'Neuropsychology').first_or_create
specialization3 = Specialization.where(name: 'Sports Psychology').first_or_create

provider1 = Provider.where(first_name: 'Erick', last_name: 'Veale', username: 'erickV', specialization_id: specialization1.id, email: 'erickV@example.com', city: 'Los Angeles', state: 'CA', address: '5445 Paget Avenue').first_or_create
provider2 = Provider.where(first_name: 'Agnes', last_name: 'Mason', username: 'agmason', specialization_id: specialization2.id, email: 'agmason@example.com', city: 'Austin', state: 'TX', address: '9839 Dorton Hill').first_or_create
provider3 = Provider.where(first_name: 'Gloria', last_name: 'Hobbs', username: 'ghobbs', specialization_id: specialization3.id, email: 'ghobbs@example.com', city: 'Syracuse', state: 'NY', address: '996 Birchwood Center').first_or_create
provider4 = Provider.where(first_name: 'Kevin', last_name: 'Battra', username: 'kbattra', specialization_id: specialization1.id, email: 'kbattra@example.com', city: 'San Francisco', state: 'CA', address: '86 Pine View Crossing').first_or_create

provider5 = Provider.where(first_name: 'Salome', last_name: 'Schule', username: 'sschule0', specialization_id: specialization1.id, email: 'sschule0@example.com', city: 'Fort Wayne', state: 'IN', address: '670 Blackbird Street').first_or_create
provider6 = Provider.where(first_name: 'Duncan', last_name: 'Gerlts', username: 'dgerltse9', specialization_id: specialization2.id, email: 'dgerltse9@example.com', city: 'Paterson', state: 'NJ', address: 'Ernest Route, 7564').first_or_create
provider7 = Provider.where(first_name: 'Kermit', last_name: 'McPake', username: 'kmcpakeea', specialization_id: specialization3.id, email: 'kmcpakeea@example.com', city: 'Houston', state: 'TX', address: '3 Waubesa Point').first_or_create
provider8 = Provider.where(first_name: 'Lurline', last_name: 'Odger', username: 'lodgereb', specialization_id: specialization1.id, email: 'lodgereb@example.com', city: 'San Francisco', state: 'CA', address: '85286 Columbus Road').first_or_create

provider9 = Provider.where(first_name: 'Donovan', last_name: 'McWhorter', username: 'dovwhorterg', specialization_id: specialization1.id, email: 'dovwhorterg@example.com', city: 'Chattanooga', state: 'IN', address: '6 Monterey Road').first_or_create
provider10 = Provider.where(first_name: 'Calli', last_name: 'Carass', username: 'agmason', specialization_id: specialization2.id, email: 'agmason@example.com', city: 'Austin', state: 'TX', address: '80489 Harbort Drive').first_or_create
provider11 = Provider.where(first_name: 'Ofelia', last_name: 'Verrier', username: 'ghobbs', specialization_id: specialization3.id, email: 'ghobbs@example.com', city: 'Syracuse', state: 'NY', address: '5445 Paget Avenue').first_or_create
provider12 = Provider.where(first_name: 'Zora', last_name: 'Kermeen', username: 'kbattra', specialization_id: specialization1.id, email: 'kbattra@example.com', city: 'San Francisco', state: 'CA', address: '333 Northport Drive').first_or_create

provider13 = Provider.where(first_name: 'Jemimah', last_name: 'Proven', username: 'jemP', specialization_id: specialization1.id, email: 'jemP@example.com', city: 'Riverside', state: 'CA', address: '32 Dawn Plaza').first_or_create
provider14 = Provider.where(first_name: 'Janenna', last_name: 'Thomson', username: 'jenennatom', specialization_id: specialization2.id, email: 'jenennatom@example.com', city: 'Austin', state: 'TX', address: '5443 Hayes Junction').first_or_create
provider15 = Provider.where(first_name: 'Guthrie', last_name: 'Barmby', username: 'barmgu', specialization_id: specialization3.id, email: 'barmgu@example.com', city: 'Syracuse', state: 'NY', address: '5 Springs Court').first_or_create
provider16 = Provider.where(first_name: 'Thacher', last_name: 'Pigram', username: 'gmatha', specialization_id: specialization1.id, email: 'gmatha@example.com', city: 'Maple Plain', state: 'MN', address: '74317 Dunning Plaza').first_or_create

provider17 = Provider.where(first_name: 'Bobbie', last_name: 'Roels', username: 'roe17', specialization_id: specialization1.id, email: 'roe17@example.com', city: 'Charleston', state: 'WV', address: '335 Mockingbird Park').first_or_create
provider18 = Provider.where(first_name: 'Leann', last_name: 'Pitsall', username: 'leann89', specialization_id: specialization2.id, email: 'leann89@example.com', city: 'Bradenton', state: 'FL', address: '4 Bunker Hill Place').first_or_create
provider19 = Provider.where(first_name: 'Pammy', last_name: 'Start', username: 'pamm78', specialization_id: specialization3.id, email: 'pamm78@example.com', city: 'Bronx', state: 'NY', address: '9839 Dorton Hill').first_or_create
provider20 = Provider.where(first_name: 'Silvie', last_name: 'Farriar', username: 'silfar', specialization_id: specialization1.id, email: 'silfar@example.com', city: 'Pueblo', state: 'CO', address: '996 Birchwood Center').first_or_create

provider21 = Provider.where(first_name: 'Julina', last_name: 'Oldford', username: 'julold', specialization_id: specialization1.id, email: 'julold@example.com', city: 'Saint Louis', state: 'MO', address: '0329 Armistice Lane').first_or_create
provider22 = Provider.where(first_name: 'Hall', last_name: 'Cokly', username: 'hallcok', specialization_id: specialization2.id, email: 'hallcok@example.com', city: 'Albuquerque', state: 'NM', address: '86 Pine View Crossing').first_or_create
provider23 = Provider.where(first_name: 'Kerby', last_name: 'Lichfield', username: 'kerbylin', specialization_id: specialization3.id, email: 'kerbylin@example.com', city: 'Orlando', state: 'FL', address: '3 Arizona Avenue').first_or_create
provider24 = Provider.where(first_name: 'Norina', last_name: 'Rama', username: 'norrama', specialization_id: specialization1.id, email: 'norrama@example.com', city: 'Cincinnati', state: 'OH', address: '9878 Huxley Junction').first_or_create

provider25 = Provider.where(first_name: 'Mireielle', last_name: 'Byram', username: 'mireieby', specialization_id: specialization1.id, email: 'mireieby@example.com', city: 'Denver', state: 'CO', address: '03504 Roxbury Circle').first_or_create
provider26 = Provider.where(first_name: 'Bliss', last_name: 'svibertmt', username: 'blisssvi', specialization_id: specialization2.id, email: 'blisssvi@example.com', city: 'Dallas', state: 'TX', address: '290 Raven Alley').first_or_create
provider27 = Provider.where(first_name: 'Ruthanne', last_name: 'Hickford', username: 'ruth75', specialization_id: specialization3.id, email: 'ruth75@example.com', city: 'Atlanta', state: 'GA', address: '389 Kings Circle').first_or_create
provider28 = Provider.where(first_name: 'Roger', last_name: 'Eckley', username: 'rg1729', specialization_id: specialization1.id, email: 'reckleygg@example.com', city: 'Detroit', state: 'MI', address: '5883 Rowland Center').first_or_create

# customer1  = provider1.customers.create(email: 'customer1@example.com')
# customer2  = provider2.customers.create(email: 'customer2@example.com')
# customer3  = provider3.customers.create(email: 'customer3@example.com')
# customer4  = provider4.customers.create(email: 'customer4@example.com')
# customer5  = provider1.customers.create(email: 'customer1@example.com')
# customer6  = provider1.customers.create(email: 'customer2@example.com')
# customer7  = provider1.customers.create(email: 'customer3@example.com')
# customer8  = provider1.customers.create(email: 'customer4@example.com')
# customer9  = provider2.customers.create(email: 'customer1@example.com')
# customer10 = provider3.customers.create(email: 'customer2@example.com')
# customer11 = provider4.customers.create(email: 'customer3@example.com')
# customer12 = provider3.customers.create(email: 'customer4@example.com')