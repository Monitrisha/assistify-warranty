
import React from 'react';
import Layout from '@/components/layout/Layout';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  BarChart, FileText, Calendar, Clock, ArrowUpRight, 
  CheckCircle, AlertCircle, Clock3, Upload
} from 'lucide-react';
import { Progress } from '@/components/ui/progress';
import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

// Sample data for the dashboard
const claimStatusData = [
  { name: 'Jan', active: 4, resolved: 2, rejected: 1 },
  { name: 'Feb', active: 3, resolved: 3, rejected: 2 },
  { name: 'Mar', active: 5, resolved: 4, rejected: 0 },
  { name: 'Apr', active: 6, resolved: 2, rejected: 1 },
  { name: 'May', active: 4, resolved: 6, rejected: 0 },
  { name: 'Jun', active: 2, resolved: 8, rejected: 1 },
];

const recentClaims = [
  { 
    id: 'WC-2023-001',
    product: 'MacBook Pro 16"',
    status: 'Processing',
    submitted: '2 days ago',
    warranty: 'AppleCare+',
    statusColor: 'text-amber-500'
  },
  { 
    id: 'WC-2023-002',
    product: 'Samsung Galaxy S22',
    status: 'Approved',
    submitted: '5 days ago',
    warranty: 'Samsung Premium Care',
    statusColor: 'text-green-500'
  },
  { 
    id: 'WC-2023-003',
    product: 'Sony WH-1000XM4',
    status: 'Waiting for Parts',
    submitted: '1 week ago',
    warranty: 'Sony Extended Care',
    statusColor: 'text-amber-500'
  },
  { 
    id: 'WC-2023-004',
    product: 'LG OLED TV',
    status: 'Technician Assigned',
    submitted: '3 days ago',
    warranty: 'LG Care+',
    statusColor: 'text-blue-500'
  },
];

const upcomingAppointments = [
  {
    id: 'APT-2023-001',
    product: 'MacBook Pro 16"',
    date: 'Tomorrow, 10:00 AM',
    technician: 'John Smith',
    location: 'Service Center'
  },
  {
    id: 'APT-2023-002',
    product: 'LG OLED TV',
    date: 'Jul 15, 2023, 1:30 PM',
    technician: 'Robert Johnson',
    location: 'Home Visit'
  },
];

const Dashboard = () => {
  return (
    <Layout>
      <div className="container animate-fade-in">
        <div className="flex flex-col space-y-4 md:flex-row md:items-center md:justify-between md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">Dashboard</h1>
            <p className="text-muted-foreground">
              Manage your warranty claims and appointments
            </p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm">
              <Calendar className="mr-2 h-4 w-4" />
              Calendar View
            </Button>
            <Button size="sm">
              <Upload className="mr-2 h-4 w-4" />
              New Claim
            </Button>
          </div>
        </div>

        {/* Stats Overview */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mt-8">
          {/* Active Claims */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Active Claims
              </CardTitle>
              <FileText className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">12</div>
              <p className="text-xs text-muted-foreground">
                +2 from last month
              </p>
              <Progress value={65} className="mt-3 h-1" />
            </CardContent>
          </Card>
          
          {/* Resolved Claims */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Resolved Claims
              </CardTitle>
              <CheckCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">24</div>
              <p className="text-xs text-muted-foreground">
                +8 from last month
              </p>
              <Progress value={80} className="mt-3 h-1" />
            </CardContent>
          </Card>
          
          {/* Pending Appointments */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Pending Appointments
              </CardTitle>
              <Calendar className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">3</div>
              <p className="text-xs text-muted-foreground">
                Next one in 2 days
              </p>
              <Progress value={30} className="mt-3 h-1" />
            </CardContent>
          </Card>
          
          {/* Expiring Warranties */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">
                Expiring Warranties
              </CardTitle>
              <AlertCircle className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">5</div>
              <p className="text-xs text-muted-foreground">
                Within next 30 days
              </p>
              <Progress value={45} className="mt-3 h-1" />
            </CardContent>
          </Card>
        </div>

        {/* Chart & Recent Claims */}
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
          {/* Chart */}
          <Card className="lg:col-span-4">
            <CardHeader>
              <CardTitle>Claim Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <ResponsiveContainer width="100%" height={350}>
                <AreaChart
                  data={claimStatusData}
                  margin={{
                    top: 10,
                    right: 30,
                    left: 0,
                    bottom: 0,
                  }}
                >
                  <CartesianGrid strokeDasharray="3 3" opacity={0.2} />
                  <XAxis dataKey="name" />
                  <YAxis />
                  <Tooltip />
                  <Area type="monotone" dataKey="active" stackId="1" stroke="#3b82f6" fill="#3b82f6" />
                  <Area type="monotone" dataKey="resolved" stackId="1" stroke="#10b981" fill="#10b981" />
                  <Area type="monotone" dataKey="rejected" stackId="1" stroke="#ef4444" fill="#ef4444" />
                </AreaChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
          
          {/* Recent Activity */}
          <Card className="lg:col-span-3">
            <CardHeader>
              <CardTitle>Recent Claims</CardTitle>
              <CardDescription>
                Your latest warranty claim activities
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentClaims.map((claim) => (
                  <div key={claim.id} className="flex items-start gap-4">
                    <div className="rounded-md bg-primary/10 p-2">
                      <FileText className="h-4 w-4 text-primary" />
                    </div>
                    <div className="flex-1 space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {claim.product}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        Claim #{claim.id} • {claim.warranty}
                      </p>
                      <div className="flex items-center pt-1">
                        <Clock3 className="mr-1 h-3 w-3 text-muted-foreground" />
                        <span className="text-xs text-muted-foreground">
                          {claim.submitted}
                        </span>
                        <div className={`ml-auto text-xs font-medium ${claim.statusColor}`}>
                          {claim.status}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Tabs for Appointments and Warranties */}
        <div className="mt-4">
          <Tabs defaultValue="appointments" className="w-full">
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="appointments">Upcoming Appointments</TabsTrigger>
              <TabsTrigger value="warranties">My Warranties</TabsTrigger>
            </TabsList>
            <TabsContent value="appointments" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Scheduled Service</CardTitle>
                  <CardDescription>
                    Your upcoming service appointments
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  {upcomingAppointments.length > 0 ? (
                    <div className="space-y-4">
                      {upcomingAppointments.map((appointment) => (
                        <div key={appointment.id} className="flex items-start gap-4">
                          <div className="rounded-md bg-primary/10 p-2">
                            <Calendar className="h-4 w-4 text-primary" />
                          </div>
                          <div className="flex-1 space-y-1">
                            <div className="flex items-center justify-between">
                              <p className="text-sm font-medium leading-none">
                                {appointment.product}
                              </p>
                              <Button variant="ghost" size="sm" className="h-7 gap-1 text-xs">
                                Reschedule
                                <Clock className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-sm text-muted-foreground">
                              ID: {appointment.id} • {appointment.location}
                            </p>
                            <div className="flex items-center pt-1">
                              <Clock3 className="mr-1 h-3 w-3 text-muted-foreground" />
                              <span className="text-xs text-muted-foreground">
                                {appointment.date}
                              </span>
                              <div className="ml-auto text-xs">
                                Technician: {appointment.technician}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  ) : (
                    <div className="flex flex-col items-center justify-center py-8 text-center">
                      <Calendar className="h-10 w-10 text-muted-foreground mb-2" />
                      <h3 className="text-lg font-medium">No upcoming appointments</h3>
                      <p className="text-sm text-muted-foreground">
                        Schedule a service appointment for your devices
                      </p>
                      <Button className="mt-4">
                        Schedule Service
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>
            <TabsContent value="warranties" className="mt-4">
              <Card>
                <CardHeader>
                  <CardTitle>Active Warranties</CardTitle>
                  <CardDescription>
                    Your registered product warranties
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">MacBook Pro 16"</h4>
                          <p className="text-sm text-muted-foreground">AppleCare+ (Valid until Dec 12, 2024)</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Details <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Warranty Coverage</span>
                          <span className="font-medium">65%</span>
                        </div>
                        <Progress value={65} className="mt-2 h-1" />
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">Samsung Galaxy S22</h4>
                          <p className="text-sm text-muted-foreground">Samsung Premium Care (Valid until Aug 30, 2023)</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Details <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Warranty Coverage</span>
                          <span className="font-medium">22%</span>
                        </div>
                        <Progress value={22} className="mt-2 h-1" />
                      </div>
                    </div>
                    
                    <div className="rounded-lg border p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h4 className="font-medium">LG OLED TV</h4>
                          <p className="text-sm text-muted-foreground">LG Care+ (Valid until May 15, 2025)</p>
                        </div>
                        <Button variant="outline" size="sm">
                          Details <ArrowUpRight className="ml-1 h-3 w-3" />
                        </Button>
                      </div>
                      <div className="mt-3">
                        <div className="flex items-center justify-between text-sm">
                          <span>Warranty Coverage</span>
                          <span className="font-medium">88%</span>
                        </div>
                        <Progress value={88} className="mt-2 h-1" />
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </Layout>
  );
};

export default Dashboard;
