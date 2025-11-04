import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'Backend Development',
      skills: [
        'PHP',
        'Laravel',
        'RESTful APIs',
        'MySQL',
        'PostgreSQL',
        'Redis',
        'Git',
        'Composer',
        'MVC Architecture',
        'OOP',
        'Docker',
      ],
      featured: false, // Highlight this category
    },
    {
      category: 'Networking',
      skills: [
        'TCP/IP',
        'VLANs',
        'Routing & Switching',
        'Firewalls',
        'VPN',
        'Network Security',
        'DNS/DHCP',
        'Load Balancing',
      ],
    },
    {
      category: 'Infrastructure & Hardware',
      skills: [
        'Cisco',
        'Ubiquiti',
        'pfSense',
        'MikroTik',
        'Network Design',
        'Structured Cabling',
        'Wi-Fi Management',
      ],
    },
    {
      category: 'Cloud & Virtualization',
      skills: ['Microsoft Azure', 'VMware ESXi', 'Proxmox', 'Hyper-V', 'Docker', 'Cloud Architecture'],
    },
    {
      category: 'Systems Administration',
      skills: [
        'Windows Server',
        'Linux (Ubuntu/CentOS)',
        'Active Directory',
        'Group Policy',
        'PowerShell',
        'Bash Scripting',
        'Remote Support',
      ],
    },
    {
      category: 'Cybersecurity',
      skills: [
        'IDS/IPS',
        'System Hardening',
        'Security Audits',
        'Access Control',
        'Incident Response',
        'Compliance (ISO 27001)',
      ],
    },
  ];

  return (
    <section id="skills" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Technical <span className="text-primary">Skills</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {skillCategories.map((category, index) => (
            <Card
              key={index}
              className={`p-6 bg-card border transition-smooth hover:scale-105 animate-fade-in-up ${
                category.featured
                  ? 'border-primary/70 ring-2 ring-primary/20 hover:border-primary'
                  : 'border-border hover:border-primary/50'
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold mb-4 text-primary flex items-center gap-2">
                {category.category}
                {category.featured && (
                  <span className="text-xs bg-primary/10 text-primary px-2 py-1 rounded-full">
                    Featured
                  </span>
                )}
              </h3>
              <div className="flex flex-wrap gap-2">
                {category.skills.map((skill, skillIndex) => (
                  <Badge
                    key={skillIndex}
                    variant="secondary"
                    className="hover:bg-primary hover:text-primary-foreground transition-smooth cursor-default"
                  >
                    {skill}
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

export default SkillsSection;