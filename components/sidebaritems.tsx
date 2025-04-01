import { UseContent } from "@/hooks/useContent";
import { ReactElement } from "react";

interface Isidebaricon {
    text: string;
    icon: ReactElement
}


export function SidebarIcon ({text, icon}: Isidebaricon){
    return <div className="flex py-1 cursor-pointer hover:bg-blue-300 rounded pl-2 max-w-44 ">
        <div className="p-2 ">
        {icon} 
        </div>
        <div className="p-2 text-gray-800">
        {text}
        </div>
    </div>
}

export function FilterPost(type: string){
    const {content, loading, error} = UseContent();
    const filterContents = content.filter(x => x.type == "youtube")
    return {filterContents, loading, error};
}