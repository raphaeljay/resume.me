import { Card } from '@/components/ui/card';
import { Server, Network, Cloud, Shield } from 'lucide-react';

const AboutSection = () => {
  const highlights = [
    {
      icon: Server,
      title: 'Infrastructure',
      description: 'Virtualization & System Admin',
    },
    {
      icon: Network,
      title: 'Networking',
      description: 'Cisco, VLANs, VPN & Firewalls',
    },
    {
      icon: Cloud,
      title: 'Cloud',
      description: 'Azure & VMware Expertise',
    },
    {
      icon: Shield,
      title: 'Security',
      description: 'IDS/IPS & System Hardening',
    },
  ];

  return (
    <section id="about" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
            About <span className="text-primary">Me</span>
          </h2>

          <div className="space-y-8">
            {/* About Text */}
            <Card className="p-8 bg-card border border-border animate-fade-in">
              <p className="text-lg leading-relaxed text-muted-foreground">
                I am a passionate <span className="text-foreground font-semibold">IT Infrastructure, Network & Support Engineer</span> with
                hands-on experience in virtualization, cloud technologies, networking, and cybersecurity. My expertise spans across
                designing and managing enterprise-grade networks, implementing robust security measures, and optimizing IT infrastructure
                for maximum efficiency and reliability.
              </p>
              <p className="text-lg leading-relaxed text-muted-foreground mt-4">
                Currently upskilling with <span className="text-foreground font-semibold">CCNA</span> and{' '}
                <span className="text-foreground font-semibold">Azure (AZ-104)</span> certifications, I'm committed to staying at the
                forefront of technology and delivering innovative solutions that drive business success.
              </p>
            </Card>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {highlights.map((item, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card border border-border hover:border-primary/50 transition-smooth hover:scale-105 animate-fade-in-up"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex flex-col items-center text-center space-y-3">
                    <div className="p-3 rounded-lg gradient-hero">
                      <item.icon className="h-6 w-6 text-primary-foreground" />
                    </div>
                    <h3 className="font-semibold text-lg">{item.title}</h3>
                    <p className="text-sm text-muted-foreground">{item.description}</p>
                  </div>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;
