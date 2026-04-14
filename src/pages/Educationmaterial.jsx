import React, { useState } from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { FiBookOpen, FiCalendar, FiPackage, FiShield, FiAlertCircle, FiDownload, FiChevronDown, FiChevronUp } from 'react-icons/fi';
import MenstrualClothimg from '../assets/images/images1/MenstrualClothimg.png';
import Reusablepadimg from '../assets/images/images1/Reusablepadimg.png';
import sanitarypadimg from '../assets/images/images1/sanitarypadimg.png';
import Tamponimg from '../assets/images/images1/Tamponimg.png';
import MenstrualCupimg from '../assets/images/images1/MenstrualCupimg.png';

const Educationmaterial = () => {
  const [expandedSection, setExpandedSection] = useState(null);

  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  const menstrualTerms = [
    'Amenorrhea: Not getting your first period by age 15, or missing periods for three months or more.',
    'Cramps: Pain in the lower stomach during periods. It can be mild or very painful.',
    'Dysmenorrhea: Painful periods. It can happen on its own or because of other conditions.',
    'Endometriosis: A condition where tissue like the lining of the uterus grows outside it.',
    'Feminine Hygiene Products: Items like pads, tampons, menstrual cups used during periods.',
    'Follicular Phase: The first half of the menstrual cycle when the egg starts developing.',
    'Free Bleeding: Choosing not to use any menstrual products.',
    'Luteal Phase: The second half of the cycle when the uterus prepares for pregnancy.',
    'Menarche: Your first period.',
    'Menopause: When you stop having periods for one full year.',
    'Menorrhagia: Very heavy or long periods.',
    'Manses: Another word for period or menstrual blood.',
    'Menstrual Cup: A reusable cup placed in the vagina to collect period blood.',
    'NSAIDs: Medicines like ibuprofen are used to reduce period pain.',
    'Ovulation: The release of an egg from the ovary.',
    'Perimenopause: The time before menopause when hormone levels start changing.',
    'Period Panties: Underwear designed to absorb period blood.',
    'Period Poverty: Not having enough money to buy menstrual products.',
    'PCOS: A hormonal problem that affects periods and fertility.',
    'PMDD: A very severe form of PMS with emotional and physical symptoms.',
    'PMS: Physical and emotional symptoms before and at the start of a period.',
    'Prostaglandins: Body chemicals that cause cramps and inflammation.',
    'Puberty: The time when the body starts developing into an adult.',
    'Spotting: Light bleeding between periods.',
    'Tampon: A product inserted into the vagina to absorb period blood.',
    'Uterus: The organ where menstrual blood forms and where pregnancy occurs.',
    'Uterine Fibroids: Non-cancerous growth in the uterus that may affect periods.'
  ];

  const products = [
    {
      name: 'Menstrual Cloth',
      image: MenstrualClothimg,
      description: 'Cloths are reusable pieces of fabric worn externally to the body, in underwear or tied to the waist to absorb menstrual flow. They are made from either newly purchased pieces of fabric (mostly cotton) or old fabric repurposed from clothing or another use. There is no guidance on how long clothes can be reused, but it is generally agreed that this should be for no longer than 1 year. They are consumable and require regular assessment of supply, availability and affordability.',
      color: 'primary'
    },
    {
      name: 'Reusable Pad',
      image: Reusablepadimg,
      description: 'Reusable pads are worn externally to the body in the underwear, to absorb menstrual flow and held in place usually by snaps. They are made from a variety of natural or synthetic materials. After use, they are washed, dried and re-used for approximately one year. They are consumables which require regular assessment of supply, availability and affordability.',
      color: 'secondary'
    },
    {
      name: 'Disposable Sanitary Pad',
      image: sanitarypadimg,
      description: 'Disposable pads are worn externally to the body in the underwear to absorb menstrual flow. They are disposed of after a maximum of 8 hours; they are therefore consumable, which requires regular assessment of supply, availability and affordability. Pads come in various sizes, absorbencies and materials and consist of a layered design made of blends of plastics, rayon and cotton. Pads should include wings to prevent leakage and keep the pad more securely in place.',
      color: 'accent'
    },
    {
      name: 'Tampon',
      image: Tamponimg,
      description: 'Tampons are absorbent materials made from cotton and/or rayon that are inserted into the vagina to absorb menstrual flow. They expand with moisture and thereby avoid leakage. They can be worn for up to 8 hours, after which they are removed using the removal string, and disposed of. They come in a variety of sizes, materials and with or without an applicator to assist insertion. Tampons are consumables which require regular assessment of supply, availability and affordability.',
      color: 'primary'
    },
    {
      name: 'Menstrual Cup',
      image: MenstrualCupimg,
      description: 'The menstrual cup is a non-absorbent bell-shaped device that is inserted into the vagina to collect menstrual flow. It creates a seal and is held in place by the walls of the vagina. It is typically made of medical-grade silicone. It collects three times more blood than pads or tampons and needs to be emptied every 6-12 hours, after which it is rinsed and re-inserted (if facilities allow). After each menstrual cycle the cup must be boiled for 5-10 minutes. Most manufacturers offer at least two sizes, and different shapes are becoming more common. Cups are reusable for 5-10 years.',
      color: 'secondary'
    }
  ];

  const mythsAndTaboos = [
    { number: 1, title: 'Menstruation is considered impure or unclean.', description: 'In many cultural settings across India, menstruation is still viewed as something dirty or impure, leading to social stigma and exclusion.' },
    { number: 2, title: 'Menstruating girls should not enter the puja room or participate in religious activities.', description: 'Many believe that women on their periods should not enter temples, offer prayers, or touch holy books due to the assumption of impurity.' },
    { number: 3, title: 'Certain foods must be avoided during menstruation.', description: 'Restrictions often prevent girls from consuming spicy or non-vegetarian food, based on the belief that such items increase body heat or intensify menstrual pain.' },
    { number: 4, title: 'Menstruating girls should not enter the kitchen.', description: 'A common belief is that girls on their periods should stay away from the kitchen, even though there is no scientific evidence suggesting they can contaminate food simply by being present.' },
    { number: 5, title: 'Food handled by menstruating girls becomes contaminated.', description: 'It is often assumed that menstruating women are unclean, and therefore the food they cook or touch may be spoiled or contaminated another belief unsupported by science.' },
    { number: 6, title: 'Menstrual blood spoils food.', description: 'A study by Kumar and Srivastava (2011) reported that many women believe the body emits a special smell or energy during menstruation that can spoil preserved foods. As a result, menstruating girls are often discouraged from touching sour items such as pickles.' },
    { number: 7, title: 'Used menstrual cloths must be buried to prevent harm.', description: 'In some cultures, women bury menstrual cloths to prevent them from being used by evil spirits. This practice stems from the belief that menstrual blood is impure or dangerous and can be used for malevolent purposes' },
    { number: 8, title: 'Menstrual blood can be used for black magic.', description: 'In Surinam, menstrual blood is believed to possess harmful power, and it is thought that someone with malicious intent can use it to injure a woman through black magic. It is also believed that a woman can use her menstrual blood to exert control over a man.' },
    { number: 9, title: 'Sour foods disrupt menstrual flow.', description: 'In several parts of India, girls are advised to avoid sour foods such as curd, tamarind, and pickles during menstruation due to the belief that these items can disturb or even stop menstrual flow. There is no scientific basis for this belief.' },
    { number: 10, title: 'Exercise worsens menstrual pain.', description: 'Many adolescent girls believe that physical activity during menstruation increases pain or discomfort. In reality, regular exercise helps reduce symptoms of premenstrual syndrome and dysmenorrhea, decreases bloating, and promotes emotional well-being by boosting serotonin levels.' },
    { number: 11, title: 'Touching a cow causes infertility.', description: 'In some communities, it is believed that if a menstruating girl touches a cow, the animal will become infertile. This harmful myth reinforces the notion that menstruation is impure and promotes stigma and shame around the female body.' },
    { number: 12, title: 'Avoiding dairy, sweets, and spicy foods during menstruation.', description: 'A study by Shanbhag et al. (2012) found that many girls avoided sweets, spicy foods, curd, and milk products during menstruation due to cultural beliefs. Such restrictions can create unnecessary physical and psychological burden, as these foods have no proven negative impact on menstrual health.' },
    { number: 13, title: 'Making girls sit separately or sleep outside during periods.', description: 'Research has shown that 8.9% of urban girls and 10.6% of rural girls were made to sit outside the house during menstruation. Girls from both groups were also asked to sleep separately from family members—practices rooted in the belief that menstruating girls are impure and must be isolated.' },
    { number: 14, title: 'Sanitary pads must be hidden while purchasing.', description: 'The expectation that sanitary pads should be wrapped discreetly or concealed in paper is a taboo, not a myth. It originates from cultural stigma that portrays menstruation as shameful and requires menstruation-related items to be hidden from public view.' },
    { number: 15, title: 'Touching plants will cause them to die', description: 'Some communities believe that menstruating girls should not touch or go near plants because the plants may wither or die. This is a superstition with no scientific basis, rooted in the broader taboo that associates menstruation with impurity.' },
    { number: 16, title: 'Skipping baths during early menstrual days.', description: 'In certain cultures, women avoid bathing—especially washing their hair—during the early days of menstruation due to beliefs that the water becomes "polluted" or that bathing can harm their health. This is a myth influenced by stigma and misinformation, as proper hygiene is beneficial during menstruation.' },
    { number: 17, title: 'Women cannot swim during their periods.', description: 'Swimming is often discouraged for menstruating girls due to limited awareness of safe menstrual hygiene practices and lingering taboo. Scientifically, there is no restriction against swimming during periods when proper menstrual products are used.' },
    { number: 18, title: 'You cannot get pregnant or contract STDs during menstruation. (Myth)', description: 'Many believe that it is completely safe to have unprotected sex during menstruation, but this is incorrect. Pregnancy is still possible, particularly for women with shorter cycles who may ovulate soon after their period. Additionally, sexually transmitted infections (STIs/STDs) can still be transmitted during menstruation. Protection, such as condoms, remains essential.' },
    { number: 19, title: 'Restrictions on cooking, entering the kitchen, touching pickles, or washing hair. (Myth)', description: 'In several communities, menstruating women are prohibited from cooking, entering the kitchen, touching pickles (due to the belief that they will spoil), having sex, eating certain foods, or washing their hair. These restrictions stem from longstanding myths and misconceptions that associate menstruation with impurity and physical limitations, rather than scientific evidence.' },
    { number: 20, title: 'Women should not talk or interact with others during menstruation. (Taboo)', description: 'In some regions, menstruating girls and women are discouraged or even forbidden from interacting or maintaining physical contact with others. This is not a myth but a deeply rooted social taboo that isolates women and reinforces stigma.' },
    { number: 21, title: 'A woman remains impure in Judaism until she takes a ritual bath. (Religious Practice)', description: 'In Judaism, after menstruation, a woman traditionally undergoes a ritual bath (mikvah) to attain ritual purity. This is a religious practice, not a myth or taboo, though it is often misinterpreted outside its religious context.' },
    { number: 22, title: 'In Islam, a menstruating woman cannot touch the Quran or enter a mosque. (Religious Practice)', description: 'Islamic teachings state that menstruation is a state of ritual impurity. Based on Quran 2:222, women are advised to refrain from sexual intercourse during menstruation and are also traditionally restricted from touching the Quran or entering the mosque. These are religious practices, not myths, though cultural taboos sometimes exaggerate or misapply them.' },
    { number: 23, title: 'A menstruating woman must avoid all sexual activity. (Religious Practice with Cultural Taboos)', description: 'Islamic law prohibits sexual intercourse during menstruation. While this is a religious instruction, certain communities extend this into broader taboos, discouraging women from any form of physical intimacy or social closeness—adding cultural layers beyond religious guidance.' },
    { number: 24, title: 'Confinement during menarche in Assamese culture. (Cultural Practice with Taboo Elements)', description: 'In some Assamese communities, at the onset of menarche, a girl is kept in a confined room for seven days and provided only milk, sprouts, and fruits. This tradition marks the transition into womanhood but also reflects cultural taboos associated with menstruation, including isolation and food restrictions.' },
    { number: 25, title: 'Hiding sanitary pads due to shame. (Taboo)', description: 'Even today, many women—particularly in rural areas—continue to use cloth for menstrual protection. In urban areas, even those who use sanitary pads often feel embarrassed while purchasing them. They frequently request that the packet be covered in a black wrapper or feel hesitant receiving it from a male shopkeeper. This reflects the deep-rooted taboo that menstruation-related products must be hidden.' },
    { number: 26, title: 'Belief that menstruating women are impure and dangerous. (Myth + Taboo)', description: 'In many places, menstruating women are labelled as impure, polluted, or toxic. They are prohibited from touching others based on the superstition that contact with them can bring harm or misfortune. This belief isolates women and reinforces social stigma.' },
    { number: 27, title: 'Chhaupadi: Forcing women into menstrual seclusion. (Harmful Cultural Practice)', description: 'In certain regions—particularly parts of Nepal—the practice of Chhaupadi forces menstruating women and girls to live in tiny huts or animal shelters made from mud or stone. These "menstruation huts," often called menstruation foxholes, are considered necessary because menstruating women are believed to bring bad luck or anger the gods if they stay inside the home. This harmful practice, rooted in the belief that menstrual blood is impure, has persisted for centuries and exposes women to extreme cold, snake bites, infections, and even death.' },
    { number: 28, title: 'Myth linking menstrual taboo to Indra\'s repentance. (Religious Myth)', description: 'A Hindu myth describes that Indra, the King of Heaven, committed the sin of killing a Brahmin and engaging in illicit acts during his quest. As part of his repentance, the burden of his sin was symbolically transferred to women in the form of menstruation. This belief has been interpreted in some communities to justify menstrual taboos and restrictions. As a result, women are subjected to severe hardships, including being forced to stay in extremely small, unsafe huts—often no more than three feet tall—that they must construct themselves.' },
    { number: 29, title: 'Restrictions on daily activities during menstruation. (Taboo)', description: 'In certain regions, menstruating women are prohibited from cooking, eating nutritious food, interacting with others, or even touching family members. These practices are upheld under the belief that such restrictions protect the household\'s "good luck." Despite these limitations, women continue to work in the fields without conversation or rest, and young girls are expected to complete their schoolwork within the confines of these tiny menstrual huts.' },
    { number: 30, title: 'Belief that a menstruating woman entering a home brings disaster. (Myth)', description: 'Some communities hold the superstition that if a menstruating woman enters a household, catastrophic events will occur. A farmer explained that three misfortunes may follow: a tiger might enter the home, the house may catch fire, or the head of the family could fall ill. Such beliefs perpetuate fear, discrimination, and deep-seated stigma against menstruating women.' },
    { number: 31, title: 'Postpartum women are also subjected to menstrual seclusion. (Harmful Cultural Practice)', description: 'In communities practicing extreme menstrual isolation—such as Chhaupadi—even women who have recently given birth are not exempt. They are forced to stay in the same unsafe huts, leaving their newborns behind. They are not permitted to cook, touch family members, or handle livestock. Family members pass food to them by sliding it across the floor to avoid physical contact. These unsafe huts expose women to severe dangers, including sexual violence during the night, harsh weather, infections, and life-threatening risks such as snakebites.' },
    { number: 32, title: 'Only women get periods." (Myth)', description: 'It is a common misconception that only women menstruate. While many women do experience periods, not all women menstruate, and not everyone who menstruates identifies as a woman. Transgender men, nonbinary individuals, and some gender-nonconforming people may also menstruate. Conversely, transgender women and some intersex individuals may not have menstrual cycles. Menstruation is a biological function, not a determinant of gender identity.' },
    { number: 33, title: 'Periods are controlled by the moon. (Myth)', description: 'Another widespread belief is that menstrual cycles are influenced by lunar cycles. This misconception likely arises from the similarity between the average menstrual cycle length (28 days) and the lunar cycle (approximately 29.5 days). There is no scientific evidence that the moon affects menstruation; the connection is primarily symbolic and rooted in traditional storytelling.' },
    { number: 34, title: 'Periods are the same for everyone. (Myth)', description: 'In reality, menstruation is a deeply individual experience. Although periods are common, they are never experienced in exactly the same way by all girls, women, or people who menstruate. Assuming that everyone has the same cycle length, the same amount of blood flow, or the same symptoms is not only inaccurate but can also reinforce harmful stereotypes. Menstrual cycles vary widely from person to person—and even for the same person from month to month. Cycle duration, blood loss, pain level, colour and consistency of menstrual fluid, and accompanying symptoms are all highly variable. Because experiences cannot be easily generalised, it is important for each individual to understand what is normal for their own body. This personal awareness helps in identifying any unusual changes or signs of ill health.' },
    { number: 35, title: 'Sharks and wild animals can smell menstrual blood and will attack you.', description: 'This is a widespread but completely false belief. Many people are told that they should not swim in the sea or go camping during their periods because sharks, bears, or other wild animals can smell menstrual blood from far away and are more likely to attack.' },
    { number: 36, title: 'Inserting tampons or menstrual cups affect virginity. (Myth)', description: 'Using tampons or menstrual cups means you won\'t be a virgin' },
    { number: 37, title: 'Myth: "Cold foods and drinks make period pain worse."', description: 'There is no scientific evidence to support the belief that eating cold foods or drinking chilled beverages worsens menstrual pain. This idea comes from traditional practices and cultural beliefs rather than medical research.' },
    { number: 38, title: 'Dough won\'t rise. (Myth)', description: 'Yes, the belief that "dough won\'t rise if a girl is menstruating" is a myth and a cultural taboo, not a scientific fact. There is no biological or chemical basis to support the idea that a menstruating person can affect how dough rises. Dough rising is a result of yeast fermentation, which depends on ingredients, temperature, and time not the physical condition of the person making it.' },
    { number: 39, title: 'Myth: When you get your first period you need to wash your face with the first menstrual blood to have clear skin.', description: 'This is a myth and part of menstrual taboos, not a scientifically supported practice.' },
    { number: 40, title: 'If you take a bath during your period, your bleeding will stop, and stopping bleeding is bad for your health. (Myth)', description: 'In reality, taking a bath during your period is completely healthy, hygienic, and safe. Bathing does not stop your menstrual flow in a harmful way. This belief is a myth, not a scientific fact. Warm water can actually help relax your muscles and may reduce cramps, making you feel more comfortable during your period.' },
    { number: 41, title: 'You can\'t walk barefoot you might get cramps.', description: 'Walking barefoot during your period does not cause cramps. This belief is simply a myth, like many others that unnecessarily restrict girls and women during menstruation. Cramps are caused by natural uterine contractions, not by whether someone is barefoot.' },
    { number: 42, title: 'Don\'t paint your nails during your period.', description: 'The idea that "you shouldn\'t paint your nails during your period" is simply a myth and part of broader menstrual taboos not backed by science at all. Menstruation has no effect on nail polish, and nail polish has no effect on the menstrual cycle.' },
    { number: 43, title: 'You can only enter a place of prayer once you\'ve washed your hair on or after the fourth day of your period.', description: 'The idea that "you can only enter a place of prayer once you\'ve washed your hair on or after the fourth day of your period" is a cultural or religious taboo, not a biological or scientific rule. Menstruation does not make anyone impure or unfit to enter sacred spaces.' },
    { number: 44, title: 'You can\'t touch flowers because they\'ll die quicker. (Myth)', description: 'There is no scientific evidence that touching flowers during menstruation makes them wilt faster. This belief is a cultural myth with no biological basis.' },
    { number: 45, title: 'Having sex during your period can kill your partner. (Myth)', description: 'This is an extreme myth with absolutely no scientific support. Menstruation cannot harm or endanger another person. Sexual activity during periods is a personal choice and poses no life-threatening risk to anyone.' },
    { number: 46, title: 'Don\'t cut your hair during menstruation.', description: 'This belief is rooted in cultural taboos, not science. Menstruation has no effect on hair growth, hair health, or the outcome of a haircut.' },
    { number: 47, title: 'If you shower with hot water while on your period, you will have a heavy flow.', description: 'Hot water does not increase menstrual bleeding. Showering with warm or hot water is safe, can relax muscles, and may even reduce cramps.' },
    { number: 48, title: 'If you miss your period, you are definitely pregnant.', description: 'Missing a period does not always mean pregnancy. Stress, hormonal changes, illness, weight fluctuations, and other health factors can also cause delayed or missed periods.' },
    { number: 49, title: 'Premenstrual Syndrome (PMS) is all in the mind.', description: 'PMS is not imaginary. It is a real medical condition caused by hormonal changes before menstruation. Symptoms can include mood shifts, cramps, fatigue, headaches, and bloating, and these experiences are valid.' },
    { number: 50, title: 'Myth: A perfect menstrual cycle is always 28 days.', description: 'There is no such thing as a "perfect" menstrual cycle. A cycle does not need to be exactly 28 days to be healthy. In fact, anything between 21 to 35 days is considered completely normal. Every individual\'s body is different, and cycle length can vary for many reasons, such as overall health, stress levels, diet, physical activity, sleep patterns, and hormonal fluctuations.' },
    { number: 51, title: 'Myth: Drops of menstrual blood can kill plants and animals.', description: 'The idea that menstrual blood falling on the ground or into a river can kill living beings is a myth. Menstrual fluid is simply a mixture of blood, tissue, and mucus it is not harmful to plants, animals, or the environment' },
    { number: 52, title: 'Myth: Wells will run dry if a menstruating woman draws water.', description: 'This belief is an old taboo with no scientific support. Menstruation cannot affect water sources. Wells do not dry up because of who draws water from them.' },
    { number: 53, title: 'Myth: Men can become ill if touched by a menstruating woman or by objects she has used.', description: 'This is a deeply rooted cultural myth. Menstruation is a natural bodily process and cannot make anyone sick through touch, contact, or shared objects.' },
    { number: 54, title: 'Myth: Menstruating women should not participate in religious activities.', description: 'This prohibition exists in many cultures and religions, but it is based on taboo, not biology. Menstruation does not make a person impure or spiritually unfit to pray, worship, or enter sacred spaces.' },
    { number: 55, title: 'Myth: Women should not observe fasts during periods.', description: 'Many menstruating women are told not to fast during certain festivals. This restriction comes from traditional customs, not from medical or scientific reasons. Whether or not to fast during menstruation should be a personal choice, based on comfort and health — not on taboo.' },
    { number: 56, title: 'Myth: Women should not touch family members, especially elders, during menstruation.', description: 'In many cultures, menstruating women are discouraged from touching family members because their touch is believed to bring bad luck or impurity. This belief has no scientific basis. Menstruation does not make a person impure, and it cannot affect someone else\'s wellbeing through touch.' },
    { number: 57, title: 'Myth: Clothes used during menstruation must be washed separately and dried in hidden places.', description: 'Some communities insist that menstrual clothes should be washed separately and dried secretly to avoid "public view." This practice is rooted in shame and taboo, not hygiene. Menstrual clothes can be safely washed and dried like any other clothing — in clean, open, and sunlit spaces.' },
    { number: 58, title: 'Myth: Women should not bathe during menstruation, especially on the first or last day, because it may cause infertility or weakness.', description: 'The belief that bathing during menstruation harms the body or affects fertility is a myth. Bathing is completely safe, hygienic, and even helpful, as warm water relaxes muscles and can reduce cramps. Lack of bathing can actually increase discomfort and the risk of infection.' },
    { number: 59, title: 'Myth: Women should not discuss their periods with male family members.', description: 'In many households, girls and women are taught not to talk about their periods in front of male family members. This silence creates secrecy, shame, and a lack of awareness. Menstruation is a natural biological process, and open communication helps build understanding and support within families.' },
    { number: 60, title: 'Myth: Women should not plant seeds or garden during menstruation.', description: 'Some people believe that the touch of a menstruating woman can prevent seeds from sprouting or harm growing plants. This is a cultural myth. Menstrual blood and menstruation have no effect on plant growth, seed germination, or farming activities.' },
    { number: 61, title: 'Myth: Performing religious activities during menstruation angers the deities.', description: 'This taboo claims that menstruating women should not pray, perform rituals, or visit temples because it offends the gods. There is no scientific or spiritual basis for this belief. Menstruation does not make anyone spiritually impure or unacceptable to deities.' },
    { number: 62, title: 'Myth: Lighting a lamp or diya during menstruation is inauspicious.', description: 'In some traditions, women are discouraged from lighting a lamp or diya during their periods, believing it brings bad luck. This is purely a cultural superstition. Lighting a lamp has no connection to menstrual physiology and does not become inauspicious because of someone\'s menstrual status.' },
    { number: 63, title: 'Myth: Women cannot chant or recite holy verses during their period.', description: 'This belief is a cultural and religious taboo. Menstruation does not make a person spiritually impure, and there is no scientific or scriptural rule that prevents women from chanting, praying, or reciting holy texts during their cycle.' },
    { number: 64, title: 'Myth: Attending funerals while menstruating brings misfortune.', description: 'The idea that a menstruating woman brings misfortune at funerals is a myth rooted in superstition. This belief has no factual, scientific, or spiritual basis. Menstruation does not influence events or outcomes in any ritual or ceremony.' },
    { number: 65, title: 'Myth: Menstruating women must not touch food meant for others.', description: 'Many cultures believe that a woman\'s touch during her period can spoil food. This is a myth. Menstruation has no effect on food safety, hygiene, or taste. A menstruating woman can cook, serve, and handle food like any other day.' },
    { number: 66, title: 'Myth: Women should not visit a newborn or attend baby showers during menstruation.', description: 'This taboo is based on cultural and religious superstitions, not medical science. Menstruation does not affect a newborn\'s health, nor does it bring bad luck. Visiting a newborn or attending celebrations is entirely safe.' },
    { number: 67, title: 'Myth: Menstruating women are forbidden from participating in weddings or engagements.', description: 'Some traditions restrict women from attending auspicious events during their period. This belief is a social taboo. Menstruation does not affect the success or purity of ceremonies and should not exclude women from important family occasions.' },
    { number: 68, title: 'Myth: Women cannot sit on beds or sofas; they must sit on the floor.', description: 'This myth stems from the idea that menstruating women are impure. Scientifically, there is no reason for such a restriction. Women can sit, rest, and sleep wherever they feel comfortable.' },
    { number: 69, title: 'Myth: Menstruating women should avoid communal meals or social gatherings.', description: 'The belief that a menstruating woman should isolate herself or avoid eating with others is a harmful taboo. Menstruation does not affect social interactions or food in any way.' },
    { number: 70, title: 'Myth: Women should not wear new clothes during their period.', description: 'This superstition links menstruation to impurity and bad luck. There is no biological or cultural necessity to avoid wearing new clothes during menstruation.' },
    { number: 71, title: 'Myth: Drinking cold water during periods can "freeze" menstrual blood.', description: 'This belief has no scientific basis. Menstrual blood cannot freeze inside the body. Cold water has no effect on menstrual flow or cramps.' },
    { number: 72, title: 'Myth: Women must avoid milk products like yogurt or paneer.', description: 'Avoiding dairy during menstruation is a cultural belief, not a scientific one. Milk products do not harm menstrual health unless someone has lactose intolerance or other dietary restrictions.' },
    { number: 73, title: 'Myth: Eating fish, meat, or eggs during menstruation is unclean.', description: 'Protein-rich foods like fish, meat, and eggs are actually beneficial. The idea that they become "unclean" during periods is a superstition, not a nutritional guideline.' },
    { number: 74, title: 'Myth: Drinking tea or coffee negatively affects menstrual flow.', description: 'Tea or coffee does not harm menstrual flow. While caffeine may increase anxiety or breast tenderness in some people, it does not affect bleeding in any dangerous way.' },
    { number: 75, title: 'Myth: Seeds, nuts, or jaggery increase menstrual pain.', description: 'There is no scientific evidence linking these foods to increased pain. In fact, seeds and nuts contain healthy fats, and jaggery provides iron all beneficial during menstruation.' },
    { number: 76, title: 'Myth: Eating bananas can stop or disrupt menstruation.', description: 'Bananas do not interfere with periods. They are rich in potassium and can actually help reduce bloating and muscle cramps.' },
    { number: 77, title: 'Myth: Eating raw vegetables is harmful during menstruation.', description: 'Raw vegetables are safe and nutritious. This myth comes from the idea that cold or uncooked foods might affect the body, but there is no scientific basis for this claim.' },
    { number: 78, title: 'Myth: Drinking coconut water can prolong periods.', description: 'Coconut water does not influence menstrual duration. It is a hydrating beverage and has no effect on the reproductive hormones that regulate menstruation.' },
    { number: 79, title: 'Myth: Dancing or jumping during menstruation causes reproductive issues.', description: 'Movement does not harm the reproductive system. Dancing, exercising, or jumping is safe and can even reduce cramps and improve mood.' },
    { number: 80, title: 'Myth: Running or lifting weights can cause heavy bleeding.', description: 'Physical activity does not cause abnormal bleeding. Exercise helps regulate hormones, improve mood, and reduce pain. Heavy bleeding is never caused by running or lifting weights.' },
    { number: 81, title: 'Myth: Women should not enter forests or farms during menstruation.', description: 'This taboo is based on fear and superstition, not science. Menstruation has no impact on nature, farming, or forest ecosystems.' },
    { number: 82, title: 'Myth: Avoid sitting on high surfaces; menstrual blood can "fall" on others.', description: 'The idea that menstrual blood can fall through the body onto others is unrealistic and unscientific. Sitting on high places or climbing stairs during menstruation is safe and poses no risk to anyone.' },
    { number: 83, title: 'Myth: Women must avoid climbing stairs during menstruation.', description: 'Some believe that climbing stairs during periods can harm the body or worsen bleeding. This is a myth. There is no scientific or medical reason to avoid stairs during menstruation. Normal movement, including climbing, is completely safe.' },
    { number: 84, title: 'Myth: Long-distance travel during menstruation brings bad luck.', description: 'The belief that travelling far during periods attracts misfortune is a superstition, not a fact. Menstruation has no connection with luck, success, or safety during travel.' },
    { number: 85, title: 'Myth: Women must not comb their hair during menstruation.', description: 'This taboo suggests that combing hair during periods weakens the body or brings bad luck. There is no scientific evidence to support this idea. Grooming habits like combing or washing hair are safe and normal during menstruation.' },
    { number: 86, title: 'Myth: Irregular periods mean infertility.', description: 'The idea that irregular periods automatically indicate infertility is incorrect. While irregular periods can sometimes signal an underlying health concern, they do not mean a person is infertile.' },
    { number: 87, title: 'Menstrual pain is normal and never requires medical attention.', description: 'A myth and a harmful belief. Mild discomfort is common, but severe pain may indicate conditions like endometriosis and requires medical evaluation.' },
    { number: 88, title: 'Heavy bleeding cleans the body better.', description: 'A myth reflecting poor understanding of menstruation. Heavy bleeding may signal a health issue such as anemia, fibroids, or hormonal imbalance.' },
    { number: 89, title: 'Periods stop due to extreme happiness or sorrow.', description: 'A myth. Emotions may affect hormones but cannot instantly stop menstruation.' },
    { number: 90, title: 'Women are unproductive and moody during periods.', description: 'A myth rooted in stereotypes. Hormonal fluctuations may affect some women\'s moods, but experiences vary significantly. Most women remain fully productive; discomfort, not menstruation itself, influences performance.' },
    { number: 91, title: 'Only expensive menstrual products work well.', description: 'A myth—many affordable options are safe and effective.' },
    { number: 92, title: 'Free pads are low quality and unsafe.', description: 'A misconception. Government-distributed pads are regulated and generally safe to use.' },
    { number: 93, title: 'Menstrual blood reflects a woman\'s character.', description: 'A baseless and harmful taboo.' },
    { number: 94, title: 'Menstruating women are mentally unstable or overly emotional.', description: 'A myth and taboo rooted in gender stereotypes.' },
    { number: 95, title: 'Girls who start menstruating early are immoral or "fast."', description: 'A harmful myth. Menarche depends on biology, not character.' },
    { number: 96, title: 'Menstruation is a women-only issue.', description: 'A taboo. Including men and boys in discussions reduces stigma and increases support.' },
    { number: 97, title: 'Menstruation means a girl is ready for marriage or sex.', description: 'A myth. Menarche is a biological milestone, not emotional or physical readiness.' },
    { number: 98, title: 'Taking medicines during periods is harmful.', description: 'A misconception. Safe pain relievers (e.g., ibuprofen) can be taken when needed.' },
    { number: 99, title: 'Menstruation is a curse or punishment.', description: 'A myth dating back to religious and cultural interpretations, such as biblical references that framed menstruation as a punishment.' },
    { number: 100, title: 'Myth: Menstruating women should avoid crossing a man\'s shadow.', description: 'This belief, found in some regions such as parts of Chhattisgarh, is based on the idea that a menstruating woman\'s presence or even her shadow can bring misfortune or weaken a man\'s strength. It reflects cultural stigma and discriminatory attitudes rather than any scientific or logical understanding.' }
  ];

  const resources = [
    {
      icon: FiBookOpen,
      title: 'Guide to Menstrual Health',
      subtitle: '"Understanding Menstruation: Simple Meanings of Common Symptoms, Medical Tests, Treatments, and Other Important Terms"',
      description: 'Menstruation is about all healthy preteen to midlife women experiences nearly every month from menarche to menopause that women face. But even though one is intimately familiar with one\'s own period or menstruation or menstrual cycle yet its stigmatized. You may not know the language used to describe its process, products, and problems hence, this glossary of menstrual terms will helpful.',
      content: menstrualTerms,
      color: 'primary'
    },
    {
      icon: FiCalendar,
      title: 'Period Tracker',
      subtitle: 'What is Period Tracker?',
      description: 'Period tracking applications (apps) allow women to track their menstrual cycles and receive a prediction for their period dates. Most apps also provide predictions of ovulation day and the fertile window. Research indicates apps are basing predictions on assuming women undergo a textbook 28-day cycle with ovulation occurring on day 14 and a fertile window between days 10 and 16.',
      link: `${window.location.origin}/Periodtracker`,
      color: 'secondary'
    },
    {
      icon: FiPackage,
      title: 'Menstrual Health & Hygiene Products',
      subtitle: 'Understanding Different Menstrual Products',
      description: 'Learn about various menstrual hygiene products available and their proper usage.',
      products: products,
      color: 'accent'
    },
    {
      icon: FiShield,
      title: 'Government Initiatives',
      subtitle: 'National Menstrual Hygiene Policy',
      description: 'According to the Ministry of Health & Family Welfare, the draft Menstrual Hygiene Policy (MHP) has been formulated through extensive stakeholder consultations. The policy adopts a comprehensive, lifecycle approach that addresses menstrual health needs from menarche to menopause, with special emphasis on underserved and vulnerable populations.',
      color: 'primary'
    },
    {
      icon: FiAlertCircle,
      title: 'Myths & Taboos',
      subtitle: 'MYTHS & TABOOS THAT SURROUND MENSTRUATION IN INDIA',
      description: 'A "myth" is a traditional story that explains natural or social phenomena, often involving supernatural beings, while a "taboo" is a strict prohibition or restriction placed on certain behaviors, practices, or discussions within a culture, usually stemming from cultural beliefs and considered unacceptable to engage in; essentially, myths are stories that explain things, while taboos are rules about what not to do.',
      myths: mythsAndTaboos,
      color: 'secondary'
    },
  ];

  const stats = [
    { number: '15+', label: 'Resource Types' },
    { number: '50K+', label: 'Downloads' },
    { number: '5', label: 'Languages' },
    { number: '100%', label: 'Free Access' },
  ];

  return (
    <PageWrapper>
      {/* Background Decoration */}
      <div className="bg-decoration">
        <div className="deco-circle circle-1"></div>
        <div className="deco-circle circle-2"></div>
      </div>

      {/* Hero Section */}
      <HeroSection>
        <span className="section-eyebrow">Resources</span>
        <h1 className="hero-title">
          Educational <span className="title-accent">Resources</span>
        </h1>
        <p className="hero-description">
          Comprehensive educational materials designed to promote menstrual health awareness, 
          break the silence around menstruation, and provide accurate information about 
          menstrual health and hygiene products.
        </p>
      </HeroSection>

      {/* Resources Section */}
      <ResourcesSection>
        {resources.map((resource, index) => (
          <ResourceSection key={index} className={`color-${resource.color}`}>
            <div className="section-header" onClick={() => toggleSection(index)}>
              <div className="header-content">
                <div className={`icon-wrapper color-${resource.color}`}>
                  <resource.icon />
                </div>
                <div className="title-group">
                  <h3>{resource.title}</h3>
                  {resource.subtitle && <p className="subtitle">{resource.subtitle}</p>}
                </div>
              </div>
              <button className="expand-btn">
                {expandedSection === index ? <FiChevronUp /> : <FiChevronDown />}
              </button>
            </div>
            
            <div className={`section-content ${expandedSection === index ? 'expanded' : ''}`}>
              <p className="description">{resource.description}</p>
              
              {resource.content && (
                <div className="terms-list">
                  <h4>Glossary of Terms:</h4>
                  <ul>
                    {resource.content.map((term, i) => (
                      <li key={i}>{term}</li>
                    ))}
                  </ul>
                </div>
              )}
              
              {resource.link && (
                <div className="link-section">
                  <p>Reference: <Link to="/Periodtracker">{resource.link}</Link></p>
                  <p>Put a Period calendar and you must make period tracker calculator. As per reference you can watch this link or there are many periods tracker website and application.</p>
                </div>
              )}
              
              {resource.products && (
                <div className="products-grid">
                  {resource.products.map((product, i) => (
                    <ProductCard key={i} className={`color-${product.color}`}>
                      <div className="product-image">
                        <img src={product.image} alt={product.name} />
                      </div>
                      <h4>{product.name}</h4>
                      <p>{product.description}</p>
                    </ProductCard>
                  ))}
                </div>
              )}
              
              {resource.myths && (
                <div className="myths-list">
                  {resource.myths.map((myth, i) => (
                    <MythItem key={i}>
                      <div className="myth-number">{myth.number}</div>
                      <div className="myth-content">
                        <h4>{myth.title}</h4>
                        <p>{myth.description}</p>
                      </div>
                    </MythItem>
                  ))}
                </div>
              )}
              
              {index === 3 && (
                <div className="government-initiatives">
                  <h4>Key Interventions by Ministry of Health & Family Welfare</h4>
                  <p>Scheme for Promotion of Menstrual Hygiene (2011–present): Enhances awareness among adolescent girls; improves access to high-quality sanitary napkins; ensures environmentally safe disposal. Teachers, ANMs, ASHAs and AWWs are oriented under Rashtriya Kishor Swasthya Karyakram (RKSK).</p>
                  <p>Beti Bachao Beti Padhao (Mission Shakti): Includes menstrual hygiene awareness and promotion of sanitary napkin use.</p>
                  <p>Department of Health Research: Conducts studies on new and sustainable menstrual hygiene methods, assessing safety, affordability, acceptability, and feasibility.</p>
                  <p>National Health Mission (NHM): Supports the Menstrual Hygiene Scheme via State PIPs since 2015–16. States procure sanitary napkin packs through competitive bidding. In 2021–22, approx. 34.92 lakh adolescent girls received sanitary napkin packs monthly (HMIS). NHM also undertakes capacity-building of health functionaries and supports communication campaigns. ASHAs conduct monthly meetings on menstrual hygiene and provide subsidised napkin packs.</p>
                  
                  <h4>Initiatives of Other Ministries and Departments</h4>
                  <p>Ministry of Drinking Water & Sanitation: Under Swachh Bharat Abhiyan, developed National Guidelines on Menstrual Hygiene Management (MHM) to strengthen awareness and behaviour change in rural areas.</p>
                  <p>Ministry of Education (Department of School Education & Literacy): Through Samagra Shiksha, supports State projects on menstrual hygiene, including installation of sanitary napkin vending machines and incinerators in schools.</p>
                  <p>Ministry of Women & Child Development: Implements the Scheme for Adolescent Girls (SAG) to improve health and nutritional status of adolescent girls and encourage their participation in formal schooling, including menstrual hygiene awareness.</p>
                  <p>Ministry of Chemicals & Fertilizers: Through Pradhan Mantri Bharatiya Janaushadhi Pariyojana (PMBJP), ensures access to affordable menstrual hygiene products. Over 9000 Janaushadhi Kendras supply oxo-biodegradable napkins 'Suvidha' at ₹1 per pad.</p>
                </div>
              )}
            </div>
          </ResourceSection>
        ))}
      </ResourcesSection>

      {/* Quote Section */}
      <QuoteSection>
        <div className="quote-content">
          <div className="quote-icon">"</div>
          <blockquote>
          Our core objective is rooted in innovation, inclusion, and sustainability. By 
            integrating technology, community participation, and behavioral change 
            communication, we aim to create lasting change in how menstrual health 
            is perceived and managed.
          </blockquote>
        </div>
      </QuoteSection>
    </PageWrapper>
  );
};

const PageWrapper = styled.div`
  position: relative;
  padding: var(--space-8) var(--space-6) var(--space-16);
  overflow: hidden;
  min-height: 100vh;
  max-width: 1200px;
  margin: 0 auto;

  .bg-decoration {
    position: absolute;
    inset: 0;
    pointer-events: none;
    z-index: -1;
  }

  .deco-circle {
    position: absolute;
    border-radius: 50%;
  }

  .circle-1 {
    width: 500px;
    height: 500px;
    top: -150px;
    right: -200px;
    background: radial-gradient(circle, rgba(217, 118, 82, 0.08) 0%, transparent 70%);
  }

  .circle-2 {
    width: 400px;
    height: 400px;
    bottom: 20%;
    left: -150px;
    background: radial-gradient(circle, rgba(90, 148, 112, 0.06) 0%, transparent 70%);
  }

  @media (max-width: 768px) {
    padding: var(--space-6) var(--space-4) var(--space-12);
  }
`;

const HeroSection = styled.section`
  text-align: center;
  margin-bottom: var(--space-8);

  .section-eyebrow {
    display: inline-block;
    padding: var(--space-2) var(--space-5);
    background: var(--color-primary-50);
    color: var(--color-primary-700);
    font-size: var(--text-xs);
    font-weight: 600;
    text-transform: uppercase;
    letter-spacing: 0.1em;
    border-radius: var(--radius-full);
    margin-bottom: var(--space-5);
    border: 1px solid var(--color-primary-100);
  }

  .hero-title {
    font-family: var(--font-heading);
    font-size: var(--text-5xl);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-5);
    line-height: 1.1;
  }

  .title-accent {
    background: var(--gradient-primary);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
    background-clip: text;
  }

  .hero-description {
    font-size: var(--text-lg);
    color: var(--color-dark-500);
    line-height: 1.8;
    max-width: 600px;
    margin: 0 auto;
  }

  @media (max-width: 768px) {
    .hero-title {
      font-size: var(--text-4xl);
    }
  }
`;

const ResourcesSection = styled.section`
  display: flex;
  flex-direction: column;
  gap: var(--space-6);
  margin-bottom: var(--space-12);
`;

const ResourceSection = styled.div`
  background: white;
  border-radius: var(--radius-2xl);
  overflow: hidden;
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &.color-primary {
    border-left: 4px solid var(--color-primary-500);
  }

  &.color-secondary {
    border-left: 4px solid var(--color-secondary-500);
  }

  &.color-accent {
    border-left: 4px solid var(--color-accent-500);
  }

  .section-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: var(--space-6);
    cursor: pointer;
    transition: all var(--transition-base);

    &:hover {
      background: var(--color-dark-50);
    }

    .header-content {
      display: flex;
      align-items: center;
      gap: var(--space-4);
      flex: 1;
    }

    .icon-wrapper {
      width: 56px;
      height: 56px;
      border-radius: var(--radius-xl);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 1.5rem;
      flex-shrink: 0;

      &.color-primary {
        background: var(--color-primary-100);
        color: var(--color-primary-600);
      }

      &.color-secondary {
        background: var(--color-secondary-100);
        color: var(--color-secondary-600);
      }

      &.color-accent {
        background: var(--color-accent-100);
        color: var(--color-accent-700);
      }
    }

    .title-group {
      flex: 1;

      h3 {
        font-family: var(--font-heading);
        font-size: var(--text-xl);
        font-weight: 600;
        color: var(--color-dark-900);
        margin-bottom: var(--space-1);
      }

      .subtitle {
        font-size: var(--text-sm);
        color: var(--color-dark-600);
        font-weight: 500;
      }
    }

    .expand-btn {
      background: transparent;
      border: none;
      font-size: 1.5rem;
      color: var(--color-dark-400);
      cursor: pointer;
      padding: var(--space-2);
      display: flex;
      align-items: center;
      justify-content: center;
      transition: all var(--transition-base);

      &:hover {
        color: var(--color-primary-600);
      }
    }
  }

  .section-content {
    max-height: 0;
    overflow: hidden;
    transition: max-height var(--transition-slow), padding var(--transition-slow);

    &.expanded {
      max-height: 50000px;
      padding: 0 var(--space-6) var(--space-6);
    }

    .description {
      font-size: var(--text-base);
      color: var(--color-dark-600);
      line-height: 1.8;
      margin-bottom: var(--space-4);
    }

    .terms-list {
      margin-top: var(--space-4);

      h4 {
        font-family: var(--font-heading);
        font-size: var(--text-lg);
        font-weight: 600;
        color: var(--color-dark-900);
        margin-bottom: var(--space-3);
      }

      ul {
        list-style: none;
        padding: 0;
        display: grid;
        grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
        gap: var(--space-2);

        li {
          font-size: var(--text-sm);
          color: var(--color-dark-600);
          line-height: 1.6;
          padding-left: var(--space-4);
          position: relative;

          &::before {
            content: '•';
            position: absolute;
            left: 0;
            color: var(--color-primary-500);
            font-weight: bold;
          }
        }
      }
    }

    .link-section {
      margin-top: var(--space-4);
      padding: var(--space-4);
      background: var(--color-primary-50);
      border-radius: var(--radius-xl);
      border-left: 3px solid var(--color-primary-500);

      p {
        font-size: var(--text-sm);
        color: var(--color-dark-700);
        line-height: 1.7;
        margin-bottom: var(--space-2);

        a {
          color: var(--color-primary-600);
          text-decoration: underline;
          font-weight: 600;
        }
      }
    }

    .products-grid {
      display: grid;
      grid-template-columns: repeat(auto-fit, minmax(280px, 1fr));
      gap: var(--space-4);
      margin-top: var(--space-4);
    }

    .myths-list {
      margin-top: var(--space-4);
      display: flex;
      flex-direction: column;
      gap: var(--space-3);
    }

    .government-initiatives {
      margin-top: var(--space-4);

      h4 {
        font-family: var(--font-heading);
        font-size: var(--text-lg);
        font-weight: 600;
        color: var(--color-dark-900);
        margin-bottom: var(--space-3);
        margin-top: var(--space-4);
      }

      p {
        font-size: var(--text-sm);
        color: var(--color-dark-600);
        line-height: 1.8;
        margin-bottom: var(--space-3);
      }
    }
  }
`;

const MythItem = styled.div`
  display: flex;
  gap: var(--space-4);
  padding: var(--space-4);
  background: var(--color-secondary-50);
  border-radius: var(--radius-lg);
  border-left: 3px solid var(--color-secondary-500);
  transition: all var(--transition-base);

  &:hover {
    background: var(--color-secondary-100);
    transform: translateX(2px);
  }

  .myth-number {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 700;
    color: var(--color-secondary-600);
    min-width: 40px;
    height: 40px;
    display: flex;
    align-items: center;
    justify-content: center;
    background: white;
    border-radius: var(--radius-lg);
    flex-shrink: 0;
  }

  .myth-content {
    flex: 1;

    h4 {
      font-family: var(--font-heading);
      font-size: var(--text-base);
      font-weight: 600;
      color: var(--color-dark-900);
      margin-bottom: var(--space-2);
      line-height: 1.4;
    }

    p {
      font-size: var(--text-sm);
      color: var(--color-dark-600);
      line-height: 1.7;
      margin: 0;
    }
  }
`;

const ProductCard = styled.div`
  background: white;
  border-radius: var(--radius-xl);
  padding: var(--space-4);
  box-shadow: var(--shadow-soft);
  border: 1px solid var(--color-dark-100);
  transition: all var(--transition-base);

  &:hover {
    transform: translateY(-2px);
    box-shadow: var(--shadow-soft-lg);
  }

  &.color-primary {
    border-top: 3px solid var(--color-primary-500);
  }

  &.color-secondary {
    border-top: 3px solid var(--color-secondary-500);
  }

  &.color-accent {
    border-top: 3px solid var(--color-accent-500);
  }

  .product-image {
    width: 100%;
    height: 200px;
    margin-bottom: var(--space-3);
    border-radius: var(--radius-lg);
    overflow: hidden;
    background: var(--color-dark-50);

    img {
      width: 100%;
      height: 100%;
      object-fit: contain;
    }
  }

  h4 {
    font-family: var(--font-heading);
    font-size: var(--text-lg);
    font-weight: 600;
    color: var(--color-dark-900);
    margin-bottom: var(--space-2);
  }

  p {
    font-size: var(--text-sm);
    color: var(--color-dark-600);
    line-height: 1.7;
  }
`;

const QuoteSection = styled.section`
  background: var(--gradient-secondary);
  border-radius: var(--radius-3xl);
  padding: var(--space-10);
  text-align: center;
  position: relative;
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    top: -50px;
    right: -50px;
    width: 200px;
    height: 200px;
    background: rgba(255, 255, 255, 0.1);
    border-radius: 50%;
  }

  .quote-content {
    position: relative;
    z-index: 1;
  }

  .quote-icon {
    font-family: var(--font-heading);
    font-size: 5rem;
    color: white;
    line-height: 1;
    margin-bottom: var(--space-4);
    opacity: 0.3;
  }

  blockquote {
    font-family: var(--font-heading);
    font-size: var(--text-xl);
    font-weight: 400;
    font-style: italic;
    color: white;
    line-height: 1.8;
    max-width: 700px;
    margin: 0 auto;
  }
`;

export default Educationmaterial;
