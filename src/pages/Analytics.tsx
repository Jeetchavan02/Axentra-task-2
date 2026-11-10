import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  DollarSign,
  Target,
  Calendar,
  Download,
  Share,
  RefreshCw,
  Smartphone,
  Monitor,
  MapPin,
  User
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Progress } from "@src/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";

export default function ReferralsAnalytics() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedProgram, setSelectedProgram] = useState("all");

  // State for analytics data
  const [analyticsData, setAnalyticsData] = useState({
    overview: {
      totalReferrals: 0,
      totalReferrers: 0,
      activeReferrers: 0,
      totalConversions: 0,
      totalRevenue: 0,
      totalCommissions: 0,
      clickThroughRate: 0,
      shareRate: 0,
      conversionRate: 0,
      averageOrderValue: 0
    },
    // Keep mock data for sections not yet supported by backend
    trends: {
      referralsGrowth: 23.5,
      revenueGrowth: 18.2,
      conversionGrowth: 5.8,
      referrerGrowth: 15.7
    },
    topChannels: [
      // { name: "Email", referrals: 1456, conversion: 15.2, revenue: 18720 },
      // { name: "Social Media", referrals: 892, conversion: 11.8, revenue: 14230 },
      { name: "Direct Link", referrals: 734, conversion: 9.4, revenue: 8950 },
      // { name: "WhatsApp", referrals: 456, conversion: 18.7, revenue: 7340 },
      // { name: "SMS", referrals: 354, conversion: 13.1, revenue: 4610 }
    ],
    demographics: {
      ageGroups: [
        { group: "18-24", percentage: 23, count: 287 },
        { group: "25-34", percentage: 34, count: 424 },
        { group: "35-44", percentage: 28, count: 349 },
        { group: "45-54", percentage: 12, count: 150 },
        { group: "55+", percentage: 3, count: 37 }
      ],
      topCities: [
        { city: "New York", count: 234, percentage: 18.8 },
        { city: "Los Angeles", count: 189, percentage: 15.2 },
        { city: "Chicago", count: 156, percentage: 12.5 },
        { city: "Houston", count: 134, percentage: 10.7 },
        { city: "Phoenix", count: 89, percentage: 7.1 }
      ],
      devices: [
        { device: "Mobile", count: 2456, percentage: 63.1 },
        { device: "Desktop", count: 1234, percentage: 31.7 },
        { device: "Tablet", count: 202, percentage: 5.2 }
      ]
    },
    cohortAnalysis: [
      { month: "Jan 2025", referrers: 45, month1: 45, month2: 38, month3: 32, month4: 28 },
      { month: "Dec 2024", referrers: 52, month1: 52, month2: 47, month3: 41, month4: 36 },
      { month: "Nov 2024", referrers: 38, month1: 38, month2: 34, month3: 29, month4: 25 },
      { month: "Oct 2024", referrers: 41, month1: 41, month2: 36, month3: 31, month4: 26 }
    ],
    funnelAnalysis: {
      steps: [
        { step: "Referral Link Shared", count: 5432, percentage: 100 },
        { step: "Link Clicked", count: 4721, percentage: 86.9 },
        { step: "Visited Website", count: 4234, percentage: 77.9 },
        { step: "Added to Cart", count: 2156, percentage: 39.7 },
        { step: "Completed Purchase", count: 1347, percentage: 24.8 }
      ]
    },
    topReferrers: [
      {
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        referrals: 47,
        conversions: 28,
        revenue: 4480,
        conversionRate: 59.6,
        avgOrderValue: 160
      },
      {
        name: "Michael Chen",
        email: "michael.c@email.com",
        referrals: 32,
        conversions: 19,
        revenue: 3230,
        conversionRate: 59.4,
        avgOrderValue: 170
      },
      {
        name: "Emma Davis",
        email: "emma.d@email.com",
        referrals: 28,
        conversions: 15,
        revenue: 2670,
        conversionRate: 53.6,
        avgOrderValue: 178
      }
    ]
  });

  // Fetch Stats from Backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setAnalyticsData(prev => ({
            ...prev,
            overview: {
              ...prev.overview,
              totalReferrals: data.totalConversions, // Map conversions to Total Referrals
              totalReferrers: data.totalReferrers, // Restore: Map to total referrers (registered users)
              activeReferrers: data.totalReferrers, // Restore: Map to total referrers
              totalConversions: data.totalConversions,
              totalRevenue: data.totalRevenue,
              conversionRate: data.conversionRate
            },
            topChannels: [
              // { name: "Email", referrals: 1456, conversion: 15.2, revenue: 18720 },
              // { name: "Social Media", referrals: 892, conversion: 11.8, revenue: 14230 },
              {
                name: "Direct Link",
                referrals: data.totalConversions,
                conversion: data.conversionRate,
                revenue: data.totalRevenue
              },
              // { name: "WhatsApp", referrals: 456, conversion: 18.7, revenue: 7340 },
              // { name: "SMS", referrals: 354, conversion: 13.1, revenue: 4610 }
            ]
          }));
        }
      } catch (error) {
        console.error("Error fetching analytics:", error);
      }
    };
    fetchStats();
  }, []);

  const timeframeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" }
  ];

  const programOptions = [
    { value: "all", label: "All Programs" },
    { value: "standard", label: "Standard Program" },
    { value: "tiered", label: "Tiered Program" },
    { value: "vip", label: "VIP Program" }
  ];

  const getGrowthColor = (growth: number) => {
    if (growth > 0) return "text-green-600";
    if (growth < 0) return "text-red-600";
    return "text-gray-600";
  };

  const getGrowthIcon = (growth: number) => {
    if (growth > 0) return <TrendingUp className="w-4 h-4" />;
    if (growth < 0) return <TrendingDown className="w-4 h-4" />;
    return <TrendingUp className="w-4 h-4" />;
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">Analytics</h2>
              <p className="text-sm text-gray-600 mt-1">Comprehensive insights into your referral program performance</p>
            </div>
            <div className="flex items-center space-x-4">
              <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Select program" />
                </SelectTrigger>
                <SelectContent>
                  {programOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Select value={selectedTimeframe} onValueChange={setSelectedTimeframe}>
                <SelectTrigger className="w-40">
                  <SelectValue placeholder="Select timeframe" />
                </SelectTrigger>
                <SelectContent>
                  {timeframeOptions.map((option) => (
                    <SelectItem key={option.value} value={option.value}>
                      {option.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                <RefreshCw className="w-4 h-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                <Download className="w-4 h-4 mr-2" />
                Export
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-5">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="performance">Performance</TabsTrigger>
              <TabsTrigger value="demographics">Demographics</TabsTrigger>
              <TabsTrigger value="cohort">Cohort Analysis</TabsTrigger>
              <TabsTrigger value="funnel">Funnel Analysis</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Referrals Analytics Card */}
              <Card className="hover:shadow-md transition-shadow">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Share className="h-5 w-5 text-blue-600" />
                    Referrals Analytics
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
                    <div className="text-center p-4 bg-blue-50 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">{analyticsData.overview.totalReferrals.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Referrals</div>
                    </div>
                    <div className="text-center p-4 bg-green-50 rounded-lg">
                      <div className="text-2xl font-bold text-green-600">{analyticsData.overview.totalReferrers.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Active Referrers</div>
                    </div>
                    <div className="text-center p-4 bg-purple-50 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">{analyticsData.overview.conversionRate}%</div>
                      <div className="text-sm text-gray-600">Conversion Rate</div>
                    </div>
                    <div className="text-center p-4 bg-orange-50 rounded-lg">
                      <div className="text-2xl font-bold text-orange-600">${analyticsData.overview.totalRevenue.toLocaleString()}</div>
                      <div className="text-sm text-gray-600">Total Revenue</div>
                    </div>
                  </div>
                  <div className="flex justify-center">
                    <Link to="/referrals/detailed-analytics">
                      <Button className="bg-black text-white hover:bg-gray-800">
                        View Detailed Analytics
                      </Button>
                    </Link>
                  </div>
                </CardContent>
              </Card>

              {/* Key Metrics */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Referrals</CardTitle>
                    <Share className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.overview.totalReferrals.toLocaleString()}</div>
                    <div className={`text-xs flex items-center ${getGrowthColor(analyticsData.trends.referralsGrowth)}`}>
                      {getGrowthIcon(analyticsData.trends.referralsGrowth)}
                      <span className="ml-1">+{analyticsData.trends.referralsGrowth}% from last period</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Referrers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.overview.totalReferrers.toLocaleString()}</div>
                    <div className={`text-xs flex items-center ${getGrowthColor(analyticsData.trends.referrerGrowth)}`}>
                      {getGrowthIcon(analyticsData.trends.referrerGrowth)}
                      <span className="ml-1">+{analyticsData.trends.referrerGrowth}% from last period</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.overview.conversionRate}%</div>
                    <div className={`text-xs flex items-center ${getGrowthColor(analyticsData.trends.conversionGrowth)}`}>
                      {getGrowthIcon(analyticsData.trends.conversionGrowth)}
                      <span className="ml-1">+{analyticsData.trends.conversionGrowth}% from last period</span>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${analyticsData.overview.totalRevenue.toLocaleString()}</div>
                    <div className={`text-xs flex items-center ${getGrowthColor(analyticsData.trends.revenueGrowth)}`}>
                      {getGrowthIcon(analyticsData.trends.revenueGrowth)}
                      <span className="ml-1">+{analyticsData.trends.revenueGrowth}% from last period</span>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Quick Stats */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Average Order Value</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${analyticsData.overview.averageOrderValue}</div>
                    <p className="text-xs text-gray-600">Per referral conversion</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Click Through Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.overview.clickThroughRate}%</div>
                    <p className="text-xs text-gray-600">Links clicked vs shared</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-sm">Share Rate</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{analyticsData.overview.shareRate}%</div>
                    <p className="text-xs text-gray-600">Users who share vs total</p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Channels */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <BarChart3 className="w-5 h-5 mr-2" />
                    Top Referral Channels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topChannels.map((channel, index) => (
                      <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-3">
                          <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                            <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                          </div>
                          <div>
                            <p className="font-medium">{channel.name}</p>
                            <p className="text-sm text-gray-600">{channel.referrals} referrals</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">{channel.conversion}% conversion</p>
                          <p className="text-sm text-gray-600">${channel.revenue.toLocaleString()} revenue</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="performance" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Users className="w-5 h-5 mr-2" />
                    Top Performing Referrers
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.topReferrers.map((referrer, index) => (
                      <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                            {index + 1}
                          </div>
                          <div>
                            <p className="font-medium">{referrer.name}</p>
                            <p className="text-sm text-gray-600">{referrer.email}</p>
                          </div>
                        </div>
                        <div className="grid grid-cols-4 gap-6 text-center">
                          <div>
                            <p className="text-sm font-medium">{referrer.referrals}</p>
                            <p className="text-xs text-gray-600">Referrals</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{referrer.conversions}</p>
                            <p className="text-xs text-gray-600">Conversions</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">{referrer.conversionRate}%</p>
                            <p className="text-xs text-gray-600">Conv. Rate</p>
                          </div>
                          <div>
                            <p className="text-sm font-medium">${referrer.revenue.toLocaleString()}</p>
                            <p className="text-xs text-gray-600">Revenue</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="demographics" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <User className="w-5 h-5 mr-2" />
                      Age Distribution
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.demographics.ageGroups.map((group, index) => (
                        <div key={index} className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span>{group.group}</span>
                            <span>{group.count} referrers ({group.percentage}%)</span>
                          </div>
                          <Progress value={group.percentage} className="h-2" />
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MapPin className="w-5 h-5 mr-2" />
                      Top Cities
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {analyticsData.demographics.topCities.map((city, index) => (
                        <div key={index} className="flex items-center justify-between">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                            </div>
                            <span className="font-medium">{city.city}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{city.count}</p>
                            <p className="text-sm text-gray-600">{city.percentage}%</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Monitor className="w-5 h-5 mr-2" />
                    Device Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    {analyticsData.demographics.devices.map((device, index) => (
                      <div key={index} className="text-center p-4 bg-gray-50 rounded-lg">
                        <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                          {device.device === 'Mobile' && <Smartphone className="w-6 h-6 text-blue-600" />}
                          {device.device === 'Desktop' && <Monitor className="w-6 h-6 text-blue-600" />}
                          {device.device === 'Tablet' && <Monitor className="w-6 h-6 text-blue-600" />}
                        </div>
                        <p className="font-medium">{device.device}</p>
                        <p className="text-2xl font-bold text-blue-600">{device.count.toLocaleString()}</p>
                        <p className="text-sm text-gray-600">{device.percentage}%</p>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="cohort" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Calendar className="w-5 h-5 mr-2" />
                    Referrer Retention Analysis
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-2">Cohort</th>
                          <th className="text-center p-2">Referrers</th>
                          <th className="text-center p-2">Month 1</th>
                          <th className="text-center p-2">Month 2</th>
                          <th className="text-center p-2">Month 3</th>
                          <th className="text-center p-2">Month 4</th>
                        </tr>
                      </thead>
                      <tbody>
                        {analyticsData.cohortAnalysis.map((cohort, index) => (
                          <tr key={index} className="border-b">
                            <td className="p-2 font-medium">{cohort.month}</td>
                            <td className="text-center p-2">{cohort.referrers}</td>
                            <td className="text-center p-2">
                              <div className="inline-flex items-center space-x-1">
                                <span>{cohort.month1}</span>
                                <span className="text-sm text-gray-500">
                                  ({Math.round((cohort.month1 / cohort.referrers) * 100)}%)
                                </span>
                              </div>
                            </td>
                            <td className="text-center p-2">
                              <div className="inline-flex items-center space-x-1">
                                <span>{cohort.month2}</span>
                                <span className="text-sm text-gray-500">
                                  ({Math.round((cohort.month2 / cohort.referrers) * 100)}%)
                                </span>
                              </div>
                            </td>
                            <td className="text-center p-2">
                              <div className="inline-flex items-center space-x-1">
                                <span>{cohort.month3}</span>
                                <span className="text-sm text-gray-500">
                                  ({Math.round((cohort.month3 / cohort.referrers) * 100)}%)
                                </span>
                              </div>
                            </td>
                            <td className="text-center p-2">
                              <div className="inline-flex items-center space-x-1">
                                <span>{cohort.month4}</span>
                                <span className="text-sm text-gray-500">
                                  ({Math.round((cohort.month4 / cohort.referrers) * 100)}%)
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="funnel" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Target className="w-5 h-5 mr-2" />
                    Referral Conversion Funnel
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {analyticsData.funnelAnalysis.steps.map((step, index) => (
                      <div key={index} className="relative">
                        <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                          <div className="flex items-center space-x-3">
                            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                              <span className="text-sm font-medium text-blue-600">{index + 1}</span>
                            </div>
                            <span className="font-medium">{step.step}</span>
                          </div>
                          <div className="text-right">
                            <p className="font-medium">{step.count.toLocaleString()}</p>
                            <p className="text-sm text-gray-600">{step.percentage}%</p>
                          </div>
                        </div>
                        <div className="mt-2">
                          <Progress value={step.percentage} className="h-2" />
                        </div>
                        {index < analyticsData.funnelAnalysis.steps.length - 1 && (
                          <div className="absolute left-4 top-16 w-0.5 h-4 bg-gray-300"></div>
                        )}
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