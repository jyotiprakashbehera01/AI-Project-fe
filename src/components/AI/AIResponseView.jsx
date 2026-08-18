import {
  Brain,
  Layout,
  Server,
  Database,
  CheckSquare,
  AlertTriangle,
  ArrowRightCircle,
} from 'lucide-react';

// Renders a structured AI recommendation response in organised sections.
export default function AIResponseView({ response }) {
  if (!response) return null;

  const sections = [
    { icon: Brain, title: 'Requirement Understanding', content: response.requirementUnderstanding, list: false },
    { icon: Layout, title: 'Frontend Tasks', content: response.frontendTasks, list: true },
    { icon: Server, title: 'Backend Tasks', content: response.backendTasks, list: true },
    { icon: Database, title: 'Database Tasks', content: response.databaseTasks, list: true },
    { icon: CheckSquare, title: 'Testing Steps', content: response.testingSteps, list: true },
    { icon: AlertTriangle, title: 'Possible Blockers', content: response.possibleBlockers, list: true },
    { icon: ArrowRightCircle, title: 'Recommended Next Action', content: response.recommendedNextAction, list: false },
  ];

  return (
    <div className="ai-response">
      {sections.map((section) => {
        const Icon = section.icon;
        return (
          <div key={section.title} className="ai-section">
            <h4>
              <Icon size={16} aria-hidden="true" />
              {section.title}
            </h4>
            {section.list ? (
              <ul>
                {section.content.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            ) : (
              <p>{section.content}</p>
            )}
          </div>
        );
      })}
    </div>
  );
}
