import { useState, useEffect } from "react";
import {
  Settings,
  ArrowLeft,
  Plus,
  Edit,
  Trash2,
  Users,
  TrendingUp,
  DollarSign,
  Target,
  AlertCircle,
  CheckCircle,
  Info,
  Gift,
  Zap,
  Clock,
  RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Badge } from "@src/components/ui/badge";
import { Switch } from "@src/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Alert, AlertDescription } from "@src/components/ui/alert";

export default function ReferralProgram() {
  const [activeTab, setActiveTab] = useState("overview");
  const [showCreateForm, setShowCreateForm] = useState(false);
  const [editingProgram, setEditingProgram] = useState<any>(null);
  const [programs, setPrograms] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  const [formData, setFormData] = useState({
    programName: "",
    programType: "standard",
    referrerRewardType: "percentage",
    referrerRewardValue: "",
    refereeRewardType: "percentage",
    refereeRewardValue: "",
    minimumPurchase: "",
    expirationDays: "30",
    cookieExpirationDays: "30",
    allowSelfReferral: false,
    requireApproval: false,
    fraudDetection: true,
    trackingMethods: ["email", "url", "code"],
    rewardTrigger: "order_placed",
    gracePeriodDays: "30"
  });

  const fetchPrograms = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:8000/api/v1/programs/");
      if (res.ok) {
        const data = await res.json();
        // Map API data to UI format
        const mapped = data.map((p: any) => ({
          id: p.id,
          name: p.name,
          type: p.program_type,
          isActive: p.is_active,
          referrerReward: p.referrer_reward_type === 'percentage' ? `${p.referrer_reward_value}%` : `$${p.referrer_reward_value}`,
          refereeReward: p.referee_reward_type === 'percentage' ? `${p.referee_reward_value}%` : `$${p.referee_reward_value}`,
          // Keep mock stats for now as API doesn't return them per-program yet
          referrals: p.referrals || 0,
          conversions: p.conversions || 0, // Not yet calc in backend list_programs, need update there too? 
          // Wait, I didn't update list_programs to return conversions/revenue yet. 
          // I only enriched with 'referrals' count in step 67 viewing.
          // I need to update programs.py first to return these.
          // For now, let's just map what IS there or 0.
          revenue: p.revenue || 0,
          conversionRate: p.conversion_rate || 0,
          created: new Date(p.created_at).toLocaleDateString(),
          raw: p // Keep raw data for editing
        }));
        setPrograms(mapped);
      }
    } catch (err) {
      console.error("Failed to fetch programs", err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPrograms();
  }, []);

  // Use the fetched programs instead of hardcoded
  const existingPrograms = programs;

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const payload = {
      name: formData.programName,
      program_type: formData.programType,
      referrer_reward_type: formData.referrerRewardType,
      referrer_reward_value: formData.referrerRewardValue,
      referee_reward_type: formData.refereeRewardType,
      referee_reward_value: formData.refereeRewardValue,
      minimum_purchase: parseFloat(formData.minimumPurchase) || 0,
      expiration_days: parseInt(formData.expirationDays) || 30,
      tracking_methods: formData.trackingMethods,
      reward_trigger: formData.rewardTrigger,
      // Default is_active to false for new, or keep existing for edit?
      // Let's add an active switch to the form later. For now, default false or preserve?
      is_active: editingProgram ? editingProgram.raw.is_active : false
    };

    try {
      let res;
      if (editingProgram) {
        res = await fetch(`http://localhost:8000/api/v1/programs/${editingProgram.id}`, {
          method: "PATCH",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      } else {
        res = await fetch("http://localhost:8000/api/v1/programs/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });
      }

      if (res.ok) {
        setShowCreateForm(false);
        setEditingProgram(null);
        fetchPrograms(); // Refresh list
      } else {
        const err = await res.json();
        alert(`Error: ${err.detail || "Failed to save"}`);
      }
    } catch (error) {
      console.error("Error saving program:", error);
      alert("Failed to connect to server");
    }
  };

  const handleEditProgram = (program: any) => {
    setEditingProgram(program);
    // Use raw data from API to populate form
    const raw = program.raw;
    setFormData({
      programName: raw.name,
      programType: raw.program_type,
      referrerRewardType: raw.referrer_reward_type,
      referrerRewardValue: raw.referrer_reward_value,
      refereeRewardType: raw.referee_reward_type,
      refereeRewardValue: raw.referee_reward_value,
      minimumPurchase: raw.minimum_purchase.toString(),
      expirationDays: raw.expiration_days.toString(),
      cookieExpirationDays: "30", // Not in DB yet
      allowSelfReferral: false,
      requireApproval: false,
      fraudDetection: true,
      trackingMethods: raw.tracking_methods || ["email", "url", "code"],
      rewardTrigger: raw.reward_trigger,
      gracePeriodDays: "30"
    });
    setShowCreateForm(true);
  };

  const handleUseTemplate = (templateType: string) => {
    const templates = {
      standard: {
        programName: "Standard Referral Program",
        programType: "standard",
        referrerRewardType: "percentage",
        referrerRewardValue: "10",
        refereeRewardType: "percentage",
        refereeRewardValue: "5",
        minimumPurchase: "50",
        rewardTrigger: "order_placed",
        gracePeriodDays: "30"
      },
      tiered: {
        programName: "Tiered Referral Program",
        programType: "tiered",
        referrerRewardType: "percentage",
        referrerRewardValue: "15",
        refereeRewardType: "percentage",
        refereeRewardValue: "10",
        minimumPurchase: "100",
        rewardTrigger: "order_fulfilled",
        gracePeriodDays: "14"
      },
      milestone: {
        programName: "Milestone Referral Program",
        programType: "milestone",
        referrerRewardType: "fixed_amount",
        referrerRewardValue: "25",
        refereeRewardType: "percentage",
        refereeRewardValue: "15",
        minimumPurchase: "75",
        rewardTrigger: "order_fulfilled",
        gracePeriodDays: "21"
      }
    };

    const template = templates[templateType as keyof typeof templates];
    if (template) {
      setFormData({
        ...formData,
        ...template,
        expirationDays: "30",
        cookieExpirationDays: "30",
        allowSelfReferral: false,
        requireApproval: false,
        fraudDetection: true,
        trackingMethods: ["email", "url", "code"]
      });
      setShowCreateForm(true);
    }
  };

  const handleActivateProgram = async (programId: number) => {
    try {
      const res = await fetch(`http://localhost:8000/api/v1/programs/${programId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ is_active: true })
      });
      if (res.ok) {
        fetchPrograms();
      }
    } catch (error) {
      console.error("Error activating program:", error);
    }
  };

  const handleDeleteProgram = async (programId: number) => {
    if (confirm("Are you sure you want to delete this program? This action cannot be undone.")) {
      try {
        const res = await fetch(`http://localhost:8000/api/v1/programs/${programId}`, {
          method: "DELETE",
        });
        if (res.ok) {
          fetchPrograms();
        } else {
          alert("Failed to delete program");
        }
      } catch (error) {
        console.error("Error deleting program:", error);
      }
    }
  };

  const programTypeOptions = [
    { value: "standard", label: "Standard Program", description: "Simple referral program with fixed rewards" },
    { value: "tiered", label: "Tiered Program", description: "Rewards increase based on referral performance" },
    { value: "milestone", label: "Milestone Program", description: "Rewards based on specific targets or milestones" }
  ];

  const rewardTypeOptions = [
    { value: "percentage", label: "Percentage", description: "Percentage of order value" },
    { value: "fixed_amount", label: "Fixed Amount", description: "Fixed dollar amount" },
    { value: "points", label: "Points", description: "Loyalty points" },
    { value: "free_shipping", label: "Free Shipping", description: "Free shipping on orders" },
    { value: "product_discount", label: "Product Discount", description: "Discount on specific products" },
    { value: "store_credit", label: "Store Credit", description: "Credit towards future purchases" }
  ];

  if (showCreateForm) {
    return (
      <div className="min-h-screen flex bg-gray-50">
        <main className="flex-1 flex flex-col">
          {/* Header */}
          <header className="bg-white border-b border-gray-200 px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <Button
                  variant="ghost"
                  onClick={() => setShowCreateForm(false)}
                  className="mr-4"
                >
                  <ArrowLeft className="h-4 w-4" />
                </Button>
                <div>
                  <h2 className="text-xl font-semibold text-black">
                    {editingProgram ? "Edit Referral Program" : "Create Referral Program"}
                  </h2>
                  <p className="text-sm text-gray-600 mt-1">
                    {editingProgram ? "Update your referral program settings" : "Set up a new referral program to reward your customers"}
                  </p>
                </div>
              </div>
            </div>
          </header>

          {/* Form Content */}
          <div className="flex-1 p-6 w-full">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Basic Information */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Settings className="w-5 h-5 mr-2" />
                    Basic Information
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="programName">Program Name</Label>
                      <Input
                        id="programName"
                        value={formData.programName}
                        onChange={(e) => handleInputChange("programName", e.target.value)}
                        placeholder="e.g., Standard Referral Program"
                        required
                      />
                    </div>
                    <div>
                      <Label htmlFor="programType">Program Type</Label>
                      <Select value={formData.programType} onValueChange={(value) => handleInputChange("programType", value)}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select program type" />
                        </SelectTrigger>
                        <SelectContent>
                          {programTypeOptions.map((option) => (
                            <SelectItem key={option.value} value={option.value}>
                              <div>
                                <div className="font-medium">{option.label}</div>
                                <div className="text-sm text-gray-500">{option.description}</div>
                              </div>
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Tip:</strong> Start with a Standard Program if you're new to referrals. You can always upgrade to Tiered or Milestone programs later.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Reward Configuration */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Gift className="w-5 h-5 mr-2" />
                    Reward Configuration
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Referrer Rewards */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Referrer Rewards</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="referrerRewardType">Reward Type</Label>
                          <Select value={formData.referrerRewardType} onValueChange={(value) => handleInputChange("referrerRewardType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select reward type" />
                            </SelectTrigger>
                            <SelectContent>
                              {rewardTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div>
                                    <div className="font-medium">{option.label}</div>
                                    <div className="text-sm text-gray-500">{option.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="referrerRewardValue">Reward Value</Label>
                          <Input
                            id="referrerRewardValue"
                            value={formData.referrerRewardValue}
                            onChange={(e) => handleInputChange("referrerRewardValue", e.target.value)}
                            placeholder={formData.referrerRewardType === "percentage" ? "e.g., 10" : "e.g., 25"}
                            type="number"
                          />
                        </div>
                      </div>
                    </div>

                    {/* Referee Rewards */}
                    <div className="space-y-4">
                      <h3 className="font-medium text-gray-900">Referee Rewards</h3>
                      <div className="space-y-4">
                        <div>
                          <Label htmlFor="refereeRewardType">Reward Type</Label>
                          <Select value={formData.refereeRewardType} onValueChange={(value) => handleInputChange("refereeRewardType", value)}>
                            <SelectTrigger>
                              <SelectValue placeholder="Select reward type" />
                            </SelectTrigger>
                            <SelectContent>
                              {rewardTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  <div>
                                    <div className="font-medium">{option.label}</div>
                                    <div className="text-sm text-gray-500">{option.description}</div>
                                  </div>
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </div>
                        <div>
                          <Label htmlFor="refereeRewardValue">Reward Value</Label>
                          <Input
                            id="refereeRewardValue"
                            value={formData.refereeRewardValue}
                            onChange={(e) => handleInputChange("refereeRewardValue", e.target.value)}
                            placeholder={formData.refereeRewardType === "percentage" ? "e.g., 5" : "e.g., 15"}
                            type="number"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  <Alert>
                    <Info className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Best Practice:</strong> Referrer rewards should be higher than referee rewards to incentivize sharing. A common ratio is 2:1 (e.g., 10% referrer, 5% referee).
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Reward Trigger/Timing */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Clock className="w-5 h-5 mr-2" />
                    Reward Trigger / Timing
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="rewardTrigger">When should rewards be issued?</Label>
                      <Select value={formData.rewardTrigger} onValueChange={(value) => handleInputChange("rewardTrigger", value)}>
                        <SelectTrigger className="mt-2">
                          <SelectValue placeholder="Select reward trigger" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="order_placed">
                            <div>
                              <div className="font-medium">Upon Order Placed</div>
                              <div className="text-sm text-gray-500">Rewards issued immediately when order is placed</div>
                            </div>
                          </SelectItem>
                          <SelectItem value="order_fulfilled">
                            <div>
                              <div className="font-medium">Upon Order Fulfilled / Delivered</div>
                              <div className="text-sm text-gray-500">Rewards issued only after order is successfully delivered</div>
                            </div>
                          </SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="gracePeriodDays">Grace Period for Refunds/Cancellations (Days)</Label>
                      <Input
                        id="gracePeriodDays"
                        value={formData.gracePeriodDays}
                        onChange={(e) => handleInputChange("gracePeriodDays", e.target.value)}
                        placeholder="e.g., 30"
                        type="number"
                        min="0"
                        className="mt-2"
                      />
                      <p className="text-sm text-gray-500 mt-2">
                        If an order is refunded or cancelled within this period, the reward will be revoked or not issued.
                        This applies to both trigger options above.
                      </p>
                    </div>
                  </div>

                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Recommendation:</strong> For higher-value products, consider using "Upon Order Fulfilled"
                      with a 30-day grace period to reduce fraud and ensure customer satisfaction.
                    </AlertDescription>
                  </Alert>
                </CardContent>
              </Card>

              {/* Program Settings */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    Program Settings
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                      <Label htmlFor="minimumPurchase">Minimum Purchase Amount ($)</Label>
                      <Input
                        id="minimumPurchase"
                        value={formData.minimumPurchase}
                        onChange={(e) => handleInputChange("minimumPurchase", e.target.value)}
                        placeholder="e.g., 50"
                        type="number"
                      />
                    </div>
                    <div>
                      <Label htmlFor="expirationDays">Referral Expiration (Days)</Label>
                      <Input
                        id="expirationDays"
                        value={formData.expirationDays}
                        onChange={(e) => handleInputChange("expirationDays", e.target.value)}
                        placeholder="e.g., 30"
                        type="number"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="allowSelfReferral">Allow Self-Referral</Label>
                        <p className="text-sm text-gray-500">Allow users to refer themselves</p>
                      </div>
                      <Switch
                        id="allowSelfReferral"
                        checked={formData.allowSelfReferral}
                        onCheckedChange={(checked) => handleInputChange("allowSelfReferral", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="requireApproval">Require Manual Approval</Label>
                        <p className="text-sm text-gray-500">All referrals must be manually approved</p>
                      </div>
                      <Switch
                        id="requireApproval"
                        checked={formData.requireApproval}
                        onCheckedChange={(checked) => handleInputChange("requireApproval", checked)}
                      />
                    </div>
                    <div className="flex items-center justify-between">
                      <div>
                        <Label htmlFor="fraudDetection">Fraud Detection</Label>
                        <p className="text-sm text-gray-500">Enable automatic fraud detection</p>
                      </div>
                      <Switch
                        id="fraudDetection"
                        checked={formData.fraudDetection}
                        onCheckedChange={(checked) => handleInputChange("fraudDetection", checked)}
                      />
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Form Actions */}
              <div className="flex justify-end space-x-4">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setShowCreateForm(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-blue-600 hover:bg-blue-700">
                  {editingProgram ? "Update Program" : "Create Program"}
                </Button>
              </div>
            </form>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">Program Setup</h2>
              <p className="text-sm text-gray-600 mt-1">Create and manage your referral programs</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Refresh
              </Button>
              <Button
                onClick={() => setShowCreateForm(true)}
                className="bg-black text-white hover:bg-gray-800"
              >
                <Plus className="w-4 h-4 mr-2" />
                Create Program
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="overview">Programs Overview</TabsTrigger>
              <TabsTrigger value="templates">Program Templates</TabsTrigger>
              <TabsTrigger value="recommendations">Recommendations</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="space-y-6">
              <div className="grid grid-cols-1 gap-6">
                {existingPrograms.map((program) => (
                  <Card key={program.id} className="overflow-hidden">
                    <CardHeader className="pb-3">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-10 h-10 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Target className="w-5 h-5 text-blue-600" />
                          </div>
                          <div>
                            <CardTitle className="text-lg">{program.name}</CardTitle>
                            <div className="flex items-center space-x-2 mt-1">
                              <Badge variant="outline" className="text-xs">
                                {program.type}
                              </Badge>
                              <Badge className={program.isActive ? "bg-green-100 text-green-800" : "bg-gray-100 text-gray-800"}>
                                {program.isActive ? "Active" : "Inactive"}
                              </Badge>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleEditProgram(program)}
                          >
                            <Edit className="w-4 h-4 mr-2" />
                            Edit
                          </Button>
                          {!program.isActive && (
                            <Button
                              variant="default"
                              size="sm"
                              className="bg-green-600 hover:bg-green-700 text-white"
                              onClick={() => handleActivateProgram(program.id)}
                            >
                              <CheckCircle className="w-4 h-4 mr-2" />
                              Enable
                            </Button>
                          )}
                          <Button
                            variant="outline"
                            size="sm"
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200"
                            onClick={() => handleDeleteProgram(program.id)}
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </div>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                        <div className="text-center p-3 bg-blue-50 rounded-lg">
                          <Users className="w-5 h-5 text-blue-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-blue-900">{program.referrals}</p>
                          <p className="text-xs text-blue-600">Total Referrals</p>
                        </div>
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <TrendingUp className="w-5 h-5 text-green-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-green-900">{program.conversions}</p>
                          <p className="text-xs text-green-600">Conversions</p>
                        </div>
                        <div className="text-center p-3 bg-purple-50 rounded-lg">
                          <DollarSign className="w-5 h-5 text-purple-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-purple-900">${program.revenue.toLocaleString()}</p>
                          <p className="text-xs text-purple-600">Revenue</p>
                        </div>
                        <div className="text-center p-3 bg-orange-50 rounded-lg">
                          <Target className="w-5 h-5 text-orange-600 mx-auto mb-1" />
                          <p className="text-sm font-medium text-orange-900">{program.conversionRate}%</p>
                          <p className="text-xs text-orange-600">Conversion Rate</p>
                        </div>
                      </div>
                      <div className="flex items-center justify-between text-sm text-gray-600">
                        <span>Referrer: {program.referrerReward} | Referee: {program.refereeReward}</span>
                        <span>Created: {program.created}</span>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="templates" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Target className="w-5 h-5 mr-2 text-blue-600" />
                      Standard Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Simple referral program with fixed rewards for both referrer and referee.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Referrer Reward:</span>
                        <span className="font-medium">10% commission</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Referee Reward:</span>
                        <span className="font-medium">5% discount</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min Purchase:</span>
                        <span className="font-medium">$50</span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4"
                      variant="outline"
                      onClick={() => handleUseTemplate("standard")}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <TrendingUp className="w-5 h-5 mr-2 text-green-600" />
                      Tiered Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Increasing rewards based on referral performance and volume.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Bronze (1-10):</span>
                        <span className="font-medium">5% commission</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Silver (11-25):</span>
                        <span className="font-medium">10% commission</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Gold (26+):</span>
                        <span className="font-medium">15% commission</span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4"
                      variant="outline"
                      onClick={() => handleUseTemplate("tiered")}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>

                <Card className="cursor-pointer hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Gift className="w-5 h-5 mr-2 text-purple-600" />
                      VIP Program
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-gray-600 mb-4">
                      Premium rewards for high-value customers and influencers.
                    </p>
                    <div className="space-y-2 text-sm">
                      <div className="flex justify-between">
                        <span>Referrer Reward:</span>
                        <span className="font-medium">20% commission</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Referee Reward:</span>
                        <span className="font-medium">15% discount</span>
                      </div>
                      <div className="flex justify-between">
                        <span>Min Purchase:</span>
                        <span className="font-medium">$100</span>
                      </div>
                    </div>
                    <Button
                      className="w-full mt-4"
                      variant="outline"
                      onClick={() => handleUseTemplate("milestone")}
                    >
                      Use Template
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>

            <TabsContent value="recommendations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center">
                    <Zap className="w-5 h-5 mr-2" />
                    AI-Powered Recommendations
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <CheckCircle className="h-4 w-4" />
                    <AlertDescription>
                      <strong>Optimize Your Referral Program:</strong> Based on your industry and customer data, we recommend the following improvements.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <div className="p-4 bg-blue-50 border border-blue-200 rounded-lg">
                      <h3 className="font-medium text-blue-900 mb-2">Increase Referrer Rewards</h3>
                      <p className="text-sm text-blue-800 mb-3">
                        Your current 10% referrer reward is below industry average (12-15%). Consider increasing to 12% to boost participation.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">Apply Suggestion</Button>
                        <Badge className="bg-blue-100 text-blue-800">+23% participation expected</Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-green-50 border border-green-200 rounded-lg">
                      <h3 className="font-medium text-green-900 mb-2">Add Tiered Structure</h3>
                      <p className="text-sm text-green-800 mb-3">
                        Customers who refer 5+ people could get higher rewards. This typically increases lifetime referrals by 40%.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">Create Tiered Program</Button>
                        <Badge className="bg-green-100 text-green-800">+40% lifetime referrals</Badge>
                      </div>
                    </div>

                    <div className="p-4 bg-purple-50 border border-purple-200 rounded-lg">
                      <h3 className="font-medium text-purple-900 mb-2">Seasonal Campaigns</h3>
                      <p className="text-sm text-purple-800 mb-3">
                        Create time-limited campaigns for holidays and special events to drive urgency and increase participation.
                      </p>
                      <div className="flex items-center space-x-2">
                        <Button size="sm" variant="outline">Set Up Campaign</Button>
                        <Badge className="bg-purple-100 text-purple-800">+60% during campaigns</Badge>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </main>
    </div>
  );
}