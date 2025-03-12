
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import Layout from '@/components/layout/Layout';
import { 
  MessageSquare, FileText, Calendar, Upload, 
  Clock, ArrowRight, Shield, Languages, Zap, Database
} from 'lucide-react';

const Index = () => {
  return (
    <Layout>
      {/* Hero Section */}
      <section className="container py-12 md:py-24">
        <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
          <div className="space-y-4">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              AI-Powered Warranty Management
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight">
              Simplify Your Warranty Claims Process
            </h1>
            <p className="text-muted-foreground text-lg md:text-xl">
              Our AI assistant helps you manage warranties effortlessly, from document processing to claim submission and service scheduling.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button size="lg" asChild>
                <Link to="/chat">
                  Try AI Assistant
                  <MessageSquare className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/upload">
                  Upload Documents
                  <Upload className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </div>
          </div>
          
          <div className="rounded-lg border bg-card p-8 shadow-sm relative overflow-hidden animate-floating">
            <div className="glass absolute -right-20 -top-20 h-40 w-40 rounded-full"></div>
            <div className="glass absolute -left-20 -bottom-20 h-40 w-40 rounded-full"></div>
            <div className="relative z-10 flex flex-col gap-4">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <MessageSquare className="h-5 w-5 text-primary" />
                </div>
                <div className="font-medium">AI Chat Assistant</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <FileText className="h-5 w-5 text-primary" />
                </div>
                <div className="font-medium">Document Processing</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Calendar className="h-5 w-5 text-primary" />
                </div>
                <div className="font-medium">Service Scheduling</div>
              </div>
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div className="font-medium">Real-time Tracking</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="container py-12 md:py-24">
        <div className="flex flex-col items-center text-center space-y-3 mb-12">
          <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
            Key Features
          </div>
          <h2 className="text-3xl font-bold tracking-tight">
            Revolutionize Your Warranty Management
          </h2>
          <p className="text-muted-foreground text-lg max-w-[800px]">
            Our platform combines powerful AI capabilities with user-friendly interfaces to streamline the entire warranty process.
          </p>
        </div>
        
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {/* Feature 1 */}
          <div className="rounded-lg border bg-card p-6 shadow-sm card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <MessageSquare className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">AI Chat Assistant</h3>
            <p className="text-muted-foreground mb-4">
              24/7 intelligent chat support to guide you through every step of the warranty process.
            </p>
            <Link to="/chat" className="group inline-flex items-center text-sm font-medium text-primary">
              Learn more 
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Feature 2 */}
          <div className="rounded-lg border bg-card p-6 shadow-sm card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <Upload className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Document Processing</h3>
            <p className="text-muted-foreground mb-4">
              Advanced OCR technology to extract and validate warranty information from receipts and invoices.
            </p>
            <Link to="/upload" className="group inline-flex items-center text-sm font-medium text-primary">
              Learn more 
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Feature 3 */}
          <div className="rounded-lg border bg-card p-6 shadow-sm card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <FileText className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Automated Claims</h3>
            <p className="text-muted-foreground mb-4">
              Streamlined claim submission with pre-filled forms and direct integration with manufacturer portals.
            </p>
            <Link to="/claims" className="group inline-flex items-center text-sm font-medium text-primary">
              Learn more 
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Feature 4 */}
          <div className="rounded-lg border bg-card p-6 shadow-sm card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <Calendar className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Service Scheduling</h3>
            <p className="text-muted-foreground mb-4">
              Easy appointment booking with technicians and seamless calendar integration.
            </p>
            <Link to="/appointments" className="group inline-flex items-center text-sm font-medium text-primary">
              Learn more 
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Feature 5 */}
          <div className="rounded-lg border bg-card p-6 shadow-sm card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <Languages className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Translation Services</h3>
            <p className="text-muted-foreground mb-4">
              Real-time language translation to break down communication barriers for global support.
            </p>
            <Link to="/translate" className="group inline-flex items-center text-sm font-medium text-primary">
              Learn more 
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          
          {/* Feature 6 */}
          <div className="rounded-lg border bg-card p-6 shadow-sm card-hover">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-4">
              <Clock className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-xl font-semibold mb-2">Real-time Tracking</h3>
            <p className="text-muted-foreground mb-4">
              Monitor the status of your warranty claims with live updates and notifications.
            </p>
            <Link to="/dashboard" className="group inline-flex items-center text-sm font-medium text-primary">
              Learn more 
              <ArrowRight className="ml-1 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
        </div>
      </section>
      
      {/* How It Works Section */}
      <section className="bg-accent py-12 md:py-24">
        <div className="container">
          <div className="flex flex-col items-center text-center space-y-3 mb-12">
            <div className="inline-block rounded-lg bg-primary/10 px-3 py-1 text-sm text-primary">
              How It Works
            </div>
            <h2 className="text-3xl font-bold tracking-tight">
              Simplified Warranty Management in 4 Steps
            </h2>
            <p className="text-muted-foreground text-lg max-w-[800px]">
              Our platform makes it easy to manage your warranty claims from start to finish.
            </p>
          </div>
          
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
            {/* Step 1 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                1
              </div>
              <h3 className="text-xl font-semibold">Upload Documents</h3>
              <p className="text-muted-foreground">
                Scan or upload your receipt, invoice, or warranty card.
              </p>
            </div>
            
            {/* Step 2 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                2
              </div>
              <h3 className="text-xl font-semibold">AI Processing</h3>
              <p className="text-muted-foreground">
                Our AI extracts and validates all relevant warranty information.
              </p>
            </div>
            
            {/* Step 3 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                3
              </div>
              <h3 className="text-xl font-semibold">Submit Claim</h3>
              <p className="text-muted-foreground">
                One-click submission to manufacturers with pre-filled forms.
              </p>
            </div>
            
            {/* Step 4 */}
            <div className="flex flex-col items-center text-center space-y-3">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground text-xl font-bold">
                4
              </div>
              <h3 className="text-xl font-semibold">Track & Schedule</h3>
              <p className="text-muted-foreground">
                Monitor claim status and schedule service appointments.
              </p>
            </div>
          </div>
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="container py-12 md:py-24">
        <div className="rounded-lg border bg-card p-8 md:p-12 shadow-sm relative overflow-hidden">
          <div className="glass absolute -right-20 -top-20 h-40 w-40 rounded-full"></div>
          <div className="glass absolute -left-20 -bottom-20 h-40 w-40 rounded-full"></div>
          <div className="relative z-10 flex flex-col items-center text-center space-y-4 max-w-[800px] mx-auto">
            <h2 className="text-3xl font-bold tracking-tight">
              Ready to Transform Your Warranty Experience?
            </h2>
            <p className="text-muted-foreground text-lg">
              Join thousands of users who have simplified their warranty management process with our AI-powered platform.
            </p>
            <div className="flex flex-col sm:flex-row gap-3 mt-2">
              <Button size="lg" asChild>
                <Link to="/register">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button variant="outline" size="lg" asChild>
                <Link to="/demo">
                  Request Demo
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
      
      {/* Trust Section */}
      <section className="container py-12">
        <div className="grid gap-8 md:grid-cols-3">
          {/* Trust Item 1 */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-2">
              <Shield className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Secure & Private</h3>
            <p className="text-sm text-muted-foreground">
              Your data is encrypted and protected with industry-leading security measures.
            </p>
          </div>
          
          {/* Trust Item 2 */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-2">
              <Zap className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Fast & Efficient</h3>
            <p className="text-sm text-muted-foreground">
              Our AI processes documents in seconds, saving you hours of manual work.
            </p>
          </div>
          
          {/* Trust Item 3 */}
          <div className="flex flex-col items-center text-center space-y-2">
            <div className="flex h-12 w-12 items-center justify-center rounded-md bg-primary/10 mb-2">
              <Database className="h-6 w-6 text-primary" />
            </div>
            <h3 className="text-lg font-semibold">Comprehensive Support</h3>
            <p className="text-sm text-muted-foreground">
              Supporting thousands of manufacturers and product categories.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export default Index;
