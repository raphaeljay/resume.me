import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'IT Infrastructure & Security Specialist',
      company: 'Current Role',
      period: 'Present',
      achievements: [
        'Designed and implemented enterprise-grade network infrastructure with VLANs, firewalls, and VPN configurations',
        'Managed virtualized environments using VMware and Proxmox, optimizing resource allocation and performance',
        'Deployed and maintained cybersecurity measures including IDS/IPS, system hardening, and access controls',
        'Provided technical leadership in cloud migration projects to Azure platform',
      ],
      tags: ['Azure', 'VMware', 'Proxmox', 'Networking', 'Security'],
    },
    {
      title: 'IT Support Officer',
      company: 'Previous Experience',
      period: '2020 - 2023',
      achievements: [
        'Provided comprehensive technical support for Windows, Linux, and macOS environments',
        'Managed Active Directory, Group Policy, and user access controls for 200+ users',
        'Implemented and maintained network monitoring tools and documentation systems',
        'Reduced system downtime by 40% through proactive maintenance and rapid incident response',
      ],
      tags: ['Windows Server', 'Active Directory', 'Linux', 'Network Admin'],
    },
    {
      title: 'Junior Web Developer / Technical Support',
      company: 'Early Career',
      period: '2018 - 2020',
      achievements: [
        'Developed and maintained web applications with focus on user experience and performance',
        'Provided first-line technical support and troubleshooting for software and hardware issues',
        'Collaborated with cross-functional teams to deliver IT projects on time and within budget',
        'Created technical documentation and training materials for end users',
      ],
      tags: ['Web Development', 'Technical Support', 'Documentation'],
    },
  ];

  return (
    <section id="experience" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Professional <span className="text-primary">Experience</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {experiences.map((exp, index) => (
            <Card
              key={index}
              className="p-6 bg-card border border-border hover:border-primary/50 transition-smooth animate-fade-in-up"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4 mb-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg gradient-hero mt-1">
                    <Briefcase className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold">{exp.title}</h3>
                    <p className="text-muted-foreground">{exp.company}</p>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <Calendar className="h-4 w-4 text-primary" />
                  <span className="text-sm">{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-4 ml-12">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-muted-foreground flex items-start">
                    <span className="mr-2 text-primary font-bold">•</span>
                    <span>{achievement}</span>
                  </li>
                ))}
              </ul>

              <div className="flex flex-wrap gap-2 ml-12">
                {exp.tags.map((tag, i) => (
                  <Badge key={i} variant="outline" className="border-primary/50">
                    {tag}
                  </Badge>
                ))}
              </div>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExperienceSection;
