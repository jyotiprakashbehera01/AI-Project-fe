import { FolderKanban, ListTodo, Clock, Loader, CheckCircle2 } from 'lucide-react';
import { useData } from '../context/DataContext';
import StatCard from '../components/Dashboard/StatCard';
import ProjectProgress from '../components/Dashboard/ProjectProgress';
import RecentTasks from '../components/Dashboard/RecentTasks';
import AIRecommendation from '../components/Dashboard/AIRecommendation';

export default function DashboardPage() {
  const { projects, tasks } = useData();

  const totalTasks = tasks.length;
  const pending = tasks.filter((t) => t.status === 'Pending').length;
  const inProgress = tasks.filter((t) => t.status === 'In Progress').length;
  const completed = tasks.filter((t) => t.status === 'Completed').length;

  // Pick a mock recommendation from the first project that has a pending task.
  const recommendedProject =
    projects.find((p) =>
      tasks.some((t) => t.projectId === p.id && t.status !== 'Completed'),
    ) ?? projects[0];

  const nextPendingTask = tasks.find(
    (t) => t.projectId === recommendedProject?.id && t.status !== 'Completed',
  );

  return (
    <div>
      {/* Summary cards */}
      <div className="stat-grid">
        <StatCard label="Total Projects" value={projects.length} icon={FolderKanban} color="indigo" />
        <StatCard label="Total Tasks" value={totalTasks} icon={ListTodo} color="blue" />
        <StatCard label="Pending" value={pending} icon={Clock} color="warning" />
        <StatCard label="In Progress" value={inProgress} icon={Loader} color="cyan" />
        <StatCard label="Completed" value={completed} icon={CheckCircle2} color="success" />
      </div>

      <div className="dashboard-grid">
        <div className="card">
          <div className="section-header">
            <h2>Project Progress</h2>
          </div>
          <ProjectProgress projects={projects} tasks={tasks} />
        </div>

        <AIRecommendation
          project={recommendedProject?.name ?? '—'}
          recommendation={{
            task: nextPendingTask?.title ?? 'Review project scope',
            reason:
              'This task is the next pending item for the project and unblocks later work. ' +
              'Ask the AI Mentor for a full breakdown of how to implement it.',
          }}
        />
      </div>

      <div className="card">
        <div className="section-header">
          <h2>Recent Tasks</h2>
        </div>
        <RecentTasks tasks={tasks} projects={projects} />
      </div>
    </div>
  );
}
