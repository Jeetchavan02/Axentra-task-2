import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, Users, TrendingUp, TrendingDown, Award, Star, Calendar, Filter, Download, Mail, MessageSquare, Target, DollarSign } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Badge } from "@src/components/ui/badge";

export default function ActiveReferrers() {
  const [timeRange, setTimeRange] = useState("30d");
  const [tierFilter, setTierFilter] = useState("all");

  const referrerStats = [
    { metric: "Total Active Referrers", value: "1,247", change: "+15.7%", trend: "up" },
    { metric: "New Referrers", value: "89", change: "+28.3%", trend: "up" },
    { metric: "Top Tier Referrers", value: "156", change: "+12.4%", trend: "up" },
    { metric: "Average Referrals per User", value: "3.8", change: "+9.2%", trend: "up" }
  ];

  const referrerTiers = [
    { tier: "Champion", count: 156, percentage: 12.5, minReferrals: 25, color: "bg-yellow-100 text-yellow-800" },
    { tier: "Advocate", count: 342, percentage: 27.4, minReferrals: 10, color: "bg-purple-100 text-purple-800" },
    { tier: "Supporter", count: 489, percentage: 39.2, minReferrals: 3, color: "bg-blue-100 text-blue-800" },
    { tier: "Starter", count: 260, percentage: 20.9, minReferrals: 1, color: "bg-gray-100 text-gray-800" }
  ];

  const topActiveReferrers = [
    { 
      name: "Sarah Johnson", 
      email: "sarah.j@example.com", 
      tier: "Champion", 
      referrals: 47, 
      conversions: 18, 
      revenue: 2340, 
      conversionRate: 38.3,
      lastActive: "2 hours ago",
      preferredChannel: "Email"
    },
    { 
      name: "Mike Chen", 
      email: "mike.c@example.com", 
      tier: "Champion", 
      referrals: 42, 
      conversions: 15, 
      revenue: 1890, 
      conversionRate: 35.7,
      lastActive: "1 day ago",
      preferredChannel: "Social Media"
    },
    { 
      name: "Lisa Martinez", 
      email: "lisa.m@example.com", 
      tier: "Advocate", 
      referrals: 39, 
      conversions: 14, 
      revenue: 1560, 
      conversionRate: 35.9,
      lastActive: "3 hours ago",
      preferredChannel: "WhatsApp"
    },
    { 
      name: "David Wilson", 
      email: "david.w@example.com", 
      tier: "Advocate", 
      referrals: 36, 
      conversions: 12, 
      revenue: 1320, 
      conversionRate: 33.3,
      lastActive: "5 hours ago",
      preferredChannel: "Direct Link"
    },
    { 
      name: "Emma Brown", 
      email: "emma.b@example.com", 
      tier: "Supporter", 
      referrals: 34, 
      conversions: 11, 
      revenue: 1180, 
      conversionRate: 32.4,
      lastActive: "1 day ago",
      preferredChannel: "SMS"
    }
  ];

  const referrerActivity = [
    { period: "Week 1", active: 1156, new: 67, dormant: 23, reactivated: 12 },
    { period: "Week 2", active: 1189, new: 78, dormant: 18, reactivated: 15 },
    { period: "Week 3", active: 1223, new: 89, dormant: 21, reactivated: 18 },
    { period: "Week 4", active: 1247, new: 92, dormant: 19, reactivated: 22 }
  ];

  const referrerChannels = [
    { channel: "Email", referrers: 456, avgReferrals: 4.2, topPerformers: 67 },
    { channel: "Social Media", referrers: 342, avgReferrals: 3.8, topPerformers: 45 },
    { channel: "WhatsApp", referrers: 189, avgReferrals: 5.1, topPerformers: 28 },
    { channel: "Direct Link", referrers: 156, avgReferrals: 3.4, topPerformers: 19 },
    { channel: "SMS", referrers: 104, avgReferrals: 2.9, topPerformers: 12 }
  ];

  const referrerSegments = [
    { segment: "Power Users", count: 89, avgReferrals: 12.4, avgRevenue: 1890, retention: 95.5 },
    { segment: "Regular Contributors", count: 234, avgReferrals: 6.7, avgRevenue: 890, retention: 87.2 },
    { segment: "Occasional Referrers", count: 456, avgReferrals: 3.2, avgRevenue: 420, retention: 72.8 },
    { segment: "New Joiners", count: 468, avgReferrals: 1.8, avgRevenue: 180, retention: 45.6 }
  ];

  const engagementMetrics = [
    { metric: "Monthly Active Rate", value: "78.3%", description: "Referrers active in the last 30 days" },
    { metric: "Average Session Duration", value: "24 min", description: "Time spent on referral activities" },
    { metric: "Repeat Referral Rate", value: "65.4%", description: "Referrers who made multiple referrals" },
    { metric: "Cross-Channel Usage", value: "34.2%", description: "Referrers using multiple channels" }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Champion": return "bg-yellow-100 text-yellow-800";
      case "Advocate": return "bg-purple-100 text-purple-800";
      case "Supporter": return "bg-blue-100 text-blue-800";
      case "Starter": return "bg-gray-100 text-gray-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getChannelIcon = (channel: string) => {
    switch (channel) {
      case "Email": return Mail;
      case "Social Media": return Users;
      case "WhatsApp": return MessageSquare;
      case "Direct Link": return Target;
      case "SMS": return MessageSquare;
      default: return Users;
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
              <h2 className="text-xl font-semibold text-black">Active Referrers Analysis</h2>
              <p className="text-sm text-gray-600 mt-1">Detailed insights into your active referrer community and performance</p>
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
              {referrerStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-green-600" />
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

            {/* Referrer Tiers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Referrer Tiers Distribution
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                  {referrerTiers.map((tier, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <Badge className={`${tier.color} border-0`}>
                          {tier.tier}
                        </Badge>
                        <span className="text-sm text-gray-500">{tier.percentage}%</span>
                      </div>
                      <div className="space-y-2">
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Count</span>
                          <span className="font-bold">{tier.count}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-sm text-gray-600">Min Referrals</span>
                          <span className="font-bold">{tier.minReferrals}+</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Active Referrers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Star className="h-5 w-5 text-blue-600" />
                  Top Active Referrers
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
                        <th className="text-left p-3 font-medium text-gray-600">Conv. Rate</th>
                        <th className="text-left p-3 font-medium text-gray-600">Last Active</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topActiveReferrers.map((referrer, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {referrer.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div>
                                <div className="font-medium text-gray-900">{referrer.name}</div>
                                <div className="text-xs text-gray-500">{referrer.email}</div>
                              </div>
                            </div>
                          </td>
                          <td className="p-3">
                            <Badge className={`${getTierColor(referrer.tier)} border-0`}>
                              {referrer.tier}
                            </Badge>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-gray-900">{referrer.referrals}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-green-600">{referrer.conversions}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-blue-600">${referrer.revenue.toLocaleString()}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-medium text-purple-600">{referrer.conversionRate}%</div>
                          </td>
                          <td className="p-3">
                            <div className="text-sm text-gray-500">{referrer.lastActive}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Activity Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-blue-600" />
                  Referrer Activity Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrerActivity.map((activity, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{activity.period}</h4>
                        <Badge variant="outline" className="text-green-600">
                          {activity.active} active
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Active</div>
                          <div className="font-bold text-lg text-green-600">{activity.active}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">New</div>
                          <div className="font-bold text-lg text-blue-600">{activity.new}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Dormant</div>
                          <div className="font-bold text-lg text-orange-600">{activity.dormant}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Reactivated</div>
                          <div className="font-bold text-lg text-purple-600">{activity.reactivated}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Channel Performance */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-red-600" />
                  Referrer Channel Performance
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrerChannels.map((channel, index) => {
                    const IconComponent = getChannelIcon(channel.channel);
                    return (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-center justify-between mb-3">
                          <div className="flex items-center gap-2">
                            <IconComponent className="h-4 w-4 text-blue-600" />
                            <h4 className="font-medium text-gray-900">{channel.channel}</h4>
                          </div>
                          <Badge variant="outline" className="text-blue-600">
                            {channel.referrers} referrers
                          </Badge>
                        </div>
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                          <div>
                            <div className="text-gray-500">Active Referrers</div>
                            <div className="font-bold text-lg">{channel.referrers}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Avg. Referrals</div>
                            <div className="font-bold text-lg text-green-600">{channel.avgReferrals}</div>
                          </div>
                          <div>
                            <div className="text-gray-500">Top Performers</div>
                            <div className="font-bold text-lg text-purple-600">{channel.topPerformers}</div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Referrer Segments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-green-600" />
                  Referrer Segments
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {referrerSegments.map((segment, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{segment.segment}</h4>
                        <Badge variant="outline" className="text-green-600">
                          {segment.retention}% retention
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Count</div>
                          <div className="font-bold text-lg">{segment.count}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Avg. Referrals</div>
                          <div className="font-bold text-lg text-blue-600">{segment.avgReferrals}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Avg. Revenue</div>
                          <div className="font-bold text-lg text-green-600">${segment.avgRevenue}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Retention</div>
                          <div className="font-bold text-lg text-purple-600">{segment.retention}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Engagement Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-orange-600" />
                  Engagement Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {engagementMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                          <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-orange-600">{metric.value}</div>
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