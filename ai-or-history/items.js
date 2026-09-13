// Quiz pool: 14 PAIRS. The AI list mirrors the History list IN THE SAME ORDER (index i ↔ index i).
// A game deals 10 of the pairs and shows ONE side of each (5 History + 5 AI), so a real line never
// gives its own imitation away. Add or remove items only in pairs, keeping the order matched.
//
// HISTORY items are verbatim, each read on the primary source in `src` (2026-09-13). Trims are
// from the start or end of a sentence only; a lowercase first word was capitalized where needed.
// Never add an item without reading its primary source.
//
// AI items were written by Claude for this quiz (2026) to copy the rhythm of their pair.

(function () {
  const HISTORY = [
    { id: 'douglass',
      text: 'It is not light that is needed, but fire; it is not the gentle shower, but thunder.',
      who: 'Frederick Douglass', where: '“What to the Slave Is the Fourth of July?”', year: '1852',
      tell: 'The “not this, but that” move gets blamed on chatbots. Douglass used it twice in one sentence.',
      src: 'https://teachingamericanhistory.org/document/what-to-the-slave-is-the-fourth-of-july-2/' },

    { id: 'jfk-frontier',
      text: 'A frontier of unknown opportunities and perils—a frontier of unfulfilled hopes and threats.',
      who: 'John F. Kennedy', where: 'Democratic National Convention acceptance speech', year: '1960',
      tell: 'An em dash plus a repeated noun, straight out of a 1960 convention speech.',
      src: 'https://www.jfklibrary.org/archives/other-resources/john-f-kennedy-speeches/democratic-party-nomination-19600715' },

    { id: 'veblen',
      text: 'Conspicuous abstention from labour therefore becomes the conventional mark of superior pecuniary achievement',
      who: 'Thorstein Veblen', where: 'The Theory of the Leisure Class', year: '1899',
      tell: 'Inflated vocabulary is older than software. Economists had it down by 1899.',
      src: 'https://www.gutenberg.org/files/833/833-h/833-h.htm' },

    { id: 'dickinson',
      text: 'Because I could not stop for Death—\nHe kindly stopped for me—',
      who: 'Emily Dickinson', where: '“Because I could not stop for Death—”', year: 'c. 1863',
      tell: 'Dickinson ended nearly every line with a dash. The first printed edition, in 1890, took them out.',
      src: 'https://poets.org/poem/because-i-could-not-stop-death-479' },

    { id: 'dickens-carol',
      text: 'It was always said of him, that he knew how to keep Christmas well',
      who: 'Charles Dickens', where: 'A Christmas Carol', year: '1843',
      tell: 'The neat moral bow on the ending, a Victorian habit long before it was an AI one.',
      src: 'https://en.wikisource.org/wiki/A_Christmas_Carol_(Dickens,_1843_facsimile)/Stave_5' },

    { id: 'truth',
      text: 'I have as much muscle as any man, and can do as much work as any man.',
      who: 'Sojourner Truth', where: 'Women’s Rights Convention, Akron (as reported by Marius Robinson)', year: '1851',
      tell: 'Repetition for rhythm. This is the version printed in 1851, the closest record of what she actually said.',
      src: 'https://voicesofdemocracy.umd.edu/truth-address-at-the-womans-rights-convention-speech-text/' },

    { id: 'melville',
      text: 'Some years ago—never mind how long precisely—having little or no money in my purse',
      who: 'Herman Melville', where: 'Moby-Dick', year: '1851',
      tell: 'An aside tucked between two em dashes, in the second sentence of Moby-Dick.',
      src: 'https://www.gutenberg.org/cache/epub/2701/pg2701.txt' },

    { id: 'google-longterm',
      text: 'We will optimize for the long term rather than trying to produce smooth earnings for each quarter.',
      who: 'Larry Page and Sergey Brin', where: 'Google’s founders’ letter, filed with the SEC', year: '2004',
      tell: 'A tidy “this rather than that” promise, filed with the SEC eighteen years before ChatGPT.',
      src: 'https://www.sec.gov/Archives/edgar/data/1288776/000119312504142742/ds1a.htm' },

    { id: 'google-goal',
      text: 'Our goal is to develop services that significantly improve the lives of as many people as possible.',
      who: 'Larry Page and Sergey Brin', where: 'Google’s founders’ letter, filed with the SEC', year: '2004',
      tell: 'Mission-statement voice, big and warm and hard to argue with. Google’s founders wrote it in 2004.',
      src: 'https://www.sec.gov/Archives/edgar/data/1288776/000119312504142742/ds1a.htm' },

    { id: 'bezos',
      text: 'We will make bold rather than timid investment decisions where we see a sufficient probability of gaining market leadership advantages.',
      who: 'Jeff Bezos', where: 'Amazon’s 1997 letter to shareholders', year: '1997',
      tell: '“Bold rather than timid” plus a pile of business vocabulary. It reads like a chatbot, and it’s Bezos in 1997.',
      src: 'https://www.sec.gov/Archives/edgar/data/1018724/000119312505070440/dex991.htm' },

    { id: 'enron',
      text: 'We believe that information is meant to move and that information moves people.',
      who: 'Enron', where: 'Enron Code of Ethics', year: '2000',
      tell: 'A lovely line about communication, straight out of Enron’s code of ethics.',
      src: 'https://www.justice.gov/archive/enron/exhibit/02-06/BBC-0001/ocr/EXH012-02970%5EFullText.TXT' },

    { id: 'rowling',
      text: "Life is difficult, and complicated, and beyond anyone's total control, and the humility to know that will enable you to survive its vicissitudes.",
      who: 'J.K. Rowling', where: 'Harvard commencement address', year: '2008',
      tell: 'A triple list and the word “vicissitudes.” It sounds like a model trying to impress, and it’s Rowling at Harvard.',
      src: 'https://news.harvard.edu/gazette/story/2008/06/text-of-j-k-rowling-speech/' },

    { id: 'microsoft',
      text: 'To enable people and businesses throughout the world to realize their full potential.',
      who: 'Microsoft', where: 'Corporate mission, in its annual report filed with the SEC', year: '2004',
      tell: '“Realize their full potential” is peak chatbot phrasing. Microsoft filed it with the SEC in 2004.',
      src: 'https://www.sec.gov/Archives/edgar/data/789019/000119312504150689/d10k.htm' },

    { id: 'buffett',
      text: 'We feel noble intentions should be checked periodically against results.',
      who: 'Warren Buffett', where: 'Berkshire Hathaway Owner’s Manual', year: '1996',
      tell: 'A short, tidy moral, the kind chatbots love to end on. Buffett wrote it in 1996.',
      src: 'https://www.berkshirehathaway.com/owners.html' }
  ];

  const AI = [
    { id: 'ai-patience',
      text: 'It is not speed that we lack, but patience; it is not the loud answer, but the right one.',
      tell: 'Douglass’s rhythm with none of his reasons. It sounds big and says very little.' },

    { id: 'ai-season',
      text: 'A season of open questions—a season of unfinished promises and untested risks.',
      tell: 'The dash and the repeated noun are borrowed from a Kennedy speech, but there’s nothing here to decide.' },

    { id: 'ai-leisure',
      text: 'Visible leisure thereby becomes the customary signal of accumulated advantage and the accepted measure of standing',
      tell: 'Jargon stacked on jargon. It copies an economist’s sound without making his argument.' },

    { id: 'ai-morning',
      text: 'I did not go to meet the Morning—\nIt came and found me there—',
      tell: 'Capitalized nouns and dashes are easy to copy. Emily Dickinson’s strangeness is the hard part.' },

    { id: 'ai-promise',
      text: 'It was always said of her, that she knew how to keep a promise well',
      tell: 'A moral bow with nothing underneath it, since there’s no story for it to close.' },

    { id: 'ai-weight',
      text: 'I have as much patience as any person here, and can carry as much weight as any person here.',
      tell: 'The repetition is real rhetoric, but with no doubting crowd in the room, it’s just a pattern.' },

    { id: 'ai-winters',
      text: 'Some winters back—the exact year hardly matters—with little to hold me in town and less in my pocket',
      tell: 'A Moby-Dick aside, reassembled. Close enough to fool most of us.' },

    { id: 'ai-trust',
      text: 'We will build for lasting trust rather than chasing quick wins in every single quarter.',
      tell: 'The same “this rather than that” promise as a real founders’ letter, with nothing specific enough to hold anyone to.' },

    { id: 'ai-teams',
      text: 'Our aim is to create tools that meaningfully improve the work of as many teams as possible.',
      tell: 'Warm, broad, and almost impossible to disagree with, which is exactly why it says so little.' },

    { id: 'ai-brave',
      text: 'We will make brave rather than cautious choices where we see a clear opportunity to strengthen our long-term position.',
      tell: 'A shareholder-letter sentence with the specifics sanded off. A clear opportunity to do what, exactly?' },

    { id: 'ai-ideas',
      text: 'We believe that ideas are meant to travel and that ideas move people.',
      tell: 'A lovely-sounding loop of a sentence that circles back on itself and goes nowhere.' },

    { id: 'ai-change',
      text: "Change is uncertain, and uneven, and beyond any one leader's full control, and the patience to accept that will help you navigate its challenges.",
      tell: 'The same triple list as a real commencement speech, and “navigate its challenges” is about as generic as advice gets.' },

    { id: 'ai-industry',
      text: 'To help people and teams across every industry reach their greatest potential.',
      tell: 'Mission-statement filler. Swap in any company name and it still works, which is the problem.' },

    { id: 'ai-tested',
      text: 'We believe good ideas should be tested regularly against real outcomes.',
      tell: 'It sounds wise, but it’s a smaller, safer version of a line Warren Buffett actually wrote.' }
  ];

  if (HISTORY.length !== AI.length) throw new Error('items.js: History and AI lists must be the same length');
  window.ITEMS = HISTORY.map((h) => ({ ...h, ai: false })).concat(AI.map((a) => ({ ...a, ai: true })));
})();

window.VERDICTS = {
  right: ['Good eye.', 'Case solved.', 'Nice detective work.', 'You saw right through it.', 'Sharp.'],
  wrong: ['Got you.', 'That one fooled you.', 'The robot thanks you.', 'Tricky, right?', 'Close, but no.']
};
