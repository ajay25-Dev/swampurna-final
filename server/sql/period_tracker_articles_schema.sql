-- Run this SQL in Supabase SQL Editor.
-- Educational articles shown from period tracker categories.

create extension if not exists pgcrypto;

create table if not exists public.period_tracker_articles (
  id uuid primary key default gen_random_uuid(),
  category_key text not null,
  category_label text not null,
  slug text not null unique,
  title text not null,
  detail_title text not null,
  content text not null,
  cycle_phase text,
  priority text,
  sort_order int not null default 0,
  is_active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table if exists public.period_tracker_articles
  add column if not exists content text;

do $$
begin
  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'period_tracker_articles'
      and column_name = 'intro_text'
  ) then
    alter table public.period_tracker_articles alter column intro_text drop not null;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'period_tracker_articles'
      and column_name = 'why_this_matters'
  ) then
    alter table public.period_tracker_articles alter column why_this_matters drop not null;
  end if;

  if exists (
    select 1 from information_schema.columns
    where table_schema = 'public'
      and table_name = 'period_tracker_articles'
      and column_name = 'bullets'
  ) then
    alter table public.period_tracker_articles alter column bullets drop not null;
  end if;
end;
$$;

create index if not exists idx_period_tracker_articles_category_sort
  on public.period_tracker_articles(category_key, sort_order);

create index if not exists idx_period_tracker_articles_phase_priority
  on public.period_tracker_articles(cycle_phase, priority);

create or replace function public.set_period_tracker_articles_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists trg_period_tracker_articles_updated_at on public.period_tracker_articles;
create trigger trg_period_tracker_articles_updated_at
before update on public.period_tracker_articles
for each row
execute procedure public.set_period_tracker_articles_updated_at();

insert into public.period_tracker_articles (
  category_key,
  category_label,
  slug,
  title,
  detail_title,
  content,
  cycle_phase,
  priority,
  sort_order
) values
  (
    'hydration',
    'Hydration',
    'flow-types-hydration',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    10
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    20
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    30
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    40
  ),
  (
    'mood',
    'Mood',
    'mood-support',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    50
  ),
  (
    'pain',
    'Pain',
    'pain-relief',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    60
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    70
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    80
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    90
  ),
  (
    'stress',
    'Stress',
    'stress-support',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    100
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-2',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    110
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-2',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    120
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-2',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    130
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-2',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    140
  ),
  (
    'mood',
    'Mood',
    'mood-support-2',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    150
  ),
  (
    'pain',
    'Pain',
    'pain-relief-2',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    160
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-2',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    170
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-2',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    180
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-2',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    190
  ),
  (
    'stress',
    'Stress',
    'stress-support-2',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    200
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-3',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    210
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-3',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    220
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-3',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    230
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-3',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    240
  ),
  (
    'mood',
    'Mood',
    'mood-support-3',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    250
  ),
  (
    'pain',
    'Pain',
    'pain-relief-3',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    260
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-3',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    270
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-3',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    280
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-3',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    290
  ),
  (
    'stress',
    'Stress',
    'stress-support-3',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    300
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-4',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    310
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-4',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    320
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-4',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    330
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-4',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    340
  ),
  (
    'mood',
    'Mood',
    'mood-support-4',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    350
  ),
  (
    'pain',
    'Pain',
    'pain-relief-4',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    360
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-4',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    370
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-4',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    380
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-4',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    390
  ),
  (
    'stress',
    'Stress',
    'stress-support-4',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    400
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-5',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    410
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-5',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    420
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-5',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    430
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-5',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    440
  ),
  (
    'mood',
    'Mood',
    'mood-support-5',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    450
  ),
  (
    'pain',
    'Pain',
    'pain-relief-5',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    460
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-5',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    470
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-5',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    480
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-5',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    490
  ),
  (
    'stress',
    'Stress',
    'stress-support-5',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    500
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-6',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    510
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-6',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    520
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-6',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    530
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-6',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    540
  ),
  (
    'mood',
    'Mood',
    'mood-support-6',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    550
  ),
  (
    'pain',
    'Pain',
    'pain-relief-6',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    560
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-6',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    570
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-6',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    580
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-6',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    590
  ),
  (
    'stress',
    'Stress',
    'stress-support-6',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    600
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-7',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    610
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-7',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    620
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-7',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    630
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-7',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    640
  ),
  (
    'mood',
    'Mood',
    'mood-support-7',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    650
  ),
  (
    'pain',
    'Pain',
    'pain-relief-7',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    660
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-7',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    670
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-7',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    680
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-7',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    690
  ),
  (
    'stress',
    'Stress',
    'stress-support-7',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    700
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-8',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    710
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-8',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    720
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-8',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    730
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-8',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    740
  ),
  (
    'mood',
    'Mood',
    'mood-support-8',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    750
  ),
  (
    'pain',
    'Pain',
    'pain-relief-8',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    760
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-8',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    770
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-8',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    780
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-8',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    790
  ),
  (
    'stress',
    'Stress',
    'stress-support-8',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    800
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-9',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    810
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-9',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    820
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-9',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    830
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-9',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    840
  ),
  (
    'mood',
    'Mood',
    'mood-support-9',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    850
  ),
  (
    'pain',
    'Pain',
    'pain-relief-9',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    860
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-9',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    870
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-9',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    880
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-9',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    890
  ),
  (
    'stress',
    'Stress',
    'stress-support-9',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    900
  ),
  (
    'hydration',
    'Hydration',
    'flow-types-hydration-10',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During your period, your body may lose more fluids than usual, especially on heavier flow days. Staying hydrated can help support your body and may reduce feelings of tiredness, headaches, or discomfort. Small hydration habits throughout the day can make a noticeable difference. Tips: Drink water regularly; Include fruits and soups; Reduce excess caffeine.',
    'Period',
    'High',
    910
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition-10',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Your body uses energy and nutrients differently during different stages of your cycle. Eating balanced meals with iron-rich foods, fruits, vegetables, and proteins can help support energy levels and overall wellbeing. Tips: Eat iron-rich foods; Do not skip meals; Add fruits and vegetables.',
    'Period',
    'High',
    920
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement-10',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. You do not always need intense workouts during your period. Gentle movement such as stretching, yoga, or short walks may help improve circulation and support comfort without putting too much stress on your body. Tips: Try gentle stretching; Take short walks; Listen to your body.',
    'Period',
    'Medium',
    930
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery-10',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Hormonal changes throughout the menstrual cycle can affect sleep quality and energy levels. Good sleep habits can help support mood, concentration, and physical recovery. Tips: Keep a regular sleep schedule; Reduce screen time before bed; Create a calming routine.',
    'PMS',
    'Medium',
    940
  ),
  (
    'mood',
    'Mood',
    'mood-support-10',
    'Mood Support',
    'Understanding Mood Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Emotional changes can happen during different phases of your cycle because hormone levels naturally change over time. Understanding these patterns may help you feel more prepared and supported. Tips: Take small breaks; Practice deep breathing; Talk to someone you trust.',
    'PMS',
    'Medium',
    950
  ),
  (
    'pain',
    'Pain',
    'pain-relief-10',
    'Pain Relief',
    'Managing Period Discomfort',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Mild discomfort or cramps can happen for many people during their cycle. Understanding your body and using healthy habits may help reduce discomfort and improve day-to-day comfort. Tips: Use a heating pad if needed; Rest when your body asks; Track discomfort patterns.',
    'Period',
    'High',
    960
  ),
  (
    'ovulation',
    'Ovulation',
    'body-awareness-10',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. During ovulation, some people may notice changes in energy, mood, or body signals. Learning these patterns can help improve awareness and understanding of your cycle. Tips: Pay attention to body changes; Stay hydrated; Notice energy changes.',
    'Ovulation',
    'Medium',
    970
  ),
  (
    'hygiene',
    'Hygiene',
    'healthy-habits-10',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual hygiene plays an important role in comfort and overall wellbeing. Small habits such as changing products regularly and maintaining cleanliness may help support everyday health. Tips: Change products regularly; Wash hands properly; Prioritize cleanliness.',
    'General',
    'Medium',
    980
  ),
  (
    'wellness',
    'Wellness',
    'general-wellness-10',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Menstrual health is connected to many parts of your daily life, including sleep, nutrition, movement, and stress. Supporting your overall wellbeing can help create healthier routines. Tips: Take care of your body daily; Build healthy routines; Rest when needed.',
    'General',
    'Low',
    990
  ),
  (
    'stress',
    'Stress',
    'stress-support-10',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Your body goes through natural changes throughout your cycle. This insight is designed to help you better understand and support your wellbeing. Stress can sometimes affect your mood, sleep, and even menstrual patterns. Building simple stress-management habits may help support both emotional and physical wellbeing. Tips: Practice relaxation exercises; Take mindful pauses; Manage daily stress.',
    'General',
    'Medium',
    1000
  )
on conflict (slug) do update set
  category_key = excluded.category_key,
  category_label = excluded.category_label,
  title = excluded.title,
  detail_title = excluded.detail_title,
  content = excluded.content,
  cycle_phase = excluded.cycle_phase,
  priority = excluded.priority,
  sort_order = excluded.sort_order,
  is_active = true;
