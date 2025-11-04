import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Briefcase, Calendar } from 'lucide-react';

const ExperienceSection = () => {
  const experiences = [
    {
      title: 'IT Infrastructure & Security Specialist',
      company: 'Current Role',
      period: 'May 2023 - Present',
      achievements: [
        'Architected and deployed a full-stack Property Management System using Laravel, PHP, and MySQL, serving 50+ rooms with automated booking workflows, real-time inventory management, dynamic pricing, and comprehensive analytics dashboards',
        'Designed and implemented enterprise-grade network infrastructure with VLANs, firewalls, and VPN configurations, improving network security posture by 60%',
        'Developed RESTful APIs and internal automation tools using PHP and Laravel, reducing manual administrative tasks by 35%',
        'Managed multi-tenant virtualized environments using VMware ESXi and Proxmox, hosting 20+ VMs with 99.8% uptime',
        'Led cloud migration initiatives to Microsoft Azure, implementing IaaS and PaaS solutions with automated deployment pipelines',
        'Implemented comprehensive cybersecurity measures including IDS/IPS, system hardening, and access controls achieving ISO 27001 compliance readiness',
      ],
      tags: ['Laravel', 'PHP', 'MySQL', 'REST API', 'Azure', 'VMware', 'Proxmox', 'Docker', 'Networking', 'Security'],
    },
    {
      title: 'IT Support Officer',
      company: 'Previous Experience',
      period: 'Oct 2021 - May 2023',
      achievements: [
        'Provided enterprise-level technical support across Windows Server, Linux, and macOS environments for 200+ users',
        'Administered Active Directory, Group Policy, and RBAC systems, implementing security policies that reduced unauthorized access incidents by 45%',
        'Automated routine maintenance tasks using PowerShell and Bash scripts, saving 15+ hours per week',
        'Deployed and maintained network monitoring solutions with real-time alerting, reducing mean time to resolution (MTTR) by 40%',
        'Created comprehensive technical documentation and knowledge base articles, improving first-call resolution rate by 30%',
      ],
      tags: ['Windows Server', 'Active Directory', 'Linux', 'PowerShell', 'Bash', 'Network Admin', 'Automation'],
    },
    {
      title: 'Junior Web Developer / Technical Support',
      company: 'Early Career',
      period: 'Apr 2019 - Oct 2019',
      achievements: [
        'Developed and maintained responsive web applications using PHP, HTML, CSS, and JavaScript with focus on performance optimization',
        'Built custom CMS solutions and integrated third-party APIs for enhanced functionality',
        'Provided tier-1 and tier-2 technical support, consistently maintaining 95%+ customer satisfaction rating',
        'Collaborated with cross-functional teams using Agile methodologies to deliver projects on schedule',
        'Created user-friendly technical documentation, training materials, and video tutorials for end-users',
      ],
      tags: ['PHP', 'JavaScript', 'Web Development', 'API Integration', 'Technical Support', 'Agile', 'Documentation'],
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
                  <span className="text-sm whitespace-nowrap">{exp.period}</span>
                </div>
              </div>

              <ul className="space-y-2 mb-4 ml-12">
                {exp.achievements.map((achievement, i) => (
                  <li key={i} className="text-muted-foreground flex items-start">
                    <span className="mr-2 text-primary font-bold mt-1">•</span>
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