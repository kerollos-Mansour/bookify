import { Building2, HomeIcon, Home } from "lucide-react";

export default function Tabs({ activeTab, setActiveTab }) {
    return (
        <div className="bg-muted top-0 z-10 shadow-sm rounded-full mb-5 transition-colors duration-300">
            <div className="">
                <div className="flex items-center justify-evenly gap-1 py-3">
                    <button
                        onClick={() => setActiveTab("all")}
                        className={`flex items-center text-sm gap-2 px-4 lg:px-12 py-3 rounded-full transition-all ${activeTab === "all"
                            ? "bg-card text-card-foreground font-semibold shadow-sm"
                            : "text-muted-foreground hover:text-card-foreground hover:bg-card/50"
                            }`}
                    >
                        <HomeIcon className="w-4 h-4" />
                        All stays
                    </button>
                    <button
                        onClick={() => setActiveTab("hotels")}
                        className={`flex items-center text-sm gap-2 px-4 lg:px-12 py-3 rounded-full transition-all ${activeTab === "hotels"
                            ? "bg-card text-card-foreground font-semibold shadow-sm"
                            : "text-muted-foreground hover:text-card-foreground hover:bg-card/50"
                            }`}
                    >
                        <Building2 className="w-4 h-4" />
                        Hotels
                    </button>
                    <button
                        onClick={() => setActiveTab("homes")}
                        className={`flex items-center text-sm gap-2 px-4 lg:px-12 py-3 rounded-full transition-all ${activeTab === "homes"
                            ? "bg-card text-card-foreground font-semibold shadow-sm"
                            : "text-muted-foreground hover:text-card-foreground hover:bg-card/50"
                            }`}
                    >
                        <Home className="w-4 h-4" />
                        Homes
                    </button>
                </div>
            </div>
        </div>
    );
}
