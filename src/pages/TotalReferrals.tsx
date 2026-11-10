import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Share2, TrendingUp, TrendingDown, Calendar, Filter, Download, Mail, MessageSquare, Globe, Smartphone, BarChart3, PieChart, Activity } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Badge } from "@src/components/ui/badge";
import { Progress } from "@src/components/ui/progress";

export default function TotalReferrals() {
  const [timeRange, setTimeRange] = useState("30d");
  const [channelFilter, setChannelFilter] = useState("all");

  const referralStats = [
    { metric: "Total Referrals", value: "3,892", change: "+23.5%", trend: "up" },
    { metric: "Successful Referrals", value: "721", change: "+18.2%", trend: "up" },
    { metric: "Pending Referrals", value: "267", change: "+15.7%", trend: "up" },
    { metric: "Failed Referrals", value: "89", change: "-12.4%", trend: "down" }
  ];

  const referralsByChannel = [
    { channel: "Email", count: 1456, percentage: 37.4, growth: "+28.7%", avgPerUser: 4.2 },
    { channel: "Social Media", count: 892, percentage: 22.9, growth: "+22.3%", avgPerUser: 3.8 },
    { channel: "Direct Link", count: 734, percentage: 18.9, growth: "+15.4%", avgPerUser: 3.4 },
    { channel: "WhatsApp", count: 456, percentage: 11.7, growth: "+45.6%", avgPerUser: 5.1 },
    { channel: "SMS", count: 354, percentage: 9.1, growth: "+18.9%", avgPerUser: 2.9 }
  ];

  const dailyReferrals = [
    { date: "Jan 1", referrals: 89, successful: 16, pending: 23, failed: 3 },
    { date: "Jan 2", referrals: 124, successful: 23, pending: 31, failed: 4 },
    { date: "Jan 3", referrals: 156, successful: 29, pending: 38, failed: 5 },
    { date: "Jan 4", referrals: 142, successful: 26, pending: 35, failed: 4 },
    { date: "Jan 5", referrals: 178, successful: 33, pending: 42, failed: 6 },
    { date: "Jan 6", referrals: 203, successful: 38, pending: 48, failed: 7 },
    { date: "Jan 7", referrals: 189, successful: 35, pending: 45, failed: 6 }
  ];

  const referralSources = [
    { source: "Referral Widget", count: 1234, percentage: 31.7 },
    { source: "Email Campaign", count: 892, percentage: 22.9 },
    { source: "Social Sharing", count: 678, percentage: 17.4 },
    { source: "Direct Share", count: 456, percentage: 11.7 },
    { source: "Incentive Program", count: 342, percentage: 8.8 },
    { source: "API Integration", count: 290, percentage: 7.5 }
  ];

  const referralOutcomes = [
    { outcome: "Converted to Customer", count: 721, percentage: 18.5, revenue: 47850 },
    { outcome: "Pending Verification", count: 267, percentage: 6.9, revenue: 0 },
    { outcome: "Account Created", count: 1234, percentage: 31.7, revenue: 0 },
    { outcome: "Email Subscribed", count: 892, percentage: 22.9, revenue: 0 },
    { outcome: "Link Clicked Only", count: 689, percentage: 17.7, revenue: 0 },
    { outcome: "Failed/Expired", count: 89, percentage: 2.3, revenue: 0 }
  ];

  const topReferralGenerators = [
    { name: "Sarah Johnson", email: "sarah.j@example.com", referrals: 47, successRate: 38.3, lastReferral: "2 hours ago" },
    { name: "Mike Chen", email: "mike.c@example.com", referrals: 42, successRate: 35.7, lastReferral: "1 day ago" },
    { name: "Lisa Martinez", email: "lisa.m@example.com", referrals: 39, successRate: 35.9, lastReferral: "3 hours ago" },
    { name: "David Wilson", email: "david.w@example.com", referrals: 36, successRate: 33.3, lastReferral: "5 hours ago" },
    { name: "Emma Brown", email: "emma.b@example.com", referrals: 34, successRate: 32.4, lastReferral: "1 day ago" }
  ];

  const referralTrends = [
    { period: "Week 1", referrals: 856, growth: 12.3, topChannel: "Email" },
    { period: "Week 2", referrals: 934, growth: 15.7, topChannel: "Social Media" },
    { period: "Week 3", referrals: 1056, growth: 18.9, topChannel: "Email" },
    { period: "Week 4", referrals: 1046, growth: 16.2, topChannel: "WhatsApp" }
  ];

  const referralQuality = [
    { metric: "High Quality Referrals", value: "2,234", description: "Referrals with high conversion potential" },
    { metric: "Medium Quality Referrals", value: "1,234", description: "Referrals with moderate engagement" },
    { metric: "Low Quality Referrals", value: "424", description: "Referrals requiring nurturing" },
    { metric: "Quality Score", value: "78.5/100", description: "Overall referral quality rating" }
  ];

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email": return Mail;
      case "Social Media": return Share2;
      case "WhatsApp": return MessageSquare;
      case "Direct Link": return Globe;
      case "SMS": return Smartphone;
      default: return Share2;
    }
  };

  const getChannelColor = (channel: string) => {
    switch (channel) {
      case "Email": return "text-blue-600";
      case "Social Media": return "text-purple-600";
      case "WhatsApp": return "text-green-600";
      case "Direct Link": return "text-orange-600";
      case "SMS": return "text-red-600";
      default: return "text-gray-600";
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
              <h2 className="text-xl font-semibold text-black">Total Referrals Analysis</h2>
              <p className="text-sm text-gray-600 mt-1">Comprehensive analysis of all referral activities and performance metrics</p>
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
              {referralStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Share2 className="h-5 w-5 text-blue-600" />
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

            {/* Referrals by Channel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-green-600" />
                  Referrals by Channel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralsByChannel.map((channel, index) => {
                    const IconComponent = getChannelIcon(channel.channel);
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <IconComponent className={`h-4 w-4 ${getChannelColor(channel.channel)}`} />
                            <h4 className="font-medium text-gray-900">{channel.channel}</h4>
                          </div>
                          <Badge variant="outline" className="text-green-600">
                            {channel.growth}
                          </Badge>
                        </div>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Count</div>
                            <div className="font-bold text-lg">{channel.count}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Percentage</div>
                            <div className="font-bold text-lg text-blue-600">{channel.percentage}%</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Growth</div>
                            <div className="font-bold text-lg text-green-600">{channel.growth}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Avg per User</div>
                            <div className="font-bold text-lg text-purple-600">{channel.avgPerUser}</div>
                          </div>
                        </div>
                        <div className="mt-3">
                          <Progress value={channel.percentage} className="h-2" />
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Daily Referral Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Daily Referral Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {dailyReferrals.map((day, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{day.date}</h4>
                        <Badge variant="outline" className="text-blue-600">
                          {day.referrals} total
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Total</div>
                          <div className="font-bold text-lg">{day.referrals}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Successful</div>
                          <div className="font-bold text-lg text-green-600">{day.successful}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Pending</div>
                          <div className="font-bold text-lg text-orange-600">{day.pending}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Failed</div>
                          <div className="font-bold text-lg text-red-600">{day.failed}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referral Sources */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  Referral Sources
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralSources.map((source, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{source.source}</h4>
                        <p className="text-sm text-gray-500">{source.percentage}% of total referrals</p>
                      </div>
                      <div className="text-right">
                        <div className="font-bold text-lg text-purple-600">{source.count}</div>
                        <div className="w-20 bg-gray-200 rounded-full h-2 mt-1">
                          <div 
                            className="bg-purple-600 h-2 rounded-full" 
                            style={{ width: `${source.percentage * 3}%` }}
                          ></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referral Outcomes */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-orange-600" />
                  Referral Outcomes
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralOutcomes.map((outcome, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{outcome.outcome}</h4>
                        <Badge variant="outline" className="text-orange-600">
                          {outcome.percentage}%
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Count</div>
                          <div className="font-bold text-lg">{outcome.count}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Percentage</div>
                          <div className="font-bold text-lg text-orange-600">{outcome.percentage}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Revenue</div>
                          <div className="font-bold text-lg text-green-600">${outcome.revenue.toLocaleString()}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Referral Generators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Top Referral Generators
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium text-gray-600">User</th>
                        <th className="text-left p-3 font-medium text-gray-600">Total Referrals</th>
                        <th className="text-left p-3 font-medium text-gray-600">Success Rate</th>
                        <th className="text-left p-3 font-medium text-gray-600">Last Referral</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topReferralGenerators.map((generator, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-green-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {generator.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{generator.name}</div>
                                <div className="text-xs text-gray-500">{generator.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-blue-600">{generator.referrals}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-green-600">{generator.successRate}%</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-gray-500">{generator.lastReferral}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Weekly Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-red-600" />
                  Weekly Referral Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referralTrends.map((trend, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{trend.period}</h4>
                        <p className="text-sm text-gray-500">Top channel: {trend.topChannel}</p>
                      </div>
                      <div className="flex items-center gap-4">
                        <div className="text-right">
                          <div className="font-bold text-lg text-red-600">{trend.referrals}</div>
                          <div className="text-sm text-gray-500">referrals</div>
                        </div>
                        <div className="text-right">
                          <div className="font-bold text-lg text-green-600">+{trend.growth}%</div>
                          <div className="text-sm text-gray-500">growth</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Referral Quality */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-yellow-600" />
                  Referral Quality Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {referralQuality.map((quality, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{quality.metric}</h4>
                          <p className="text-sm text-gray-500 mt-1">{quality.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-yellow-600">{quality.value}</div>
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