class AddColumnsToUsers < ActiveRecord::Migration[6.1]
  def change
    add_column :users, :password, :string
    add_column :users, :is_admin, :boolean, default: false
  end
end
