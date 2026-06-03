// F1 25 Circuit Database — named corners with coaching data
// Track IDs are from F1 25 UDP PacketSessionData.m_trackId (non-sequential, signed int8)
// distanceFromStart: metres from start/finish line (matches lapDistance in Packet 2)
// style: 'flat' | 'light' | 'medium' | 'heavy'
// priority: 'high' = feeds long straight (prioritise in top-3 improvements)
// referenceApexSpeed: km/h reference for a well-driven F1 car at full downforce
// tolerance: ±metres for corner matching (default 75)

export const TRACKS = {
  7: {
    name: 'Silverstone', lapLength: 5891,
    corners: [
      { id: 'abbey',      name: 'Abbey',           distanceFromStart: 270,  style: 'medium', referenceApexSpeed: 185, priority: 'medium', coachingText: 'Flat out commitment. Late apex, track out fully.', tolerance: 80 },
      { id: 'farm',       name: 'Farm',             distanceFromStart: 580,  style: 'light',  referenceApexSpeed: 215, priority: 'low',    coachingText: 'Light braking, tighten up mid-section.', tolerance: 60 },
      { id: 'copse',      name: 'Copse',            distanceFromStart: 680,  style: 'flat',   referenceApexSpeed: 252, priority: 'high',   coachingText: 'Flat at full downforce. Any lift is time lost. Chase the exit onto the Hanger Straight.', tolerance: 80 },
      { id: 'becketts',   name: 'Maggotts-Becketts',distanceFromStart: 1050, style: 'light',  referenceApexSpeed: 208, priority: 'medium', coachingText: 'Complex S. Compromise for Becketts exit, not Maggotts entry. Do not overcook entry.', tolerance: 100 },
      { id: 'chapel',     name: 'Chapel',           distanceFromStart: 1280, style: 'light',  referenceApexSpeed: 245, priority: 'high',   coachingText: 'Flat. Pivotal for Hangar Straight top speed. Maximum exit.', tolerance: 80 },
      { id: 'stowe',      name: 'Stowe',            distanceFromStart: 2150, style: 'heavy',  referenceApexSpeed: 138, priority: 'medium', coachingText: 'Big stop. Rotate the car — maximum lateral load at apex. Trail brake to rotate.', tolerance: 80 },
      { id: 'vale',       name: 'Vale',             distanceFromStart: 2400, style: 'medium', referenceApexSpeed: 155, priority: 'low',    coachingText: 'Compromise for Club exit. The exit here feeds the next corner.', tolerance: 70 },
      { id: 'club',       name: 'Club',             distanceFromStart: 2650, style: 'medium', referenceApexSpeed: 162, priority: 'high',   coachingText: 'Club exit is everything — feeds the back straight. Late apex, maximum exit.', tolerance: 70 },
      { id: 'loop',       name: 'Loop',             distanceFromStart: 3350, style: 'heavy',  referenceApexSpeed: 115, priority: 'low',    coachingText: 'Slow hairpin. Patience on entry, early rotation for exit.', tolerance: 70 },
      { id: 'aintree',    name: 'Aintree',          distanceFromStart: 3700, style: 'medium', referenceApexSpeed: 172, priority: 'low',    coachingText: 'Links to Woodcote. Keep it tidy.', tolerance: 70 },
      { id: 'woodcote',   name: 'Woodcote',         distanceFromStart: 4050, style: 'medium', referenceApexSpeed: 188, priority: 'medium', coachingText: 'Commitment through here. Track out to the left after.', tolerance: 70 },
      { id: 'luffield',   name: 'Luffield',         distanceFromStart: 4500, style: 'heavy',  referenceApexSpeed: 105, priority: 'high',   coachingText: 'Tightest corner. Very late apex. Exit feeds pit straight — vital for lap time.', tolerance: 70 },
      { id: 'priory',     name: 'Priory',           distanceFromStart: 5050, style: 'medium', referenceApexSpeed: 180, priority: 'medium', coachingText: 'Setup for the final corner complex.', tolerance: 70 },
      { id: 'brooklands', name: 'Brooklands',       distanceFromStart: 5300, style: 'medium', referenceApexSpeed: 145, priority: 'low',    coachingText: 'Bumpy through here. Smooth inputs.', tolerance: 70 },
      { id: 'copse2',     name: 'Copse Run-off',    distanceFromStart: 5600, style: 'light',  referenceApexSpeed: 210, priority: 'low',    coachingText: 'Final complex. Prepare for start/finish.', tolerance: 70 },
    ],
  },

  11: {
    name: 'Monza', lapLength: 5793,
    corners: [
      { id: 'prima',      name: 'Prima Variante',  distanceFromStart: 330,  style: 'heavy', referenceApexSpeed: 72,  priority: 'low',  coachingText: 'Hard stop. Chicane — get the geometry right, no kerb drama.', tolerance: 80 },
      { id: 'seconda',    name: 'Seconda Variante', distanceFromStart: 1550, style: 'heavy', referenceApexSpeed: 78,  priority: 'low',  coachingText: 'Second chicane. Smooth. Exit onto back straight.', tolerance: 80 },
      { id: 'lesmo1',     name: 'Lesmo 1',          distanceFromStart: 2650, style: 'medium',referenceApexSpeed: 152, priority: 'medium', coachingText: 'Fast right. Trail brake and rotate. Exit critical for Lesmo 2.', tolerance: 70 },
      { id: 'lesmo2',     name: 'Lesmo 2',          distanceFromStart: 2900, style: 'medium',referenceApexSpeed: 168, priority: 'high',   coachingText: 'Exit here feeds the long back straight. Maximum exit speed.', tolerance: 70 },
      { id: 'ascari',     name: 'Ascari',           distanceFromStart: 4000, style: 'medium',referenceApexSpeed: 155, priority: 'medium', coachingText: 'Complex chicane. Smooth transition, no excessive kerb.', tolerance: 90 },
      { id: 'parabolica', name: 'Parabolica',       distanceFromStart: 5300, style: 'medium',referenceApexSpeed: 112, priority: 'high',   coachingText: 'The most important corner at Monza. Very late apex. Exit feeds the entire main straight. Max exit.', tolerance: 80 },
    ],
  },

  10: {
    name: 'Spa-Francorchamps', lapLength: 7004,
    corners: [
      { id: 'la_source',  name: 'La Source',        distanceFromStart: 120,  style: 'heavy', referenceApexSpeed: 68,  priority: 'low',  coachingText: 'Hairpin. Late apex, early throttle for Eau Rouge run.', tolerance: 70 },
      { id: 'eau_rouge',  name: 'Eau Rouge',         distanceFromStart: 380,  style: 'flat',  referenceApexSpeed: 278, priority: 'high', coachingText: 'Flat. Full commitment through the compression. Lifting is time lost — and dangerous. Trust the car.', tolerance: 100 },
      { id: 'raidillon',  name: 'Raidillon',         distanceFromStart: 550,  style: 'flat',  referenceApexSpeed: 265, priority: 'high', coachingText: 'Flat over the crest. Maximum exit onto Kemmel.', tolerance: 80 },
      { id: 'les_combes', name: 'Les Combes',        distanceFromStart: 1600, style: 'heavy', referenceApexSpeed: 118, priority: 'medium', coachingText: 'Heavy braking. Trail brake to rotate. Exit to Malmedy.', tolerance: 80 },
      { id: 'malmedy',    name: 'Malmedy',           distanceFromStart: 1850, style: 'medium',referenceApexSpeed: 158, priority: 'low',  coachingText: 'Fast chicane. Smooth.', tolerance: 80 },
      { id: 'rivage',     name: 'Rivage',            distanceFromStart: 2480, style: 'heavy', referenceApexSpeed: 88,  priority: 'low',  coachingText: 'Slow hairpin. Patience.', tolerance: 70 },
      { id: 'pouhon',     name: 'Pouhon',            distanceFromStart: 2750, style: 'medium',referenceApexSpeed: 228, priority: 'medium', coachingText: 'Fast double-left. Commitment required. Trail brake entry, smooth through.', tolerance: 90 },
      { id: 'campus',     name: 'Campus',            distanceFromStart: 3350, style: 'medium',referenceApexSpeed: 145, priority: 'low',  coachingText: 'Kink complex. Tidy.', tolerance: 80 },
      { id: 'stavelot',   name: 'Stavelot',          distanceFromStart: 4200, style: 'medium',referenceApexSpeed: 168, priority: 'low',  coachingText: 'Fast right. Flat in some setups.', tolerance: 80 },
      { id: 'fagnes',     name: 'Fagnes',            distanceFromStart: 4500, style: 'medium',referenceApexSpeed: 148, priority: 'low',  coachingText: 'Keep it tidy, link to Bus Stop.', tolerance: 80 },
      { id: 'bus_stop',   name: 'Bus Stop Chicane',  distanceFromStart: 6500, style: 'medium',referenceApexSpeed: 95,  priority: 'high', coachingText: 'Last major braking. Exit feeds onto main straight. Maximum exit speed.', tolerance: 80 },
    ],
  },

  5: {
    name: 'Monaco', lapLength: 3337,
    corners: [
      { id: 'sainte_devote', name: 'Sainte Dévote', distanceFromStart: 155, style: 'heavy', referenceApexSpeed: 62,  priority: 'medium', coachingText: 'First corner. Get position sorted early. No locking.', tolerance: 60 },
      { id: 'massenet',      name: 'Massenet',       distanceFromStart: 545, style: 'medium',referenceApexSpeed: 120, priority: 'low',    coachingText: 'Fast right under barriers. Commit.', tolerance: 60 },
      { id: 'casino',        name: 'Casino Square',  distanceFromStart: 660, style: 'medium',referenceApexSpeed: 88,  priority: 'medium', coachingText: 'Technical chicane complex. Smooth inputs only. Any aggressiveness loses time.', tolerance: 70 },
      { id: 'mirabeau_h',    name: 'Mirabeau Haute', distanceFromStart: 900, style: 'heavy', referenceApexSpeed: 58,  priority: 'low',    coachingText: 'Heavy braking. Monaco: smoothness > aggression everywhere.', tolerance: 60 },
      { id: 'loews',         name: 'Grand Hotel / Loews', distanceFromStart: 1065, style: 'heavy', referenceApexSpeed: 38,  priority: 'low',  coachingText: 'Tightest corner in F1. Patience. Short-shift out.', tolerance: 60 },
      { id: 'portier',       name: 'Portier',        distanceFromStart: 1250, style: 'medium',referenceApexSpeed: 98,  priority: 'medium', coachingText: 'Feeds the tunnel run. Get this right.', tolerance: 60 },
      { id: 'tunnel',        name: 'Tunnel Exit',    distanceFromStart: 1680, style: 'flat',  referenceApexSpeed: 255, priority: 'high',   coachingText: 'Flat in the tunnel and on exit. Any lift scrubs huge speed into Nouvelle Chicane.', tolerance: 80 },
      { id: 'chicane',       name: 'Nouvelle Chicane',distanceFromStart: 1840, style: 'heavy',referenceApexSpeed: 58,  priority: 'medium', coachingText: 'Monaco chicane at 300+ km/h. Precision over aggression.', tolerance: 70 },
      { id: 'tabac',         name: 'Tabac',          distanceFromStart: 2020, style: 'medium',referenceApexSpeed: 112, priority: 'low',    coachingText: 'Fast right. Commit.', tolerance: 60 },
      { id: 'swimming_pool', name: 'Swimming Pool',  distanceFromStart: 2200, style: 'medium',referenceApexSpeed: 108, priority: 'medium', coachingText: 'Bumpy complex. Smooth inputs essential. Balance the car through.', tolerance: 80 },
      { id: 'rascasse',      name: 'Rascasse',       distanceFromStart: 2850, style: 'heavy', referenceApexSpeed: 42,  priority: 'medium', coachingText: 'Classic Monaco brake. Very late apex. Exit feeds pit straight.', tolerance: 60 },
      { id: 'antony_noghes', name: 'Anthony Noghès', distanceFromStart: 3100, style: 'medium',referenceApexSpeed: 85,  priority: 'high',   coachingText: 'Final corner. Exit = starting speed on pit straight. Late apex.', tolerance: 60 },
    ],
  },

  13: {
    name: 'Suzuka', lapLength: 5807,
    corners: [
      { id: 'turn1',     name: 'Turn 1',          distanceFromStart: 180,  style: 'medium', referenceApexSpeed: 128, priority: 'medium', coachingText: 'Braking from 290+. No early apex — need good exit to T2.', tolerance: 70 },
      { id: 'turn2',     name: 'Turn 2',          distanceFromStart: 350,  style: 'medium', referenceApexSpeed: 112, priority: 'medium', coachingText: 'Continue the rotation from T1. Late apex.', tolerance: 70 },
      { id: 'esses',     name: 'S Curves (Esses)', distanceFromStart: 800,  style: 'flat',   referenceApexSpeed: 218, priority: 'medium', coachingText: 'Flat sequence. Any braking or hesitation is time lost. Smooth and committed.', tolerance: 100 },
      { id: 'dunlop',    name: 'Dunlop',          distanceFromStart: 1500, style: 'medium', referenceApexSpeed: 148, priority: 'low',    coachingText: 'Medium braking. Setup for Degner.', tolerance: 70 },
      { id: 'degner1',   name: 'Degner 1',        distanceFromStart: 1820, style: 'medium', referenceApexSpeed: 152, priority: 'medium', coachingText: 'Fast right. Trail brake, rotate, big exit.', tolerance: 70 },
      { id: 'degner2',   name: 'Degner 2',        distanceFromStart: 1960, style: 'medium', referenceApexSpeed: 125, priority: 'high',   coachingText: 'Exit feeds back straight. Maximum exit speed.', tolerance: 70 },
      { id: 'hairpin',   name: 'Hairpin',         distanceFromStart: 2500, style: 'heavy',  referenceApexSpeed: 62,  priority: 'low',    coachingText: 'Heavy stop. Patience. Late apex.', tolerance: 70 },
      { id: 'spoon',     name: 'Spoon Curve',     distanceFromStart: 3700, style: 'medium', referenceApexSpeed: 178, priority: 'high',   coachingText: 'Long double-apex. Sacrifice entry for maximum exit onto back straight.', tolerance: 90 },
      { id: '130r',      name: '130R',            distanceFromStart: 4700, style: 'flat',   referenceApexSpeed: 298, priority: 'high',   coachingText: '130R should be flat. Any lift is cowardice and costs 0.3s. Maximum confidence.', tolerance: 80 },
      { id: 'chicane',   name: 'Casio Triangle',  distanceFromStart: 5050, style: 'heavy',  referenceApexSpeed: 72,  priority: 'high',   coachingText: 'Final chicane feeds the main straight. Get this right — it sets up qualifying laps and race starts.', tolerance: 80 },
    ],
  },

  3: {
    name: 'Bahrain', lapLength: 5412,
    corners: [
      { id: 't1',   name: 'Turn 1',  distanceFromStart: 330,  style: 'heavy',  referenceApexSpeed: 88,  priority: 'medium', coachingText: 'Hard braking. Undercut track — position here matters. No lockups.', tolerance: 80 },
      { id: 't2',   name: 'Turn 2',  distanceFromStart: 450,  style: 'medium', referenceApexSpeed: 112, priority: 'low',    coachingText: 'Link to long right. Get the geometry right.', tolerance: 70 },
      { id: 't3',   name: 'Turn 3',  distanceFromStart: 600,  style: 'medium', referenceApexSpeed: 128, priority: 'low',    coachingText: 'Fast right. Track out fully.', tolerance: 70 },
      { id: 't4',   name: 'Turn 4',  distanceFromStart: 760,  style: 'medium', referenceApexSpeed: 142, priority: 'low',    coachingText: 'Long right. Chase exit.', tolerance: 70 },
      { id: 't5',   name: 'Turn 5',  distanceFromStart: 1100, style: 'medium', referenceApexSpeed: 92,  priority: 'medium', coachingText: 'Slow-down chicane. Patience.', tolerance: 70 },
      { id: 't6',   name: 'Turn 6',  distanceFromStart: 1250, style: 'light',  referenceApexSpeed: 148, priority: 'high',   coachingText: 'Exit feeds back straight. Crucial.', tolerance: 70 },
      { id: 't8',   name: 'Turn 8',  distanceFromStart: 1900, style: 'heavy',  referenceApexSpeed: 72,  priority: 'medium', coachingText: 'Tight hairpin complex. Late apex, rotation.', tolerance: 70 },
      { id: 't10',  name: 'Turn 10', distanceFromStart: 2350, style: 'heavy',  referenceApexSpeed: 65,  priority: 'medium', coachingText: 'Slow hairpin. Same patience drill.', tolerance: 70 },
      { id: 't11',  name: 'Turn 11', distanceFromStart: 2700, style: 'medium', referenceApexSpeed: 138, priority: 'low',    coachingText: 'Fast entry. Link.', tolerance: 70 },
      { id: 't12',  name: 'Turn 12', distanceFromStart: 2900, style: 'medium', referenceApexSpeed: 125, priority: 'low',    coachingText: 'Mid-speed. Balance.', tolerance: 70 },
      { id: 't13',  name: 'Turn 13', distanceFromStart: 3100, style: 'medium', referenceApexSpeed: 132, priority: 'medium', coachingText: 'Link corner. Sacrifice for T14 exit.', tolerance: 70 },
      { id: 't14',  name: 'Turn 14', distanceFromStart: 3280, style: 'medium', referenceApexSpeed: 118, priority: 'high',   coachingText: 'Exit feeds main straight. Make it count.', tolerance: 70 },
      { id: 't15',  name: 'Turn 15', distanceFromStart: 3700, style: 'medium', referenceApexSpeed: 108, priority: 'low',    coachingText: 'Flowing section.', tolerance: 70 },
    ],
  },

  14: {
    name: 'Yas Marina', lapLength: 5281,
    corners: [
      { id: 't1',   name: 'Turn 1',          distanceFromStart: 140,  style: 'medium', referenceApexSpeed: 118, priority: 'medium', coachingText: 'First corner. Braking hard but stay composed.', tolerance: 70 },
      { id: 't5',   name: 'Turn 5 / Long',   distanceFromStart: 750,  style: 'medium', referenceApexSpeed: 105, priority: 'low',    coachingText: 'Medium hairpin. Patience.', tolerance: 70 },
      { id: 't7',   name: 'Turn 7 Hairpin',  distanceFromStart: 1100, style: 'heavy',  referenceApexSpeed: 58,  priority: 'medium', coachingText: 'Slow hairpin. Very late apex.', tolerance: 70 },
      { id: 't8',   name: 'Turn 8 / Kink',   distanceFromStart: 1400, style: 'flat',   referenceApexSpeed: 252, priority: 'high',   coachingText: 'Flat kink. Full throttle. Exit speed into back straight is critical.', tolerance: 80 },
      { id: 't11',  name: 'Turn 11',         distanceFromStart: 2100, style: 'heavy',  referenceApexSpeed: 72,  priority: 'low',    coachingText: 'Heavy stop chicane.', tolerance: 70 },
      { id: 't14',  name: 'Turn 14',         distanceFromStart: 3000, style: 'medium', referenceApexSpeed: 128, priority: 'medium', coachingText: 'Fast complex. Commit.', tolerance: 70 },
      { id: 't17',  name: 'Turn 17',         distanceFromStart: 3800, style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Slow right. Very technical.', tolerance: 70 },
      { id: 't18',  name: 'Turn 18-19',      distanceFromStart: 4200, style: 'medium', referenceApexSpeed: 108, priority: 'low',    coachingText: 'Tight final section.', tolerance: 70 },
      { id: 't20',  name: 'Turn 20 / Final', distanceFromStart: 4800, style: 'medium', referenceApexSpeed: 115, priority: 'high',   coachingText: 'Final corner. Exit onto pit straight. Late apex.', tolerance: 70 },
    ],
  },

  15: {
    name: 'Austin (COTA)', lapLength: 5513,
    corners: [
      { id: 't1',   name: 'Turn 1',      distanceFromStart: 350,  style: 'heavy',  referenceApexSpeed: 75,  priority: 'medium', coachingText: 'Blind crest braking. Do not brake before the top. Trust muscle memory.', tolerance: 80 },
      { id: 't2',   name: 'Turn 2',      distanceFromStart: 500,  style: 'medium', referenceApexSpeed: 165, priority: 'low',    coachingText: 'Link to S-curves.', tolerance: 70 },
      { id: 't3_5', name: 'Turns 3-5',   distanceFromStart: 700,  style: 'medium', referenceApexSpeed: 178, priority: 'medium', coachingText: 'COTA S-curves. Fluid and committed. No individual errors.', tolerance: 100 },
      { id: 't6',   name: 'Turn 6',      distanceFromStart: 1300, style: 'heavy',  referenceApexSpeed: 72,  priority: 'medium', coachingText: 'Heavy hairpin. Patient rotation.', tolerance: 70 },
      { id: 't8',   name: 'Turn 8',      distanceFromStart: 1700, style: 'flat',   referenceApexSpeed: 235, priority: 'high',   coachingText: 'Fast right. Flat or near-flat. Exit onto back straight.', tolerance: 80 },
      { id: 't9',   name: 'Turn 9',      distanceFromStart: 1950, style: 'medium', referenceApexSpeed: 148, priority: 'low',    coachingText: 'Link. Stay smooth.', tolerance: 70 },
      { id: 't11',  name: 'Turn 11',     distanceFromStart: 2650, style: 'heavy',  referenceApexSpeed: 68,  priority: 'low',    coachingText: 'Slow hairpin. Patience.', tolerance: 70 },
      { id: 't12',  name: 'Turn 12',     distanceFromStart: 3000, style: 'medium', referenceApexSpeed: 152, priority: 'low',    coachingText: 'Fast right. Commit.', tolerance: 70 },
      { id: 't13',  name: 'Turn 13 / Esses', distanceFromStart: 3250, style: 'light', referenceApexSpeed: 198, priority: 'medium', coachingText: 'Flat fast chicane. Smooth.', tolerance: 80 },
      { id: 't15',  name: 'Turn 15',     distanceFromStart: 3800, style: 'medium', referenceApexSpeed: 122, priority: 'low',    coachingText: 'Links to T16.', tolerance: 70 },
      { id: 't16',  name: 'Turn 16',     distanceFromStart: 4100, style: 'medium', referenceApexSpeed: 115, priority: 'medium', coachingText: 'Medium-speed right. Trail brake.', tolerance: 70 },
      { id: 't18',  name: 'Turn 18',     distanceFromStart: 4600, style: 'medium', referenceApexSpeed: 142, priority: 'medium', coachingText: 'Flowing right. Link to final chicane.', tolerance: 70 },
      { id: 't19',  name: 'Turn 19-20',  distanceFromStart: 4950, style: 'heavy',  referenceApexSpeed: 82,  priority: 'high',   coachingText: 'Final chicane. Very late apex. Exit onto pit straight.', tolerance: 80 },
    ],
  },

  26: {
    name: 'Zandvoort', lapLength: 4259,
    corners: [
      { id: 'tarzan',     name: 'Tarzan',         distanceFromStart: 160,  style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Hard stop. Tricky camber. Late apex.', tolerance: 70 },
      { id: 'gerlach',    name: 'Gerlachbocht',   distanceFromStart: 700,  style: 'medium', referenceApexSpeed: 148, priority: 'low',    coachingText: 'Flowing right. Smooth.', tolerance: 70 },
      { id: 'hugenholtz', name: 'Hugenholtz',     distanceFromStart: 1100, style: 'medium', referenceApexSpeed: 128, priority: 'medium', coachingText: 'Banked turn. Commit.', tolerance: 70 },
      { id: 'scheivlak',  name: 'Scheivlak',      distanceFromStart: 1600, style: 'medium', referenceApexSpeed: 158, priority: 'low',    coachingText: 'Flowing section.', tolerance: 70 },
      { id: 'audi',       name: 'Audi S',         distanceFromStart: 2200, style: 'medium', referenceApexSpeed: 135, priority: 'medium', coachingText: 'Tricky S section. Patience.', tolerance: 80 },
      { id: 'arie',       name: 'Arie L S',       distanceFromStart: 2800, style: 'medium', referenceApexSpeed: 145, priority: 'low',    coachingText: 'Fast complex.', tolerance: 70 },
      { id: 'ramshoek',   name: 'Ramshoek',       distanceFromStart: 3200, style: 'flat',   referenceApexSpeed: 248, priority: 'high',   coachingText: 'Flat banked turn. Flat or near-flat. Maximum exit.', tolerance: 80 },
      { id: 'masterhoek', name: 'Masterhoek',     distanceFromStart: 3600, style: 'heavy',  referenceApexSpeed: 82,  priority: 'high',   coachingText: 'Final chicane. Late apex, maximum exit onto main straight.', tolerance: 70 },
    ],
  },

  27: {
    name: 'Imola', lapLength: 4909,
    corners: [
      { id: 'tamburello', name: 'Tamburello',     distanceFromStart: 250,  style: 'medium', referenceApexSpeed: 188, priority: 'low',    coachingText: 'Fast chicane. Smooth. Keep wide on entry.', tolerance: 80 },
      { id: 'villeneuve', name: 'Villeneuve',     distanceFromStart: 550,  style: 'medium', referenceApexSpeed: 142, priority: 'low',    coachingText: 'Medium-speed chicane. Balance through.', tolerance: 70 },
      { id: 'tosa',       name: 'Tosa',           distanceFromStart: 1050, style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Heavy braking. Gravel traps punish any mistake. Stay on track.', tolerance: 70 },
      { id: 'piratella',  name: 'Piratella',      distanceFromStart: 1700, style: 'medium', referenceApexSpeed: 138, priority: 'medium', coachingText: 'Fast complex. High kerbs. Smooth.', tolerance: 80 },
      { id: 'acque',      name: 'Acque Minerali', distanceFromStart: 2400, style: 'medium', referenceApexSpeed: 118, priority: 'medium', coachingText: 'Technical. Double-apex. Compromise for second apex.', tolerance: 80 },
      { id: 'variante',   name: 'Variante Alta',  distanceFromStart: 3200, style: 'medium', referenceApexSpeed: 108, priority: 'low',    coachingText: 'Slow chicane. No drama.', tolerance: 70 },
      { id: 'rivazza',    name: 'Rivazza',         distanceFromStart: 3900, style: 'heavy',  referenceApexSpeed: 78,  priority: 'medium', coachingText: 'Double hairpin. Very late apex on second part.', tolerance: 80 },
      { id: 'traguardo',  name: 'Traguardo',      distanceFromStart: 4500, style: 'medium', referenceApexSpeed: 128, priority: 'high',   coachingText: 'Final complex. Exit feeds pit straight. Late apex.', tolerance: 70 },
    ],
  },

  29: {
    name: 'Jeddah', lapLength: 6174,
    corners: [
      { id: 't1',    name: 'Turn 1',    distanceFromStart: 150,  style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Hard braking onto street circuit. No margin for error.', tolerance: 70 },
      { id: 't2',    name: 'Turn 2',    distanceFromStart: 300,  style: 'flat',   referenceApexSpeed: 238, priority: 'high',   coachingText: 'Flat at speed. Maximum commitment.', tolerance: 80 },
      { id: 't4',    name: 'Turn 4',    distanceFromStart: 700,  style: 'medium', referenceApexSpeed: 152, priority: 'medium', coachingText: 'Fast right. No wall contact.', tolerance: 70 },
      { id: 't10',   name: 'Turn 10',   distanceFromStart: 1500, style: 'medium', referenceApexSpeed: 135, priority: 'medium', coachingText: 'Complex section. Smooth inputs — walls very close.', tolerance: 80 },
      { id: 't17',   name: 'Turn 17',   distanceFromStart: 3000, style: 'flat',   referenceApexSpeed: 298, priority: 'high',   coachingText: 'Fastest part of circuit. Flat. Walls close. Commitment.', tolerance: 100 },
      { id: 't22',   name: 'Turn 22',   distanceFromStart: 4800, style: 'medium', referenceApexSpeed: 112, priority: 'medium', coachingText: 'Medium-speed chicane.', tolerance: 70 },
      { id: 't25',   name: 'Turn 25-27',distanceFromStart: 5400, style: 'medium', referenceApexSpeed: 122, priority: 'high',   coachingText: 'Final chicane. Exit onto pit straight. Maximum exit.', tolerance: 80 },
    ],
  },

  30: {
    name: 'Miami', lapLength: 5412,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 180,  style: 'heavy',  referenceApexSpeed: 72,  priority: 'medium', coachingText: 'Tight first corner. Get position.', tolerance: 70 },
      { id: 't4',   name: 'Turn 4',    distanceFromStart: 650,  style: 'flat',   referenceApexSpeed: 258, priority: 'high',   coachingText: 'Flat through here. Maximum speed.', tolerance: 80 },
      { id: 't6',   name: 'Turn 6',    distanceFromStart: 1100, style: 'medium', referenceApexSpeed: 108, priority: 'medium', coachingText: 'Complex entry. Trail brake.', tolerance: 70 },
      { id: 't11',  name: 'Turn 11',   distanceFromStart: 2100, style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Tight hairpin. Patience.', tolerance: 70 },
      { id: 't14',  name: 'Turn 14',   distanceFromStart: 2900, style: 'medium', referenceApexSpeed: 148, priority: 'low',    coachingText: 'Fast flowing right.', tolerance: 70 },
      { id: 't16',  name: 'Turn 16',   distanceFromStart: 3500, style: 'medium', referenceApexSpeed: 128, priority: 'medium', coachingText: 'Medium speed. Link.', tolerance: 70 },
      { id: 't17',  name: 'Turn 17',   distanceFromStart: 3800, style: 'flat',   referenceApexSpeed: 245, priority: 'high',   coachingText: 'Flat. Fast right onto back stretch.', tolerance: 80 },
      { id: 't19',  name: 'Turn 19',   distanceFromStart: 4600, style: 'heavy',  referenceApexSpeed: 75,  priority: 'high',   coachingText: 'Final chicane. Late apex. Exit onto main straight.', tolerance: 70 },
    ],
  },

  31: {
    name: 'Las Vegas', lapLength: 6201,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 1800, style: 'heavy',  referenceApexSpeed: 88,  priority: 'medium', coachingText: 'End of Strip. Firm braking.', tolerance: 80 },
      { id: 't4',   name: 'Turn 4',    distanceFromStart: 2600, style: 'medium', referenceApexSpeed: 128, priority: 'medium', coachingText: 'Casino section. Medium speed.', tolerance: 70 },
      { id: 't7',   name: 'Turn 7',    distanceFromStart: 3400, style: 'heavy',  referenceApexSpeed: 72,  priority: 'medium', coachingText: 'Slow hairpin. Patience.', tolerance: 70 },
      { id: 't10',  name: 'Turn 10',   distanceFromStart: 4200, style: 'flat',   referenceApexSpeed: 278, priority: 'high',   coachingText: 'Flat kink at high speed. Trust it.', tolerance: 80 },
      { id: 't12',  name: 'Turn 12',   distanceFromStart: 4900, style: 'medium', referenceApexSpeed: 115, priority: 'medium', coachingText: 'Technical section.', tolerance: 70 },
      { id: 't14',  name: 'Turn 14',   distanceFromStart: 5600, style: 'medium', referenceApexSpeed: 108, priority: 'high',   coachingText: 'Final hairpin. Late apex. Exit onto Strip straight.', tolerance: 70 },
    ],
  },

  32: {
    name: 'Losail', lapLength: 5419,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 400,  style: 'heavy',  referenceApexSpeed: 82,  priority: 'medium', coachingText: 'First heavy brake zone. Get entry right.', tolerance: 80 },
      { id: 't2',   name: 'Turn 2-4',  distanceFromStart: 700,  style: 'medium', referenceApexSpeed: 138, priority: 'medium', coachingText: 'Fast complex. Stay smooth.', tolerance: 90 },
      { id: 't6',   name: 'Turn 6',    distanceFromStart: 1400, style: 'flat',   referenceApexSpeed: 252, priority: 'high',   coachingText: 'Flat fast section. Maximum speed.', tolerance: 80 },
      { id: 't10',  name: 'Turn 10',   distanceFromStart: 2500, style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Slow hairpin. Patience.', tolerance: 70 },
      { id: 't14',  name: 'Turn 14-15',distanceFromStart: 3600, style: 'medium', referenceApexSpeed: 118, priority: 'medium', coachingText: 'Technical S. Smooth.', tolerance: 80 },
      { id: 't16',  name: 'Turn 16',   distanceFromStart: 4500, style: 'medium', referenceApexSpeed: 145, priority: 'low',    coachingText: 'Link.', tolerance: 70 },
      { id: 't20',  name: 'Turn 20',   distanceFromStart: 5000, style: 'medium', referenceApexSpeed: 112, priority: 'high',   coachingText: 'Final hairpin. Exit onto main straight. Late apex.', tolerance: 70 },
    ],
  },

  9: {
    name: 'Hungaroring', lapLength: 4381,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 260,  style: 'heavy',  referenceApexSpeed: 72,  priority: 'medium', coachingText: 'Hard braking. First overtaking point. No lockups.', tolerance: 70 },
      { id: 't2',   name: 'Turn 2',    distanceFromStart: 450,  style: 'medium', referenceApexSpeed: 115, priority: 'medium', coachingText: 'Medium right. Link to T3.', tolerance: 70 },
      { id: 't3',   name: 'Turn 3',    distanceFromStart: 600,  style: 'medium', referenceApexSpeed: 128, priority: 'low',    coachingText: 'Fast right. Stay smooth.', tolerance: 70 },
      { id: 't4',   name: 'Turn 4',    distanceFromStart: 900,  style: 'medium', referenceApexSpeed: 118, priority: 'low',    coachingText: 'Complex link.', tolerance: 70 },
      { id: 't6',   name: 'Turn 6',    distanceFromStart: 1400, style: 'medium', referenceApexSpeed: 112, priority: 'high',   coachingText: 'Exit feeds the back section. Get this right.', tolerance: 70 },
      { id: 't8',   name: 'Turn 8',    distanceFromStart: 1900, style: 'medium', referenceApexSpeed: 135, priority: 'low',    coachingText: 'Fast.', tolerance: 70 },
      { id: 't11',  name: 'Turn 11',   distanceFromStart: 2600, style: 'heavy',  referenceApexSpeed: 65,  priority: 'low',    coachingText: 'Slow hairpin. Patience.', tolerance: 70 },
      { id: 't12',  name: 'Turn 12-14',distanceFromStart: 3000, style: 'medium', referenceApexSpeed: 122, priority: 'medium', coachingText: 'Complex final section.', tolerance: 80 },
      { id: 't16',  name: 'Turn 16',   distanceFromStart: 4000, style: 'medium', referenceApexSpeed: 108, priority: 'high',   coachingText: 'Final hairpin. Late apex, maximum exit onto main straight.', tolerance: 70 },
    ],
  },

  20: {
    name: 'Baku', lapLength: 6003,
    corners: [
      { id: 't1',      name: 'Turn 1',        distanceFromStart: 350,  style: 'heavy',  referenceApexSpeed: 65,  priority: 'medium', coachingText: 'Hard brake. Walls close.', tolerance: 70 },
      { id: 't3',      name: 'Turn 3',        distanceFromStart: 700,  style: 'medium', referenceApexSpeed: 82,  priority: 'medium', coachingText: 'Street circuit. Narrow.', tolerance: 70 },
      { id: 't8',      name: 'Castle Turn',   distanceFromStart: 2600, style: 'heavy',  referenceApexSpeed: 62,  priority: 'low',    coachingText: 'Tightest corner on the calendar. Extraordinary care required.', tolerance: 70 },
      { id: 't15',     name: 'Turn 15',       distanceFromStart: 4200, style: 'flat',   referenceApexSpeed: 282, priority: 'high',   coachingText: 'Flat out onto the finishing straight. Baku has the longest straight in F1.', tolerance: 100 },
      { id: 't16',     name: 'Turn 16',       distanceFromStart: 4800, style: 'heavy',  referenceApexSpeed: 72,  priority: 'medium', coachingText: 'Hard brake. DRS detection zone nearby.', tolerance: 70 },
      { id: 't20',     name: 'Turn 20',       distanceFromStart: 5500, style: 'medium', referenceApexSpeed: 105, priority: 'high',   coachingText: 'Final corner complex. Exit onto main straight.', tolerance: 70 },
    ],
  },

  0: {
    name: 'Melbourne', lapLength: 5278,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 120,  style: 'heavy',  referenceApexSpeed: 75,  priority: 'medium', coachingText: 'First corner. Get clean entry.', tolerance: 70 },
      { id: 't2',   name: 'Turn 2',    distanceFromStart: 320,  style: 'medium', referenceApexSpeed: 115, priority: 'medium', coachingText: 'Link.', tolerance: 70 },
      { id: 't3',   name: 'Turn 3',    distanceFromStart: 500,  style: 'medium', referenceApexSpeed: 148, priority: 'high',   coachingText: 'Exit feeds back straight.', tolerance: 70 },
      { id: 't6',   name: 'Turn 6',    distanceFromStart: 1200, style: 'flat',   referenceApexSpeed: 258, priority: 'high',   coachingText: 'Flat right kink. No lifting.', tolerance: 80 },
      { id: 't9',   name: 'Turn 9',    distanceFromStart: 2100, style: 'heavy',  referenceApexSpeed: 68,  priority: 'low',    coachingText: 'Tight hairpin.', tolerance: 70 },
      { id: 't11',  name: 'Turn 11',   distanceFromStart: 2700, style: 'medium', referenceApexSpeed: 128, priority: 'medium', coachingText: 'Complex S.', tolerance: 80 },
      { id: 't13',  name: 'Turn 13',   distanceFromStart: 3400, style: 'flat',   referenceApexSpeed: 248, priority: 'high',   coachingText: 'Flat or near-flat. Commit.', tolerance: 80 },
      { id: 't15',  name: 'Turn 15-16',distanceFromStart: 4200, style: 'medium', referenceApexSpeed: 112, priority: 'medium', coachingText: 'Tight chicane. No drama.', tolerance: 70 },
    ],
  },

  2: {
    name: 'Shanghai', lapLength: 5451,
    corners: [
      { id: 't1',   name: 'Turn 1-2',  distanceFromStart: 170,  style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Decreasing radius entry. Deep brake, trail to apex.', tolerance: 80 },
      { id: 't3',   name: 'Turn 3',    distanceFromStart: 750,  style: 'medium', referenceApexSpeed: 188, priority: 'low',    coachingText: 'Fast right.', tolerance: 80 },
      { id: 't4',   name: 'Turn 4',    distanceFromStart: 1050, style: 'medium', referenceApexSpeed: 152, priority: 'medium', coachingText: 'Medium speed.', tolerance: 70 },
      { id: 't6',   name: 'Turn 6',    distanceFromStart: 1600, style: 'flat',   referenceApexSpeed: 262, priority: 'high',   coachingText: 'Flat through here. Exit critical.', tolerance: 80 },
      { id: 't8',   name: 'Turn 8',    distanceFromStart: 2200, style: 'medium', referenceApexSpeed: 138, priority: 'medium', coachingText: 'Back section.', tolerance: 70 },
      { id: 't11',  name: 'Turn 11',   distanceFromStart: 3200, style: 'heavy',  referenceApexSpeed: 58,  priority: 'medium', coachingText: 'Hairpin. Patience.', tolerance: 70 },
      { id: 't13',  name: 'Turn 13',   distanceFromStart: 3900, style: 'medium', referenceApexSpeed: 122, priority: 'medium', coachingText: 'Complex section.', tolerance: 80 },
      { id: 't16',  name: 'Turn 16',   distanceFromStart: 4700, style: 'medium', referenceApexSpeed: 112, priority: 'high',   coachingText: 'Final chicane. Exit to main straight.', tolerance: 70 },
    ],
  },

  4: {
    name: 'Catalunya', lapLength: 4657,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 250,  style: 'heavy',  referenceApexSpeed: 75,  priority: 'medium', coachingText: 'Hard braking from 310. Get clean entry.', tolerance: 70 },
      { id: 't2',   name: 'Turn 2',    distanceFromStart: 450,  style: 'medium', referenceApexSpeed: 155, priority: 'medium', coachingText: 'Link corner. Compromise for T3.', tolerance: 70 },
      { id: 't3',   name: 'Turn 3',    distanceFromStart: 700,  style: 'medium', referenceApexSpeed: 178, priority: 'low',    coachingText: 'Fast right. Commit.', tolerance: 70 },
      { id: 't5',   name: 'Turn 5 / Eixida', distanceFromStart: 1100, style: 'medium', referenceApexSpeed: 135, priority: 'high', coachingText: 'Exit feeds long back straight. Late apex.', tolerance: 70 },
      { id: 't9',   name: 'Turn 9',    distanceFromStart: 2200, style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Hard brake. Tight complex.', tolerance: 70 },
      { id: 't10',  name: 'Turn 10-11',distanceFromStart: 2600, style: 'medium', referenceApexSpeed: 118, priority: 'low',    coachingText: 'Chicane. Smooth.', tolerance: 80 },
      { id: 't13',  name: 'Turn 13-14',distanceFromStart: 3700, style: 'medium', referenceApexSpeed: 125, priority: 'medium', coachingText: 'Technical final section.', tolerance: 80 },
      { id: 't16',  name: 'Turn 16',   distanceFromStart: 4300, style: 'medium', referenceApexSpeed: 108, priority: 'high',   coachingText: 'Final corner. Exit feeds main straight. Very late apex.', tolerance: 70 },
    ],
  },

  6: {
    name: 'Montreal', lapLength: 4361,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 180,  style: 'medium', referenceApexSpeed: 88,  priority: 'medium', coachingText: 'Tight. Clean entry.', tolerance: 70 },
      { id: 't2',   name: 'Turn 2',    distanceFromStart: 350,  style: 'heavy',  referenceApexSpeed: 62,  priority: 'medium', coachingText: 'Sharp hairpin. Patience.', tolerance: 70 },
      { id: 't5',   name: 'Turn 5-6',  distanceFromStart: 950,  style: 'flat',   referenceApexSpeed: 265, priority: 'high',   coachingText: 'Flat at full speed. Island section. Wall very close on right.', tolerance: 80 },
      { id: 't8',   name: 'Turn 8',    distanceFromStart: 1600, style: 'flat',   referenceApexSpeed: 248, priority: 'high',   coachingText: 'Flat right. Maximum exit onto back straight.', tolerance: 80 },
      { id: 't10',  name: 'Epingle',   distanceFromStart: 2400, style: 'heavy',  referenceApexSpeed: 52,  priority: 'medium', coachingText: 'The Hairpin. Tightest corner. Very late apex. Patience.', tolerance: 70 },
      { id: 't13',  name: 'Turn 13',   distanceFromStart: 3100, style: 'medium', referenceApexSpeed: 118, priority: 'medium', coachingText: 'Complex. Link to Wall.', tolerance: 80 },
      { id: 'woc',  name: 'Wall of Champions', distanceFromStart: 3900, style: 'heavy', referenceApexSpeed: 72, priority: 'high', coachingText: "Wall of Champions. The wall is RIGHT THERE on exit. Don't get greedy. Resist the temptation to put wheels over the white line.", tolerance: 70 },
      { id: 't14',  name: 'Turn 14',   distanceFromStart: 4100, style: 'medium', referenceApexSpeed: 112, priority: 'high',   coachingText: 'Exit feeds pit straight. Late apex.', tolerance: 70 },
    ],
  },

  17: {
    name: 'Red Bull Ring', lapLength: 4318,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 150,  style: 'heavy',  referenceApexSpeed: 82,  priority: 'high',   coachingText: 'Hard stop. Uphill entry. Main overtaking point. Get DRS and exit right.', tolerance: 70 },
      { id: 't2',   name: 'Turn 2',    distanceFromStart: 750,  style: 'heavy',  referenceApexSpeed: 72,  priority: 'medium', coachingText: 'Tight. Don\'t brake too early — slight uphill masks the speed.', tolerance: 70 },
      { id: 't3',   name: 'Turn 3',    distanceFromStart: 1350, style: 'flat',   referenceApexSpeed: 248, priority: 'high',   coachingText: 'Fast right. Flat or near-flat downhill. Exit feeds DRS zone.', tolerance: 80 },
      { id: 't4',   name: 'Turn 4',    distanceFromStart: 2200, style: 'medium', referenceApexSpeed: 142, priority: 'medium', coachingText: 'Medium speed. Link.', tolerance: 70 },
      { id: 't9',   name: 'Turn 9',    distanceFromStart: 3600, style: 'heavy',  referenceApexSpeed: 68,  priority: 'high',   coachingText: 'Final tight chicane. Exit feeds long final straight. Maximum exit.', tolerance: 70 },
      { id: 't10',  name: 'Turn 10',   distanceFromStart: 3900, style: 'medium', referenceApexSpeed: 105, priority: 'high',   coachingText: 'Very last corner. Late apex. Exit pace defines your straight-line speed.', tolerance: 70 },
    ],
  },

  12: {
    name: 'Singapore', lapLength: 4940,
    corners: [
      { id: 't1',   name: 'Turn 1',    distanceFromStart: 150,  style: 'heavy',  referenceApexSpeed: 62,  priority: 'medium', coachingText: 'Hard brake. Walls everywhere.', tolerance: 70 },
      { id: 't3',   name: 'Turn 3',    distanceFromStart: 700,  style: 'medium', referenceApexSpeed: 82,  priority: 'medium', coachingText: 'Street circuit precision.', tolerance: 70 },
      { id: 't7',   name: 'Turn 7-10', distanceFromStart: 1600, style: 'medium', referenceApexSpeed: 88,  priority: 'medium', coachingText: 'Anderson Bridge complex. Tight and flowing.', tolerance: 90 },
      { id: 't14',  name: 'Turn 14',   distanceFromStart: 2800, style: 'flat',   referenceApexSpeed: 218, priority: 'high',   coachingText: 'Flat section. Fast. Walls still close.', tolerance: 80 },
      { id: 't18',  name: 'Turn 18',   distanceFromStart: 3800, style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Heavy brake zone. No drama.', tolerance: 70 },
      { id: 't20',  name: 'Turn 20-21',distanceFromStart: 4400, style: 'medium', referenceApexSpeed: 95,  priority: 'high',   coachingText: 'Final complex. Exit feeds home straight.', tolerance: 80 },
    ],
  },

  16: {
    name: 'Interlagos', lapLength: 4309,
    corners: [
      { id: 'senna_s',  name: 'Senna S',        distanceFromStart: 120,  style: 'heavy',  referenceApexSpeed: 72,  priority: 'medium', coachingText: 'Iconic S. Hard brake. Rotation through. No drama.', tolerance: 70 },
      { id: 'curva1',   name: 'Curva 1',         distanceFromStart: 600,  style: 'flat',   referenceApexSpeed: 235, priority: 'high',   coachingText: 'Flat right downhill. Trust it.', tolerance: 80 },
      { id: 'descida_s',name: 'Descida do Sol',  distanceFromStart: 1000, style: 'medium', referenceApexSpeed: 148, priority: 'medium', coachingText: 'Downhill. Bumpy. Smooth inputs.', tolerance: 80 },
      { id: 'ferradura', name: 'Ferradura',       distanceFromStart: 1600, style: 'heavy',  referenceApexSpeed: 65,  priority: 'low',    coachingText: 'Slow hairpin. Patient.', tolerance: 70 },
      { id: 'laranja',  name: 'Laranja',         distanceFromStart: 2200, style: 'medium', referenceApexSpeed: 128, priority: 'medium', coachingText: 'Medium speed.', tolerance: 70 },
      { id: 'pinheirinho', name: 'Pinheirinho',  distanceFromStart: 2700, style: 'medium', referenceApexSpeed: 108, priority: 'high',   coachingText: 'Exit feeds main straight.', tolerance: 70 },
      { id: 'mergulho', name: 'Mergulho',        distanceFromStart: 3300, style: 'flat',   referenceApexSpeed: 268, priority: 'high',   coachingText: 'Flat at high speed. Downhill. Commit.', tolerance: 80 },
      { id: 'junção',   name: 'Junção',          distanceFromStart: 3800, style: 'heavy',  referenceApexSpeed: 82,  priority: 'high',   coachingText: 'Final tightener. Exit feeds pit straight. Maximum exit.', tolerance: 70 },
    ],
  },

  19: {
    name: 'Mexico City', lapLength: 4304,
    corners: [
      { id: 'peraltada', name: 'Peraltada',       distanceFromStart: 200,  style: 'flat',   referenceApexSpeed: 268, priority: 'high',   coachingText: 'Banked high-speed entry. Flat at altitude. Massive commitment.', tolerance: 90 },
      { id: 't1',        name: 'Turn 1',          distanceFromStart: 450,  style: 'heavy',  referenceApexSpeed: 62,  priority: 'medium', coachingText: 'Hard brake from 300+. Tyre deg very low here at altitude.', tolerance: 70 },
      { id: 't4',        name: 'Turn 4',          distanceFromStart: 1100, style: 'medium', referenceApexSpeed: 138, priority: 'medium', coachingText: 'Medium speed stadium section.', tolerance: 70 },
      { id: 't6',        name: 'Turn 6',          distanceFromStart: 1600, style: 'flat',   referenceApexSpeed: 245, priority: 'high',   coachingText: 'Flat right. Exit critical.', tolerance: 80 },
      { id: 't11',       name: 'Turn 11',         distanceFromStart: 2700, style: 'heavy',  referenceApexSpeed: 68,  priority: 'medium', coachingText: 'Heavy stop. Patience.', tolerance: 70 },
      { id: 't13',       name: 'Turn 13',         distanceFromStart: 3200, style: 'medium', referenceApexSpeed: 122, priority: 'medium', coachingText: 'Foro Sol chicane. Stay tidy.', tolerance: 80 },
      { id: 't16',       name: 'Turn 16 / Ese del Toro', distanceFromStart: 3900, style: 'medium', referenceApexSpeed: 108, priority: 'high', coachingText: 'Final complex. Exit onto main straight.', tolerance: 70 },
    ],
  },
}

export function getTrack(trackId) {
  return TRACKS[trackId] ?? null
}

export function getCorners(trackId) {
  return TRACKS[trackId]?.corners ?? []
}

export const TRACK_IDS = {
  0: 'Melbourne', 2: 'Shanghai', 3: 'Sakhir', 4: 'Catalunya', 5: 'Monaco',
  6: 'Montreal', 7: 'Silverstone', 9: 'Hungaroring', 10: 'Spa', 11: 'Monza',
  12: 'Singapore', 13: 'Suzuka', 14: 'Yas Marina', 15: 'Austin', 16: 'Interlagos',
  17: 'Red Bull Ring', 19: 'Mexico City', 20: 'Baku', 26: 'Zandvoort', 27: 'Imola',
  29: 'Jeddah', 30: 'Miami', 31: 'Las Vegas', 32: 'Losail',
  39: 'Silverstone Reverse', 40: 'Red Bull Ring Reverse', 41: 'Zandvoort Reverse',
}

export const SESSION_TYPES = {
  0: 'Unknown', 1: 'Practice 1', 2: 'Practice 2', 3: 'Practice 3',
  4: 'Short Practice', 5: 'Qualifying 1', 6: 'Qualifying 2', 7: 'Qualifying 3',
  8: 'Short Qualifying', 9: 'One Shot Qualifying', 10: 'Race', 11: 'Race 2',
  12: 'Race 3', 13: 'Time Trial',
}

export function isRaceSession(sessionType) {
  return [10, 11, 12].includes(sessionType)
}

export function isQualifyingSession(sessionType) {
  return [5, 6, 7, 8, 9].includes(sessionType)
}

export function isTimeTrialSession(sessionType) {
  return sessionType === 13
}
