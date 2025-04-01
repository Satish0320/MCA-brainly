import { BrainIcon } from "../icons/brainicon";
import { Twittericon } from "../icons/twittericon";
import { Youtubeicon } from "../icons/youtubeicon";
import Container from "./container";
import { FilterPost, SidebarIcon } from "./sidebaritems";

export function Sidebar() {
  const {filterContents, loading, error} = FilterPost('youtube')
  return (
    <div className="h-screen bg-white shadow-lg w-60 fixed left-0 top-0 pl-6 pt-6">
      
      <div className="text-2xl flex items-center font-bold text-gray-800">
        <BrainIcon className="mr-2 w-8 h-8" /> 
        Brainly
      </div>

      
      <div className="pt-6 space-y-4">
        <SidebarIcon text="Twitter" icon={<Twittericon />} />
        <SidebarIcon text="YouTube" icon={<Youtubeicon />} />
      </div>
      
    </div>
  );
}
