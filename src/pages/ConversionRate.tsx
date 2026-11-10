import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Target, TrendingUp, TrendingDown, Calendar, Filter, Download, BarChart3, PieChart, Activity, Users, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Badge } from "@src/components/ui/badge";
import { Progress } from "@src/components/ui/progress";

export default function ConversionRate() {
  const [timeRange, setTimeRange] = useState("30d");
  const [segmentFilter, setSegmentFilter] = useState("all");

  const conversionStats = [
    { metric: "Overall Conversion Rate", value: "18.5%", change: "+5.8%", trend: "up" },
    { metric: "Best Performing Channel", value: "WhatsApp (24.7%)", change: "+8.2%", trend: "up" },
    { metric: "Average Time to Convert", value: "3.2 days", change: "-0.8 days", trend: "up" },
    { metric: "Conversion Value", value: "$66.38", change: "+12.4%", trend: "up" }
  ];

  const conversionByChannel = [
    { channel: "WhatsApp", rate: 24.7, conversions: 85, referrals: 344, revenue: 7340, avgValue: 86.35 },
    { channel: "Email", rate: 21.3, conversions: 221, referrals: 1038, revenue: 18720, avgValue: 84.71 },
    { channel: "Direct Link", rate: 19.8, conversions: 69, referrals: 349, revenue: 8950, avgValue: 129.71 },
    { channel: "Social Media", rate: 17.4, conversions: 105, referrals: 603, revenue: 14230, avgValue: 135.52 },
    { channel: "SMS", rate: 13.6, conversions: 46, referrals: 338, revenue: 4610, avgValue: 100.22 }
  ];

  const conversionFunnel = [
    { stage: "Referral Link Shared", count: 5432, percentage: 100.0, dropoff: 0 },
    { stage: "Link Clicked", count: 4721, percentage: 86.9, dropoff: 13.1 },
    { stage: "Landing Page Visited", count: 4234, percentage: 77.9, dropoff: 10.3 },
    { stage: "Account Created", count: 2156, percentage: 39.7, dropoff: 49.1 },
    { stage: "First Purchase", count: 1347, percentage: 24.8, dropoff: 37.5 },
    { stage: "Repeat Purchase", count: 892, percentage: 16.4, dropoff: 33.8 }
  ];

  const conversionBySegment = [
    { segment: "New Customers", rate: 28.4, conversions: 312, value: 45.50, timeToConvert: 2.1 },
    { segment: "Returning Customers", rate: 22.7, conversions: 189, value: 78.20, timeToConvert: 1.8 },
    { segment: "Premium Users", rate: 35.6, conversions: 67, value: 145.80, timeToConvert: 1.2 },
    { segment: "Free Users", rate: 15.2, conversions: 423, value: 32.40, timeToConvert: 4.6 }
  ];

  const conversionTrends = [
    { period: "Week 1", rate: 16.2, conversions: 89, referrals: 549, improvement: "+2.1%" },
    { period: "Week 2", rate: 17.8, conversions: 134, referrals: 753, improvement: "+9.9%" },
    { period: "Week 3", rate: 19.4, conversions: 156, referrals: 804, improvement: "+9.0%" },
    { period: "Week 4", rate: 18.9, conversions: 147, referrals: 778, improvement: "-2.6%" }
  ];

  const conversionFactors = [
    { factor: "Referrer Relationship", impact: "Strong", description: "Close friends/family convert 40% better" },
    { factor: "Incentive Value", impact: "High", description: "Higher rewards increase conversion by 35%" },
    { factor: "Product Fit", impact: "Critical", description: "Product relevance affects 60% of conversions" },
    { factor: "Timing", impact: "Medium", description: "Weekend referrals convert 15% better" },
    { factor: "Message Quality", impact: "High", description: "Personalized messages improve conversion by 28%" },
    { factor: "Trust Score", impact: "Strong", description: "Verified referrers see 45% higher conversion" }
  ];

  const conversionCohorts = [
    { cohort: "Jan 2025", month1: 18.5, month2: 24.2, month3: 28.7, improvement: "+10.2%" },
    { cohort: "Dec 2024", month1: 16.8, month2: 22.1, month3: 26.4, improvement: "+9.6%" },
    { cohort: "Nov 2024", month1: 15.2, month2: 20.8, month3: 24.9, improvement: "+9.7%" },
    { cohort: "Oct 2024", month1: 14.7, month2: 19.3, month3: 23.1, improvement: "+8.4%" }
  ];

  const topConverters = [
    { name: "Sarah Johnson", conversions: 18, referrals: 47, rate: 38.3, revenue: 2340, avgValue: 130 },
    { name: "Mike Chen", conversions: 15, referrals: 42, rate: 35.7, revenue: 1890, avgValue: 126 },
    { name: "Lisa Martinez", conversions: 14, referrals: 39, rate: 35.9, revenue: 1560, avgValue: 111 },
    { name: "David Wilson", conversions: 12, referrals: 36, rate: 33.3, revenue: 1320, avgValue: 110 },
    { name: "Emma Brown", conversions: 11, referrals: 34, rate: 32.4, revenue: 1180, avgValue: 107 }
  ];

  const conversionOptimization = [
    { metric: "A/B Test Results", value: "23.4% vs 18.1%", description: "Personalized vs generic messages" },
    { metric: "Optimal Send Time", value: "2-4 PM", description: "Peak conversion window" },
    { metric: "Best Day", value: "Tuesday", description: "Highest conversion day of week" },
    { metric: "Message Length", value: "75-125 words", description: "Optimal message length for conversion" }
  ];

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case "Critical": return "bg-red-100 text-red-800";
      case "High": return "bg-orange-100 text-orange-800";
      case "Strong": return "bg-yellow-100 text-yellow-800";
      case "Medium": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center gap-4 mb-4">
            <Link to="/referrals/referrals">
              <Button variant="ghost" size="sm">
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Referrals
              </Button>
            </Link>
          </div>
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">Conversion Rate Analysis</h2>
              <p className="text-sm text-gray-600 mt-1">Deep dive into referral conversion performance and optimization opportunities</p>
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
                Export Report
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="space-y-6">
            {/* Key Metrics */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              {conversionStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Target className="h-5 w-5 text-purple-600" />
                        <h3 className="text-sm font-medium text-gray-600">{stat.metric}</h3>
                      </div>
                      <div className={`flex items-center gap-1 ${
                        stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
                      }`}>
                        {stat.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                        <span className="text-sm font-medium">{stat.change}</span>
                      </div>
                    </div>
                    <div className="mt-2">
                      <div className="text-2xl font-bold text-gray-900">{stat.value}</div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Conversion by Channel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Conversion Rate by Channel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionByChannel.map((channel, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{channel.channel}</h4>
                        <Badge variant="outline" className="text-green-600">
                          {channel.rate}% conversion
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Rate</div>
                          <div className="font-bold text-lg text-purple-600">{channel.rate}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Conversions</div>
                          <div className="font-bold text-lg text-green-600">{channel.conversions}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Referrals</div>
                          <div className="font-bold text-lg">{channel.referrals}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Revenue</div>
                          <div className="font-bold text-lg text-blue-600">${channel.revenue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Avg Value</div>
                          <div className="font-bold text-lg text-orange-600">${channel.avgValue}</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={channel.rate} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Funnel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Conversion Funnel Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFunnel.map((stage, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center gap-3">
                          <div className="flex items-center justify-center w-8 h-8 bg-blue-100 rounded-full">
                            <span className="text-sm font-bold text-blue-600">{index + 1}</span>
                          </div>
                          <h4 className="font-medium text-gray-900">{stage.stage}</h4>
                        </div>
                        <Badge variant="outline" className="text-blue-600">
                          {stage.percentage.toFixed(1)}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Count</div>
                          <div className="font-bold text-lg">{stage.count.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Conversion Rate</div>
                          <div className="font-bold text-lg text-blue-600">{stage.percentage.toFixed(1)}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Drop-off</div>
                          <div className="font-bold text-lg text-red-600">{stage.dropoff.toFixed(1)}%</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={stage.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion by Segment */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-orange-600" />
                  Conversion by Customer Segment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionBySegment.map((segment, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{segment.segment}</h4>
                        <Badge variant="outline" className="text-orange-600">
                          {segment.rate}% conversion
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Rate</div>
                          <div className="font-bold text-lg text-orange-600">{segment.rate}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Conversions</div>
                          <div className="font-bold text-lg text-green-600">{segment.conversions}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Avg Value</div>
                          <div className="font-bold text-lg text-blue-600">${segment.value}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Time to Convert</div>
                          <div className="font-bold text-lg text-purple-600">{segment.timeToConvert} days</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Weekly Conversion Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionTrends.map((trend, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{trend.period}</h4>
                        <Badge variant="outline" className={trend.improvement.includes('+') ? 'text-green-600' : 'text-red-600'}>
                          {trend.improvement}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Rate</div>
                          <div className="font-bold text-lg text-red-600">{trend.rate}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Conversions</div>
                          <div className="font-bold text-lg text-green-600">{trend.conversions}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Referrals</div>
                          <div className="font-bold text-lg">{trend.referrals}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Improvement</div>
                          <div className={`font-bold text-lg ${trend.improvement.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {trend.improvement}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Conversion Factors */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-yellow-600" />
                  Key Conversion Factors
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionFactors.map((factor, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{factor.factor}</h4>
                        <p className="text-sm text-gray-500 mt-1">{factor.description}</p>
                      </div>
                      <Badge className={`${getImpactColor(factor.impact)} border-0`}>
                        {factor.impact} Impact
                      </Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Cohort Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Conversion Cohort Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {conversionCohorts.map((cohort, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{cohort.cohort}</h4>
                        <Badge variant="outline" className="text-green-600">
                          {cohort.improvement}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Month 1</div>
                          <div className="font-bold text-lg">{cohort.month1}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Month 2</div>
                          <div className="font-bold text-lg text-blue-600">{cohort.month2}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Month 3</div>
                          <div className="font-bold text-lg text-green-600">{cohort.month3}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Improvement</div>
                          <div className="font-bold text-lg text-purple-600">{cohort.improvement}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Converters */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <DollarSign className="h-5 w-5 text-blue-600" />
                  Top Converting Referrers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium text-gray-600">Referrer</th>
                        <th className="text-left p-3 font-medium text-gray-600">Conv. Rate</th>
                        <th className="text-left p-3 font-medium text-gray-600">Conversions</th>
                        <th className="text-left p-3 font-medium text-gray-600">Revenue</th>
                        <th className="text-left p-3 font-medium text-gray-600">Avg. Value</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topConverters.map((converter, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-purple-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {converter.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="font-medium text-gray-900">{converter.name}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-purple-600">{converter.rate}%</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-green-600">{converter.conversions}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-blue-600">${converter.revenue.toLocaleString()}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-orange-600">${converter.avgValue}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Optimization Insights */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-purple-600" />
                  Conversion Optimization Insights
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {conversionOptimization.map((insight, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{insight.metric}</h4>
                          <p className="text-sm text-gray-500 mt-1">{insight.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-lg font-bold text-purple-600">{insight.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  );
}