import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Award, GraduationCap, Clock } from 'lucide-react';

const CertificationsSection = () => {
  const certifications = [
    {
      title: 'Microsoft Azure Administrator (AZ-104)',
      status: 'In Progress',
      type: 'Certification',
      description: 'Cloud infrastructure management and Azure services administration',
    },
    {
      title: 'Cisco Certified Network Associate (CCNA)',
      status: 'In Progress',
      type: 'Certification',
      description: 'Networking fundamentals, IP connectivity, security, and automation',
    },
  ];

  const education = [
    {
      degree: 'B.Sc. Computer Science',
      institution: 'Rivers State University',
      year: 'Graduate',
      description: 'Core focus on software engineering, networking, and system administration',
    },
    {
      degree: 'Diploma in IT & Networking',
      institution: 'Bonny Vocational Center',
      year: 'Graduate',
      description: 'Hands-on training in network infrastructure and technical support',
    },
  ];

  return (
    <section id="certifications" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Certifications & <span className="text-primary">Education</span>
        </h2>

        <div className="max-w-4xl mx-auto space-y-8">
          {/* Certifications */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <Award className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Certifications</h3>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {certifications.map((cert, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card border border-border hover:border-primary/50 transition-smooth animate-fade-in"
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <div className="flex items-start justify-between mb-3">
                    <h4 className="font-bold text-lg leading-tight">{cert.title}</h4>
                    <Badge variant="outline" className="border-primary/50 flex items-center gap-1">
                      <Clock className="h-3 w-3" />
                      {cert.status}
                    </Badge>
                  </div>
                  <p className="text-sm text-muted-foreground">{cert.description}</p>
                </Card>
              ))}
            </div>
          </div>

          {/* Education */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <h3 className="text-2xl font-bold">Education</h3>
            </div>
            <div className="space-y-4">
              {education.map((edu, index) => (
                <Card
                  key={index}
                  className="p-6 bg-card border border-border hover:border-primary/50 transition-smooth animate-fade-in"
                  style={{ animationDelay: `${(certifications.length + index) * 0.1}s` }}
                >
                  <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-2 mb-2">
                    <h4 className="font-bold text-lg">{edu.degree}</h4>
                    <Badge variant="secondary">{edu.year}</Badge>
                  </div>
                  <p className="font-medium text-muted-foreground mb-2">{edu.institution}</p>
                  <p className="text-sm text-muted-foreground">{edu.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CertificationsSection;
