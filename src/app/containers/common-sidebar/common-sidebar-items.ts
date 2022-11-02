export interface INavAttributes {
  [propName: string]: any;
}
export interface INavWrapper {
  attributes: INavAttributes;
  element: string;
}
export interface INavBadge {
  text: string;
  variant: string;
  class?: string;
}
export interface INavLabel {
  class?: string;
  variant: string;
}
export interface INavLinkProps {
  queryParams?: {
      [k: string]: any;
  };
  fragment?: string;
  queryParamsHandling?: 'merge' | 'preserve' | '';
  preserveFragment?: boolean;
  skipLocationChange?: boolean;
  replaceUrl?: boolean;
  state?: {
      [k: string]: any;
  };
  routerLinkActiveOptions?: {
      exact: boolean;
  };
  routerLinkActive?: string | string[];
}
export interface INavData {
  name?: string;
  url?: string | any[];
  href?: string;
  permission?: any[];
  icon?: string;
  badge?: INavBadge;
  title?: boolean;
  children?: INavData[];
  variant?: string;
  attributes?: INavAttributes;
  divider?: boolean;
  class?: string;
  label?: INavLabel;
  wrapper?: INavWrapper;
  linkProps?: INavLinkProps;
}

export const navItems: INavData[] = [

  {
    title: true,
    name: 'Menu',
    permission: [''],
  },
  {
    name: 'Home',
    url: '/landing/home',
    icon: 'fa fa-home',
    permission: ['STORE','WAREHOUSE'],
  }, 
  {
    name: 'Management',
    url: '/administration/staff-registration',
    icon: 'fa fa-cog',
    permission: ['STORE','WAREHOUSE'],
    children: [
      {
        name: 'Staff Listing',
        url: '/administration/staff-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['STORE','WAREHOUSE']
      },
      {
        name: 'New Staff',
        url: '/administration/staff-registration',
        icon: 'fa fa-angle-double-right',
        permission: ['STORE','WAREHOUSE']
      },
      {
        name: 'Add Product',
        url: '/administration/add-product',
        icon: 'fa fa-angle-double-right',
        permission: ['STORE','WAREHOUSE','USER_MANAGER']
      },

    ]
  },
  


  // {
  //   name: 'Profile',
  //   url: '/profile',
  //   icon: 'fa fa-street-view',
  //   permission: []
  // }




  // {
  //   name: 'Logout',
  //   url: '/theme/typography',
  //   icon: 'icon-pencil'
  // },
];
