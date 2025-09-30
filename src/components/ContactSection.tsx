import { Card } from '@/components/ui/card';
import { Mail, Phone, Linkedin, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';

const ContactSection = () => {
  const contactInfo = [
    {
      icon: Mail,
      label: 'Email',
      value: 'ajemina212@gmail.com',
      href: 'mailto:ajemina212@gmail.com',
    },
    {
      icon: Phone,
      label: 'Phone',
      value: '+234 8138220410',
      href: 'tel:+2348138220410',
    },
    {
      icon: Linkedin,
      label: 'LinkedIn',
      value: 'linkedin.com/in/raphael-jamaica',
      href: 'https://linkedin.com/in/raphael-jamaica',
    },
    {
      icon: MapPin,
      label: 'Location',
      value: 'Rivers State, Nigeria',
      href: null,
    },
  ];

  return (
    <section id="contact" className="py-20 bg-muted/30">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
          Get In <span className="text-primary">Touch</span>
        </h2>

        <div className="max-w-3xl mx-auto">
          <Card className="p-8 bg-card border border-border animate-fade-in">
            <div className="text-center mb-8">
              <p className="text-lg text-muted-foreground">
                I'm always open to discussing new opportunities, projects, or collaborations. Feel free to reach out!
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {contactInfo.map((contact, index) => (
                <div
                  key={index}
                  className="flex items-center gap-4 p-4 rounded-lg hover:bg-primary/5 transition-smooth"
                >
                  <div className="p-3 rounded-lg gradient-hero flex-shrink-0">
                    <contact.icon className="h-5 w-5 text-primary-foreground" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-muted-foreground font-medium">{contact.label}</p>
                    {contact.href ? (
                      <a
                        href={contact.href}
                        target={contact.label === 'LinkedIn' ? '_blank' : undefined}
                        rel={contact.label === 'LinkedIn' ? 'noopener noreferrer' : undefined}
                        className="text-foreground hover:text-primary transition-smooth font-medium break-all"
                      >
                        {contact.value}
                      </a>
                    ) : (
                      <p className="text-foreground font-medium">{contact.value}</p>
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-8 text-center">
              <Button
                size="lg"
                className="gradient-hero shadow-tech hover:shadow-lg hover:scale-105 transition-smooth font-semibold"
                asChild
              >
                <a href="mailto:ajemina212@gmail.com">
                  <Mail className="mr-2 h-5 w-5" />
                  Send Me an Email
                </a>
              </Button>
            </div>
          </Card>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;
