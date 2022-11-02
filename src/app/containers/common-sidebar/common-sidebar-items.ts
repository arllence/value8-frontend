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
    permission: ['INNOVATOR','EVALUATOR','JURY','SCREENER','MANAGER'],
  }, 
  {
    //Reports List
    name: 'Reports',
    url: '#',
    icon: 'fa fa-file',
    permission: ['MANAGER','SCREENER'],
    children: [
      {
        name: 'General',
        url: '/reports/applications',
        icon: 'fa fa-angle-double-right',
        permission: ['MANAGER','SCREENER']
      },
      {
        name: 'Reviewers',
        url: '/reports/reviewers',
        icon: 'fa fa-angle-double-right',
        permission: ['MANAGER']
      },
      {
        name: 'Evaluation',
        url: '/reports/evaluation',
        icon: 'fa fa-angle-double-right',
        permission: ['MANAGER']
      },
    ]
  }, 
  
  {
    name: 'Download',
    url: '#',
    icon: 'fa fa-download',
    permission: ['MANAGER', ],
    children: [
      {
        name: 'Applications',
        url: '/administration/retrieve-applications',
        icon: 'fa fa-files-o',
        permission: ['MANAGER']
      },
    ]
  },
  {
    name: 'Communication',
    url: '/administration/send-email',
    icon: 'fa fa-comments ',
    permission: ['SUPER_ADMIN','MANAGER' ],
    children: [
      {
        name: 'Send Emails',
        url: '/administration/send-email',
        icon: 'fa fa-at',
        permission: ['MANAGER']
      },
      {
        name: 'Retrieve Emails',
        url: '/administration/retrieve-mails',
        icon: 'fa fa-envelope',
        permission: ['MANAGER']
      },
    ]
  },
  {
    //Analytics List
    name: 'Analytics',
    url: '#',
    icon: 'fa fa-area-chart',
    permission: ['MANAGER','SUPER_ADMIN'],
    children: [
      {
        name: 'Evaluated',
        url: '/analytics/evaluated',
        icon: 'fa fa-angle-double-right',
        permission: ['MANAGER','SUPER_ADMIN']
      },
      {
        name: 'Dropped',
        url: '/analytics/dropped',
        icon: 'fa fa-angle-double-right',
        permission: ['MANAGER','SUPER_ADMIN']
      },
    ]
  }, 
  {
    name: 'User Management',
    url: '/administration/staff-registration',
    icon: 'fa fa-users',
    permission: ['USER_MANAGER', 'TEAM_LEADER', ],
    children: [
      {
        name: 'Staff Listing',
        url: '/administration/staff-listing',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER', 'TEAM_LEADER', 'ICT_SUPPORT']
      },
      {
        name: 'New Staff',
        url: '/administration/staff-registration',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      {
        name: 'New Group',
        url: '/administration/jury-groups',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      {
        name: 'Re-Assign',
        url: '/administration/re-assign',
        icon: 'fa fa-angle-double-right',
        permission: ['USER_MANAGER']
      },
      // {
      //   name: 'Meeting Links',
      //   url: '/administration/meeting-links',
      //   icon: 'fa fa-link',
      //   permission: ['USER_MANAGER']
      // }
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
