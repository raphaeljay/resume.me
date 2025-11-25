import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Server, Wifi, CodeXml, Github, ExternalLink } from "lucide-react";

const ProjectsSection = () => {
  const projects = [
    {
      icon: CodeXml,
      title: "Lodgr (PMS)",
      description:
        "Full-stack property management application for service apartments built with Laravel. Features include real-time room availability, automated guest check-in/check-out workflows, dynamic pricing engine, integrated billing and invoicing, staff role management with RBAC, and comprehensive analytics dashboards. Implements RESTful API architecture with secure authentication.",
      tools: [
        "Laravel",
        "PHP",
        "MySQL",
        "JavaScript",
        "Bootstrap",
        "REST API",
        "JWT Auth",
      ],
      featured: false,
      link: "https://lodgr.laravel.cloud",
    },
    {
      icon: CodeXml,
      title: "Hardware Inventory Management System",
      description:
        "Modern inventory management system with comprehensive tracking, analytics, and reporting capabilities for IT hardware assets. Features barcode scanning, automated depreciation calculations, maintenance scheduling, and export functionality. Built with responsive design and Docker containerization for easy deployment.",
      tools: ["PHP", "MySQL", "Bootstrap 5", "Docker", "REST API", "Linux"],
      link: "https://github.com/raphaeljay/hardware-inventory",
    },
    {
      icon: CodeXml,
      title: "Network Automation Toolkit",
      description:
        "Open-source collection of Python-based automation scripts for network engineers. Includes device configuration management, automated backup systems, network discovery tools, compliance checking, and detailed documentation generators. Containerized with Docker for consistent deployment across environments.",
      tools: ["Python", "Docker", "Linux", "Git", "Bash"],
      link: "https://github.com/raphaeljay/network-automation-toolkit",
    },
    {
      icon: Server,
      title: "Proxmox Home Lab Infrastructure",
      description:
        "Enterprise-grade virtualization lab featuring 15+ VMs and containers. Deployed self-hosted services including Nextcloud (file storage/collaboration), Pi-hole (DNS-based ad blocking), Portainer (container orchestration), Jellyfin (media server), and monitoring stack (Grafana + Prometheus). Implemented automated backup strategy and infrastructure-as-code using Ansible.",
      tools: [
        "Proxmox",
        "Docker",
        "Ansible",
        "Linux",
        "Nextcloud",
        "Pi-hole",
        "Grafana",
        "Nginx",
      ],
    },
    {
      icon: Wifi,
      title: "Hotel Wi-Fi & Network Infrastructure",
      description:
        "Designed and deployed secure, scalable wireless and wired network infrastructure for hospitality facility. Implemented Ubiquiti UniFi ecosystem with VLAN segmentation (guest, staff, IoT networks), pfSense firewall with captive portal authentication, bandwidth management via QoS policies, and centralized monitoring with real-time alerts and reporting.",
      tools: [
        "Ubiquiti UniFi",
        "pfSense",
        "VLANs",
        "Captive Portal",
        "QoS",
        "RADIUS",
        "Network Monitoring",
      ],
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
              className={`p-6 bg-card border transition-smooth hover:scale-105 group animate-fade-in-up ${
                project.featured
                  ? "border-primary/70 ring-2 ring-primary/20 hover:border-primary"
                  : "border-border hover:border-primary/50"
              }`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="flex items-start justify-between mb-4">
                <div className="p-3 rounded-lg gradient-hero group-hover:scale-110 transition-smooth">
                  <project.icon className="h-6 w-6 text-primary-foreground" />
                </div>
                {project.featured && (
                  <Badge className="bg-primary/10 text-primary border-primary/30">
                    Featured
                  </Badge>
                )}
              </div>

              <h3 className="text-xl font-bold mb-3">{project.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-4">
                {project.description}
              </p>

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
                  className="w-full group/btn"
                  asChild
                >
                  <a
                    href={project.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    View on GitHub
                    <ExternalLink className="h-3 w-3 opacity-0 group-hover/btn:opacity-100 transition-opacity" />
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
