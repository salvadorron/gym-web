import { User } from '@/lib/definitions';
import { useState, useEffect } from 'react';

interface NavItem {
  label: string;
  path: string;
  roles?: string[];
  hide?: boolean;
}

const useAuthNavigation = (navItems: NavItem[], user: User): NavItem[] => {

  const userRole = user.roleId;

  const [navList, setNavList] = useState<NavItem[]>([]);

  const filterNavItems = () => {
    const newFilteredItems = navItems.filter(navItem => {
      if (!navItem.roles || navItem.roles.length === 0) {
        return true;
      }
      return userRole && navItem.roles.some(role => userRole.includes(role));
    });
    setNavList(newFilteredItems);
  };


  useEffect(() => filterNavItems(), [navItems, userRole]);

  return navList;
};

export default useAuthNavigation;
