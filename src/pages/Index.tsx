import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
    Share,
    Users,
    TrendingUp,
    DollarSign,
    Eye,
    AlertCircle,
    CheckCircle,
    Clock,
    Target,
    Zap,
    BarChart3,
    Settings,
    Plus,
    Download,
    Search,
    Filter,
    RefreshCw,
    Shield,
    Ban,
    FileText
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Badge } from "@src/components/ui/badge";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Progress } from "@src/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@src/components/ui/dialog";
import { Label } from "@src/components/ui/label";
import { Textarea } from "@src/components/ui/textarea";
import { Alert, AlertDescription } from "@src/components/ui/alert";
// import MainLayout from "@src/components/layouts/MainLayout";

export default function ReferralsDashboard() {
    const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
    const [selectedFraudCase, setSelectedFraudCase] = useState<any>(null);
    const [fraudDialogOpen, setFraudDialogOpen] = useState(false);
    const [actionType, setActionType] = useState<'review' | 'block' | 'approve'>('review');
    const [showConfirmation, setShowConfirmation] = useState(false);
    const [confirmationAction, setConfirmationAction] = useState<'review' | 'block' | 'approve'>('review');

    // Mock data for dashboard
    // State for dashboard stats
    const [dashboardStats, setDashboardStats] = useState({
        totalReferrers: 0,
        totalConversions: 0,
        totalRevenue: 0,
        conversionRate: 0,
        averageOrderValue: 0, // Not yet in backend, keeping 0
        payoutsProcessed: 0,  // Not yet in backend
        pendingPayouts: 0,    // Not yet in backend
        fraudDetections: 0    // Not yet in backend
    });

    // State for lists
    const [recentReferrals, setRecentReferrals] = useState<any[]>([]);

    const [topReferrers, setTopReferrers] = useState<any[]>([]);
    const [programs, setPrograms] = useState<any[]>([]);

    // Fetch Stats from Backend
    useEffect(() => {
        const fetchData = async () => {
            try {
                // 1. Dashboard Stats
                const statsRes = await fetch("http://localhost:8000/api/v1/dashboard/stats");
                if (statsRes.ok) {
                    const data = await statsRes.json();
                    setDashboardStats(prev => ({
                        ...prev,
                        totalReferrers: data.totalReferrers,
                        totalConversions: data.totalConversions,
                        totalRevenue: data.totalRevenue,
                        conversionRate: data.conversionRate
                    }));
                }

                // 2. Recent Referrals
                const recentRes = await fetch("http://localhost:8000/api/v1/dashboard/recent");
                if (recentRes.ok) {
                    const data = await recentRes.json();
                    setRecentReferrals(data);
                }

                // 3. Top Referrers
                const topRes = await fetch("http://localhost:8000/api/v1/dashboard/top-referrers");
                if (topRes.ok) {
                    const data = await topRes.json();
                    setTopReferrers(data);
                }

                // 4. Programs
                const progRes = await fetch("http://localhost:8000/api/v1/programs/");
                if (progRes.ok) {
                    const data = await progRes.json();
                    setPrograms(data);
                }

            } catch (error) {
                console.error("Error fetching dashboard data:", error);
            }
        };

        fetchData();
    }, []);

    // Mock fraud detection data
    const fraudCases = [
        {
            id: 1,
            type: "Self-Referral Detection",
            user: "john.doe@email.com",
            description: "User appears to be referring themselves using multiple accounts",
            riskLevel: "high",
            amount: 299.99,
            timestamp: "2025-01-08 14:30:00",
            evidence: ["Same IP address", "Similar device fingerprint", "Sequential referral pattern"]
        },
        {
            id: 2,
            type: "Duplicate IP Address",
            user: "multiple.users@domain.com",
            description: "Multiple referrals from same IP address within short timeframe",
            riskLevel: "medium",
            amount: 150.00,
            timestamp: "2025-01-08 12:15:00",
            evidence: ["Same IP: 192.168.1.1", "3 referrals in 5 minutes", "Different email domains"]
        }
    ];

    const handleFraudAction = (fraudCase: any, action: 'review' | 'block' | 'approve') => {
        setSelectedFraudCase(fraudCase);
        setConfirmationAction(action);
        setShowConfirmation(true);
    };

    const confirmFraudAction = () => {
        setActionType(confirmationAction);
        setFraudDialogOpen(true);
        setShowConfirmation(false);
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "approved":
                return "bg-green-100 text-green-800";
            case "pending":
                return "bg-yellow-100 text-yellow-800";
            case "paid":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status: string) => {
        switch (status) {
            case "approved":
                return <CheckCircle className="w-4 h-4" />;
            case "pending":
                return <Clock className="w-4 h-4" />;
            case "paid":
                return <DollarSign className="w-4 h-4" />;
            default:
                return <AlertCircle className="w-4 h-4" />;
        }
    };

    const timeframeOptions = [
        { value: "7d", label: "Last 7 Days" },
        { value: "30d", label: "Last 30 Days" },
        { value: "90d", label: "Last 90 Days" },
        { value: "1y", label: "Last Year" }
    ];

    return (
        <>
            <div className="flex items-center justify-between mb-6">
                <div></div>
                <div className="flex items-center space-x-4">
                    <select
                        value={selectedTimeframe}
                        onChange={(e) => setSelectedTimeframe(e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-black"
                    >
                        {timeframeOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                                {option.label}
                            </option>
                        ))}
                    </select>
                    <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                        <RefreshCw className="h-4 w-4 mr-2" />
                        Refresh
                    </Button>
                    <Link to="/referrals/program">
                        <Button className="bg-black text-white hover:bg-gray-800">
                            <Plus className="w-4 h-4 mr-2" />
                            Create Program
                        </Button>
                    </Link>
                </div>
            </div>

            <div>
                {/* Key Metrics */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                    <Card className="bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-blue-700 truncate pr-2">Total Referrers</CardTitle>
                            <Users className="h-4 w-4 text-blue-600 flex-shrink-0" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-blue-900">{dashboardStats.totalReferrers.toLocaleString()}</div>
                            <p className="text-xs text-green-600">+12% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-green-50 to-green-100 border border-green-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-green-700 truncate pr-2">Total Conversions</CardTitle>
                            <Target className="h-4 w-4 text-green-600 flex-shrink-0" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-green-900">{dashboardStats.totalConversions.toLocaleString()}</div>
                            <p className="text-xs text-green-600">+8% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-purple-50 to-purple-100 border border-purple-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-purple-700 truncate pr-2">Total Revenue</CardTitle>
                            <DollarSign className="h-4 w-4 text-purple-600 flex-shrink-0" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-purple-900">${dashboardStats.totalRevenue.toLocaleString()}</div>
                            <p className="text-xs text-green-600">+15% from last month</p>
                        </CardContent>
                    </Card>

                    <Card className="bg-gradient-to-br from-orange-50 to-orange-100 border border-orange-200">
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-orange-700 truncate pr-2">Conversion Rate</CardTitle>
                            <TrendingUp className="h-4 w-4 text-orange-600 flex-shrink-0" />
                        </CardHeader>
                        <CardContent>
                            <div className="text-2xl font-bold text-orange-900">{dashboardStats.conversionRate}%</div>
                            <p className="text-xs text-green-600">+2.1% from last month</p>
                        </CardContent>
                    </Card>
                </div>

                {/* Program Overview & Quick Actions */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
                    <Card className="lg:col-span-2">
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <BarChart3 className="w-5 h-5 mr-2" />
                                Program Performance
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className="space-y-4">
                                {programs.length === 0 ? (
                                    <p className="text-sm text-gray-500 text-center py-4">No programs found.</p>
                                ) : (
                                    programs.map((program) => {
                                        const maxReferrals = Math.max(...programs.map(p => p.referrals || 0), 1);
                                        const progress = ((program.referrals || 0) / maxReferrals) * 100;

                                        return (
                                            <div key={program.id}>
                                                <div className="flex justify-between items-center mb-1">
                                                    <span className="text-sm text-gray-600">{program.name}</span>
                                                    <div className="flex items-center space-x-2">
                                                        <span className="text-sm font-medium">{program.referrals || 0} referrals</span>
                                                        <Badge className={program.is_active ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-600"}>
                                                            {program.is_active ? "Active" : "Inactive"}
                                                        </Badge>
                                                    </div>
                                                </div>
                                                <Progress value={progress} className="h-2" />
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="flex items-center">
                                <Zap className="w-5 h-5 mr-2" />
                                Quick Actions
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-3">
                            <Link to="/referrals/program">
                                <Button variant="outline" className="w-full justify-start">
                                    <Plus className="w-4 h-4 mr-2" />
                                    Create New Program
                                </Button>
                            </Link>
                            <Link to="/referrals/payouts">
                                <Button variant="outline" className="w-full justify-start">
                                    <DollarSign className="w-4 h-4 mr-2" />
                                    Process Payouts
                                </Button>
                            </Link>
                            <Link to="/referrals/analytics">
                                <Button variant="outline" className="w-full justify-start">
                                    <BarChart3 className="w-4 h-4 mr-2" />
                                    View Analytics
                                </Button>
                            </Link>
                            <Link to="/referrals/settings">
                                <Button variant="outline" className="w-full justify-start">
                                    <Settings className="w-4 h-4 mr-2" />
                                    Program Settings
                                </Button>
                            </Link>
                        </CardContent>
                    </Card>
                </div>

                {/* Detailed Sections */}
                <Tabs defaultValue="recent" className="space-y-6">
                    <TabsList className="grid w-full grid-cols-3">
                        <TabsTrigger value="recent">Recent Activity</TabsTrigger>
                        <TabsTrigger value="top-referrers">Top Referrers</TabsTrigger>
                        <TabsTrigger value="fraud">Fraud Detection</TabsTrigger>
                    </TabsList>

                    <TabsContent value="recent" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <div className="flex items-center justify-between">
                                    <CardTitle className="flex items-center">
                                        <Clock className="w-5 h-5 mr-2" />
                                        Recent Referrals
                                    </CardTitle>
                                    <div className="flex items-center space-x-2">
                                        <div className="relative">
                                            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-gray-500" />
                                            <Input
                                                placeholder="Search referrals..."
                                                className="w-64 pl-9"
                                            />
                                        </div>
                                        <Button variant="outline" size="sm">
                                            <Filter className="w-4 h-4 mr-2" />
                                            Filter
                                        </Button>
                                        <Button variant="outline" size="sm">
                                            <Download className="w-4 h-4 mr-2" />
                                            Export
                                        </Button>
                                    </div>
                                </div>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {recentReferrals.map((referral) => (
                                        <div key={referral.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                                                    <Share className="w-5 h-5 text-blue-600" />
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{referral.referrerName}</p>
                                                    <p className="text-sm text-gray-600">referred {referral.refereeName}</p>
                                                    <p className="text-xs text-gray-500">{referral.referrerEmail}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-6">
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900">${referral.amount}</p>
                                                    <p className="text-sm text-gray-600">Commission: ${referral.commission}</p>
                                                </div>
                                                <div className="flex items-center space-x-2">
                                                    <Badge className={getStatusColor(referral.status)}>
                                                        {getStatusIcon(referral.status)}
                                                        <span className="ml-1 capitalize">{referral.status}</span>
                                                    </Badge>
                                                </div>
                                                <div className="text-sm text-gray-500">
                                                    {referral.date}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="top-referrers" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <Users className="w-5 h-5 mr-2" />
                                    Top Performing Referrers
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="space-y-4">
                                    {topReferrers.map((referrer, index) => (
                                        <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                                            <div className="flex items-center space-x-4">
                                                <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                                                    {index + 1}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-gray-900">{referrer.name}</p>
                                                    <p className="text-sm text-gray-600">{referrer.email}</p>
                                                </div>
                                            </div>
                                            <div className="flex items-center space-x-6">
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900">{referrer.referrals} referrals</p>
                                                    <p className="text-sm text-gray-600">${referrer.revenue} revenue</p>
                                                </div>
                                                <div className="text-right">
                                                    <p className="font-medium text-gray-900">${referrer.commission}</p>
                                                    <p className="text-sm text-gray-600">Commission</p>
                                                </div>
                                                <Badge className={referrer.tier === 'Gold' ? 'bg-yellow-100 text-yellow-800' : 'bg-gray-100 text-gray-800'}>
                                                    {referrer.tier}
                                                </Badge>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>

                    <TabsContent value="fraud" className="space-y-6">
                        <Card>
                            <CardHeader>
                                <CardTitle className="flex items-center">
                                    <AlertCircle className="w-5 h-5 mr-2" />
                                    Fraud Detection & Security
                                </CardTitle>
                            </CardHeader>
                            <CardContent>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                                    <div className="p-4 bg-red-50 rounded-lg">
                                        <h3 className="font-medium text-red-800">Flagged Referrals</h3>
                                        <p className="text-2xl font-bold text-red-600">23</p>
                                        <p className="text-sm text-red-600">Requires review</p>
                                    </div>
                                    <div className="p-4 bg-yellow-50 rounded-lg">
                                        <h3 className="font-medium text-yellow-800">Suspicious Activity</h3>
                                        <p className="text-2xl font-bold text-yellow-600">7</p>
                                        <p className="text-sm text-yellow-600">Under investigation</p>
                                    </div>
                                    <div className="p-4 bg-green-50 rounded-lg">
                                        <h3 className="font-medium text-green-800">Resolved Cases</h3>
                                        <p className="text-2xl font-bold text-green-600">156</p>
                                        <p className="text-sm text-green-600">This month</p>
                                    </div>
                                </div>
                                <div className="space-y-4">
                                    {fraudCases.map((fraudCase) => (
                                        <div key={fraudCase.id} className={`p-4 border rounded-lg ${fraudCase.riskLevel === 'high' ? 'bg-red-50 border-red-200' : 'bg-yellow-50 border-yellow-200'
                                            }`}>
                                            <div className="flex items-center justify-between">
                                                <div>
                                                    <p className={`font-medium ${fraudCase.riskLevel === 'high' ? 'text-red-800' : 'text-yellow-800'}`}>
                                                        {fraudCase.type}
                                                    </p>
                                                    <p className={`text-sm ${fraudCase.riskLevel === 'high' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                        User: {fraudCase.user}
                                                    </p>
                                                    <p className={`text-sm ${fraudCase.riskLevel === 'high' ? 'text-red-600' : 'text-yellow-600'}`}>
                                                        Amount: ${fraudCase.amount}
                                                    </p>
                                                </div>
                                                <div className="flex space-x-2">
                                                    <Button
                                                        variant="outline"
                                                        size="sm"
                                                        onClick={() => handleFraudAction(fraudCase, 'review')}
                                                    >
                                                        <Eye className="w-4 h-4 mr-1" />
                                                        Review
                                                    </Button>
                                                    {fraudCase.riskLevel === 'high' ? (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleFraudAction(fraudCase, 'block')}
                                                        >
                                                            <Ban className="w-4 h-4 mr-1" />
                                                            Block
                                                        </Button>
                                                    ) : (
                                                        <Button
                                                            variant="outline"
                                                            size="sm"
                                                            onClick={() => handleFraudAction(fraudCase, 'approve')}
                                                        >
                                                            <CheckCircle className="w-4 h-4 mr-1" />
                                                            Approve
                                                        </Button>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </CardContent>
                        </Card>
                    </TabsContent>
                </Tabs>
            </div>

            {/* Fraud Detection Action Dialog */}
            <Dialog open={fraudDialogOpen} onOpenChange={setFraudDialogOpen}>
                <DialogContent className="max-w-2xl">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <Shield className="w-5 h-5 mr-2" />
                            {actionType === 'review' ? 'Review Fraud Case' :
                                actionType === 'block' ? 'Block Referral' : 'Approve Referral'}
                        </DialogTitle>
                    </DialogHeader>
                    {selectedFraudCase && (
                        <div className="space-y-6">
                            {/* Case Details */}
                            <div className="bg-gray-50 p-4 rounded-lg">
                                <h3 className="font-medium text-gray-900 mb-2">Case Details</h3>
                                <div className="grid grid-cols-2 gap-4 text-sm">
                                    <div>
                                        <span className="font-medium text-gray-600">Type:</span>
                                        <p className="text-gray-900">{selectedFraudCase.type}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">User:</span>
                                        <p className="text-gray-900">{selectedFraudCase.user}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Amount:</span>
                                        <p className="text-gray-900">${selectedFraudCase.amount}</p>
                                    </div>
                                    <div>
                                        <span className="font-medium text-gray-600">Risk Level:</span>
                                        <Badge className={selectedFraudCase.riskLevel === 'high' ? 'bg-red-100 text-red-800' : 'bg-yellow-100 text-yellow-800'}>
                                            {selectedFraudCase.riskLevel}
                                        </Badge>
                                    </div>
                                </div>
                                <div className="mt-3">
                                    <span className="font-medium text-gray-600">Description:</span>
                                    <p className="text-gray-900 mt-1">{selectedFraudCase.description}</p>
                                </div>
                            </div>

                            {/* Evidence */}
                            <div>
                                <h3 className="font-medium text-gray-900 mb-2">Evidence</h3>
                                <ul className="space-y-2">
                                    {selectedFraudCase.evidence.map((item: string, index: number) => (
                                        <li key={index} className="flex items-center text-sm">
                                            <AlertCircle className="w-4 h-4 mr-2 text-orange-500" />
                                            {item}
                                        </li>
                                    ))}
                                </ul>
                            </div>

                            {/* Action Form */}
                            <div>
                                <Label htmlFor="action-notes" className="text-sm font-medium text-gray-700">
                                    {actionType === 'review' ? 'Review Notes' :
                                        actionType === 'block' ? 'Block Reason' : 'Approval Notes'}
                                </Label>
                                <Textarea
                                    id="action-notes"
                                    placeholder={
                                        actionType === 'review' ? 'Add your review notes here...' :
                                            actionType === 'block' ? 'Explain why this referral should be blocked...' :
                                                'Add approval notes if needed...'
                                    }
                                    className="mt-2"
                                    rows={3}
                                />
                            </div>

                            {/* Action Buttons */}
                            <div className="flex justify-end space-x-3">
                                <Button variant="outline" onClick={() => setFraudDialogOpen(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className={
                                        actionType === 'block' ? 'bg-red-600 hover:bg-red-700' :
                                            actionType === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                                                'bg-blue-600 hover:bg-blue-700'
                                    }
                                    onClick={() => {
                                        // Handle the action here
                                        console.log(`${actionType} action performed for case ${selectedFraudCase.id}`);
                                        setFraudDialogOpen(false);
                                    }}
                                >
                                    {actionType === 'review' ? (
                                        <>
                                            <FileText className="w-4 h-4 mr-2" />
                                            Save Review
                                        </>
                                    ) : actionType === 'block' ? (
                                        <>
                                            <Ban className="w-4 h-4 mr-2" />
                                            Block Referral
                                        </>
                                    ) : (
                                        <>
                                            <CheckCircle className="w-4 h-4 mr-2" />
                                            Approve Referral
                                        </>
                                    )}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>

            {/* Confirmation Dialog */}
            <Dialog open={showConfirmation} onOpenChange={setShowConfirmation}>
                <DialogContent className="max-w-md">
                    <DialogHeader>
                        <DialogTitle className="flex items-center">
                            <AlertCircle className="w-5 h-5 mr-2 text-orange-500" />
                            Confirm Action
                        </DialogTitle>
                    </DialogHeader>
                    {selectedFraudCase && (
                        <div className="space-y-4">
                            <Alert>
                                <AlertCircle className="h-4 w-4" />
                                <AlertDescription>
                                    Are you sure you want to {confirmationAction} this fraud case for {selectedFraudCase.user}?
                                </AlertDescription>
                            </Alert>

                            <div className="bg-gray-50 p-3 rounded-lg">
                                <p className="text-sm font-medium text-gray-900">Case: {selectedFraudCase.type}</p>
                                <p className="text-sm text-gray-600">Amount: ${selectedFraudCase.amount}</p>
                                <p className="text-sm text-gray-600">Risk Level: {selectedFraudCase.riskLevel}</p>
                            </div>

                            <div className="flex justify-end space-x-3">
                                <Button variant="outline" onClick={() => setShowConfirmation(false)}>
                                    Cancel
                                </Button>
                                <Button
                                    className={
                                        confirmationAction === 'block' ? 'bg-red-600 hover:bg-red-700' :
                                            confirmationAction === 'approve' ? 'bg-green-600 hover:bg-green-700' :
                                                'bg-blue-600 hover:bg-blue-700'
                                    }
                                    onClick={confirmFraudAction}
                                >
                                    {confirmationAction === 'review' ? 'Continue Review' :
                                        confirmationAction === 'block' ? 'Block Referral' : 'Approve Referral'}
                                </Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>
        </>
    );
}