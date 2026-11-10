import { useState, useEffect } from "react";
import { 
  Download,
  RefreshCw,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
  MapPin
} from "lucide-react";
import HeadingSection from "@src/components/layouts/HeadingSection";
import { Card, CardContent } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Badge } from "@src/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@src/components/ui/table";
import { getReq } from "@src/auth/jwtService";

interface ConversionData {
  customer_name: string;
  customer_location: string | null;
  referrer_name: string | null;
  product: string;
  order_value: number;
  commission: number;
  device_type: string;
  source: string;
  status: string;
  date: string;
}

interface ApiResponse {
  total: number;
  data: ConversionData[];
}

export default function ReferralsConversions() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedProgram, setSelectedProgram] = useState("all");
  const [conversions, setConversions] = useState<ConversionData[]>([]);
  const [loading, setLoading] = useState(false);

  const timeframeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" }
  ];

  const programOptions = [
    { value: "all", label: "All Programs" },
    { value: "friends-family", label: "Friends & Family" },
    { value: "influencer", label: "Influencer Program" },
    { value: "affiliate", label: "Affiliate Program" }
  ];

  const getReferralSessionData = () => {
    const storedPermission = localStorage.getItem("userPermission");

    if (!storedPermission) return null;

    try {
      const data = JSON.parse(storedPermission);

      return {
        shop: data?.multipleDomain?.[0]?.web_url || "",
        outlet_id: data?.multipleDomain?.[0]?.id || null
      };
    } catch (err) {
      console.error("Failed to parse userPermission", err);
      return null;
    }
  };

  const fetchAllConversions = async () => {
    const sessionData = getReferralSessionData();
    if (!sessionData?.shop) return;

    setLoading(true);
    const params = `?shop=${encodeURIComponent(sessionData.shop)}&range=30d`;
    try {
      // const res = await getReq("all_conversions", params, baseURL);
      const res = await getReq("all_conversions", params, "http://localhost:8000");
      const data: ApiResponse = res?.data;
      if (data && data.data) {
        setConversions(data.data);
      }
    } catch (error) {
      console.error("All conversions fetch error:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllConversions();
  }, []);

  // Commented out static data - keeping for reference
  // const conversionStats = {
  //   totalConversions: 1847,
  //   conversionRate: 12.8,
  //   averageOrderValue: 89.50,
  //   totalRevenue: 165245,
  //   topReferrer: "Sarah Johnson",
  //   topProduct: "Premium Skincare Set"
  // };

  // const conversionFunnel = [
  //   { stage: "Clicks", count: 14425, percentage: 100 },
  //   { stage: "Landing Page Views", count: 12890, percentage: 89.4 },
  //   { stage: "Product Views", count: 8750, percentage: 60.6 },
  //   { stage: "Add to Cart", count: 3420, percentage: 23.7 },
  //   { stage: "Checkout Started", count: 2180, percentage: 15.1 },
  //   { stage: "Conversions", count: 1847, percentage: 12.8 }
  // ];

  // const topSources = [
  //   { name: "Instagram", conversions: 684, rate: 15.2 },
  //   { name: "Facebook", conversions: 523, rate: 12.8 },
  //   { name: "Email", conversions: 456, rate: 18.9 },
  //   { name: "Twitter", conversions: 184, rate: 9.4 }
  // ];

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "refunded":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status.toLowerCase()) {
      case "paid":
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "refunded":
        return <XCircle className="w-4 h-4" />;
      default:
        return <AlertCircle className="w-4 h-4" />;
    }
  };

  return (
    <div className="axentraos-page-container">
      <HeadingSection
        heading="Conversions"
        subheading="Track referral conversions and optimize performance."
      >
        <>
          <div className="flex items-center gap-2">
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
            <Button 
              variant="outline" 
              className="border-black text-black hover:bg-gray-50"
              onClick={fetchAllConversions}
              disabled={loading}
            >
              <RefreshCw className={`h-4 w-4 mr-2 ${loading ? 'animate-spin' : ''}`} />
              Refresh
            </Button>
            <Button variant="outline" className="border-black text-black hover:bg-gray-50">
              <Download className="h-4 w-4 mr-2" />
              Export
            </Button>
          </div>
        </>
      </HeadingSection>

      {/* MAIN CONTENT */}
      <main className="axentraos-main-container">
        <Card>
          <CardContent className="space-y-6 mt-6">
            {/* Filters */}
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
              <Input placeholder="Search conversions..." className="max-w-sm" />
            </div>

            {/* Conversions Table */}
            <div>
              {loading ? (
                <div className="flex items-center justify-center py-8">
                  <RefreshCw className="w-6 h-6 animate-spin text-gray-400" />
                  <span className="ml-2 text-gray-600">Loading conversions...</span>
                </div>
              ) : conversions.length === 0 ? (
                <div className="text-center py-8 text-gray-500">
                  No conversions found
                </div>
              ) : (
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow>
                        <TableHead>Customer</TableHead>
                        <TableHead>Referrer</TableHead>
                        <TableHead>Product</TableHead>
                        <TableHead>Order Value</TableHead>
                        <TableHead>Commission</TableHead>
                        <TableHead>Device</TableHead>
                        <TableHead>Source</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Date</TableHead>
                      </TableRow>
                    </TableHeader>

                    <TableBody>
                      {conversions.map((conversion, index) => (
                        <TableRow key={index}>
                          <TableCell>
                            <div>
                              <p className="font-medium">{conversion.customer_name}</p>
                              {conversion.customer_location && (
                                <p className="text-sm text-gray-600 flex items-center">
                                  <MapPin className="w-3 h-3 mr-1" />
                                  {conversion.customer_location}
                                </p>
                              )}
                            </div>
                          </TableCell>

                          <TableCell>
                            {conversion.referrer_name || "N/A"}
                          </TableCell>

                          <TableCell>
                            {conversion.product}
                          </TableCell>

                          <TableCell className="font-medium">
                            ₹{conversion.order_value}
                          </TableCell>

                          <TableCell>
                            ₹{conversion.commission}
                          </TableCell>

                          <TableCell>
                            {conversion.device_type}
                          </TableCell>

                          <TableCell>
                            {conversion.source}
                          </TableCell>

                          <TableCell>
                            <Badge className={getStatusColor(conversion.status)}>
                              {getStatusIcon(conversion.status)}
                              <span className="ml-1 capitalize">
                                {conversion.status}
                              </span>
                            </Badge>
                          </TableCell>

                          <TableCell>
                            {conversion.date}
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
    </div>
  );
}