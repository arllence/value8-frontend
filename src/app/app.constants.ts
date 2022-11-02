// export let serverurl = 'http://127.0.0.1:8000';
export let serverurl = 'http://20.102.106.83:5702';

export let API_VERSION = '/api/v1/';
export let loginurl = serverurl + API_VERSION + 'authentication/login';
export let signupurl = serverurl + API_VERSION + 'authentication/create-account';

export let verify_email_url = serverurl + API_VERSION + 'authentication/verify-email';
export let resend_otp_url = serverurl + API_VERSION + 'authentication/resend-otp';
export let user_reset_password_url = serverurl + API_VERSION + 'authentication/reset-user-password';
export let reset_password_page_url = serverurl + API_VERSION + 'authentication/reset-password';
export let send_password_reset_link_url = serverurl + API_VERSION + 'authentication/send-password-reset-link';

export let create_profile_url = serverurl + API_VERSION + 'account-management/create-profile';
export let create_innovator_due_diligence_url = serverurl + API_VERSION + 'account-management/innovator-due-diligence';
export let create_agent_due_diligence_url = serverurl + API_VERSION + 'account-management/agent-due-diligence';
export let create_technical_evaluation_url = serverurl + API_VERSION + 'account-management/create-technical-evaluation';
export let get_results_url = serverurl + API_VERSION + 'account-management/results';
export let get_all_results_url = serverurl + API_VERSION + 'account-management/all-results';
export let get_summary_results_url = serverurl + API_VERSION + 'account-management/results-summary';
export let create_winner_url = serverurl + API_VERSION + 'account-management/create-winner';
export let create_gap_analysis_url = serverurl + API_VERSION + 'account-management/gap-analysis';
export let create_enterprenuer_gap_analysis_url = serverurl + API_VERSION + 'account-management/enterprenuer-gap-analysis';
export let get_enterprenuer_gap_analysis_url = serverurl + API_VERSION + 'account-management/get-enterprenuer-gap-analysis';
export let get_gap_analysis_url = serverurl + API_VERSION + 'account-management/get-gap-analysis';
export let list_staff_url = serverurl + API_VERSION + 'account-management/filter-by-email';
export let get_user_details_url = serverurl + API_VERSION + 'account-management/get-user-details';
export let get_user_roles_url = serverurl + API_VERSION + 'account-management/list-user-roles';

// Superuser
export let award_user_role_url = serverurl + API_VERSION + 'superuser/award-role';
export let revoke_user_role_url = serverurl + API_VERSION + 'superuser/revoke-role';
export let user_registration_form_url = serverurl + API_VERSION + 'superuser/user-registration-form';
export let create_user_url = serverurl + API_VERSION + 'superuser/create-user';
export let swap_user_department_url = serverurl + API_VERSION + 'superuser/swap-user-department';
export let suspend_user_url = serverurl + API_VERSION + 'superuser/suspend-user';
export let unsuspend_user_url = serverurl + API_VERSION + 'superuser/un-suspend-user';
export let reset_password_url = serverurl + API_VERSION + 'superuser/reset-user-password';
export let change_password_url = serverurl + API_VERSION + 'account-management/change-password';
export let edit_user_url = serverurl + API_VERSION + 'superuser/edit-user';

export let list_user_roles = serverurl + API_VERSION + 'account-management/list-roles';
export let list_users_with_role = serverurl + API_VERSION + 'account-management/list-users-with-role';
export let list_departments = serverurl + API_VERSION + 'department';

// ng build --prod --aot --build-optimizer  --output-path /Users/africancoder/Documents/edms_front_build --watch --output-hashing none
// ng build --prod --aot --build-optimizer  --watch --output-hashing none





// core module
export let create_product_url = serverurl + API_VERSION + 'store/create-product';
export let list_products_url = serverurl + API_VERSION + 'store/fetch-products';
export let buy_product_url = serverurl + API_VERSION + 'store/buy-product';
export let list_reorders_url = serverurl + API_VERSION + 'store/fetch-reorder';
export let create_dispatch_url = serverurl + API_VERSION + 'store/dispatch';