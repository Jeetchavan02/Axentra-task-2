import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Share2,
  Users,
  Target,
  DollarSign,
  TrendingUp,
  TrendingDown,
  Plus,
  Eye,
  Award,
  Activity,
  Mail,
  MessageSquare,
  Globe,
  Smartphone,
  ArrowRight} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Badge } from "@src/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue} from "@src/components/ui/select";
import { Progress } from "@src/components/ui/progress";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@src/components/ui/tooltip";
import HeadingSection from "@src/components/layouts/HeadingSection";

export default function ReferralsMain() {
  const [timeRange, setTimeRange] = useState("30d");

  const [keyMetrics, setKeyMetrics] = useState([
    {
      title: "Total Referrals",
      value: "0",
      change: "0%",
      trend: "neutral",
      icon: Share2,
      color: "blue",
      route: "/referrals/total-referrals",
      description: "Total number of referrals generated across all channels"
    },
    {
      title: "Active Referrers",
      value: "0",
      change: "0%",
      trend: "neutral",
      icon: Users,
      color: "green",
      route: "/referrals/active-referrers",
      description: "Number of users actively referring new customers"
    },
    {
      title: "Conversion Rate",
      value: "0%",
      change: "0%",
      trend: "neutral",
      icon: Target,
      color: "purple",
      // route: "/referrals/conversions",
      route: "../conversions",
      description: "Percentage of referrals that convert to paying customers"
    },
    {
      title: "Total Revenue",
      value: "$0",
      change: "0%",
      trend: "neutral",
      icon: DollarSign,
      color: "orange",
      route: "/referrals/total-revenue",
      description: "Total revenue generated from referral conversions"
    }
  ]);



  const [recentActivity, setRecentActivity] = useState<{ id: number; type: string; user: string; action: string; time: string; value: string }[]>([]);
  const [topPerformers, setTopPerformers] = useState<{ rank: number; name: string; referrals: number; conversions: number; revenue: number; tier: string }[]>([]);

  // Fetch Stats, Top Performers, and Recent Activity
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setKeyMetrics(prevMetrics => [
            {
              ...prevMetrics[0],
              value: data.totalConversions.toLocaleString(), // Map to conversions
              change: "+0%"
            },
            {
              ...prevMetrics[1],
              value: data.totalReferrers.toLocaleString(), // Map to registered referrers
              change: "+0%"
            },
            {
              ...prevMetrics[2],
              value: data.conversionRate + "%",
              change: "+0%"
            },
            {
              ...prevMetrics[3],
              value: "$" + data.totalRevenue.toLocaleString(),
              change: "+0%"
            }
          ]);
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    const fetchTopPerformers = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/dashboard/top-referrers?limit=5");
        if (response.ok) {
          const data = await response.json();
          const mapped = data.map((item: any, index: number) => ({
            rank: index + 1,
            name: item.name || "Unknown",
            referrals: item.referrals,
            conversions: item.referrals,
            revenue: item.revenue,
            tier: item.tier || "Member"
          }));
          setTopPerformers(mapped);
        }
      } catch (error) {
        console.error("Error fetching top performers:", error);
      }
    };

    const fetchRecentActivity = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/dashboard/recent?limit=5");
        if (response.ok) {
          const data = await response.json();
          const mapped = data.map((item: any) => ({
            id: item.id,
            type: "referral", // You might want to distinguish types if backend supports it
            user: item.referrerName,
            action: `referred ${item.refereeName}`,
            time: item.date, // Display date directly for now
            value: item.commission ? `$${item.commission}` : "$0"
          }));
          setRecentActivity(mapped);
        }
      } catch (error) {
        console.error("Error fetching recent activity:", error);
      }
    };

    fetchStats();
    fetchTopPerformers();
    fetchRecentActivity();
  }, []);


  const channelPerformance = [
    { channel: "Email", referrals: 1456, conversions: 221, rate: 15.2, revenue: 18720 },
    { channel: "Social Media", referrals: 892, conversions: 105, rate: 11.8, revenue: 14230 },
    { channel: "Direct Link", referrals: 734, conversions: 69, rate: 9.4, revenue: 8950 },
    { channel: "WhatsApp", referrals: 456, conversions: 85, rate: 18.7, revenue: 7340 },
    { channel: "SMS", referrals: 354, conversions: 46, rate: 13.1, revenue: 4610 }
  ];

  const getColorClass = (color: string) => {
    switch (color) {
      case "blue": return "text-blue-600";
      case "green": return "text-green-600";
      case "purple": return "text-purple-600";
      case "orange": return "text-orange-600";
      default: return "text-gray-600";
    }
  };

  const getBackgroundClass = (color: string) => {
    switch (color) {
      case "blue": return "bg-blue-50";
      case "green": return "bg-green-50";
      case "purple": return "bg-purple-50";
      case "orange": return "bg-orange-50";
      default: return "bg-gray-50";
    }
  };

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "Champion": return "bg-yellow-100 text-yellow-800";
      case "Advocate": return "bg-purple-100 text-purple-800";
      case "Supporter": return "bg-blue-100 text-blue-800";
      default: return "bg-gray-100 text-gray-800";
    }
  };

  const getActivityIcon = (type: string) => {
    switch (type) {
      case "referral": return Share2;
      case "conversion": return Target;
      case "payout": return DollarSign;
      case "signup": return Users;
      default: return Activity;
    }
  };

  return (
    <div className="axentraos-page-container">
      <HeadingSection
        heading="Referrals Overview"
        subheading="Monitor and analyze your referral program performance."
      >
        <>
          <div className="flex items-center space-x-4">

            <Select value={timeRange} onValueChange={setTimeRange}>
              <SelectTrigger className="w-[180px]">
                <SelectValue placeholder="Select range" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="7d">Last 7 days</SelectItem>
                <SelectItem value="30d">Last 30 days</SelectItem>
                <SelectItem value="90d">Last 90 days</SelectItem>
                <SelectItem value="1y">Last year</SelectItem>
              </SelectContent>
            </Select>


            {/* <select
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
            >
              <option value="7d">Last 7 days</option>
              <option value="30d">Last 30 days</option>
              <option value="90d">Last 90 days</option>
              <option value="1y">Last year</option>
            </select> */}
            {/* <Button variant="outline" className="border-black text-black hover:bg-gray-50">
              <Filter className="h-4 w-4 mr-2" />
              Filter
            </Button> */}
            {/* <Button className="bg-black text-white hover:bg-gray-800">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button> */}
          </div>
        </>
      </HeadingSection>

      <main className="axentraos-main-content">
        {/* Content */}
        <div className="flex-1 p-6 space-y-6">
          {/* Key Metrics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {keyMetrics.map((metric, index) => (
              <TooltipProvider key={index}>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Card>
                      <Link to={metric.route}>
                        <CardContent className="p-6">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <div className={`p-2 rounded-lg ${getBackgroundClass(metric.color)}`}>
                                <metric.icon className={`h-5 w-5 ${getColorClass(metric.color)}`} />
                              </div>
                              <div>
                                <p className="text-sm font-medium text-gray-600">{metric.title}</p>
                                <p className="text-2xl font-bold text-gray-900">{metric.value}</p>
                              </div>
                            </div>
                            <div className="flex flex-col items-end">
                              <div className={`flex items-center gap-1 ${metric.trend === 'up' ? 'text-green-600' : 'text-red-600'
                                }`}>
                                {metric.trend === 'up' ? <TrendingUp className="h-4 w-4" /> : <TrendingDown className="h-4 w-4" />}
                                <span className="text-sm font-medium">{metric.change}</span>
                              </div>
                              <ArrowRight className="h-4 w-4 text-gray-400 mt-2" />
                            </div>
                          </div>
                        </CardContent>
                      </Link>
                    </Card>
                  </TooltipTrigger>
                  <TooltipContent>
                    <p>{metric.description}</p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            ))}
          </div>

          {/* Analytics Link Card */}
          <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-2 border-blue-200">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Comprehensive Analytics</h3>
                  <p className="text-sm text-gray-600">
                    Get detailed insights into your referral program performance with advanced analytics,
                    cohort analysis, funnel tracking, and geographic distribution data.
                  </p>
                </div>
                <Link to="/referrals/detailed-analytics">
                  <Button className="bg-black text-white hover:bg-gray-800">
                    <Eye className="h-4 w-4 mr-2" />
                    View Analytics
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-green-600" />
                  Recent Activity
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {recentActivity.map((activity) => {
                    const IconComponent = getActivityIcon(activity.type);
                    return (
                      <div key={activity.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                        <div className="flex items-center gap-3">
                          <div className="p-2 bg-white rounded-lg">
                            <IconComponent className="h-4 w-4 text-gray-600" />
                          </div>
                          <div>
                            <p className="text-sm font-medium text-gray-900">{activity.user}</p>
                            <p className="text-xs text-gray-500">{activity.action}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="text-sm font-medium text-green-600">{activity.value}</p>
                          <p className="text-xs text-gray-500">{activity.time}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Top Performers */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Award className="h-5 w-5 text-yellow-600" />
                  Top Performers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {topPerformers.map((performer) => (
                    <div key={performer.rank} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className="flex items-center justify-center w-6 h-6 bg-yellow-100 rounded-full">
                          <span className="text-sm font-bold text-yellow-600">#{performer.rank}</span>
                        </div>
                        <div>
                          <p className="text-sm font-medium text-gray-900">{performer.name}</p>
                          <p className="text-xs text-gray-500">{performer.referrals} referrals, {performer.conversions} conversions</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="text-sm font-medium text-green-600">${performer.revenue.toLocaleString()}</p>
                        <Badge className={`${getTierColor(performer.tier)} border-0 text-xs`}>
                          {performer.tier}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Channel Performance */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-blue-600" />
                Channel Performance
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {channelPerformance.map((channel, index) => (
                  <div key={index} className="p-4 border rounded-lg">
                    <div className="flex items-center justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {channel.channel === 'Email' && <Mail className="h-4 w-4 text-blue-600" />}
                        {channel.channel === 'Social Media' && <Share2 className="h-4 w-4 text-purple-600" />}
                        {channel.channel === 'Direct Link' && <Globe className="h-4 w-4 text-green-600" />}
                        {channel.channel === 'WhatsApp' && <MessageSquare className="h-4 w-4 text-green-600" />}
                        {channel.channel === 'SMS' && <Smartphone className="h-4 w-4 text-orange-600" />}
                        <h4 className="font-medium text-gray-900">{channel.channel}</h4>
                      </div>
                      <Badge variant="outline" className="text-blue-600">
                        {channel.rate}% conversion
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
                    <div className="mt-3">
                      <Progress value={channel.rate * 5} className="h-2" />
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Quick Actions */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Plus className="h-5 w-5 text-gray-600" />
                Quick Actions
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Link to="/referrals/program">
                  <Button variant="outline" className="w-full h-16 border-2 border-dashed border-gray-300 hover:border-gray-400">
                    <div className="text-center">
                      <Plus className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm">Create Program</div>
                    </div>
                  </Button>
                </Link>
                <Link to="/referrals/referrers">
                  <Button variant="outline" className="w-full h-16 border-2 border-dashed border-gray-300 hover:border-gray-400">
                    <div className="text-center">
                      <Users className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm">Manage Referrers</div>
                    </div>
                  </Button>
                </Link>
                <Link to="/referrals/payouts">
                  <Button variant="outline" className="w-full h-16 border-2 border-dashed border-gray-300 hover:border-gray-400">
                    <div className="text-center">
                      <DollarSign className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm">Process Payouts</div>
                    </div>
                  </Button>
                </Link>
                <Link to="/referrals/settings">
                  <Button variant="outline" className="w-full h-16 border-2 border-dashed border-gray-300 hover:border-gray-400">
                    <div className="text-center">
                      <Award className="h-5 w-5 mx-auto mb-1 text-gray-600" />
                      <div className="text-sm">Program Settings</div>
                    </div>
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}