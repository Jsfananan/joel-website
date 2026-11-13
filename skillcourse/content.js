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
    launchAt: null, /* gate removed 2026-11-01 (Joel): Course is open now */
    subscribeUrl: 'https://leadershipinchange.com/subscribe',
    installUrl: 'https://jsalinas.org/claude-guide/#install',

    hero: {
      lead: 'Judgment is the scarce part of leadership. This Course puts the 25 skills in the AI Skill Library for Leaders to work on your own real work, so AI carries more of your expertise and none of your judgment.',
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
    paywall: 'The Skill Library is for Premium members. If a post looks locked, sign in to Substack with the email on your Premium account.',
      why: 'Why this section',
      pick: 'Pick your skill',
      run: 'Run it on real work',
      show: 'Show your work',
      runBody: 'Use a real task from your own week, not a sample. Open the skill, run it, and keep the output next to the work it was for.',
      runCheck: 'I ran it on real work.',
      pickBody: 'Add the skills you want to try to your list. You set them up in the next step.',
      showQs: [
        { id: 'ask', label: 'What did you ask, and what did it give you?' },
        { id: 'kept', label: 'What did you keep, and what did you change?' },
        { id: 'refused', label: 'What did you refuse, and why?', help: 'Something it suggested that you rejected. Rejected nothing? Say what you double-checked.' }
      ],
      showHint: 'Three short answers, a sentence or two each. This page forgets everything when you close the tab, so use Copy my answers to keep them.'
    },

    capstone: {
      body: 'Run three or more skills in the same week. Then write a short judgment log, a few sentences each on where AI helped, where you overrode it, and what you will keep doing.',
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

  /* Install walkthrough. Every path installs ONE named skill, the Anti-Sycophancy Skill, so a first-timer never has to choose.
     Claude steps checked against support.claude.com (Settings > Capabilities for code execution; Customize > Skills).
     ChatGPT steps: help.openai.com/en/articles/10169521 (Projects). Skills in ChatGPT are only on Business, Enterprise, Healthcare and Edu plans (help.openai.com/en/articles/20001066).
     Gemini steps: support.google.com/gemini/answer/17094296 (create a skill from a chat; Customize > Skills).
     Gems on personal accounts become read-only on 2026-11-17 (support.google.com/gemini/answer/18560919), so the Gemini path uses skills, not Gems. All checked 2026-11-11. */
  window.COURSE.firstSkill = { name: 'Anti-Sycophancy Skill', url: 'https://leadershipinchange.com/i/210243063/anti-sycophancy-skill', firstLine: 'Create a skill with the information below.' };
  window.COURSE.testPrompt = "Here is a decision I'm leaning toward: [describe it in a sentence or two]. Tell me what's weak about it.";
  window.COURSE.toolNames = { claude: 'Claude', chatgpt: 'ChatGPT', gemini: 'Gemini' };
  window.COURSE.installSteps = function (tool) {
    var F = window.COURSE.firstSkill, T = window.COURSE.toolNames[tool];
    var copy = {
      label: 'Copy the skill', title: 'Copy the ' + F.name,
      lines: [
        'Click the orange button below. The ' + F.name + ' opens in the Skill Library, in a new tab.',
        'Under the skill’s name is a grey box of text. Its first line is “' + F.firstLine + '”',
        'Copy everything in that grey box, from the first line to the last.',
        'Come back to this tab.'
      ],
      action: { text: 'Open the ' + F.name + ' ↗', url: F.url },
      note: 'The Skill Library is for Premium members. If the post looks locked, sign in to Substack with the email on your Premium account.' + (tool === 'claude' ? '' : ' The post mentions Claude in a few places. Ignore that, the same text works in ' + T + '.'),
      next: 'I copied it, next'
    };
    var test = function (where) { return {
      label: 'Test it', title: 'Test it',
      lines: [where, 'Send the message below, with your own decision in place of the brackets.', 'If ' + T + ' points out weak spots instead of cheering you on, the skill is working.'],
      copyText: window.COURSE.testPrompt,
      done: 'That’s it. Your first skill is set up. Every other skill installs the same way' + (tool === 'chatgpt' ? ', each in its own project.' : '.'),
      next: 'Done, go to Module 1'
    }; };
    if (tool === 'chatgpt') return [
      copy,
      { label: 'Paste it in', title: 'Paste it into ChatGPT', lines: ['Go to chatgpt.com and start a new chat.', 'Paste the text into the message box and press Enter.', 'If ChatGPT asks you questions, answer them in plain words. If it doesn’t, that’s fine.'], note: 'On a ChatGPT work plan (Business or Enterprise), it may offer to install it as a skill. If it does, accept and skip to the last step.', next: 'Done, next' },
      { label: 'Ask for the final text', title: 'Ask for the final text', lines: ['Send the message below.', 'ChatGPT replies with one block of text. Click the copy icon under its reply to copy all of it.'], note: 'Got it in several pieces? Reply: Put it all in one block.', copyText: 'Give me the finished instructions with my answers filled in. Keep every line of the original. One block I can paste.', next: 'I copied it, next' },
      { label: 'Make a project', title: 'Make a project', lines: ['In the ChatGPT sidebar, select New project.', 'Name it “' + F.name + '” and create it.'], next: 'Done, next' },
      { label: 'Put it in the project', title: 'Put it in the project', lines: ['Inside the project, select the ••• menu, then Project settings.', 'Paste the block into the instructions box and save.'], note: 'Instructions you put here apply only inside this project.', next: 'Done, next' },
      test('Inside the project, start a new chat.')
    ];
    if (tool === 'gemini') return [
      copy,
      { label: 'Paste it in', title: 'Paste it into Gemini', lines: ['Go to gemini.google.com and start a new chat.', 'Paste the text into the message box and press Enter.', 'Gemini builds the skill and saves it for you. If it asks you questions, answer them in plain words.'], next: 'Done, next' },
      { label: 'Check it saved', title: 'Check that it saved', lines: ['In the Gemini sidebar, click Customize, then Skills. If you don’t see Customize, click More first.', 'You should see your new skill in the list.'], note: 'Not there? Go back to the chat and type: Save this as a skill.', next: 'I see it, next' },
      test('Start a new Gemini chat.')
    ];
    return [
      copy,
      { label: 'Turn on one setting', title: 'Turn on one setting', lines: ['Go to claude.ai, or open the Claude desktop app.', 'Click your initials at the bottom left, then Settings, then Capabilities.', 'Turn on Code execution, which lets Claude build and save skills. It may be called “Code execution and file creation.”'], note: 'You only do this once.', next: 'It’s on, next' },
      { label: 'Paste it in', title: 'Paste it into a new chat', lines: ['Start a new chat in Claude.', 'Paste the text into the message box and press Enter.', 'If Claude asks you questions, answer them in plain words. This skill usually goes straight to building, which is fine.'], next: 'Done, next' },
      { label: 'Click Save', title: 'Click Save', lines: ['When Claude finishes, it shows the skill on a card with a Save button.', 'Click Save. Now the skill is part of your Claude account.'], note: 'No Save button? Type: Save this as a skill. You can find your skills any time under Customize, then Skills.', next: 'Saved it, next' },
      test('Start a new chat in Claude.')
    ];
  };

})();
