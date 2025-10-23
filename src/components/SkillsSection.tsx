import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const SkillsSection = () => {
  const skillCategories = [
    {
      category: 'Web Development',
      skills: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'REST API', 'Git', 'MVC Architecture'],
    },
    {
      category: 'Networking',
      skills: [
        'TCP/IP',
        'VLANs',
        'Firewalls',
        'VPN',
        'Routing & Switching',
        'Network Security',
        'DNS/DHCP',
        'Load Balancing',
      ],
    },
    {
      category: 'Infrastructure',
      skills: ['Cisco', 'Ubiquiti', 'pfSense', 'MikroTik', 'Network Design', 'Cabling', 'Wi-Fi Management'],
    },
    {
      category: 'Cloud & Virtualization',
      skills: ['Azure', 'VMware', 'Proxmox', 'Hyper-V', 'Virtual Machines', 'Cloud Migration'],
    },
    {
      category: 'IT Support',
      skills: ['Windows Server', 'Linux', 'macOS', 'Active Directory', 'Group Policy', 'Remote Support', 'Troubleshooting'],
    },
    {
      category: 'Cybersecurity',
      skills: ['IDS/IPS', 'System Hardening', 'Security Audits', 'Access Control', 'Incident Response', 'Compliance'],
    },
    {
      category: 'Tools & Platforms',
      skills: ['Portainer', 'Nextcloud', 'Pi-hole', 'Jellyfin', 'Docker', 'PowerShell', 'Bash'],
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
              className="p-6 bg-card border border-border hover:border-primary/50 transition-smooth hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <h3 className="text-xl font-semibold mb-4 text-primary">
                {category.category}
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
