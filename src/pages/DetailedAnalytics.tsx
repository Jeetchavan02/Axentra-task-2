import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  ArrowLeft,
  Share2,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Calendar,
  Filter,
  Download,
  BarChart3,
  Activity,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Award,
  Zap
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Badge } from "@src/components/ui/badge";
import { Progress } from "@src/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";

export default function DetailedAnalytics() {
  const [timeRange, setTimeRange] = useState("30d");

  const [comprehensiveMetrics, setComprehensiveMetrics] = useState([
    { title: "Total Referrals", value: "0", change: "+0%", trend: "neutral", icon: Share2 },
    { title: "Active Referrers", value: "0", change: "+0%", trend: "neutral", icon: Users },
    { title: "Conversion Rate", value: "0%", change: "+0%", trend: "neutral", icon: Target },
    { title: "Total Revenue", value: "$0", change: "+0%", trend: "neutral", icon: DollarSign },
    { title: "Avg Order Value", value: "$0", change: "+0%", trend: "neutral", icon: Activity },
    { title: "Click-Through Rate", value: "0%", change: "+0%", trend: "neutral", icon: Zap },
    { title: "Share Rate", value: "0%", change: "+0%", trend: "neutral", icon: Globe },
    { title: "Total Commissions", value: "$0", change: "+0%", trend: "neutral", icon: Award }
  ]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setComprehensiveMetrics(prev => [
            { ...prev[0], value: data.totalConversions.toLocaleString(), trend: "neutral" }, // Total Referrals -> Conversions
            { ...prev[1], value: data.totalReferrers.toLocaleString(), trend: "neutral" }, // Active Referrers -> Registered Users
            { ...prev[2], value: data.conversionRate + "%", trend: "neutral" },
            { ...prev[3], value: "$" + data.totalRevenue.toLocaleString(), trend: "neutral" },
            { ...prev[4], value: "$0", trend: "neutral" }, // No backend data yet
            { ...prev[5], value: "0%", trend: "neutral" }, // No backend data yet
            { ...prev[6], value: "0%", trend: "neutral" }, // No backend data yet
            { ...prev[7], value: "$0", trend: "neutral" }  // No backend data yet
          ]);
        }
      } catch (error) {
        console.error("Error fetching detailed analytics:", error);
      }
    };
    fetchStats();
  }, []);

  const performanceByChannel = [
    { channel: "Email", referrals: 1456, conversions: 221, rate: 15.2, revenue: 18720, growth: "+28.7%" },
    { channel: "Social Media", referrals: 892, conversions: 105, rate: 11.8, revenue: 14230, growth: "+22.3%" },
    { channel: "Direct Link", referrals: 734, conversions: 69, rate: 9.4, revenue: 8950, growth: "+15.4%" },
    { channel: "WhatsApp", referrals: 456, conversions: 85, rate: 18.7, revenue: 7340, growth: "+45.6%" },
    { channel: "SMS", referrals: 354, conversions: 46, rate: 13.1, revenue: 4610, growth: "+18.9%" }
  ];

  const geographicData = [
    { country: "United States", referrals: 1456, revenue: 18720, percentage: 37.4 },
    { country: "Canada", referrals: 578, revenue: 7890, percentage: 14.9 },
    { country: "United Kingdom", referrals: 432, revenue: 6540, percentage: 11.1 },
    { country: "Australia", referrals: 289, revenue: 4320, percentage: 7.4 },
    { country: "Germany", referrals: 234, revenue: 3450, percentage: 6.0 },
    { country: "France", referrals: 198, revenue: 2890, percentage: 5.1 },
    { country: "Others", referrals: 705, revenue: 8040, percentage: 18.1 }
  ];

  const deviceAnalytics = [
    { device: "Mobile", users: 2456, percentage: 63.1, conversionRate: 14.2, revenue: 28450 },
    { device: "Desktop", users: 1234, percentage: 31.7, conversionRate: 18.9, revenue: 16890 },
    { device: "Tablet", users: 202, percentage: 5.2, conversionRate: 12.7, revenue: 2510 }
  ];

  const cohortAnalysis = [
    { cohort: "Jan 2025", users: 145, month1: 145, month2: 123, month3: 98, month4: 87, retention: 60.0 },
    { cohort: "Dec 2024", users: 132, month1: 132, month2: 118, month3: 94, month4: 81, retention: 61.4 },
    { cohort: "Nov 2024", users: 128, month1: 128, month2: 115, month3: 89, month4: 76, retention: 59.4 },
    { cohort: "Oct 2024", users: 119, month1: 119, month2: 102, month3: 79, month4: 68, retention: 57.1 }
  ];

  const funnelSteps = [
    { step: "Referral Links Shared", count: 5432, percentage: 100.0, dropoff: 0 },
    { step: "Links Clicked", count: 4721, percentage: 86.9, dropoff: 13.1 },
    { step: "Visited Website", count: 4234, percentage: 77.9, dropoff: 10.3 },
    { step: "Browsed Products", count: 3456, percentage: 63.6, dropoff: 18.4 },
    { step: "Added to Cart", count: 2156, percentage: 39.7, dropoff: 37.6 },
    { step: "Initiated Checkout", count: 1678, percentage: 30.9, dropoff: 22.2 },
    { step: "Completed Purchase", count: 1347, percentage: 24.8, dropoff: 19.7 }
  ];

  const timeSeriesData = [
    { period: "Week 1", referrals: 892, conversions: 109, revenue: 11340, ctr: 8.2 },
    { period: "Week 2", referrals: 945, conversions: 121, revenue: 12780, ctr: 8.9 },
    { period: "Week 3", referrals: 1023, conversions: 134, revenue: 14230, ctr: 9.3 },
    { period: "Week 4", referrals: 1032, conversions: 128, revenue: 13890, ctr: 9.1 }
  ];

  const topPerformers = [
    { name: "Sarah Johnson", email: "sarah.j@example.com", referrals: 47, conversions: 18, revenue: 2340, tier: "Champion" },
    { name: "Mike Chen", email: "mike.c@example.com", referrals: 42, conversions: 15, revenue: 1890, tier: "Champion" },
    { name: "Lisa Martinez", email: "lisa.m@example.com", referrals: 39, conversions: 14, revenue: 1560, tier: "Advocate" },
    { name: "David Wilson", email: "david.w@example.com", referrals: 36, conversions: 12, revenue: 1320, tier: "Advocate" },
    { name: "Emma Brown", email: "emma.b@example.com", referrals: 34, conversions: 11, revenue: 1180, tier: "Supporter" }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Champion": return "bg-yellow-100 text-yellow-800";
      case "Advocate": return "bg-purple-100 text-purple-800";
      case "Supporter": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/referrals/analytics">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Analytics
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">Detailed Referrals Analytics</h2>
              <p className="text-sm text-gray-600 mt-1">Comprehensive analysis of referral program performance and insights</p>
            </div>
            <div className="flex items-center space-x-4">
              <select
                value={timeRange}
                onChange={(e) => setTimeRange(e.target.value)}
                className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
              >
                <option value="7d">Last 7 days</option>
                <option value="30d">Last 30 days</option>
                <option value="90d">Last 90 days</option>
                <option value="1y">Last year</option>
              </select>
              <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                <Filter className="h-4 w-4 mr-2" />
                Filter
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Download className="h-4 w-4 mr-2" />
                Export Data
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="geographic">Geographic</TabsTrigger>
              <TabsTrigger value="devices">Devices</TabsTrigger>
              <TabsTrigger value="cohort">Cohort</TabsTrigger>
              <TabsTrigger value="funnel">Funnel</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Comprehensive Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {comprehensiveMetrics.map((metric, index) => (
                  <Card key={index} className="hover:shadow-md transition-shadow">
                    <CardContent className="p-6">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-2">
                          <metric.icon className="h-5 w-5 text-blue-600" />
                          <h3 className="text-sm font-medium text-gray-600">{metric.title}</h3>
                        </div>
                        <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                          }`}>
                          {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                          <span className="text-sm font-medium">{metric.change}</span>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-2xl font-bold text-gray-900">{metric.value}</div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>

              {/* Time Series Performance */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Calendar className="h-5 w-5 text-blue-600" />
                    Performance Over Time
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {timeSeriesData.map((period, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{period.period}</h4>
                          <Badge variant="outline" className="text-blue-600">
                            {period.referrals} referrals
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Referrals</div>
                            <div className="font-bold text-lg">{period.referrals}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Conversions</div>
                            <div className="font-bold text-lg text-green-600">{period.conversions}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Revenue</div>
                            <div className="font-bold text-lg text-blue-600">${period.revenue.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">CTR</div>
                            <div className="font-bold text-lg text-purple-600">{period.ctr}%</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Top Performers */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Award className="h-5 w-5 text-yellow-600" />
                    Top Performing Referrers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3 font-medium text-gray-600">Referrer</th>
                          <th className="text-left p-3 font-medium text-gray-600">Tier</th>
                          <th className="text-left p-3 font-medium text-gray-600">Referrals</th>
                          <th className="text-left p-3 font-medium text-gray-600">Conversions</th>
                          <th className="text-left p-3 font-medium text-gray-600">Revenue</th>
                        </tr>
                      </thead>
                      <tbody>
                        {topPerformers.map((performer, index) => (
                          <tr key={index} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div className="flex items-center gap-3">
                                <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                  {performer.name.split(' ').map(n => n[0]).join('')}
                                </div>
                                <div>
                                  <div className="font-medium text-gray-900">{performer.name}</div>
                                  <div className="text-xs text-gray-500">{performer.email}</div>
                                </div>
                              </div>
                            </td>
                            <td className="p-3">
                              <Badge className={`${getTierColor(performer.tier)} border-0`}>
                                {performer.tier}
                              </Badge>
                            </td>
                            <td className="p-3">
                              <div className="font-medium text-gray-900">{performer.referrals}</div>
                            </td>
                            <td className="p-3">
                              <div className="font-medium text-green-600">{performer.conversions}</div>
                            </td>
                            <td className="p-3">
                              <div className="font-medium text-blue-600">${performer.revenue.toLocaleString()}</div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              {/* Performance by Channel */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <BarChart3 className="h-5 w-5 text-green-600" />
                    Performance by Channel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {performanceByChannel.map((channel, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{channel.channel}</h4>
                          <Badge variant="outline" className="text-green-600">
                            {channel.growth}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Referrals</div>
                            <div className="font-bold text-lg">{channel.referrals}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Conversions</div>
                            <div className="font-bold text-lg text-green-600">{channel.conversions}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Rate</div>
                            <div className="font-bold text-lg text-blue-600">{channel.rate}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Revenue</div>
                            <div className="font-bold text-lg text-purple-600">${channel.revenue.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="geographic" className="space-y-6">
              {/* Geographic Distribution */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <MapPin className="h-5 w-5 text-red-600" />
                    Geographic Distribution
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {geographicData.map((location, index) => (
                      <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="w-3 h-3 bg-red-500 rounded-full"></div>
                          <div>
                            <div className="font-medium text-gray-900">{location.country}</div>
                            <div className="text-sm text-gray-500">{location.percentage}% of total</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <div className="text-right">
                            <div className="font-bold text-lg">{location.referrals}</div>
                            <div className="text-sm text-gray-500">referrals</div>
                          </div>
                          <div className="text-right">
                            <div className="font-bold text-lg text-green-600">${location.revenue.toLocaleString()}</div>
                            <div className="text-sm text-gray-500">revenue</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="devices" className="space-y-6">
              {/* Device Analytics */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Smartphone className="h-5 w-5 text-orange-600" />
                    Device Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {deviceAnalytics.map((device, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            {device.device === 'Mobile' && <Smartphone className="h-4 w-4 text-orange-600" />}
                            {device.device === 'Desktop' && <Monitor className="h-4 w-4 text-blue-600" />}
                            {device.device === 'Tablet' && <Smartphone className="h-4 w-4 text-green-600" />}
                            <h4 className="font-medium text-gray-900">{device.device}</h4>
                          </div>
                          <Badge variant="outline" className="text-orange-600">
                            {device.percentage}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Users</div>
                            <div className="font-bold text-lg">{device.users}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Percentage</div>
                            <div className="font-bold text-lg text-orange-600">{device.percentage}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Conversion Rate</div>
                            <div className="font-bold text-lg text-green-600">{device.conversionRate}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Revenue</div>
                            <div className="font-bold text-lg text-blue-600">${device.revenue.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cohort" className="space-y-6">
              {/* Cohort Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Users className="h-5 w-5 text-purple-600" />
                    Cohort Retention Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {cohortAnalysis.map((cohort, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <h4 className="font-medium text-gray-900">{cohort.cohort}</h4>
                          <Badge variant="outline" className="text-purple-600">
                            {cohort.retention}% retention
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Initial Users</div>
                            <div className="font-bold text-lg">{cohort.users}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Month 1</div>
                            <div className="font-bold text-lg">{cohort.month1}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Month 2</div>
                            <div className="font-bold text-lg">{cohort.month2}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Month 3</div>
                            <div className="font-bold text-lg">{cohort.month3}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Month 4</div>
                            <div className="font-bold text-lg text-purple-600">{cohort.month4}</div>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="funnel" className="space-y-6">
              {/* Funnel Analysis */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Target className="h-5 w-5 text-blue-600" />
                    Conversion Funnel Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {funnelSteps.map((step, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-3">
                            <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                              <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                            </div>
                            <h4 className="font-medium text-gray-900">{step.step}</h4>
                          </div>
                          <Badge variant="outline" className="text-blue-600">
                            {step.percentage.toFixed(1)}%
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Users</div>
                            <div className="font-bold text-lg">{step.count.toLocaleString()}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Conversion Rate</div>
                            <div className="font-bold text-lg text-blue-600">{step.percentage.toFixed(1)}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Drop-off</div>
                            <div className="font-bold text-lg text-red-600">{step.dropoff.toFixed(1)}%</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={step.percentage} className="h-2" />
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}