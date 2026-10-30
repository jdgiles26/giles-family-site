/* The Giles of Adair County — family data.
   Every fact here traces to the project's source files (see sources.html).
   Living people: first names + family role only. */
window.FAMILY = (function () {
  const P = [];
  const add = (o) => { P.push(Object.assign({ parents: [], spouses: [], facts: [], living: false }, o)); };

  /* ---------- Generation 1 ---------- */
  add({ id: 'elijah', name: 'Elijah Giles', short: 'Elijah', sex: 'M', gen: 1, years: 'b. c. 1794', born: 1794,
    place: 'Virginia → Casey & Rockcastle Counties, KY', spouses: ['susan_e'],
    role: 'The patriarch — the first Giles in the records',
    bio: 'Born in Virginia around 1794, Elijah came west on the great migration that filled Kentucky after statehood. By 1840 he was heading a household of nine in Casey County. In 1850 the census-taker found him in Rockcastle County, a 56-year-old labourer living right next door to his son James — and in 1860, at 66, he was still in Rockcastle with his son Samuel at his side.',
    facts: ['1840 census: head of a household of nine, Casey County', '1850 census: labourer, Rockcastle County, born Virginia', '1860 census: age 66, Rockcastle County, with son Samuel (26)'] });
  add({ id: 'susan_e', name: 'Susan Giles', short: 'Susan', sex: 'F', gen: 1, years: '', spouses: ['elijah'], married: true,
    place: 'Virginia → Rockcastle County, KY', role: 'Wife of Elijah',
    bio: 'Susan, like her husband, was born in Virginia. In 1850 she kept the Rockcastle County home where children Nancy, Allen, Samuel and Vienna still lived.',
    facts: ['1850 census: Rockcastle County, born Virginia'] });
  add({ id: 'samuel', name: 'Samuel Giles', short: 'Samuel', sex: 'M', gen: 2, parents: ['elijah', 'susan_e'], years: '',
    place: 'Rockcastle County, KY', role: 'Son of Elijah',
    bio: 'Samuel was a teenage farm hand in his father\u2019s 1850 household and was still living with Elijah in Rockcastle County in 1860.',
    facts: ['1850 census: age 15, farmer, Rockcastle', '1860 census: age 26, with father Elijah'] });

  /* ---------- Generation 2 ---------- */
  add({ id: 'jamesw', name: 'James W. Giles', short: 'James W.', sex: 'M', gen: 2, parents: ['elijah', 'susan_e'], spouses: ['abby'],
    years: '1824 – 1913', born: 1824, died: 1913, place: 'Rockcastle County → Neatsville, Adair County, KY',
    role: 'The farmer who brought the family to Adair County',
    bio: 'James W. Giles was a 26-year-old farmer in Rockcastle County in 1850, living between his father Elijah and the Prindle family. By 1870 he and Abby had moved the family west to the Neatsville district of Adair County, where a houseful of sons worked the farm beside him. He was still farming at 58 in 1880, and he died on 19 June 1913, at 88, and was buried in the Tabernacle Cemetery at Neatsville.',
    facts: ['1850: farmer, real estate worth $300, Rockcastle County', '1870: farmer, Neatsville district, Adair County — ten under one roof', '1880: farmer, age 58, Neatsville', 'Died 19 June 1913, Adair County, age 88'] });
  add({ id: 'abby', name: 'Abigail \u201cAbby\u201d C. Giles', short: 'Abby', sex: 'F', gen: 2, spouses: ['jamesw'], married: true,
    years: '', place: 'Virginia → Adair County, KY', role: 'Wife of James W. — born a Prindle',
    bio: 'Abby was born in Virginia. In 1850 she was 21, with a year-old son, John, and her Prindle kin lived on the very next farm. She raised a large family and kept house in Neatsville through 1880.',
    facts: ['1850: \u201cAbagail,\u201d age 21, born Virginia', '1870: \u201cAbigal,\u201d keeping house, Neatsville', '1880: \u201cAbby C.,\u201d wife, Neatsville'] });

  /* ---------- Generation 3 : James W. & Abby's children ---------- */
  const jwKids = [
    ['john_p', 'John P. Giles', 'John P.', 'M', 'The eldest — a baby on the 1850 census, working the farm at 21 in 1870.'],
    ['preston', null],
    ['jwash', null],
    ['elijah_f', 'Elijah F. Giles', 'Elijah F.', 'M', 'Named for his grandfather. Working the farm at 14 in 1870; a house painter, married to Eliza, still under his father\u2019s roof in 1880.'],
    ['benjamin_f', 'Benjamin F. Giles', 'Benjamin F.', 'M', 'Ten years old and working on the farm in 1870; a 19-year-old house painter in 1880.'],
    ['alice', 'Alice Giles', 'Alice', 'F', 'Eight years old in 1870; at home at 18 in 1880.'],
    ['perry_g', 'Perry G. Giles', 'Perry G.', 'M', 'Five years old in the 1870 Neatsville household.'],
    ['anna', 'Anna Giles', 'Anna', 'F', 'The baby of 1870, age 3; \u201cAnnie\u201d at 13 in 1880.'],
    ['deray', 'Deray Giles', 'Deray', 'M', 'Farming at 16 in his father\u2019s 1880 household.'],
    ['jane', 'Jane Giles', 'Jane', 'F', 'Twelve years old, at home, in 1880.'],
  ];
  jwKids.forEach(([id, name, short, sex, bio]) => {
    if (!name) return;
    add({ id, name, short, sex, gen: 3, parents: ['jamesw', 'abby'], years: '', place: 'Neatsville, Adair County, KY', role: 'Child of James W. & Abby', bio });
  });
  add({ id: 'preston', name: 'William Preston Giles', short: 'Preston', sex: 'M', gen: 3, parents: ['jamesw', 'abby'], spouses: ['susan'],
    years: 'b. 1851', born: 1851, place: 'Neatsville → Pellyton, Adair County, KY',
    role: 'Joshua\u2019s great-great-grandfather', line: true,
    bio: 'Born in March 1851, Preston — William P. on the census — was a 19-year-old working his father\u2019s farm in 1870. He married Susan around 1881 and by 1900 was heading his own home in the Pellyton district with sons Luther and Arthur Owen and daughter Melcena. His next-door neighbor was James Washington Giles, who had grown up in the same Neatsville household.',
    facts: ['Born March 1851, Kentucky', '1870: \u201cWilliam P.,\u201d working on farm, Neatsville', '1900: head of household, Pellyton district — next door to James Washington Giles', 'Father of Luther, Arthur Owen and Melcena'] });
  add({ id: 'susan', name: 'Susan F. Giles', short: 'Susan', sex: 'F', gen: 3, spouses: ['preston'], married: true,
    years: 'b. 1858', born: 1858, place: 'Pellyton, Adair County, KY', role: 'Wife of Preston — Joshua\u2019s great-great-grandmother', line: true,
    bio: 'Born in July 1858, Susan married Preston around 1881. In 1900 she reported three children born, all three living: Luther, Arthur Owen and Melcena. Luther\u2019s 1959 obituary named her proudly: \u201cson of the late Preston and Susan Giles.\u201d',
    facts: ['Born July 1858, Kentucky', '1900: three children born, three living'] });
  add({ id: 'jwash', name: 'James Washington Giles', short: 'James Washington', sex: 'M', gen: 3, parents: ['jamesw', 'abby'], spouses: ['mary_s'],
    years: '1853 – 1938', born: 1853, died: 1938, place: 'Neatsville → Casey Creek → Knifley, KY',
    role: 'Of the 1870 Neatsville household — grandfather of Henry Earl Giles',
    bio: 'Called simply \u201cWashington\u201d at 17 on the 1870 farm, he had his own home in the Casey Creek district by 1880 — where the census-taker wrote him down as \u201cK. W. Giles\u201d — with wife Mary and little Milton. In 1900 he lived next door to Preston at Pellyton. He died at Knifley on 21 July 1938.',
    facts: ['Born March 1853', '1880: head of household, Casey Creek (written \u201cK. W.\u201d)', '1900: Pellyton, next door to Preston', 'Died 21 July 1938, Knifley'] });
  add({ id: 'mary_s', name: 'Mary E. (Sanders) Giles', short: 'Mary', sex: 'F', gen: 3, spouses: ['jwash'], married: true, years: '',
    place: 'Adair County, KY', role: 'Wife of James Washington',
    bio: 'Mary E. Sanders married James Washington in the mid-1870s. In 1900 she reported four children born, all four living. Her son Frank\u2019s 1982 obituary remembered his parents as \u201cJames Washington and Mary Sanders Giles.\u201d',
    facts: ['1900: Pellyton district; four children, all living'] });

  /* ---------- Generation 4 ---------- */
  add({ id: 'luther', name: 'Luther Aaron Giles', short: 'Luther', sex: 'M', gen: 4, parents: ['preston', 'susan'], spouses: ['nora'],
    years: '1882 – 1959', born: 1882, died: 1959, place: 'Pellyton · Knifley · Neatsville, Adair County, KY',
    role: 'Joshua\u2019s great-grandfather', line: true, img: 'assets/img/archive/luther-obit-1959.jpg',
    bio: 'Born in August 1882, Luther grew up on his father Preston\u2019s farm at Pellyton. In September 1906 the Knifley news column reported that \u201cMr. Luther Giles and Miss Tinna Allen eloped to Tennessee a few days ago, and got married.\u201d Luther and Nora raised seven sons and two daughters on Adair County farmland — Blue Hollow, off Ky 76, in 1950 — and by 1959 their children were spread from Adair County to Indiana and Ohio. A retired farmer and a member of the Tabernacle Christian Church, he died at his home in the Neatsville community on 22 January 1959, and was laid to rest in the Tabernacle Cemetery.',
    facts: ['Born August 1882', 'Married Nora Allen in Tennessee, September 1906', '1950 census: farm at Blue Hollow, Ky 76, with Nora and sons Walter, Russell, Elvin', 'Died 22 January 1959 at home, Neatsville community', 'Funeral at Tabernacle Christian Church'] });
  add({ id: 'nora', name: 'Nora V. (Allen) Giles', short: 'Nora', sex: 'F', gen: 4, spouses: ['luther'], married: true,
    years: '1890 – 1975', born: 1890, died: 1975, place: 'Knifley · Neatsville, Adair County, KY',
    role: 'Joshua\u2019s great-grandmother', line: true,
    bio: 'Nora Victoria Allen was born on 23 January 1890 in Adair County, the daughter of Thomas Allen and Mary Bett White, and was known to family as \u201cTiny\u201d (the 1906 Knifley column printed it \u201cTinna\u201d). She married Luther Giles in Tennessee in September 1906, raised nine children, and was still keeping the Blue Hollow farm with Luther in 1950. A member of the Tabernacle Christian Church and a Knifley resident, she died in Louisville on 9 May 1975, at 85. She rests in the Tabernacle Cemetery.',
    facts: ['Born 23 January 1890, Adair County', 'Married Luther Giles in Tennessee, September 1906', '1950 census: \u201cNora V.,\u201d age 60, Blue Hollow', 'Died 9 May 1975, Louisville, age 85; buried Tabernacle Cemetery'] });
  add({ id: 'arthur_owen', name: 'Arthur Owen Giles', short: 'Owen', sex: 'M', gen: 4, parents: ['preston', 'susan'], years: '1884 – 1967', born: 1884, died: 1967,
    place: 'Dunnville, Casey County, KY', role: 'Luther\u2019s brother', img: 'assets/img/archive/arthur-owen-obit-1967.jpg',
    bio: 'Luther\u2019s younger brother, born July 1884. \u201cOwen\u201d made his home at Dunnville and died at 82 on 29 June 1967 — a native Adair Countian to the end. His pallbearers were a roll-call of Giles men.',
    facts: ['Born July 1884', 'Died 29 June 1967, age 82', 'Funeral at Tabernacle Christian Church'] });
  add({ id: 'melcena_blair', name: 'Melcena (Giles) Blair', short: 'Melcena', sex: 'F', gen: 4, parents: ['preston', 'susan'], years: '1888 – 1962', born: 1888, died: 1962,
    place: 'Knifley · Creston, KY', role: 'Luther\u2019s sister', img: 'assets/img/archive/melcena-blair-obit-1962.jpg',
    bio: 'Preston and Susan\u2019s daughter, born January 1888. She married Brigham Tilden Blair and raised a large family. She died at her daughter\u2019s home in Knifley on 13 December 1962, age 74, and was buried at Salem Cemetery in Casey County.',
    facts: ['Born January 1888', 'Died 13 December 1962, Knifley, age 74'] });
  add({ id: 'frank', name: 'Thomas Franklin \u201cFrank\u201d Giles', short: 'Frank', sex: 'M', gen: 4, parents: ['jwash', 'mary_s'], spouses: ['bessie'],
    years: '1889 – 1982', born: 1889, died: 1982, place: 'Pellyton, Adair County, KY', role: 'Luther\u2019s Pellyton neighbor — Henry Earl\u2019s father',
    img: 'assets/img/archive/thomas-obit-1982.jpg',
    bio: 'Born 22 November 1889, Frank grew up next door to Luther’s family at Pellyton in 1900. When his son Henry and daughter-in-law Janice Holt Giles built their log house at Spout Springs, Frank rived the roof shingles by hand: ten thousand of them, according to the house’s National Register nomination. He died 5 May 1982.',
    facts: ['Born 22 November 1889', '1920: Pellyton with Bessie and son Henry', 'Rived 10,000 shingles for Henry & Janice\u2019s log house', 'Died 5 May 1982'] });
  add({ id: 'bessie', name: 'Bessie H. (Bottoms) Giles', short: 'Bessie', sex: 'F', gen: 4, spouses: ['frank'], married: true, years: '1897 – 1982', born: 1897, died: 1982,
    place: 'Pellyton, Adair County, KY', role: 'Frank\u2019s wife — Henry\u2019s mother',
    bio: 'Bessie Hazel Bottoms married Frank Giles. During the war she wrote letters to her son\u2019s sweetheart, Janice — letters that survive in Janice Holt Giles\u2019s papers at Western Kentucky University.',
    facts: ['Born 21 September 1897', 'Letters to Janice, 1943 and 1944', 'Died September 1982'] });
  add({ id: 'milton', name: 'Milton Gaither Giles', short: 'Milton', sex: 'M', gen: 4, parents: ['jwash', 'mary_s'], years: '', place: 'Casey Creek, Adair County, KY', role: 'Frank\u2019s brother',
    bio: 'A two-year-old on the 1880 Casey Creek census — his father\u2019s first son.' });
  add({ id: 'mahala', name: 'Mahala Jane Giles', short: 'Mahala J.', sex: 'F', gen: 4, parents: ['jwash', 'mary_s'], years: '', place: 'Casey Creek, Adair County, KY', role: 'Frank\u2019s sister',
    bio: 'The newborn of the 1880 Casey Creek household.' });
  add({ id: 'jared', name: 'Jared L. Giles', short: 'Jared L.', sex: 'M', gen: 4, parents: ['jwash', 'mary_s'], years: 'b. 1883', born: 1883, place: 'Pellyton, Adair County, KY', role: 'Frank\u2019s brother',
    bio: 'Born August 1883; a 16-year-old in his father\u2019s 1900 Pellyton home.' });

  /* ---------- Generation 5 : Luther & Nora's nine ---------- */
  const lnKids = [
    ['zackie', 'Zackie Giles', 'Zackie', 'M', 'The first son named in his father\u2019s obituary. In 1950 he lived with his own family in the same Casey Creek census district as his parents and brothers.'],
    ['van', 'Van Giles', 'Van', 'M', 'Named among the seven sons in 1959, living in Adair County.'],
    ['walter', 'G. Walter Giles', 'Walter', 'M', 'Walter served in World War II — at Fort Leonard Wood, Missouri, in November 1942, and stationed in Virginia as a Pfc. in June 1945, when his sisters Flossie and Melzena travelled to see him. In 1950 he was back on the Blue Hollow farm with his parents.'],
    ['william', null],
    ['elvin', 'Elvin L. Giles', 'Elvin', 'M', 'The youngest boy on the 1950 Blue Hollow farm. By 1959 he lived in Columbus, Indiana.'],
    ['russell', 'Russell A. Giles', 'Russell', 'M', 'On the home farm in 1950; by 1959 he had gone north to Wadsworth, Ohio.'],
    ['herman', 'Herman W. Giles', 'Herman', 'M', 'In 1950 he lived with his sister Melzena\u2019s family, a few farms from William, with his wife Rena and their baby.'],
    ['flossie', 'Flossie (Giles) Burton', 'Flossie', 'F', 'Mrs. Flossie Burton. In June 1945 she and her sister set off for Virginia to visit their soldier brother Walter. By 1959 she lived in Columbus, Indiana.'],
    ['melzena', 'Melzena (Giles) Farmer', 'Melzena', 'F', 'Mrs. Leon Farmer. In 1950 her household in the Casey Creek district included her brother Herman. By 1959 the Farmers had moved to Wadsworth, Ohio. She died before her mother, Nora, in 1975.'],
  ];
  lnKids.forEach(([id, name, short, sex, bio]) => {
    if (!name) return;
    add({ id, name, short, sex, gen: 5, parents: ['luther', 'nora'], years: '', place: 'Adair County, KY', role: 'Child of Luther & Nora — Joshua\u2019s great-' + (sex === 'M' ? 'uncle' : 'aunt'), bio });
  });
  add({ id: 'william', name: 'William Cecil Giles', short: 'William Cecil', sex: 'M', gen: 5, parents: ['luther', 'nora'], spouses: ['bertha', 'dular'],
    years: '1924 – 2001', born: 1924, died: 2001, place: 'Knifley, KY · Wadsworth, OH · Edinburg, IN · Edmonton, KY',
    role: 'Joshua\u2019s grandfather — rifleman, Purple Heart', line: true, img: 'assets/img/archive/discharge-thumb.jpg',
    bio: 'Born at Knifley on 19 April 1924, William grew up on his parents’ farm and was farming himself when the war came. He was inducted into the Army in October 1943, served as a rifleman with Company E, 9th Infantry, and was badly wounded in the legs in France on 3 August 1944. Purple Heart. He married Bertha Burton in the spring of 1945 and came home to Adair County on 1 June 1945. He went where the work was: Wadsworth, Ohio in 1949 and Edinburg, Indiana by 1959. Later he retired from Cosco Industries, and in his later years lived at Edmonton, Kentucky. A Baptist, he died at Glasgow on 16 March 2001, at 77, survived by ten children, twenty grandchildren and five great-grandchildren, and rests at Heavenly Hill Cemetery in Columbia.',
    facts: ['Born 19 April 1924, Knifley, KY', 'Pvt., Co. E, 9th Infantry — Rifleman (745), Army serial 35806948', 'Wounded in action, France, 3 August 1944 — Purple Heart', 'Honorable discharge, William Beaumont General Hospital, El Paso, 30 May 1945', 'Retired from Cosco Industries; Baptist', 'Died 16 March 2001; buried Heavenly Hill Cemetery, Columbia, KY'] });

  /* ---------- Generation 5 spouses / cousin line ---------- */
  add({ id: 'bertha', name: 'Bertha (Burton) Giles', short: 'Bertha', sex: 'F', gen: 5, parents: ['john_burton'], spouses: ['william'], married: true, years: '', place: 'Purdy community · Adair County, KY · Indiana',
    role: 'William\u2019s first wife — Joshua\u2019s grandmother', line: true, img: 'assets/img/archive/acn-1945-bertha.jpg',
    bio: 'Bertha was the daughter of John R. Burton. While William was overseas she was up in Indiana — the home paper placed \u201cMiss Bertha Burton\u201d at Edinburg in December 1944. By April 1945 she was Mrs. Bertha Giles, home visiting her parents. In 1950 she was 24, keeping house off Ky 206 near Luther and Nora’s farm, with two little girls, Evelyn and Bernadean. She and William raised eleven children, most of them born after the family settled in Johnson County, Indiana. Bertha died before William, and his 2001 obituary remembers her as his first wife, Bertha Burton Giles.',
    facts: ['Daughter of Mr. & Mrs. John R. Burton', 'Edinburg, Indiana, December 1944', 'Mrs. Bertha Giles by April 1945', 'Mother of eleven'] });
  add({ id: 'john_burton', name: 'John R. Burton', short: 'John R. Burton', sex: 'M', gen: 4, years: '', place: 'Purdy community, KY',
    role: 'Bertha\u2019s father — Joshua\u2019s great-grandfather', bio: 'In April 1945 the Purdy column of the Adair County News reported that Mrs. Bertha Giles had spent a few days calling on her parents, Mr. and Mrs. John R. Burton.', facts: ['Father of Bertha (Burton) Giles'] });
  add({ id: 'dular', name: 'Dular (Judd) Giles', short: 'Dular', sex: 'F', gen: 5, spouses: ['william'], married: true, years: 'd. 2003', died: 2003, place: 'Edmonton, KY',
    role: 'William\u2019s second wife', bio: 'Dular Judd Giles was William\u2019s wife in his later years at Edmonton. She survived him and died on 18 February 2003.' });
  add({ id: 'henry', name: 'Henry Earl Giles', short: 'Henry Earl', sex: 'M', gen: 5, parents: ['frank', 'bessie'], spouses: ['janice'],
    years: '1916 – 1986', born: 1916, died: 1986, place: 'Pellyton · Giles Ridge · Spout Springs, Adair County, KY',
    role: 'Of the Pellyton Giles — husband of novelist Janice Holt Giles',
    bio: 'Born in June 1916 and raised at Pellyton, Henry met Janice Holt on a two-day bus trip in 1943, then shipped out as a U.S. Army sergeant; hundreds of their wartime letters survive. They married on 11 October 1945, moved to the Giles Ridge farm on 30 May 1949, and later built the log house at Spout Springs — the house that had to be moved in 1967 when the Green River Lake came in. Henry published a novel of his own, Harbin\u2019s Ridge (1951), and his war diary became The G.I. Journal of Sergeant Giles. He died 1 October 1986 and is buried at Caldwell Chapel, Knifley.',
    facts: ['Born June 1916, Adair County', 'Sergeant, U.S. Army, World War II', 'Married Janice Holt, 11 October 1945', 'Moved to Giles Ridge, 30 May 1949', 'Died 1 October 1986; buried Caldwell Chapel, Knifley'] });
  add({ id: 'janice', name: 'Janice Holt Giles', short: 'Janice', sex: 'F', gen: 5, spouses: ['henry'], married: true, years: '1905 – 1979', born: 1905, died: 1979,
    place: 'Arkansas → Adair County, KY', role: 'Novelist',
    bio: 'Arkansas-born Janice Holt married Henry Giles in 1945 and made his Adair County hills famous. From the farm on Giles Ridge and the log house at Spout Springs she published more than twenty books — The Enduring Hills, the Giles Ridge memoir 40 Acres and No Mule, The Kentuckians, Hannah Fowler, The Believers — and The Damned Engineers, a history of an Army engineer battalion in the Battle of the Bulge.',
    facts: ['Married Henry Earl Giles, 1945', 'Author of The Enduring Hills (1950) and 40 Acres and No Mule (1952)', 'Her papers are held at Western Kentucky University'] });
  add({ id: 'robert', name: 'Robert Giles', short: 'Robert', sex: 'M', gen: 5, parents: ['frank', 'bessie'], years: '', place: 'Campbellsville, KY', role: 'Henry\u2019s brother', bio: 'Henry\u2019s brother; at home with Frank and Bessie in 1950.' });
  add({ id: 'kenneth', name: 'Kenneth Giles', short: 'Kenneth', sex: 'M', gen: 5, parents: ['frank', 'bessie'], years: '', place: 'Adair County, KY', role: 'Henry\u2019s brother', bio: 'Henry\u2019s brother; at home with Frank and Bessie in 1950.' });
  add({ id: 'irene', name: 'Irene (Giles) Scott', short: 'Irene', sex: 'F', gen: 5, parents: ['frank', 'bessie'], years: '', place: '', role: 'Henry\u2019s sister', bio: 'Henry\u2019s sister, named among his survivors in 1986.' });
  add({ id: 'coramae', name: 'Cora Mae (Giles) Rector', short: 'Cora Mae', sex: 'F', gen: 5, parents: ['frank', 'bessie'], years: '', place: '', role: 'Henry\u2019s sister', bio: 'Henry\u2019s sister, named among his survivors in 1986.' });

  /* ---------- Generation 6 : William Cecil's children ---------- */
  const wb = ['william', 'bertha'];
  const wKids = [
    { id: 'evelyn', name: 'Bertha Evelyn (Giles) Duncan', short: 'Evelyn', sex: 'F', parents: wb, badge: 'Firstborn', years: '',
      bio: 'The eldest of William and Bertha’s children, and her mother’s namesake. She was two years old on the 1950 census. Evelyn died before her father did in 2001, and she is remembered in the obituaries of her father and of her brothers Cecil and Hershel.' },
    { id: 'bernadean', name: 'Bernadean (Giles) Myers', short: 'Bernadean', sex: 'F', parents: wb, badge: 'Second born', years: '',
      bio: 'William and Bertha\u2019s second daughter, and the baby of the household on the 1950 census (written \u201cBernadine\u201d). Hershel\u2019s older sister, named among his survivors in 2022. Bernadean has since passed away, and she is remembered here with love.' },
    { id: 'william_ray', name: 'William Ray Giles', short: 'William Ray', sex: 'M', parents: ['william'], badge: 'William\u2019s son', years: '',
      bio: 'William Cecil\u2019s son, remembered in his father\u2019s 2001 obituary among the family members who had gone before him.' },
    { id: 'cecil_jr', name: 'William Cecil \u201cCecil\u201d Giles Jr.', short: 'Cecil Jr.', sex: 'M', parents: wb, badge: 'Fourth of eleven', years: '1954 – 2019', born: 1954, died: 2019,
      birthPlace: 'Franklin, Indiana', place: 'Franklin \u00b7 Nineveh, Indiana \u00b7 Marietta, Georgia',
      bio: 'Born in Franklin, Indiana, on 16 December 1954, the fourth of William and Bertha\u2019s eleven children and his father\u2019s namesake. At Indian Creek High School (class of 1973) he starred in baseball and basketball: a pitcher and infielder on the sectional champions of 1971 and 1973, MVP and All-Conference in both sports, and the first Indian Creek athlete to earn a college scholarship in two sports. He earned a degree in education at Auburn University, taught and coached in the Cobb County schools of Marietta, Georgia, then built homes for more than thirty years as owner of Cecil Giles Custom Homes in Georgia and Indiana, retiring from Carpenters Union Local 301 in 2018. He lived in Nineveh and died on 15 August 2019, at 64, after a two-year fight with glioblastoma. His funeral was held in the Indian Creek gymnasium.',
      facts: ['Born 16 December 1954, Franklin, Indiana', 'Indian Creek High School, class of 1973: MVP and All-Conference in baseball and basketball', 'B.S. in Education, Auburn University', 'Owner, Cecil Giles Custom Homes (GA and IN), 30+ years', 'Died 15 August 2019, age 64'] },
    { id: 'hershel', name: 'Hershel Dewayne Giles', short: 'Hershel', sex: 'M', parents: wb, line: true, badge: 'Joshua & Shelby\u2019s father',
      years: '1959 – 2022', born: 1959, died: 2022, birthPlace: 'Franklin, Indiana', deathPlace: 'Martinsville, Indiana', place: 'Franklin → Nineveh → Martinsville, Indiana',
      bio: 'Hershel was born on 3 July 1959 in Franklin, Indiana, to William Cecil and Bertha (Burton) Giles. He graduated from Indian Creek High School in 1977 and studied Building Trades at Ivy Tech, then spent his working life as a self-employed framer, raising the walls of homes across Johnson, Morgan and Brown counties. He cruised in his 1972 Chevy Nova, boated and skied, hunted mushrooms, kept a vegetable garden and loved woodworking. He cheered for Dale Earnhardt Sr. and Chase Elliott on Sundays and for IU men\u2019s basketball all winter, with his German shepherd Pal at his side. He loved his family, above all his children, Shelby and Joshua, and he was always the first to help anyone in need. A longtime Nineveh resident, he died at his home in Martinsville on 14 November 2022, at 63, and rests in East Hill Cemetery, Morgantown.',
      facts: ['Born 3 July 1959, Franklin, Indiana', 'Indian Creek High School, class of 1977; Building Trades at Ivy Tech', 'Self-employed framer: homes in Johnson, Morgan and Brown counties', 'Lived in Nineveh, later Martinsville', 'Died 14 November 2022 at home in Martinsville, age 63', 'Funeral 19 November 2022, Meredith-Clark Funeral Home, Morgantown; buried East Hill Cemetery, Morgantown'] },
    { id: 'danny', name: 'Danny Douglas', short: 'Danny', sex: 'M', parents: wb, living: true, badge: 'Son', bio: 'Son of William Cecil and Bertha, and Hershel\u2019s brother.' },
    { id: 'ronald', name: 'Ronald Lee \u201cRonnie\u201d', short: 'Ronnie', sex: 'M', parents: wb, living: true, badge: 'Son', bio: 'Son of William Cecil and Bertha, and Hershel\u2019s brother.' },
    { id: 'randy', name: 'Randall Lawrence \u201cRandy\u201d', short: 'Randy', sex: 'M', parents: wb, living: true, badge: 'Son', bio: 'Son of William Cecil and Bertha, and Hershel\u2019s brother.' },
    { id: 'alice_f', name: 'Alice Faye', short: 'Alice', sex: 'F', parents: wb, living: true, badge: 'Daughter', bio: 'Daughter of William Cecil and Bertha, and Hershel\u2019s sister. Alice kept her father\u2019s 1945 Army discharge papers and gave them to her nephew Joshua. Those papers are the heart of the war chapter on this site.' },
    { id: 'donna', name: 'Donna Sue', short: 'Donna Sue', sex: 'F', parents: wb, living: true, badge: 'Daughter', bio: 'Daughter of William Cecil and Bertha, and Hershel\u2019s sister.' },
    { id: 'jeannine', name: 'Jeanine', short: 'Jeanine', sex: 'F', parents: wb, living: true, badge: 'Daughter', bio: 'Daughter of William Cecil and Bertha, and Hershel\u2019s sister.' },
    { id: 'joyce', name: 'Joyce Christine', short: 'Joyce', sex: 'F', parents: wb, living: true, badge: 'Daughter', bio: 'Daughter of William Cecil and Bertha, and Hershel\u2019s sister.' },
  ];
  wKids.forEach((k) => add(Object.assign({ gen: 6, place: k.living ? '' : 'Kentucky · Indiana', role: k.id === 'hershel' ? 'Framer and builder — father of Shelby and Joshua' : k.id === 'william_ray' ? 'Son of William Cecil' : ('Child of William Cecil & Bertha') }, k)));

  /* ---------- Generation 7 ---------- */
  add({ id: 'shelby', name: 'Shelby Nicole Giles', short: 'Shelby', sex: 'F', gen: 7, parents: ['hershel'], living: true,
    role: 'Seventh generation — Joshua\u2019s older sister',
    bio: 'Daughter of Hershel Dewayne Giles (1959–2022) and the elder of his two children — Joshua\u2019s big sister.' });
  add({ id: 'joshua', name: 'Joshua Giles', short: 'Joshua', sex: 'M', gen: 7, parents: ['hershel'], living: true, line: true,
    role: 'Seventh generation — Hershel\u2019s son',
    bio: 'Son of Hershel Dewayne Giles (1959–2022) and younger brother of Shelby. His aunt Alice gave him his grandfather William\u2019s Army discharge papers, and the family history on this site grew from them.' });

  const byId = {}; P.forEach((p) => (byId[p.id] = p));
  // children index
  P.forEach((p) => (p.children = []));
  P.forEach((p) => p.parents.forEach((pp) => byId[pp] && byId[pp].children.push(p.id)));
  // keep jwKids order for James W.
  byId.jamesw.children = ['john_p', 'preston', 'jwash', 'elijah_f', 'benjamin_f', 'alice', 'perry_g', 'anna', 'deray', 'jane'];
  byId.jwash.children = ['milton', 'mahala', 'jared', 'frank'];
  byId.luther.children = ['zackie', 'van', 'walter', 'william', 'elvin', 'russell', 'herman', 'flossie', 'melzena'];
  byId.hershel.children = ['shelby', 'joshua'];
  byId.william.children = ['evelyn', 'bernadean', 'william_ray', 'cecil_jr', 'hershel', 'danny', 'ronald', 'randy', 'alice_f', 'donna', 'jeannine', 'joyce'];
  return { people: P, byId };
})();

/* Then & Now — public history for each generation */
window.THEN_NOW = {
  1: { year: 'c. 1794', items: ['Kentucky had been a state for only two years (1792).', 'George Washington was in his second term as president.', 'Settlers poured through the Cumberland Gap on the Wilderness Road — the trail that runs through what became Rockcastle County.'] },
  2: { year: '1824', items: ['James Monroe was president; Kentucky\u2019s own Henry Clay ran for the White House that year.', 'The Marquis de Lafayette was touring the nation and reached Kentucky in 1825.', 'Adair County, created in 1801, was young farm country of family homesteads.'] },
  3: { year: '1851–1853', items: ['Stephen Foster published \u201cMy Old Kentucky Home\u201d in 1853.', 'When the brothers were boys, the Civil War split Kentucky down the middle.', 'In July 1863 Confederate raider John Hunt Morgan fought his way through Columbia, the Adair County seat.'] },
  4: { year: '1882', items: ['Chester A. Arthur was president.', 'The Kentucky Derby was seven years old.', 'Most Adair County farms were worked by hand, mule and horse.'] },
  5: { year: '1924', items: ['Calvin Coolidge was president and radio was the new marvel.', 'Just before William\u2019s first birthday, the whole nation followed the attempt to rescue caver Floyd Collins in Kentucky\u2019s Sand Cave (1925).', 'Electric lines would not reach most farms in rural Kentucky until the rural electrification push that began in 1935.'] },
  6: { year: '1945–1960s', items: ['Victory in 1945, and a baby boom.', 'Hundreds of thousands of Kentuckians went north for factory work in Indiana and Ohio.', 'The Interstate Highway Act of 1956 shortened the road between Adair County and Indiana.'] },
  7: { year: 'Today', items: ['The 1950 census — where Luther, Nora, William and Bertha all turn up — was released to the public only in April 2022.', 'Newspaper archives like the Adair County News went online page by page.', 'A 1945 Army discharge, kept in the family by William’s daughter Alice, opened the story up again.'] },
};
