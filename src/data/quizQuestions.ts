
export interface Question {
    id: string;
    category: string;
    question: string;
    options: string[]; // We will shuffle these later
    correctAnswer: number; // Initial index, will be updated after shuffle
    explanation: string;
}

export const questions: Question[] = [
    // --- Project Fundamentals (Harder) ---
    {
        id: 'pf_adv_1',
        category: 'Project Fundamentals',
        question: 'In a matrix organization, which factor largely determines the project manager\'s authority?',
        options: ['The project budget', 'The communication plan', 'The reporting structure between functional and project managers', 'The number of stakeholders'],
        correctAnswer: 2,
        explanation: 'In a matrix organization, the balance of power between functional managers and project managers determines the type of matrix (Weak, Balanced, or Strong) and thus the PM\'s authority.'
    },
    {
        id: 'pf_adv_2',
        category: 'Project Fundamentals',
        question: 'Which of the following is NOT an output of the Direct and Manage Project Work process?',
        options: ['Deliverables', 'Work Performance Data', 'Change Requests', 'Work Performance Reports'],
        correctAnswer: 3,
        explanation: 'Work Performance Reports are an output of "Monitor and Control Project Work", not Direct and Manage. Direct and Manage produces raw Work Performance Data.'
    },
    {
        id: 'pf_adv_3',
        category: 'Project Fundamentals',
        question: 'What distinguishes a Program from a Portfolio?',
        options: ['Programs are temporary; Portfolios are permanent', 'Programs manage dependencies between related projects; Portfolios prioritize strategic alignment', 'Programs consist of only one project', 'Portfolios are managed by the CEO'],
        correctAnswer: 1,
        explanation: 'Programs focus on harmonized management of related projects to achieve benefits not available from managing them individually. Portfolios focus on selecting the right work to align with strategic goals.'
    },
    {
        id: 'pf_adv_4',
        category: 'Project Fundamentals',
        question: 'The "Halo Effect" in recruitment refers to:',
        options: ['Assuming a high performer in one area will be a good Project Manager', 'Hiring based on physical appearance', 'promoting based on seniority', 'The tendency for team morale to drop after a project closes'],
        correctAnswer: 0,
        explanation: 'The Halo Effect is a cognitive bias where an observer\'s overall impression of a person influences their feelings and thoughts about that person\'s character (e.g., "Good coder = Good Manager").'
    },
    {
        id: 'pf_adv_5',
        category: 'Project Fundamentals',
        question: 'Which project lifecycle model is best suited for projects where requirements are well-understood and unlikely to change?',
        options: ['Adaptive (Agile)', 'Iterative', 'Predictive (Waterfall)', 'Hybrid'],
        correctAnswer: 2,
        explanation: 'Predictive (Waterfall) lifecycles are optimal when scope, schedule, and cost can be determined early and changes are minimal.'
    },

    // --- Agile & Scrum (Harder) ---
    {
        id: 'as_adv_1',
        category: 'Agile & Scrum',
        question: 'In Scrum, who has the authority to cancel a Sprint?',
        options: ['The Scrum Master', 'The Product Owner', 'The Development Team', 'The Stakeholders'],
        correctAnswer: 1,
        explanation: 'Only the Product Owner has the authority to cancel a Sprint, although they may do so under influence from the stakeholders, team, or Scrum Master.'
    },
    {
        id: 'as_adv_2',
        category: 'Agile & Scrum',
        question: 'Which of the following is NOT an official Scrum Artifact?',
        options: ['Product Backlog', 'Sprint Backlog', 'Burndown Chart', 'Increment'],
        correctAnswer: 2,
        explanation: 'The Burndown Chart is a common monitoring tool, but it is NOT one of the three official Scrum Artifacts (Product Backlog, Sprint Backlog, Increment).'
    },
    {
        id: 'as_adv_3',
        category: 'Agile & Scrum',
        question: 'What creates the "Cone of Uncertainty"?',
        options: ['Poor estimation techniques', 'Lack of team skills', 'The natural evolution of variability over time in a project', 'Stakeholder interference'],
        correctAnswer: 2,
        explanation: 'The Cone of Uncertainty describes the reduction of uncertainty/variability as the project progresses and more details become known.'
    },
    {
        id: 'as_adv_4',
        category: 'Agile & Scrum',
        question: 'When does a Development Team finish a User Story?',
        options: ['When all code is written', 'When it passes QA', 'When it meets the Definition of Done', 'When the Sprint ends'],
        correctAnswer: 2,
        explanation: 'A User Story is considered finished only when it meets the agreed-upon Definition of Done (DoD).'
    },
    {
        id: 'as_adv_5',
        category: 'Agile & Scrum',
        question: 'MoSCoW prioritization stands for:',
        options: ['Money, Scope, Cost, Work', 'Must have, Should have, Could have, Won\'t have', 'Month, Schedule, Cost, Week', 'Manage, Organize, Schedule, Control, Work'],
        correctAnswer: 1,
        explanation: 'MoSCoW is a prioritization technique: Must have, Should have, Could have, and Won\'t have (this time).'
    },

    // --- Risk Management (Harder) ---
    {
        id: 'rm_adv_1',
        category: 'Risk Management',
        question: 'You decide to buy insurance for a specific project risk. Which risk response strategy are you using?',
        options: ['Avoid', 'Mitigate', 'Transfer', 'Accept'],
        correctAnswer: 2,
        explanation: 'Transfer involve shifting the impact of a threat to a third party, together with ownership of the response (e.g., insurance, warranties).'
    },
    {
        id: 'rm_adv_2',
        category: 'Risk Management',
        question: 'Sensitivity Analysis is often represented by which diagram?',
        options: ['Decision Tree', 'Tornado Diagram', 'Fishbone Diagram', 'Scatter Plot'],
        correctAnswer: 1,
        explanation: 'A Tornado Diagram is a bar chart used in sensitivity analysis to compare the relative importance of variables.'
    },
    {
        id: 'rm_adv_3',
        category: 'Risk Management',
        question: 'What is the purpose of a Monte Carlo analysis?',
        options: ['To identify the root cause of a defect', 'To calculate the exact project cost', 'To simulate thousands of possible outcomes to predict probability', 'To prioritize stakeholders'],
        correctAnswer: 2,
        explanation: 'Monte Carlo simulation performs risk analysis by building models of possible results by substituting a range of values—a probability distribution—for any factor that has inherent uncertainty.'
    },
    {
        id: 'rm_adv_4',
        category: 'Risk Management',
        question: 'Secondary risks are:',
        options: ['Small risks that don\'t matter', 'Risks that arise as a direct result of implementing a risk response', 'Risks incorrectly identified', 'Risks owned by secondary stakeholders'],
        correctAnswer: 1,
        explanation: 'Secondary risks are new risks that are created by the implementation of a risk response strategy for a primary risk.'
    },

    // --- Stakeholder Management (Harder) ---
    {
        id: 'sm_adv_1',
        category: 'Stakeholder Management',
        question: 'Salience Model classifies stakeholders based on:',
        options: ['Power, Interest, Influence', 'Power, Urgency, Legitimacy', 'Influence, Impact, Attitude', 'Role, Responsibility, Authority'],
        correctAnswer: 1,
        explanation: 'The Salience Model describes stakeholders based on three attributes: Power (ability to impose will), Urgency (need for immediate attention), and Legitimacy (appropriateness of their involvement).'
    },
    {
        id: 'sm_adv_2',
        category: 'Stakeholder Management',
        question: 'What is the key difference between "Managing" and "Monitoring" stakeholder engagement?',
        options: ['Managing is active; Monitoring is passive scope', 'Managing focuses on obtaining support; Monitoring focuses on evaluating strategy efficiency', 'Managing is for external; Monitoring is for internal', 'They are synonyms'],
        correctAnswer: 1,
        explanation: 'Manage Stakeholder Engagement involves communicating and working with stakeholders to meet their needs. Monitor Stakeholder Engagement is about evaluating stakeholder relationships and tailoring strategies.'
    },

    // --- Tools & Techniques (Harder) ---
    {
        id: 'tt_adv_1',
        category: 'Tools & Techniques',
        question: 'Which estimation technique uses a weighted average of Optimistic, Pessimistic, and Most Likely estimates?',
        options: ['Analogous Estimating', 'Parametric Estimating', 'PERT (Program Evaluation and Review Technique)', 'Bottom-up Estimating'],
        correctAnswer: 2,
        explanation: 'PERT uses a weighted average (Beta distribution: (O + 4M + P) / 6) to account for uncertainty in estimates.'
    },
    {
        id: 'tt_adv_2',
        category: 'Tools & Techniques',
        question: 'Calculate the Schedule Variance (SV) if EV = 1000 and PV = 1200.',
        options: ['200', '-200', '0.83', '1.2'],
        correctAnswer: 1,
        explanation: 'Schedule Variance (SV) = Earned Value (EV) - Planned Value (PV). 1000 - 1200 = -200. (Negative means behind schedule).'
    },
    {
        id: 'tt_adv_3',
        category: 'Tools & Techniques',
        question: 'What does a CPI (Cost Performance Index) of 0.8 indiccate?',
        options: ['Project is under budget', 'Project is over budget', 'Project is ahead of schedule', 'Project is behind schedule'],
        correctAnswer: 1,
        explanation: 'CPI = EV / AC. A value less than 1.0 indicates cost overrun (you are getting 80 cents of value for every dollar spent).'
    },

    // --- Leadership (Harder) ---
    {
        id: 'lc_adv_1',
        category: 'Leadership & Communication',
        question: 'According to Tuckman\'s ladder, which stage is characterized by conflict and competition as team members define their roles?',
        options: ['Forming', 'Storming', 'Norming', 'Performing'],
        correctAnswer: 1,
        explanation: 'Storming is the stage where conflict arises as team members push against boundaries and define their places in the team structure.'
    },
    {
        id: 'lc_adv_2',
        category: 'Leadership & Communication',
        question: 'Which conflict resolution technique results in a "Lose-Lose" situation?',
        options: ['Collaborate/Problem Solve', 'Compromise/Reconcile', 'Avoid/Withdraw', 'Force/Direct'],
        correctAnswer: 2,
        explanation: 'Avoid/Withdraw retreats from the conflict situation, resolving nothing. Both parties lose because the issue festers and remains unresolved.'
    },

    // --- Existing Basics (Mixed in for balance) ---
    { id: 'pf1', category: 'Project Fundamentals', question: 'What is the primary constraint in the project management triple constraint?', options: ['Scope, Time, Cost', 'Risk, Quality, Resources', 'People, Process, Technology', 'Plan, Execute, Close'], correctAnswer: 0, explanation: 'The triple constraint (also known as the iron triangle) consists of Scope, Time, and Cost.' },
    { id: 'as1', category: 'Agile & Scrum', question: 'What is the typical length of a Sprint in Scrum?', options: ['1-2 days', '1-4 weeks', '1-3 months', '6 months'], correctAnswer: 1, explanation: 'Sprints in Scrum are typically 1-4 weeks long, with 2 weeks being the most common duration.' },
    { id: 'sm1', category: 'Stakeholder Management', question: 'Who is a project stakeholder?', options: ['Only the project sponsor', 'Anyone affected by or affecting the project', 'Team members only', 'Customers only'], correctAnswer: 1, explanation: 'A stakeholder is anyone who is affected by or can affect the project.' },
    { id: 'lc1', category: 'Leadership & Communication', question: 'What is servant leadership?', options: ['Commanding the team', 'Leading by serving the team\'s needs', 'Delegating all decisions', 'Avoiding team conflict'], correctAnswer: 1, explanation: 'Servant leadership focuses on serving the team by removing obstacles and enabling success.' },

    // --- Situational & Scenario Based (New Batch) ---
    {
        id: 'sit_1',
        category: 'Project Fundamentals',
        question: 'Your project is running behind schedule. The sponsor asks you to "fast track" the project. What do you do?',
        options: ['Add more resources to critical path tasks', 'Perform activities in parallel that were originally planned sequentially', 'Reduce the scope of the project', 'Cut quality checks to save time'],
        correctAnswer: 1,
        explanation: 'Fast Tracking involves performing activities in parallel that were originally planned sequentially. Crashing involves adding resources.'
    },
    {
        id: 'sit_2',
        category: 'Leadership & Communication',
        question: 'Two senior developers are arguing about the best architectural approach, stalling progress. As the PM, what is the best immediate conflict resolution strategy?',
        options: ['Force them to choose one approach immediately', 'Withdraw and let them sort it out', 'Collaborate/Problem Solve: Facilitate a session to analyze pros/cons of both', 'Smooth/Accommodate: Agree with the most senior developer'],
        correctAnswer: 2,
        explanation: 'Collaborate/Problem Solve is the best long-term strategy. It involves treating the conflict as a problem to be solved by examining alternatives and requires a give-and-take attitude.'
    },
    {
        id: 'sit_3',
        category: 'Agile & Scrum',
        question: 'During the Daily Scrum, a team member reports they are blocked by an external dependency. What should the Scrum Master do?',
        options: ['Tell the team member to work harder', 'Wait until the Sprint Retrospective to discuss it', 'Take ownership of removing the impediment immediately', 'Ask the Product Owner to remove it'],
        correctAnswer: 2,
        explanation: 'The Scrum Master is responsible for removing impediments that hinder the Development Team\'s progress.'
    },
    {
        id: 'sit_4',
        category: 'Stakeholder Management',
        question: 'A key stakeholder who was previously supportive has started criticizing the project in public meetings. What should you do first?',
        options: ['Ignore them and focus on supportive stakeholders', 'Report them to their manager', 'Schedule a private meeting to understand their concerns and root cause', 'Criticize them back in the next meeting'],
        correctAnswer: 2,
        explanation: 'The best approach is to engage the stakeholder privately to understand the reason for their change in attitude (Understand -> Analyze -> Act).'
    },
    {
        id: 'sit_5',
        category: 'Risk Management',
        question: 'You identify a risk that a key vendor might go bankrupt. You decide to hire a second vendor as a backup, even though it costs more. This is an example of:',
        options: ['Risk Avoidance', 'Risk Mitigation', 'Risk Acceptance', 'Risk Transfer'],
        correctAnswer: 1,
        explanation: 'This is Risk Mitigation. You are taking action to reduce the *impact* of the risk (by having a backup) even if the probability remains the same.'
    },
    {
        id: 'sit_6',
        category: 'Project Fundamentals',
        question: 'The client requests a change that will add significant value but will delay the project by 2 weeks. The project deadline is fixed. What do you do?',
        options: ['Reject the change immediately', 'Accept the change and hope to make up time later', 'Analyze the impact and present options (e.g., descoping other features) to the Change Control Board', 'Implement the change without telling anyone'],
        correctAnswer: 2,
        explanation: 'Always analyze the impact first, then present options to the decision-makers (Change Control Board or Sponsor) for approval.'
    },
    {
        id: 'sit_7',
        category: 'Agile & Scrum',
        question: 'The Product Owner keeps adding new requirements in the middle of a Sprint. How should the Scrum Master handle this?',
        options: ['Allow the changes to keep the customer happy', 'Remind the PO that the Sprint Scope is fixed, and add new items to the Product Backlog for future Sprints', 'Ask the team to work overtime', 'Cancel the Sprint'],
        correctAnswer: 1,
        explanation: 'Scope is fixed during a Sprint to allow the team to focus. New requirements should go to the Product Backlog for prioritization in the next Sprint Planning.'
    },
    {
        id: 'sit_8',
        category: 'Tools & Techniques',
        question: 'Your team says they can\'t estimate a complex User Story because the requirements are vague. What is the best Agile technique to use?',
        options: ['Guess and add a buffer', 'Spike', 'Use the average of previous stories', 'Assign it to the senior developer'],
        correctAnswer: 1,
        explanation: 'A "Spike" is a time-boxed investigation task used to reduce uncertainty or learn enough to estimate a story.'
    },
    {
        id: 'sit_9',
        category: 'Leadership & Communication',
        question: 'You notice a team member is consistently quiet in meetings but delivers high-quality work. You want their input in brainstorming. What do you do?',
        options: ['Call them out publicly in the meeting', 'Assume they have nothing to add', 'Use techniques like "Round Robin" or "Brainwriting" to encourage inclusive participation', 'Tell them via email they need to talk more'],
        correctAnswer: 2,
        explanation: 'Inclusive techniques like Round Robin ensure everyone has a structured opportunity to speak without the pressure of fighting for airtime.'
    },
    {
        id: 'sit_10',
        category: 'Project Fundamentals',
        question: 'You are taking over a project midway. The previous PM left no documentation. What is your FIRST priority?',
        options: ['Create a new project plan from scratch', 'Identify and meet with key stakeholders to understand the current state and expectations', 'Start executing tasks immediately', 'Audit the budget'],
        correctAnswer: 1,
        explanation: 'Stakeholders hold the knowledge and expectations. Meeting them is crucial to understand the "Ground Truth" when documentation is missing.'
    },
    {
        id: 'sit_11',
        category: 'Risk Management',
        question: 'A identified risk has occurred. It is not in the Risk Register. What do you do?',
        options: ['Panic', 'Create a workaround and ignore the documentation', 'Update the Risk Register and Issue Log, then analyze and implement a response', 'Blame the risk manager'],
        correctAnswer: 2,
        explanation: 'Unidentified risks that occur become Issues. You must document them, analyze them, and determining a response (workaround).'
    },
    {
        id: 'sit_12',
        category: 'Agile & Scrum',
        question: 'The Development Team fails to deliver the committed stories for the third Sprint in a row. What should be discussed in the Retrospective?',
        options: ['Who is to blame', 'Reducing the Definition of Done', 'The root causes of over-commitment and how to improve estimation accuracy', 'Extending the Sprint duration'],
        correctAnswer: 2,
        explanation: 'The focus should be on process improvement—understanding *why* estimates are off (e.g., interruptions, unclear requirements) and adapting.'
    },
    {
        id: 'sit_13',
        category: 'Stakeholder Management',
        question: 'A stakeholder sends you an email asking for a "small" change to the report format. It will take 2 hours. What do you do?',
        options: ['Just do it, it\'s small', 'Tell them to submit a formal Change Request', 'Assess if it affects the baseline; if negligible, do it but document it; if impactful, follow Change Control', 'Ignore it'],
        correctAnswer: 2,
        explanation: 'For very small changes (Gold Plating avoidance aside), if it doesn\'t affect baselines, you might do it but document it. However, strict PMBOK says follow Change Control. The best practical answer is assessing impact first.'
    },
    {
        id: 'sit_14',
        category: 'Project Fundamentals',
        question: 'The project status is "Green" (On Track), but the CPI is 0.85 and SPI is 0.9. What is the reality?',
        options: ['The project is actually doing well', 'The project is over budget and behind schedule', 'The project is under budget and ahead of schedule', 'The status report is accurate'],
        correctAnswer: 1,
        explanation: 'CPI < 1 (Over Budget) and SPI < 1 (Behind Schedule). The "Green" status is misleading or subjective.'
    },
    {
        id: 'sit_15',
        category: 'Leadership & Communication',
        question: 'Your team is geographically distributed. Misunderstandings are frequent. What is the most effective change?',
        options: ['Send more detailed emails', 'Implement mandatory daily video calls (Daily Standups) to increase face-to-face interaction', 'Travel to each location monthly', 'Appoint a local manager'],
        correctAnswer: 1,
        explanation: 'Increasing high-bandwidth communication (video/face-to-face) is the best way to reduce misunderstandings in distributed teams.'
    },
    {
        id: 'sit_16',
        category: 'Agile & Scrum',
        question: 'The Product Owner is unavailable for questions during the Sprint. The team is blocked on clarification. What happens?',
        options: ['The team guesses and proceeds', 'The Scrum Master acts as the PO', 'The risk of building the wrong thing increases, effectively reducing value', 'The Sprint is paused'],
        correctAnswer: 2,
        explanation: ' PO availability is critical. If they are absent, the team creates waste by potentially building the wrong thing.'
    },
    {
        id: 'sit_17',
        category: 'Tools & Techniques',
        question: 'You have a project with high uncertainty and undefined scope. Which contract type is best for the buyer to minimize their risk?',
        options: ['Fixed Price', 'Time and Materials (T&M)', 'Cost Plus Fixed Fee (CPFF)', 'Cost Plus Percentage of Cost'],
        correctAnswer: 1,
        explanation: 'This is a trick! Fixed Price transfers risk to the seller, but if scope is undefined, sellers will pad it huge. T&M is often used for undefined scope, but the BUYER takes the risk of cost growth. Ideally, T&M with a "Not To Exceed" cap.'
    },
    {
        id: 'sit_18',
        category: 'Risk Management',
        question: 'A team member tells you they are 90% done with a task. They have been 90% done for 3 weeks. This is typical of:',
        options: ['The Student Syndrome', 'Parkinson\'s Law', 'The 90/10 Rule', 'Gold Plating'],
        correctAnswer: 2,
        explanation: 'The "90% Done Syndrome" refers to the tendency for the last 10% of work (testing, polish, integration) to take as long as the first 90%.'
    },
    {
        id: 'sit_19',
        category: 'Project Fundamentals',
        question: 'Your project depends on a deliverable from another project which is delayed. This dependency is:',
        options: ['Discretionary', 'Mandatory', 'External', 'Internal'],
        correctAnswer: 2,
        explanation: 'An External dependency involves a relationship between project activities and non-project activities (or other projects).'
    },
    {
        id: 'sit_20',
        category: 'Leadership & Communication',
        question: 'You are leading a cross-functional team where members report to different functional managers. You have limited authority. What power do you rely on most?',
        options: ['Legitimate Power', 'Coercive Power', 'Referent and Expert Power', 'Reward Power'],
        correctAnswer: 2,
        explanation: 'In weak matrixes, PMs rely on Expert Power (knowledge) and Referent Power (relationships/charisma) to influence without authority.'
    },
    {
        id: 'sit_21',
        category: 'Project Fundamentals',
        question: 'A project is completed, and deliverables are accepted. What is the very last thing the Project Manager must do?',
        options: ['Release the team', 'Lesson Learned Session', 'Close Procurements', 'Update OPA (Organizational Process Assets)'],
        correctAnswer: 0,
        explanation: 'Releasing resources is typically the final step of project closure, after all admin, archives, and retrospectives are done.'
    },
    {
        id: 'sit_22',
        category: 'Agile & Scrum',
        question: 'The team completes 30 story points in Sprint 1, 40 in Sprint 2, and 20 in Sprint 3. What is the estimated velocity for Sprint 4?',
        options: ['30', '40', '20', '90'],
        correctAnswer: 0,
        explanation: 'A common technique is averaging. (30+40+20)/3 = 30.'
    },
    {
        id: 'sit_23',
        category: 'Stakeholder Management',
        question: 'You have a large group of stakeholders with low power and low interest. How do you manage them?',
        options: ['Manage Closely', 'Keep Informed', 'Keep Satisfied', 'Monitor'],
        correctAnswer: 3,
        explanation: 'Low Power/Low Interest = Monitor. Keep an eye on them in case their status changes, but don\'t overwhelm them (or yourself) with communication.'
    },
    {
        id: 'sit_24',
        category: 'Risk Management',
        question: 'What is the "trigger condition" for a risk?',
        options: ['The person responsible for the risk', 'The cost of the risk', 'An event or situation that indicates a risk is about to occur or has occurred', 'The fallback plan'],
        correctAnswer: 2,
        explanation: 'A trigger is an early warning sign or event that activates the implementation of the risk response plan.'
    },
    {
        id: 'sit_25',
        category: 'Tools & Techniques',
        question: 'You are using "Planning Poker". What is the primary benefit?',
        options: ['It is fun', 'It creates an exact estimate', 'It creates a shared understanding of the requirements through discussion', 'It is faster than expert judgment'],
        correctAnswer: 2,
        explanation: 'The conversation generated when estimates differ (e.g., one person says 3, another says 13) reveals hidden assumptions and creates shared understanding.'
    },
    {
        id: 'sit_26',
        category: 'Leadership & Communication',
        question: 'A team member makes a mistake that delays the project. In the status meeting, you:',
        options: ['Blame the team member by name', 'Take responsibility as the PM (protect the team) and discuss root cause privately', 'Reschedule the deadline quietly', 'Fire the team member'],
        correctAnswer: 1,
        explanation: 'Good leaders take the blame externally protects the team) and give credit to the team. Address performance issues privately.'
    },
    {
        id: 'sit_27',
        category: 'Agile & Scrum',
        question: 'The MVP (Minimum Viable Product) is:',
        options: ['The final product', 'The rawest prototype possible', 'The smallest version of the product that delivers value and generates learning', 'A beta version'],
        correctAnswer: 2,
        explanation: 'MVP is about maximizing learning with minimum effort. It must be usable enough to provide feedback.'
    },
    {
        id: 'sit_28',
        category: 'Project Fundamentals',
        question: 'Which of these is a "hard" constraint?',
        options: ['"We should try to finish by June"', '"The marketing campaign must launch on Sept 1st for the holiday season"', '"It would be nice to have this feature"', '"We have about $50k"'],
        correctAnswer: 1,
        explanation: 'A fixed date driven by external events (holidays, regulations) is a Hard Constraint.'
    },
    {
        id: 'sit_29',
        category: 'Project Fundamentals',
        question: 'Gold Plating is:',
        options: ['Using expensive materials', 'Adding extra features not in the scope to please the customer', 'Delivering early', 'Winning an award'],
        correctAnswer: 1,
        explanation: 'Gold Plating is adding features not requested. It adds risk and cost without approval and is generally discouraged.'
    },
    {
        id: 'sit_30',
        category: 'Tools & Techniques',
        question: 'Which chart is best for tracking the root cause of a defect?',
        options: ['Control Chart', 'Ishikawa (Fishbone) Diagram', 'Pareto Chart', 'Run Chart'],
        correctAnswer: 1,
        explanation: 'Ishikawa diagrams are designed to trace a problem back to its root causes (Man, Machine, Material, Method, etc.).'
    },

    // --- Advanced Process & Integration (New Batch) ---
    {
        id: 'proc_1',
        category: 'Project Fundamentals',
        question: 'Which process group contains the "Manage Communications" process?',
        options: ['Planning', 'Executing', 'Monitoring and Controlling', 'Closing'],
        correctAnswer: 1,
        explanation: 'Manage Communications is an Executing process. It involves creating and distributing information. Monitor Communications is Monitoring & Controlling.'
    },
    {
        id: 'proc_2',
        category: 'Agile & Scrum',
        question: 'Refinement (Grooming) of the Product Backlog should consume no more than what percentage of the Sprint capacity?',
        options: ['5%', '10%', '20%', '50%'],
        correctAnswer: 1,
        explanation: 'Scrum Guide suggests (though no longer mandates exact %) that Refinement usually takes about 10% of the Development Team\'s capacity.'
    },
    {
        id: 'proc_3',
        category: 'Risk Management',
        question: 'The "Watch List" is for:',
        options: ['High priority risks', 'Low priority risks', 'Issues that have occurred', 'Stakeholders to watch'],
        correctAnswer: 1,
        explanation: 'Low priority risks are placed on a Watch List and monitored periodically to see if their status changes.'
    },
    {
        id: 'proc_4',
        category: 'Stakeholder Management',
        question: 'Which document contains the "Stakeholder Engagement Assessment Matrix"?',
        options: ['Stakeholder Register', 'Stakeholder Engagement Plan', 'Communications Management Plan', 'Project Charter'],
        correctAnswer: 1,
        explanation: 'The Stakeholder Engagement Plan contains the strategies and the assessment matrix (Current vs Desired engagement levels).'
    },
    {
        id: 'proc_5',
        category: 'Tools & Techniques',
        question: 'What is the formula for Pert Beta Distribution?',
        options: ['(O + M + P) / 3', '(O + 4M + P) / 6', '(P - O) / 6', 'EV / AC'],
        correctAnswer: 1,
        explanation: 'PERT Beta distribution gives more weight to the Most Likely estimate: (Optimistic + 4*MostLikely + Pessimistic) / 6.'
    },
    {
        id: 'proc_6',
        category: 'Leadership & Communication',
        question: 'Which communication method is "Push" communication?',
        options: ['Intranet sites', 'Emails and Memos', 'Meetings', 'Phone calls'],
        correctAnswer: 1,
        explanation: 'Push communication is sent to specific recipients (e.g., emails). Pull is placed where people access it (Intranet). Interactive is multidirectional (Meetings).'
    },
    {
        id: 'proc_7',
        category: 'Project Fundamentals',
        question: 'The "To-Complete Performance Index" (TCPI) calculates:',
        options: ['The cost performance needed to finish the project on budget', 'The time needed to finish', 'The total cost at completion', 'The variance at completion'],
        correctAnswer: 0,
        explanation: 'TCPI allows you to calculate the cost performance required for the remaining work to meet a specified management goal (BAC or EAC).'
    },
    {
        id: 'proc_8',
        category: 'Agile & Scrum',
        question: 'Information Radiators are:',
        options: ['Heaters in the office', 'Highly visible displays of project progress/info', 'Confidential reports', 'Emails sent to everyone'],
        correctAnswer: 1,
        explanation: 'Information Radiators (like Kanban boards, Burndown charts) are large, visible displays that "radiate" information to anyone walking by.'
    },
    {
        id: 'proc_9',
        category: 'Risk Management',
        question: 'Quantitative Risk Analysis is performed on:',
        options: ['All risks', 'Risks prioritized by Qualitative Analysis', 'Only financial risks', 'Only schedule risks'],
        correctAnswer: 1,
        explanation: 'Quantitative Analysis is time-consuming and expensive. It is usually performed only on risks prioritized as "High" during Qualitative Analysis.'
    },
    {
        id: 'proc_10',
        category: 'Stakeholder Management',
        question: 'The "Power/Interest Grid" is part of which process?',
        options: ['Identify Stakeholders', 'Plan Stakeholder Engagement', 'Manage Stakeholder Engagement', 'Monitor Stakeholder Engagement'],
        correctAnswer: 0,
        explanation: 'Analyzing stakeholders (Power/Interest) happens during the Identify Stakeholders process.'
    },
    {
        id: 'proc_11',
        category: 'Tools & Techniques',
        question: 'Benchmarking involves:',
        options: ['Comparing actual or planned practices to those of comparable organizations', 'Setting a baseline', 'Measuring against the project plan', 'Marking a bench'],
        correctAnswer: 0,
        explanation: 'Benchmarking compares your project/product practices to those of other projects or organizations to identify best practices and generate ideas for improvement.'
    },
    {
        id: 'proc_12',
        category: 'Project Fundamentals',
        question: 'Which is an Enterprise Environmental Factor (EEF)?',
        options: ['Templates', 'Lessons Learned', 'Government Regulations', 'Historical Data'],
        correctAnswer: 2,
        explanation: 'EEFs are conditions outside the control of the team (Regulations, Market Conditions, Infrastructure). Templates/Lessons Learned are Organizational Process Assets (OPAs).'
    },
    {
        id: 'proc_13',
        category: 'Agile & Scrum',
        question: 'The "Three Pillars" of Scrum are:',
        options: ['Transparency, Inspection, Adaptation', 'Planning, Execution, Monitoring', 'Roles, Events, Artifacts', 'Speed, Quality, Cost'],
        correctAnswer: 0,
        explanation: 'Transparency, Inspection, and Adaptation are the empirical pillars that support the Scrum framework.'
    },
    {
        id: 'proc_14',
        category: 'Leadership & Communication',
        question: '55% of communication is:',
        options: ['Verbal', 'Non-verbal (Body Language)', 'Tone of Voice', 'Written'],
        correctAnswer: 1,
        explanation: 'According to the Mehrabian rule, 55% of communication is body language, 38% is tone, and only 7% is words.'
    },
    {
        id: 'proc_15',
        category: 'Project Fundamentals',
        question: 'Defect Repair is a type of:',
        options: ['Corrective Action', 'Preventive Action', 'Change Request', 'All of the above'],
        correctAnswer: 2,
        explanation: 'Defect Repair is a specific type of Change Request to correct a nonconforming product or product component.'
    },
    {
        id: 'proc_16',
        category: 'Risk Management',
        question: 'Residual Risk is:',
        options: ['The risk remaining after risk responses have been implemented', 'A secondary risk', 'A risk that was accepted', 'A risk that was transferred'],
        correctAnswer: 0,
        explanation: 'Residual risk is the amount of risk left over after you have implemented your mitigation or transfer strategies.'
    },
    {
        id: 'proc_17',
        category: 'Tools & Techniques',
        question: 'Variance Analysis is heavily used in which process group?',
        options: ['Initiating', 'Planning', 'Executing', 'Monitoring and Controlling'],
        correctAnswer: 3,
        explanation: 'Variance Analysis (comparing Planned vs Actual) is the core of Monitoring and Controlling.'
    },
    {
        id: 'proc_18',
        category: 'Stakeholder Management',
        question: 'Stakeholder identification is:',
        options: ['Done only at the start', 'Done only during planning', 'A continuous process throughout the project', 'Done by the sponsor'],
        correctAnswer: 2,
        explanation: 'New stakeholders can emerge at any time. Identification should be continuous.'
    },
    {
        id: 'proc_19',
        category: 'Agile & Scrum',
        question: 'Osmotic Communication refers to:',
        options: ['Information absorbed by overhearing background conversations in a collocated team', 'Written memos', 'Formal presentations', 'Telepathy'],
        correctAnswer: 0,
        explanation: 'Osmotic communication is the useful information that flows between team members in a shared workspace (team room) simply by overhearing.'
    },
    {
        id: 'proc_20',
        category: 'Project Fundamentals',
        question: 'Rolling Wave Planning is a form of:',
        options: ['Progressive Elaboration', 'Predictive Planning', 'Lazy Planning', 'Risk Mitigation'],
        correctAnswer: 0,
        explanation: 'Rolling Wave Planning involves planning near-term work in detail and future work at a higher level, elaborating as time passes.'
    },
    {
        id: 'proc_21',
        category: 'Leadership & Communication',
        question: 'Which conflict resolution technique offers a temporary solution?',
        options: ['Smooth/Accommodate', 'Collaborate', 'Force', 'Withdraw'],
        correctAnswer: 0,
        explanation: 'Smoothing emphasizes agreement and downplays differences. It calms the situation but doesn\'t solve the root cause, making it temporary.'
    },
    {
        id: 'proc_22',
        category: 'Tools & Techniques',
        question: 'A Control Chart shows seven consecutive data points on one side of the mean. This is called:',
        options: ['The Rule of Seven', 'Out of Control', 'A trend', 'Normal variation'],
        correctAnswer: 0,
        explanation: 'The Rule of Seven states that seven consecutive points on one side of the mean indicate a non-random cause (assignable cause) that should be investigated.'
    },
    {
        id: 'proc_23',
        category: 'Agile & Scrum',
        question: 'Technical Debt refers to:',
        options: ['Money owed to vendors', 'The implied cost of additional rework caused by choosing an easy solution now instead of a better approach', 'The cost of software licenses', 'Bugs found in production'],
        correctAnswer: 1,
        explanation: 'Technical Debt captures the concept that taking shortcuts now (like skipping tests or clean design) creates "interest" that must be paid later in rework.'
    },
    {
        id: 'proc_24',
        category: 'Risk Management',
        question: 'Opportunities are:',
        options: ['Positive Risks', 'Negative Risks', 'Not Risks', 'Guaranteed benefits'],
        correctAnswer: 0,
        explanation: 'In modern PM (PMBOK), Risk includes both Threats (negative) and Opportunities (positive events).'
    },
    {
        id: 'proc_25',
        category: 'Project Fundamentals',
        question: 'Fast Tracking increases:',
        options: ['Cost', 'Risk', 'Quality', 'Scope'],
        correctAnswer: 1,
        explanation: 'Fast Tracking (doing things in parallel) increases Risk (of rework, errors). Crashing (adding resources) increases Cost.'
    },
    {
        id: 'proc_26',
        category: 'Project Fundamentals',
        question: 'What is the "benefit-cost ratio" (BCR) if Benefits are $200k and Costs are $100k?',
        options: ['2.0', '0.5', '100k', '$200k'],
        correctAnswer: 0,
        explanation: 'BCR = Benefits / Costs = 200,000 / 100,000 = 2.0. (Changes > 1 are good).'
    },
    {
        id: 'proc_27',
        category: 'Leadership & Communication',
        question: 'Maslow\'s Hierarchy of Needs suggests that you cannot motivate someone with "Self-Actualization" if:',
        options: ['They are already paid well', 'Their lower-level needs (Physiological, Safety) are not met', 'They are a manager', 'They dislike the project'],
        correctAnswer: 1,
        explanation: 'Lower level needs (survival, safety, belonging) must be met before higher level needs (esteem, self-actualization) become motivators.'
    },
    {
        id: 'proc_28',
        category: 'Agile & Scrum',
        question: 'Swarming involves:',
        options: ['The whole team working together on one item to finish it', 'Everyone working on their own tasks', 'Too many meetings', 'Reporting bugs'],
        correctAnswer: 0,
        explanation: 'Swarming is a technique where multiple team members collaborate on the same item to get it to "Done" faster, reducing WIP.'
    },
    {
        id: 'proc_29',
        category: 'Risk Management',
        question: 'Expected Monetary Value (EMV) is calculated as:',
        options: ['Probability x Impact', 'Cost + Profit', 'Budget - Actuals', 'Risk + Contingency'],
        correctAnswer: 0,
        explanation: 'EMV = Probability * Impact. It allows you to calculate the average outcome of uncertain scenarios.'
    },
    {
        id: 'proc_30',
        category: 'Tools & Techniques',
        question: 'Nominal Group Technique is:',
        options: ['Brainstorming with a voting/ranking process', 'Just Brainstorming', 'Voting only', 'A solo activity'],
        correctAnswer: 0,
        explanation: 'Nominal Group Technique follows brainstorming with a voting process to rank the most useful ideas for further brainstorming or prioritization.'
    },
];
