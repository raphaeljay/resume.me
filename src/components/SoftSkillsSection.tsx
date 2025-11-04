import { Card } from '@/components/ui/card';
import { Brain, Users, Clock, Wrench, Lightbulb, Target, MessageSquare, TrendingUp } from 'lucide-react';

const SoftSkillsSection = () => {
  const softSkills = [
    {
      icon: Brain,
      title: 'Problem Solving',
      description: 'Analytical debugging and root cause analysis',
    },
    {
      icon: Users,
      title: 'Team Collaboration',
      description: 'Cross-functional teamwork and communication',
    },
    {
      icon: Clock,
      title: 'Time Management',
      description: 'Agile prioritization and deadline delivery',
    },
    {
      icon: Wrench,
      title: 'Technical Troubleshooting',
      description: 'Rapid issue diagnosis and resolution',
    },
    {
      icon: Lightbulb,
      title: 'Continuous Learning',
      description: 'Quick adaptation to new technologies',
    },
    {
      icon: Target,
      title: 'Attention to Detail',
      description: 'Precision in code and infrastructure',
    },
    {
      icon: MessageSquare,
      title: 'Clear Communication',
      description: 'Technical concepts to non-technical stakeholders',
    },
    {
      icon: TrendingUp,
      title: 'Process Improvement',
      description: 'Automation and efficiency optimization',
    },
  ];

  return (
    <section id="soft-skills" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Professional <span className="text-primary">Competencies</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
          {softSkills.map((skill, index) => (
            <Card
              key={index}
              className="p-6 bg-card border border-border hover:border-primary/50 transition-smooth hover:scale-105 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex flex-col items-center text-center space-y-3">
                <div className="p-4 rounded-full gradient-hero group-hover:scale-110 transition-smooth">
                  <skill.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                <h3 className="font-bold text-lg">{skill.title}</h3>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {skill.description}
                </p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkillsSection;