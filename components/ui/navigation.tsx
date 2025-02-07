'use client'

import routes from "../../lib/routes"
import useAuthNavigation from "../../hooks/useAuthNavigation"

export default function Navigation({ roleId }: { roleId: string | undefined }) {


    const navigationList = useAuthNavigation(routes, roleId); 
    

    return (
        <div className="hidden md:flex items-center space-x-8">
              {navigationList.map((item) => (
                <a key={item.path} href={item.path} className="relative text-gray-300 hover:text-blue-400 transition-colors group">
                  {item.label}
                  <span className="absolute inset-x-0 bottom-0 h-0.5 bg-blue-400 transform scale-x-0 group-hover:scale-x-100 transition-transform" />
                </a>
              ))}
            </div>
    )

}