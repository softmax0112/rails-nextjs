class CreateProviders < ActiveRecord::Migration[6.1]
  def change
    create_table :providers do |t|
      t.string :first_name
      t.string :last_name
      t.string :username
      t.belongs_to :specialization, null: false, foreign_key: true
      t.string :email
      t.string :address
      t.string :city
      t.string :state

      t.timestamps
    end
  end
end
