import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Eye, 
  Monitor, 
  Smartphone, 
  Tablet,
  Settings,
  Code,
  Globe,
  Share,
  Copy,
  Check,
  Save,
  Layout,
  Gift,
  Users,
  Mail,
  ExternalLink
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Textarea } from "@src/components/ui/textarea";
import { Switch } from "@src/components/ui/switch";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@src/components/ui/select";
import { Slider } from "@src/components/ui/slider";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@src/components/ui/dialog";
import { FaFacebook, FaTwitter, FaWhatsapp, FaLinkedin, FaInstagram } from "react-icons/fa";

export default function ReferralsUICustomization() {
  const [activeDevice, setActiveDevice] = useState("desktop");
  const [activeElement, setActiveElement] = useState("referral-widget");
  const [showCode, setShowCode] = useState(false);
  const [copied, setCopied] = useState(false);
  const [showColorPicker, setShowColorPicker] = useState(false);
  const [currentColorField, setCurrentColorField] = useState<{element: string, field: string}>({element: "", field: ""});

  const [customization, setCustomization] = useState({
    referralWidget: {
      enabled: true,
      position: "bottom-right",
      primaryColor: "#3B82F6",
      secondaryColor: "#1E40AF",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      borderColor: "#E5E7EB",
      borderWidth: 1,
      borderRadius: 12,
      shadow: true,
      shadowColor: "#000000",
      shadowOpacity: 15,
      animation: true,
      animationType: "slide",
      width: 320,
      padding: 20,
      title: "Refer & Earn",
      titleFontFamily: "Inter",
      titleFontSize: 18,
      titleFontWeight: "semibold",
      description: "Share with friends and earn rewards",
      descriptionFontFamily: "Inter",
      descriptionFontSize: 14,
      descriptionFontWeight: "normal",
      buttonText: "Get My Link",
      buttonFontFamily: "Inter",
      buttonFontSize: 14,
      buttonFontWeight: "medium",
      buttonBorderRadius: 8,
      showRewards: true,
      rewardText: "Earn $10 for each friend",
      rewardFontFamily: "Inter",
      rewardFontSize: 12,
      rewardFontWeight: "medium",
      rewardBackgroundColor: "#F0FDF4",
      rewardTextColor: "#15803D",
      customCss: ""
    },
    referralPage: {
      enabled: true,
      heroTitle: "Refer Friends & Earn Rewards",
      heroTitleFontFamily: "Inter",
      heroTitleFontSize: 48,
      heroTitleFontWeight: "bold",
      heroDescription: "Share your unique link and earn amazing rewards for every successful referral",
      heroDescriptionFontFamily: "Inter",
      heroDescriptionFontSize: 20,
      heroDescriptionFontWeight: "normal",
      primaryColor: "#3B82F6",
      secondaryColor: "#1E40AF",
      backgroundColor: "#F9FAFB",
      textColor: "#1F2937",
      headerBackgroundColor: "#FFFFFF",
      headerTextColor: "#1F2937",
      buttonFontFamily: "Inter",
      buttonFontSize: 16,
      buttonFontWeight: "medium",
      buttonBorderRadius: 8,
      showStats: true,
      showHowItWorks: true,
      showTestimonials: true,
      customBanner: "",
      customCss: ""
    },
    emailTemplates: {
      enabled: true,
      fromName: "Your Store",
      fromEmail: "referrals@yourstore.com",
      primaryColor: "#3B82F6",
      accentColor: "#10B981",
      backgroundColor: "#FFFFFF",
      textColor: "#1F2937",
      headerBackgroundColor: "#F9FAFB",
      headerTextColor: "#1F2937",
      footerBackgroundColor: "#F3F4F6",
      footerTextColor: "#6B7280",
      titleFontFamily: "Inter",
      titleFontSize: 24,
      titleFontWeight: "bold",
      bodyFontFamily: "Inter",
      bodyFontSize: 16,
      bodyFontWeight: "normal",
      buttonFontFamily: "Inter",
      buttonFontSize: 16,
      buttonFontWeight: "medium",
      buttonBorderRadius: 6,
      logoUrl: "",
      customCss: ""
    },
    socialSharing: {
      enabled: true,
      platforms: ["facebook", "twitter", "whatsapp", "email"],
      customMessage: "Check out this amazing store I found!",
      hashTags: ["referral", "discount", "shopping"],
      showPreview: true,
      buttonStyle: "rounded",
      buttonSize: "medium",
      buttonFontFamily: "Inter",
      buttonFontSize: 14,
      buttonFontWeight: "medium",
      iconSize: 20,
      spacing: 12,
      customCss: ""
    }
  });

  const fontOptions = [
    { value: "Inter", label: "Inter (Modern)" },
    { value: "Roboto", label: "Roboto (Clean)" },
    { value: "Open Sans", label: "Open Sans (Friendly)" },
    { value: "Lato", label: "Lato (Professional)" },
    { value: "Montserrat", label: "Montserrat (Elegant)" },
    { value: "Source Sans Pro", label: "Source Sans Pro (Technical)" },
    { value: "Poppins", label: "Poppins (Trendy)" },
    { value: "Nunito", label: "Nunito (Rounded)" },
    { value: "Raleway", label: "Raleway (Sophisticated)" },
    { value: "Playfair Display", label: "Playfair Display (Luxury)" },
    { value: "Georgia", label: "Georgia (Serif)" },
    { value: "Times New Roman", label: "Times New Roman (Classic)" }
  ];

  const fontWeightOptions = [
    { value: "light", label: "Light (300)" },
    { value: "normal", label: "Normal (400)" },
    { value: "medium", label: "Medium (500)" },
    { value: "semibold", label: "Semi Bold (600)" },
    { value: "bold", label: "Bold (700)" },
    { value: "extrabold", label: "Extra Bold (800)" }
  ];

  const predefinedColors = [
    "#3B82F6", "#1E40AF", "#60A5FA", "#DBEAFE",
    "#10B981", "#059669", "#34D399", "#D1FAE5",
    "#F59E0B", "#D97706", "#FBBF24", "#FEF3C7",
    "#EF4444", "#DC2626", "#F87171", "#FEE2E2",
    "#8B5CF6", "#7C3AED", "#A78BFA", "#F3E8FF",
    "#EC4899", "#DB2777", "#F472B6", "#FCE7F3",
    "#6B7280", "#4B5563", "#9CA3AF", "#F3F4F6",
    "#000000", "#FFFFFF", "#1F2937", "#F9FAFB"
  ];

  const handleCustomizationChange = (element: string, field: string, value: any) => {
    setCustomization(prev => ({
      ...prev,
      [element]: {
        ...prev[element as keyof typeof prev],
        [field]: value
      }
    }));
  };

  const openColorPicker = (element: string, field: string) => {
    setCurrentColorField({ element, field });
    setShowColorPicker(true);
  };

  const handleColorSelect = (color: string) => {
    handleCustomizationChange(currentColorField.element, currentColorField.field, color);
    setShowColorPicker(false);
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const generateEmbedCode = () => {
    return `<script>
  (function() {
    const referralWidget = document.createElement('div');
    referralWidget.innerHTML = \`
      <div style="
        position: fixed;
        ${customization.referralWidget.position.includes('bottom') ? 'bottom' : 'top'}: 20px;
        ${customization.referralWidget.position.includes('right') ? 'right' : 'left'}: 20px;
        background: ${customization.referralWidget.backgroundColor};
        color: ${customization.referralWidget.textColor};
        padding: ${customization.referralWidget.padding}px;
        border-radius: ${customization.referralWidget.borderRadius}px;
        box-shadow: ${customization.referralWidget.shadow ? '0 4px 12px rgba(0,0,0,0.15)' : 'none'};
        width: ${customization.referralWidget.width}px;
        z-index: 9999;
        font-family: ${customization.referralWidget.titleFontFamily}, sans-serif;
      ">
        <h3 style="
          color: ${customization.referralWidget.primaryColor};
          font-size: ${customization.referralWidget.titleFontSize}px;
          font-weight: ${customization.referralWidget.titleFontWeight};
          margin: 0 0 8px 0;
        ">
          ${customization.referralWidget.title}
        </h3>
        <p style="
          font-size: ${customization.referralWidget.descriptionFontSize}px;
          margin: 0 0 12px 0;
          opacity: 0.8;
        ">
          ${customization.referralWidget.description}
        </p>
        ${customization.referralWidget.showRewards ? `
        <div style="
          background: ${customization.referralWidget.rewardBackgroundColor};
          color: ${customization.referralWidget.rewardTextColor};
          padding: 8px;
          border-radius: 6px;
          margin: 0 0 12px 0;
          font-size: ${customization.referralWidget.rewardFontSize}px;
        ">
          ${customization.referralWidget.rewardText}
        </div>` : ''}
        <button onclick="openReferralProgram()" style="
          background: ${customization.referralWidget.primaryColor};
          color: white;
          border: none;
          padding: 12px 16px;
          border-radius: ${customization.referralWidget.buttonBorderRadius}px;
          width: 100%;
          cursor: pointer;
          font-size: ${customization.referralWidget.buttonFontSize}px;
          font-weight: ${customization.referralWidget.buttonFontWeight};
        ">
          ${customization.referralWidget.buttonText}
        </button>
      </div>
    \`;
    
    document.body.appendChild(referralWidget);
    
    window.openReferralProgram = function() {
      window.open('/referrals/customer-facing', '_blank');
    };
  })();
</script>`;
  };

  const customizationElements = [
    { id: "referral-widget", name: "Referral Widget", description: "Floating widget for your website", icon: <Layout className="w-4 h-4" /> },
    { id: "referral-page", name: "Referral Page", description: "Dedicated referral landing page", icon: <Globe className="w-4 h-4" /> },
    { id: "email-templates", name: "Email Templates", description: "Referral email notifications", icon: <Mail className="w-4 h-4" /> },
    { id: "social-sharing", name: "Social Sharing", description: "Social media sharing buttons", icon: <Share className="w-4 h-4" /> }
  ];

  const deviceOptions = [
    { id: "desktop", name: "Desktop", icon: <Monitor className="w-4 h-4" /> },
    { id: "tablet", name: "Tablet", icon: <Tablet className="w-4 h-4" /> },
    { id: "mobile", name: "Mobile", icon: <Smartphone className="w-4 h-4" /> }
  ];

  const ReferralWidgetPreview = () => (
    <div className="relative">
      <div 
        className="fixed z-50 shadow-lg"
        style={{
          backgroundColor: customization.referralWidget.backgroundColor,
          color: customization.referralWidget.textColor,
          borderRadius: `${customization.referralWidget.borderRadius}px`,
          borderWidth: `${customization.referralWidget.borderWidth}px`,
          borderColor: customization.referralWidget.borderColor,
          borderStyle: 'solid',
          boxShadow: customization.referralWidget.shadow ? `0 4px 12px rgba(0,0,0,${customization.referralWidget.shadowOpacity / 100})` : 'none',
          width: `${customization.referralWidget.width}px`,
          padding: `${customization.referralWidget.padding}px`,
          [customization.referralWidget.position.includes('bottom') ? 'bottom' : 'top']: '20px',
          [customization.referralWidget.position.includes('right') ? 'right' : 'left']: '20px'
        }}
      >
        <h3 
          style={{ 
            color: customization.referralWidget.primaryColor,
            fontFamily: customization.referralWidget.titleFontFamily,
            fontSize: `${customization.referralWidget.titleFontSize}px`,
            fontWeight: customization.referralWidget.titleFontWeight,
            marginBottom: '8px'
          }}
        >
          {customization.referralWidget.title}
        </h3>
        <p style={{
          fontFamily: customization.referralWidget.descriptionFontFamily,
          fontSize: `${customization.referralWidget.descriptionFontSize}px`,
          fontWeight: customization.referralWidget.descriptionFontWeight,
          marginBottom: '12px',
          opacity: 0.8
        }}>
          {customization.referralWidget.description}
        </p>
        {customization.referralWidget.showRewards && (
          <div style={{
            backgroundColor: customization.referralWidget.rewardBackgroundColor,
            color: customization.referralWidget.rewardTextColor,
            fontFamily: customization.referralWidget.rewardFontFamily,
            fontSize: `${customization.referralWidget.rewardFontSize}px`,
            fontWeight: customization.referralWidget.rewardFontWeight,
            padding: '8px',
            borderRadius: '6px',
            marginBottom: '12px'
          }}>
            {customization.referralWidget.rewardText}
          </div>
        )}
        <button
          style={{ 
            backgroundColor: customization.referralWidget.primaryColor,
            color: '#FFFFFF',
            fontFamily: customization.referralWidget.buttonFontFamily,
            fontSize: `${customization.referralWidget.buttonFontSize}px`,
            fontWeight: customization.referralWidget.buttonFontWeight,
            padding: '12px 16px',
            borderRadius: `${customization.referralWidget.buttonBorderRadius}px`,
            border: 'none',
            width: '100%',
            cursor: 'pointer'
          }}
        >
          {customization.referralWidget.buttonText}
        </button>
      </div>
    </div>
  );

  const ReferralPagePreview = () => (
    <div 
      className="p-8 min-h-96 rounded-lg"
      style={{ 
        backgroundColor: customization.referralPage.backgroundColor,
        color: customization.referralPage.textColor
      }}
    >
      <div className="text-center mb-8">
        <h1 
          style={{ 
            color: customization.referralPage.primaryColor,
            fontFamily: customization.referralPage.heroTitleFontFamily,
            fontSize: `${customization.referralPage.heroTitleFontSize}px`,
            fontWeight: customization.referralPage.heroTitleFontWeight,
            marginBottom: '16px'
          }}
        >
          {customization.referralPage.heroTitle}
        </h1>
        <p style={{
          fontFamily: customization.referralPage.heroDescriptionFontFamily,
          fontSize: `${customization.referralPage.heroDescriptionFontSize}px`,
          fontWeight: customization.referralPage.heroDescriptionFontWeight,
          opacity: 0.8
        }}>
          {customization.referralPage.heroDescription}
        </p>
      </div>

      {customization.referralPage.showHowItWorks && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Share className="w-6 h-6 text-blue-600" />
            </div>
            <h3 className="font-semibold mb-2">Share Your Link</h3>
            <p className="text-sm opacity-80">Get your unique referral link and share it with friends</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Users className="w-6 h-6 text-green-600" />
            </div>
            <h3 className="font-semibold mb-2">Friends Purchase</h3>
            <p className="text-sm opacity-80">Your friends make their first purchase using your link</p>
          </div>
          <div className="text-center p-4">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
              <Gift className="w-6 h-6 text-purple-600" />
            </div>
            <h3 className="font-semibold mb-2">Earn Rewards</h3>
            <p className="text-sm opacity-80">Get rewards for every successful referral</p>
          </div>
        </div>
      )}

      {customization.referralPage.showStats && (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="text-center p-4 bg-blue-50 rounded-lg">
            <div className="text-2xl font-bold text-blue-600">2,847</div>
            <div className="text-sm text-blue-600">Happy Referrers</div>
          </div>
          <div className="text-center p-4 bg-green-50 rounded-lg">
            <div className="text-2xl font-bold text-green-600">$47,850</div>
            <div className="text-sm text-green-600">Rewards Earned</div>
          </div>
          <div className="text-center p-4 bg-purple-50 rounded-lg">
            <div className="text-2xl font-bold text-purple-600">15.2%</div>
            <div className="text-sm text-purple-600">Conversion Rate</div>
          </div>
        </div>
      )}

      <div className="text-center">
        <button
          style={{ 
            backgroundColor: customization.referralPage.primaryColor,
            color: '#FFFFFF',
            fontFamily: customization.referralPage.buttonFontFamily,
            fontSize: `${customization.referralPage.buttonFontSize}px`,
            fontWeight: customization.referralPage.buttonFontWeight,
            padding: '12px 32px',
            borderRadius: `${customization.referralPage.buttonBorderRadius}px`,
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Get My Referral Link
        </button>
      </div>
    </div>
  );

  const EmailTemplatePreview = () => (
    <div className="p-8">
      <div className="max-w-lg mx-auto bg-white border rounded-lg overflow-hidden shadow-lg">
        <div 
          className="p-4 text-center"
          style={{ 
            backgroundColor: customization.emailTemplates.headerBackgroundColor,
            color: customization.emailTemplates.headerTextColor
          }}
        >
          {customization.emailTemplates.logoUrl && (
            <img 
              src={customization.emailTemplates.logoUrl} 
              alt="Logo" 
              className="h-8 mx-auto mb-2"
              onError={(e) => {
                e.currentTarget.style.display = 'none';
              }}
            />
          )}
          <h2 
            style={{ 
              fontFamily: customization.emailTemplates.titleFontFamily,
              fontSize: `${customization.emailTemplates.titleFontSize}px`,
              fontWeight: customization.emailTemplates.titleFontWeight,
              color: customization.emailTemplates.primaryColor,
              margin: 0
            }}
          >
            You've been referred!
          </h2>
        </div>
        <div 
          className="p-6"
          style={{ 
            backgroundColor: customization.emailTemplates.backgroundColor,
            color: customization.emailTemplates.textColor
          }}
        >
          <p 
            style={{ 
              fontFamily: customization.emailTemplates.bodyFontFamily,
              fontSize: `${customization.emailTemplates.bodyFontSize}px`,
              marginBottom: '16px'
            }}
          >
            Hi there!
          </p>
          <p 
            style={{ 
              fontFamily: customization.emailTemplates.bodyFontFamily,
              fontSize: `${customization.emailTemplates.bodyFontSize}px`,
              marginBottom: '16px'
            }}
          >
            Your friend {customization.emailTemplates.fromName} has referred you to our store. 
            You can get a special discount on your first purchase!
          </p>
          <div className="text-center">
            <button 
              style={{ 
                backgroundColor: customization.emailTemplates.primaryColor,
                color: '#FFFFFF',
                fontFamily: customization.emailTemplates.buttonFontFamily,
                fontSize: `${customization.emailTemplates.buttonFontSize}px`,
                fontWeight: customization.emailTemplates.buttonFontWeight,
                padding: '12px 24px',
                borderRadius: `${customization.emailTemplates.buttonBorderRadius}px`,
                border: 'none',
                cursor: 'pointer'
              }}
            >
              Claim Your Discount
            </button>
          </div>
        </div>
        <div 
          className="p-4 text-center text-sm"
          style={{ 
            backgroundColor: customization.emailTemplates.footerBackgroundColor,
            color: customization.emailTemplates.footerTextColor
          }}
        >
          <p>Thank you for being part of our referral program!</p>
          <p>Best regards, {customization.emailTemplates.fromName}</p>
        </div>
      </div>
    </div>
  );

  const SocialSharingPreview = () => (
    <div className="p-8">
      <div className="max-w-md mx-auto bg-white border rounded-lg p-6 shadow-lg">
        <h3 className="font-bold text-lg mb-4 text-center">Share with Friends</h3>
        <p className="text-gray-600 mb-4 text-center">
          {customization.socialSharing.customMessage}
        </p>
        <div className="space-y-2">
          {customization.socialSharing.platforms.includes("facebook") && (
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
                <FaFacebook className="text-white text-sm" />
              </div>
              <span className="font-medium">Share on Facebook</span>
            </div>
          )}
          {customization.socialSharing.platforms.includes("twitter") && (
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center">
                <FaTwitter className="text-white text-sm" />
              </div>
              <span className="font-medium">Share on Twitter</span>
            </div>
          )}
          {customization.socialSharing.platforms.includes("whatsapp") && (
            <div className="flex items-center space-x-3 p-3 bg-green-50 rounded-lg">
              <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
                <FaWhatsapp className="text-white text-sm" />
              </div>
              <span className="font-medium">Share on WhatsApp</span>
            </div>
          )}
          {customization.socialSharing.platforms.includes("email") && (
            <div className="flex items-center space-x-3 p-3 bg-gray-50 rounded-lg">
              <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
                <Mail className="text-white text-sm" />
              </div>
              <span className="font-medium">Share via Email</span>
            </div>
          )}
          {customization.socialSharing.platforms.includes("linkedin") && (
            <div className="flex items-center space-x-3 p-3 bg-blue-50 rounded-lg">
              <div className="w-8 h-8 bg-blue-700 rounded-full flex items-center justify-center">
                <FaLinkedin className="text-white text-sm" />
              </div>
              <span className="font-medium">Share on LinkedIn</span>
            </div>
          )}
          {customization.socialSharing.platforms.includes("instagram") && (
            <div className="flex items-center space-x-3 p-3 bg-pink-50 rounded-lg">
              <div className="w-8 h-8 bg-pink-600 rounded-full flex items-center justify-center">
                <FaInstagram className="text-white text-sm" />
              </div>
              <span className="font-medium">Share on Instagram</span>
            </div>
          )}
        </div>
        <div className="mt-4 text-center">
          <div className="text-xs text-gray-500">
            Tags: {customization.socialSharing.hashTags.map(tag => `#${tag}`).join(' ')}
          </div>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex bg-gray-50">
      <main className="flex-1 flex flex-col">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 px-6 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-xl font-semibold text-black">UI Customization</h2>
              <p className="text-sm text-gray-600 mt-1">Customize the look and feel of your referral program</p>
            </div>
            <div className="flex items-center space-x-4">
              <Button variant="outline" className="border-black text-black hover:bg-gray-50" onClick={() => setShowCode(!showCode)}>
                <Code className="w-4 h-4 mr-2" />
                {showCode ? "Hide Code" : "Show Code"}
              </Button>
              <Link to="/referrals/customer-facing">
                <Button variant="outline" className="border-black text-black hover:bg-gray-50">
                  <ExternalLink className="w-4 h-4 mr-2" />
                  Preview Live
                </Button>
              </Link>
              <Button className="bg-black text-white hover:bg-gray-800">
                <Save className="w-4 h-4 mr-2" />
                Save Changes
              </Button>
            </div>
          </div>
        </header>

        {/* Content */}
        <div className="flex-1 p-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Customization Panel */}
            <div className="lg:col-span-1 space-y-6">
              {/* Element Selector */}
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center text-lg">
                    <Settings className="w-5 h-5 mr-2" />
                    Customize Elements
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2">
                    {customizationElements.map((element) => (
                      <Button
                        key={element.id}
                        variant={activeElement === element.id ? "default" : "outline"}
                        className="w-full justify-start"
                        onClick={() => setActiveElement(element.id)}
                      >
                        {element.icon}
                        <div className="ml-3 text-left">
                          <div className="font-medium">{element.name}</div>
                          <div className="text-xs text-gray-500">{element.description}</div>
                        </div>
                      </Button>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Referral Page Customization */}
              {activeElement === "referral-page" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Hero Section</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="heroTitle">Hero Title</Label>
                        <Input
                          id="heroTitle"
                          value={customization.referralPage.heroTitle}
                          onChange={(e) => handleCustomizationChange("referralPage", "heroTitle", e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="heroDescription">Hero Description</Label>
                        <Textarea
                          id="heroDescription"
                          value={customization.referralPage.heroDescription}
                          onChange={(e) => handleCustomizationChange("referralPage", "heroDescription", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="heroTitleFont">Title Font</Label>
                        <Select 
                          value={customization.referralPage.heroTitleFontFamily} 
                          onValueChange={(value) => handleCustomizationChange("referralPage", "heroTitleFontFamily", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontOptions.map((font) => (
                              <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="heroTitleFontSize">Title Font Size</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.referralPage.heroTitleFontSize]}
                            onValueChange={(value) => handleCustomizationChange("referralPage", "heroTitleFontSize", value[0])}
                            min={24}
                            max={72}
                            step={2}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.referralPage.heroTitleFontSize}px
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="heroDescriptionFontSize">Description Font Size</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.referralPage.heroDescriptionFontSize]}
                            onValueChange={(value) => handleCustomizationChange("referralPage", "heroDescriptionFontSize", value[0])}
                            min={14}
                            max={24}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.referralPage.heroDescriptionFontSize}px
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Page Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="pageBackgroundColor">Background Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.referralPage.backgroundColor }}
                            onClick={() => openColorPicker("referralPage", "backgroundColor")}
                          />
                          <Input
                            value={customization.referralPage.backgroundColor}
                            onChange={(e) => handleCustomizationChange("referralPage", "backgroundColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="pageTextColor">Text Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.referralPage.textColor }}
                            onClick={() => openColorPicker("referralPage", "textColor")}
                          />
                          <Input
                            value={customization.referralPage.textColor}
                            onChange={(e) => handleCustomizationChange("referralPage", "textColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="pagePrimaryColor">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.referralPage.primaryColor }}
                            onClick={() => openColorPicker("referralPage", "primaryColor")}
                          />
                          <Input
                            value={customization.referralPage.primaryColor}
                            onChange={(e) => handleCustomizationChange("referralPage", "primaryColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="pageSecondaryColor">Secondary Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.referralPage.secondaryColor }}
                            onClick={() => openColorPicker("referralPage", "secondaryColor")}
                          />
                          <Input
                            value={customization.referralPage.secondaryColor}
                            onChange={(e) => handleCustomizationChange("referralPage", "secondaryColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Page Sections</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="flex items-center justify-between">
                        <Label htmlFor="showHowItWorks">Show How It Works</Label>
                        <Switch
                          id="showHowItWorks"
                          checked={customization.referralPage.showHowItWorks}
                          onCheckedChange={(checked) => handleCustomizationChange("referralPage", "showHowItWorks", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="showStats">Show Statistics</Label>
                        <Switch
                          id="showStats"
                          checked={customization.referralPage.showStats}
                          onCheckedChange={(checked) => handleCustomizationChange("referralPage", "showStats", checked)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="showTestimonials">Show Testimonials</Label>
                        <Switch
                          id="showTestimonials"
                          checked={customization.referralPage.showTestimonials}
                          onCheckedChange={(checked) => handleCustomizationChange("referralPage", "showTestimonials", checked)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="buttonBorderRadius">Button Border Radius</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.referralPage.buttonBorderRadius]}
                            onValueChange={(value) => handleCustomizationChange("referralPage", "buttonBorderRadius", value[0])}
                            max={25}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.referralPage.buttonBorderRadius}px
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Email Templates Customization */}
              {activeElement === "email-templates" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Email Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="fromName">From Name</Label>
                        <Input
                          id="fromName"
                          value={customization.emailTemplates.fromName}
                          onChange={(e) => handleCustomizationChange("emailTemplates", "fromName", e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="fromEmail">From Email</Label>
                        <Input
                          id="fromEmail"
                          type="email"
                          value={customization.emailTemplates.fromEmail}
                          onChange={(e) => handleCustomizationChange("emailTemplates", "fromEmail", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="logoUrl">Logo URL</Label>
                        <Input
                          id="logoUrl"
                          type="url"
                          value={customization.emailTemplates.logoUrl}
                          onChange={(e) => handleCustomizationChange("emailTemplates", "logoUrl", e.target.value)}
                          placeholder="https://example.com/logo.png"
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Email Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="emailPrimaryColor">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.emailTemplates.primaryColor }}
                            onClick={() => openColorPicker("emailTemplates", "primaryColor")}
                          />
                          <Input
                            value={customization.emailTemplates.primaryColor}
                            onChange={(e) => handleCustomizationChange("emailTemplates", "primaryColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="emailAccentColor">Accent Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.emailTemplates.accentColor }}
                            onClick={() => openColorPicker("emailTemplates", "accentColor")}
                          />
                          <Input
                            value={customization.emailTemplates.accentColor}
                            onChange={(e) => handleCustomizationChange("emailTemplates", "accentColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="emailBackgroundColor">Background Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.emailTemplates.backgroundColor }}
                            onClick={() => openColorPicker("emailTemplates", "backgroundColor")}
                          />
                          <Input
                            value={customization.emailTemplates.backgroundColor}
                            onChange={(e) => handleCustomizationChange("emailTemplates", "backgroundColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="emailTextColor">Text Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.emailTemplates.textColor }}
                            onClick={() => openColorPicker("emailTemplates", "textColor")}
                          />
                          <Input
                            value={customization.emailTemplates.textColor}
                            onChange={(e) => handleCustomizationChange("emailTemplates", "textColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Email Typography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="emailTitleFont">Title Font</Label>
                        <Select 
                          value={customization.emailTemplates.titleFontFamily} 
                          onValueChange={(value) => handleCustomizationChange("emailTemplates", "titleFontFamily", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontOptions.map((font) => (
                              <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="emailTitleFontSize">Title Font Size</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.emailTemplates.titleFontSize]}
                            onValueChange={(value) => handleCustomizationChange("emailTemplates", "titleFontSize", value[0])}
                            min={18}
                            max={36}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.emailTemplates.titleFontSize}px
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="emailBodyFont">Body Font</Label>
                        <Select 
                          value={customization.emailTemplates.bodyFontFamily} 
                          onValueChange={(value) => handleCustomizationChange("emailTemplates", "bodyFontFamily", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontOptions.map((font) => (
                              <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="emailBodyFontSize">Body Font Size</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.emailTemplates.bodyFontSize]}
                            onValueChange={(value) => handleCustomizationChange("emailTemplates", "bodyFontSize", value[0])}
                            min={12}
                            max={20}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.emailTemplates.bodyFontSize}px
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="emailButtonBorderRadius">Button Border Radius</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.emailTemplates.buttonBorderRadius]}
                            onValueChange={(value) => handleCustomizationChange("emailTemplates", "buttonBorderRadius", value[0])}
                            max={20}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.emailTemplates.buttonBorderRadius}px
                          </span>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Social Sharing Customization */}
              {activeElement === "social-sharing" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Sharing Settings</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="customMessage">Custom Message</Label>
                        <Textarea
                          id="customMessage"
                          value={customization.socialSharing.customMessage}
                          onChange={(e) => handleCustomizationChange("socialSharing", "customMessage", e.target.value)}
                          placeholder="Check out this amazing store I found!"
                        />
                      </div>

                      <div>
                        <Label htmlFor="hashTags">Hash Tags (comma separated)</Label>
                        <Input
                          id="hashTags"
                          value={customization.socialSharing.hashTags.join(", ")}
                          onChange={(e) => handleCustomizationChange("socialSharing", "hashTags", e.target.value.split(", "))}
                          placeholder="referral, discount, shopping"
                        />
                      </div>

                      <div>
                        <Label htmlFor="buttonStyle">Button Style</Label>
                        <Select 
                          value={customization.socialSharing.buttonStyle} 
                          onValueChange={(value) => handleCustomizationChange("socialSharing", "buttonStyle", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="rounded">Rounded</SelectItem>
                            <SelectItem value="square">Square</SelectItem>
                            <SelectItem value="circular">Circular</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="buttonSize">Button Size</Label>
                        <Select 
                          value={customization.socialSharing.buttonSize} 
                          onValueChange={(value) => handleCustomizationChange("socialSharing", "buttonSize", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="small">Small</SelectItem>
                            <SelectItem value="medium">Medium</SelectItem>
                            <SelectItem value="large">Large</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="iconSize">Icon Size</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.socialSharing.iconSize]}
                            onValueChange={(value) => handleCustomizationChange("socialSharing", "iconSize", value[0])}
                            min={16}
                            max={32}
                            step={2}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.socialSharing.iconSize}px
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="buttonSpacing">Button Spacing</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.socialSharing.spacing]}
                            onValueChange={(value) => handleCustomizationChange("socialSharing", "spacing", value[0])}
                            min={4}
                            max={24}
                            step={2}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.socialSharing.spacing}px
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="showPreview">Show Preview</Label>
                        <Switch
                          id="showPreview"
                          checked={customization.socialSharing.showPreview}
                          onCheckedChange={(checked) => handleCustomizationChange("socialSharing", "showPreview", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Social Platforms</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="space-y-2">
                        <Label>Select Platforms</Label>
                        {[
                          { id: "facebook", label: "Facebook", icon: <FaFacebook className="text-blue-600" /> },
                          { id: "twitter", label: "Twitter / X", icon: <FaTwitter className="text-blue-400" /> },
                          { id: "whatsapp", label: "WhatsApp", icon: <FaWhatsapp className="text-green-600" /> },
                          { id: "email", label: "Email", icon: <Mail className="text-gray-600" /> },
                          { id: "linkedin", label: "LinkedIn", icon: <FaLinkedin className="text-blue-700" /> },
                          { id: "instagram", label: "Instagram", icon: <FaInstagram className="text-pink-600" /> }
                        ].map((platform) => (
                          <div key={platform.id} className="flex items-center space-x-2">
                            <Switch
                              id={platform.id}
                              checked={customization.socialSharing.platforms.includes(platform.id)}
                              onCheckedChange={(checked) => {
                                const platforms = checked 
                                  ? [...customization.socialSharing.platforms, platform.id]
                                  : customization.socialSharing.platforms.filter(p => p !== platform.id);
                                handleCustomizationChange("socialSharing", "platforms", platforms);
                              }}
                            />
                            <Label htmlFor={platform.id} className="flex items-center space-x-2">
                              {platform.icon}
                              <span>{platform.label}</span>
                            </Label>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Widget Customization */}
              {activeElement === "referral-widget" && (
                <div className="space-y-6">
                  <Card>
                    <CardHeader>
                      <CardTitle>Content</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="widgetTitle">Title</Label>
                        <Input
                          id="widgetTitle"
                          value={customization.referralWidget.title}
                          onChange={(e) => handleCustomizationChange("referralWidget", "title", e.target.value)}
                        />
                      </div>
                      
                      <div>
                        <Label htmlFor="widgetDescription">Description</Label>
                        <Textarea
                          id="widgetDescription"
                          value={customization.referralWidget.description}
                          onChange={(e) => handleCustomizationChange("referralWidget", "description", e.target.value)}
                        />
                      </div>

                      <div>
                        <Label htmlFor="buttonText">Button Text</Label>
                        <Input
                          id="buttonText"
                          value={customization.referralWidget.buttonText}
                          onChange={(e) => handleCustomizationChange("referralWidget", "buttonText", e.target.value)}
                        />
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="showRewards">Show Rewards</Label>
                        <Switch
                          id="showRewards"
                          checked={customization.referralWidget.showRewards}
                          onCheckedChange={(checked) => handleCustomizationChange("referralWidget", "showRewards", checked)}
                        />
                      </div>

                      {customization.referralWidget.showRewards && (
                        <div>
                          <Label htmlFor="rewardText">Reward Text</Label>
                          <Input
                            id="rewardText"
                            value={customization.referralWidget.rewardText}
                            onChange={(e) => handleCustomizationChange("referralWidget", "rewardText", e.target.value)}
                          />
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Colors</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="primaryColor">Primary Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.referralWidget.primaryColor }}
                            onClick={() => openColorPicker("referralWidget", "primaryColor")}
                          />
                          <Input
                            value={customization.referralWidget.primaryColor}
                            onChange={(e) => handleCustomizationChange("referralWidget", "primaryColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="backgroundColor">Background Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.referralWidget.backgroundColor }}
                            onClick={() => openColorPicker("referralWidget", "backgroundColor")}
                          />
                          <Input
                            value={customization.referralWidget.backgroundColor}
                            onChange={(e) => handleCustomizationChange("referralWidget", "backgroundColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="textColor">Text Color</Label>
                        <div className="flex items-center space-x-2">
                          <button
                            className="w-10 h-10 rounded border-2 border-gray-300"
                            style={{ backgroundColor: customization.referralWidget.textColor }}
                            onClick={() => openColorPicker("referralWidget", "textColor")}
                          />
                          <Input
                            value={customization.referralWidget.textColor}
                            onChange={(e) => handleCustomizationChange("referralWidget", "textColor", e.target.value)}
                            className="flex-1"
                          />
                        </div>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Typography</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="titleFont">Title Font</Label>
                        <Select 
                          value={customization.referralWidget.titleFontFamily} 
                          onValueChange={(value) => handleCustomizationChange("referralWidget", "titleFontFamily", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontOptions.map((font) => (
                              <SelectItem key={font.value} value={font.value}>{font.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="titleFontSize">Title Font Size</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.referralWidget.titleFontSize]}
                            onValueChange={(value) => handleCustomizationChange("referralWidget", "titleFontSize", value[0])}
                            min={12}
                            max={32}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.referralWidget.titleFontSize}px
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="titleFontWeight">Title Font Weight</Label>
                        <Select 
                          value={customization.referralWidget.titleFontWeight} 
                          onValueChange={(value) => handleCustomizationChange("referralWidget", "titleFontWeight", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {fontWeightOptions.map((weight) => (
                              <SelectItem key={weight.value} value={weight.value}>{weight.label}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Layout</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div>
                        <Label htmlFor="widgetPosition">Position</Label>
                        <Select 
                          value={customization.referralWidget.position} 
                          onValueChange={(value) => handleCustomizationChange("referralWidget", "position", value)}
                        >
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectItem value="bottom-right">Bottom Right</SelectItem>
                            <SelectItem value="bottom-left">Bottom Left</SelectItem>
                            <SelectItem value="top-right">Top Right</SelectItem>
                            <SelectItem value="top-left">Top Left</SelectItem>
                          </SelectContent>
                        </Select>
                      </div>

                      <div>
                        <Label htmlFor="widgetWidth">Width</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.referralWidget.width]}
                            onValueChange={(value) => handleCustomizationChange("referralWidget", "width", value[0])}
                            min={200}
                            max={500}
                            step={10}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.referralWidget.width}px
                          </span>
                        </div>
                      </div>

                      <div>
                        <Label htmlFor="borderRadius">Border Radius</Label>
                        <div className="flex items-center space-x-2">
                          <Slider
                            value={[customization.referralWidget.borderRadius]}
                            onValueChange={(value) => handleCustomizationChange("referralWidget", "borderRadius", value[0])}
                            max={50}
                            step={1}
                            className="flex-1"
                          />
                          <span className="text-sm text-gray-600 w-12">
                            {customization.referralWidget.borderRadius}px
                          </span>
                        </div>
                      </div>

                      <div className="flex items-center justify-between">
                        <Label htmlFor="shadow">Drop Shadow</Label>
                        <Switch
                          id="shadow"
                          checked={customization.referralWidget.shadow}
                          onCheckedChange={(checked) => handleCustomizationChange("referralWidget", "shadow", checked)}
                        />
                      </div>
                    </CardContent>
                  </Card>
                </div>
              )}

              {/* Embed Code */}
              {showCode && (
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Code className="w-5 h-5 mr-2" />
                      Embed Code
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="relative">
                      <pre className="bg-gray-900 text-green-400 p-4 rounded-lg text-xs overflow-x-auto">
                        <code>{generateEmbedCode()}</code>
                      </pre>
                      <Button
                        size="sm"
                        className="absolute top-2 right-2"
                        onClick={() => copyToClipboard(generateEmbedCode())}
                      >
                        {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              )}
            </div>

            {/* Preview Panel */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <CardTitle className="flex items-center">
                      <Eye className="w-5 h-5 mr-2" />
                      Live Preview
                    </CardTitle>
                    <div className="flex items-center space-x-2">
                      {deviceOptions.map((device) => (
                        <Button
                          key={device.id}
                          variant={activeDevice === device.id ? "default" : "outline"}
                          size="sm"
                          onClick={() => setActiveDevice(device.id)}
                        >
                          {device.icon}
                          <span className="ml-2 hidden sm:inline">{device.name}</span>
                        </Button>
                      ))}
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className={`mx-auto bg-gray-100 rounded-lg overflow-hidden ${
                    activeDevice === "mobile" ? "max-w-sm" : 
                    activeDevice === "tablet" ? "max-w-2xl" : 
                    "max-w-6xl"
                  }`}>
                    <div className="bg-white min-h-96 relative">
                      {activeElement === "referral-widget" && <ReferralWidgetPreview />}
                      {activeElement === "referral-page" && <ReferralPagePreview />}
                      {activeElement === "email-templates" && <EmailTemplatePreview />}
                      {activeElement === "social-sharing" && <SocialSharingPreview />}
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </main>

      {/* Color Picker Modal */}
      <Dialog open={showColorPicker} onOpenChange={setShowColorPicker}>
        <DialogContent className="max-w-md">
          <DialogHeader>
            <DialogTitle>Select Color</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            {/* Predefined Colors */}
            <div>
              <Label className="text-sm font-medium mb-2 block">Predefined Colors</Label>
              <div className="grid grid-cols-8 gap-2">
                {predefinedColors.map((color) => (
                  <button
                    key={color}
                    className="w-8 h-8 rounded-lg border-2 border-gray-200 hover:border-gray-400 transition-colors"
                    style={{ backgroundColor: color }}
                    onClick={() => handleColorSelect(color)}
                  />
                ))}
              </div>
            </div>

            {/* Custom Color Input */}
            <div>
              <Label htmlFor="customColor" className="text-sm font-medium mb-2 block">Custom Color</Label>
              <div className="flex items-center space-x-2">
                <Input
                  id="customColor"
                  type="color"
                  className="w-12 h-10 p-1 border-gray-300"
                  onChange={(e) => handleColorSelect(e.target.value)}
                />
                <Input
                  placeholder="#000000"
                  className="flex-1"
                  onChange={(e) => {
                    if (e.target.value.match(/^#[0-9A-F]{6}$/i)) {
                      handleColorSelect(e.target.value);
                    }
                  }}
                />
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
}