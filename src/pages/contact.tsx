import { SEO } from "@/components";
import { DiscIcon as Discord, Mail, MapPin, MessageSquare } from "lucide-react";

export default function Contact() {
  return (
    <>
      <SEO title="Contact Us" description="Get in touch with NEXUS. Join our community or reach out to our support team." />

      <div className="pt-32 pb-24 bg-background min-h-screen">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto text-center mb-16">
            <h1 className="text-4xl md:text-6xl font-display font-bold text-white mb-6">Get in Touch</h1>
            <p className="text-lg md:text-xl text-muted-foreground">
              We're here to help. Reach out through any of our channels or join our thriving community of tech enthusiasts.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            <div className="bg-card border border-white/5 rounded-3xl p-10 flex flex-col items-center text-center relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              <div className="w-20 h-20 bg-primary/20 rounded-2xl flex items-center justify-center mb-8 border border-primary/30 relative z-10">
                <Discord className="w-10 h-10 text-primary" />
              </div>
              <h2 className="text-2xl font-display font-bold text-white mb-4 relative z-10">Join the Discord</h2>
              <p className="text-muted-foreground mb-10 relative z-10 flex-1">
                The fastest way to get support, hear about new drops, and chat with the community.
              </p>
              <a
                href="https://discord.gg/yourserver"
                target="_blank"
                rel="noopener noreferrer"
                className="w-full py-4 rounded-xl font-bold bg-[#5865F2] text-white hover:bg-[#4752C4] transition-colors relative z-10 flex items-center justify-center gap-2"
              >
                <MessageSquare className="w-5 h-5" /> Join Server
              </a>
            </div>

            <div className="bg-card border border-white/5 rounded-3xl p-10 flex flex-col">
              <h2 className="text-2xl font-display font-bold text-white mb-8">Direct Contact</h2>
              <div className="space-y-8 flex-1">
                {[
                  {
                    Icon: Mail,
                    title: "Email Us",
                    sub: "General inquiries & support",
                    content: <a href="mailto:hello@nexusstore.com" className="text-primary hover:underline font-medium">hello@nexusstore.com</a>,
                  },
                  {
                    Icon: MapPin,
                    title: "Headquarters",
                    sub: null,
                    content: <p className="text-muted-foreground text-sm leading-relaxed">100 Tech Innovation Drive<br />Suite 400<br />San Francisco, CA 94105</p>,
                  },
                ].map(({ Icon, title, sub, content }) => (
                  <div key={title} className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-white/5 rounded-xl flex items-center justify-center shrink-0 border border-white/10">
                      <Icon className="w-6 h-6 text-white" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-white mb-1">{title}</h3>
                      {sub && <p className="text-muted-foreground text-sm mb-1">{sub}</p>}
                      {content}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
