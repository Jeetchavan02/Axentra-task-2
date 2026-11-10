// import React, { useState } from "react";
// import { Button } from "@src/components/ui/button";
// import { 
//   DropdownMenu, 
//   DropdownMenuContent, 
//   DropdownMenuItem, 
//   DropdownMenuTrigger 
// } from "@src/components/ui/dropdown-menu";
// import { useOnboarding } from "@src/hooks/use-onboarding";
// import { HelpCircle, Info, LifeBuoy, Clipboard, Lightbulb, RotateCcw } from "lucide-react";

// interface HelpButtonProps {
//   className?: string;
//   variant?: "ghost" | "outline";
//   size?: "default" | "sm" | "lg" | "icon";
//   showResetOption?: boolean;
// }

// export function HelpButton({ 
//   className, 
//   variant = "ghost", 
//   size = "icon",
//   showResetOption = false
// }: HelpButtonProps) {
//   const { 
//     resetOnboarding,
//     markIntroCompleted,
//     markDashboardTooltipsDismissed,
//     markCampaignTooltipsDismissed,
//     markAudienceTooltipsDismissed,
//     markTemplateTooltipsDismissed,
//     markReportTooltipsDismissed,
//     markEmailBuilderTooltipsDismissed
//   } = useOnboarding();
  
//   const handleOpenDashboardGuide = () => {
//     // Reset only the dashboard guide
//     markIntroCompleted();
//     markDashboardTooltipsDismissed();
    
//     // Then force reload to restart the guide
//     resetOnboarding();
//     window.location.href = "/";
//   };
  
//   const handleOpenCampaignGuide = () => {
//     // Reset only the campaign guide
//     markCampaignTooltipsDismissed();
    
//     // Then force reload to restart the guide
//     resetOnboarding();
//     window.location.href = "/campaigns/create";
//   };
  
//   const handleOpenAudienceGuide = () => {
//     // Reset only the audience guide
//     markAudienceTooltipsDismissed();
    
//     // Then force reload to restart the guide
//     resetOnboarding();
//     window.location.href = "/audience";
//   };
  
//   const handleResetAllGuides = () => {
//     resetOnboarding();
//     window.location.reload();
//   };
  
//   return (
//     <DropdownMenu>
//       <DropdownMenuTrigger asChild>
//         <Button variant={variant} size={size} className={className} aria-label="Help">
//           <HelpCircle className="h-[1.2rem] w-[1.2rem]" />
//         </Button>
//       </DropdownMenuTrigger>
//       <DropdownMenuContent align="end">
//         <DropdownMenuItem onClick={handleOpenDashboardGuide}>
//           <Clipboard className="mr-2 h-4 w-4" />
//           Dashboard Tour
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={handleOpenCampaignGuide}>
//           <Clipboard className="mr-2 h-4 w-4" />
//           Campaign Creation Guide
//         </DropdownMenuItem>
//         <DropdownMenuItem onClick={handleOpenAudienceGuide}>
//           <Clipboard className="mr-2 h-4 w-4" />
//           Audience Management Guide
//         </DropdownMenuItem>
//         <DropdownMenuItem>
//           <Lightbulb className="mr-2 h-4 w-4" />
//           AI Tools Guide
//         </DropdownMenuItem>
//         <DropdownMenuItem>
//           <Info className="mr-2 h-4 w-4" />
//           View Documentation
//         </DropdownMenuItem>
//         <DropdownMenuItem>
//           <LifeBuoy className="mr-2 h-4 w-4" />
//           Contact Support
//         </DropdownMenuItem>
//         {showResetOption && (
//           <DropdownMenuItem onClick={handleResetAllGuides}>
//             <RotateCcw className="mr-2 h-4 w-4" />
//             Reset All Guides
//           </DropdownMenuItem>
//         )}
//       </DropdownMenuContent>
//     </DropdownMenu>
//   );
// }