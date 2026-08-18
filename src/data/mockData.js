// Central mock data for the AI Project Mentor frontend.
// All pages read from and update this data through DataContext.
// When the FastAPI backend is ready, replace these with real API calls.

export const mockProjects = [
  {
    id: 1,
    name: 'Student Placement Portal',
    description:
      'A web portal where students can register, upload their resume and apply for campus placement drives. Admins can post drives and shortlist candidates.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'Ollama'],
    createdAt: '2026-07-21',
  },
  {
    id: 2,
    name: 'Hospital Appointment System',
    description:
      'A booking system that lets patients book, reschedule and cancel appointments with doctors. Doctors can view their daily schedule and update appointment status.',
    techStack: ['React', 'FastAPI', 'SQL Server'],
    createdAt: '2026-07-28',
  },
  {
    id: 3,
    name: 'AI Resume Mentor',
    description:
      'An AI-powered tool that reviews student resumes, suggests improvements and generates a tailored cover letter using a GPT-OSS model.',
    techStack: ['React', 'FastAPI', 'SQL Server', 'GPT-OSS'],
    createdAt: '2026-08-02',
  },
];

export const mockTasks = [
  {
    id: 1,
    projectId: 1,
    title: 'Design student registration form',
    description: 'Create a responsive registration form with validation for student details.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-22',
    updatedAt: '2026-08-05',
  },
  {
    id: 2,
    projectId: 1,
    title: 'Build resume upload component',
    description: 'Allow PDF resume uploads up to 2MB with file type validation.',
    priority: 'Medium',
    status: 'In Progress',
    aiGenerated: true,
    createdAt: '2026-07-24',
    updatedAt: '2026-08-10',
  },
  {
    id: 3,
    projectId: 1,
    title: 'Create placement drive listing page',
    description: 'Display upcoming drives with filters by company and role.',
    priority: 'High',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-26',
    updatedAt: '2026-07-26',
  },
  {
    id: 4,
    projectId: 1,
    title: 'Implement admin shortlisting panel',
    description: 'Admins can review applicants and shortlist candidates per drive.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-07-29',
    updatedAt: '2026-07-29',
  },
  {
    id: 5,
    projectId: 2,
    title: 'Design patient appointment form',
    description: 'Form to book an appointment with doctor and date selection.',
    priority: 'High',
    status: 'Completed',
    aiGenerated: false,
    createdAt: '2026-07-29',
    updatedAt: '2026-08-08',
  },
  {
    id: 6,
    projectId: 2,
    title: 'Build doctor availability calendar',
    description: 'Calendar view showing available slots for each doctor.',
    priority: 'Medium',
    status: 'In Progress',
    aiGenerated: true,
    createdAt: '2026-07-30',
    updatedAt: '2026-08-12',
  },
  {
    id: 7,
    projectId: 2,
    title: 'Add appointment cancellation flow',
    description: 'Allow patients to cancel with a reason and notify the doctor.',
    priority: 'Low',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-08-01',
    updatedAt: '2026-08-01',
  },
  {
    id: 8,
    projectId: 3,
    title: 'Create resume parsing service',
    description: 'Parse uploaded PDF resumes into structured JSON fields.',
    priority: 'High',
    status: 'In Progress',
    aiGenerated: true,
    createdAt: '2026-08-03',
    updatedAt: '2026-08-14',
  },
  {
    id: 9,
    projectId: 3,
    title: 'Integrate GPT-OSS review endpoint',
    description: 'Send parsed resume to backend which calls GPT-OSS for review.',
    priority: 'High',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-08-05',
    updatedAt: '2026-08-05',
  },
  {
    id: 10,
    projectId: 3,
    title: 'Build cover letter preview UI',
    description: 'Display the generated cover letter with edit and download options.',
    priority: 'Medium',
    status: 'Pending',
    aiGenerated: false,
    createdAt: '2026-08-06',
    updatedAt: '2026-08-06',
  },
];

export const mockAIHistory = [
  {
    id: 1,
    projectId: 1,
    projectName: 'Student Placement Portal',
    taskType: 'Break Requirement into Tasks',
    userPrompt:
      'I want students to be able to upload their resume and apply to placement drives.',
    responsePreview:
      'Frontend: build resume upload component with PDF validation. Backend: create resume storage and application endpoints. Database: resumes and applications tables...',
    modelName: 'GPT-OSS',
    createdAt: '2026-08-10',
    fullResponse: {
      requirementUnderstanding:
        'Students need to upload a resume (PDF, max 2MB) and apply to one or more placement drives posted by admins.',
      frontendTasks: [
        'Resume upload component with file type and size validation.',
        'Drive listing page with an "Apply" button.',
        'Application success confirmation message.',
      ],
      backendTasks: [
        'POST /api/resumes to store the uploaded PDF.',
        'POST /api/applications to link a student to a drive.',
        'GET /api/drives for the listing page.',
      ],
      databaseTasks: [
        'resumes table: id, student_id, file_path, uploaded_at.',
        'applications table: id, student_id, drive_id, status, applied_at.',
      ],
      testingSteps: [
        'Upload invalid file type and confirm rejection.',
        'Apply to a drive and confirm row is created.',
        'Apply twice to the same drive and confirm duplicate is blocked.',
      ],
      possibleBlockers: [
        'Large PDF uploads may need chunked transfer.',
        'Drive deadlines must be enforced server-side.',
      ],
      recommendedNextAction:
        'Start with the resume upload component since every other flow depends on having a resume on file.',
    },
  },
  {
    id: 2,
    projectId: 2,
    projectName: 'Hospital Appointment System',
    taskType: 'Identify Project Blockers',
    userPrompt: 'What could block the hospital appointment system release?',
    responsePreview:
      'Possible blockers: doctor schedule conflicts, timezone handling for remote patients, notification delivery failures...',
    modelName: 'GPT-OSS',
    createdAt: '2026-08-12',
    fullResponse: {
      requirementUnderstanding:
        'Identify risks that could delay the hospital appointment system release.',
      frontendTasks: [
        'Show clear error messages when no slots are available.',
        'Disable past dates in the date picker.',
      ],
      backendTasks: [
        'Add a transactional check to prevent double-booking a slot.',
        'Send appointment confirmation via email/SMS.',
      ],
      databaseTasks: [
        'Add a unique constraint on (doctor_id, slot_datetime).',
        'Index appointments by doctor and date for fast lookups.',
      ],
      testingSteps: [
        'Two patients booking the same slot simultaneously should fail for one.',
        'Cancelling a slot should free it for rebooking.',
      ],
      possibleBlockers: [
        'Doctor schedule conflicts from overlapping shifts.',
        'Timezone handling for remote patients.',
        'Notification delivery failures.',
      ],
      recommendedNextAction:
        'Add the unique constraint on (doctor_id, slot_datetime) first to prevent data-level double booking.',
    },
  },
  {
    id: 3,
    projectId: 3,
    projectName: 'AI Resume Mentor',
    taskType: 'Generate Testing Checklist',
    userPrompt: 'Generate a testing checklist for the resume review feature.',
    responsePreview:
      'Testing checklist: invalid PDF rejection, empty resume handling, GPT-OSS timeout fallback, cover letter preview rendering...',
    modelName: 'GPT-OSS',
    createdAt: '2026-08-14',
    fullResponse: {
      requirementUnderstanding:
        'Produce a testing checklist covering the resume review and cover letter generation features.',
      frontendTasks: [
        'Verify upload error states render correctly.',
        'Verify cover letter preview supports edit and download.',
      ],
      backendTasks: [
        'Verify GPT-OSS timeout fallback returns a friendly error.',
        'Verify parsed resume JSON matches the expected schema.',
      ],
      databaseTasks: [
        'Verify resume records are linked to the correct student.',
        'Verify review history is retrievable per student.',
      ],
      testingSteps: [
        'Reject invalid PDF file types.',
        'Handle empty or corrupt resumes gracefully.',
        'Confirm GPT-OSS timeout does not crash the request.',
        'Confirm cover letter preview renders formatted text.',
      ],
      possibleBlockers: [
        'GPT-OSS response latency under load.',
        'Inconsistent resume formats from different students.',
      ],
      recommendedNextAction:
        'Write the invalid-file-type test first since it is the cheapest to automate.',
    },
  },
  {
    id: 4,
    projectId: 1,
    projectName: 'Student Placement Portal',
    taskType: 'Recommend Next Task',
    userPrompt: 'What should I work on next for the placement portal?',
    responsePreview:
      'Recommended next task: build the resume upload component, because the application flow depends on it...',
    modelName: 'GPT-OSS',
    createdAt: '2026-08-15',
    fullResponse: {
      requirementUnderstanding:
        'Recommend the single most valuable next task for the placement portal.',
      frontendTasks: [
        'Complete the resume upload component (in progress).',
        'Add file size and type validation messages.',
      ],
      backendTasks: [
        'Create the resume storage endpoint.',
        'Return a resume id for later linking to applications.',
      ],
      databaseTasks: [
        'Ensure the resumes table is created before the endpoint.',
      ],
      testingSteps: [
        'Upload a valid PDF and confirm a resume id is returned.',
        'Upload a non-PDF and confirm it is rejected.',
      ],
      possibleBlockers: [
        'Resume storage may exceed disk limits if many students upload.',
      ],
      recommendedNextAction:
        'Finish the resume upload component first — the apply flow cannot work without a resume on file.',
    },
  },
];

// AI task type options used on the AI Mentor page.
export const aiTaskTypes = [
  'Generate Project Plan',
  'Break Requirement into Tasks',
  'Recommend Next Task',
  'Identify Project Blockers',
  'Explain Implementation',
  'Generate Testing Checklist',
];

// Build a structured mock AI response based on the selected task type and prompt.
export function buildMockAIResponse(projectName, prompt, taskType) {
  return {
    requirementUnderstanding: `For the ${projectName} project, the request "${prompt}" is interpreted as a ${taskType.toLowerCase()} request. This mock response shows how the structured AI recommendation will look once the FastAPI backend is connected.`,
    frontendTasks: [
      'Create or update the relevant React component for this requirement.',
      'Add form validation and loading states for the user action.',
      'Display success and error messages returned by the backend.',
    ],
    backendTasks: [
      'Add a FastAPI route under /api to handle this request.',
      'Validate incoming data and return clear error codes.',
      'Call the database layer to read or write the required records.',
    ],
    databaseTasks: [
      'Create or update the relevant SQL Server table.',
      'Add any indexes needed for the new query pattern.',
      'Ensure foreign key relationships stay consistent.',
    ],
    testingSteps: [
      'Test the happy path end-to-end through the UI.',
      'Test validation errors for missing or invalid input.',
      'Test the failure case when the backend is unavailable.',
    ],
    possibleBlockers: [
      'AI response latency from the GPT-OSS model may be high.',
      'Database schema changes may require a migration.',
      'Concurrent updates could cause conflicts if not handled.',
    ],
    recommendedNextAction: `Start with the frontend component for this requirement so the team can validate the flow visually before wiring up the ${taskType.toLowerCase()} backend endpoint.`,
  };
}
