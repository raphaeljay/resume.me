import { Card } from '@/components/ui/card';
import { Brain, Users, Clock, Wrench, Lightbulb, Target } from 'lucide-react';

const SoftSkillsSection = () => {
  const softSkills = [
    {
      icon: Brain,
      title: 'Critical Thinking',
      description: 'Analytical problem-solving approach',
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'Effective team communication',
    },
    {
      icon: Clock,
      title: 'Time Management',
      description: 'Efficient project prioritization',
    },
    {
      icon: Wrench,
      title: 'Troubleshooting',
      description: 'Quick issue identification & resolution',
    },
    {
      icon: Lightbulb,
      title: 'Adaptability',
      description: 'Learning new technologies rapidly',
    },
    {
      icon: Target,
      title: 'Attention to Detail',
      description: 'Precision in implementation',
    },
  ];

  return (
    <section id="soft-skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Soft <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
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
                <p className="text-sm text-muted-foreground">{skill.description}</p>
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default SoftSkillsSection;
