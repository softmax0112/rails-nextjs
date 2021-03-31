class AddCustomers < ActiveRecord::Migration[6.1]
  def change
    create_table :customers do |t|
      t.string :email
      t.belongs_to :provider, null: false, foreign_key: true

      t.timestamps
    end
  end
end
