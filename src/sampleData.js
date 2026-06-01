export const sampleProjects = [
  {
    id: "patient-portal",
    title: "Green Valley Health Patient Portal Upgrade",
    description: "Modernizing our legacy healthcare portal to a cloud-based Patient Portal System. The project aims to enable online scheduling, direct secure messaging with clinicians, instant bill pay, and seamless electronic health record (EHR) integration. Critical departments affected include Clinical Operations (who fear schedule disruptions), IT & Cybersecurity (highly sensitive about HIPAA compliance and patient data privacy), Billing & Finance (aiming to reduce administrative overhead), and Patient Relations (pushing for high accessibility and simple mobile-first UX). The executive sponsor is Dr. Helen Vance, Chief Medical Officer, who needs this completed before Q4 audit cycles.",
    stakeholders: [
      {
        id: "sh-01",
        name: "Dr. Helen Vance",
        role: "Chief Medical Officer (CMO) & Executive Sponsor",
        department: "Clinical Operations / Executive",
        power: "High",
        interest: "High",
        x: 88,
        y: 92,
        stance: "Champion",
        strategy: "Maintain tight alignment via bi-weekly brief briefings. Ensure clinical outcomes metrics are central to portal design.",
        frequency: "Bi-weekly"
      },
      {
        id: "sh-02",
        name: "Marcus Thorne",
        role: "Director of Information Security (CISO)",
        department: "IT & Cybersecurity",
        power: "High",
        interest: "High",
        x: 75,
        y: 85,
        stance: "Neutral",
        strategy: "Engage heavily in security architecture reviews. Secure explicit approval on penetration testing and compliance logs early.",
        frequency: "Weekly"
      },
      {
        id: "sh-03",
        name: "Sarah Jenkins",
        role: "Clinical Nurse Manager",
        department: "Clinical Operations",
        power: "Medium",
        interest: "High",
        x: 82,
        y: 65,
        stance: "Resistor",
        strategy: "Conduct dedicated clinical workflow workshops. Alleviate fears of double-booking by demonstrating the automated scheduling guardrails.",
        frequency: "Weekly"
      },
      {
        id: "sh-04",
        name: "Robert Chen",
        role: "VP of Revenue Cycle Management",
        department: "Billing & Finance",
        power: "High",
        interest: "Medium",
        x: 48,
        y: 78,
        stance: "Supporter",
        strategy: "Provide monthly updates on online bill payment flow design. Ensure integration with our payment gateway is prioritized.",
        frequency: "Monthly"
      },
      {
        id: "sh-05",
        name: "Elena Rostova",
        role: "Patient Advocacy Lead",
        department: "Patient Relations",
        power: "Low",
        interest: "High",
        x: 90,
        y: 42,
        stance: "Champion",
        strategy: "Involve in UX/UI feedback loops and accessibility testing groups. Utilize as a positive agent for patient communication campaigns.",
        frequency: "Bi-weekly"
      },
      {
        id: "sh-06",
        name: "David Kross",
        role: "Legacy Systems Developer",
        department: "IT & Operations",
        power: "Medium",
        interest: "Low",
        x: 25,
        y: 52,
        stance: "Resistor",
        strategy: "Acknowledge their historical expertise. Clearly define future state technical support roles and offer cloud migration training.",
        frequency: "Bi-weekly"
      }
    ],
    communicationPlan: [
      {
        id: "cp-01",
        activity: "Project Steering Committee",
        stakeholders: ["Dr. Helen Vance", "Marcus Thorne", "Robert Chen"],
        channel: "Executive Boardroom / Video Conference",
        frequency: "Bi-weekly",
        objective: "Review project milestones, resolve critical dependency blocks, and formally sign off on budget drawdowns."
      },
      {
        id: "cp-02",
        activity: "Clinical Workflow Focus Group",
        stakeholders: ["Sarah Jenkins", "Elena Rostova"],
        channel: "Interactive Workshop & Figma Walkthroughs",
        frequency: "Weekly",
        objective: "Review interface layouts, refine auto-scheduling rules, and ensure patient accessibility features meet standards."
      },
      {
        id: "cp-03",
        activity: "Security & HIPAA Alignment Session",
        stakeholders: ["Marcus Thorne", "David Kross"],
        channel: "Technical Architecture Review Meeting",
        frequency: "Weekly",
        objective: "Conduct security threat modeling, verify encryption protocols for transit and rest, and review compliance documentation."
      },
      {
        id: "cp-04",
        activity: "Operational Progress Dashboard",
        stakeholders: ["All Stakeholders"],
        channel: "Automated Email & Slack Channel Update",
        frequency: "Monthly",
        objective: "Highlight achievements, upcoming milestones, timeline health, and spotlight a featured 'UX Win' to build excitement."
      }
    ],
    riskRegister: [
      {
        id: "rk-01",
        risk: "Clinical staff resistance due to training overhead and feared disruptions to patient scheduling speeds.",
        impact: "High",
        probability: "High",
        mitigation: "Launch clinical peer champions program led by early adopters, and deliver bite-sized micro-learning modules instead of long sessions.",
        owner: "Sarah Jenkins"
      },
      {
        id: "rk-02",
        risk: "Security sign-off delays due to HIPAA review backlog or outstanding penetration testing results.",
        impact: "Critical",
        probability: "Medium",
        mitigation: "Embed dedicated security analyst in the development sprints; prepare documentation incrementally rather than all at the end.",
        owner: "Marcus Thorne"
      },
      {
        id: "rk-03",
        risk: "Integration gaps with the legacy EHR database causing data syncing latency or patient record mismatching.",
        impact: "Critical",
        probability: "Low",
        mitigation: "Establish a dedicated sandbox environment with real-world test profiles; conduct rigorous end-to-end integration tests early.",
        owner: "David Kross"
      },
      {
        id: "rk-04",
        risk: "Low adoption rate among elderly or less tech-savvy patient populations.",
        impact: "Medium",
        probability: "High",
        mitigation: "Implement single sign-on (SSO), support simple SMS-based access codes, and design large, clear fonts matching WCAG 2.1 AAA criteria.",
        owner: "Elena Rostova"
      }
    ]
  },
  {
    id: "crm-consolidation",
    title: "Global CRM Data Standardization & Salesforce Migration",
    description: "Standardizing customer data schemas and migrating our three legacy sales pipelines (Americas, EMEA, APAC) onto a single, cohesive Salesforce Enterprise instance. The goal is to provide a single source of truth for global pipeline reports and contract analytics. Key impacted stakeholders include regional Sales Directors (highly protective of their local pipelines and custom fields), Finance & Commissions teams (requiring accurate transaction histories), and Sales Operations (who will bear the brunt of data cleansing and user retraining). The executive sponsor is VP of Global Sales, Diana Sterling, who demands strict data governance post-migration.",
    stakeholders: [
      {
        id: "sh-201",
        name: "Diana Sterling",
        role: "VP of Global Sales",
        department: "Global Sales Leadership",
        power: "High",
        interest: "High",
        x: 92,
        y: 95,
        stance: "Champion",
        strategy: "Provide concise dashboard views of milestone achievements. Escalate regional alignment challenges to her attention early.",
        frequency: "Weekly"
      },
      {
        id: "sh-202",
        name: "Jean-Pierre Laurent",
        role: "EMEA Sales Director",
        department: "Sales (Europe)",
        power: "High",
        interest: "High",
        x: 80,
        y: 82,
        stance: "Resistor",
        strategy: "Acknowledge localization requirements (GDPR and currency conversions). Showcase how unified reporting decreases their manual Excel forecasting time.",
        frequency: "Bi-weekly"
      },
      {
        id: "sh-203",
        name: "Akiro Tanaka",
        role: "APAC Sales Director",
        department: "Sales (Asia-Pacific)",
        power: "Medium",
        interest: "Medium",
        x: 55,
        y: 68,
        stance: "Neutral",
        strategy: "Ensure time zones are respected during migration dry-runs. Translate critical enablement material to native languages.",
        frequency: "Monthly"
      },
      {
        id: "sh-204",
        name: "Clara Delgado",
        role: "Director of Commissions & Compensation",
        department: "Finance",
        power: "High",
        interest: "Low",
        x: 35,
        y: 78,
        stance: "Neutral",
        strategy: "Validate custom commission calculation formulas in the sandbox environment. Secure audit approval on standard ledger reports.",
        frequency: "Monthly"
      },
      {
        id: "sh-205",
        name: "Nate Robinson",
        role: "Sales Operations Manager",
        department: "Sales Ops & Support",
        power: "Medium",
        interest: "High",
        x: 85,
        y: 55,
        stance: "Supporter",
        strategy: "Appoint as Lead Admin of the new instance. Provide advanced Salesforce Architect training path to increase buy-in.",
        frequency: "Weekly"
      }
    ],
    communicationPlan: [
      {
        id: "cp-201",
        activity: "Global Sales Advisory Council",
        stakeholders: ["Diana Sterling", "Jean-Pierre Laurent", "Akiro Tanaka"],
        channel: "Monthly Review Board / Video Conference",
        frequency: "Monthly",
        objective: "Align on pipeline classification standards, review custom field requests, and finalize regional training timelines."
      },
      {
        id: "cp-202",
        activity: "Sales Ops Sprint & Cleansing Review",
        stakeholders: ["Nate Robinson"],
        channel: "Standup Meetings / Jira Board",
        frequency: "Bi-weekly",
        objective: "Manage weekly data migration metrics, inspect duplicate merge rules, and track API connection status."
      },
      {
        id: "cp-203",
        activity: "Finance Audit Alignment",
        stakeholders: ["Clara Delgado"],
        channel: "Focused Review / Email Sign-off",
        frequency: "Monthly",
        objective: "Ensure commission formulas remain 100% accurate, review fiscal year-end rollover models, and satisfy SOX controls."
      }
    ],
    riskRegister: [
      {
        id: "rk-201",
        risk: "Regional sales reps bypass standard data entry schemas, resulting in poor data health post-go-live.",
        impact: "High",
        probability: "High",
        mitigation: "Implement hard validation rules in Salesforce on key fields; automate weekly lead distribution bans for users with missing records.",
        owner: "Nate Robinson"
      },
      {
        id: "rk-202",
        risk: "EMEA pushback due to GDPR compliance concerns regarding lead visibility permissions.",
        impact: "Critical",
        probability: "Medium",
        mitigation: "Configure robust role hierarchies and sharing rules to ensure European lead contact records are restricted strictly to EMEA-authorized users.",
        owner: "Jean-Pierre Laurent"
      },
      {
        id: "rk-203",
        risk: "Disrupted commissions calculations during fiscal year transition, causing sales team friction.",
        impact: "High",
        probability: "Low",
        mitigation: "Run full legacy-to-Salesforce commissions calculations in parallel for two complete billing cycles prior to sunsetting old systems.",
        owner: "Clara Delgado"
      }
    ]
  }
];
