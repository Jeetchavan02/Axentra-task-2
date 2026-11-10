import { useState } from "react";
import { 
  Save, 
  RefreshCw,
  Database,
  Eye,
  EyeOff,
  AlertCircle,
  Download,
  Upload,
  Trash2} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Textarea } from "@src/components/ui/textarea";
import { Switch } from "@src/components/ui/switch";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Alert, AlertDescription } from "@src/components/ui/alert";
import { Separator } from "@src/components/ui/separator";

export default function ReferralsSettings() {
  const [generalSettings, setGeneralSettings] = useState({
    programName: "Friends & Family Referrals",
    programDescription: "Refer friends and earn rewards for every successful referral",
    isEnabled: true,
    autoApprove: true,
    requireApproval: false,
    maxReferrals: 50,
    cookieLifetime: 30
  });

  const [commissionSettings, setCommissionSettings] = useState({
    commissionType: "percentage",
    commissionValue: 10,
    minimumPayout: 25,
    payoutFrequency: "monthly",
    tierSystem: true,
    bonusEnabled: true,
    bonusThreshold: 10,
    bonusAmount: 50
  });

  const [notificationSettings, setNotificationSettings] = useState({
    emailNotifications: true,
    smsNotifications: false,
    webhookUrl: "",
    notifyOnReferral: true,
    notifyOnConversion: true,
    notifyOnPayout: true,
    adminNotifications: true
  });

  const [securitySettings, setSecuritySettings] = useState({
    requireEmailVerification: true,
    enableFraudDetection: true,
    blockVpn: false,
    rateLimiting: true,
    maxClicksPerHour: 100,
    suspiciousActivityAlert: true
  });

  const [integrationSettings, setIntegrationSettings] = useState({
    trackingEnabled: true,
    googleAnalytics: "",
    facebookPixel: "",
    customTracking: "",
    apiKey: "ref_live_ak_1234567890abcdef",
    webhookSecret: "whsec_1234567890abcdef"
  });

  const [showApiKey, setShowApiKey] = useState(false);
  const [showWebhookSecret, setShowWebhookSecret] = useState(false);

  const handleSave = () => {
    // Save settings logic here
    console.log("Settings saved");
  };

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">Settings</h2>
              <p className="text-sm text-gray-600 mt-1">Configure your referral program settings</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                <RefreshCw className="h-4 w-4 mr-2" />
                Reset
              </Button>
              <Button className="bg-black text-white hover:bg-gray-800" onClick={handleSave}>
                <Save className="h-4 w-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <Tabs defaultValue="general" className="space-y-6">
            <TabsList className="grid w-full grid-cols-6">
              <TabsTrigger value="general">General</TabsTrigger>
              <TabsTrigger value="commissions">Commissions</TabsTrigger>
              <TabsTrigger value="notifications">Notifications</TabsTrigger>
              <TabsTrigger value="security">Security</TabsTrigger>
              <TabsTrigger value="integrations">Integrations</TabsTrigger>
              <TabsTrigger value="advanced">Advanced</TabsTrigger>
            </TabsList>

            <TabsContent value="general" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>General Settings</CardTitle>
                  <p className="text-sm text-gray-600">Configure basic program settings</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="programName">Program Name</Label>
                      <Input
                        id="programName"
                        value={generalSettings.programName}
                        onChange={(e) => setGeneralSettings({...generalSettings, programName: e.target.value})}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="maxReferrals">Max Referrals per User</Label>
                      <Input
                        id="maxReferrals"
                        type="number"
                        value={generalSettings.maxReferrals}
                        onChange={(e) => setGeneralSettings({...generalSettings, maxReferrals: parseInt(e.target.value)})}
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="programDescription">Program Description</Label>
                    <Textarea
                      id="programDescription"
                      value={generalSettings.programDescription}
                      onChange={(e) => setGeneralSettings({...generalSettings, programDescription: e.target.value})}
                      rows={3}
                    />
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Program Status</Label>
                        <p className="text-sm text-gray-600">Enable or disable the referral program</p>
                      </div>
                      <Switch
                        checked={generalSettings.isEnabled}
                        onCheckedChange={(checked) => setGeneralSettings({...generalSettings, isEnabled: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Auto-approve Referrals</Label>
                        <p className="text-sm text-gray-600">Automatically approve new referrals</p>
                      </div>
                      <Switch
                        checked={generalSettings.autoApprove}
                        onCheckedChange={(checked) => setGeneralSettings({...generalSettings, autoApprove: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Require Manual Approval</Label>
                        <p className="text-sm text-gray-600">Require admin approval for new referrers</p>
                      </div>
                      <Switch
                        checked={generalSettings.requireApproval}
                        onCheckedChange={(checked) => setGeneralSettings({...generalSettings, requireApproval: checked})}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="cookieLifetime">Cookie Lifetime (days)</Label>
                    <Input
                      id="cookieLifetime"
                      type="number"
                      value={generalSettings.cookieLifetime}
                      onChange={(e) => setGeneralSettings({...generalSettings, cookieLifetime: parseInt(e.target.value)})}
                    />
                    <p className="text-sm text-gray-600">How long referral cookies last before expiring</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="commissions" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Commission Settings</CardTitle>
                  <p className="text-sm text-gray-600">Configure how referrers earn commissions</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="commissionType">Commission Type</Label>
                      <Select value={commissionSettings.commissionType} onValueChange={(value) => setCommissionSettings({...commissionSettings, commissionType: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="percentage">Percentage</SelectItem>
                          <SelectItem value="fixed">Fixed Amount</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="commissionValue">
                        Commission Value {commissionSettings.commissionType === 'percentage' ? '(%)' : '($)'}
                      </Label>
                      <Input
                        id="commissionValue"
                        type="number"
                        step="0.01"
                        value={commissionSettings.commissionValue}
                        onChange={(e) => setCommissionSettings({...commissionSettings, commissionValue: parseFloat(e.target.value)})}
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                      <Label htmlFor="minimumPayout">Minimum Payout ($)</Label>
                      <Input
                        id="minimumPayout"
                        type="number"
                        value={commissionSettings.minimumPayout}
                        onChange={(e) => setCommissionSettings({...commissionSettings, minimumPayout: parseInt(e.target.value)})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="payoutFrequency">Payout Frequency</Label>
                      <Select value={commissionSettings.payoutFrequency} onValueChange={(value) => setCommissionSettings({...commissionSettings, payoutFrequency: value})}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="weekly">Weekly</SelectItem>
                          <SelectItem value="monthly">Monthly</SelectItem>
                          <SelectItem value="quarterly">Quarterly</SelectItem>
                          <SelectItem value="manual">Manual</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Tier System</Label>
                        <p className="text-sm text-gray-600">Enable commission tiers based on performance</p>
                      </div>
                      <Switch
                        checked={commissionSettings.tierSystem}
                        onCheckedChange={(checked) => setCommissionSettings({...commissionSettings, tierSystem: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Bonus System</Label>
                        <p className="text-sm text-gray-600">Enable bonus rewards for milestones</p>
                      </div>
                      <Switch
                        checked={commissionSettings.bonusEnabled}
                        onCheckedChange={(checked) => setCommissionSettings({...commissionSettings, bonusEnabled: checked})}
                      />
                    </div>
                  </div>

                  {commissionSettings.bonusEnabled && (
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                      <div className="space-y-2">
                        <Label htmlFor="bonusThreshold">Bonus Threshold (referrals)</Label>
                        <Input
                          id="bonusThreshold"
                          type="number"
                          value={commissionSettings.bonusThreshold}
                          onChange={(e) => setCommissionSettings({...commissionSettings, bonusThreshold: parseInt(e.target.value)})}
                        />
                      </div>
                      
                      <div className="space-y-2">
                        <Label htmlFor="bonusAmount">Bonus Amount ($)</Label>
                        <Input
                          id="bonusAmount"
                          type="number"
                          value={commissionSettings.bonusAmount}
                          onChange={(e) => setCommissionSettings({...commissionSettings, bonusAmount: parseInt(e.target.value)})}
                        />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="notifications" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                  <p className="text-sm text-gray-600">Configure how and when to send notifications</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Email Notifications</Label>
                        <p className="text-sm text-gray-600">Send notifications via email</p>
                      </div>
                      <Switch
                        checked={notificationSettings.emailNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, emailNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">SMS Notifications</Label>
                        <p className="text-sm text-gray-600">Send notifications via SMS</p>
                      </div>
                      <Switch
                        checked={notificationSettings.smsNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, smsNotifications: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Admin Notifications</Label>
                        <p className="text-sm text-gray-600">Send notifications to administrators</p>
                      </div>
                      <Switch
                        checked={notificationSettings.adminNotifications}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, adminNotifications: checked})}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Event Notifications</h4>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">New Referral</Label>
                        <p className="text-sm text-gray-600">Notify when someone gets referred</p>
                      </div>
                      <Switch
                        checked={notificationSettings.notifyOnReferral}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, notifyOnReferral: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Conversion</Label>
                        <p className="text-sm text-gray-600">Notify when a referral converts</p>
                      </div>
                      <Switch
                        checked={notificationSettings.notifyOnConversion}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, notifyOnConversion: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Payout</Label>
                        <p className="text-sm text-gray-600">Notify when payouts are processed</p>
                      </div>
                      <Switch
                        checked={notificationSettings.notifyOnPayout}
                        onCheckedChange={(checked) => setNotificationSettings({...notificationSettings, notifyOnPayout: checked})}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-2">
                    <Label htmlFor="webhookUrl">Webhook URL</Label>
                    <Input
                      id="webhookUrl"
                      type="url"
                      placeholder="https://your-site.com/webhook"
                      value={notificationSettings.webhookUrl}
                      onChange={(e) => setNotificationSettings({...notificationSettings, webhookUrl: e.target.value})}
                    />
                    <p className="text-sm text-gray-600">Receive real-time notifications at this URL</p>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="security" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Security Settings</CardTitle>
                  <p className="text-sm text-gray-600">Configure security and fraud prevention</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Email Verification</Label>
                        <p className="text-sm text-gray-600">Require email verification for new referrers</p>
                      </div>
                      <Switch
                        checked={securitySettings.requireEmailVerification}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, requireEmailVerification: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Fraud Detection</Label>
                        <p className="text-sm text-gray-600">Enable automatic fraud detection</p>
                      </div>
                      <Switch
                        checked={securitySettings.enableFraudDetection}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, enableFraudDetection: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Block VPN Traffic</Label>
                        <p className="text-sm text-gray-600">Block referrals from VPN/proxy users</p>
                      </div>
                      <Switch
                        checked={securitySettings.blockVpn}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, blockVpn: checked})}
                      />
                    </div>
                    
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Rate Limiting</Label>
                        <p className="text-sm text-gray-600">Limit clicks per hour per user</p>
                      </div>
                      <Switch
                        checked={securitySettings.rateLimiting}
                        onCheckedChange={(checked) => setSecuritySettings({...securitySettings, rateLimiting: checked})}
                      />
                    </div>
                  </div>

                  {securitySettings.rateLimiting && (
                    <div className="space-y-2">
                      <Label htmlFor="maxClicksPerHour">Max Clicks per Hour</Label>
                      <Input
                        id="maxClicksPerHour"
                        type="number"
                        value={securitySettings.maxClicksPerHour}
                        onChange={(e) => setSecuritySettings({...securitySettings, maxClicksPerHour: parseInt(e.target.value)})}
                      />
                    </div>
                  )}

                  <Separator />

                  <div className="flex items-center justify-between">
                    <div>
                      <Label className="text-base font-medium">Suspicious Activity Alerts</Label>
                      <p className="text-sm text-gray-600">Get notified of suspicious activity</p>
                    </div>
                    <Switch
                      checked={securitySettings.suspiciousActivityAlert}
                      onCheckedChange={(checked) => setSecuritySettings({...securitySettings, suspiciousActivityAlert: checked})}
                    />
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="integrations" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Integration Settings</CardTitle>
                  <p className="text-sm text-gray-600">Configure third-party integrations</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <div>
                        <Label className="text-base font-medium">Tracking Enabled</Label>
                        <p className="text-sm text-gray-600">Enable referral tracking</p>
                      </div>
                      <Switch
                        checked={integrationSettings.trackingEnabled}
                        onCheckedChange={(checked) => setIntegrationSettings({...integrationSettings, trackingEnabled: checked})}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">Analytics Integration</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="googleAnalytics">Google Analytics ID</Label>
                      <Input
                        id="googleAnalytics"
                        placeholder="G-XXXXXXXXXX"
                        value={integrationSettings.googleAnalytics}
                        onChange={(e) => setIntegrationSettings({...integrationSettings, googleAnalytics: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="facebookPixel">Facebook Pixel ID</Label>
                      <Input
                        id="facebookPixel"
                        placeholder="1234567890123456"
                        value={integrationSettings.facebookPixel}
                        onChange={(e) => setIntegrationSettings({...integrationSettings, facebookPixel: e.target.value})}
                      />
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="customTracking">Custom Tracking Code</Label>
                      <Textarea
                        id="customTracking"
                        placeholder="<!-- Custom tracking code -->"
                        value={integrationSettings.customTracking}
                        onChange={(e) => setIntegrationSettings({...integrationSettings, customTracking: e.target.value})}
                        rows={3}
                      />
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">API Configuration</h4>
                    
                    <div className="space-y-2">
                      <Label htmlFor="apiKey">API Key</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="apiKey"
                          type={showApiKey ? "text" : "password"}
                          value={integrationSettings.apiKey}
                          onChange={(e) => setIntegrationSettings({...integrationSettings, apiKey: e.target.value})}
                          readOnly
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowApiKey(!showApiKey)}
                        >
                          {showApiKey ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    
                    <div className="space-y-2">
                      <Label htmlFor="webhookSecret">Webhook Secret</Label>
                      <div className="flex space-x-2">
                        <Input
                          id="webhookSecret"
                          type={showWebhookSecret ? "text" : "password"}
                          value={integrationSettings.webhookSecret}
                          onChange={(e) => setIntegrationSettings({...integrationSettings, webhookSecret: e.target.value})}
                          readOnly
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setShowWebhookSecret(!showWebhookSecret)}
                        >
                          {showWebhookSecret ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                        </Button>
                        <Button variant="outline" size="sm">
                          <RefreshCw className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="advanced" className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>Advanced Settings</CardTitle>
                  <p className="text-sm text-gray-600">Advanced configuration options</p>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Alert>
                    <AlertCircle className="h-4 w-4" />
                    <AlertDescription>
                      These settings are for advanced users only. Incorrect configuration may affect your referral program performance.
                    </AlertDescription>
                  </Alert>

                  <div className="space-y-4">
                    <h4 className="font-medium">Data Management</h4>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <Button variant="outline" className="justify-start">
                        <Download className="w-4 h-4 mr-2" />
                        Export All Data
                      </Button>
                      <Button variant="outline" className="justify-start">
                        <Upload className="w-4 h-4 mr-2" />
                        Import Data
                      </Button>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium">System Actions</h4>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="justify-start">
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Recalculate All Commissions
                      </Button>
                      <p className="text-sm text-gray-600">This will recalculate all commission amounts based on current settings</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button variant="outline" className="justify-start">
                        <Database className="w-4 h-4 mr-2" />
                        Clear Analytics Data
                      </Button>
                      <p className="text-sm text-gray-600">Remove all analytics data while preserving referral records</p>
                    </div>
                  </div>

                  <Separator />

                  <div className="space-y-4">
                    <h4 className="font-medium text-red-600">Danger Zone</h4>
                    
                    <div className="space-y-2">
                      <Button variant="destructive" className="justify-start">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Reset All Settings
                      </Button>
                      <p className="text-sm text-gray-600">This will reset all settings to default values</p>
                    </div>
                    
                    <div className="space-y-2">
                      <Button variant="destructive" className="justify-start">
                        <Trash2 className="w-4 h-4 mr-2" />
                        Delete All Data
                      </Button>
                      <p className="text-sm text-gray-600">Permanently delete all referral data. This action cannot be undone.</p>
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