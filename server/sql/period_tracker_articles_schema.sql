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

-- Targeting: which period_tracker_options (as "category_key:option_key" strings)
-- should surface this article. An empty array means the article is general
-- and shown to everyone regardless of their selections.
alter table if exists public.period_tracker_articles
  add column if not exists target_options jsonb not null default '[]'::jsonb;

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

-- One-time cleanup: earlier seeding accidentally inserted the same 10 articles
-- 10 times each (slugs suffixed -2, -3, ... -10) with generic placeholder text.
-- Remove those duplicates; the upsert below rewrites the original 10 slugs
-- with real, distinct content.
delete from public.period_tracker_articles
where slug ~ '-(2|3|4|5|6|7|8|9|10)$'
  and slug in (
    'flow-types-hydration-2','flow-types-hydration-3','flow-types-hydration-4','flow-types-hydration-5',
    'flow-types-hydration-6','flow-types-hydration-7','flow-types-hydration-8','flow-types-hydration-9','flow-types-hydration-10',
    'period-friendly-nutrition-2','period-friendly-nutrition-3','period-friendly-nutrition-4','period-friendly-nutrition-5',
    'period-friendly-nutrition-6','period-friendly-nutrition-7','period-friendly-nutrition-8','period-friendly-nutrition-9','period-friendly-nutrition-10',
    'gentle-movement-2','gentle-movement-3','gentle-movement-4','gentle-movement-5',
    'gentle-movement-6','gentle-movement-7','gentle-movement-8','gentle-movement-9','gentle-movement-10',
    'sleep-recovery-2','sleep-recovery-3','sleep-recovery-4','sleep-recovery-5',
    'sleep-recovery-6','sleep-recovery-7','sleep-recovery-8','sleep-recovery-9','sleep-recovery-10',
    'mood-support-2','mood-support-3','mood-support-4','mood-support-5',
    'mood-support-6','mood-support-7','mood-support-8','mood-support-9','mood-support-10',
    'pain-relief-2','pain-relief-3','pain-relief-4','pain-relief-5',
    'pain-relief-6','pain-relief-7','pain-relief-8','pain-relief-9','pain-relief-10',
    'body-awareness-2','body-awareness-3','body-awareness-4','body-awareness-5',
    'body-awareness-6','body-awareness-7','body-awareness-8','body-awareness-9','body-awareness-10',
    'healthy-habits-2','healthy-habits-3','healthy-habits-4','healthy-habits-5',
    'healthy-habits-6','healthy-habits-7','healthy-habits-8','healthy-habits-9','healthy-habits-10',
    'general-wellness-2','general-wellness-3','general-wellness-4','general-wellness-5',
    'general-wellness-6','general-wellness-7','general-wellness-8','general-wellness-9','general-wellness-10',
    'stress-support-2','stress-support-3','stress-support-4','stress-support-5',
    'stress-support-6','stress-support-7','stress-support-8','stress-support-9','stress-support-10'
  );

insert into public.period_tracker_articles (
  category_key,
  category_label,
  slug,
  title,
  detail_title,
  content,
  cycle_phase,
  priority,
  sort_order,
  target_options
) values
  (
    'hydration',
    'Hydration',
    'flow-types-hydration',
    'Flow Types & Hydration',
    'Understanding Flow & Hydration During Periods',
    'On heavier flow days your body loses extra fluid, and that on top of normal daily needs is why period fatigue, headaches, and dizziness are so common. Blood loss during a typical period is usually 30-80ml across the cycle, but the dehydration risk comes from cumulative water loss plus reduced appetite, not the blood itself. Aim for at least 8-10 glasses of water a day during your period, and more if you are active or in a hot climate. Watch for early dehydration signs: dark urine, dry mouth, unusual tiredness, or a headache that water quickly improves. Water-rich foods like cucumber, watermelon, oranges, and soups count toward your fluid intake and add electrolytes and vitamins at the same time. Herbal teas (ginger, chamomile, peppermint) can ease bloating and cramps while keeping you hydrated. Go easy on caffeine and very salty snacks - both increase fluid loss and can make bloating and cramping feel worse. If you notice heavy flow (soaking a pad/tampon every 1-2 hours) alongside dizziness or fainting, that is worth mentioning to a doctor, since it could point to iron-deficiency anemia.',
    'Period',
    'High',
    10,
    '[]'::jsonb
  ),
  (
    'nutrition',
    'Nutrition',
    'period-friendly-nutrition',
    'Period-Friendly Nutrition',
    'Eating Well During Your Period',
    'Menstruation is when your iron needs rise the most, since you lose iron along with blood. Left unaddressed over several cycles, this can contribute to fatigue and, in some cases, iron-deficiency anemia. Build meals around iron-rich foods - spinach and other leafy greens, lentils, chickpeas, beans, eggs, and lean meat or fish if you eat them - and pair them with vitamin C (citrus, tomatoes, bell peppers, amla) which roughly triples how much iron your body actually absorbs. Magnesium-rich foods such as almonds, pumpkin seeds, bananas, and dark chocolate (70%+) can help ease cramps by relaxing uterine muscle, and complex carbs like oats, brown rice, and whole grains keep blood sugar - and mood - steadier than sugary snacks, which tend to cause an energy crash an hour later. Try not to skip meals; long gaps make period fatigue and irritability worse. Reduce excess salt and fried food, which worsen bloating and water retention. A simple rule that works for most people: three balanced meals, one iron-rich food and one vitamin-C food at each, and a handful of nuts or seeds as a snack.',
    'Period',
    'High',
    20,
    '[]'::jsonb
  ),
  (
    'exercise',
    'Exercise',
    'gentle-movement',
    'Gentle Movement',
    'Moving Your Body During Your Period',
    'You do not need to push through an intense workout during your period, but staying completely still is not the goal either - light movement increases blood flow to the pelvis and releases endorphins, your body''s natural painkillers, which can genuinely reduce cramp intensity. A 15-20 minute walk, gentle cycling, or swimming (if you are comfortable) are all good low-impact options. Yoga poses that target the lower back and hips - child''s pose, cat-cow, supine twist, and legs-up-the-wall - are widely used to ease cramping and lower back ache. Simple stretching for 5-10 minutes in the morning or before bed can loosen tight muscles that period cramps tend to aggravate. On heavy-flow or high-pain days, it is completely fine to scale back to just stretching or rest; there is no "should" here, only what your body signals that day. Avoid very high-intensity training (heavy lifting maxes, sprint intervals) on days when you feel dizzy, extremely fatigued, or in significant pain - that is your body asking for recovery, not a sign of low fitness.',
    'Period',
    'Medium',
    30,
    '[]'::jsonb
  ),
  (
    'sleep',
    'Sleep',
    'sleep-recovery',
    'Sleep & Recovery',
    'Sleep Matters During PMS',
    'In the days before your period (the luteal phase), progesterone rises and then drops sharply right before bleeding starts - and that drop is closely linked to disrupted sleep, night sweats, and vivid or restless dreams that many people notice pre-period. Your core body temperature is also slightly higher in this phase, which can make it harder to fall asleep in a warm room. Keep a consistent sleep and wake time even on weekends; your body clock recovers faster from PMS-related disruption when the schedule stays steady. Cool your room down a degree or two more than usual, and swap heavy blankets for lighter layers if night sweats are an issue. Cut screens (phone, laptop, TV) at least 30-45 minutes before bed - blue light delays melatonin release, and melatonin is already interacting with your changing hormone levels at this time. A warm shower, light stretching, or 5 minutes of slow breathing before bed can lower cortisol and ease the transition to sleep. If cramps are disrupting sleep, a heating pad on the lower abdomen for 15-20 minutes before bed often helps more than trying to "push through" and sleep despite the pain.',
    'PMS',
    'Medium',
    40,
    '[]'::jsonb
  ),
  (
    'mood',
    'Mood Support',
    'mood-support',
    'Mood Support',
    'Understanding Mood Changes',
    'PMS mood swings are not "just in your head" - they trace back to falling estrogen and progesterone in the days before your period, which directly affects serotonin, the brain chemical that stabilizes mood. That is why irritability, sadness, tearfulness, or feeling overwhelmed can spike right before bleeding starts and usually ease within a day or two of your period beginning. Recognizing this pattern (tracking it for 2-3 cycles helps) can make the mood dip feel more predictable and less alarming. A few things genuinely help: short breaks during the day rather than pushing through a hard task, 4-7-8 style deep breathing (inhale 4 seconds, hold 7, exhale 8) when irritability spikes, and talking to someone you trust instead of isolating - even a five-minute conversation can lower the intensity of a low moment. Cutting back on caffeine and alcohol in the days before your period can reduce anxiety and mood volatility for many people. If mood changes are severe enough to affect work, relationships, or daily functioning every single cycle - not just uncomfortable but disruptive - that pattern has a name (PMDD) and is worth discussing with a doctor, since effective treatments exist.',
    'PMS',
    'Medium',
    50,
    '["mood:mood_swings", "mood:low_mood", "feelings:mood_swings", "feelings:not_in_control"]'::jsonb
  ),
  (
    'pain',
    'Pain Relief',
    'pain-relief',
    'Pain Relief',
    'Managing Period Discomfort',
    'Period cramps happen because your uterus releases prostaglandins - hormone-like compounds that make the uterine muscle contract to shed its lining. Higher prostaglandin levels generally mean stronger cramps, which is why pain varies so much between people and even between cycles for the same person. For mild-to-moderate cramps: a heating pad or hot water bottle on the lower abdomen for 15-20 minutes relaxes the muscle and is genuinely as effective as many people expect from medication for mild pain. Gentle movement, staying hydrated, and magnesium-rich foods (almonds, seeds, dark chocolate, bananas) can all take the edge off. Resting when your body asks - rather than pushing through a full schedule - reduces how "on edge" your nervous system feels, which itself can lower pain perception. For stronger cramps, over-the-counter anti-inflammatory pain relief (if it suits you and you have no contraindications) works directly on prostaglandins and is more effective the earlier it is taken relative to when pain starts. Track your pain pattern each cycle. See a doctor if: pain is severe enough to stop you doing normal activities, it is getting worse cycle over cycle, over-the-counter relief is not helping, or pain occurs outside your period too - these can be signs of conditions like endometriosis that deserve proper evaluation, not just "toughing it out."',
    'Period',
    'High',
    60,
    '["pain:mild_cramps", "pain:strong_cramps"]'::jsonb
  ),
  (
    'ovulation',
    'Body Awareness',
    'body-awareness',
    'Body Awareness',
    'Understanding Ovulation Changes',
    'Ovulation - when an ovary releases an egg, roughly midway through a typical cycle - comes with signals worth learning to recognize, even if you are not trying to conceive, because they tell you a lot about your overall cycle health. Common signs include a one-sided, brief pelvic twinge (called mittelschmerz, or "middle pain"), a noticeable change in cervical mucus to a clearer, stretchier, egg-white-like texture, a small rise in basal body temperature (about 0.3-0.5°C) that stays elevated until your next period, and for some people a temporary uptick in energy, libido, or skin clarity. Breast tenderness and mild bloating can also appear around this time. These signs vary from person to person and cycle to cycle, so the most useful approach is tracking them consistently for 2-3 months rather than expecting a textbook pattern immediately. Staying hydrated and getting good sleep around ovulation supports how reliably your body produces these signals. If you notice you rarely or never see typical ovulation signs over several months, or your cycles are consistently irregular, that pattern is worth raising with a doctor, since it can relate to hormonal conditions like PCOS.',
    'Ovulation',
    'Medium',
    70,
    '[]'::jsonb
  ),
  (
    'hygiene',
    'Healthy Habits',
    'healthy-habits',
    'Healthy Habits',
    'Daily Menstrual Hygiene Tips',
    'Good menstrual hygiene protects against infection and simply makes periods more comfortable day to day. As a general rule, change pads every 4-6 hours and tampons every 4-8 hours (never leave a tampon in longer than 8 hours, due to the small risk of toxic shock syndrome). Menstrual cups can typically be worn up to 8-12 hours, but should be emptied, rinsed, and reinserted per the manufacturer''s guidance, and sterilized (boiled) between cycles. Always wash your hands before and after changing any period product. Choose breathable, cotton-based underwear during your period where possible, since synthetic fabric can trap moisture and irritate skin. Avoid scented pads, wipes, or intimate washes - fragrance and harsh soap can disrupt the natural vaginal pH and lead to irritation or infection; plain water or a mild, pH-balanced wash is enough for external cleaning. Shower regularly during your period just as you normally would; menstrual blood itself is not "unclean," but staying fresh helps with odor and comfort. Dispose of pads and tampons by wrapping them (never flushing tampons or applicators) and using a bin, not the toilet. If you notice unusual odor, itching, or discomfort that does not resolve with basic hygiene, it is worth checking in with a doctor.',
    'General',
    'Medium',
    80,
    '[]'::jsonb
  ),
  (
    'wellness',
    'General Wellness',
    'general-wellness',
    'General Wellness',
    'Supporting Your Body Daily',
    'Your menstrual cycle is not an isolated event - it is connected to your sleep, nutrition, stress, and movement all month long, and each phase of the cycle tends to ask for something slightly different from you. Some people find it useful to loosely "sync" habits to their cycle: leaning into higher-energy activity around ovulation (mid-cycle) when energy is often naturally higher, and prioritizing rest, gentler movement, and iron-rich food during your period and the days just before it when energy dips. This is a helpful lens, not a rulebook - your own pattern matters more than any general guideline. Small, repeatable habits compound: a consistent sleep window, regular meals rather than skipped-then-binged eating, 20-30 minutes of movement most days, and short daily stress check-ins (even one minute of noticing how you feel) build a baseline that makes each cycle easier to manage. Tracking your symptoms, mood, flow, and energy for a few months reveals your personal baseline - what is normal for you - which makes it much easier to notice if something genuinely changes and needs attention, versus normal month-to-month variation.',
    'General',
    'Low',
    90,
    '[]'::jsonb
  ),
  (
    'stress',
    'Stress Support',
    'stress-support',
    'Stress Support',
    'Managing Stress Through Your Cycle',
    'Stress and your cycle affect each other in both directions. Chronic stress raises cortisol, which can suppress the reproductive hormones that regulate ovulation - this is why high-stress periods in life (exams, work deadlines, major life changes) often line up with a late, early, skipped, or unusually heavy/light period. In turn, PMS and period symptoms can make you more reactive to everyday stress in the days before bleeding starts. Simple, repeatable relaxation habits make a real difference over time: a few minutes of slow breathing (in for 4, out for 6-8) morning or evening, brief mindful pauses between tasks rather than running back-to-back all day, and protecting a consistent wind-down routine before bed. Regular movement and adequate sleep are two of the most effective, evidence-backed stress reducers available, and both directly support hormonal regularity too. If you notice a period that is unusually late, absent, or different for more than one or two cycles during a stressful stretch, that is a normal short-term response - but if irregular cycles continue after the stressful period has passed, or stress feels constant and unmanageable, it is worth speaking to a doctor or a mental health professional rather than managing it alone.',
    'General',
    'Medium',
    100,
    '[]'::jsonb
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
  target_options = excluded.target_options,
  is_active = true;
