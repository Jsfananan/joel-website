/* Course content. Intro copy is plain and factual (built only from the skill names) and can be rewritten here at any time.
   Skill and section names come from the live library page (verified 2026-10-22):
   https://leadershipinchange.com/p/skill-library  (post id 210243063)
   Skill links are Substack heading deep links taken from that page's own contents list. */
(function () {
  var POST_ID = '210243063';
  var BASE = 'https://leadershipinchange.com/i/' + POST_ID + '/';

  /* 'Use it when' lines are Joel's own words, copied from his Skill Library draft
     (~/Documents/lic-newsletter/drafts/2026-08-06-claude-skill-library-PREMIUM.md). Confirm they match the live post. */
  var USE = {
      "Decision Framework Skill": "You've been circling a decision for more than a week.",
      "Anti-Sycophancy Skill": "You want a second opinion, not a cheerleader.",
      "Red Pen Review Skill": "Something is about to go out and you can't afford it to be soft.",
      "Stress Test Protocol": "You're about to commit budget or headcount to an AI project.",
      "AI Ethics Decision Tree": "You're moving forward but something feels unresolved.",
      "One-on-One Prep Skill": "You have a 1:1 in twenty minutes and haven't thought about it.",
      "Hard Conversation Skill": "You've rescheduled the same conversation twice.",
      "Meeting Prep Skill": "The 'quick intro call' that's actually the whole game.",
      "Research Brief Skill": "You need an answer and you can't afford a confident guess.",
      "Customer Insight Skill": "You have 40 survey responses and no idea what they say.",
      "AI Task-Tool Matcher": "You know the job, not the tool.",
      "Executive Summary Skill": "A 40-page report and a board meeting tomorrow.",
      "Content Voice Skill": "Everything you generate sounds like everyone else.",
      "Time and Energy Audit Skill": "You were busy all week and can't say what you moved.",
      "Strengths Inventory Skill": "You're deciding what to take on, or what to hand off.",
      "Proposal Generator Skill": "A prospect said yes and you need something today.",
      "Book Recommendations Engine": "You want the next book to be the right one.",
      "Email Sequence Builder": "You need a sequence live this week.",
      "Competitor Intelligence Brief": "A competitor moved and you need to know whether it matters.",
      "SEO Article Optimizer": "The draft is done and you want it found.",
      "Social Content Repurposer": "You published something and it deserves more than one post.",
      "Ad Copy & Landing Page Writer": "You're about to spend money on traffic.",
      "Content Calendar Planner": "Your content feels random and you can't say why.",
      "Brand Voice Auditor": "You're reviewing AI output or outsourced work.",
      "Campaign Brief Generator": "You're launching and there's no plan on paper."
  };
  function sk(name, slug) { return { id: slug, name: name, url: BASE + slug, does: USE[name] || '' }; }

  window.COURSE = {
    name: "The Leader's AI Skills Course",
    org: 'Leadership in Change',
    libraryUrl: 'https://leadershipinchange.com/p/skill-library',
    /* The Course opens on its own at this moment. Before it, visitors see the Coming Nov 5 screen.
       Joel can preview the full Course any time with ?preview at the end of the URL. */
    launchAt: '2026-11-05T05:00:00Z',
    subscribeUrl: 'https://leadershipinchange.com/subscribe',
    installUrl: 'https://jsalinas.org/claude-guide/#install',

    hero: {
      lead: 'Judgment is the scarce part of leadership. This Course puts the 25 skills in the Skill Library for Leaders to work on your own real work, so AI carries more of your expertise and none of your judgment.',
      note: 'For Premium members. Every skill works in Claude, ChatGPT and Gemini, and each link opens it in the Premium library.'
    },

    startHere: {
      what: 'A skill is a saved set of instructions your AI tool follows when you ask it to. The library gives you 25 of them, grouped into six sections.',
      steps: [
        { id: 'read', text: 'unused' },
        { id: 'install', text: 'I installed a skill.' }
      ],
      orderTitle: 'Follow the order, or skip around.',
      orderBody: 'The suggested order is Start Here, the six modules, then the Capstone. You can open any module at any time. Every module starts with a short intro you can skip.'
    },

    stepsCopy: {
      why: 'Why this section',
      pick: 'Pick your skill',
      run: 'Run it on real work this week',
      show: 'Show your work',
      runBody: 'Use a real task from your own week, not a sample. Open the skill, run it, and keep the output next to the work it was for.',
      runCheck: 'I ran it on real work.',
      pickBody: 'Pick one or more. Open any skill to read it in the library first.',
      showQs: [
        { id: 'ask', label: 'What did you ask, and what did it give you?' },
        { id: 'kept', label: 'What did you keep, and what did you change?' },
        { id: 'refused', label: 'What did you refuse, and why?' }
      ],
      showHint: 'Three short answers. Nothing is saved, so copy anything you want to keep.'
    },

    capstone: {
      body: 'Run three or more skills in the same week. Then write a one-page judgment log: where AI helped, where you overrode it, and what you will keep doing.',
      logQs: [
        { id: 'helped', label: 'Where did AI help?' },
        { id: 'overrode', label: 'Where did you override it?' },
        { id: 'keep', label: 'What will you keep doing?' }
      ]
    },

    modules: [
      {
        id: 'decide', name: 'Decide',
        why: 'This section has five skills for decisions: a Decision Framework Skill, an Anti-Sycophancy Skill, a Red Pen Review Skill, a Stress Test Protocol and an AI Ethics Decision Tree.',
        skills: [
          sk('Decision Framework Skill', 'decision-framework-skill'),
          sk('Anti-Sycophancy Skill', 'anti-sycophancy-skill'),
          sk('Red Pen Review Skill', 'red-pen-review-skill'),
          sk('Stress Test Protocol', 'stress-test-protocol'),
          sk('AI Ethics Decision Tree', 'ai-ethics-decision-tree')
        ]
      },
      {
        id: 'lead-people', name: 'Lead people',
        why: 'This section has three skills for working with your team: a One-on-One Prep Skill, a Hard Conversation Skill and a Meeting Prep Skill.',
        skills: [
          sk('One-on-One Prep Skill', 'one-on-one-prep-skill'),
          sk('Hard Conversation Skill', 'hard-conversation-skill'),
          sk('Meeting Prep Skill', 'meeting-prep-skill')
        ]
      },
      {
        id: 'know-your-market', name: 'Know your market',
        why: 'This section has three skills for understanding the market: a Research Brief Skill, a Customer Insight Skill and an AI Task-Tool Matcher.',
        skills: [
          sk('Research Brief Skill', 'research-brief-skill'),
          sk('Customer Insight Skill', 'customer-insight-skill'),
          sk('AI Task-Tool Matcher', 'ai-task-tool-matcher')
        ]
      },
      {
        id: 'communicate', name: 'Communicate',
        why: 'This section has two skills for what you write and say: an Executive Summary Skill and a Content Voice Skill.',
        skills: [
          sk('Executive Summary Skill', 'executive-summary-skill'),
          sk('Content Voice Skill', 'content-voice-skill')
        ]
      },
      {
        id: 'know-yourself', name: 'Know yourself',
        why: 'This section has four skills: a Time and Energy Audit Skill, a Strengths Inventory Skill, a Proposal Generator Skill and a Book Recommendations Engine.',
        skills: [
          sk('Time and Energy Audit Skill', 'time-and-energy-audit-skill'),
          sk('Strengths Inventory Skill', 'strengths-inventory-skill'),
          sk('Proposal Generator Skill', 'proposal-generator-skill'),
          sk('Book Recommendations Engine', 'book-recommendations-engine')
        ]
      },
      {
        id: 'market', name: 'Market',
        why: 'This section has eight skills for marketing work: an Email Sequence Builder, a Competitor Intelligence Brief, an SEO Article Optimizer, a Social Content Repurposer, an Ad Copy & Landing Page Writer, a Content Calendar Planner, a Brand Voice Auditor and a Campaign Brief Generator.',
        skills: [
          sk('Email Sequence Builder', 'email-sequence-builder'),
          sk('Competitor Intelligence Brief', 'competitor-intelligence-brief'),
          sk('SEO Article Optimizer', 'seo-article-optimizer'),
          sk('Social Content Repurposer', 'social-content-repurposer'),
          sk('Ad Copy & Landing Page Writer', 'ad-copy-landing-page-writer'),
          sk('Content Calendar Planner', 'content-calendar-planner'),
          sk('Brand Voice Auditor', 'brand-voice-auditor'),
          sk('Campaign Brief Generator', 'campaign-brief-generator')
        ]
      }
    ],

    certificate: {
      title: 'Certificate of Completion',
      signer: 'Joel Salinas'
    }
  };

  /* Install walkthrough: six steps, copied from Joel's own guide at jsalinas.org/claude-guide/#install */
  window.COURSE.guideUrl = 'https://jsalinas.org/claude-guide/#install';
  /* ChatGPT and Gemini steps quote each vendor's own help page (checked 2026-10-23):
     help.openai.com/en/articles/10169521 (Projects in ChatGPT) and support.google.com/gemini/answer/15146780 (Use Gems). */
  window.COURSE.installSteps = function (tool, surface) {
    var copy = { label: 'Copy the prompt', title: 'Copy the skill prompt', body: 'Open the post with the skill and copy the whole prompt block, every line, top to bottom.', tip: 'Grab all of it, including the very first lines. The questions at the top are what make the skill yours.', next: 'Copied it, next', scene: 'copy' };
    var finished = 'When it has your answers, send this: "Give me the finished instructions with my answers filled in. Keep every line of the original. One block I can paste." Copy what it gives you.';
    if (tool === 'chatgpt') return [
      copy,
      { label: 'Paste and answer', title: 'Paste it into a new ChatGPT chat', body: 'Open ChatGPT and start a new chat. Paste the whole prompt and send it. It asks you a few questions first. Answer them in plain language.', tip: 'Specific answers make a specific skill. Vague answers make a vague one.', next: 'Answered, next', scene: 'paste' },
      { label: 'Get the finished version', title: 'Ask for the finished instructions', body: finished, tip: 'If anything got shortened, ask it to put the missing lines back. You want the whole thing.', next: 'Copied it, next', scene: 'answer' },
      { label: 'Create a project', title: 'Create a project', body: 'Select New project in the sidebar. Enter a project name, then select an icon and color.', tip: 'Name the project after the skill, like "Hard Conversation Skill", so it is easy to find.', next: 'Created it, next', scene: 'save' },
      { label: 'Add the instructions', title: 'Paste them into Project settings', body: 'Select the more options menu (•••), then select Project settings, and paste the finished instructions there.', tip: 'OpenAI notes that project instructions apply only within that project and override your global custom instructions.', next: 'Added them, next', scene: 'paste' },
      { label: 'Put it to work', title: 'Put it to work', body: 'Start a new chat inside that project whenever you need the skill, and describe the real situation.', tip: 'One project per skill keeps each one clean.', next: 'Continue to Module 1', scene: 'chat' }
    ];
    if (tool === 'gemini') return [
      copy,
      { label: 'Paste and answer', title: 'Paste it into a new Gemini chat', body: 'Go to gemini.google.com and start a new chat. Paste the whole prompt and send it. It asks you a few questions first. Answer them in plain language.', tip: 'Specific answers make a specific skill. Vague answers make a vague one.', next: 'Answered, next', scene: 'paste' },
      { label: 'Get the finished version', title: 'Ask for the finished instructions', body: finished, tip: 'If anything got shortened, ask it to put the missing lines back. You want the whole thing.', next: 'Copied it, next', scene: 'answer' },
      { label: 'Create a Gem', title: 'Create a Gem', body: 'Click Open Sidebar, then Gems, then New Gem. If you have never made a Gem before, first click Settings and help, then Gems.', tip: 'Name the Gem after the skill, like "Hard Conversation Skill", so it is easy to find.', next: 'Created it, next', scene: 'save' },
      { label: 'Add the instructions', title: 'Paste them in and save', body: 'Enter a name and instructions for your Gem: paste the finished instructions into the instructions field. Then click Save.', tip: 'Google says that starting in November 2026, Gems on personal Google accounts move over to skills automatically.', next: 'Saved it, next', scene: 'paste' },
      { label: 'Put it to work', title: 'Put it to work', body: 'Open the sidebar, click Gems, and under "My Gems" select your skill. Then type the real situation in the text box.', tip: 'A Gem you make on the web also shows up in the Gemini mobile app.', next: 'Continue to Module 1', scene: 'chat' }
    ];
    var name = surface === 'desktop' ? 'Cowork' : 'a new Claude chat';
    var openWhere = surface === 'desktop' ? 'Open the Claude desktop app and start a Cowork chat.' : 'Open claude.ai and start a new chat.';
    var settingsWhere = surface === 'web' ? 'Click the gear (Settings) at the bottom-left, then open Capabilities.' : 'Open Settings from the sidebar, then go to Capabilities.';
    return [
      copy,
      { label: 'Turn on Code execution', title: 'Turn on Code execution', body: 'One setting has to be on so Claude can build and save the skill. ' + settingsWhere + ' Turn on "Code execution and file creation."', tip: "It's a one-time switch. Leave it on and every future skill builds cleanly.", next: "It's on, next", scene: 'toggle' },
      { label: 'Paste it in', title: 'Paste it into ' + name, body: openWhere + ' Paste the whole prompt into the message box and send it. Claude reads it and starts building your skill.', tip: surface === 'desktop' ? 'On the desktop app this build chat is called Cowork. On the web it’s just a regular chat, either works.' : 'On the web it’s a normal Claude chat. In the desktop app the same thing is called Cowork.', next: 'Sent it, next', scene: 'paste' },
      { label: 'Answer its questions', title: 'Answer its questions', body: 'Some skills ask a few quick questions first, to learn your voice, your brand, or how you like things done. Answer them in plain language. If it doesn’t ask anything, it just builds, skip ahead.', tip: 'The more honestly you answer, the better the skill fits you. There are no wrong answers.', next: 'Answered, next', scene: 'answer' },
      { label: 'Click Save', title: 'Click "Save"', body: 'When Claude finishes, it shows your skill on a card. Click Save. That’s the moment it becomes a real, reusable skill in your account.', tip: 'Saved skills live in Customize → Skills. If one ever seems to do nothing, check that its switch is on there.', next: 'Saved it, next', scene: 'save' },
      { label: 'Put it to work', title: 'Put it to work', body: 'Done. Just ask Claude in plain language and the skill fires when it fits. Want it on purpose? Mention it by name in your request.', tip: 'You never rebuild it. It’s saved for good, ready every time you open Claude.', next: 'Continue to Module 1', scene: 'chat' }
    ];
  };

})();
