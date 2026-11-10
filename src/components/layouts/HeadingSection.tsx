// import { Button } from "@src/components/ui/button";
// import { ArrowLeft } from "lucide-react";
// import { useNavigate } from "react-router-dom";

// interface HeadingSectionProps {
//   heading: string;
//   subheading: string;
//   props?:  React.ReactElement | React.ReactElement[];
//   children?: React.ReactElement | React.ReactElement[];
//   isBack?: boolean;
// }

// const HeadingSection: React.FC<HeadingSectionProps> = ({ heading, subheading, props, children, isBack = false }) => {
//   const navigate = useNavigate();

//   return (
//     <div className="flex items-center justify-between gap-2 bg-white shadow-sm border-b py-4 px-6">
//       <div className="flex items-center gap-2 justify-between">
//         {isBack && (
//           <Button
//           variant={"ghost"}
//             onClick={() => navigate(-1)} // navigates to previous page
//             className="p-3 hover:bg-gray-100 rounded-full transition-colors"
//           >
//             <ArrowLeft className="w-5 h-5 text-gray-700" />
//           </Button>
//         )}
//         <div>
//           <h1 className="text-2xl font-medium text-gray-900">{heading}</h1>
//           <p className="text-sm text-gray-600 mt-1">{subheading}</p>
//         </div>
//       </div>
//       <div className="flex items-center justify-between gap-2">
//         {children}
//         {props}
//       </div>

//     </div>
//   );
// };

// export default HeadingSection;




import { Button } from "@src/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";


interface HeadingSectionProps {
  heading: string;
  subheading: string;
  props?: React.ReactElement | React.ReactElement[];
  children?: React.ReactElement | React.ReactElement[];
  isBack?: boolean;
}

const HeadingSection: React.FC<HeadingSectionProps> = ({ heading, subheading, props, children, isBack = false }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col bg-white shadow-sm border-b">
      <div className="flex items-center justify-end px-4 py-0.25">
        {/* <div ref={searchRef} className="relative w-full max-w-xl">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
            <input
              ref={inputRef}
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                if (e.target.value.length >= 2) setIsSearchOpen(true);
              }}
              onFocus={() => { if (searchQuery.length >= 2) setIsSearchOpen(true); }}
              placeholder="Search customers, leads, modules..."
              className="w-full h-9 pl-9 pr-10 text-sm bg-slate-50 border border-slate-200 rounded-lg outline-none focus:border-indigo-300 focus:ring-2 focus:ring-indigo-100 focus:bg-white transition-all placeholder:text-slate-400 placeholder:text-[14px]"
            />
            <div className="absolute right-2 top-1/2 -translate-y-1/2 flex items-center gap-1">
              {searchQuery && (
                <button
                  onClick={() => { setSearchQuery(""); setIsSearchOpen(false); }}
                  className="p-0.5 rounded hover:bg-slate-200 transition-colors"
                >
                  <X className="w-3.5 h-3.5 text-slate-400" />
                </button>
              )}
            </div>
          </div>
        </div> */}

        <div className="flex items-center gap-2 ml-4">
          {/* <Popover open={notificationsOpen} onOpenChange={setNotificationsOpen}>
            <PopoverTrigger asChild>
              <button className="relative p-2 rounded-lg hover:bg-slate-100 transition-colors">
                <Bell className="w-5 h-5 text-slate-600" />
                {unreadCount > 0 && (
                  <span className="absolute top-1 right-1 w-4 h-4 bg-red-500 text-white text-[9px] font-bold rounded-full flex items-center justify-center">{unreadCount}</span>
                )}
              </button>
            </PopoverTrigger>
            <PopoverContent className="w-[380px] p-0" align="end" sideOffset={8}>
              <div className="flex items-center justify-between px-4 py-3 border-b border-slate-100">
                <h3 className="text-sm font-semibold text-slate-800">Notifications</h3>
                <button onClick={markAllAsRead} className="text-xs text-indigo-600 hover:text-indigo-700 font-medium">Mark all as read</button>
              </div>
              <ScrollArea className="max-h-[400px]">
                <div className="py-1">
                  {notifications.map((notif) => {
                    const Icon = notif.icon;
                    return (
                      <button key={notif.id} className={`w-full flex items-start gap-3 px-4 py-3 hover:bg-slate-50 transition-colors text-left ${!notif.read ? "bg-indigo-50/40" : ""}`}>
                        <div className={`w-8 h-8 rounded-lg flex items-center justify-center shrink-0 mt-0.5 ${notifTypeColors[notif.type] || "bg-slate-100 text-slate-500"}`}>
                          <Icon className="w-4 h-4" />
                        </div>
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <p className={`text-sm truncate ${!notif.read ? "font-semibold text-slate-900" : "font-medium text-slate-700"}`}>{notif.title}</p>
                            {!notif.read && <div className="w-2 h-2 rounded-full bg-indigo-500 shrink-0 mt-1.5" />}
                          </div>
                          <p className="text-xs text-slate-500 mt-0.5 line-clamp-1">{notif.message}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[10px] text-slate-400 flex items-center gap-0.5"><Clock className="w-3 h-3" />{notif.time}</span>
                            <Badge variant="secondary" className="text-[9px] px-1.5 py-0">{notif.module}</Badge>
                          </div>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </ScrollArea>
              <div className="border-t border-slate-100 px-4 py-2">
                <button className="w-full text-center text-xs text-indigo-600 hover:text-indigo-700 font-medium py-1">View all notifications</button>
              </div>
            </PopoverContent>
          </Popover> */}

          {/* <Separator orientation="vertical" className="h-6 mx-1 bg-slate-200" /> */}

          {props}
        </div>
      </div>

      <div className="flex items-center justify-between gap-2 border-t py-4 px-6">
        <div className="flex items-center gap-2">
          {isBack && (
            <Button
              variant={"ghost"}
              onClick={() => navigate(-1)}
              className="p-3 hover:bg-gray-100 rounded-full transition-colors"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </Button>
          )}
          <div>
            <h1 className="text-xl font-semibold text-black tracking-[-0.4px]">{heading}</h1>
            <p className="text-sm text-gray-600 mt-1 tracking-[-0.16px]">{subheading}</p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          {children}
          {/* {props} */}
        </div>
      </div>
    </div>
  );
};

export default HeadingSection;