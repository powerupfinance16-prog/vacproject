export interface Question {
  id: string;
  text: string;
  options: string[];
  correctAnswerIndex: number;
}

export interface Quiz {
  id: string;
  title: string;
  description: string;
  questions: Question[];
}

export const quizzes: Record<string, Quiz> = {
  "company-law": {
    id: "company-law",
    title: "Company Law",
    description: "Test your knowledge on the fundamental principles of Company Law.",
    questions: [
      {
        id: "cl-1",
        text: "What is the minimum number of members required to form a public company?",
        options: ["2", "7", "50", "No limit"],
        correctAnswerIndex: 1
      },
      {
        id: "cl-2",
        text: "Which document contains the rules and regulations for the internal management of a company?",
        options: ["Memorandum of Association", "Articles of Association", "Prospectus", "Certificate of Incorporation"],
        correctAnswerIndex: 1
      },
      {
        id: "cl-3",
        text: "The liability of members in a company limited by shares is limited to:",
        options: ["The unpaid amount on the shares held by them", "The guarantee amount", "Unlimited", "The company's debts"],
        correctAnswerIndex: 0
      },
      {
        id: "cl-4",
        text: "A private company restricts the right to transfer its shares. True or False?",
        options: ["True", "False", "Only with government approval", "Depends on the directors"],
        correctAnswerIndex: 0
      },
      {
        id: "cl-5",
        text: "Who appoints the first auditors of a company?",
        options: ["Shareholders in AGM", "Central Government", "Board of Directors", "Registrar of Companies"],
        correctAnswerIndex: 2
      },
      {
        id: "cl-6",
        text: "What is the maximum number of members in a private company (excluding employee members)?",
        options: ["50", "100", "200", "No limit"],
        correctAnswerIndex: 2
      },
      {
        id: "cl-7",
        text: "A company is considered a separate legal entity from its members. This principle was established in which famous case?",
        options: ["Carlill v Carbolic Smoke Ball Co", "Salomon v Salomon & Co Ltd", "Donoghue v Stevenson", "Balfour v Balfour"],
        correctAnswerIndex: 1
      },
      {
        id: "cl-8",
        text: "What is the minimum paid-up capital requirement for a public company?",
        options: ["Rs. 1 Lakh", "Rs. 5 Lakhs", "Rs. 10 Lakhs", "No minimum requirement as per Companies Act 2013"],
        correctAnswerIndex: 3
      },
      {
        id: "cl-9",
        text: "A resolution passed by a simple majority (more than 50%) is called:",
        options: ["Special Resolution", "Ordinary Resolution", "Unanimous Resolution", "Board Resolution"],
        correctAnswerIndex: 1
      },
      {
        id: "cl-10",
        text: "Which of the following cannot be a member of a company?",
        options: ["Another Company", "A minor", "A registered trade union", "A foreigner"],
        correctAnswerIndex: 1
      }
    ]
  },
  "corporate-accounting": {
    id: "corporate-accounting",
    title: "Corporate Accounting",
    description: "Evaluate your understanding of corporate accounting principles and practices.",
    questions: [
      {
        id: "ca-1",
        text: "Premium received on issue of shares is shown under which head in the balance sheet?",
        options: ["Share Capital", "Reserves and Surplus", "Current Liabilities", "Non-Current Liabilities"],
        correctAnswerIndex: 1
      },
      {
        id: "ca-2",
        text: "Discount on issue of debentures is a:",
        options: ["Capital Receipt", "Revenue Receipt", "Capital Loss", "Revenue Loss"],
        correctAnswerIndex: 2
      },
      {
        id: "ca-3",
        text: "Goodwill is an example of:",
        options: ["Tangible Asset", "Intangible Asset", "Current Asset", "Fictitious Asset"],
        correctAnswerIndex: 1
      },
      {
        id: "ca-4",
        text: "Which of the following is not a method of valuation of goodwill?",
        options: ["Average Profit Method", "Super Profit Method", "Capitalization Method", "Depreciation Method"],
        correctAnswerIndex: 3
      },
      {
        id: "ca-5",
        text: "When shares are forfeited, the Share Capital Account is debited with:",
        options: ["Nominal value of shares", "Called-up value of shares", "Paid-up value of shares", "Market value of shares"],
        correctAnswerIndex: 1
      },
      {
        id: "ca-6",
        text: "The balance of the Forfeited Shares Account after reissue of forfeited shares is transferred to:",
        options: ["General Reserve", "Capital Reserve", "Profit and Loss Account", "Share Premium Account"],
        correctAnswerIndex: 1
      },
      {
        id: "ca-7",
        text: "Debentures represent the:",
        options: ["Capital of the company", "Borrowed funds of the company", "Reserves of the company", "Investments of the company"],
        correctAnswerIndex: 1
      },
      {
        id: "ca-8",
        text: "Underwriting commission on shares cannot exceed:",
        options: ["2.5%", "5%", "10%", "15%"],
        correctAnswerIndex: 1
      },
      {
        id: "ca-9",
        text: "Profit prior to incorporation is treated as:",
        options: ["Revenue Profit", "Capital Profit", "Normal Profit", "Abnormal Profit"],
        correctAnswerIndex: 1
      },
      {
        id: "ca-10",
        text: "Which schedule of the Companies Act 2013 deals with the format of financial statements?",
        options: ["Schedule I", "Schedule II", "Schedule III", "Schedule IV"],
        correctAnswerIndex: 2
      }
    ]
  },
  "hrm": {
    id: "hrm",
    title: "Human Resource Management",
    description: "Assess your knowledge of HR practices, theories, and management.",
    questions: [
      {
        id: "hr-1",
        text: "Which of the following is the primary objective of HRM?",
        options: ["Maximizing profit", "Minimizing cost", "Maximizing employee performance", "Maximizing sales"],
        correctAnswerIndex: 2
      },
      {
        id: "hr-2",
        text: "The process of identifying and attracting a pool of capable applicants is called:",
        options: ["Selection", "Recruitment", "Training", "Placement"],
        correctAnswerIndex: 1
      },
      {
        id: "hr-3",
        text: "Which of the following is an on-the-job training method?",
        options: ["Role playing", "Case study", "Job rotation", "Vestibule training"],
        correctAnswerIndex: 2
      },
      {
        id: "hr-4",
        text: "Performance appraisal is the process of:",
        options: ["Evaluating an employee's current and/or past performance", "Determining the salary of an employee", "Firing an employee", "Hiring an employee"],
        correctAnswerIndex: 0
      },
      {
        id: "hr-5",
        text: "The systematic process of determining the skills, duties, and knowledge required for performing jobs in an organization is:",
        options: ["Job Design", "Job Analysis", "Job Evaluation", "Job Enrichment"],
        correctAnswerIndex: 1
      },
      {
        id: "hr-6",
        text: "Which theory of motivation was proposed by Abraham Maslow?",
        options: ["Two-Factor Theory", "Hierarchy of Needs", "Theory X and Theory Y", "Expectancy Theory"],
        correctAnswerIndex: 1
      },
      {
        id: "hr-7",
        text: "Adding more tasks to a job to increase variety is known as:",
        options: ["Job Enrichment", "Job Enlargement", "Job Rotation", "Job Simplification"],
        correctAnswerIndex: 1
      },
      {
        id: "hr-8",
        text: "What does BARS stand for in performance appraisal?",
        options: ["Behaviorally Anchored Rating Scales", "Basic Assessment Rating System", "Behavioral Assessment and Review System", "Business Analysis and Reporting System"],
        correctAnswerIndex: 0
      },
      {
        id: "hr-9",
        text: "The process of introducing a new employee to the organization and their job is called:",
        options: ["Placement", "Induction/Orientation", "Training", "Development"],
        correctAnswerIndex: 1
      },
      {
        id: "hr-10",
        text: "Which of the following is a quantitative method of human resource forecasting?",
        options: ["Delphi Technique", "Nominal Group Technique", "Trend Analysis", "Managerial Judgment"],
        correctAnswerIndex: 2
      }
    ]
  }
};
