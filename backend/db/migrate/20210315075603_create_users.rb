class CreateUsers < ActiveRecord::Migration[6.1]
  def change
    create_table :users do |t|
      t.belongs_to :provider, null: false, foreign_key: true
      t.string :email

      t.timestamps
    end
  end
end
