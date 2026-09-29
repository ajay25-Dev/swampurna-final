-- Run this SQL in Supabase SQL Editor, AFTER content_library_schema.sql.
-- Adds one sample item per category, covering each content type (video,
-- comic, photo, guide), so the Content Library screens have something to
-- show right away. Thumbnails/images use Lorem Picsum (free placeholder
-- photos) and the video uses Google's public sample video bucket - swap
-- these out for real admin-uploaded media whenever convenient via the
-- Admin > Content Library page.

-- 1. Lifestyle & Wellness -> guide
insert into public.content_library_items
  (category_id, type, title, description, thumbnail_url, phases, status, sort_order)
values (
  (select id from public.content_library_categories where slug = 'lifestyle-wellness'),
  'guide',
  'Building Healthy Daily Habits',
  'Small, consistent habits that support a balanced cycle and overall wellbeing.',
  'https://picsum.photos/id/1074/600/800',
  '[
    {"title": "Stay Hydrated", "body": "Drink plenty of water throughout the day - it helps ease bloating and supports overall hormonal balance.", "image_url": "https://picsum.photos/id/225/800/500"},
    {"title": "Move Your Body", "body": "Light exercise like walking, stretching or yoga can reduce cramps and improve mood during your cycle.", "image_url": "https://picsum.photos/id/1076/800/500"},
    {"title": "Prioritize Sleep", "body": "Aim for 7-9 hours of sleep. Good rest helps regulate the hormones that drive your menstrual cycle.", "image_url": "https://picsum.photos/id/1040/800/500"}
  ]'::jsonb,
  'published',
  0
);

-- 2. Menstrual Cycle & Anatomy -> video
insert into public.content_library_items
  (category_id, type, title, description, thumbnail_url, media_url, status, sort_order)
values (
  (select id from public.content_library_categories where slug = 'menstrual-cycle-anatomy'),
  'video',
  'Understanding Your Menstrual Cycle',
  'A simple visual walkthrough of the four phases of the menstrual cycle and what happens in your body during each one.',
  'https://picsum.photos/id/1062/600/800',
  'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4',
  'published',
  0
);

-- 3. Health Conditions -> comic
insert into public.content_library_items
  (category_id, type, title, description, thumbnail_url, image_urls, status, sort_order)
values (
  (select id from public.content_library_categories where slug = 'health-conditions'),
  'comic',
  'Recognizing PCOS: A Visual Guide',
  'A quick, easy-to-follow comic explaining common PCOS symptoms and when to see a doctor.',
  'https://picsum.photos/id/1005/600/800',
  '["https://picsum.photos/id/1005/800/1000", "https://picsum.photos/id/1011/800/1000", "https://picsum.photos/id/1027/800/1000"]'::jsonb,
  'published',
  0
);

-- 4. Hygiene -> photo
insert into public.content_library_items
  (category_id, type, title, description, thumbnail_url, image_urls, status, sort_order)
values (
  (select id from public.content_library_categories where slug = 'hygiene'),
  'photo',
  'Menstrual Hygiene Essentials',
  'Everyday hygiene practices to prevent infection and stay comfortable during your period.',
  'https://picsum.photos/id/1059/600/800',
  '["https://picsum.photos/id/1059/800/1000", "https://picsum.photos/id/1060/800/1000", "https://picsum.photos/id/1063/800/1000"]'::jsonb,
  'published',
  0
);

-- 5. Product Guides -> guide
insert into public.content_library_items
  (category_id, type, title, description, thumbnail_url, phases, status, sort_order)
values (
  (select id from public.content_library_categories where slug = 'product-guides'),
  'guide',
  'Choosing the Right Period Product',
  'Compare pads, tampons and menstrual cups to find what best fits your lifestyle.',
  'https://picsum.photos/id/1080/600/800',
  '[
    {"title": "Sanitary Pads", "body": "Easy to use and widely available. Best for beginners and overnight use. Change every 4-6 hours.", "image_url": "https://picsum.photos/id/1081/800/500"},
    {"title": "Tampons", "body": "Compact and discreet, good for sports and swimming. Change every 4-8 hours to reduce infection risk.", "image_url": "https://picsum.photos/id/1082/800/500"},
    {"title": "Menstrual Cups", "body": "Reusable and eco-friendly, can be worn up to 12 hours. Takes a little practice to insert and remove.", "image_url": "https://picsum.photos/id/1084/800/500"}
  ]'::jsonb,
  'published',
  0
);
