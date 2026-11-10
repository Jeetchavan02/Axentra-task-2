import { useState } from "react";
import { 
  Share, 
  Copy, 
  Check, 
  Gift, 
  Users, 
  Target, 
  Star,
  DollarSign,
  TrendingUp,
  MessageSquare,
  Facebook,
  Twitter,
  Instagram,
  CheckCircle,
  Crown,
  Clock
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@src/components/ui/card";
import { Button } from "@src/components/ui/button";
import { Input } from "@src/components/ui/input";
import { Label } from "@src/components/ui/label";
import { Badge } from "@src/components/ui/badge";
import { Progress } from "@src/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@src/components/ui/tabs";

export default function CustomerFacingReferrals() {
  const [copied, setCopied] = useState(false);
  const [referralCode] = useState("SARAH2025");
  const [referralLink] = useState("https://yourstore.com/ref/SARAH2025");
  const [userStats] = useState({
    totalReferrals: 12,
    completedReferrals: 8,
    totalEarned: 240,
    pendingRewards: 80,
    currentTier: "Gold",
    nextTier: "Platinum",
    progressToNext: 65
  });

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const recentReferrals = [
    { name: "Emma Johnson", status: "completed", reward: 25, date: "2025-01-06" },
    { name: "Mike Chen", status: "pending", reward: 30, date: "2025-01-04" },
    { name: "Lisa Davis", status: "completed", reward: 25, date: "2025-01-02" },
    { name: "Alex Wilson", status: "pending", reward: 25, date: "2024-12-28" }
  ];

  const tierBenefits = [
    { tier: "Bronze", min: 0, max: 4, reward: "5%", bonus: "Welcome bonus" },
    { tier: "Silver", min: 5, max: 14, reward: "7%", bonus: "Priority support" },
    { tier: "Gold", min: 15, max: 29, reward: "10%", bonus: "Exclusive offers" },
    { tier: "Platinum", min: 30, max: 49, reward: "15%", bonus: "Personal advisor" },
    { tier: "Diamond", min: 50, max: null, reward: "20%", bonus: "VIP treatment" }
  ];

  const socialShareOptions = [
    {
      platform: "Facebook",
      icon: <Facebook className="w-5 h-5" />,
      color: "bg-blue-600",
      message: "Check out this amazing store I found! Use my link and get 10% off your first order 🛍️"
    },
    {
      platform: "Twitter",
      icon: <Twitter className="w-5 h-5" />,
      color: "bg-blue-400",
      message: "Found an awesome store with great products! Get 10% off with my referral link 🎁"
    },
    {
      platform: "Instagram",
      icon: <Instagram className="w-5 h-5" />,
      color: "bg-pink-600",
      message: "Loving this store! Use my code for 10% off your first order ✨"
    },
    {
      platform: "WhatsApp",
      icon: <MessageSquare className="w-5 h-5" />,
      color: "bg-green-600",
      message: "Hey! I found this great store. Use my referral link to get 10% off!"
    }
  ];

  const howItWorks = [
    {
      step: 1,
      title: "Share Your Link",
      description: "Share your unique referral link with friends and family through social media, email, or messaging apps.",
      icon: <Share className="w-6 h-6" />
    },
    {
      step: 2,
      title: "Friends Purchase",
      description: "Your friends click your link and make their first purchase. They get a discount, and you get notified.",
      icon: <Users className="w-6 h-6" />
    },
    {
      step: 3,
      title: "Earn Rewards",
      description: "You earn rewards for every successful referral. The more you refer, the higher your tier and rewards!",
      icon: <Gift className="w-6 h-6" />
    }
  ];

  const testimonials = [
    {
      name: "Sarah Johnson",
      avatar: "SJ",
      tier: "Gold",
      text: "I've earned over $500 just by sharing with my friends! The products are amazing and the rewards are generous.",
      earned: 512,
      referrals: 23
    },
    {
      name: "Michael Chen",
      avatar: "MC",
      tier: "Platinum",
      text: "Best referral program I've ever used. The tiered system motivates me to keep sharing, and my friends love the discounts.",
      earned: 1250,
      referrals: 47
    },
    {
      name: "Emma Davis",
      avatar: "ED",
      tier: "Diamond",
      text: "The VIP treatment at Diamond tier is incredible. Personal advisor and exclusive offers make it so worth it!",
      earned: 2340,
      referrals: 89
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-purple-50">
      {/* Hero Section */}
      <div className="bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="text-center">
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center">
                <Share className="w-8 h-8 text-white" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-gray-900 mb-4">
              Refer Friends & Earn Amazing Rewards
            </h1>
            <p className="text-xl text-gray-600 mb-8 max-w-2xl mx-auto">
              Share your unique link and earn rewards for every successful referral. The more you share, the more you earn!
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                <Gift className="w-5 h-5 mr-2" />
                Get My Referral Link
              </Button>
              <Button size="lg" variant="outline">
                <TrendingUp className="w-5 h-5 mr-2" />
                View My Dashboard
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          <div className="text-center">
            <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Users className="w-6 h-6 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">12,847</div>
            <div className="text-gray-600">Happy Referrers</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <DollarSign className="w-6 h-6 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">$247,850</div>
            <div className="text-gray-600">Total Rewards Earned</div>
          </div>
          <div className="text-center">
            <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Target className="w-6 h-6 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-gray-900">18.5%</div>
            <div className="text-gray-600">Average Conversion Rate</div>
          </div>
        </div>

        {/* How It Works */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">How It Works</h2>
          <p className="text-lg text-gray-600 mb-12">Get started in three simple steps</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {howItWorks.map((step, index) => (
              <div key={index} className="relative">
                <div className="bg-white p-8 rounded-2xl shadow-lg hover:shadow-xl transition-shadow">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-white">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
                </div>
                {index < howItWorks.length - 1 && (
                  <div className="hidden md:block absolute top-16 left-full w-8 h-0.5 bg-gray-300 transform -translate-x-4"></div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Referral Dashboard */}
        <div className="bg-white rounded-2xl shadow-lg p-8 mb-16">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl font-bold text-gray-900">Your Referral Dashboard</h2>
            <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
              <Crown className="w-4 h-4 mr-1" />
              {userStats.currentTier} Member
            </Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-blue-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-blue-600">Total Referrals</span>
                <Share className="w-4 h-4 text-blue-600" />
              </div>
              <div className="text-2xl font-bold text-blue-900">{userStats.totalReferrals}</div>
            </div>
            <div className="bg-green-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-green-600">Completed</span>
                <CheckCircle className="w-4 h-4 text-green-600" />
              </div>
              <div className="text-2xl font-bold text-green-900">{userStats.completedReferrals}</div>
            </div>
            <div className="bg-purple-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-purple-600">Total Earned</span>
                <DollarSign className="w-4 h-4 text-purple-600" />
              </div>
              <div className="text-2xl font-bold text-purple-900">${userStats.totalEarned}</div>
            </div>
            <div className="bg-orange-50 p-6 rounded-lg">
              <div className="flex items-center justify-between mb-2">
                <span className="text-sm font-medium text-orange-600">Pending</span>
                <Clock className="w-4 h-4 text-orange-600" />
              </div>
              <div className="text-2xl font-bold text-orange-900">${userStats.pendingRewards}</div>
            </div>
          </div>

          {/* Tier Progress */}
          <div className="bg-gradient-to-r from-blue-50 to-purple-50 p-6 rounded-lg mb-8">
            <div className="flex items-center justify-between mb-4">
              <div>
                <h3 className="font-semibold text-gray-900">Progress to {userStats.nextTier}</h3>
                <p className="text-sm text-gray-600">
                  {15 - userStats.completedReferrals} more referrals to unlock {userStats.nextTier} tier
                </p>
              </div>
              <div className="text-right">
                <div className="text-sm text-gray-600">Current Tier</div>
                <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white">
                  {userStats.currentTier}
                </Badge>
              </div>
            </div>
            <Progress value={userStats.progressToNext} className="h-3" />
          </div>

          {/* Referral Tools */}
          <Tabs defaultValue="share" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="share">Share & Earn</TabsTrigger>
              <TabsTrigger value="activity">Recent Activity</TabsTrigger>
              <TabsTrigger value="tiers">Tier Benefits</TabsTrigger>
            </TabsList>
            
            <TabsContent value="share" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Share className="w-5 h-5 mr-2" />
                      Your Referral Link
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="referralCode">Referral Code</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="referralCode"
                          value={referralCode}
                          readOnly
                          className="font-mono"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(referralCode)}
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="referralLink">Referral Link</Label>
                      <div className="flex items-center space-x-2">
                        <Input
                          id="referralLink"
                          value={referralLink}
                          readOnly
                          className="font-mono text-sm"
                        />
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => copyToClipboard(referralLink)}
                        >
                          {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <MessageSquare className="w-5 h-5 mr-2" />
                      Share on Social Media
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="grid grid-cols-2 gap-3">
                      {socialShareOptions.map((option, index) => (
                        <Button
                          key={index}
                          variant="outline"
                          className={`${option.color} text-white hover:opacity-80`}
                          onClick={() => {
                            const shareUrl = `https://${option.platform.toLowerCase()}.com/share?url=${encodeURIComponent(referralLink)}&text=${encodeURIComponent(option.message)}`;
                            window.open(shareUrl, '_blank');
                          }}
                        >
                          {option.icon}
                          <span className="ml-2">{option.platform}</span>
                        </Button>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
            
            <TabsContent value="activity" className="space-y-4">
              <div className="space-y-4">
                {recentReferrals.map((referral, index) => (
                  <div key={index} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                        <Users className="w-5 h-5 text-blue-600" />
                      </div>
                      <div>
                        <p className="font-medium text-gray-900">{referral.name}</p>
                        <p className="text-sm text-gray-600">{referral.date}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-3">
                      <div className="text-right">
                        <p className="font-medium text-gray-900">${referral.reward}</p>
                        <Badge className={referral.status === 'completed' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'}>
                          {referral.status}
                        </Badge>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="tiers" className="space-y-4">
              <div className="space-y-4">
                {tierBenefits.map((tier, index) => (
                  <div key={index} className={`p-4 rounded-lg border-2 ${
                    tier.tier === userStats.currentTier ? 'border-blue-500 bg-blue-50' : 'border-gray-200'
                  }`}>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-3">
                        <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                          tier.tier === 'Diamond' ? 'bg-purple-600' :
                          tier.tier === 'Platinum' ? 'bg-gray-600' :
                          tier.tier === 'Gold' ? 'bg-yellow-500' :
                          tier.tier === 'Silver' ? 'bg-gray-400' :
                          'bg-orange-600'
                        } text-white`}>
                          {tier.tier === 'Diamond' ? <Crown className="w-4 h-4" /> :
                           tier.tier === 'Platinum' ? <Star className="w-4 h-4" /> :
                           tier.tier === 'Gold' ? <Star className="w-4 h-4" /> :
                           tier.tier === 'Silver' ? <Star className="w-4 h-4" /> :
                           <Star className="w-4 h-4" />}
                        </div>
                        <div>
                          <h3 className="font-semibold text-gray-900">{tier.tier}</h3>
                          <p className="text-sm text-gray-600">
                            {tier.min} - {tier.max || '∞'} referrals
                          </p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold text-gray-900">{tier.reward} commission</p>
                        <p className="text-sm text-gray-600">{tier.bonus}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Testimonials */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold text-gray-900 mb-4">What Our Referrers Say</h2>
          <p className="text-lg text-gray-600 mb-12">Join thousands of satisfied referrers earning rewards</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white p-6 rounded-2xl shadow-lg">
                <div className="flex items-center mb-4">
                  <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center text-white font-bold">
                    {testimonial.avatar}
                  </div>
                  <div className="ml-3">
                    <h4 className="font-semibold text-gray-900">{testimonial.name}</h4>
                    <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white text-xs">
                      {testimonial.tier}
                    </Badge>
                  </div>
                </div>
                <p className="text-gray-600 mb-4 italic">"{testimonial.text}"</p>
                <div className="flex justify-between text-sm text-gray-500">
                  <span>${testimonial.earned} earned</span>
                  <span>{testimonial.referrals} referrals</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-purple-600 rounded-2xl p-12 text-center text-white">
          <h2 className="text-3xl font-bold mb-4">Ready to Start Earning?</h2>
          <p className="text-xl mb-8 opacity-90">
            Join thousands of referrers who are already earning amazing rewards
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-white text-blue-600 hover:bg-gray-100">
              <Share className="w-5 h-5 mr-2" />
              Get My Referral Link
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-blue-600">
              <TrendingUp className="w-5 h-5 mr-2" />
              View Program Details
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}