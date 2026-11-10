import React, { useState, useEffect } from "react";
import HeadingSection from "@src/components/layouts/HeadingSection";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Switch } from "@src/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Alert, AlertDescription } from "@src/components/ui/alert";
import { Gift, Info } from "lucide-react";
import { postReq, getReq, baseURL } from "@src/auth/jwtService"
import { useToast } from "@src/context/ToastContext"

interface referralSettingsProps {
  children?: React.ReactElement | React.ReactElement[];
}

export default function referralSettingsPage({ children }: referralSettingsProps) {
  const [referralsEnabled, setreferralsEnabled] = useState(false);
  const [formData, setFormData] = useState({
    referrerRewardType: "percentage",
    referrerRewardValue: "",
    refereeRewardType: "percentage",
    refereeRewardValue: "",
    minCreationOrders: false,
    minApplicationOrders: false,
    customizationText: ""
  });
  const { showToast } = useToast()

  const rewardTypeOptions = [
    { value: "percentage", label: "Percentage", description: "Reward as a percentage of purchase" },
    { value: "fixed_amount", label: "Fixed Amount", description: "Fixed reward amount per referral" }
  ];

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

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


  const fetchReferralSettings = async () => {
    const sessionData = getReferralSessionData();
    if (!sessionData?.shop) return;

    const params = `?shop=${encodeURIComponent(sessionData.shop)}`;

    try {
      const res = await getReq("referral_settings", params, baseURL);
      const data = res?.data;

      if (data) {
        // Enable toggle
        if (typeof data.is_enabled === "boolean") {
          setreferralsEnabled(data.is_enabled);
        }

        // Extract values safely
        const receiver = data.referral_settings?.Receiver || {};
        const referrer = data.referral_settings?.Referrer || {};
        const settings = data.referral_settings?.settings || {};

        const creationRule = settings?.creation_rule || {};
        const applicationRule = settings?.application_rule || {};

        setFormData({
          // Referrer
          referrerRewardType: referrer.rewards_type || "percentage",
          referrerRewardValue:
            referrer.discounts != null ? String(referrer.discounts) : "",

          // Referee (Receiver)
          refereeRewardType: receiver.rewards_type || "percentage",
          refereeRewardValue:
            receiver.discounts != null ? String(receiver.discounts) : "",

          // Rules mapping (UPDATED)
          minCreationOrders: Number(creationRule.min_orders_required) === 1,
          minApplicationOrders: Number(applicationRule.min_orders_required) === 1,
        });
      }
    } catch (error) {
      console.error("Referral settings fetch error:", error);
    }
  };

  useEffect(() => {
    fetchReferralSettings();
  }, []);

  const handleSaveSettings = async () => {
    const sessionData = getReferralSessionData();

    if (!sessionData?.shop) {
      showToast(
        "Missing Information",
        "Shop information is missing.",
        "error"
      );
      return;
    }

    const payload = {
      shop: sessionData.shop,
      is_enabled: referralsEnabled,
      receiver_discount: Number(formData.refereeRewardValue) || 0,
      referrer_discount: Number(formData.referrerRewardValue) || 0,
      referrer_reward_type: formData.referrerRewardType,
      receiver_reward_type: formData.refereeRewardType,
      min_creation_orders: formData.minCreationOrders ? 1 : 0,
      min_application_orders: formData.minApplicationOrders ? 1 : 0,
      customization_text: formData.customizationText || ""
    };

    try {
      await postReq("referral_settings", payload, baseURL);

      showToast(
        "Settings Saved",
        "Referral settings have been updated successfully.",
        "success"
      );
    } catch (error) {
      console.error("Referral settings API error:", error);
      showToast(
        "Save Failed",
        "Unable to save referral settings. Please try again.",
        "error"
      );
    }
  };


  return (
    <div className="axentraos-page-container">
      <HeadingSection
        heading="Referral Settings"
        subheading="Configure stock referral rules."
        props={children}
      >
        <>
          <Button className="gap-2" onClick={handleSaveSettings}>
            Save Settings
          </Button>
        </>
      </HeadingSection>

      {/* MAIN CONTENT */}
      <main className="axentraos-main-container">
        <Card>
          {/* <CardHeader>
            <CardTitle className="text-lg font-semibold">
              Low Stock referral
            </CardTitle>
            <p className="text-sm text-gray-500">
              Set the inventory level at which referrals are triggered.
            </p>
          </CardHeader> */}

          <CardContent className="space-y-6 mt-6">
            {/* ENABLE referralS */}
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <p className="font-medium">Enable referrals</p>
                <p className="text-sm text-gray-500">
                  Turn on/off webhook based stock referrals
                </p>
              </div>

              <Switch
                checked={referralsEnabled}
                onCheckedChange={setreferralsEnabled}
              />
            </div>
            {referralsEnabled && (
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
                            <SelectTrigger className="text-left [&>span]:!text-left [&>span]:!justify-start [&>span]:!overflow-visible [&>span]:!whitespace-normal [&>span]:!block [&>span]:[-webkit-line-clamp:unset]">
                              <SelectValue placeholder="Select reward type" />
                            </SelectTrigger>
                            <SelectContent>
                              {rewardTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
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
                        <div>
                          <Label htmlFor="customization-text">Customization Text</Label>
                          <Input
                            id="customization-text"
                            value={formData.customizationText}
                            onChange={(e) => handleInputChange("customizationText", e.target.value)}
                            placeholder="Enter customization text"
                            type="text"
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
                            <SelectTrigger className="text-left [&>span]:!text-left [&>span]:!justify-start [&>span]:!overflow-visible [&>span]:!whitespace-normal [&>span]:!block [&>span]:[-webkit-line-clamp:unset]">
                              <SelectValue placeholder="Select reward type" />
                            </SelectTrigger>
                            <SelectContent>
                              {rewardTypeOptions.map((option) => (
                                <SelectItem key={option.value} value={option.value}>
                                  {option.label}
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

                    <Alert>
                      <Info className="h-4 w-4" />
                      <AlertDescription>
                        <strong>Best Practice:</strong> Referrer rewards should be higher than referee rewards to incentivize sharing. A common ratio is 2:1 (e.g., 10% referrer, 5% referee).
                      </AlertDescription>
                    </Alert>
                  </div>

                  {/* Referral Rules */}
                  <div className="space-y-6">
                    <h3 className="font-medium text-gray-900">Referral Rules</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                      {/* Creation Rule */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border rounded-md p-3">
                          <Label>Purchase required to generate a referral code</Label>
                          <Switch
                            checked={formData.minCreationOrders}
                            onCheckedChange={(checked) => handleInputChange("minCreationOrders", checked)}
                          />
                        </div>
                      </div>

                      {/* Application Rule */}
                      <div className="space-y-3">
                        <div className="flex items-center justify-between border rounded-md p-3">
                          <Label>Purchase required to use a referral code</Label>
                          <Switch
                            checked={formData.minApplicationOrders}
                            onCheckedChange={(checked) => handleInputChange("minApplicationOrders", checked)}
                          />
                        </div>
                      </div>

                    </div>
                  </div>
                </CardContent>
              </Card>
            )}

          </CardContent>
        </Card>
      </main>
    </div>
  );
}