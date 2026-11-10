import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import {
  Users,
  Star,
  TrendingUp,
  DollarSign,
  Mail,
  Phone,
  Download,
  Eye,
  Edit,
  Plus,
  RefreshCw,
  Target,
  Award,
  Activity,
  CheckCircle,
  XCircle,
  Clock,
  MapPin,
  Share,
  MessageCircle
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Badge } from "@src/components/ui/badge";
import { Progress } from "@src/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@src/components/ui/avatar";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@src/components/ui/dialog";
import { Textarea } from "@src/components/ui/textarea";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

export default function ReferralsReferrers() {
  const [selectedTimeframe, setSelectedTimeframe] = useState("30d");
  const [selectedTier, setSelectedTier] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");
  const [sortBy, setSortBy] = useState("earnings");
  const [selectedReferrer, setSelectedReferrer] = useState<any>(null);
  const [showContactModal, setShowContactModal] = useState(false);
  const [contactMessage, setContactMessage] = useState("");
  const [contactMethod, setContactMethod] = useState("");
  const [showInviteModal, setShowInviteModal] = useState(false);
  const [inviteForm, setInviteForm] = useState({
    name: "",
    email: "",
    phone: "",
    channel: "email",
    message: "Hi [Name],\n\nI'd love to invite you to join our referral program! You can earn great rewards by referring your friends and family to our products.\n\nWith our program, you'll get:\n• Commission on every successful referral\n• Exclusive marketing materials\n• Real-time tracking of your earnings\n• Monthly bonus opportunities\n\nClick here to get started: [Referral Link]\n\nLet me know if you have any questions!\n\nBest regards,\n[Your Name]"
  });

  // Simple toast fallback since UI toast component is missing
  const toast = ({ title, description }: { title: string, description: string }) => {
    alert(`${title}\n${description}`);
  };

  const [, setLocation] = useLocation();

  const timeframeOptions = [
    { value: "7d", label: "Last 7 Days" },
    { value: "30d", label: "Last 30 Days" },
    { value: "90d", label: "Last 90 Days" },
    { value: "1y", label: "Last Year" }
  ];

  const tierOptions = [
    { value: "all", label: "All Tiers" },
    { value: "bronze", label: "Bronze" },
    { value: "silver", label: "Silver" },
    { value: "gold", label: "Gold" },
    { value: "platinum", label: "Platinum" }
  ];

  const sortOptions = [
    { value: "earnings", label: "Earnings (High to Low)" },
    { value: "referrals", label: "Referrals (High to Low)" },
    { value: "conversion", label: "Conversion Rate" },
    { value: "joined", label: "Recently Joined" }
  ];

  // State for referrer stats
  const [referrerStats, setReferrerStats] = useState({
    totalReferrers: 0,
    activeReferrers: 0,
    topPerformers: 45, // Keep mock for now
    averageEarnings: 0,
    totalEarnings: 0
  });

  // Fetch stats from backend
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch("http://localhost:8000/api/v1/dashboard/stats");
        if (response.ok) {
          const data = await response.json();
          setReferrerStats(prev => ({
            ...prev,
            totalReferrers: data.totalReferrers,
            activeReferrers: data.totalReferrers, // Per user request: active = registered referrers
            totalEarnings: data.totalRevenue,
            averageEarnings: data.totalReferrers > 0 ? (data.totalRevenue / data.totalReferrers) : 0
          }));
        }
      } catch (error) {
        console.error("Error fetching referrer stats:", error);
      }
    };
    fetchStats();
  }, []);

  const referrers = [
    {
      id: 1,
      name: "Sarah Johnson",
      email: "sarah.j@email.com",
      phone: "+1 (555) 123-4567",
      avatar: "/api/placeholder/40/40",
      tier: "gold",
      status: "active",
      joinDate: "2024-01-15",
      totalEarnings: 2450.75,
      totalReferrals: 28,
      successfulReferrals: 24,
      conversionRate: 85.7,
      lastActivity: "2 hours ago",
      location: "San Francisco, CA",
      preferredMethod: "PayPal",
      socialMedia: {
        twitter: "@sarahj_marketing",
        instagram: "@sarahj_lifestyle"
      }
    },
    {
      id: 2,
      name: "Mike Chen",
      email: "mike.chen@email.com",
      phone: "+1 (555) 234-5678",
      avatar: "/api/placeholder/40/40",
      tier: "platinum",
      status: "active",
      joinDate: "2023-11-20",
      totalEarnings: 4225.50,
      totalReferrals: 45,
      successfulReferrals: 38,
      conversionRate: 84.4,
      lastActivity: "1 day ago",
      location: "New York, NY",
      preferredMethod: "Stripe",
      socialMedia: {
        twitter: "@mikechen_tech",
        linkedin: "mike-chen-marketing"
      }
    },
    {
      id: 3,
      name: "Emma Wilson",
      email: "emma.w@email.com",
      phone: "+1 (555) 345-6789",
      avatar: "/api/placeholder/40/40",
      tier: "silver",
      status: "active",
      joinDate: "2024-02-10",
      totalEarnings: 1890.25,
      totalReferrals: 22,
      successfulReferrals: 19,
      conversionRate: 86.4,
      lastActivity: "3 hours ago",
      location: "Los Angeles, CA",
      preferredMethod: "PayPal",
      socialMedia: {
        instagram: "@emmaw_beauty",
        tiktok: "@emmaw_lifestyle"
      }
    },
    {
      id: 4,
      name: "David Lee",
      email: "david.lee@email.com",
      phone: "+1 (555) 456-7890",
      avatar: "/api/placeholder/40/40",
      tier: "bronze",
      status: "inactive",
      joinDate: "2024-03-05",
      totalEarnings: 650.00,
      totalReferrals: 8,
      successfulReferrals: 6,
      conversionRate: 75.0,
      lastActivity: "1 week ago",
      location: "Chicago, IL",
      preferredMethod: "Bank Transfer",
      socialMedia: {
        twitter: "@davidlee_deals"
      }
    },
    {
      id: 5,
      name: "Lisa Rodriguez",
      email: "lisa.r@email.com",
      phone: "+1 (555) 567-8901",
      avatar: "/api/placeholder/40/40",
      tier: "gold",
      status: "active",
      joinDate: "2024-01-28",
      totalEarnings: 3125.80,
      totalReferrals: 35,
      successfulReferrals: 30,
      conversionRate: 85.7,
      lastActivity: "5 hours ago",
      location: "Miami, FL",
      preferredMethod: "PayPal",
      socialMedia: {
        instagram: "@lisar_wellness",
        youtube: "Lisa Rodriguez Wellness"
      }
    }
  ];

  const getTierColor = (tier: string) => {
    switch (tier) {
      case "platinum":
        return "bg-slate-100 text-slate-800";
      case "gold":
        return "bg-yellow-100 text-yellow-800";
      case "silver":
        return "bg-gray-100 text-gray-800";
      case "bronze":
        return "bg-orange-100 text-orange-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-100 text-green-800";
      case "inactive":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const filteredReferrers = referrers.filter(referrer => {
    const matchesTier = selectedTier === "all" || referrer.tier === selectedTier;
    const matchesSearch = referrer.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      referrer.email.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesTier && matchesSearch;
  });

  const handleViewDetails = (referrer: any) => {
    setLocation(`/referrals/referrer/${referrer.id}`);
  };

  const handleContact = (referrer: any) => {
    setSelectedReferrer(referrer);
    setContactMessage("");
    setContactMethod("");
    setShowContactModal(true);
  };

  const handleSendMessage = () => {
    console.log(`Sending message via ${contactMethod} to ${selectedReferrer?.name}: ${contactMessage}`);
    setShowContactModal(false);
    setContactMessage("");
    setContactMethod("");
    setSelectedReferrer(null);
  };

  const handleSendInvite = () => {
    if (!inviteForm.name || (!inviteForm.email && !inviteForm.phone)) return;

    const channelText = inviteForm.channel === "email" ? "email" :
      inviteForm.channel === "whatsapp" ? "WhatsApp" :
        inviteForm.channel === "sms" ? "SMS" : "social media";

    console.log(`Sending referrer invitation via ${channelText}:`, inviteForm);

    // Show success message
    toast({
      title: "Invitation Sent!",
      description: `Referrer invitation sent to ${inviteForm.name} via ${channelText}`,
    });

    setInviteForm({
      name: "",
      email: "",
      phone: "",
      channel: "email",
      message: "Hi [Name],\n\nI'd love to invite you to join our referral program! You can earn great rewards by referring your friends and family to our products.\n\nWith our program, you'll get:\n• Commission on every successful referral\n• Exclusive marketing materials\n• Real-time tracking of your earnings\n• Monthly bonus opportunities\n\nClick here to get started: [Referral Link]\n\nLet me know if you have any questions!\n\nBest regards,\n[Your Name]"
    });
    setShowInviteModal(false);
  };

  const handleTierSave = (tierName: string) => {
    toast({
      title: "Tier Updated!",
      description: `${tierName} tier configuration has been saved successfully.`,
    });
  };

  const handleUpdateRules = () => {
    toast({
      title: "Rules Updated!",
      description: "Tier promotion rules have been updated successfully.",
    });
  };

  const handleDownloadPDF = (fileName: string) => {
    // Create a dummy PDF blob for demonstration
    const pdfContent = `%PDF-1.4
1 0 obj
<< /Type /Catalog /Pages 2 0 R >>
endobj
2 0 obj
<< /Type /Pages /Kids [3 0 R] /Count 1 >>
endobj
3 0 obj
<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Contents 4 0 R >>
endobj
4 0 obj
<< /Length 44 >>
stream
BT
/F1 12 Tf
72 720 Td
(${fileName}) Tj
ET
endstream
endobj
xref
0 5
0000000000 65535 f 
0000000010 00000 n 
0000000053 00000 n 
0000000110 00000 n 
0000000205 00000 n 
trailer
<< /Size 5 /Root 1 0 R >>
startxref
299
%%EOF`;

    const blob = new Blob([pdfContent], { type: 'application/pdf' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `${fileName}.pdf`;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    URL.revokeObjectURL(url);
  };

  const getSocialIcon = (platform: string) => {
    switch (platform.toLowerCase()) {
      case 'facebook': return <FaFacebook className="w-4 h-4" />;
      case 'twitter': return <FaTwitter className="w-4 h-4" />;
      case 'instagram': return <FaInstagram className="w-4 h-4" />;
      case 'linkedin': return <FaLinkedin className="w-4 h-4" />;
      default: return <Share className="w-4 h-4" />;
    }
  };

  const getContactMethodIcon = (method: string) => {
    switch (method) {
      case 'email': return <Mail className="w-4 h-4" />;
      case 'sms': return <Phone className="w-4 h-4" />;
      case 'whatsapp': return <Phone className="w-4 h-4" />;
      case 'facebook': return <FaFacebook className="w-4 h-4" />;
      case 'twitter': return <FaTwitter className="w-4 h-4" />;
      case 'instagram': return <FaInstagram className="w-4 h-4" />;
      case 'linkedin': return <FaLinkedin className="w-4 h-4" />;
      default: return <Mail className="w-4 h-4" />;
    }
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">Referrers</h2>
              <p className="text-sm text-gray-600 mt-1">Manage your referral partners and track their performance</p>
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
              <Button className="bg-black text-white hover:bg-gray-800" onClick={() => setShowInviteModal(true)}>
                <Plus className="h-4 w-4 mr-2" />
                Invite Referrer
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="overview" className="space-y-6">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="referrers">All Referrers</TabsTrigger>
              <TabsTrigger value="tiers">Tier Management</TabsTrigger>
              <TabsTrigger value="recruitment">Recruitment</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Referrers</CardTitle>
                    <Users className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{referrerStats.totalReferrers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      +8.2% from last month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Active Referrers</CardTitle>
                    <Activity className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{referrerStats.activeReferrers.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      {((referrerStats.activeReferrers / referrerStats.totalReferrers) * 100).toFixed(1)}% of total
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Top Performers</CardTitle>
                    <Award className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{referrerStats.topPerformers}</div>
                    <p className="text-xs text-muted-foreground">
                      Gold & Platinum tiers
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Average Earnings</CardTitle>
                    <DollarSign className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${referrerStats.averageEarnings}</div>
                    <p className="text-xs text-muted-foreground">
                      Per referrer this month
                    </p>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">Total Earnings</CardTitle>
                    <Target className="h-4 w-4 text-muted-foreground" />
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">${referrerStats.totalEarnings.toLocaleString()}</div>
                    <p className="text-xs text-muted-foreground">
                      <TrendingUp className="inline w-3 h-3 mr-1" />
                      +15.8% from last month
                    </p>
                  </CardContent>
                </Card>
              </div>

              {/* Top Referrers */}
              <Card>
                <CardHeader>
                  <CardTitle>Top Referrers</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {referrers.slice(0, 5).map((referrer, index) => (
                      <div
                        key={referrer.id}
                        className="flex items-center justify-between p-4 border rounded-lg cursor-pointer hover:bg-gray-50 transition-colors"
                        onClick={() => handleViewDetails(referrer)}
                      >
                        <div className="flex items-center space-x-4">
                          <div className="flex items-center space-x-2">
                            <span className="text-sm font-medium text-gray-500">#{index + 1}</span>
                            <Avatar>
                              <AvatarImage src={referrer.avatar} />
                              <AvatarFallback>{referrer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                            </Avatar>
                          </div>
                          <div>
                            <p className="font-medium">{referrer.name}</p>
                            <p className="text-sm text-gray-600">{referrer.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-4">
                          <div className="text-right">
                            <p className="font-medium">${referrer.totalEarnings}</p>
                            <p className="text-sm text-gray-600">{referrer.totalReferrals} referrals</p>
                          </div>
                          <Badge className={getTierColor(referrer.tier)}>
                            <Star className="w-3 h-3 mr-1" />
                            {referrer.tier}
                          </Badge>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="referrers" className="space-y-6">
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
                <Select value={selectedTier} onValueChange={setSelectedTier}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Filter by tier" />
                  </SelectTrigger>
                  <SelectContent>
                    {tierOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                <Select value={sortBy} onValueChange={setSortBy}>
                  <SelectTrigger className="w-48">
                    <SelectValue placeholder="Sort by" />
                  </SelectTrigger>
                  <SelectContent>
                    {sortOptions.map((option) => (
                      <SelectItem key={option.value} value={option.value}>
                        {option.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Referrers Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredReferrers.map((referrer) => (
                  <Card key={referrer.id}>
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Avatar>
                            <AvatarImage src={referrer.avatar} />
                            <AvatarFallback>{referrer.name.split(' ').map(n => n[0]).join('')}</AvatarFallback>
                          </Avatar>
                          <div>
                            <h3 className="font-medium">{referrer.name}</h3>
                            <p className="text-sm text-gray-600">{referrer.email}</p>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Badge className={getTierColor(referrer.tier)}>
                            <Star className="w-3 h-3 mr-1" />
                            {referrer.tier}
                          </Badge>
                          <Badge className={getStatusColor(referrer.status)}>
                            {referrer.status === 'active' ? <CheckCircle className="w-3 h-3 mr-1" /> : <XCircle className="w-3 h-3 mr-1" />}
                            {referrer.status}
                          </Badge>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <p className="text-sm text-gray-600">Total Earnings</p>
                          <p className="text-lg font-semibold">${referrer.totalEarnings}</p>
                        </div>
                        <div>
                          <p className="text-sm text-gray-600">Referrals</p>
                          <p className="text-lg font-semibold">{referrer.totalReferrals}</p>
                        </div>
                      </div>
                      <div>
                        <div className="flex justify-between text-sm mb-1">
                          <span>Conversion Rate</span>
                          <span>{referrer.conversionRate}%</span>
                        </div>
                        <Progress value={referrer.conversionRate} className="h-2" />
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <div className="flex items-center">
                          <MapPin className="w-4 h-4 mr-1" />
                          {referrer.location}
                        </div>
                        <div className="flex items-center">
                          <Clock className="w-4 h-4 mr-1" />
                          {referrer.lastActivity}
                        </div>
                      </div>
                      <div className="flex justify-between">
                        <Button variant="outline" size="sm" onClick={() => handleViewDetails(referrer)}>
                          <Eye className="w-4 h-4 mr-2" />
                          View Details
                        </Button>
                        <Button variant="outline" size="sm" onClick={() => handleContact(referrer)}>
                          <Mail className="w-4 h-4 mr-2" />
                          Contact
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="tiers" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {['Bronze', 'Silver', 'Gold', 'Platinum'].map((tier) => (
                  <Card key={tier}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{tier} Tier</CardTitle>
                        <Badge className={getTierColor(tier.toLowerCase())}>
                          <Star className="w-3 h-3 mr-1" />
                          {tier}
                        </Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Commission Rate (%)</Label>
                        <Input
                          type="number"
                          defaultValue={tier === 'Bronze' ? '5' : tier === 'Silver' ? '7' : tier === 'Gold' ? '10' : '12'}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Minimum Referrals</Label>
                        <Input
                          type="number"
                          defaultValue={tier === 'Bronze' ? '0' : tier === 'Silver' ? '10' : tier === 'Gold' ? '25' : '50'}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Minimum Revenue ($)</Label>
                        <Input
                          type="number"
                          defaultValue={tier === 'Bronze' ? '0' : tier === 'Silver' ? '1000' : tier === 'Gold' ? '5000' : '15000'}
                          className="w-full"
                        />
                      </div>

                      <div className="space-y-2">
                        <Label>Special Benefits</Label>
                        <Textarea
                          defaultValue={tier === 'Bronze' ? 'Basic support, monthly newsletter' : tier === 'Silver' ? 'Priority support, marketing templates' : tier === 'Gold' ? 'Dedicated support, custom materials, monthly 1:1' : 'Personal account manager, premium materials, weekly calls'}
                          rows={3}
                          className="w-full"
                        />
                      </div>

                      <Button className="w-full" variant="outline" onClick={() => handleTierSave(tier)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Save Changes
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>

              <Card>
                <CardHeader>
                  <CardTitle>Tier Promotion Rules</CardTitle>
                  <p className="text-sm text-gray-600">Configure automatic tier promotion settings</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Auto-Promotion</Label>
                      <Select defaultValue="enabled">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="enabled">Enabled</SelectItem>
                          <SelectItem value="disabled">Disabled</SelectItem>
                          <SelectItem value="manual">Manual Only</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div className="space-y-2">
                      <Label>Evaluation Period</Label>
                      <Select defaultValue="monthly">
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="flex justify-end">
                    <Button onClick={handleUpdateRules}>
                      <Award className="w-4 h-4 mr-2" />
                      Update Rules
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="recruitment" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Referrer Recruitment</CardTitle>
                  <p className="text-sm text-gray-600">Tools and strategies for recruiting new referrers</p>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-4">
                      <h4 className="font-medium">Recruitment Channels</h4>
                      <div className="space-y-2">
                        <div className="flex items-center justify-between p-3 border rounded">
                          <span>Social Media</span>
                          <Badge>45 signups</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <span>Email Campaigns</span>
                          <Badge>32 signups</Badge>
                        </div>
                        <div className="flex items-center justify-between p-3 border rounded">
                          <span>Direct Outreach</span>
                          <Badge>18 signups</Badge>
                        </div>
                      </div>
                    </div>
                    <div className="space-y-4">
                      <h4 className="font-medium">Recruitment Materials</h4>
                      <div className="space-y-2">
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleDownloadPDF("Referral Program Overview")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Program Overview PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleDownloadPDF("Referral Commission Structure")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Commission Structure PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleDownloadPDF("Social Media Marketing Kit")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Social Media Kit PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleDownloadPDF("Referrer Onboarding Guide")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Onboarding Guide PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleDownloadPDF("Best Practices Manual")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Best Practices PDF
                        </Button>
                        <Button
                          variant="outline"
                          className="w-full justify-start"
                          onClick={() => handleDownloadPDF("Landing Page Templates")}
                        >
                          <Download className="w-4 h-4 mr-2" />
                          Landing Page Templates PDF
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>



      {/* Enhanced Contact Modal */}
      <Dialog open={showContactModal} onOpenChange={setShowContactModal}>
        <DialogContent className="max-w-lg">
          <DialogHeader>
            <DialogTitle>Contact {selectedReferrer?.name}</DialogTitle>
          </DialogHeader>
          {selectedReferrer && (
            <div className="space-y-4">
              <div className="space-y-2">
                <Label>Select Communication Method</Label>
                <Select value={contactMethod} onValueChange={setContactMethod}>
                  <SelectTrigger>
                    <SelectValue placeholder="Choose how to send your message" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email - {selectedReferrer.email}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>SMS - {selectedReferrer.phone}</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="whatsapp">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>WhatsApp - {selectedReferrer.phone}</span>
                      </div>
                    </SelectItem>
                    {selectedReferrer.socialMedia && Object.entries(selectedReferrer.socialMedia).map(([platform, handle]) => (
                      <SelectItem key={platform} value={platform}>
                        <div className="flex items-center space-x-2">
                          {getSocialIcon(platform)}
                          <span>{platform.charAt(0).toUpperCase() + platform.slice(1)} - {String(handle)}</span>
                        </div>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Message</Label>
                <Textarea
                  id="message"
                  placeholder="Type your message here..."
                  value={contactMessage}
                  onChange={(e) => setContactMessage(e.target.value)}
                  rows={4}
                />
              </div>

              {contactMethod && (
                <div className="p-3 bg-blue-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-blue-800">
                    {getContactMethodIcon(contactMethod)}
                    <span className="text-sm font-medium">
                      Message will be sent via {contactMethod.charAt(0).toUpperCase() + contactMethod.slice(1)}
                    </span>
                  </div>
                </div>
              )}

              <div className="flex justify-end space-x-3">
                <Button variant="outline" onClick={() => setShowContactModal(false)}>
                  Cancel
                </Button>
                <Button onClick={handleSendMessage} disabled={!contactMessage.trim() || !contactMethod}>
                  <Mail className="w-4 h-4 mr-2" />
                  Send Message
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      {/* Invite Referrer Modal */}
      <Dialog open={showInviteModal} onOpenChange={setShowInviteModal}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>Invite New Referrer</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="inviteName">Full Name</Label>
                <Input
                  id="inviteName"
                  placeholder="Enter referrer's full name"
                  value={inviteForm.name}
                  onChange={(e) => setInviteForm({ ...inviteForm, name: e.target.value })}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="inviteChannel">Invitation Channel</Label>
                <Select value={inviteForm.channel} onValueChange={(value) => setInviteForm({ ...inviteForm, channel: value })}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="email">
                      <div className="flex items-center space-x-2">
                        <Mail className="w-4 h-4" />
                        <span>Email</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="whatsapp">
                      <div className="flex items-center space-x-2">
                        <MessageCircle className="w-4 h-4" />
                        <span>WhatsApp</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="sms">
                      <div className="flex items-center space-x-2">
                        <Phone className="w-4 h-4" />
                        <span>SMS</span>
                      </div>
                    </SelectItem>
                    <SelectItem value="social">
                      <div className="flex items-center space-x-2">
                        <Share className="w-4 h-4" />
                        <span>Social Media</span>
                      </div>
                    </SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {(inviteForm.channel === "email" || inviteForm.channel === "social") && (
                <div className="space-y-2">
                  <Label htmlFor="inviteEmail">Email Address</Label>
                  <Input
                    id="inviteEmail"
                    type="email"
                    placeholder="Enter referrer's email"
                    value={inviteForm.email}
                    onChange={(e) => setInviteForm({ ...inviteForm, email: e.target.value })}
                  />
                </div>
              )}

              {(inviteForm.channel === "whatsapp" || inviteForm.channel === "sms") && (
                <div className="space-y-2">
                  <Label htmlFor="invitePhone">Phone Number</Label>
                  <Input
                    id="invitePhone"
                    type="tel"
                    placeholder="Enter referrer's phone number"
                    value={inviteForm.phone}
                    onChange={(e) => setInviteForm({ ...inviteForm, phone: e.target.value })}
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label htmlFor="inviteMessage">Invitation Message</Label>
              <Textarea
                id="inviteMessage"
                value={inviteForm.message}
                onChange={(e) => setInviteForm({ ...inviteForm, message: e.target.value })}
                rows={6}
                className="text-sm"
              />
              <p className="text-xs text-gray-500">
                Use [Name] and [Referral Link] placeholders which will be automatically replaced
              </p>
            </div>

            {inviteForm.name && ((inviteForm.email && (inviteForm.channel === "email" || inviteForm.channel === "social")) ||
              (inviteForm.phone && (inviteForm.channel === "whatsapp" || inviteForm.channel === "sms"))) && (
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="flex items-center space-x-2 text-green-800">
                    <Plus className="w-4 h-4" />
                    <span className="text-sm font-medium">
                      Invitation will be sent to {inviteForm.name} via {
                        inviteForm.channel === "email" ? `email (${inviteForm.email})` :
                          inviteForm.channel === "whatsapp" ? `WhatsApp (${inviteForm.phone})` :
                            inviteForm.channel === "sms" ? `SMS (${inviteForm.phone})` :
                              `social media (${inviteForm.email})`
                      }
                    </span>
                  </div>
                </div>
              )}

            <div className="flex justify-end space-x-3">
              <Button variant="outline" onClick={() => setShowInviteModal(false)}>
                Cancel
              </Button>
              <Button
                onClick={handleSendInvite}
                disabled={!inviteForm.name || (!inviteForm.email && !inviteForm.phone)}
              >
                {inviteForm.channel === "email" && <Mail className="w-4 h-4 mr-2" />}
                {inviteForm.channel === "whatsapp" && <MessageCircle className="w-4 h-4 mr-2" />}
                {inviteForm.channel === "sms" && <Phone className="w-4 h-4 mr-2" />}
                {inviteForm.channel === "social" && <Share className="w-4 h-4 mr-2" />}
                Send Invitation
              </Button>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}