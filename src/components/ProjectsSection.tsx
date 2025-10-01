import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Server, Network, Wifi, ExternalLink, CodeXml } from 'lucide-react';

const ProjectsSection = () => {
  const projects = [
    {
      icon: CodeXml,
      title: 'Network Automation Toolkit',
      description:
        'A comprehensive collection of Python-based network automation tools for network engineers and administrators. This toolkit provides ready-to-use scripts for common network management tasks including device configuration, monitoring, discovery, and documentation.',
      tools: ['Python', 'Docker', 'Linux'],
    },
    {
      icon: CodeXml,
      title: 'Hardware Inventory Management System',
      description:
        'A modern, feature-rich hardware inventory management system built with PHP, MySQL, and Bootstrap 5. This system provides comprehensive tracking, analytics, and management capabilities for IT hardware assets.',
      tools: ['PHP', 'MySQL', 'Bootstrap', 'Docker', 'Linux'],
    },
    {
      icon: Server,
      title: 'Proxmox Home Lab',
      description:
        'Built a comprehensive home lab environment using Proxmox for virtualization. Deployed multiple VMs running various services including Nextcloud for file storage, Pi-hole for network-wide ad blocking, Portainer for container management, and Jellyfin for media streaming. Implemented automated backups and monitoring solutions.',
      tools: ['Proxmox', 'Docker', 'Nextcloud', 'Pi-hole', 'Portainer', 'Jellyfin', 'Linux'],
    },
    {
      icon: Network,
      title: 'Enterprise Network Simulation',
      description:
        'Designed and simulated a complete enterprise network architecture using Cisco Packet Tracer and GNS3. Implemented multi-site connectivity with VLANs, inter-VLAN routing, OSPF dynamic routing, ACLs for security, and redundancy protocols. Configured firewalls, VPN tunnels, and load balancing for high availability.',
      tools: ['Cisco', 'GNS3', 'VLANs', 'OSPF', 'VPN', 'Firewalls', 'ACLs'],
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
                <ExternalLink className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 transition-smooth" />
              </div>

              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">{project.description}</p>

              <div className="flex flex-wrap gap-2">
                {project.tools.map((tool, i) => (
                  <Badge key={i} variant="secondary" className="text-xs">
                    {tool}
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

export default ProjectsSection;
