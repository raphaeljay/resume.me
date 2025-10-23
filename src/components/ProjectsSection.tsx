import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Server, Network, Wifi, CodeXml, Github } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      icon: Server,
      title: 'Property Management System (PMS)',
      description:
        'Currently developing a comprehensive property management system for a service apartment business. Built with Laravel and MySQL, the system handles booking management, guest check-in/check-out, room inventory, billing, reporting, and staff management. Features include real-time availability tracking, automated invoicing, and detailed analytics dashboards.',
      tools: ['Laravel', 'PHP', 'MySQL', 'JavaScript', 'Bootstrap', 'REST API'],
    },
    {
      icon: CodeXml,
      title: 'Network Automation Toolkit',
      description:
        'A comprehensive collection of Python-based network automation tools for network engineers and administrators. This toolkit provides ready-to-use scripts for common network management tasks including device configuration, monitoring, discovery, and documentation.',
      tools: ['Python', 'Docker', 'Linux'],
      link: 'https://github.com/raphaeljay/network-automation-toolkit',
    },
    {
      icon: CodeXml,
      title: 'Hardware Inventory Management System',
      description:
        'A modern, feature-rich hardware inventory management system built with PHP, MySQL, and Bootstrap 5. This system provides comprehensive tracking, analytics, and management capabilities for IT hardware assets.',
      tools: ['PHP', 'MySQL', 'Bootstrap', 'Docker', 'Linux'],
      link: 'https://github.com/raphaeljay/hardware-inventory',
    },
    {
      icon: Server,
      title: 'Proxmox Home Lab',
      description:
        'Built a comprehensive home lab environment using Proxmox for virtualization. Deployed multiple VMs running various services including Nextcloud for file storage, Pi-hole for network-wide ad blocking, Portainer for container management, and Jellyfin for media streaming. Implemented automated backups and monitoring solutions.',
      tools: ['Proxmox', 'Docker', 'Nextcloud', 'Pi-hole', 'Portainer', 'Jellyfin', 'Linux'],
    },
    {
      icon: Wifi,
      title: 'Hotel Wi-Fi & LAN Infrastructure',
      description:
        'Successfully deployed and configured a secure wireless and wired network infrastructure for a hospitality facility. Set up Ubiquiti access points with VLAN segmentation for guest and staff networks, implemented pfSense firewall with captive portal, configured QoS for bandwidth management, and established network monitoring with real-time alerts.',
      tools: ['Ubiquiti', 'pfSense', 'VLANs', 'Captive Portal', 'QoS', 'Network Monitoring'],
    },
  ];

  return (
    <section id="projects" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Projects & <span className="text-primary">Labs</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
          {projects.map((project, index) => (
            <Card
              key={index}
              className="p-6 bg-card border border-border hover:border-primary/50 transition-smooth hover:scale-105 group animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg gradient-hero group-hover:scale-110 transition-smooth">
                  <project.icon className="h-6 w-6 text-primary-foreground" />
                </div>
              </div>

              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2 mb-4">
                {project.tools.map((tool, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tool}
                  </Badge>
                ))}
              </div>

              {project.link && (
                <Button
                  variant="outline"
                  size="sm"
                  className="w-full"
                  asChild
                >
                  <a href={project.link} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2">
                    <Github className="h-4 w-4" />
                    View on GitHub
                  </a>
                </Button>
              )}
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProjectsSection;
