# Fact-check log

Every factual correction, with the record it now rests on. User-facing copy states only what the sources support; anything unsupported was removed rather than hedged.

## Key corrections

- **Discharge papers provenance:** Joshua did not visit any Adair County office and did not find/photograph the discharge in a records office. Aunt Alice (Giles) Poynter, Hershel's sister, kept the papers and gave them to Joshua. The 18 Jun 1945 filing stamp and 15 Aug 1960 certification are described only as printed on the document.
- **Bernadean (Giles) Myers:** deceased. No obituary could be confirmed, so no dates are shown (an unconfirmed search snippet was not used).
- **All 11 children** of William Cecil and Bertha now carry both parents.
- **Removed unsupported kinship claims** (Preston/Washington as brothers, Luther/Frank and Henry cousin claims), the "Janet = Janice" identification, and conflicting ages at death for Luther and James Washington.
- **Nora:** dates and details from her 1975 obituary (Find a Grave 91505574).
- **Cecil Jr.:** details from his 2019 obituary.

## Every edit

### index.html
- **Why:** Joshua never went to a county office. His aunt Alice (Hershel’s sister) kept the discharge and gave it to him.
- **Before:** and one creased Army discharge that Joshua photographed in the Adair County record book.
- **After:** and one creased Army discharge that William’s daughter Alice kept safe for decades and passed down to her nephew Joshua.

### index.html
- **Why:** Chapter title implied that Joshua searched the county records.
- **Before:** <h2 class="reveal">The One Who Went Looking</h2>
- **After:** <h2 class="reveal">The Seventh Generation</h2>

### index.html
- **Why:** Fabricated county-records visit removed. Alice is credited.
- **Before:** He is the one who went to the Adair County records, found his grandfather’s discharge copied into Discharge Book No. 2, and photographed it — the spark that lit everything on this site. Seven generations; one name; the same green hills under all of it.
- **After:** For years his aunt <button class="chip" data-person="alice_f"><span class="dot"></span>Alice</button>, Hershel’s sister, kept her father’s Army discharge papers safe. She gave them to Joshua, and that single family paper opened the way to everything on this site. Seven generations; one name; the same green hills under all of it.

### war.html
- **Why:** Fabricated provenance removed.
- **Before:** recorded in Adair County’s <em>Discharge Book No. 2, page 119</em>, and photographed by Joshua.
- **After:** kept in the family by William’s daughter Alice, who gave it to her nephew Joshua. The paper carries the Adair County clerk’s filing stamp and a note that it is a certified copy from <em>Discharge Book No. 2, page 119</em>.

### war.html
- **Why:** Replaced the claim that Joshua found the copy. The dates are described as printed on the paper.
- **Before:** On 18 June the discharge was filed for record at the courthouse in Columbia — and in 1960 the county clerk certified a true copy from Discharge Book No. 2, the copy Joshua found.
- **After:** The paper itself is stamped “filed for record” on 18 June 1945, and it carries the county clerk’s certification, dated 15 August 1960, that it is a true copy from Discharge Book No. 2. That certified copy stayed in the family. William’s daughter Alice kept it and later gave it to Joshua.

### assets/js/war.js
- **Why:** Describe only what is printed on the paper.
- **Before:** 'Seventeen days after he got home, the discharge was filed at the Adair County courthouse.'
- **After:** 'The paper carries the Adair County filing stamp: filed for record on 18 June 1945.'

### assets/js/war.js
- **Why:** Fabricated provenance.
- **Before:** 'The copy Joshua found'
- **After:** 'The family’s certified copy'

### assets/js/war.js
- **Why:** Fabricated provenance.
- **Before:** 'County Clerk H. B. Taylor certified this true copy in 1960 from Discharge Book No. 2, page 119 — the record Joshua photographed.'
- **After:** 'The certification printed at the foot of the page: County Clerk H. B. Taylor certified this true copy from Discharge Book No. 2, page 119, on 15 August 1960. William’s daughter Alice kept this copy and gave it to her nephew Joshua.'

### sources.html
- **Why:** Fabricated provenance.
- **Before:** certified copy dated 15 August 1960. Photographed by Joshua Giles.
- **After:** certified copy dated 15 August 1960 (both printed on the document). A family paper: kept by William’s daughter Alice (Giles) Poynter and given to her nephew Joshua Giles.

### assets/js/data.js
- **Why:** Fabricated provenance.
- **Before:** 'Joshua photographed a 1945 discharge — and the story opened up.'
- **After:** 'A 1945 Army discharge, kept in the family by William’s daughter Alice, opened the story up again.'

### assets/js/stories.js
- **Why:** Fabricated framing, and a Joshua-centered event.
- **Before:** { y: 2026, d: '2026', t: 'Joshua brings the story home', who: 'joshua', txt: 'Seven generations, one website.' },
- **After:** { y: 2026, d: '2026', t: 'The family’s story, gathered in one place', who: 'alice_f', txt: 'The discharge papers that Alice kept and passed down to her nephew Joshua became the starting point for this site.' },

### assets/js/data.js
- **Why:** Same as above.
- **Before:** { id: 'alice_f', name: 'Alice Faye', short: 'Alice', sex: 'F', parents: ['william'],
- **After:** { id: 'alice_f', name: 'Alice Faye', short: 'Alice', sex: 'F', parents: wb,

### assets/js/data.js
- **Why:** Added from his 2019 Meredith-Clark obituary.
- **Before:** bio: 'Fourth of Bertha’s eleven children and his father’s namesake. Cecil made his life in Indiana and died on 15 August 2019.' }
- **After:** birthPlace: 'Franklin, Indiana', place: 'Franklin · Nineveh, Indiana · Marietta, Georgia',       bio: 'Born in Franklin, Indiana, on 16 December 1954, the fourth of William and Bertha’s eleven children and his father’s namesake. At Indian Creek High School (class of 1973) he starred in baseball and basketball: a pitcher and infielder on the sectional champions of 1971 and 1973, MVP and All-Confere…

### assets/js/data.js
- **Why:** Gentler wording. Sourced to the 2001, 2019 and 2022 obituaries.
- **Before:** { id: 'evelyn', name: 'Bertha Evelyn (Giles) Duncan', short: 'Bertha Evelyn', sex: 'F', parents: wb, badge: 'Firstborn', years: '',       bio: 'The eldest — already a toddler of two on the 1950 census, named for her mother. She died before her father (2001) and before her brother Hershel (2022).' }
- **After:** { id: 'evelyn', name: 'Bertha Evelyn (Giles) Duncan', short: 'Evelyn', sex: 'F', parents: wb, badge: 'Firstborn', years: '',       bio: 'The eldest of William and Bertha’s children, and her mother’s namesake. She was two years old on the 1950 census. Evelyn died before her father did in 2001, and she is remembered in the obituaries of her father and of her brothers Cecil and Hershel.' }

### assets/js/data.js
- **Why:** Removed the analytic “not among the eleven” aside. Kept only what the obituary says.
- **Before:** bio: 'Named in William Cecil’s 2001 obituary as a son who died before his father. He is not among the eleven children of William and Bertha listed in Hershel’s 2022 obituary, so his line runs through William alone.' }
- **After:** bio: 'William Cecil’s son, remembered in his father’s 2001 obituary among the family members who had gone before him.' }

### index.html
- **Why:** The “Janet” identification is not established (the 1950 entry gives a different age and birthplace). Replaced with a documented fact.
- **Before:** <p class="reveal d2">Best detail of all: on the 1950 census, the enumerator wrote Janice down as “Janet.”</p>
- **After:** <p class="reveal d2">Their wartime letters and Henry’s war diary survive among Janice Holt Giles’s papers at Western Kentucky University.</p>

### index.html
- **Why:** “Ran for the line” was flippant. Nora’s birth date (23 Jan 1890, from her 1975 obituary) makes her 16. The “Tiny” nickname is from her obituary.
- **Before:** <button class="chip" data-person="luther"><span class="dot"></span>Luther</button>, Preston’s eldest, was twenty-four. <button class="chip" data-person="nora"><span class="dot"></span>Nora</button> was a teenager. They ran for the Tennessee line and came home married.
- **After:** <button class="chip" data-person="luther"><span class="dot"></span>Luther</button>, Preston’s eldest son, was in his twenties. <button class="chip" data-person="nora"><span class="dot"></span>Nora</button> — “Tiny” to the people who loved her — was sixteen. They crossed into Tennessee to be married and came home to build a life together that lasted more than fifty years.

### index.html
- **Why:** Cut the speculative “rest of his working life” phrasing and tied each place to a record.
- **Before:** came home to Adair County on 1 June, and spent the rest of his working life following the jobs north and coming back south: Wadsworth, Ohio in 1949; Edinburg, Indiana by 1959; retirement from Cosco Industries; and his last years at Edmonton, Kentucky.
- **After:** came home to Adair County on 1 June. Like many Kentucky veterans he went where the work was: the 1950 census notes he had been living in Wadsworth, Ohio, in 1949; by 1959 the family lived at Edinburg, Indiana, and their children went to school at Indian Creek. He retired from Cosco Industries and spent his last years at Edmonton, Kentucky, a member of the Baptist faith.

### index.html
- **Why:** The “families live inside walls he stood up” line was an embellishment and is not in his obituary.
- **Before:** Self-employed and very good at it, Hershel framed houses all over Johnson, Morgan and Brown counties, and a good many Indiana families live today inside walls he stood up.
- **After:** Self-employed, Hershel framed houses all over Johnson, Morgan and Brown counties.

### index.html
- **Why:** The obituary says he enjoyed caring for Pal. It does not say Pal went everywhere with him.
- **Before:** His German shepherd, Pal, went most places he did.
- **After:** He loved caring for his German shepherd, Pal.

### index.html
- **Why:** The spelling aside was mildly mocking. Replaced with his burial place (Find a Grave memorial, in the research file).
- **Before:** When he died on 19 June 1913, the county clerk spelled it <em>Jiles</em>.
- **After:** He died on 19 June 1913 and rests in the Tabernacle Cemetery at Neatsville.

### index.html
- **Why:** Small tightening.
- **Before:** They were <button class="chip" data-person="preston"><span class="dot"></span>Preston</button> and <button class="chip" data-person="jwash"><span class="dot"></span>James Washington</button> — and between them they would start the two great branches of the Adair County Giles.
- **After:** They were <button class="chip" data-person="preston"><span class="dot"></span>Preston</button> and <button class="chip" data-person="jwash"><span class="dot"></span>James Washington</button>, and from them grew two branches of the Adair County Giles.

### index.html
- **Why:** No document yet proves the two were brothers (STATE.md), so the word is dropped. The 1870 household and the 1900 neighbors are documented.
- **Before:** By 1900 the brothers were living side by side in the Pellyton district:
- **After:** By 1900 the two households stood side by side in the Pellyton district:

### index.html
- **Why:** The “first cousins” tie is unproven.
- **Before:** <p class="reveal d2">Preston’s boy Luther and Washington’s boy Frank grew up first cousins, one fence apart.</p>
- **After:** <p class="reveal d2">Preston’s son Luther and Washington’s son Frank grew up one fence apart.</p>

### index.html
- **Why:** Same.
- **Before:** <h2 class="reveal">The Brothers of Neatsville</h2>
- **After:** <h2 class="reveal">Two Branches at Pellyton</h2>

### index.html
- **Why:** Same.
- **Before:** data-label="The Brothers"
- **After:** data-label="Preston & Washington"

### index.html
- **Why:** The second-cousin relationship is unproven.
- **Before:** (1916–1986) — William Cecil’s second cousin — met
- **After:** (1916–1986) met

### index.html
- **Why:** Now attributed to its source (NRHP nomination; WKU finding aid).
- **Before:** Henry’s father Frank rived ten thousand shingles for it by hand.
- **After:** Henry’s father Frank rived the shingles for its roof by hand: ten thousand of them, according to the house’s National Register nomination.

### assets/js/data.js
- **Why:** Brotherhood unproven. The shared 1870 household is documented.
- **Before:** His next-door neighbor? His brother, James Washington.
- **After:** His next-door neighbor was James Washington Giles, who had grown up in the same Neatsville household.

### assets/js/data.js
- **Why:** Same.
- **Before:** '1900: head of household, Pellyton district — next door to brother James Washington'
- **After:** '1900: head of household, Pellyton district — next door to James Washington Giles'

### assets/js/data.js
- **Why:** Death-index age 83 conflicts with his 1853 census birth date, so the age is dropped.
- **Before:** In 1900 he lived next door to Preston at Pellyton. He died at Knifley on 21 July 1938, age 83.
- **After:** In 1900 he lived next door to Preston at Pellyton. He died at Knifley on 21 July 1938.

### assets/js/data.js
- **Why:** Same.
- **Before:** '1900: Pellyton, next door to brother Preston', 'Died 21 July 1938, Knifley, age 83'
- **After:** '1900: Pellyton, next door to Preston', 'Died 21 July 1938, Knifley'

### assets/js/data.js
- **Why:** Birth date from her 1975 obituary.
- **Before:** years: 'c. 1890 – 1975', born: 1890
- **After:** years: '1890 – 1975', born: 1890

### assets/js/data.js
- **Why:** Same.
- **Before:** facts: ['Eloped with Luther to Tennessee, 1906', '1950 census: “Nora V.,” age 60, Blue Hollow', 'Died 9 May 1975, age 85'] });
- **After:** facts: ['Born 23 January 1890, Adair County', 'Married Luther Giles in Tennessee, September 1906', '1950 census: “Nora V.,” age 60, Blue Hollow', 'Died 9 May 1975, Louisville, age 85; buried Tabernacle Cemetery'] });

### assets/js/data.js
- **Why:** Cousin tie unproven. The shingles are now attributed.
- **Before:** Frank grew up next door to his cousin Luther in 1900 Pellyton. When his son Henry and daughter-in-law Janice Holt Giles built their log house at Spout Springs, Frank rived ten thousand shingles for the roof by hand.
- **After:** Frank grew up next door to Luther’s family at Pellyton in 1900. When his son Henry and daughter-in-law Janice Holt Giles built their log house at Spout Springs, Frank rived the roof shingles by hand: ten thousand of them, according to the house’s National Register nomination.

### assets/js/data.js
- **Why:** Which battalion Henry served in is not settled in the research. The “Janet” identification is not established.
- **Before:** The Damned Engineers, about Henry’s wartime engineer battalion. The 1950 census-taker wrote her down as “Janet.”
- **After:** The Damned Engineers, a history of an Army engineer battalion in the Battle of the Bulge.

### assets/js/data.js
- **Why:** “Ten children” is not established. The 1870 and 1880 censuses together name ten, but not all of them in one household.
- **Before:** bio: 'Abby was born in Virginia. In 1850 she was 21, with baby John on her hip, and her Prindle kin lived on the very next farm. She raised ten children and kept house in Neatsville through 1880.',
- **After:** bio: 'Abby was born in Virginia. In 1850 she was 21, with a year-old son, John, and her Prindle kin lived on the very next farm. She raised a large family and kept house in Neatsville through 1880.',

### assets/js/data.js
- **Why:** Her death before Nora is from Nora’s 1975 obituary.
- **Before:** 'Mrs. Leon Farmer. In 1950 her household on the Casey Creek district included her brother Herman. By 1959 the Farmers had moved to Wadsworth, Ohio.'
- **After:** 'Mrs. Leon Farmer. In 1950 her household in the Casey Creek district included her brother Herman. By 1959 the Farmers had moved to Wadsworth, Ohio. She died before her mother, Nora, in 1975.'

### assets/js/data.js
- **Why:** Added from his 2001 obituary (Glasgow Daily Times).
- **Before:** He died 16 March 2001, age 77, and rests at Heavenly Hill Cemetery in Columbia.'
- **After:** A Baptist, he died at Glasgow on 16 March 2001, at 77, survived by ten children, twenty grandchildren and five great-grandchildren, and rests at Heavenly Hill Cemetery in Columbia.'

### assets/js/data.js
- **Why:** 1950 census (age 24, Ky 206) and William’s 2001 obituary.
- **Before:** In 1950 she and William had two little girls, Evelyn and Bernadean. Cecil Jr. was the fourth of her eleven children.
- **After:** In 1950 she was 24, keeping house off Ky 206 near Luther and Nora’s farm, with two little girls, Evelyn and Bernadean. She and William raised eleven children, most of them born after the family settled in Johnson County, Indiana. Bertha died before William, and his 2001 obituary remembers her as his first wife, Bertha Burton Giles.

### assets/js/stories.js
- **Why:** Removed the speculative “right age to be James”.
- **Before:** txt: 'Two teenage boys in the house — one of them the right age to be James.' }
- **After:** txt: 'In 1840 only the head of the household was named. Elijah’s family included two young men between 15 and 19.' }

### assets/js/stories.js
- **Why:** Brotherhood unproven.
- **Before:** t: 'The brothers live side by side at Pellyton'
- **After:** t: 'Preston and Washington live side by side at Pellyton'

### assets/js/stories.js
- **Why:** Exact date from his obituary.
- **Before:** { y: 1954, d: '1954', t: 'William Cecil “Cecil” Jr. is born', who: 'cecil_jr', txt: 'Fourth of eleven.' }
- **After:** { y: 1954, d: '16 Dec 1954', t: 'William Cecil “Cecil” Giles Jr. is born in Franklin, Indiana', who: 'cecil_jr', txt: 'The fourth of William and Bertha’s eleven children.' }

### assets/js/stories.js
- **Why:** Minor.
- **Before:** t: 'Luther Giles dies at home in Neatsville, 77'
- **After:** t: 'Luther Giles dies at home in Neatsville'

### assets/js/stories.js
- **Why:** From his obituary.
- **Before:** { y: 2019, d: '15 Aug 2019', t: 'Cecil Jr. dies', who: 'cecil_jr', txt: '' }
- **After:** { y: 2019, d: '15 Aug 2019', t: 'Cecil Giles Jr. dies, 64', who: 'cecil_jr', txt: 'His funeral is held in the Indian Creek High School gymnasium, where he had once starred.' }

### assets/js/stories.js
- **Why:** Kinship unproven.
- **Before:** note: 'Brothers Preston and Washington, side by side — their boys Luther and Frank grow up as next-door cousins.'
- **After:** note: 'Preston and Washington, side by side: their sons Luther and Frank grow up next door to each other.'

### assets/js/stories.js
- **Why:** Cousin tie unproven.
- **Before:** { q: 'Which cousin married a famous novelist?'
- **After:** { q: 'Which Adair County Giles married the novelist Janice Holt?'

### assets/js/stories.js
- **Why:** Removed the unproven “Janet” question and added sourced family questions.
- **Before:** { q: 'What did the 1950 census-taker call Janice Holt Giles?', a: ['Jane', 'Janet', 'Jennie', 'Mrs. Henry'], c: 1, why: 'She is “Janet” on Sheet 25 of Adair County’s District 1-3.' },
- **After:** { q: 'Who kept William’s 1945 Army discharge papers in the family?', a: ['His son Hershel', 'His daughter Alice', 'His brother Walter', 'The county library'], c: 1, why: 'His daughter Alice, Hershel’s sister, kept the papers and gave them to her nephew Joshua.' },   { q: 'Cecil Giles Jr. was the first Indian Creek athlete to earn a college scholarship in how many sports?', a: ['One', 'Two', 'Three…

### legend.html
- **Why:** The “lives where legends live” framing was dismissive, and “farmed the same hills ever since” was inaccurate (the family moved north).
- **Before:** So the daughter in the Giles story lives where legends live: in the telling. What is certain is the ground beneath it. Elijah Giles came into Kentucky within a generation of Dragging Canoe’s war, and his descendants have farmed the same contested hills ever since. A story like this one is a family’s way of saying where it belongs — and what it will not forget.
- **After:** The Giles family has carried the memory of the chief’s daughter for generations, and it is honored here as part of who the family is. Elijah Giles came into Kentucky within a generation of Dragging Canoe’s war, and his descendants made their homes in those same hills. A story kept this long is a gift to every generation that hears it.

### sources.html
- **Why:** The “Janet” identification was removed.
- **Before:** Bernadean as Bernadine; Janice as “Janet.” Old ages drift a little from census to census, too.
- **After:** Bernadean as Bernadine. Ages can differ by a year or two from one record to the next.

### sources.html
- **Why:** Removed the hedging heading.
- **Before:** <h3>Eleven or twelve?</h3>
- **After:** <h3>William’s children</h3>

### sources.html
- **Why:** No hedging.
- **Before:** Cecil Jr.’s obituary calls him the fourth of eleven children; William’s 2001 obituary names twelve sons and daughters. Both are told here as they were printed.
- **After:** William and Bertha raised eleven children, as Cecil Jr.’s and Hershel’s obituaries record. William’s 2001 obituary also remembers his son William Ray, who died before him.

### assets/js/home.js
- **Why:** Question count is now 14.
- **Before:** 'Think you know the Giles? Thirteen questions. Keep score. Bragging rights at the next reunion.'
- **After:** 'How well do you know the family? Fourteen questions, with the story behind every answer.'

### assets/js/quiz.js
- **Why:** Quiz now has 14 questions.
- **Before:** [[13, 'Keeper of the Family Bible']
- **After:** [[14, 'Keeper of the Family Bible']

### assets/js/data.js
- **Why:** The death-index age (77) conflicts with his 1900-census birth date (Aug 1882), so the age is dropped.
- **Before:** 'Died 22 January 1959 at home, Neatsville community, age 77'
- **After:** 'Died 22 January 1959 at home, Neatsville community'

### assets/js/data.js
- **Why:** Fabricated provenance.
- **Before:** bio: 'Son of Hershel Dewayne Giles (1959–2022) and younger brother of Shelby. It was Joshua who photographed his grandfather’s discharge in the Adair County record book and set this whole search in motion.' });
- **After:** bio: 'Son of Hershel Dewayne Giles (1959–2022) and younger brother of Shelby. His aunt Alice gave him his grandfather William’s Army discharge papers, and the family history on this site grew from them.' });

### assets/js/data.js
- **Why:** Fabricated framing.
- **Before:** role: 'Seventh generation — Hershel’s son, the one who went looking',
- **After:** role: 'Seventh generation — Hershel’s son',

### assets/js/data.js
- **Why:** Credited Alice. Removed the unsourced “keeper of the legend” claim.
- **Before:** bio: 'One of William Cecil’s daughters — Joshua’s aunt, and one of the keepers of the family’s legend.' }
- **After:** bio: 'Daughter of William Cecil and Bertha, and Hershel’s sister. Alice kept her father’s 1945 Army discharge papers and gave them to her nephew Joshua. Those papers are the heart of the war chapter on this site.' }

### assets/js/data.js
- **Why:** Bernadean is deceased (per Joshua). No obituary could be confirmed, so no dates are given.
- **Before:** { id: 'bernadean', name: 'Bernadean', short: 'Bernadean', sex: 'F', parents: wb, living: true, badge: 'Second born',       bio: 'The baby of the 1950 household (the census-taker spelled it “Bernadine”) — Hershel’s sister.' },
- **After:** { id: 'bernadean', name: 'Bernadean (Giles) Myers', short: 'Bernadean', sex: 'F', parents: wb, badge: 'Second born', years: '',       bio: 'William and Bertha’s second daughter, and the baby of the household on the 1950 census (written “Bernadine”). Hershel’s older sister, named among his survivors in 2022. Bernadean has since passed away, and she is remembered here with love.' },

### assets/js/data.js
- **Why:** Hershel’s and Cecil Jr.’s obituaries both name all eleven as children of William AND Bertha.
- **Before:** { id: 'danny', name: 'Danny Douglas', short: 'Danny', sex: 'M', parents: ['william'], living: true, badge: 'Son', bio: 'One of William Cecil’s sons — Joshua’s uncle.' }
- **After:** { id: 'danny', name: 'Danny Douglas', short: 'Danny', sex: 'M', parents: wb, living: true, badge: 'Son', bio: 'Son of William Cecil and Bertha, and Hershel’s brother.' }

### assets/js/data.js
- **Why:** Same as above.
- **Before:** { id: 'ronald', name: 'Ronald Lee “Ronnie”', short: 'Ronnie', sex: 'M', parents: ['william'], living: true, badge: 'Son', bio: 'One of William Cecil’s sons — Joshua’s uncle.' }
- **After:** { id: 'ronald', name: 'Ronald Lee “Ronnie”', short: 'Ronnie', sex: 'M', parents: wb, living: true, badge: 'Son', bio: 'Son of William Cecil and Bertha, and Hershel’s brother.' }

### assets/js/data.js
- **Why:** Same as above.
- **Before:** { id: 'randy', name: 'Randall Lawrence “Randy”', short: 'Randy', sex: 'M', parents: ['william'], living: true, badge: 'Son', bio: 'One of William Cecil’s sons — Joshua’s uncle.' }
- **After:** { id: 'randy', name: 'Randall Lawrence “Randy”', short: 'Randy', sex: 'M', parents: wb, living: true, badge: 'Son', bio: 'Son of William Cecil and Bertha, and Hershel’s brother.' }

### assets/js/data.js
- **Why:** Same as above.
- **Before:** { id: 'donna', name: 'Donna Sue', short: 'Donna Sue', sex: 'F', parents: ['william'], living: true, badge: 'Daughter', bio: 'One of William Cecil’s daughters — Joshua’s aunt.' }
- **After:** { id: 'donna', name: 'Donna Sue', short: 'Donna Sue', sex: 'F', parents: wb, living: true, badge: 'Daughter', bio: 'Daughter of William Cecil and Bertha, and Hershel’s sister.' }

### assets/js/data.js
- **Why:** Same as above.
- **Before:** { id: 'jeannine', name: 'Jeanine', short: 'Jeanine', sex: 'F', parents: ['william'], living: true, badge: 'Daughter', bio: 'One of William Cecil’s daughters — Joshua’s aunt.' }
- **After:** { id: 'jeannine', name: 'Jeanine', short: 'Jeanine', sex: 'F', parents: wb, living: true, badge: 'Daughter', bio: 'Daughter of William Cecil and Bertha, and Hershel’s sister.' }

### assets/js/data.js
- **Why:** Same as above.
- **Before:** { id: 'joyce', name: 'Joyce Christine', short: 'Joyce', sex: 'F', parents: ['william'], living: true, badge: 'Daughter', bio: 'One of William Cecil’s daughters — Joshua’s aunt.' }
- **After:** { id: 'joyce', name: 'Joyce Christine', short: 'Joyce', sex: 'F', parents: wb, living: true, badge: 'Daughter', bio: 'Daughter of William Cecil and Bertha, and Hershel’s sister.' }

### assets/js/data.js
- **Why:** Roles now say whose children they are, not only how they relate to Joshua.
- **Before:** role: k.id === 'hershel' ? 'Framer and builder — father of Shelby and Joshua' : ('Child of William Cecil — Joshua’s ' + (k.sex === 'M' ? 'uncle' : 'aunt'))
- **After:** role: k.id === 'hershel' ? 'Framer and builder — father of Shelby and Joshua' : k.id === 'william_ray' ? 'Son of William Cecil' : ('Child of William Cecil & Bertha')

### assets/js/data.js
- **Why:** Same.
- **Before:** role: 'Preston’s brother — grandfather of Henry Earl Giles',
- **After:** role: 'Of the 1870 Neatsville household — grandfather of Henry Earl Giles',

### assets/js/data.js
- **Why:** “The girl who ran off” was disrespectful. Added sourced facts from her 1975 obituary (Wright, <em>Obituaries of Taylor County</em>, via Find a Grave).
- **Before:** bio: 'The Knifley correspondent of 1906 called her “Miss Tinna Allen” — the girl who ran off to Tennessee with Luther Giles. Nora Allen Giles mothered nine children, was still keeping the Blue Hollow farm with Luther in 1950, and outlived him by sixteen years. She died on 9 May 1975, age 85.',
- **After:** bio: 'Nora Victoria Allen was born on 23 January 1890 in Adair County, the daughter of Thomas Allen and Mary Bett White, and was known to family as “Tiny” (the 1906 Knifley column printed it “Tinna”). She married Luther Giles in Tennessee in September 1906, raised nine children, and was still keeping the Blue Hollow farm with Luther in 1950. A member of the Tabernacle Christian Church, and a Knifl…

### assets/js/data.js
- **Why:** Cousin tie unproven.
- **Before:** role: 'Luther’s first cousin — Henry Earl’s father',
- **After:** role: 'Luther’s Pellyton neighbor — Henry Earl’s father',

### assets/js/data.js
- **Why:** Unproven second-cousin tie.
- **Before:** role: 'William’s second cousin — husband of novelist Janice Holt Giles',
- **After:** role: 'Of the Pellyton Giles — husband of novelist Janice Holt Giles',

### assets/js/stories.js
- **Why:** Brotherhood unproven.
- **Before:** txt: 'Preston’s little brother — grandfather of Henry Earl Giles.' }
- **After:** txt: 'Grandfather of Henry Earl Giles.' }

### assets/js/stories.js
- **Why:** The “Janet” identification is not established.
- **Before:** Melzena, Herman and Zackie nearby — and Henry and “Janet” on the next pages.' }
- **After:** Melzena, Herman and Zackie nearby; Henry Earl Giles and Frank and Bessie on the next sheets.' }

### assets/js/stories.js
- **Why:** The census entry (age 35, born Oklahoma) does not match Janice Holt (born 1905, Arkansas).
- **Before:** { n: '“Janet”', r: 'Wife — that’s Janice!', id: 'janice', s: 'F' }
- **After:** { n: 'Janet', r: 'Wife', s: 'F' }

### sources.html
- **Why:** Full citation.
- **Before:** Meredith Funeral Home, 2019.</b> Obituary of William Cecil “Cecil” Giles Jr.
- **After:** Meredith-Clark Funeral Home, Morgantown, Indiana, August 2019.</b> Obituary of Wm. “Cecil” Giles Jr. (1954–2019) — <a href="https://www.meredith-clark.com/obituary/WmCecil-Giles" rel="noopener">meredith-clark.com</a>. Source for his birth, school and sports record, college, career and death.

### quiz.html
- **Why:** Count.
- **Before:** Thirteen questions drawn straight from the family records.
- **After:** Fourteen questions drawn from the family records.

### quiz.html
- **Why:** Count.
- **Before:** <p>Thirteen questions, every answer straight from the old records.
- **After:** <p>Fourteen questions, every answer from the family records.

### sources.html
- **Why:** New facts on the site (Nora’s birth date, parents and nickname; the Tabernacle burials) now cite their sources.
- **Before:** (new entries)
- **After:** Nora 1975 obituary; Find a Grave memorials
