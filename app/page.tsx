import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowRight, Github, Moon, Sun } from "lucide-react";
import { ModeToggle } from "@/components/theme/mode-toggle";

// Features data
const features = [
  {
    title: "Track Progress",
    description: "Monitor your daily reading progress and set personal goals",
    icon: "📊"
  },
  {
    title: "Group Reading",
    description: "Join or create reading groups for mutual motivation",
    icon: "👥"
  },
  {
    title: "Offline Access",
    description: "Access Quranic text even without internet connection",
    icon: "📱"
  }
];

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-between bg-background text-foreground">
      {/* Navigation */}
      <nav className="w-full px-6 py-4 flex justify-between items-center border-b">
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-xl font-bold text-primary">tadarus.my</span>
        </Link>
        <div className="flex items-center gap-4">
          <ModeToggle />
          <Button variant="outline" asChild>
            <Link href="/login">Login</Link>
          </Button>
        </div>
      </nav>

      <div className="flex-1 w-full max-w-5xl mx-auto px-6 py-12">
        {/* Hero Section */}
        <header className="text-center space-y-6 mb-16">
          <div className="space-y-4">
            <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight">
              Welcome to <span className="text-primary">tadarus.my</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Your companion for completing the Quran this Ramadan. Join thousands of others
              in their spiritual journey. 📖 🌙
            </p>
          </div>
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button size="lg" className="group" asChild>
              <Link href="/signup">
                Get Started
                <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" asChild>
              <Link href="/learn-more">Learn More</Link>
            </Button>
          </div>
        </header>

        {/* Features Grid */}
        <div className="grid md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <Card
              key={index}
              className="transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <span className="text-2xl">{feature.icon}</span>
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground">{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Community Section */}
        <Card className="mb-16">
          <CardHeader>
            <CardTitle className="text-2xl">Join Our DevTalk Community</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <p className="text-muted-foreground">
              Connect with local tech community and support each other in your Quran reading journey.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <Button asChild>
                <Link
                  href="https://devtalk.club/"
                  target="_blank"
                  rel="noopener noreferrer">Join Community</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link
                  href="https://github.com/khrnchn/tadarus"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2"
                >
                  <Github className="h-5 w-5" />
                  <span>Star on GitHub</span>
                </Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Statistics Section */}
        {/* <div className="grid sm:grid-cols-3 gap-6 mb-16">
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">1000+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Active Users</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">50+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Reading Groups</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="text-4xl font-bold text-primary">30K+</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-muted-foreground">Pages Read</p>
            </CardContent>
          </Card>
        </div> */}
      </div>

      {/* Footer */}
      <footer className="w-full border-t py-6 text-center">
        <p className="text-sm text-muted-foreground">
          &copy; {new Date().getFullYear()} Tadarus.my. All rights reserved.
        </p>
      </footer>
    </div>
  );
}