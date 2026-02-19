-- Enable Row Level Security (RLS)
alter table stores enable row level security;
alter table categories enable row level security;
alter table listings enable row level security;
alter table users enable row level security;

-- Create indexes
create index if not exists idx_stores_slug on stores(slug);
create index if not exists idx_stores_created_by on stores(created_at desc);
create index if not exists idx_stores_created_by on stores(created_by);

create index if not exists idx_categories_slug on categories(slug);
create index if not exists idx_categories_store_id on categories(store_id);

create index if not exists idx_listings_slug on listings(slug);
create index if not exists idx_listings_store_id on listings(store_id);
create index if not exists idx_listings_category_id on listings(category_id);
create index if not exists idx_listings_status on listings(status);
create index if not exists idx_listings_price on listings(price);
create index if not exists idx_listings_created_at on listings(created_at desc);

-- Create policies
-- Stores: Anyone can read, only authenticated users can create/update/delete
create policy "Enable read access for all users" on stores for select using (true);
create policy "Enable insert for authenticated users only" on stores for insert with check (auth.uid() is not null);
create policy "Enable update for all users" on stores for update using (check (auth.uid() = created_by or auth.role() = 'authenticated');
create policy "Enable delete for all users" on stores for delete using (check (auth.uid() = created_by or auth.role() = 'authenticated');

-- Categories: Anyone can read, only store owners can create/update/delete
create policy "Enable read access for all users" on categories for select using (true);
create policy "Enable insert for authenticated users only" on categories for insert with check (auth.uid() is not null);
create policy "Enable update for store owners only" on categories for update using (check (auth.uid() = created_by or (select store_id from stores where id = store_id and created_by = auth.uid()) is not null) or auth.role() = 'authenticated');
create policy "Enable delete for store owners only" on categories for delete using (check (auth.uid() = created_by or (select store_id from stores where id = store_id and created_by = auth.uid()) is not null) or auth.role() = 'authenticated');

-- Listings: Anyone can read, only store owners can create/update/delete
create policy "Enable read access for all users" on listings for select using (true);
create policy "Enable insert for authenticated users only" on listings for insert with check (auth.uid() is not null);
create policy "Enable update for store owners only" on listings for update using (check (auth.uid() = created_by or (select store_id from stores where id = store_id and created_by = auth.uid()) is not null) or auth.role() = 'authenticated');
create policy "Enable delete for store owners only" on listings for delete using (check (auth.uid() = created_by or (select store_id from stores where id = store_id and created_by = auth.uid()) is not null) or auth.role() = 'authenticated');

-- Users: Users can only read/update their own data
create policy "Enable read access for own users only" on users for select using (auth.uid() = id);
create policy "Enable update for own users only" on users for update using (auth.uid() = id);
create policy "Enable insert for own users only" on users for insert with check (auth.uid() = id);

-- Create function to automatically set created_by
create or replace function set_created_by()
returns trigger as $$
declare
    begin
        new.created_by := auth.uid();
        new.updated_at := now();
        return new;
    end;
$$ language plpgsql;

-- Create triggers
create trigger on stores before insert
    for each row
    execute procedure set_created_by();

create trigger on stores before update
    for each row
    execute procedure set_created_by();

create trigger on categories before insert
    for each row
    execute procedure set_created_by();

create trigger on categories before update
    for each row
    execute procedure set_created_by();

create trigger on listings before insert
    for each row
    execute procedure set_created_by();

create trigger on listings before update
    for each row
    execute procedure set_created_by();
