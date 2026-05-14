import fs from 'fs';
import path from 'path';

const rawText = `PROMPT 01 — Deal Autopsy: Why You Lost the Sale
Best platform: Claude, ChatGPT
When to use: After a lost deal to extract real lessons, not cope.

Act as a brutally honest sales coach. I just lost a deal and I need to
understand exactly why.

Context:
- What I sold: [product or service]
- Prospect profile: [company size, industry, role of decision-maker]
- Deal size and length of sales cycle: [amount, weeks/months]
- The reason they gave for not buying: [their stated reason]
- My gut read on the real reason: [your honest suspicion]

Do NOT validate me. Tear apart:
1. Where in the sales process I likely lost momentum
2. The signals I probably misread or ignored
3. Whether my pricing, positioning, or timing was the real killer
4. What the competitor or alternative they chose actually does better
5. The one thing I should do differently in the next identical situation

End with a single sentence I should say to myself before every future
sales call with a similar prospect.

----------------------------------------------------------------

PROMPT 02 — Objection Demolisher
Best platform: Claude, ChatGPT
When to use: Preparing for a sales call when you know the objections
             that will come up.

Act as a senior sales trainer. Write a complete objection-handling script
for the following scenario:

My product / service: [describe what you sell]
Price point: [the number they will balk at]
The 4 objections I always get:
1. [e.g., "We already have a solution for this"]
2. [e.g., "We don't have budget right now"]
3. [e.g., "We need to think about it"]
4. [e.g., "Can you send me more info?"]

For each objection:
- Identify what the prospect ACTUALLY means underneath the stated objection
- Write the response that addresses the real fear, not the surface deflection
- Include one follow-up question that keeps the conversation open
- Flag when the objection is actually a hard no and I should disengage

Tone: confident, not pushy. Human, not scripted.

----------------------------------------------------------------

PROMPT 03 — Pricing Conversation Reframe
Best platform: Claude
When to use: Your price is higher than competitors and you need to defend
             it without discounting or apologising.

I sell [product/service] at [price]. A prospect just said:
"Your competitor does the same thing for [lower price]."

Write me a response that:
1. Acknowledges their comparison without being defensive
2. Reframes the conversation from cost to total cost of ownership or
   risk of the cheaper option
3. Uses a single specific analogy or concrete example, not abstract language
4. Ends with a question that shifts the frame back to value
5. Never mentions the competitor by name

Under 150 words. Sounds like a person, not a sales script.

----------------------------------------------------------------

PROMPT 04 — LinkedIn DM That Doesn't Sound Like a LinkedIn DM
Best platform: Claude, ChatGPT
When to use: Cold outreach on LinkedIn where every other message sounds
             identical and gets ignored.

Write a LinkedIn DM for cold outreach that sounds nothing like a
LinkedIn DM.

Recipient profile:
- Name: [first name]
- Role: [job title]
- Company: [company name]
- Something specific I noticed about them: [a post they wrote, a company
  announcement, a shared connection, a podcast they appeared on]

My offer: [what I do and who I do it for]
What I am NOT asking for: a call, a demo, a reply to confirm interest

Rules:
- Open with an observation about THEM, not a compliment
- One sentence maximum to describe what I do
- The only ask is a yes/no question that requires 3 seconds to answer
- Under 60 words total
- No "I hope this finds you well" — ever

----------------------------------------------------------------

PROMPT 05 — Landing Page Above-the-Fold Rewriter
Best platform: Claude
When to use: Your landing page isn't converting and you suspect the
             headline and first 100 words are the problem.

You are a conversion copywriter. Rewrite the above-the-fold section of
my landing page.

Current headline: [paste your current headline]
Current subheadline / opening copy: [paste it]
Product: [what it does]
Target customer: [who they are and what they desperately want]
The #1 outcome customers get: [specific, measurable result if possible]
The fear or frustration that drives them to look for this: [the real pain]

Rewrite rules:
1. Headline: name the outcome, not the product. Under 8 words.
2. Subheadline: name who it's for and what changes for them. Under 20 words.
3. First paragraph: address the exact frustration in their own language
   — not marketing language
4. CTA button text: not "Get Started" or "Learn More" — make it specific
5. Write 3 headline/subheadline variations with different emotional angles

----------------------------------------------------------------

PROMPT 06 — Brand Voice Extractor
Best platform: Claude
When to use: You need to define or document your brand voice so that
             any writer, AI tool, or new hire can match it.

Act as a brand strategist. Analyse the following examples of our existing
writing and extract our brand voice as a documented style guide.

Sample 1: [paste a piece of copy you wrote or approved]
Sample 2: [paste another]
Sample 3: [paste another]

Produce:
1. The 4 core voice attributes (e.g., direct, irreverent, warm, expert)
   — each with a one-sentence definition
2. The "we are / we are not" list — 5 things we are, 5 things we are not
3. Vocabulary: 10 words we use, 10 words we never use
4. Sentence structure rules — length, punctuation habits, POV
5. Two before/after examples showing off-brand vs on-brand rewrites
6. One-paragraph summary a new writer reads before writing anything for us

----------------------------------------------------------------

PROMPT 07 — Case Study That Sells Without Sounding Like a Case Study
Best platform: Claude
When to use: You have a customer result and need to turn it into a
             story that prospects actually read.

Turn the following customer result into a case study story people will
actually read — not a corporate PDF they skim.

Raw facts:
- Customer: [company type, not necessarily the name]
- Their situation before: [the specific problem or state they were in]
- What they implemented / used: [your product or service]
- The result: [specific metric — time saved, revenue gained, cost cut]
- Timeline: [how long it took to see results]

Write it as a narrative, not a template. Structure:
1. Open with the problem in the customer's voice — one punchy paragraph
2. What they'd already tried that hadn't worked
3. The specific change they made (your solution) in plain language
4. The result — lead with the number, then explain what it meant for them
5. One quote that sounds like a real person, not a testimonial robot
6. A closing line that transitions to: "If you're in a similar situation..."

Under 400 words. No headers, no bullet points — flowing prose.

----------------------------------------------------------------

PROMPT 08 — Ad Copy Stress-Tester
Best platform: Claude, ChatGPT
When to use: Before you spend money running an ad, test whether the
             copy is actually doing its job.

Act as a senior creative director with a reputation for killing weak
ad copy. Critique the following ad:

Ad copy:
[paste your ad headline, body copy, and CTA]

Platform it will run on: [Facebook / Google / LinkedIn / Out-of-Home]
Target audience: [who it's aimed at]
Desired action: [what you want them to do]

Tear it apart across:
1. Hook — does line 1 earn the right to line 2?
2. Specificity — is anything vague, generic, or interchangeable with
   a competitor's ad?
3. Emotional pull — does it speak to a feeling, or just list features?
4. CTA — is the ask clear, low-friction, and matched to the funnel stage?
5. Credibility — does it earn trust or just assert it?

Rate each dimension 1-10 with one sentence of reasoning.
Then rewrite the single weakest element.

----------------------------------------------------------------

PROMPT 09 — LinkedIn Thought Leadership Post (Non-Cringe)
Best platform: Claude
When to use: Writing a LinkedIn post that builds authority without
             looking like every other engagement-bait post.

Write a LinkedIn post for me on the following topic:

Topic / insight: [the idea you want to share]
My profession / lens: [your role and industry]
The real point — what I want the reader to think or do after reading:
[the actual takeaway]
Personal experience I can draw on: [a specific real thing that happened]

Rules:
- Do NOT start with "I used to think..." or "Unpopular opinion:" or
  "Here's what nobody tells you..."
- No numbered lists disguised as insights ("3 things I learned from...")
- No inspirational bromides
- Open with a specific scene, decision, or moment — not a thesis statement
- The insight lands in the middle or at the end — not the opening line
- Under 200 words
- No em-dash overuse. No "game-changer." No "Let me know in the comments."

----------------------------------------------------------------

PROMPT 10 — Positioning Autopsy: Why You're Invisible in Your Market
Best platform: Claude, Gemini
When to use: Prospects don't immediately get what you do, or your
             category feels crowded and you can't differentiate.

Act as a positioning strategist. Diagnose why the following company is
struggling to cut through in its market.

Company description: [what we do, who for, how long we've been doing it]
Current tagline / positioning statement: [what we currently say we are]
Top 3 competitors and how they position: [names and their taglines/claims]
The most common thing prospects say when they first hear about us:
[the confused or underwhelmed reaction]
What our best customers say we actually do for them: [their words, not ours]

Diagnose:
1. Whether we are over-categorized (sound like everyone else) or
   under-categorized (prospects don't know what we are)
2. The gap between what we say and what customers actually value
3. Our defensible position — what we can claim that no one else can
4. A rewritten positioning statement in the format:
   "For [who], [company name] is the [category] that [unique value],
   unlike [alternatives] which [their limitation]."
5. Three messages we should stop saying immediately

----------------------------------------------------------------

PROMPT 11 — Go-to-Market Strategy for a New Product
Best platform: Claude, ChatGPT
When to use: Launching something new and need a structured GTM plan
             before you start spending money.

Act as a GTM strategist. Build a go-to-market plan for the following:

Product: [what it is and what it does]
Target segment: [the specific buyer — be narrow]
Price point: [your pricing model]
Current assets: [what you have — existing audience, sales team, email
list, budget range, partnerships]
Timeline to first revenue: [your deadline]
One unfair advantage: [what gives you a real edge]

Produce:
1. The beachhead segment — the smallest, most reachable initial customer
   group with the sharpest pain
2. The first 90 days: 3 specific actions, in order, with rationale
3. The primary acquisition channel with the reasoning why — not a list
   of 8 channels
4. The key message for launch — one sentence for ads, one for DMs, one
   for PR
5. The metric that tells you the GTM is working by day 60
6. The biggest GTM mistake companies like this make — and how to avoid it

----------------------------------------------------------------

PROMPT 12 — Competitive Intelligence Brief
Best platform: Gemini, Grok
When to use: Before a sales call, investor pitch, or strategy session
             where you need to know your competitive landscape cold.

Act as a competitive intelligence analyst. Build a brief on my top
competitor.

Competitor: [company name]
My company: [what we do]
My audience for this brief: [sales team / board / myself]

Cover:
1. How they position themselves and who they actually serve
2. Their genuine strengths — be honest, not dismissive
3. Their genuine weaknesses — verified, not assumed
4. What their customers complain about most (based on reviews, forums,
   social)
5. How they price and package vs us
6. The situations where they beat us and what I should do in those moments
7. The situations where we clearly win and how to steer prospects there
8. One thing they are likely to do in the next 12 months that I should
   prepare for

Format as a one-page brief. No fluff. Every point is a decision-enabling
fact or analysis, not general observation.

----------------------------------------------------------------

PROMPT 13 — Pricing Strategy Interrogation
Best platform: Claude, ChatGPT
When to use: You think your pricing might be wrong but aren't sure
             whether you're underpriced, overpriced, or mis-packaged.

Act as a pricing strategist. Interrogate my current pricing.

What I sell: [product or service]
Current pricing: [how you charge and how much]
Current conversion rate from interested prospect to paying customer:
[your estimate or data]
Most common pushback on price: [what they say]
What my best customers pay and never complain: [the happiest tier]
What my worst customers pay and constantly push back: [the friction tier]

Give me:
1. A diagnosis — am I underpriced, overpriced, or mis-packaged?
2. The psychological friction in my current pricing model
3. One packaging change that would reduce price sensitivity without
   reducing revenue
4. What a premium tier would look like and who it would attract
5. The one pricing experiment I should run in the next 30 days with a
   clear hypothesis and success metric

----------------------------------------------------------------

PROMPT 14 — Investor Update Email
Best platform: Claude
When to use: Monthly or quarterly update to your existing investors —
             needs to build confidence, not spin the truth.

Write a monthly investor update email.

Context:
- Company stage: [pre-seed / seed / Series A]
- Month being reported: [month]
- Key metrics this month:
  - Revenue / MRR: [figure and % change vs last month]
  - Users / customers: [figure and % change]
  - Burn / runway: [monthly burn and months of runway]
- What went well: [2-3 real things]
- What didn't go as expected: [be honest — investors respect candour]
- The one thing keeping you up at night right now: [real]
- What you need from investors this month: [intros, advice, a specific ask]

Rules:
- Sound like the founder wrote it, not a PR person
- Address the bad news before the good — don't bury it
- Specific numbers only — no "significant growth" or "strong traction"
- The ask at the end must be concrete and actionable
- Under 300 words

----------------------------------------------------------------

PROMPT 15 — VC Cold Email That Gets a Reply
Best platform: Claude
When to use: Cold outreach to a VC you've never met — not a warm intro,
             just a cold email.

Write a cold email to a venture capitalist.

VC details:
- Name: [first name]
- Firm: [firm name]
- Their stated investment thesis / focus: [what they publicly say they
  invest in]
- A recent portfolio company or post of theirs that is relevant:
  [something specific]

My company:
- What we do: [one sentence, outcome-focused]
- Stage: [pre-seed / seed]
- Key traction signal: [the single most impressive number or fact]
- Why this investor specifically: [a real reason tied to their portfolio
  or thesis, not flattery]

Rules:
- Subject line must contain a number or a company name, not a vague hook
- Under 100 words in the body
- Do not pitch in the email — pitch in the meeting
- The only ask is 20 minutes
- One specific reason why you are emailing them and not any other VC

----------------------------------------------------------------

PROMPT 16 — Investor Objection Rebuttal Prep
Best platform: Claude, ChatGPT
When to use: Before a fundraising pitch — stress-test every hole an
             investor will poke.

Act as a skeptical seed-stage VC partner. I am pitching you my company
and I need you to hit me with every objection you would actually raise.

My company:
- What we do: [one sentence]
- Market we are targeting: [the category and size]
- Business model: [how we make money]
- Current traction: [your numbers]
- Why now: [timing argument]
- Team: [relevant backgrounds in one sentence each]
- The ask: [amount and what it's for]

Attack me on:
1. Market size — is it real, or am I being optimistic?
2. Competition — who else is doing this and why won't they win?
3. Team — what's missing, who should I have but don't?
4. Business model — where is the unit economics risk?
5. Why now — why didn't this work 5 years ago, and what's changed?
6. The one question you would ask that would make or break your decision

After each objection, pause. I will respond. Then tell me whether my
answer was convincing or what it was missing.

----------------------------------------------------------------

PROMPT 17 — Crisis Communication Statement
Best platform: Claude
When to use: Something went wrong publicly — a product failure, data
             issue, PR incident — and you need a statement in hours.

Act as a crisis communications director. Draft a public statement for
the following situation.

What happened: [describe the incident factually]
Who is affected: [customers / employees / the public]
What we have done so far: [immediate actions taken]
What we are committing to doing: [the fix or investigation underway]
What we genuinely don't know yet: [be honest about the unknowns]
Our biggest reputational risk in this situation: [what we most need to
protect]

Write:
1. The public statement — under 200 words, for our website and email
2. The internal message to employees — under 150 words
3. A holding statement for social media — under 280 characters
4. Three questions journalists will ask and the one-sentence answer
   to each

Rules: Acknowledge before you explain. Never use "We apologize for any
inconvenience." Name the harm done. Do not be defensive.

----------------------------------------------------------------

PROMPT 18 — Press Pitch That Journalists Actually Read
Best platform: Claude
When to use: Pitching a journalist cold — product launch, funding news,
             story angle — and every other pitch in their inbox sounds
             the same.

Write a press pitch email to a journalist.

Journalist profile:
- Name: [first name]
- Publication: [outlet name]
- Beat they cover: [their specific coverage area]
- A recent story they wrote that is relevant: [the headline or topic]

My story:
- The headline I want them to write: [the story you'd love to see]
- Why this is newsworthy now: [the timeliness hook]
- The data point or surprising fact that anchors the story: [your lead]
- Who would make a good interview source (besides me): [third parties]

Rules:
- Subject line: write it as a news headline, not a pitch
- Under 150 words in the body
- Do NOT attach a press release in the first email
- The first sentence must be about their recent work, not your news
- End with one clear question: "Would this be a fit for [their beat]?"

----------------------------------------------------------------

PROMPT 19 — Thought Leadership Article Outline
Best platform: Claude, ChatGPT
When to use: You have a genuine insight or contrarian view but need help
             structuring it into a publishable article.

Act as an editor at a business publication. Help me structure a thought
leadership article.

My core argument: [the one claim I am making — something you can
disagree with]
My evidence / experience: [what qualifies me to make this argument]
The conventional wisdom I am challenging: [what everyone currently
believes or does]
The reader I am writing for: [job title and their specific context]
Where it will be published: [LinkedIn / Forbes / trade journal / blog]

Produce:
1. A working title with a genuine hook — not "Why X Matters in 2025"
2. The one-sentence thesis I need to prove
3. A 5-section outline where each section heading is a claim, not a
   category (e.g., "Efficiency gains plateau after 6 months" not
   "The Efficiency Problem")
4. The most important counterargument I need to address and where in
   the structure it goes
5. The data point, story, or example I need to find before I can write
   this credibly
6. The one thing this article must NOT do or say

----------------------------------------------------------------

PROMPT 20 — Onboarding Email Sequence Architect
Best platform: Claude
When to use: Your free trial or new user onboarding isn't converting
             and you need a sequence that actually gets people to the
             'aha moment' fast.

Act as a lifecycle marketing strategist. Design a 5-email onboarding
sequence for new users.

Product: [what it does]
The 'aha moment' — the exact thing a user must do or see to understand
the value: [be specific]
Current drop-off point: [where users typically go inactive]
What our best users do in the first 7 days that churners don't:
[the behaviour difference]

Design 5 emails:
Email 1 (send time: immediately): ___
Email 2 (send time: day 1): ___
Email 3 (send time: day 3): ___
Email 4 (send time: day 5): ___
Email 5 (send time: day 7): ___

For each email provide:
- Subject line (two variations: curiosity vs direct)
- The single job this email must do
- The one action the CTA drives toward
- Under 120 words per email body

No corporate tone. No "we noticed you haven't..." guilt trips.
Each email earns the right to be opened by being useful.

----------------------------------------------------------------

PROMPT 21 — Referral Program Designer
Best platform: Claude, ChatGPT
When to use: You want to launch or improve a referral program and need
             a mechanism that actually motivates customers to refer,
             not just a discount code.

Act as a growth strategist. Design a referral program for:

Product: [what you sell]
Customer type: [who your current customers are]
Current NPS or satisfaction level: [if you know it]
What currently stops customers from referring: [your hypothesis]
Budget for incentives: [what you can spend per referred customer]

Design:
1. The referral trigger moment — the precise point in the customer
   journey when to ask for a referral (not at sign-up)
2. The incentive structure — what the referrer gets and what the
   referred person gets, and why this combination works
3. The framing of the ask — the exact language that makes referring
   feel like sharing something valuable, not recruiting
4. The referral mechanism — how it works technically (link, code, name)
5. The one thing that kills most referral programs and how to avoid it

----------------------------------------------------------------

PROMPT 22 — Retention Email for At-Risk Customers
Best platform: Claude
When to use: A customer is showing low engagement signals and you want
             to intervene before they churn — not after.

Write a retention email for a customer who is showing signs of going
inactive before their renewal.

Context:
- Product: [what you sell]
- Customer: [company type, not name]
- Usage signal that flagged them: [e.g., logged in twice last month,
  hasn't used the core feature in 3 weeks]
- Their original reason for buying: [what problem they signed up to solve]
- What success looks like for them: [the outcome they want]

Write an email that:
1. Does NOT mention their low usage or make them feel watched
2. Leads with a genuinely useful resource, tip, or insight relevant
   to their original goal
3. Includes one low-friction offer (a call, a quick audit, a template)
4. Sounds like it was written specifically for them, not broadcast
   to 1,000 people
5. Under 120 words. No header image, no unsubscribe guilt.

----------------------------------------------------------------

PROMPT 23 — Content Repurposing Engine
Best platform: Claude, ChatGPT
When to use: You've created one piece of substantial content and want
             to extract maximum distribution from it.

Act as a content distribution strategist. I just created:
[describe the piece — e.g., a 40-minute podcast episode / a 3,000-word
report / a 45-minute webinar recording]

Topic: [the subject matter]
Key insights from it:
- [insight 1]
- [insight 2]
- [insight 3]

Target audience: [who this was for]
Channels I publish on: [LinkedIn / email / Twitter / YouTube / blog]

Generate a repurposing plan:
1. LinkedIn post — the most surprising or counterintuitive point,
   told as a story (not a listicle), under 200 words
2. Email newsletter intro — the hook that makes subscribers click
   through to the full piece
3. Three tweet-length insights (under 280 chars each, no hashtags)
4. One Reddit-style comment for a relevant community — purely useful,
   zero self-promotion, naturally references the insight
5. One short-form video script hook (under 30 seconds) that creates
   enough tension to watch the full version

----------------------------------------------------------------

PROMPT 24 — Contract Negotiation Prep
Best platform: Claude, ChatGPT
When to use: Before negotiating a contract — vendor, partnership, or
             enterprise customer — and you want maximum leverage.

Act as a commercial lawyer and negotiation strategist. Help me prepare
for the following contract negotiation.

What is being negotiated: [describe the contract type and context]
My position: [buyer / seller / partner]
The other party: [who they are and their likely incentives]
My top 3 priorities in this deal: [what matters most to me]
Their top 3 priorities: [your best read on what they want]
My walkaway point: [what makes this deal not worth doing]
The timeline pressure: [who is more time-pressured — me or them]

Prepare:
1. The opening position I should state (not my real position — my
   anchoring position)
2. The three concessions I can offer that cost me little but appear
   valuable to them
3. The three things I must protect and how to hold firm without
   destroying rapport
4. The clause or term they will push hardest on and my response strategy
5. One question I can ask early that reveals their true priorities
   without revealing mine

----------------------------------------------------------------

PROMPT 25 — Partnership Proposal Email
Best platform: Claude
When to use: Approaching a potential business partner — referral partner,
             co-marketing partner, distribution partner — for the first
             time.

Write a partnership proposal email.

Who I am approaching: [company and their role/business]
What they do: [their product or service]
My company: [what I do]
Our audience overlap: [who we both serve]
The specific partnership I'm proposing: [referral / co-marketing /
integration / distribution]
What's in it for them — concretely: [the value they get, in their
terms, not mine]
What I'm asking for first: [not the full partnership — the first small
step]

Rules:
- Subject line must make the value for them clear in under 8 words
- First sentence is about them, not me
- The proposal is specific — not "let's explore synergies"
- The ask is one small, easy next step
- Under 150 words
- No "I wanted to reach out" — ever

----------------------------------------------------------------

PROMPT 26 — Decision Clarity Framework
Best platform: Claude
When to use: You're stuck on a major business decision and keep going
             in circles — you need structured external pressure.

I am stuck on the following decision and need to get unstuck.

The decision: [describe the choice you're facing]
The options I'm weighing:
- Option A: [describe]
- Option B: [describe]
- Option C (if there is one): [describe or write "stay the course"]
What I've told myself the pros and cons are: [your current analysis]
What is actually stopping me from deciding: [your honest answer]
The deadline by which this must be decided: [the date]

Act as a direct advisor — not a coach who asks questions. Tell me:
1. What my stated reasoning is hiding about my real hesitation
2. Which option I should choose and why — based on the information given
3. What information I am missing that is actually decision-relevant
4. The question I need to answer before I can decide with confidence
5. What deciding in 48 hours versus 30 days actually costs me

Do not hedge. Give me a view.

----------------------------------------------------------------

PROMPT 27 — Difficult Conversation Prep
Best platform: Claude, ChatGPT
When to use: Before a hard conversation — letting someone go, addressing
             a performance issue, pushing back on a board member,
             confronting a co-founder.

Help me prepare for a difficult conversation.

Who it's with: [their role and relationship to me]
What the conversation is about: [the core issue]
What I want to achieve by the end of it: [the outcome, not the process]
What I am afraid will happen: [your real fear]
What I have been avoiding saying directly: [the thing you haven't
said yet]
How they are likely to respond: [your honest read]

Prepare me with:
1. The opening sentence — the exact words I say to begin, that name
   the issue directly without attacking them
2. The three points I must land, in order, regardless of their response
3. What to do if they get defensive or emotional
4. The line I must not cross — the thing I could say that would make
   this worse
5. How to close the conversation with a clear next step, whether it
   goes well or badly

----------------------------------------------------------------

PROMPT 28 — All-Hands Meeting Script
Best platform: Claude
When to use: Addressing your team about a major change — restructure,
             pivot, bad news, or big transition — and you need to get
             this right.

Write an all-hands meeting script for the following:

What I need to announce: [the change or news]
Why this is happening: [the real reason — not the PR version]
What it means for the team: [the actual impact on people]
What I genuinely don't know yet: [the honest unknowns]
What I need from the team: [the ask]
The emotion in the room I'm expecting: [anxiety / excitement /
resistance / confusion]

Script structure:
1. Opening — name the situation directly, no warm-up, no agenda slide
2. The 'why' — one honest paragraph. Not mission-speak.
3. What is changing and what is not changing — explicitly stated
4. What I don't know — say it before they ask
5. What I need from them in the next 2 weeks
6. Q&A prompt — not "any questions?" — a question that invites real ones

Tone: leader who has made a decision and is being straight about it.
Not a politician. Not a cheerleader. A person.

----------------------------------------------------------------

PROMPT 29 — Upsell Email Without Feeling Like an Upsell
Best platform: Claude
When to use: A customer is ready to be upgraded but you don't want to
             send a discount-blast or a pushy pitch.

Write an upsell email that doesn't read like an upsell.

Customer context:
- What they're currently on: [plan / tier / package]
- How long they've been a customer: [months]
- Usage signal that shows they've hit a limit: [the specific behaviour]
- What the next tier unlocks for them: [the specific capability]
- Their goal as a customer: [what they're trying to accomplish overall]

Rules:
- Frame the email around their goal, not the product feature
- Name the limitation they've hit before mentioning the upgrade
- One sentence maximum on what the upgrade is
- The CTA is a conversation or a trial, not a "buy now"
- Under 100 words
- Zero urgency tactics — no "offer expires" language

----------------------------------------------------------------

PROMPT 30 — QBR (Quarterly Business Review) Narrative
Best platform: Claude, ChatGPT
When to use: Preparing for a QBR with an enterprise customer — you
             need to tell a story with data, not just present slides.

Act as a senior customer success manager. Write the narrative for a QBR.

Customer: [company type]
Time period reviewed: [Q1/Q2/Q3/Q4 + year]
What they were trying to achieve when they bought: [their original goal]
What the data shows:
- Metric 1: [figure and what it means]
- Metric 2: [figure and what it means]
- Metric 3: [figure and what it means]
Where results fell short of expectations: [honest]
What we've done about it: [actions taken]
The renewal / expansion conversation we need to have: [what's at stake]

Write:
1. The opening narrative — 3 sentences that frame the quarter in terms
   of their business outcomes, not our product usage
2. The 'what worked' section in their language, not ours
3. The 'where we need to do better' section — honest, not defensive,
   with specific next steps
4. The forward look — what the next quarter focuses on and why
5. The renewal / expansion bridge — how to transition without it
   feeling like a sales pitch in the room

----------------------------------------------------------------

PROMPT 31 — Market Entry Decision Framework
Best platform: Claude, Gemini
When to use: Evaluating whether to enter a new market, geography,
             or customer segment before committing resources.

Act as a market strategy advisor. Help me evaluate whether to enter
the following opportunity.

Market or segment: [describe the new market]
Why we're considering it: [the pull — what makes it attractive]
Our current business: [what we do and who we serve today]
Our relevant assets: [what we already have that would help]
Our gaps: [what we would need to build or acquire]

Evaluate using:
1. Market attractiveness — size, growth, competitive intensity,
   customer accessibility
2. Strategic fit — how natural is this for us vs how much of a stretch?
3. Resource requirement — what does entry actually cost in time, money,
   and attention?
4. Risk profile — what are the top 3 ways this goes badly?
5. Opportunity cost — what does NOT entering cost us?
6. The 'kill the idea' test — one scenario where this is a clear no
7. Your recommendation: enter, delay, or abandon — with the one
   condition that would change your answer

----------------------------------------------------------------

PROMPT 32 — Customer Interview Question Designer
Best platform: Claude
When to use: Running customer discovery interviews and wanting questions
             that surface real insights, not socially acceptable answers.

Act as a UX researcher and customer discovery expert. Design an
interview guide for the following research goal.

What I want to understand: [the core question — e.g., why customers
don't upgrade / what makes them choose a competitor / what jobs they
actually hire this product to do]
My assumptions I want to test: [what you think you already know]
Customer type being interviewed: [the profile]
Interview length: [30 / 45 / 60 minutes]

Design:
1. The warm-up question that gets them talking about themselves,
   not your product (first 5 minutes)
2. Five core questions that get to the truth — each question targets
   behaviour, not opinion ("Tell me about the last time..." not
   "Would you ever...")
3. The one follow-up probe to every answer ("And then what happened?
   / How did that feel? / Who else was involved?")
4. The question I should avoid — the one that sounds useful but
   produces biased answers
5. The closing question that surfaces what they wouldn't say unprompted
6. How to end the interview so they want to talk again

----------------------------------------------------------------

PROMPT 33 — Trend Signal Scanner
Best platform: Grok, Gemini
When to use: You need to identify emerging signals in your industry
             before they become obvious and the window closes.

Act as a strategic foresight analyst. Scan for early signals of change
in the following context.

My industry: [the sector]
My business: [what you do]
Horizon: [6 months / 1 year / 3 years — pick one]
What I'm watching for: [e.g., new entrants, regulatory shifts, consumer
behaviour changes, technology disruptions, talent market changes]

Identify:
1. Three weak signals — things that are happening at the fringe that
   most incumbents aren't paying attention to yet
2. One strong signal — a change that is already happening that my
   industry hasn't fully adjusted to
3. The player (company, country, or demographic) most likely to
   disrupt this space in the horizon timeframe and what they're doing
4. The assumption my business is built on that this trend most threatens
5. One action I could take in the next 90 days to position ahead of
   these signals rather than react to them later

----------------------------------------------------------------

PROMPT 34 — SWOT That's Actually Useful
Best platform: Claude
When to use: You need a SWOT for a strategy session, board meeting, or
             planning cycle — but the usual SWOT is too vague to act on.

Act as a strategy consultant. Build a decision-enabling SWOT for:

Company / project: [what is being analysed]
Time horizon: [next 12 months / 3 years]
The decision this SWOT must inform: [the actual strategic question]

Rules for each quadrant:
- Strengths: only things that are genuinely differentiated — not "great
  team" or "good product." Be specific and defensible.
- Weaknesses: only weaknesses that materially affect the decision.
  Things we can live with don't count.
- Opportunities: only opportunities we can realistically pursue with
  current or near-term resources.
- Threats: rank them by probability × impact. Not a list of every
  possible bad thing.

Then:
- The single most important SO (strength × opportunity) move
- The single most urgent WT (weakness × threat) risk to mitigate
- The one thing the SWOT reveals that surprised you

----------------------------------------------------------------

PROMPT 35 — Brand Narrative Builder
Best platform: Claude
When to use: Building or rebuilding the founding story of your brand —
             for website About pages, pitch decks, media interviews,
             and new hire onboarding.

Act as a brand narrative strategist. Build the core brand story for:

Company: [name]
What you do: [the functional description]
Who founded it and why: [the origin — not the PR version, the real one]
The moment things got real: [a specific early story — a customer, a
failure, a decision]
What you believe that most of your industry doesn't: [your contrarian
conviction]
Who you serve and why they trust you: [your customer and the bond]
Where you are going: [the ambition]

Build:
1. The one-sentence origin story — the founding moment in human terms
2. The brand belief statement — what you stand for that others don't
   (not your mission statement — something you could put on a wall and
   someone might disagree with)
3. The hero of the story — and it should be the customer, not you
4. The founding story paragraph — 150 words, for the About page
5. The elevator version — 30 seconds, for a podcast intro or event bio
6. The internal version — what you tell new hires on day one that makes
   them proud to work there
`;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const chunks = rawText.split('----------------------------------------------------------------');

const parsedPrompts = chunks.map((chunk, i) => {
  const lines = chunk.trim().split('\n');
  const titleLine = lines.find(l => l.startsWith('PROMPT'));
  if (!titleLine) return null;

  const titleMatch = titleLine.match(/PROMPT \d+\s*—\s*(.*)/);
  const title = titleMatch ? titleMatch[1].trim() : "Unknown Title";

  const bestForLine = lines.find(l => l.startsWith('Best platform:'));
  const platformsStr = bestForLine ? bestForLine.replace('Best platform:', '').trim() : '';
  const platformsMap = {
    'claude': 'claude',
    'chatgpt': 'chatgpt',
    'gemini': 'gemini',
    'grok': 'grok',
    'any': 'any'
  };
  
  const textPlatforms = [];
  const lowerPlatStr = platformsStr.toLowerCase();
  
  Object.keys(platformsMap).forEach(key => {
    if (lowerPlatStr.includes(key)) {
      textPlatforms.push(platformsMap[key]);
    }
  });

  const whenToUseStart = lines.findIndex(l => l.startsWith('When to use:'));
  let useCase = "";
  let promptBodyStartIndex = whenToUseStart + 1;
  if (whenToUseStart !== -1) {
    const useCaseLines = [];
    useCaseLines.push(lines[whenToUseStart].replace('When to use:', '').trim());
    for (let j = whenToUseStart + 1; j < lines.length; j++) {
      if (lines[j].trim() === '') {
        promptBodyStartIndex = j + 1;
        break;
      }
      useCaseLines.push(lines[j].trim());
    }
    useCase = useCaseLines.join(' ').replace(/\s+/g, ' ').trim();
  }

  const promptLines = lines.slice(promptBodyStartIndex);
  const promptBody = promptLines.join('\n').trim();

  let description = useCase;
  if (description.length > 120) {
    description = description.substring(0, 117) + '...';
  }

  return {
    id: 'biz-' + String(i + 10).padStart(3, '0'),
    slug: slugify(title),
    title: title,
    description: description,
    prompt: promptBody,
    category: "business-marketing",
    platforms: textPlatforms.length > 0 ? textPlatforms : ["any"],
    tags: ["business", "marketing", title.split(' ')[0].toLowerCase().replace(/[^a-z0-9]/g, '')],
    difficulty: "intermediate",
    featured: false,
    source: "Community",
    useCase: useCase
  };
}).filter(Boolean);

const existingPath = path.join('d:', 'Prompt', 'newjson', 'business-marketing.json');
let existing = JSON.parse(fs.readFileSync(existingPath, 'utf-8'));

for (const p of parsedPrompts) {
  if (!existing.some(e => e.slug === p.slug)) {
    existing.push(p);
  }
}

fs.writeFileSync(existingPath, JSON.stringify(existing, null, 2));
console.log('Added ' + parsedPrompts.length + ' prompts. Total is now ' + existing.length + '.');

const catPath = path.join('d:', 'Prompt', 'newjson', 'categories.json');
const cats = JSON.parse(fs.readFileSync(catPath, 'utf-8'));
const catObj = cats.find(c => c.slug === 'business-marketing');
if (catObj) {
  catObj.count = existing.length;
}
fs.writeFileSync(catPath, JSON.stringify(cats, null, 2));
console.log('Updated categories.json business-marketing count to ' + existing.length + '.');
