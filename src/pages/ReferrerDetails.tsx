import React, { useState, useEffect } from "react";
import HeadingSection from "@src/components/layouts/HeadingSection";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Switch } from "@src/components/ui/switch";
import { Gift } from "lucide-react";
import { postReq, getReq, baseURL } from "@src/auth/jwtService";
import { useToast } from "@src/context/ToastContext";

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
    minCreationOrders: "",
    minApplicationOrders: ""
  });

  const { showToast } = useToast();

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  // ✅ Safe number parsing (handles 0 correctly)
  const parseNumber = (value: string) => {
    if (value === "" || value === null || value === undefined) return 0;
    return Number(value);
  };

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

  const fetchReferralSettings = async () => {
    const sessionData = getReferralSessionData();
    if (!sessionData?.shop || sessionData?.outlet_id == null) return;

    const params = `?shop=${encodeURIComponent(sessionData.shop)}&outlet_id=${sessionData.outlet_id}`;

    try {
      const res = await getReq("referral_settings", params, baseURL);
      const data = res?.data;

      if (data) {
        if (typeof data.is_enabled === "boolean") {
          setreferralsEnabled(data.is_enabled);
        }

        const receiver = data.referral_settings?.Receiver || {};
        const referrer = data.referral_settings?.Referrer || {};
        const settings = data.referral_settings?.settings || {};

        const creationRule = settings?.creation_rule || {};
        const applicationRule = settings?.application_rule || {};

        setFormData({
          referrerRewardType: referrer.rewards_type || "percentage",
          referrerRewardValue: referrer.discounts != null ? String(referrer.discounts) : "",

          refereeRewardType: receiver.rewards_type || "percentage",
          refereeRewardValue: receiver.discounts != null ? String(receiver.discounts) : "",

          minCreationOrders:
            creationRule.min_orders_required != null
              ? String(creationRule.min_orders_required)
              : "",

          minApplicationOrders:
            applicationRule.min_orders_required != null
              ? String(applicationRule.min_orders_required)
              : "",
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

    if (!sessionData?.shop || !sessionData?.outlet_id) {
      showToast("Missing Information", "Shop or outlet information is missing.", "error");
      return;
    }

    const payload = {
      shop: sessionData.shop,
      outlet_id: sessionData.outlet_id,
      is_enabled: referralsEnabled,

      receiver_discount: parseNumber(formData.refereeRewardValue),
      referrer_discount: parseNumber(formData.referrerRewardValue),

      referrer_reward_type: formData.referrerRewardType,
      receiver_reward_type: formData.refereeRewardType,

      // ✅ FIXED (0 will be preserved)
      min_creation_orders: parseNumber(formData.minCreationOrders),
      min_application_orders: parseNumber(formData.minApplicationOrders)
    };

    console.log("Sending payload:", payload); // 🔍 Debug

    try {
      await postReq("referral_settings", payload, baseURL);

      showToast(
        "Settings Updated",
        "Your referral settings have been saved successfully.",
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
        heading="Referral Program Settings"
        subheading="Configure and manage your referral program."
        props={children}
      >
        <Button className="gap-2" onClick={handleSaveSettings}>
          Save Changes
        </Button>
      </HeadingSection>

      <main className="axentraos-main-container">
        <Card>
          <CardContent className="space-y-6 mt-6">

            {/* Enable Toggle */}
            <div className="flex items-center justify-between border rounded-lg p-4">
              <div>
                <p className="font-medium">Enable Referral Program</p>
                <p className="text-sm text-gray-500">
                  Turn your referral program on or off.
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

                  {/* Rules */}
                  <div className="space-y-6">
                    <h3 className="font-medium text-gray-900">Referral Rules</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                      {/* Creation Rule */}
                      <div className="space-y-3">
                        <Label>Minimum purchases to generate a referral code</Label>
                        <Input
                          value={formData.minCreationOrders}
                          onChange={(e) => handleInputChange("minCreationOrders", e.target.value)}
                          placeholder="Enter number of orders"
                          type="number"
                          min={0}
                        />
                      </div>

                      {/* Application Rule */}
                      <div className="space-y-3">
                        <Label>Minimum purchases to use a referral code</Label>
                        <Input
                          value={formData.minApplicationOrders}
                          onChange={(e) => handleInputChange("minApplicationOrders", e.target.value)}
                          placeholder="Enter number of orders"
                          type="number"
                          min={0}
                        />
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