/* Timeline events & census households. Family events come from the project's records; context events are general public history (type:'world'). */
window.TIMELINE = [
  { y: 1792, d: '1 June 1792', t: 'Kentucky becomes the 15th state', type: 'world', txt: 'The new state opens the way west for thousands of Virginia families.' },
  { y: 1794, d: 'c. 1794', t: 'Elijah Giles is born in Virginia', who: 'elijah', txt: 'The first Giles in the family\u2019s records.' },
  { y: 1824, d: '1824', t: 'James W. Giles is born in Kentucky', who: 'jamesw', txt: 'Elijah\u2019s son — the man who will take the family to Adair County.' },
  { y: 1840, d: '1840', t: 'Elijah heads a household of nine in Casey County', who: 'elijah', txt: 'In 1840 only the head of the household was named. Elijah’s family included two young men between 15 and 19.' },
  { y: 1850, d: '29 Aug 1850', t: 'Three households in a row, Rockcastle County', who: 'jamesw', img: 'assets/img/archive/census-1850-rockcastle.jpg', txt: 'The census-taker walks from the Prindle farm, to James (26), Abagail (21) and baby John, to Elijah\u2019s place next door.' },
  { y: 1851, d: 'March 1851', t: 'William Preston Giles is born', who: 'preston', txt: 'Joshua\u2019s great-great-grandfather.' },
  { y: 1853, d: 'March 1853', t: 'James Washington Giles is born', who: 'jwash', txt: 'Grandfather of Henry Earl Giles.' },
  { y: 1860, d: '1860', t: 'Elijah, 66, in Rockcastle with his son Samuel', who: 'elijah', txt: 'The last census record of Elijah Giles.' },
  { y: 1861, d: '1861–1865', t: 'The Civil War divides Kentucky', type: 'world', txt: 'In July 1863 John Hunt Morgan\u2019s raiders fight through Columbia, the Adair County seat.' },
  { y: 1870, d: '1870', t: 'Ten under one roof in Neatsville', who: 'jamesw', img: 'assets/img/archive/census-1870-neatsville.jpg', txt: 'James W., Abby and eight children — John P., William P., Washington, Elijah F., Benjamin F., Alice, Perry G. and Anna — on an Adair County farm.' },
  { y: 1880, d: '1880', t: 'Washington has a home of his own — as \u201cK. W.\u201d', who: 'jwash', txt: 'At Casey Creek the census-taker writes \u201cK. W. Giles,\u201d 25, with Mary and baby Milton. Back in Neatsville, James W. is still farming at 58.' },
  { y: 1882, d: 'August 1882', t: 'Luther Aaron Giles is born', who: 'luther', txt: 'Preston and Susan\u2019s first son.' },
  { y: 1889, d: '22 Nov 1889', t: 'Cousin Frank Giles is born', who: 'frank', txt: 'James Washington\u2019s son — Henry Earl\u2019s father.' },
  { y: 1900, d: '1900', t: 'Preston and Washington live side by side at Pellyton', who: 'preston', txt: 'William P. and Susan with Luther, Arthur Owen and Melcena; next door, James W. and Mary with Jared and young Thomas F. (Frank).' },
  { y: 1890, d: '23 Jan 1890', t: 'Nora Victoria Allen is born in Adair County', who: 'nora', txt: 'Daughter of Thomas Allen and Mary Bett White. Family called her \u201cTiny.\u201d' },
  { y: 1906, d: 'September 1906', t: 'Luther and Nora marry in Tennessee', who: 'luther', txt: '\u201cMr. Luther Giles and Miss Tinna Allen eloped to Tennessee a few days ago, and got married.\u201d — Knifley news, Adair County News, 19 Sept 1906.' },
  { y: 1913, d: '19 June 1913', t: 'James W. Giles dies at 88', who: 'jamesw', txt: 'The first of the family in Adair County. He rests in the Tabernacle Cemetery at Neatsville.' },
  { y: 1916, d: 'June 1916', t: 'Henry Earl Giles is born', who: 'henry', txt: 'Frank and Bessie\u2019s son, a WWII sergeant and author, and husband of novelist Janice Holt Giles.' },
  { y: 1924, d: '19 April 1924', t: 'William Cecil Giles is born at Knifley', who: 'william', txt: 'Luther and Nora\u2019s son — Joshua\u2019s grandfather.' },
  { y: 1938, d: '21 July 1938', t: 'James Washington Giles dies at Knifley, 83', who: 'jwash', txt: '' },
  { y: 1942, d: 'Nov 1942', t: 'Walter Giles at Fort Leonard Wood', who: 'walter', img: 'assets/img/archive/acn-1942-walter.jpg', txt: 'The first of Luther\u2019s boys in uniform.' },
  { y: 1943, d: '5 Oct 1943', t: 'William is inducted into the Army', who: 'william', img: 'assets/img/archive/acn-1943-atterbury.jpg', txt: 'Active duty from Louisville on 26 October; the home paper lists him among the Adair men sent from Fort Thomas to Camp Atterbury, Indiana.' },
  { y: 1944, d: '6 June 1944', t: 'D-Day in Normandy', type: 'world', txt: 'The Allied invasion of France begins.' },
  { y: 1944.5, d: '16 July 1944', t: 'William arrives in the European Theater', who: 'william', txt: 'He sailed from the United States on 1 July 1944.' },
  { y: 1944.6, d: '3 Aug 1944', t: 'Wounded in action in France', who: 'william', txt: 'Severe leg wounds. Purple Heart.' },
  { y: 1945, d: 'Spring 1945', t: 'William marries Bertha Burton', who: 'bertha', txt: '\u201cMiss Bertha Burton\u201d in February; \u201cMrs. Bertha Giles\u201d by April.' },
  { y: 1945.4, d: '30 May 1945', t: 'Honorable discharge, El Paso, Texas', who: 'william', img: 'assets/img/archive/acn-1945-discharge.jpg', txt: 'Home to Adair County on Saturday, 1 June 1945.' },
  { y: 1945.8, d: '11 Oct 1945', t: 'Henry Earl Giles marries Janice Holt', who: 'janice', txt: '' },
  { y: 1949, d: '1949', t: 'North for work: William in Wadsworth, Ohio', who: 'william', txt: 'Meanwhile Henry and Janice move to Giles Ridge on 30 May 1949.' },
  { y: 1950, d: 'April 1950', t: 'The 1950 census finds the whole clan in one district', who: 'william', img: 'assets/img/archive/census-1950-william.jpg', txt: 'Luther and Nora at Blue Hollow; William, Bertha, Evelyn and baby Bernadean off Ky 206; Melzena, Herman and Zackie nearby; Henry Earl Giles and Frank and Bessie on the next sheets.' },
  { y: 1952, d: '1952', t: 'Janice publishes 40 Acres and No Mule', who: 'janice', type: 'world', txt: 'Her memoir of life on Giles Ridge.' },
  { y: 1954, d: '16 Dec 1954', t: 'William Cecil \u201cCecil\u201d Giles Jr. is born in Franklin, Indiana', who: 'cecil_jr', txt: 'The fourth of William and Bertha\u2019s eleven children.' },
  { y: 1959, d: '22 Jan 1959', t: 'Luther Giles dies at home in Neatsville', who: 'luther', img: 'assets/img/archive/luther-obit-1959.jpg', txt: 'Survived by Nora, seven sons and two daughters — in Adair County, Edinburg and Columbus, Indiana, and Wadsworth, Ohio.' },
  { y: 1967, d: '1967', t: 'Green River Lake rises', type: 'world', txt: 'Henry and Janice\u2019s Spout Springs log house is moved ahead of the new lake.' },
  { y: 1975, d: '9 May 1975', t: 'Nora Allen Giles dies, 85', who: 'nora', txt: '' },
  { y: 1986, d: '1 Oct 1986', t: 'Henry Earl Giles dies', who: 'henry', txt: 'Buried at Caldwell Chapel, Knifley.' },
  { y: 1959.5, d: '3 Jul 1959', t: 'Hershel Dewayne Giles is born in Franklin, Indiana', who: 'hershel', txt: 'William and Bertha\u2019s son, and the father of Shelby and Joshua.' },
  { y: 1977, d: '1977', t: 'Hershel graduates from Indian Creek High School', who: 'hershel', txt: 'He goes on to study Building Trades at Ivy Tech and becomes a self-employed framer.' },
  { y: 2001, d: '16 Mar 2001', t: 'William Cecil Giles dies, 77', who: 'william', txt: 'Laid to rest at Heavenly Hill Cemetery, Columbia, Kentucky.' },
  { y: 2019, d: '15 Aug 2019', t: 'Cecil Giles Jr. dies, 64', who: 'cecil_jr', txt: 'His funeral is held in the Indian Creek High School gymnasium, where he had once starred.' },
  { y: 2022.9, d: '14 Nov 2022', t: 'Hershel Giles dies at home in Martinsville, 63', who: 'hershel', txt: 'Buried at East Hill Cemetery, Morgantown, Indiana.' },
  { y: 2022, d: 'April 2022', t: 'The 1950 census is opened to the public', type: 'world', txt: 'After 72 years the records were opened, and the whole family appears in them.' },
  { y: 2026, d: '2026', t: 'The family’s story, gathered in one place', who: 'alice_f', txt: 'The discharge papers that Alice kept and passed down to her nephew Joshua became the starting point for this site.' },
];

/* Census time machine — households exactly as the census-takers recorded them. Ages omitted for living people. */
window.CENSUS = {
  1840: { place: 'Casey County, Kentucky', note: 'In 1840 only the head of household was named; everyone else was a tally mark by age.', homes: [
    { head: 'Elijah Giles', where: 'Casey County', members: [
      { n: 'Elijah Giles', r: 'Head', a: '40s', id: 'elijah', s: 'M' }, { n: '(wife)', r: 'Female 40–49', s: 'F', id: 'susan_e' },
      { n: '2 young men', r: 'Males 15–19', s: 'M' }, { n: '1 boy', r: 'Male 10–14', s: 'M' }, { n: '2 boys', r: 'Males 5–9', s: 'M' },
      { n: '1 girl', r: 'Female 10–14', s: 'F' }, { n: '1 little girl', r: 'Female under 5', s: 'F' } ] } ] },
  1850: { place: 'Northern District, Rockcastle County, Kentucky', note: 'Enumerated 29 August 1850 — three households in a row on the same page.', homes: [
    { head: 'William Prindle', where: 'Dwelling 158', members: [
      { n: 'Wm Prindle', r: 'Farmer', a: 46, s: 'M' }, { n: 'Anna', a: 48, s: 'F' }, { n: 'Anna', a: 20, s: 'F' }, { n: 'Preston', a: 17, s: 'M' },
      { n: 'George M.', a: 14, s: 'M' }, { n: 'Julius M.', a: 12, s: 'M' }, { n: 'John P.', a: 7, s: 'M' }, { n: 'Eliza Jane', a: 5, s: 'F' } ] },
    { head: 'James Giles', where: 'Dwelling 159', star: true, members: [
      { n: 'James Giles', r: 'Farmer', a: 26, id: 'jamesw', s: 'M' }, { n: 'Abagail', a: 21, id: 'abby', s: 'F' }, { n: 'John', a: 1, id: 'john_p', s: 'M' } ] },
    { head: 'Elijah Giles', where: 'Dwelling 160', members: [
      { n: 'Elijah Giles', r: 'Labourer', a: 56, id: 'elijah', s: 'M' }, { n: 'Susan', a: 62, id: 'susan_e', s: 'F' }, { n: 'Nancy', a: 23, s: 'F' },
      { n: 'Allen', r: 'Farmer', a: 19, s: 'M' }, { n: 'Samuel', a: 15, id: 'samuel', s: 'M' }, { n: 'Vienna', a: 13, s: 'F' } ] } ] },
  1860: { place: 'Rockcastle County, Kentucky', note: 'Elijah, at 66, with his son Samuel.', homes: [
    { head: 'Elijah Giles', where: 'Rockcastle County', members: [ { n: 'Elijah Giles', a: 66, id: 'elijah', s: 'M' }, { n: 'Samuel', a: 26, id: 'samuel', s: 'M' } ] } ] },
  1870: { place: 'Neatsville District, Adair County, Kentucky', note: 'Household 163. Five of the boys are listed \u201cworking on farm.\u201d', homes: [
    { head: 'James W. Giles', where: 'Household 163', star: true, members: [
      { n: 'James W.', r: 'Farmer', a: 46, id: 'jamesw', s: 'M' }, { n: 'Abigal', r: 'Keeping house', a: 43, id: 'abby', s: 'F' },
      { n: 'John P.', r: 'Working on farm', a: 21, id: 'john_p', s: 'M' }, { n: 'William P.', r: 'Working on farm', a: 19, id: 'preston', s: 'M' },
      { n: 'Washington', r: 'Working on farm', a: 17, id: 'jwash', s: 'M' }, { n: 'Elijah F.', r: 'Working on farm', a: 14, id: 'elijah_f', s: 'M' },
      { n: 'Benjamin F.', r: 'Working on farm', a: 10, id: 'benjamin_f', s: 'M' }, { n: 'Allice', a: 8, id: 'alice', s: 'F' },
      { n: 'Perry G.', a: 5, id: 'perry_g', s: 'M' }, { n: 'Anna', a: 3, id: 'anna', s: 'F' } ] } ] },
  1880: { place: 'Adair County, Kentucky', note: 'The family begins to branch: the old homeplace at Neatsville, and Washington\u2019s new household at Casey Creek.', homes: [
    { head: 'James W. Giles', where: 'Neatsville', star: true, members: [
      { n: 'James W.', r: 'Farmer', a: 58, id: 'jamesw', s: 'M' }, { n: 'Abby C.', r: 'Wife', a: 40, id: 'abby', s: 'F' },
      { n: 'Elijah T.', r: 'Son · house painter', a: 24, id: 'elijah_f', s: 'M' }, { n: 'Eliza', r: 'Daughter-in-law', a: 17, s: 'F' },
      { n: 'Benjamin F.', r: 'Son · house painter', a: 19, id: 'benjamin_f', s: 'M' }, { n: 'Alice', r: 'Daughter', a: 18, id: 'alice', s: 'F' },
      { n: 'Deray', r: 'Son · farming', a: 16, id: 'deray', s: 'M' }, { n: 'Annie', r: 'Daughter', a: 13, id: 'anna', s: 'F' }, { n: 'Jane', r: 'Daughter', a: 12, id: 'jane', s: 'F' } ] },
    { head: '\u201cK. W.\u201d Giles', where: 'Casey Creek', members: [
      { n: 'K. W. (Washington)', r: 'Head', a: 25, id: 'jwash', s: 'M' }, { n: 'Mary E.', r: 'Wife', a: 28, id: 'mary_s', s: 'F' },
      { n: 'Milton', r: 'Son', a: 2, id: 'milton', s: 'M' }, { n: 'Mahala J.', r: 'Daughter', a: 'infant', id: 'mahala', s: 'F' } ] } ] },
  1900: { place: 'Pellyton District, Adair County, Kentucky', note: 'Preston and Washington, side by side: their sons Luther and Frank grow up next door to each other.', homes: [
    { head: 'William P. Giles', where: 'Pellyton', star: true, members: [
      { n: 'William P.', r: 'Head · born Mar 1851', a: 49, id: 'preston', s: 'M' }, { n: 'Susan F.', r: 'Wife · born Jul 1858', a: 41, id: 'susan', s: 'F' },
      { n: 'Luther A.', r: 'Son · born Aug 1882', a: 17, id: 'luther', s: 'M' }, { n: 'Arthur O.', r: 'Son · born Jul 1884', a: 15, id: 'arthur_owen', s: 'M' },
      { n: 'Melsinia', r: 'Daughter · born Jan 1888', a: 12, id: 'melcena_blair', s: 'F' } ] },
    { head: 'James W. Giles', where: 'Pellyton — next door', members: [
      { n: 'James W.', r: 'Head · born Mar 1853', a: 47, id: 'jwash', s: 'M' }, { n: 'Mary E.', r: 'Wife', a: 51, id: 'mary_s', s: 'F' },
      { n: 'Jared L.', r: 'Son', a: 16, id: 'jared', s: 'M' }, { n: 'Thomas F.', r: 'Son', a: 9, id: 'frank', s: 'M' } ] } ] },
  1920: { place: 'Pellyton District, Adair County, Kentucky', note: 'The cousin line: Frank and Bessie with little Henry, three and a half.', homes: [
    { head: 'Thomas F. Giles', where: 'Pellyton', members: [
      { n: 'Thomas F. (Frank)', r: 'Head', a: 30, id: 'frank', s: 'M' }, { n: 'Bessie H.', r: 'Wife', a: 21, id: 'bessie', s: 'F' },
      { n: 'Henry E.', r: 'Son', a: '3\u00bd', id: 'henry', s: 'M' }, { n: 'baby daughter', r: 'Daughter', a: 1, s: 'F' } ] } ] },
  1950: { place: 'Casey Creek District (ED 1-3), Adair County, Kentucky', note: 'One enumeration district, one extended family: Blue Hollow, Ky 76 and Ky 206.', homes: [
    { head: 'Luther Giles', where: 'Blue Hollow, off Ky 76', star: true, members: [
      { n: 'Luther', r: 'Head', a: 69, id: 'luther', s: 'M' }, { n: 'Nora V.', r: 'Wife', a: 60, id: 'nora', s: 'F' },
      { n: 'Walter O.', r: 'Son', a: 30, id: 'walter', s: 'M' }, { n: 'Russell A.', r: 'Son', id: 'russell', s: 'M' }, { n: 'Elvin L.', r: 'Son', id: 'elvin', s: 'M' } ] },
    { head: 'William C. Giles', where: 'West on Ky 206 toward 76', star: true, members: [
      { n: 'William C.', r: 'Head', a: 25, id: 'william', s: 'M' }, { n: 'Bertha', r: 'Wife', id: 'bertha', s: 'F' },
      { n: 'Evelyn B.', r: 'Daughter', a: 2, id: 'evelyn', s: 'F' }, { n: 'Bernadine', r: 'Daughter', id: 'bernadean', s: 'F' } ] },
    { head: 'Leon I. Farmer', where: 'Same page as William', members: [
      { n: 'Leon I. Farmer', r: 'Head', a: 36, s: 'M' }, { n: 'Melcena E.', r: 'Wife', a: 40, id: 'melzena', s: 'F' }, { n: 'Cecil W.', r: 'Son', s: 'M' },
      { n: 'Herman W. Giles', r: 'Brother-in-law', id: 'herman', s: 'M' }, { n: 'Rena M.', r: 'Herman\u2019s wife', s: 'F' }, { n: 'David S.', r: 'Herman\u2019s baby', s: 'M' } ] },
    { head: 'Zackie Giles', where: 'Same district', members: [
      { n: 'Zackie', r: 'Head', a: 37, id: 'zackie', s: 'M' }, { n: 'Levina', r: 'Wife', s: 'F' }, { n: 'Pauline', r: 'Daughter', s: 'F' }, { n: 'Gordon', r: 'Son', s: 'M' }, { n: 'Shirley M.', r: 'Daughter', s: 'F' } ] },
    { head: 'Henry E. Giles', where: 'Dunbar Ridge Road', members: [
      { n: 'Henry E.', r: 'Head · farmer', a: 35, id: 'henry', s: 'M' }, { n: 'Janet', r: 'Wife', s: 'F' } ] },
    { head: 'Frank T. Giles', where: 'Next sheet over', members: [
      { n: 'Frank T.', r: 'Head', id: 'frank', s: 'M' }, { n: 'Bessie H.', r: 'Wife', id: 'bessie', s: 'F' }, { n: 'Robert T.', r: 'Son', id: 'robert', s: 'M' }, { n: 'Kenneth L.', r: 'Son', id: 'kenneth', s: 'M' } ] } ] },
};

window.QUIZ = [
  { q: 'Where was William Cecil Giles born?', a: ['Columbia', 'Knifley', 'Glasgow', 'Edmonton'], c: 1, why: 'His Army discharge says it plainly: born 19 April 1924, Knifley, Ky.' },
  { q: 'How did Luther and Nora get married in 1906?', a: ['In the Tabernacle church', 'At the courthouse in Columbia', 'They eloped to Tennessee', 'By a circuit preacher in Knifley'], c: 2, why: '\u201cMr. Luther Giles and Miss Tinna Allen eloped to Tennessee a few days ago, and got married.\u201d' },
  { q: 'How many children did Luther and Nora raise?', a: ['Five', 'Seven', 'Nine', 'Eleven'], c: 2, why: 'Seven sons and two daughters, all named in Luther\u2019s 1959 obituary.' },
  { q: 'What was William\u2019s job in the Army?', a: ['Cook', 'Rifleman', 'Truck driver', 'Medic'], c: 1, why: 'Military occupational specialty: Rifleman, 745 — and he qualified as a marksman with the M1 rifle.' },
  { q: 'Where did William receive his honorable discharge?', a: ['Fort Knox, Kentucky', 'Camp Atterbury, Indiana', 'William Beaumont General Hospital, El Paso', 'Walter Reed, Washington'], c: 2, why: 'Discharged 30 May 1945 at William Beaumont General Hospital in El Paso, Texas.' },
  { q: 'In 1850, who lived on either side of James and Abby?', a: ['The Allens and the Burtons', 'The Prindles and Elijah Giles', 'The Sanders and the Bottoms', 'Nobody — they were alone'], c: 1, why: 'The census-taker walked from Wm Prindle\u2019s door to James\u2019s to Elijah\u2019s.' },
  { q: 'What initials did the 1880 census-taker write for James Washington Giles?', a: ['J. W.', 'W. J.', 'K. W.', 'J. G.'], c: 2, why: '\u201cK. W. Giles,\u201d age 25, Casey Creek. Census-takers wrote names down the way they heard them.' },
  { q: 'Which Adair County Giles married the novelist Janice Holt?', a: ['Walter Giles', 'Henry Earl Giles', 'Arthur Owen Giles', 'Zackie Giles'], c: 1, why: 'Henry Earl Giles married Janice Holt on 11 October 1945.' },
  { q: 'Who kept William\u2019s 1945 Army discharge papers in the family?', a: ['His son Hershel', 'His daughter Alice', 'His brother Walter', 'The county library'], c: 1, why: 'His daughter Alice, Hershel\u2019s sister, kept the papers and gave them to her nephew Joshua.' },
  { q: 'Cecil Giles Jr. was the first Indian Creek athlete to earn a college scholarship in how many sports?', a: ['One', 'Two', 'Three', 'Four'], c: 1, why: 'Two, baseball and basketball. He went on to Auburn University.' },
  { q: 'Cecil Jr. was which of Bertha\u2019s eleven children?', a: ['First', 'Second', 'Fourth', 'Eleventh'], c: 2, why: 'His obituary: \u201c4th out of 11 children.\u201d' },
  { q: 'How old was James W. Giles when he died in 1913?', a: ['72', '80', '88', '94'], c: 2, why: 'He died on 19 June 1913, at 88.' },
  { q: 'Which census, released only in 2022, finally found Luther, Nora, William and Bertha?', a: ['1920', '1930', '1940', '1950'], c: 3, why: 'The 1950 census was sealed for 72 years.' },
  { q: 'Who rived 10,000 shingles by hand for Henry and Janice\u2019s log house?', a: ['Henry himself', 'Frank Giles, Henry\u2019s father', 'Luther Giles', 'Edgar Giles'], c: 1, why: 'Frank Giles, according to the house\u2019s National Register nomination.' },
];
