import { Download, Linkedin, Mail, Phone, MapPin, Github } from 'lucide-react';
import { Button } from '@/components/ui/button';
import profileImage from '@/assets/profile.jpg';
import { FaTelegram } from 'react-icons/fa';

const HeroSection = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center pt-16">
      <div className="container mx-auto px-4 py-20">
        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
          {/* Profile Image */}
          <div className="relative animate-scale-in">
            <div className="absolute inset-0 gradient-hero rounded-full blur-2xl opacity-30 animate-pulse"></div>
            <div className="relative w-64 h-64 lg:w-80 lg:h-80 rounded-full overflow-hidden border-4 border-primary/20 shadow-tech">
              <img
                src={profileImage}
                alt="Jamaica Raphael Ajemina"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Hero Content */}
          <div className="flex-1 text-center lg:text-left space-y-6 animate-fade-in-up">
            <div className="space-y-2">
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">
                Jamaica Raphael <span className="text-primary">Ajemina</span>
              </h1>
              <p className="text-xl md:text-2xl text-muted-foreground font-medium">
                IT Infrastructure | Network Engineer | Cloud & Security Enthusiast
              </p>
            </div>

            {/* Contact Info */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4 text-primary" />
                <span>Nigeria</span>
              </div>
              <div className="flex items-center gap-2">
                <FaTelegram className="h-4 w-4 text-primary" />
                <span>ajeminx</span>
              </div> 
              <div className="flex items-center gap-2">
                <Mail className="h-4 w-4 text-primary" />
                <span>ajemina@proton.me</span>
              </div>
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4 justify-center lg:justify-start pt-4">
              <Button
                size="lg"
                className="gradient-hero shadow-tech hover:shadow-lg hover:scale-105 transition-smooth font-semibold"
                asChild
              >
                <a href="/resume.pdf" download="Jamaica_Raphael_Ajemina_Resume.pdf">
                  <Download className="mr-2 h-5 w-5" />
                  Download Resume
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 transition-smooth font-semibold"
                asChild
              >
                <a
                  href="https://linkedin.com/in/raphael-jamaica"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Linkedin className="mr-2 h-5 w-5" />
                  LinkedIn Profile
                </a>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-primary/50 hover:bg-primary/10 transition-smooth font-semibold"
                asChild
              >
                <a
                  href="https://github.com/ajemina212"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Github className="mr-2 h-5 w-5" />
                  GitHub Profile
                </a>
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
