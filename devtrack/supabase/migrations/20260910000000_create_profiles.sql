-- Create a table for public profiles
create table profiles (
  id uuid references auth.users not null primary key,
  updated_at timestamp with time zone,
  name text,
  email text,
  college text,
  year text,
  branch text,
  phone text,
  profile_photo_url text,
  bio text
);

-- Set up Row Level Security (RLS)
alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone."
  on profiles for select
  using ( true );

create policy "Users can insert their own profile."
  on profiles for insert
  with check ( auth.uid() = id );

create policy "Users can update own profile."
  on profiles for update
  using ( auth.uid() = id );

-- This trigger automatically creates a profile entry when a new user signs up via Supabase Auth.
-- It maps the data passed in the `options.data` during signUp to the columns in the profile table.
create function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, name, email, college, year, branch, phone, updated_at)
  values (
    new.id,
    new.raw_user_meta_data->>'full_name',
    new.email,
    new.raw_user_meta_data->>'college',
    new.raw_user_meta_data->>'year',
    new.raw_user_meta_data->>'branch',
    new.raw_user_meta_data->>'phone',
    now()
  );
  return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Set up Storage for Profile Photos
insert into storage.buckets (id, name, public) values ('profiles', 'profiles', true)
on conflict (id) do nothing;

create policy "Profile images are publicly accessible."
  on storage.objects for select
  using ( bucket_id = 'profiles' );

create policy "Anyone can upload a profile image."
  on storage.objects for insert
  with check ( bucket_id = 'profiles' and auth.role() = 'authenticated' );

create policy "Users can update their own profile image."
  on storage.objects for update
  using ( bucket_id = 'profiles' and auth.uid() = owner );

create policy "Users can delete their own profile image."
  on storage.objects for delete
  using ( bucket_id = 'profiles' and auth.uid() = owner );
