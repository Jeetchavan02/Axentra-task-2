import { useState } from "react";
import { Link } from "react-router-dom";
import { ArrowLeft, DollarSign, TrendingUp, TrendingDown, Calendar, Filter, Download, BarChart3, PieChart, Activity, Users, Target } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Badge } from "@src/components/ui/badge";
import { Progress } from "@src/components/ui/progress";

export default function TotalRevenue() {
  const [timeRange, setTimeRange] = useState("30d");

  const revenueStats = [
    { metric: "Total Revenue", value: "$47,850", change: "+18.2%", trend: "up" },
    { metric: "Average Order Value", value: "$66.38", change: "+12.4%", trend: "up" },
    { metric: "Revenue per Referral", value: "$12.29", change: "+15.7%", trend: "up" },
    { metric: "Monthly Recurring Revenue", value: "$8,230", change: "+22.1%", trend: "up" }
  ];

  const revenueByChannel = [
    { channel: "Email", revenue: 18720, percentage: 39.1, orders: 221, aov: 84.71, growth: "+28.7%" },
    { channel: "Social Media", revenue: 14230, percentage: 29.7, orders: 105, aov: 135.52, growth: "+22.3%" },
    { channel: "Direct Link", revenue: 8950, percentage: 18.7, orders: 69, aov: 129.71, growth: "+15.4%" },
    { channel: "WhatsApp", revenue: 7340, percentage: 15.3, orders: 85, aov: 86.35, growth: "+45.6%" },
    { channel: "SMS", revenue: 4610, percentage: 9.6, orders: 46, aov: 100.22, growth: "+18.9%" }
  ];

  const revenueByCategory = [
    { category: "Electronics", revenue: 15420, percentage: 32.2, orders: 189, margin: 28.5 },
    { category: "Fashion", revenue: 12340, percentage: 25.8, orders: 156, margin: 45.2 },
    { category: "Home & Garden", revenue: 8950, percentage: 18.7, orders: 134, margin: 38.7 },
    { category: "Health & Beauty", revenue: 6780, percentage: 14.2, orders: 98, margin: 52.3 },
    { category: "Sports & Outdoors", revenue: 4360, percentage: 9.1, orders: 67, margin: 35.8 }
  ];

  const monthlyRevenue = [
    { month: "September", revenue: 38450, orders: 578, aov: 66.52, growth: "+12.3%" },
    { month: "October", revenue: 42230, orders: 623, aov: 67.79, growth: "+9.8%" },
    { month: "November", revenue: 45890, orders: 689, aov: 66.61, growth: "+8.7%" },
    { month: "December", revenue: 47850, orders: 721, aov: 66.38, growth: "+4.3%" }
  ];

  const revenueSegments = [
    { segment: "First-Time Buyers", revenue: 28450, percentage: 59.5, orders: 456, ltv: 125.40 },
    { segment: "Repeat Customers", revenue: 19400, percentage: 40.5, orders: 265, ltv: 285.70 }
  ];

  const topRevenueGenerators = [
    { name: "Sarah Johnson", revenue: 2340, orders: 18, aov: 130.00, referrals: 47, efficiency: 4.98 },
    { name: "Mike Chen", revenue: 1890, orders: 15, aov: 126.00, referrals: 42, efficiency: 4.50 },
    { name: "Lisa Martinez", revenue: 1560, orders: 14, aov: 111.43, referrals: 39, efficiency: 4.00 },
    { name: "David Wilson", revenue: 1320, orders: 12, aov: 110.00, referrals: 36, efficiency: 3.67 },
    { name: "Emma Brown", revenue: 1180, orders: 11, aov: 107.27, referrals: 34, efficiency: 3.47 }
  ];

  const revenueMetrics = [
    { metric: "Customer Lifetime Value", value: "$184.50", description: "Average LTV from referred customers" },
    { metric: "Payback Period", value: "2.8 months", description: "Time to recoup referral costs" },
    { metric: "ROI", value: "340%", description: "Return on referral program investment" },
    { metric: "Revenue Growth Rate", value: "+18.2%", description: "Month-over-month revenue growth" }
  ];

  const revenueOptimization = [
    { opportunity: "Upsell Conversions", potential: "$8,450", description: "Increase AOV through strategic upselling" },
    { opportunity: "Repeat Purchase Rate", potential: "$6,230", description: "Improve customer retention programs" },
    { opportunity: "Premium Tier Adoption", potential: "$4,780", description: "Drive adoption of higher-value plans" },
    { opportunity: "Cross-sell Opportunities", potential: "$3,560", description: "Identify complementary product sales" }
  ];

  const revenueForecasting = [
    { period: "Next Month", forecast: 52340, confidence: 92, factors: "Seasonal trends, campaign performance" },
    { period: "Next Quarter", forecast: 158230, confidence: 87, factors: "Product launches, market expansion" },
    { period: "Next 6 Months", forecast: 324560, confidence: 78, factors: "Strategic initiatives, competition" },
    { period: "Next Year", forecast: 687450, confidence: 65, factors: "Market conditions, product roadmap" }
  ];

  const revenueAnalysis = [
    { metric: "Revenue per Click", value: "$0.87", trend: "+12.4%", benchmark: "$0.65" },
    { metric: "Revenue per Referrer", value: "$38.37", trend: "+15.8%", benchmark: "$28.90" },
    { metric: "Cost per Acquisition", value: "$12.45", trend: "-8.2%", benchmark: "$15.30" },
    { metric: "Revenue Attribution", value: "Direct: 68%", trend: "+5.2%", benchmark: "Direct: 60%" }
  ];

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 90) return "text-green-600";
    if (confidence >= 80) return "text-blue-600";
    if (confidence >= 70) return "text-orange-600";
    return "text-red-600";
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
              <h2 className="text-xl font-semibold text-black">Total Revenue Analysis</h2>
              <p className="text-sm text-gray-600 mt-1">Comprehensive analysis of revenue generated through referral programs</p>
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
              {revenueStats.map((stat, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-6">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <DollarSign className="h-5 w-5 text-green-600" />
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

            {/* Revenue by Channel */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-blue-600" />
                  Revenue by Channel
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByChannel.map((channel, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{channel.channel}</h4>
                        <Badge variant="outline" className="text-green-600">
                          {channel.growth}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-5 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Revenue</div>
                          <div className="font-bold text-lg text-green-600">${channel.revenue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Share</div>
                          <div className="font-bold text-lg text-blue-600">{channel.percentage}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Orders</div>
                          <div className="font-bold text-lg">{channel.orders}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">AOV</div>
                          <div className="font-bold text-lg text-purple-600">${channel.aov}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Growth</div>
                          <div className="font-bold text-lg text-orange-600">{channel.growth}</div>
                        </div>
                      </div>
                      <div className="mt-3">
                        <Progress value={channel.percentage} className="h-2" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue by Category */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <PieChart className="h-5 w-5 text-purple-600" />
                  Revenue by Product Category
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueByCategory.map((category, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{category.category}</h4>
                        <Badge variant="outline" className="text-purple-600">
                          {category.margin}% margin
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Revenue</div>
                          <div className="font-bold text-lg text-green-600">${category.revenue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Share</div>
                          <div className="font-bold text-lg text-purple-600">{category.percentage}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Orders</div>
                          <div className="font-bold text-lg">{category.orders}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Margin</div>
                          <div className="font-bold text-lg text-blue-600">{category.margin}%</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Monthly Revenue Trends */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-orange-600" />
                  Monthly Revenue Trends
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {monthlyRevenue.map((month, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{month.month} 2024</h4>
                        <Badge variant="outline" className={month.growth.includes('+') ? 'text-green-600' : 'text-red-600'}>
                          {month.growth}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Revenue</div>
                          <div className="font-bold text-lg text-orange-600">${month.revenue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Orders</div>
                          <div className="font-bold text-lg">{month.orders}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">AOV</div>
                          <div className="font-bold text-lg text-blue-600">${month.aov}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Growth</div>
                          <div className={`font-bold text-lg ${month.growth.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {month.growth}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Segments */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Users className="h-5 w-5 text-red-600" />
                  Revenue by Customer Segment
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueSegments.map((segment, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{segment.segment}</h4>
                        <Badge variant="outline" className="text-red-600">
                          {segment.percentage}% of total
                        </Badge>
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Revenue</div>
                          <div className="font-bold text-lg text-green-600">${segment.revenue.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Share</div>
                          <div className="font-bold text-lg text-red-600">{segment.percentage}%</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Orders</div>
                          <div className="font-bold text-lg">{segment.orders}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">LTV</div>
                          <div className="font-bold text-lg text-purple-600">${segment.ltv}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Top Revenue Generators */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Target className="h-5 w-5 text-yellow-600" />
                  Top Revenue Generating Referrers
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b">
                        <th className="text-left p-3 font-medium text-gray-600">Referrer</th>
                        <th className="text-left p-3 font-medium text-gray-600">Revenue</th>
                        <th className="text-left p-3 font-medium text-gray-600">Orders</th>
                        <th className="text-left p-3 font-medium text-gray-600">AOV</th>
                        <th className="text-left p-3 font-medium text-gray-600">Efficiency</th>
                      </tr>
                    </thead>
                    <tbody>
                      {topRevenueGenerators.map((generator, index) => (
                        <tr key={index} className="border-b hover:bg-gray-50">
                          <td className="p-3">
                            <div className="flex items-center gap-3">
                              <div className="w-8 h-8 bg-gradient-to-r from-green-500 to-yellow-500 rounded-full flex items-center justify-center text-white text-sm font-bold">
                                {generator.name.split(' ').map(n => n[0]).join('')}
                              </div>
                              <div className="font-medium text-gray-900">{generator.name}</div>
                            </div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-green-600">${generator.revenue.toLocaleString()}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-blue-600">{generator.orders}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-purple-600">${generator.aov.toFixed(2)}</div>
                          </td>
                          <td className="p-3">
                            <div className="font-bold text-lg text-yellow-600">{generator.efficiency.toFixed(2)}</div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </CardContent>
            </Card>

            {/* Revenue Metrics */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Activity className="h-5 w-5 text-blue-600" />
                  Key Revenue Metrics
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {revenueMetrics.map((metric, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between">
                        <div>
                          <h4 className="font-medium text-gray-900">{metric.metric}</h4>
                          <p className="text-sm text-gray-500 mt-1">{metric.description}</p>
                        </div>
                        <div className="text-right">
                          <div className="text-2xl font-bold text-blue-600">{metric.value}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Optimization */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <TrendingUp className="h-5 w-5 text-green-600" />
                  Revenue Optimization Opportunities
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueOptimization.map((opportunity, index) => (
                    <div key={index} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium text-gray-900">{opportunity.opportunity}</h4>
                        <p className="text-sm text-gray-500 mt-1">{opportunity.description}</p>
                      </div>
                      <div className="text-right">
                        <div className="text-xl font-bold text-green-600">{opportunity.potential}</div>
                        <div className="text-sm text-gray-500">potential</div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Forecasting */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-purple-600" />
                  Revenue Forecasting
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueForecasting.map((forecast, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{forecast.period}</h4>
                        <Badge variant="outline" className={getConfidenceColor(forecast.confidence)}>
                          {forecast.confidence}% confidence
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Forecast</div>
                          <div className="font-bold text-lg text-purple-600">${forecast.forecast.toLocaleString()}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Confidence</div>
                          <div className={`font-bold text-lg ${getConfidenceColor(forecast.confidence)}`}>
                            {forecast.confidence}%
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Key Factors</div>
                          <div className="text-sm text-gray-600">{forecast.factors}</div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Revenue Analysis */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <BarChart3 className="h-5 w-5 text-orange-600" />
                  Advanced Revenue Analysis
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {revenueAnalysis.map((analysis, index) => (
                    <div key={index} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-medium text-gray-900">{analysis.metric}</h4>
                        <Badge variant="outline" className={analysis.trend.includes('+') ? 'text-green-600' : 'text-red-600'}>
                          {analysis.trend}
                        </Badge>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                        <div>
                          <div className="text-gray-500">Current</div>
                          <div className="font-bold text-lg text-orange-600">{analysis.value}</div>
                        </div>
                        <div>
                          <div className="text-gray-500">Trend</div>
                          <div className={`font-bold text-lg ${analysis.trend.includes('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {analysis.trend}
                          </div>
                        </div>
                        <div>
                          <div className="text-gray-500">Benchmark</div>
                          <div className="font-bold text-lg text-gray-600">{analysis.benchmark}</div>
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