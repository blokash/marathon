// London Marathon 2027 training plan data.
// Week 1 starts Monday 28 Sep 2026. Distances in km.

const PLAN_START = { y: 2026, m: 8, d: 28 }; // month is 0-based (8 = September)

const PHASES = {
  base: {
    name: 'Base',
    color: '#3F7D58',
    tint: '#E4F0E8',
    note: 'Four runs a week plus spin. Build the legs before ski season.',
  },
  ski: {
    name: 'Ski season',
    color: '#2F6F9F',
    tint: '#E1ECF5',
    note: 'Two key runs. Skiing and spin are your aerobic volume. No long run the day after a big touring day.',
  },
  peak: {
    name: 'Peak',
    color: '#B5502B',
    tint: '#F6E4DC',
    note: 'At least three runs. Running takes priority over ski days.',
  },
  taper: {
    name: 'Taper',
    color: '#A8861A',
    tint: '#F4EDD6',
    note: 'Less volume, same sharpness. Keep spin easy.',
  },
  race: {
    name: 'Race week',
    color: '#C2272D',
    tint: '#F8DEDF',
    note: 'Rest, carb-load the last two days, trust the training.',
  },
};

// Each week: phase, q = quality/key midweek run, easy = other runs, long = long run,
// opt = optional extra run, ski = skiing guidance, note = what matters this week.
const W = (phase, q, easy, long, opt, ski, note) => ({ phase, q, easy, long, opt, ski, note });

const WEEKS = [
  // Base: Sep 28 – Nov 29
  W('base', ['Easy 5 + strides', 5], [['Easy 6', 6], ['Easy 5', 5]], ['Long 12 easy', 12], null, null, null),
  W('base', ['Easy 6 + strides', 6], [['Easy 6', 6], ['Easy 5', 5]], ['Long 14 easy', 14], null, null, null),
  W('base', ['Easy 6 + strides', 6], [['Easy 7', 7], ['Easy 6', 6]], ['Long 15 easy', 15], null, null, null),
  W('base', ['Easy 5 + strides', 5], [['Easy 6', 6], ['Easy 5', 5]], ['Long 12 easy', 12], null, null, 'Cutback week'),
  W('base', ['Easy 6 + strides', 6], [['Easy 8', 8], ['Easy 6', 6]], ['Long 17 easy', 17], null, null, null),
  W('base', ['Tempo 8 (4 at tempo)', 8], [['Easy 7', 7], ['Easy 6', 6]], ['Long 18 easy', 18], null, null, null),
  W('base', ['Easy 7 + strides', 7], [['Easy 8', 8], ['Easy 6', 6]], ['Long 20 easy', 20], null, null, 'Practise taking a gel'),
  W('base', ['Easy 6 + strides', 6], [['Easy 7', 7], ['Easy 5', 5]], ['Long 14 easy', 14], null, null, 'Cutback week'),
  W('base', ['Tempo 8 (5 at tempo)', 8], [['Easy 7', 7], ['Easy 6', 6]], ['Long 21 easy', 21], null, null, 'Gel every 35–40 min'),
  // Ski season: Nov 30 – Feb 28
  W('ski', ['Tempo 10 (5 at tempo)', 10], [], ['Long 18 easy', 18], 'Easy 5–6', '2–3 days', 'Ski season starts'),
  W('ski', ['10 with 6 at MP', 10], [], ['Long 20 easy', 20], 'Easy 5–6', '2–3 days', null),
  W('ski', ['12 with 6 at MP', 12], [], ['Long 22 easy', 22], 'Easy 5–6', '2–3 days', null),
  W('ski', ['Easy 10', 10], [], ['Long 18 easy', 18], 'Easy 5–6', 'Holidays, ski freely', 'Cutback week'),
  W('ski', ['Tempo 12 (6 at tempo)', 12], [], ['Long 22 easy', 22], 'Easy 5–6', '2–3 days', null),
  W('ski', ['12 with 7 at MP', 12], [], ['Long 24 easy', 24], 'Easy 5–6', '2–3 days', null),
  W('ski', ['Tempo 12 (7 at tempo)', 12], [], ['Long 26 easy', 26], 'Easy 5–6', '2–3 days', null),
  W('ski', ['Easy 10', 10], [], ['Long 20 easy', 20], 'Easy 5–6', '2–3 days', 'Cutback week'),
  W('ski', ['13 with 8 at MP', 13], [], ['Long 26, last 5 at MP', 26], 'Easy 5–6', '2–3 days', null),
  W('ski', ['Intervals 12 (5 × 1 km)', 12], [], ['Long 28 easy', 28], 'Easy 5–6', '2–3 days', null),
  W('ski', ['Easy 10 with 4 × 1 km at tempo', 10], [], ['Tune-up half marathon', 21.1], 'Easy 5', 'Easy skiing only before the race', 'Race the half, then enter your time on the Paces tab'),
  W('ski', ['Easy 10', 10], [], ['Long 24 easy', 24], 'Easy 5–6', '2–3 days', 'Recovery week'),
  W('ski', ['14 with 8 at MP', 14], [], ['Long 28 easy', 28], 'Easy 5–6', '2–3 days', null),
  // Peak: Mar 1 – Apr 4
  W('peak', ['Intervals 12 (6 × 1 km)', 12], [['Easy 8', 8]], ['Long 30, last 10 at MP', 30], 'Easy 6–8', '1–2 days max', 'Running takes priority now'),
  W('peak', ['14 with 8 at MP', 14], [['Easy 10', 10]], ['Long 24 easy', 24], 'Easy 6–8', '1–2 days max', null),
  W('peak', ['Tempo 12 (8 at tempo)', 12], [['Easy 10', 10]], ['Long 32 easy', 32], 'Easy 6–8', '1–2 days max', 'Longest run of the plan'),
  W('peak', ['Intervals 12 (6 × 1 km)', 12], [['Easy 10', 10]], ['Long 26, 14 at MP', 26], 'Easy 6–8', '1–2 days max', 'Dress rehearsal: race kit and fuel'),
  W('peak', ['14 with 8 at MP', 14], [['Easy 10', 10]], ['Long 30 easy', 30], 'Easy 6–8', '1–2 days max', 'Last big run'),
  // Taper
  W('taper', ['12 with 6 at MP', 12], [['Easy 8', 8]], ['Long 24 easy', 24], null, 'Easy only', 'Taper begins'),
  W('taper', ['10 with 5 at MP', 10], [['Easy 8', 8]], ['Long 16 easy', 16], null, 'None', null),
  // Race week
  W('race', ['8 with 3 at MP', 8], [['Easy 5 + strides', 5]], ['Race day: 42.2 km', 42.2], null, 'None', 'Carb-load the last two days'),
];

const DAY_NAMES = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];

const SPIN = (label, detail) => ({ id: 'spin', kind: 'Cross-training', label, detail });

// Friday: gravel ride or Grouse Grind, both optional.
const FRIDAY = (phase) => {
  if (phase === 'ski') {
    return { id: 'fri', kind: 'Optional', label: 'Ski, rest or easy gravel ride', detail: 'The Grind is usually closed for winter. Keep Friday easy before the long run.' };
  }
  if (phase === 'taper' || phase === 'race') return null;
  return {
    id: 'fri',
    kind: 'Optional',
    label: 'Gravel ride or Grouse Grind',
    detail: 'Keep it conversational. If you go hard, tap "Move long run to Sunday" so your legs are fresh.',
    swappable: true,
  };
};

// Builds the Mon–Sun schedule for a week. `longOnSunday` moves the long run from Saturday to Sunday.
function buildDays(week, { longOnSunday = false, raceOnSunday = false } = {}) {
  const days = [[], [], [], [], [], [], []];
  const { phase, q, easy, long, opt } = week;
  const run = (id, [label, km], kind = 'Run') => ({ id, kind, label, km });
  const strength = (ref, light) => ({ id: 's' + ref.toLowerCase(), kind: 'Strength', label: `Strength ${ref}${light ? ' (light)' : ''}`, ref });

  if (phase === 'base') {
    days[0].push(run('e0', easy[0]), strength('A'));
    days[1].push(run('q', q, 'Key run'));
    days[2].push(SPIN('Spin class 6 am', 'Moderate effort. Counts as an aerobic session.'));
    days[3].push(run('e1', easy[1]), strength('B'));
  } else if (phase === 'ski') {
    days[0].push({ id: 'rest0', kind: 'Rest', label: 'Rest or ski' });
    days[1].push(run('q', q, 'Key run'), strength('A'));
    days[2].push(SPIN('Spin class 6 am', 'Easy to moderate. You ran hard yesterday.'));
    days[3].push({ id: 'o', kind: 'Optional', label: opt, km: 0 }, strength('B'));
  } else if (phase === 'peak') {
    days[0].push({ id: 'rest0', kind: 'Rest', label: 'Rest' }, strength('A'));
    days[1].push(run('q', q, 'Key run'));
    days[2].push(SPIN('Spin class 6 am', 'Easy to moderate. Save your legs for Saturday.'));
    days[3].push(run('e0', easy[0]), strength('B'));
  } else if (phase === 'taper') {
    days[0].push({ id: 'rest0', kind: 'Rest', label: 'Rest' });
    days[1].push(run('q', q, 'Key run'));
    days[2].push(SPIN('Spin class 6 am, easy', 'Sit out the hard intervals.'));
    days[3].push(run('e0', easy[0]), strength('A', true));
  } else {
    // race week
    days[0].push({ id: 'rest0', kind: 'Rest', label: 'Rest' });
    days[1].push(run('q', q, 'Key run'));
    days[2].push(SPIN('Spin 30 min, very easy, or skip', 'No efforts this close to the race.'));
    days[3].push(run('e0', easy[0]));
    days[4].push({ id: 'rest4', kind: 'Rest', label: raceOnSunday ? 'Rest' : 'Shakeout 20 min easy' });
    if (raceOnSunday) {
      days[5].push({ id: 'shake', kind: 'Run', label: 'Shakeout 20 min easy' });
      days[6].push({ ...run('l', long, 'Race'), big: true });
    } else {
      days[5].push({ ...run('l', long, 'Race'), big: true });
    }
    return days;
  }

  const fri = FRIDAY(phase);
  if (fri) days[4].push(fri);
  else days[4].push({ id: 'rest4', kind: 'Rest', label: 'Rest' });

  const longItem = { ...run('l', long, 'Long run'), big: true };
  if (longOnSunday) {
    days[5].push({ id: 'rest5', kind: 'Rest', label: phase === 'ski' ? 'Ski or rest' : 'Rest or easy spin' });
    days[6].push(longItem);
  } else {
    days[5].push(longItem);
    if (phase === 'peak') days[6].push({ id: 'o', kind: 'Optional', label: opt, km: 0 });
    else if (phase === 'ski') days[6].push({ id: 'ski6', kind: 'Ski', label: 'Ski day' });
    else days[6].push({ id: 'rest6', kind: 'Rest', label: 'Rest' });
  }
  return days;
}

const plannedKm = (w) =>
  Math.round((w.q[1] + w.easy.reduce((s, e) => s + e[1], 0) + w.long[1]) * 10) / 10;

// Strength items: [name, dose, how, progression, YouTube video id]
const STRENGTH = {
  A: {
    title: 'Session A: legs and hips',
    items: [
      ['Goblet squat', '3 × 10', 'Hold a dumbbell at your chest, sit hips back and down to parallel, drive up through your heels.', 'Add weight when 10 feels easy.', 'JO7D6GJ98wY'],
      ['Reverse lunge', '3 × 8 each leg', 'Step back, lower the back knee toward the floor, front knee over mid-foot, push back up.', 'Hold dumbbells from November.', '-Nr6dqEvz3Q'],
      ['Single-leg Romanian deadlift', '3 × 8 each leg', 'Hinge at the hip on one leg, back flat, free leg extends behind. Stand tall squeezing the glute.', 'Builds hamstrings and balance.', 'Zfr6wizR8rs'],
      ['Single-leg calf raise, straight knee', '3 × 15 each leg', 'On a step edge, rise fully onto your toes, then lower for 3 seconds below step level.', 'Add a backpack once 15 is easy.', 'OgVFFGsVOxk'],
      ['Single-leg glute bridge', '3 × 12 each leg', 'On your back, one foot planted, drive hips up in line with shoulders. Pause 1 second at the top.', 'Put your foot on a bench to progress.', 'sVfp4LN9niA'],
      ['Front plank', '3 × 40 sec', 'Forearms down, straight line from head to heels, abs braced.', 'Build to 60 seconds.', '6LqqeBtFn9M'],
    ],
  },
  B: {
    title: 'Session B: calves, Achilles and stability',
    items: [
      ['Bent-knee calf raise', '3 × 15 each leg', 'Knee bent about 30°, rise onto your toes, lower slowly. Targets the soleus, the calf muscle that carries you through a marathon.', 'Add weight from January.', 'C3tLEvqrW4E'],
      ['Eccentric heel drops', '3 × 10 each leg', 'Rise on both feet, shift to one, lower slowly over 4 seconds below step level.', 'Your best Achilles protection during ski season.', 'FoCuDAkIdnM'],
      ['Step-ups', '3 × 10 each leg', 'Knee-height box. Drive through the front heel without pushing off the back foot.', 'Hold dumbbells to progress.', 'WCFCdxzFBa4'],
      ['Lateral band walks', '2 × 15 steps each way', 'Band around ankles or above knees, half squat, step sideways keeping tension.', 'Protects knees and hips late in the race.', 'PhNkkOieB-8'],
      ['Side plank', '2 × 30 sec each side', 'On your forearm, hips high, body straight.', 'Add a top-leg lift to progress.', 'rCxF2nG9vQ0'],
      ['Dead bug', '3 × 10 each side', 'On your back, arms up, knees at 90°. Lower opposite arm and leg slowly, keeping your low back flat.', 'Slow beats fast.', '-gRN_JyVTLY'],
      ['Pogo hops (from January)', '2 × 20', 'Small quick hops on the balls of your feet, stiff ankles, minimal ground contact.', 'Brings back the spring skiing does not train. Skip if calves are sore.', 'hjprPAnfqoQ'],
    ],
  },
  notes:
    'Warm up 5 minutes first. You need a step, a dumbbell or two, and a mini band. Never the day before a long run. Ski season: 15–20 minutes, prioritise calf, Achilles and single-leg work. Taper: Session A only, bodyweight, nothing in the final 5 days. The Grouse Grind counts as a calf session, so skip Strength B that week if you did it.',
};
