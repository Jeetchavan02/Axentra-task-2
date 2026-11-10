import { useState } from "react";
import { 
  DollarSign, 
  CreditCard, 
  Calendar, 
  Download, 
  Eye, 
  CheckCircle, 
  Clock, 
  XCircle,
  AlertCircle,
  Plus,
  Edit,
  RefreshCw,
  TrendingUp,
  Users,
  Mail,
  Copy,
  Settings
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Badge } from "@src/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Alert, AlertDescription } from "@src/components/ui/alert";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@src/components/ui/dialog";
import { Textarea } from "@src/components/ui/textarea";

export default function ReferralsPayouts() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [showPayoutModal, setShowPayoutModal] = useState(false);
  const [selectedPayout, setSelectedPayout] = useState<any>(null);
  const [showViewModal, setShowViewModal] = useState(false);
  const [showRejectModal, setShowRejectModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [showApproveModal, setShowApproveModal] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [rejectReason, setRejectReason] = useState("");

  const timeframeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" }
  ];

  const statusOptions = [
    { value: "all", label: "All Status" },
    { value: "pending", label: "Pending" },
    { value: "processing", label: "Processing" },
    { value: "completed", label: "Completed" },
    { value: "failed", label: "Failed" }
  ];

  // Mock data for payouts
  const payoutStats = {
    totalPayouts: 127450,
    pendingPayouts: 8920,
    completedPayouts: 118530,
    failedPayouts: 0,
    averagePayoutTime: "2.3 days"
  };

  const payouts = [
    {
      id: 1,
      referrer: "Sarah Johnson",
      email: "sarah.j@email.com",
      amount: 285.50,
      commissions: 12,
      status: "completed",
      payoutDate: "2024-07-08",
      paymentMethod: "PayPal",
      transactionId: "PP-789123456"
    },
    {
      id: 2,
      referrer: "Mike Chen",
      email: "mike.chen@email.com",
      amount: 450.75,
      commissions: 18,
      status: "pending",
      payoutDate: "2024-07-09",
      paymentMethod: "Bank Transfer",
      transactionId: "BT-456789123"
    },
    {
      id: 3,
      referrer: "Emma Wilson",
      email: "emma.w@email.com",
      amount: 320.25,
      commissions: 15,
      status: "processing",
      payoutDate: "2024-07-09",
      paymentMethod: "PayPal",
      transactionId: "PP-123456789"
    },
    {
      id: 4,
      referrer: "David Lee",
      email: "david.lee@email.com",
      amount: 195.00,
      commissions: 8,
      status: "completed",
      payoutDate: "2024-07-07",
      paymentMethod: "Stripe",
      transactionId: "ST-987654321"
    },
    {
      id: 5,
      referrer: "Lisa Rodriguez",
      email: "lisa.r@email.com",
      amount: 525.80,
      commissions: 22,
      status: "pending",
      payoutDate: "2024-07-10",
      paymentMethod: "Bank Transfer",
      transactionId: "BT-555777999"
    }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case "completed":
        return "bg-green-100 text-green-800";
      case "pending":
        return "bg-yellow-100 text-yellow-800";
      case "processing":
        return "bg-blue-100 text-blue-800";
      case "failed":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircle className="w-4 h-4" />;
      case "pending":
        return <Clock className="w-4 h-4" />;
      case "processing":
        return <AlertCircle className="w-4 h-4" />;
      case "failed":
        return <XCircle className="w-4 h-4" />;
      default:
        return <Clock className="w-4 h-4" />;
    }
  };

  const filteredPayouts = payouts.filter(payout => {
    const matchesStatus = selectedStatus === "all" || payout.status === selectedStatus;
    const matchesSearch = payout.referrer.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         payout.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const handleViewPayout = (payout: any) => {
    setSelectedPayout(payout);
    setShowViewModal(true);
  };

  const handleApprovePayout = (payout: any) => {
    setSelectedPayout(payout);
    setShowApproveModal(true);
  };

  const confirmApprovePayout = () => {
    console.log("Approving payout:", selectedPayout?.id);
    // Here you would typically make an API call to update the payout status
    setSuccessMessage(`Payout ${selectedPayout?.id} has been approved and is now processing.`);
    setShowApproveModal(false);
    setShowSuccessModal(true);
    setSelectedPayout(null);
  };

  const handleRejectPayout = (payout: any) => {
    setSelectedPayout(payout);
    setShowRejectModal(true);
  };

  const confirmRejectPayout = () => {
    if (!rejectReason.trim() || rejectReason.length < 10) {
      return; // Form validation will handle this
    }
    console.log("Rejecting payout:", selectedPayout?.id, "Reason:", rejectReason);
    // Here you would typically make an API call to reject the payout
    setSuccessMessage(`Payout ${selectedPayout?.id} has been rejected. Reason: ${rejectReason}`);
    setShowRejectModal(false);
    setRejectReason("");
    setShowSuccessModal(true);
    setSelectedPayout(null);
  };

  const handleEditPayout = (payout: any) => {
    setSelectedPayout(payout);
    setShowEditModal(true);
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">Payouts</h2>
              <p className="text-sm text-gray-600 mt-1">Manage referral commissions and payouts</p>
            </div>
            <div className="flex items-center space-x-4">
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
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
              <Button 
                className="bg-black text-white hover:bg-gray-800"
                onClick={() => setShowPayoutModal(true)}
              >
                <Plus className="h-4 w-4 mr-2" />
                Create Payout
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="payouts">All Payouts</TabsTrigger>
              <TabsTrigger value="methods">Payment Methods</TabsTrigger>
              <TabsTrigger value="automation">Automation</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Payouts</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${payoutStats.totalPayouts.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      +12.5% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Pending Payouts</CardTitle>
                    <Clock className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${payoutStats.pendingPayouts.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Awaiting processing
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Completed Payouts</CardTitle>
                    <CheckCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${payoutStats.completedPayouts.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Successfully paid out
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Failed Payouts</CardTitle>
                    <XCircle className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${payoutStats.failedPayouts.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      Requires attention
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Payout Time</CardTitle>
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{payoutStats.averagePayoutTime}</div>
                    <p className="text-xs text-muted-foreground">
                      Processing time
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Recent Payouts */}
              <Card>
                <CardHeader>
                  <CardTitle>Recent Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {payouts.slice(0, 5).map((payout) => (
                      <div key={payout.id} className="flex items-center justify-between p-4 border rounded-lg">
                        <div className="flex items-center space-x-4">
                          <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                            <DollarSign className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <p className="font-medium">{payout.referrer}</p>
                            <p className="text-sm text-gray-600">{payout.email}</p>
                          </div>
                        </div>
                        <div className="text-right">
                          <p className="font-medium">${payout.amount}</p>
                          <div className="flex items-center space-x-2">
                            <Badge className={getStatusColor(payout.status)}>
                              {getStatusIcon(payout.status)}
                              <span className="ml-1 capitalize">{payout.status}</span>
                            </Badge>
                            {payout.status === 'pending' && (
                              <div className="flex items-center space-x-1">
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-8 px-2 text-green-600 border-green-600 hover:bg-green-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleApprovePayout(payout);
                                  }}
                                >
                                  Approve
                                </Button>
                                <Button 
                                  size="sm" 
                                  variant="outline"
                                  className="h-8 px-2 text-blue-600 border-blue-600 hover:bg-blue-50"
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleViewPayout(payout);
                                  }}
                                >
                                  Review
                                </Button>
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="payouts" className="space-y-6">
              {/* Filters */}
              <div className="flex items-center space-x-4">
                <div className="flex-1">
                  <Input
                    placeholder="Search referrers..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="max-w-sm"
                  />
                </div>
                <Select value={selectedStatus} onValueChange={setSelectedStatus}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by status" />
                  </SelectTrigger>
                  <SelectContent>
                    {statusOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Payouts Table */}
              <Card>
                <CardHeader>
                  <CardTitle>All Payouts</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="w-full">
                      <thead>
                        <tr className="border-b">
                          <th className="text-left p-3">Referrer</th>
                          <th className="text-left p-3">Amount</th>
                          <th className="text-left p-3">Commissions</th>
                          <th className="text-left p-3">Status</th>
                          <th className="text-left p-3">Payment Method</th>
                          <th className="text-left p-3">Date</th>
                          <th className="text-left p-3">Actions</th>
                        </tr>
                      </thead>
                      <tbody>
                        {filteredPayouts.map((payout) => (
                          <tr key={payout.id} className="border-b hover:bg-gray-50">
                            <td className="p-3">
                              <div>
                                <p className="font-medium">{payout.referrer}</p>
                                <p className="text-sm text-gray-600">{payout.email}</p>
                              </div>
                            </td>
                            <td className="p-3">
                              <span className="font-medium">${payout.amount}</span>
                            </td>
                            <td className="p-3">
                              <span className="text-sm">{payout.commissions} referrals</span>
                            </td>
                            <td className="p-3">
                              <Badge className={getStatusColor(payout.status)}>
                                {getStatusIcon(payout.status)}
                                <span className="ml-1 capitalize">{payout.status}</span>
                              </Badge>
                            </td>
                            <td className="p-3">
                              <span className="text-sm">{payout.paymentMethod}</span>
                            </td>
                            <td className="p-3">
                              <span className="text-sm">{payout.payoutDate}</span>
                            </td>
                            <td className="p-3">
                              <div className="flex items-center space-x-2">
                                <Button 
                                  variant="ghost" 
                                  size="sm"
                                  onClick={() => handleViewPayout(payout)}
                                >
                                  <Eye className="w-4 h-4 mr-2" />
                                  View
                                </Button>
                                {payout.status === 'pending' && (
                                  <Button 
                                    variant="ghost" 
                                    size="sm"
                                    onClick={() => handleEditPayout(payout)}
                                  >
                                    <Edit className="w-4 h-4 mr-2" />
                                    Edit
                                  </Button>
                                )}
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

            <TabsContent value="methods" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payment Methods</CardTitle>
                  <p className="text-sm text-gray-600">Configure how referrers receive their payouts</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-5 h-5 text-blue-600" />
                          <span className="font-medium">PayPal</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Fast and secure payouts via PayPal</p>
                      <div className="text-sm text-gray-500">
                        <p>Processing time: 1-2 business days</p>
                        <p>Fee: 2.9% + $0.30</p>
                      </div>
                    </div>
                    <div className="border rounded-lg p-4">
                      <div className="flex items-center justify-between mb-3">
                        <div className="flex items-center space-x-2">
                          <CreditCard className="w-5 h-5 text-purple-600" />
                          <span className="font-medium">Stripe</span>
                        </div>
                        <Badge className="bg-green-100 text-green-800">Active</Badge>
                      </div>
                      <p className="text-sm text-gray-600 mb-3">Direct bank transfers via Stripe</p>
                      <div className="text-sm text-gray-500">
                        <p>Processing time: 2-3 business days</p>
                        <p>Fee: 2.9% + $0.30</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="automation" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Payout Automation</CardTitle>
                  <p className="text-sm text-gray-600">Set up automatic payout schedules and thresholds</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      Automatic payouts help streamline your referral program by reducing manual processing time.
                    </AlertDescription>
                  </Alert>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Payout Schedule</h4>
                      <Select>
                        <SelectTrigger>
                          <SelectValue placeholder="Select schedule" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="manual">Manual Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Minimum Payout Amount</h4>
                      <Input type="number" placeholder="$25.00" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>

      {/* Create Payout Modal */}
      <Dialog open={showPayoutModal} onOpenChange={setShowPayoutModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Plus className="w-5 h-5 mr-2" />
              Create New Payout
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="referrer">Referrer</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select referrer" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                    <SelectItem value="mike">Mike Chen</SelectItem>
                    <SelectItem value="emma">Emma Wilson</SelectItem>
                    <SelectItem value="david">David Lee</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="amount">Payout Amount</Label>
                <Input
                  id="amount"
                  type="number"
                  placeholder="$0.00"
                  step="0.01"
                />
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <Label htmlFor="payment-method">Payment Method</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select method" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="paypal">PayPal</SelectItem>
                    <SelectItem value="stripe">Stripe</SelectItem>
                    <SelectItem value="bank">Bank Transfer</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="schedule">Schedule</Label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select schedule" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="immediate">Immediate</SelectItem>
                    <SelectItem value="next-cycle">Next Cycle</SelectItem>
                    <SelectItem value="manual">Manual</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div>
              <Label htmlFor="notes">Notes (Optional)</Label>
              <Textarea
                id="notes"
                placeholder="Add any notes about this payout..."
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowPayoutModal(false)}>
                Cancel
              </Button>
              <Button className="bg-green-600 hover:bg-green-700">
                <DollarSign className="w-4 h-4 mr-2" />
                Create Payout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* View Payout Modal */}
      <Dialog open={showViewModal} onOpenChange={setShowViewModal}>
        <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto">
          <DialogHeader className="pb-4 border-b border-gray-200">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center mr-3">
                  <DollarSign className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <DialogTitle className="text-xl font-semibold text-gray-900">
                    Payout Details
                  </DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Complete information for this referral payout
                  </p>
                </div>
              </div>
              {selectedPayout && (
                <Badge className={`${getStatusColor(selectedPayout.status)} text-sm px-3 py-1`}>
                  {getStatusIcon(selectedPayout.status)}
                  <span className="ml-2 capitalize">{selectedPayout.status}</span>
                </Badge>
              )}
            </div>
          </DialogHeader>
          {selectedPayout && (
            <div className="space-y-6 py-4">
              {/* Main Payout Information */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Referrer Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <Users className="w-5 h-5 mr-2 text-blue-600" />
                      Referrer Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex items-center space-x-3">
                      <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                        <span className="text-white font-bold text-lg">
                          {selectedPayout.referrer.split(' ').map((n: string) => n[0]).join('')}
                        </span>
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{selectedPayout.referrer}</p>
                        <p className="text-sm text-gray-600 flex items-center">
                          <Mail className="w-4 h-4 mr-1" />
                          {selectedPayout.email}
                        </p>
                      </div>
                    </div>
                    <div className="bg-gray-50 p-3 rounded-lg">
                      <div className="grid grid-cols-2 gap-3 text-sm">
                        <div>
                          <span className="text-gray-600">Total Referrals:</span>
                          <p className="font-medium">{selectedPayout.commissions}</p>
                        </div>
                        <div>
                          <span className="text-gray-600">Join Date:</span>
                          <p className="font-medium">Jan 2024</p>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Payment Information */}
                <Card>
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg flex items-center">
                      <CreditCard className="w-5 h-5 mr-2 text-green-600" />
                      Payment Information
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="bg-gradient-to-r from-green-50 to-blue-50 p-4 rounded-lg border border-green-200">
                      <div className="text-center">
                        <p className="text-2xl font-bold text-green-700">${selectedPayout.amount}</p>
                        <p className="text-sm text-green-600">Payout Amount</p>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Payment Method:</span>
                        <span className="font-medium">{selectedPayout.paymentMethod}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Transaction ID:</span>
                        <span className="font-mono text-sm bg-gray-100 px-2 py-1 rounded">
                          {selectedPayout.transactionId}
                        </span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-sm text-gray-600">Scheduled Date:</span>
                        <span className="font-medium">{selectedPayout.payoutDate}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Commission Breakdown */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <TrendingUp className="w-5 h-5 mr-2 text-orange-600" />
                    Commission Breakdown
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                    <div className="bg-blue-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-blue-600">{selectedPayout.commissions}</p>
                      <p className="text-sm text-blue-600">Total Referrals</p>
                    </div>
                    <div className="bg-purple-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-purple-600">15%</p>
                      <p className="text-sm text-purple-600">Commission Rate</p>
                    </div>
                    <div className="bg-green-50 p-4 rounded-lg text-center">
                      <p className="text-2xl font-bold text-green-600">${(selectedPayout.amount / 0.15).toFixed(2)}</p>
                      <p className="text-sm text-green-600">Total Sales Generated</p>
                    </div>
                  </div>
                  <div className="mt-4 p-4 bg-gradient-to-r from-gray-50 to-gray-100 rounded-lg">
                    <div className="flex justify-between items-center">
                      <span className="text-lg font-medium text-gray-900">Commission Earned:</span>
                      <span className="text-2xl font-bold text-green-600">${selectedPayout.amount}</span>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Timeline & Actions */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {/* Timeline */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Calendar className="w-5 h-5 mr-2 text-purple-600" />
                      Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-start space-x-3">
                        <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                          <CheckCircle className="w-4 h-4 text-blue-600" />
                        </div>
                        <div className="flex-1">
                          <p className="text-sm font-medium">Payout Created</p>
                          <p className="text-xs text-gray-500">{selectedPayout.payoutDate}</p>
                          <p className="text-xs text-gray-400 mt-1">Commission calculated and payout scheduled</p>
                        </div>
                      </div>
                      {selectedPayout.status === 'completed' && (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
                            <CheckCircle className="w-4 h-4 text-green-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Payout Completed</p>
                            <p className="text-xs text-gray-500">{selectedPayout.payoutDate}</p>
                            <p className="text-xs text-gray-400 mt-1">Payment successfully processed</p>
                          </div>
                        </div>
                      )}
                      {selectedPayout.status === 'pending' && (
                        <div className="flex items-start space-x-3">
                          <div className="w-8 h-8 bg-yellow-100 rounded-full flex items-center justify-center">
                            <Clock className="w-4 h-4 text-yellow-600" />
                          </div>
                          <div className="flex-1">
                            <p className="text-sm font-medium">Awaiting Approval</p>
                            <p className="text-xs text-gray-500">Scheduled for {selectedPayout.payoutDate}</p>
                            <p className="text-xs text-gray-400 mt-1">Pending merchant review and approval</p>
                          </div>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>

                {/* Quick Actions */}
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg flex items-center">
                      <Settings className="w-5 h-5 mr-2 text-gray-600" />
                      Quick Actions
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-3">
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          navigator.clipboard.writeText(selectedPayout.transactionId);
                        }}
                      >
                        <Copy className="w-4 h-4 mr-2" />
                        Copy Transaction ID
                      </Button>
                      <Button 
                        variant="outline" 
                        className="w-full justify-start"
                        onClick={() => {
                          // Handle download receipt
                        }}
                      >
                        <Download className="w-4 h-4 mr-2" />
                        Download Receipt
                      </Button>
                      {selectedPayout.status === 'pending' && (
                        <>
                          <Button 
                            className="w-full justify-start bg-green-600 hover:bg-green-700"
                            onClick={() => {
                              handleApprovePayout(selectedPayout);
                            }}
                          >
                            <CheckCircle className="w-4 h-4 mr-2" />
                            Approve Payout
                          </Button>
                          <Button 
                            variant="outline" 
                            className="w-full justify-start text-red-600 border-red-600 hover:bg-red-50"
                            onClick={() => {
                              handleRejectPayout(selectedPayout);
                            }}
                          >
                            <XCircle className="w-4 h-4 mr-2" />
                            Reject Payout
                          </Button>
                        </>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </div>

              {/* Footer Actions */}
              <div className="flex justify-between items-center pt-4 border-t border-gray-200">
                <div className="text-sm text-gray-600">
                  Last updated: {new Date().toLocaleDateString()}
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={() => setShowViewModal(false)}>
                    Close
                  </Button>
                  {selectedPayout.status === 'pending' && (
                    <Button 
                      className="bg-blue-600 hover:bg-blue-700"
                      onClick={() => {
                        setShowViewModal(false);
                        handleEditPayout(selectedPayout);
                      }}
                    >
                      <Edit className="w-4 h-4 mr-2" />
                      Edit Payout
                    </Button>
                  )}
                </div>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Reject Payout Modal */}
      <Dialog open={showRejectModal} onOpenChange={setShowRejectModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-red-600">
              <XCircle className="w-5 h-5 mr-2" />
              Reject Payout
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-red-50 rounded-lg">
              <p className="text-sm text-red-800">
                Are you sure you want to reject this payout? This action cannot be undone.
              </p>
            </div>
            
            {selectedPayout && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Payout Details:</p>
                <div className="text-sm text-gray-600">
                  <p>Referrer: {selectedPayout.referrer}</p>
                  <p>Amount: ${selectedPayout.amount}</p>
                  <p>Transaction ID: {selectedPayout.transactionId}</p>
                </div>
              </div>
            )}

            <div className="space-y-2">
              <Label htmlFor="rejectReason">Reason for Rejection *</Label>
              <Textarea
                id="rejectReason"
                placeholder="Please provide a detailed reason for rejecting this payout..."
                value={rejectReason}
                onChange={(e) => setRejectReason(e.target.value)}
                rows={3}
                className="resize-none"
                required
              />
              {rejectReason.length > 0 && rejectReason.length < 10 && (
                <p className="text-sm text-red-600">Please provide a more detailed reason (minimum 10 characters)</p>
              )}
            </div>

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => {
                  setShowRejectModal(false);
                  setRejectReason("");
                }}
              >
                Cancel
              </Button>
              <Button 
                className="bg-red-600 hover:bg-red-700"
                onClick={confirmRejectPayout}
                disabled={!rejectReason.trim() || rejectReason.length < 10}
              >
                <XCircle className="w-4 h-4 mr-2" />
                Reject Payout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Payout Modal */}
      <Dialog open={showEditModal} onOpenChange={setShowEditModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle className="flex items-center">
              <Edit className="w-5 h-5 mr-2" />
              Edit Payout
            </DialogTitle>
          </DialogHeader>
          {selectedPayout && (
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="editAmount">Payout Amount</Label>
                  <Input
                    id="editAmount"
                    type="number"
                    defaultValue={selectedPayout.amount}
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="editMethod">Payment Method</Label>
                  <Select defaultValue={selectedPayout.paymentMethod}>
                    <SelectTrigger className="mt-1">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="PayPal">PayPal</SelectItem>
                      <SelectItem value="Bank Transfer">Bank Transfer</SelectItem>
                      <SelectItem value="Wire Transfer">Wire Transfer</SelectItem>
                      <SelectItem value="Check">Check</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div>
                <Label htmlFor="editNotes">Internal Notes</Label>
                <Textarea
                  id="editNotes"
                  placeholder="Add any internal notes about this payout..."
                  rows={3}
                  className="mt-1 resize-none"
                />
              </div>

              <div className="flex justify-end space-x-3 pt-4">
                <Button 
                  variant="outline" 
                  onClick={() => setShowEditModal(false)}
                >
                  Cancel
                </Button>
                <Button 
                  className="bg-blue-600 hover:bg-blue-700"
                  onClick={() => {
                    console.log("Saving payout changes for:", selectedPayout.id);
                    setSuccessMessage(`Payout ${selectedPayout.id} has been updated successfully.`);
                    setShowEditModal(false);
                    setShowSuccessModal(true);
                    setSelectedPayout(null);
                  }}
                >
                  <Edit className="w-4 h-4 mr-2" />
                  Save Changes
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Approve Payout Modal */}
      <Dialog open={showApproveModal} onOpenChange={setShowApproveModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              Approve Payout
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                Are you sure you want to approve this payout? The payment will be processed immediately.
              </p>
            </div>
            
            {selectedPayout && (
              <div className="space-y-2">
                <p className="text-sm font-medium">Payout Details:</p>
                <div className="text-sm text-gray-600">
                  <p>Referrer: {selectedPayout.referrer}</p>
                  <p>Amount: ${selectedPayout.amount}</p>
                  <p>Payment Method: {selectedPayout.paymentMethod}</p>
                  <p>Transaction ID: {selectedPayout.transactionId}</p>
                </div>
              </div>
            )}

            <div className="flex justify-end space-x-3 pt-4">
              <Button 
                variant="outline" 
                onClick={() => setShowApproveModal(false)}
              >
                Cancel
              </Button>
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={confirmApprovePayout}
              >
                <CheckCircle className="w-4 h-4 mr-2" />
                Approve Payout
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Success Modal */}
      <Dialog open={showSuccessModal} onOpenChange={setShowSuccessModal}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center text-green-600">
              <CheckCircle className="w-5 h-5 mr-2" />
              Success
            </DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="p-4 bg-green-50 rounded-lg">
              <p className="text-sm text-green-800">
                {successMessage}
              </p>
            </div>

            <div className="flex justify-end pt-4">
              <Button 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => setShowSuccessModal(false)}
              >
                OK
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}