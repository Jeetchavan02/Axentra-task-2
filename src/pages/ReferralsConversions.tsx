import { useState, useEffect } from "react";
import {
    Target,
    ShoppingCart,
    RefreshCw,
    CheckCircle,
    XCircle,
    Clock,
    AlertCircle,
    Activity,
    Gift,
    Star,
    MapPin,
    IndianRupee,
    Search,
    Monitor,
    Smartphone
} from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Badge } from "@src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@src/components/ui/table";
import { Skeleton } from "@src/components/ui/skeleton";
import HeadingSection from "@src/components/layouts/HeadingSection";
import { getReq, baseURL } from "@src/auth/jwtService";

interface DashboardData {
    customer: string;
    referrer: string;
    product: string;
    amount: number;
    status: string;
    date: string;
}

interface ApiResponse {
    total_conversions: number;
    conversion_rate: number;
    average_order_value: number;
    total_revenue: number;
    top_referrer: {
        name: string;
        conversions: number;
    };
    top_product: {
        name: string;
        conversions: number;
    };
    recent_conversions: DashboardData[];
}

interface AllConversionsTableData {
    customer_location: string | null;
    commission: number;
    order_value: number;
    device_type: string;
    source: string;
}

interface AllConversionsApiResponse {
    total: number;
    data: AllConversionsTableData[];
}

export default function ReferralsConversions() {
    const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
    // const [selectedMetric, setSelectedMetric] = useState("conversion_rate");
    const [overviewRecentConversions, setOverviewRecentConversions] = useState<DashboardData[]>([]);
    const [loading, setLoading] = useState(false);
    // const [totalConversions, setTotalConversions] = useState(0);
    // const [conversionRate, setConversionRate] = useState(0);
    // const [avgOrderValue, setAvgOrderValue] = useState(0);
    // const [totalRevenue, setTotalRevenue] = useState(0);
    const [overviewSummary, setOverviewSummary] = useState<ApiResponse | null>(null);

    // below are for all conversion
    const [allConversions, setAllConversions] = useState<AllConversionsTableData[]>([]);
    const [allConversionsLoading, setAllConversionsLoading] = useState(false);
    const [activeTab, setActiveTab] = useState("overview");
    const [searchTerm, setSearchTerm] = useState("");
    const [debouncedSearch, setDebouncedSearch] = useState("");
    const [currencySymbol] = useState("₹");

    const timeframeOptions = [
        { value: "7d", label: "Last 7 Days" },
        { value: "30d", label: "Last 30 Days" },
        { value: "90d", label: "Last 90 Days" },
        { value: "1y", label: "Last Year" }
    ];

    // const metricOptions = [
    //     { value: "conversion_rate", label: "Conversion Rate" },
    //     { value: "revenue", label: "Revenue" },
    //     { value: "traffic", label: "Traffic" },
    //     { value: "clicks", label: "Clicks" }
    // ];

    // Mock data for conversions
    // const conversionStats = {
    //     totalConversions: 1847,
    //     conversionRate: 12.8,
    //     averageOrderValue: 89.50,
    //     totalRevenue: 165245,
    //     topReferrer: "Sarah Johnson",
    //     topProduct: "Premium Skincare Set"
    // };

    // const conversions = [
    //     {
    //         id: 1,
    //         referrer: "Sarah Johnson",
    //         customer: "Emily Davis",
    //         product: "Premium Skincare Set",
    //         orderValue: 125.00,
    //         commission: 12.50,
    //         date: "2024-07-09",
    //         status: "completed",
    //         source: "Instagram",
    //         device: "Mobile",
    //         location: "New York, NY"
    //     },
    //     {
    //         id: 2,
    //         referrer: "Mike Chen",
    //         customer: "John Smith",
    //         product: "Fitness Bundle",
    //         orderValue: 89.99,
    //         commission: 8.99,
    //         date: "2024-07-09",
    //         status: "pending",
    //         source: "Twitter",
    //         device: "Desktop",
    //         location: "San Francisco, CA"
    //     },
    //     {
    //         id: 3,
    //         referrer: "Emma Wilson",
    //         customer: "Lisa Wang",
    //         product: "Home Essentials Kit",
    //         orderValue: 65.50,
    //         commission: 6.55,
    //         date: "2024-07-08",
    //         status: "completed",
    //         source: "Email",
    //         device: "Mobile",
    //         location: "Los Angeles, CA"
    //     },
    //     {
    //         id: 4,
    //         referrer: "David Lee",
    //         customer: "Maria Garcia",
    //         product: "Tech Accessories",
    //         orderValue: 45.00,
    //         commission: 4.50,
    //         date: "2024-07-08",
    //         status: "completed",
    //         source: "Facebook",
    //         device: "Tablet",
    //         location: "Miami, FL"
    //     },
    //     {
    //         id: 5,
    //         referrer: "Lisa Rodriguez",
    //         customer: "Alex Johnson",
    //         product: "Wellness Collection",
    //         orderValue: 150.75,
    //         commission: 15.08,
    //         date: "2024-07-07",
    //         status: "refunded",
    //         source: "Instagram",
    //         device: "Mobile",
    //         location: "Chicago, IL"
    //     }
    // ];

    // const conversionFunnel = [
    //     { stage: "Clicks", count: 14425, percentage: 100 },
    //     { stage: "Landing Page Views", count: 12890, percentage: 89.4 },
    //     { stage: "Product Views", count: 8750, percentage: 60.6 },
    //     { stage: "Add to Cart", count: 3420, percentage: 23.7 },
    //     { stage: "Checkout Started", count: 2180, percentage: 15.1 },
    //     { stage: "Conversions", count: 1847, percentage: 12.8 }
    // ];

    // const topSources = [
    //     { name: "Instagram", conversions: 684, rate: 15.2 },
    //     { name: "Facebook", conversions: 523, rate: 12.8 },
    //     { name: "Email", conversions: 456, rate: 18.9 },
    //     { name: "Twitter", conversions: 184, rate: 9.4 }
    // ];

    const getStatusColor = (status: string) => {
        switch (status?.toLowerCase()) {
            case "completed":
            case "paid":
                return "bg-green-100 text-green-800 hover:bg-green-200";

            case "pending":
                return "bg-yellow-100 text-yellow-800 hover:bg-yellow-200";

            case "refunded":
            case "failed":
                return "bg-red-100 text-red-800 hover:bg-red-200";
            default:
                return "bg-gray-100 text-gray-800 hover:bg-gray-200";
        }
    };

    const getDeviceDetails = (device?: string) => {
        if (!device) return { icon: null, label: "—" };

        const type = device.toLowerCase();

        if (type.includes("desktop") || type.includes("laptop")) {
            return {
                icon: <Monitor className="w-4 h-4" />,
                label: "Desktop",
            };
        }

        if (type.includes("mobile") || type.includes("phone")) {
            return {
                icon: <Smartphone className="w-4 h-4" />,
                label: "Mobile",
            };
        }

        return {
            icon: null,
            label: device,
        };
    };

    const getStatusIcon = (status: string) => {
        switch (status?.toLowerCase()) {
            case "completed":
            case "paid":
                return <CheckCircle className="w-4 h-4" />;

            case "pending":
                return <Clock className="w-4 h-4" />;

            case "refunded":
            case "failed":
                return <XCircle className="w-4 h-4" />;

            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    const formatDate = (dateString: string) => {
        if (!dateString) return "—";

        const date = new Date(dateString);

        if (isNaN(date.getTime())) return dateString;

        const day = String(date.getDate()).padStart(2, "0");
        const month = String(date.getMonth() + 1).padStart(2, "0");
        const year = date.getFullYear();

        return `${day}-${month}-${year}`;
    };


    // const getDeviceIcon = (device: string) => {
    //     switch (device) {
    //         case "Mobile":
    //             return <Smartphone className="w-4 h-4" />;
    //         case "Desktop":
    //             return <Monitor className="w-4 h-4" />;
    //         case "Tablet":
    //             return <Smartphone className="w-4 h-4" />;
    //         default:
    //             return <Globe className="w-4 h-4" />;
    //     }
    // };

    const getReferralSessionData = () => {
        const storedPermission = localStorage.getItem("userPermission");
        if (!storedPermission) return null;
        try {
            const data = JSON.parse(storedPermission);

            return {
                // currencySymbol: data?.currency_symbol || "₹",
                shop: data?.outlet_details?.web_url || "",
                // outlet_id: data?.multipleDomain?.[0]?.id || null
            };
        } catch (err) {
            console.error("Failed to parse userPermission", err);
            return null;
        }
    };

    const fetchOverviewData = async () => {
        const sessionData = getReferralSessionData();
        if (!sessionData?.shop) return;

        setLoading(true);
        const params = `?shop=${encodeURIComponent(sessionData.shop)}&range=${selectedTimeframe}`;
        try {
            // const res = await getReq("overview", params, "http://localhost:8000");
            const res = await getReq("overview", params, baseURL);
            const data: ApiResponse = res?.data;
            if (data) {
                setOverviewSummary(data);
                setOverviewRecentConversions(data.recent_conversions);
            }
        } catch (error) {
            console.error("All conversions fetch error:", error);
        } finally {
            setLoading(false);
        }
    };

    const fetchAllConversionsData = async () => {
        const sessionData = getReferralSessionData();
        if (!sessionData?.shop) return;

        setAllConversionsLoading(true);
        const params = `?shop=${encodeURIComponent(sessionData.shop)}&range=${selectedTimeframe}`;
        try {
            const res = await getReq("all_conversions", params, baseURL);
            // const res = await getReq("all_conversions", params, "http://localhost:8000");
            const data: AllConversionsApiResponse = res?.data;
            if (data?.data) {
                const filteredData: AllConversionsTableData[] = data.data.map(
                    (item: AllConversionsTableData) => ({
                        customer_location: item.customer_location,
                        commission: item.commission,
                        order_value: item.order_value,
                        device_type: item.device_type,
                        source: item.source,
                    })
                );

                setAllConversions(filteredData);
            }
        } catch (error) {
            console.error("All conversions fetch error:", error);
        } finally {
            setAllConversionsLoading(false);
        }
    };

    useEffect(() => {
        if (activeTab === "overview") {
            fetchOverviewData();
        } else if (activeTab === "conversions") {
            fetchAllConversionsData();
        }
    }, [activeTab, selectedTimeframe]);

    useEffect(() => {
        const timer = setTimeout(() => {
            setDebouncedSearch(searchTerm.toLowerCase());
        }, 500); // debounce delay

        return () => clearTimeout(timer);
    }, [searchTerm]);

    const filteredConversions = overviewRecentConversions.filter((item) => {
        if (!debouncedSearch) return true;

        return (
            item.customer.toLowerCase().includes(debouncedSearch) ||
            item.product.toLowerCase().includes(debouncedSearch)
        );
    });

    return (
        <div className="axentraos-page-container">
            <HeadingSection
                heading="Conversions"
                subheading="Track referral conversions and optimize performance."
            >
                <>
                    <div className="flex items-center space-x-4">
                        <Select
                            value={selectedTimeframe}
                            onValueChange={(value) => {
                                setSelectedTimeframe(value);
                                setOverviewSummary(null);
                                setAllConversions([]);
                            }}
                        >
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
                            onClick={() => {
                                if (activeTab === "overview") {
                                    fetchOverviewData();
                                } else {
                                    fetchAllConversionsData();
                                }
                            }}
                        >
                            <RefreshCw className="h-4 w-4 mr-2" />
                            Refresh
                        </Button>
                        {/* <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                            <Download className="h-4 w-4 mr-2" />
                            Export
                        </Button> */}
                    </div></>
            </HeadingSection>

            <main className="axentraos-main-container">
                {/* Content */}
                <div className="flex-1">


                    <Tabs defaultValue="overview" value={activeTab} onValueChange={(value) => setActiveTab(value)} className="space-y-6">
                        <TabsList className="grid w-full grid-cols-2">
                            <TabsTrigger value="overview">Overview</TabsTrigger>
                            <TabsTrigger value="conversions">All Conversions</TabsTrigger>
                            {/* <TabsTrigger value="funnel">Conversion Funnel</TabsTrigger> */}
                            {/* <TabsTrigger value="sources">Traffic Sources</TabsTrigger> */}
                            {/* <TabsTrigger value="optimization">Optimization</TabsTrigger> */}
                        </TabsList>

                        <TabsContent value="overview" className="space-y-6">
                            {/* Recent Conversions */}
                            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6 pb-6">
                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Conversions</CardTitle>
                                        <Target className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {loading ? <Skeleton className="h-6 w-16" /> : overviewSummary?.total_conversions ?? 0}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Conversion Rate</CardTitle>
                                        <Activity className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {loading ? <Skeleton className="h-6 w-16" /> : `${overviewSummary?.conversion_rate ?? 0}%`}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Average Order Value</CardTitle>
                                        <IndianRupee className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {loading ? <Skeleton className="h-6 w-20" /> : `${currencySymbol}${overviewSummary?.average_order_value ?? 0}`}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Total Revenue</CardTitle>
                                        <ShoppingCart className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-2xl font-bold">
                                            {loading ? <Skeleton className="h-6 w-24" /> : `${currencySymbol}${overviewSummary?.total_revenue?.toLocaleString() ?? 0}`}
                                        </div>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Top Referrer</CardTitle>
                                        <Star className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-lg font-bold">
                                            {overviewSummary?.top_referrer?.name ?? "N/A"}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {overviewSummary?.top_referrer?.conversions ?? 0} conversions
                                        </p>
                                    </CardContent>
                                </Card>

                                <Card>
                                    <CardHeader className="flex flex-row items-center justify-between pb-2">
                                        <CardTitle className="text-sm font-medium">Top Product</CardTitle>
                                        <Gift className="h-4 w-4 text-muted-foreground" />
                                    </CardHeader>
                                    <CardContent>
                                        <div className="text-lg font-bold truncate" title={overviewSummary?.top_product?.name ?? ""}>
                                            {loading ? <Skeleton className="h-5 w-28" /> : overviewSummary?.top_product?.name ?? "N/A"}
                                        </div>
                                        <p className="text-xs text-muted-foreground">
                                            {loading ? <Skeleton className="h-4 w-20" /> : `${overviewSummary?.top_product?.conversions ?? 0} conversions`} conversions
                                        </p>
                                    </CardContent>
                                </Card>
                            </div>
                            <Card>
                                <CardHeader>
                                    <CardTitle>Recent Conversions</CardTitle>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {loading ? (
                                            Array.from({ length: 5 }).map((_, i) => (
                                                <div key={i} className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center space-x-4">
                                                        <Skeleton className="w-10 h-10 rounded-full" />
                                                        <div className="space-y-2">
                                                            <Skeleton className="h-4 w-32" />
                                                            <Skeleton className="h-3 w-24" />
                                                        </div>
                                                    </div>

                                                    <div className="space-y-2">
                                                        <Skeleton className="h-4 w-24" />
                                                        <Skeleton className="h-3 w-16" />
                                                    </div>

                                                    <Skeleton className="h-6 w-20 rounded-full" />
                                                </div>
                                            ))
                                        ) : filteredConversions.length === 0 ? (
                                            <div className="text-center py-10 text-gray-500">
                                                No recent conversions yet
                                            </div>
                                        ) : (
                                            filteredConversions.slice(0, 5).map((conversion, index) => (
                                                <div key={index} className="flex items-center justify-between p-4 border rounded-lg">

                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-10 h-10 bg-green-100 rounded-full flex items-center justify-center">
                                                            <Target className="w-5 h-5 text-green-600" />
                                                        </div>
                                                        <div>
                                                            <p className="font-medium">{conversion.customer}</p>
                                                            <p className="text-sm text-gray-600">via {conversion.referrer}</p>
                                                        </div>
                                                    </div>

                                                    <div className="text-right">
                                                        <p className="font-medium">{conversion.product}</p>
                                                        <p className="text-sm text-gray-600">{currencySymbol}{conversion.amount}</p>
                                                    </div>

                                                    <div className="flex items-center space-x-2">
                                                        <Badge className={getStatusColor(conversion.status)}>
                                                            {getStatusIcon(conversion.status)}
                                                            <span className="ml-1 capitalize">{conversion.status}</span>
                                                        </Badge>
                                                    </div>

                                                </div>
                                            ))
                                        )}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="conversions" className="space-y-6">
                            {/* Header Section (Outside Card) */}
                            <Card className="bg-transparent shadow-none border-none">
                                <CardHeader className="p-0 py-6">
                                    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">

                                        {/* Title */}
                                        <div>
                                            <CardTitle>All Conversions</CardTitle>
                                            <CardDescription>Review and manage customer requests</CardDescription>
                                        </div>

                                        {/* Search + Dropdown */}
                                        <div className="flex items-center gap-3 w-full md:w-auto">

                                            <div className="relative w-80">
                                                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                <Input
                                                    placeholder="Search by customer, or product..."
                                                    className="pl-9"
                                                    value={searchTerm}
                                                    onChange={(e) => setSearchTerm(e.target.value)}
                                                />
                                            </div>

                                            {/* <Select value={selectedProgram} onValueChange={setSelectedProgram}>
                                                <SelectTrigger className="w-48">
                                                    <SelectValue placeholder="All Programs" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {programOptions.map((option) => (
                                                        <SelectItem key={option.value} value={option.value}>
                                                            {option.label}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select> */}
                                        </div>
                                    </div>
                                </CardHeader>
                            </Card>

                            {/* Conversions Table */}
                            <Card>
                                <CardContent className="p-6">
                                    <div className="overflow-x-auto">
                                        <Table>
                                            <TableHeader>
                                                <TableRow>
                                                    <TableHead>Customer</TableHead>
                                                    <TableHead>Referrer</TableHead>
                                                    <TableHead>Product</TableHead>
                                                    <TableHead>Order Value</TableHead>
                                                    <TableHead>Discount</TableHead>
                                                    <TableHead>Source</TableHead>
                                                    <TableHead>Device</TableHead>
                                                    <TableHead>Status</TableHead>
                                                    <TableHead>Date</TableHead>
                                                </TableRow>
                                            </TableHeader>

                                            <TableBody>
                                                {allConversionsLoading ? (
                                                    Array.from({ length: 6 }).map((_, i) => (
                                                        <TableRow key={i}>
                                                            {Array.from({ length: 9 }).map((__, j) => (
                                                                <TableCell key={j}>
                                                                    <Skeleton className="h-4 w-full" />
                                                                </TableCell>
                                                            ))}
                                                        </TableRow>
                                                    ))
                                                ) : filteredConversions.length === 0 ? (
                                                    <TableRow>
                                                        <TableCell colSpan={9} className="text-center py-8 text-gray-500">
                                                            No matching conversions found
                                                        </TableCell>
                                                    </TableRow>
                                                ) : (
                                                    filteredConversions.map((conversion, index) => {
                                                        const extra = allConversions[index];

                                                        return (
                                                            <TableRow key={index}>
                                                                <TableCell>
                                                                    <div>
                                                                        <p className="font-medium">{conversion.customer}</p>
                                                                        <p className="text-sm text-gray-600 flex items-center">
                                                                            <MapPin className="w-3 h-3 mr-1" />
                                                                            {extra?.customer_location || ""}
                                                                        </p>
                                                                    </div>
                                                                </TableCell>

                                                                <TableCell>{conversion.referrer || "N/A"}</TableCell>

                                                                <TableCell>{conversion.product}</TableCell>

                                                                <TableCell className="font-medium">
                                                                    {currencySymbol}{conversion.amount}
                                                                </TableCell>

                                                                <TableCell>
                                                                    {extra ? `${currencySymbol}${extra.commission}` : "N/A"}
                                                                </TableCell>

                                                                <TableCell>
                                                                    {extra?.source || "N/A"}
                                                                </TableCell>

                                                                <TableCell>
                                                                    {(() => {
                                                                        const device = getDeviceDetails(extra?.device_type || "N/A  ");
                                                                        return (
                                                                            <div className="flex items-center gap-1">
                                                                                {device.icon}
                                                                                {device.label}
                                                                            </div>
                                                                        );
                                                                    })()}
                                                                </TableCell>

                                                                <TableCell>
                                                                    <Badge className={getStatusColor(conversion.status)}>
                                                                        {getStatusIcon(conversion.status)}
                                                                        <span className="ml-1 capitalize">
                                                                            {conversion.status}
                                                                        </span>
                                                                    </Badge>
                                                                </TableCell>

                                                                <TableCell>{formatDate(conversion.date)}</TableCell>
                                                            </TableRow>
                                                        )
                                                    }
                                                    ))}
                                            </TableBody>
                                        </Table>
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* <TabsContent value="funnel" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Conversion Funnel</CardTitle>
                                    <p className="text-sm text-gray-600">Track how visitors move through your referral funnel</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="space-y-4">
                                        {conversionFunnel.map((stage, index) => (
                                            <div key={stage.stage} className="relative">
                                                <div className="flex items-center justify-between p-4 border rounded-lg">
                                                    <div className="flex items-center space-x-4">
                                                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center text-sm font-medium">
                                                            {index + 1}
                                                        </div>
                                                        <div>
                                                            <h3 className="font-medium">{stage.stage}</h3>
                                                            <p className="text-sm text-gray-600">{stage.count.toLocaleString()} users</p>
                                                        </div>
                                                    </div>
                                                    <div className="text-right">
                                                        <p className="text-lg font-semibold">{stage.percentage}%</p>
                                                        {index > 0 && (
                                                            <p className="text-sm text-gray-600">
                                                                -{(100 - stage.percentage).toFixed(1)}% drop-off
                                                            </p>
                                                        )}
                                                    </div>
                                                </div>
                                                <div className="mt-2">
                                                    <Progress value={stage.percentage} className="h-2" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="sources" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Traffic Sources</CardTitle>
                                    <p className="text-sm text-gray-600">Analyze conversion performance by traffic source</p>
                                </CardHeader>
                                <CardContent>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                        {topSources.map((source) => (
                                            <div key={source.name} className="border rounded-lg p-4">
                                                <div className="flex items-center justify-between mb-3">
                                                    <h3 className="font-medium">{source.name}</h3>
                                                    <Badge>{source.rate}% conversion rate</Badge>
                                                </div>
                                                <div className="space-y-2">
                                                    <div className="flex justify-between text-sm">
                                                        <span>Conversions</span>
                                                        <span className="font-medium">{source.conversions}</span>
                                                    </div>
                                                    <Progress value={(source.conversions / conversionStats.totalConversions) * 100} className="h-2" />
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        <TabsContent value="optimization" className="space-y-6">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Conversion Optimization</CardTitle>
                                    <p className="text-sm text-gray-600">Recommendations to improve your conversion rates</p>
                                </CardHeader>
                                <CardContent className="space-y-4">
                                    <Alert>
                                        <Zap className="h-4 w-4" />
                                        <AlertDescription>
                                            <strong>Quick Win:</strong> Mobile conversion rate is 23% lower than desktop. Consider optimizing mobile checkout experience.
                                        </AlertDescription>
                                    </Alert>
                                    <Alert>
                                        <Target className="h-4 w-4" />
                                        <AlertDescription>
                                            <strong>Opportunity:</strong> Email referrals have highest conversion rate (18.9%). Consider promoting email sharing more prominently.
                                        </AlertDescription>
                                    </Alert>
                                    <Alert>
                                        <TrendingUp className="h-4 w-4" />
                                        <AlertDescription>
                                            <strong>Growth:</strong> Cart abandonment rate is 68%. Implement retargeting campaigns for referral traffic.
                                        </AlertDescription>
                                    </Alert>
                                </CardContent>
                            </Card>
                        </TabsContent> */}
                    </Tabs>
                </div>
            </main>
        </div>
    );
}