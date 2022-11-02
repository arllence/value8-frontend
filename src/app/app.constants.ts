// export let serverurl = 'http://127.0.0.1:8000';
// export let serverurl = 'http://20.228.242.203/backend';
// export let serverurl = 'http://51.12.248.43/gca_backend';
export let serverurl = 'https://youthadapt.africa/gca_backend';
// export let serverurl = 'https://applications.youthadapt.africa/applications_backend';

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

// Meetings
export let create_meeting_url = serverurl + API_VERSION + 'superuser/create-meeting-link';
export let delete_meeting_url = serverurl + API_VERSION + 'superuser/delete-meeting-link';
export let fetch_meeting_url = serverurl + API_VERSION + 'superuser/fetch-meeting-link';

// General
export let fetch_general_meeting_url = serverurl + API_VERSION + 'general/fetch-meeting-link';

// CommunicationComponent
export let send_email_url = serverurl + API_VERSION + 'communication/send-mail';
export let get_emails_url = serverurl + API_VERSION + 'communication/get-mails';
export let get_analytics_url = serverurl + API_VERSION + 'communication/get-analytics';



//Application
export let create_application_url = serverurl + API_VERSION + 'application/create-application';

//Innovation
export let create_eligibility_url = serverurl + API_VERSION + 'innovation/create-eligibility';
export let create_details_url = serverurl + API_VERSION + 'innovation/create-details';
export let create_proposal_url = serverurl + API_VERSION + 'innovation/create-proposal';
export let create_additional_info_url = serverurl + API_VERSION + 'innovation/create-additional-info';
export let create_declaration_url = serverurl + API_VERSION + 'innovation/create-declaration';
export let create_attachments_url = serverurl + API_VERSION + 'innovation/create-attachments';
export let delete_attachments_url = serverurl + API_VERSION + 'innovation/delete-attachments';
export let fetch_eligibility_url = serverurl + API_VERSION + 'innovation/fetch-eligibility';
export let fetch_details_url = serverurl + API_VERSION + 'innovation/fetch-details';
export let fetch_proposal_url = serverurl + API_VERSION + 'innovation/fetch-proposal';
export let fetch_additional_info_url = serverurl + API_VERSION + 'innovation/fetch-additional-information';
export let fetch_declaration_url = serverurl + API_VERSION + 'innovation/fetch-declaration';
export let fetch_full_application_url = serverurl + API_VERSION + 'innovation/fetch-full-application';
export let fetch_files_url = serverurl + API_VERSION + 'innovation/fetch-files';


// Reports
export let fetch_innovations_url = serverurl + API_VERSION + 'reports/filter-innovations';
export let fetch_general_analytics_url = serverurl + API_VERSION + 'reports/summary-report-analytics';
export let download_application_url = serverurl + API_VERSION + 'reports/full-download';







export let create_certification_url = serverurl + API_VERSION + 'account-management/create-certification';
export let delete_certification_url = serverurl + API_VERSION + 'account-management/delete-certification';
export let get_certifications_url = serverurl + API_VERSION + 'account-management/get-certifications';

export let create_association_url = serverurl + API_VERSION + 'account-management/create-association';
export let delete_association_url = serverurl + API_VERSION + 'account-management/delete-association';
export let get_associations_url = serverurl + API_VERSION + 'account-management/get-associations';




export let create_hobby_url = serverurl + API_VERSION + 'account-management/create-hobby';
export let delete_hobby_url = serverurl + API_VERSION + 'account-management/delete-hobby';
export let get_hobbies_url = serverurl + API_VERSION + 'account-management/get-hobbies';

export let check_completed_profile = serverurl + API_VERSION + 'account-management/check-completed-profile';
export let get_complete_profile = serverurl + API_VERSION + 'account-management/user-profile';
export let upload_document_url = serverurl + API_VERSION + 'account-management/upload-document';



export let my_innovations_url = serverurl + API_VERSION + 'account-management/my-innovations';
export let get_submission_url = serverurl + API_VERSION + 'account-management/get-submission';
export let create_qa_review_url = serverurl + API_VERSION + 'account-management/create-qa-review';




export let support_services_url = serverurl + API_VERSION + 'admin-management/support-services';
export let industries_url = serverurl + API_VERSION + 'admin-management/industries';
export let development_stages_url = serverurl + API_VERSION + 'admin-management/development-stages';
export let intellectual_properties_url = serverurl + API_VERSION + 'admin-management/intellectual-properties';
export let hubs_url = serverurl + API_VERSION + 'admin-management/hubs';
export let innovation_skills_url = serverurl + API_VERSION + 'admin-management/innovation-skills';
export let employment_status_url = serverurl + API_VERSION + 'admin-management/employment-status';
export let fetch_countries_url = serverurl + API_VERSION + 'admin-management/fetch-countries';
export let fetch_deadline_url = serverurl + API_VERSION + 'admin-management/fetch-deadlines';

export let innovation_id_url = serverurl + API_VERSION + 'innovation/innovation-id';
export let create_innovation_url = serverurl + API_VERSION + 'innovation/create-innovation';
export let innovation_details_url = serverurl + API_VERSION + 'innovation/innovation-details';
export let update_innovation_details_url = serverurl + API_VERSION + 'innovation/update-innovation-details';
export let innovation_information_url = serverurl + API_VERSION + 'innovation/innovation-information';
export let innovation_additional_details_url = serverurl + API_VERSION + 'innovation/innovation-additional-details';
export let innovation_review_url = serverurl + API_VERSION + 'innovation/innovation-review';
export let complete_innovation_url = serverurl + API_VERSION + 'innovation/complete-innovation';
export let get_innovation_details_url = serverurl + API_VERSION + 'innovation/get-innovation-details';
export let get_innovation_information_url = serverurl + API_VERSION + 'innovation/get-innovation-information';
export let get_innovation_additional_details_url = serverurl + API_VERSION + 'innovation/get-innovation-additional-details';
export let get_innovations_url = serverurl + API_VERSION + 'innovation/innovations';
export let get_assigned_innovations_url = serverurl + API_VERSION + 'innovation/assigned-innovations';

export let list_staff_url = serverurl + API_VERSION + 'account-management/filter-by-email';
export let get_user_details_url = serverurl + API_VERSION + 'account-management/get-user-details';

// Evaluation
export let change_application_status_url = serverurl + API_VERSION + 'evaluation/change-application-status';
export let create_evaluation_url = serverurl + API_VERSION + 'evaluation/create-evaluation';
export let create_jury_evaluation_url = serverurl + API_VERSION + 'evaluation/create-jury-evaluation';
export let is_evaluated_url = serverurl + API_VERSION + 'evaluation/is-evaluated';
export let evaluated_innovation_url = serverurl + API_VERSION + 'evaluation/evaluated-innovation';
export let filter_assigned_url = serverurl + API_VERSION + 'evaluation/assigned-roles';
export let reassign_applications_url = serverurl + API_VERSION + 'evaluation/re-assigned-applications';
export let fetch_evaluation_url = serverurl + API_VERSION + 'evaluation/fetch-evaluation';
export let fetch_jury_evaluation_url = serverurl + API_VERSION + 'evaluation/fetch-jury-evaluation';
export let fetch_evaluation_results_url = serverurl + API_VERSION + 'evaluation/results';
export let create_top_50_url = serverurl + API_VERSION + 'evaluation/create-top-50';
export let fetch_groups_url = serverurl + API_VERSION + 'evaluation/fetch-groups';
export let fetch_top50_unassigned_url = serverurl + API_VERSION + 'evaluation/fetch-top50-unassigned';
export let fetch_user_roles_url = serverurl + API_VERSION + 'evaluation/list-user-roles';
export let create_groups_url = serverurl + API_VERSION + 'evaluation/create-groups';






export let create_note_url = serverurl + API_VERSION + 'evaluation/create-note';
export let get_notes_url = serverurl + API_VERSION + 'evaluation/get-notes';
export let delete_note_url = serverurl + API_VERSION + 'evaluation/delete-note';

export let create_group_url = serverurl + API_VERSION + 'evaluation/create-group';
export let get_groups_url = serverurl + API_VERSION + 'evaluation/get-groups';

export let create_review_url = serverurl + API_VERSION + 'evaluation/create-review';
export let get_my_innovation_reviews_url = serverurl + API_VERSION + 'evaluation/get-my-innovation-reviews';

export let create_innovation_manager_review = serverurl + API_VERSION + 'evaluation/create-innovation-manager-review';
export let get_innovation_manager_review_url = serverurl + API_VERSION + 'evaluation/get-innovation-manager-review';
export let create_final_im_review_url = serverurl + API_VERSION + 'evaluation/create-final-innovation-manager-review';

export let create_assignment_url = serverurl + API_VERSION + 'evaluation/create-assignment';
export let get_assignments_url = serverurl + API_VERSION + 'evaluation/get-assignments';
export let get_innovator_assignments_url = serverurl + API_VERSION + 'evaluation/get-innovator-assignments';
export let delete_assignment_url = serverurl + API_VERSION + 'evaluation/delete-assignment';

// Analytics
export let general_counts_url = serverurl + API_VERSION + 'analytics/general-counts';
export let monthly_user_registration_url = serverurl + API_VERSION + 'analytics/monthly-user-registration';
export let user_by_gender_url = serverurl + API_VERSION + 'analytics/user-by-gender';
export let user_by_country_url = serverurl + API_VERSION + 'analytics/user-by-country';
export let get_analytics_results_url = serverurl + API_VERSION + 'analytics/results-summary';
export let filter_by_language_url = serverurl + API_VERSION + 'analytics/applications-by-language';
export let application_by_age_url = serverurl + API_VERSION + 'analytics/applications-by-age';
export let application_by_gender_url = serverurl + API_VERSION + 'analytics/applications-by-gender';

// Analytics General
export let by_status_url = serverurl + API_VERSION + 'generated-analytics/by-status';
export let by_age_url = serverurl + API_VERSION + 'generated-analytics/by-age';
export let by_country_url = serverurl + API_VERSION + 'generated-analytics/by-country';
export let by_language_url = serverurl + API_VERSION + 'generated-analytics/by-language';
export let by_gender_url = serverurl + API_VERSION + 'generated-analytics/by-gender';

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










export let fileuploadurl = serverurl + API_VERSION + 'edms/clerk-view/upload-document';
export let clerk_uploaded_documents_url = serverurl + API_VERSION + 'edms/clerk-view/uploaded-documents';
export let clerk_pending_documents_url = serverurl + API_VERSION + 'edms/clerk-view/pending-metadata-capture-documents';
export let document_detail_url = serverurl + API_VERSION + 'edms/document/document-detail';
export let fixed_boundary_document_post = serverurl + API_VERSION + 'edms/document/post-fixed-survey-boundary-card';
export let clerk_rejected_documents_url = serverurl + API_VERSION + 'edms/clerk-view/rejected-documents';
export let clerk_approved_documents_url = serverurl + API_VERSION + 'edms/clerk-view/approved-documents';
export let clerk_resubmitted_url = serverurl + API_VERSION + 'edms/clerk-view/resubmitted-documents';
export let clerk_resubmit_document_url = serverurl + API_VERSION + 'edms/clerk-view/resubmit-document';
export let clerk_analytics_url = serverurl + API_VERSION + 'edms/clerk-view/analytics';
export let clerk_dashboard_analytics_url = serverurl + API_VERSION + 'edms/clerk-view/analytics';



export let list_departments = serverurl + API_VERSION + 'department';

// ng build --prod --aot --build-optimizer  --output-path /Users/africancoder/Documents/edms_front_build --watch --output-hashing none
// ng build --prod --aot --build-optimizer  --watch --output-hashing none




export let validators_approved_documents_url = serverurl + API_VERSION + 'edms/validator-view/approved-documents';
export let validators_rejected_documents_url = serverurl + API_VERSION + 'edms/validator-view/rejected-documents';
export let validators_pending_validation_documents_url = serverurl + API_VERSION + 'edms/validator-view/pending-validation-documents';
export let validators_dashboard_url = serverurl + API_VERSION + 'edms/validator-view/analytics';
export let validators_approve_document_url = serverurl + API_VERSION + 'edms/validator-view/approve-document';
export let validators_reject_document_url = serverurl + API_VERSION + 'edms/validator-view/reject-document';
export let validators_submit_for_approval_document_url = serverurl + API_VERSION + 'edms/validator-view/submit-for-approval-document';


export let filter_document_by_file_url = serverurl + API_VERSION + 'edms/document/filter-document-by-file-no';
export let filter_revoked_document_by_file_url = serverurl + API_VERSION + 'edms/document/filter-revoked-document-by-file-no';


export let fetch_document_records_url = serverurl + API_VERSION + 'edms/document/fetch-document-records';
export let fetch_document_record_details_url = serverurl + API_VERSION + 'edms/document/fetch-document-records-details';
export let fetch_user_document_types_url = serverurl + API_VERSION + 'edms/document-types/user-document-types';
export let fetch_document_type_fields_url = serverurl + API_VERSION + 'edms/document-types/get-document-fields';
export let post_document_fields_url = serverurl + API_VERSION + 'edms/clerk-view/post-document-records';
export let post_main_document_fields_url = serverurl + API_VERSION + 'edms/clerk-view/post-main-document-records';
export let get_user_roles_url = serverurl + API_VERSION + 'account-management/list-user-roles';
export let edit_document_record_url = serverurl + API_VERSION + 'edms/clerk-view/edit-document-record';
export let edit_main_document_record_url = serverurl + API_VERSION + 'edms/clerk-view/edit-main-document-record';


export let document_status_analytics_url = serverurl + API_VERSION + 'analytics/list-document-status';

export let list_data_clerks_url = serverurl + API_VERSION + 'analytics/list-data-clerks';
export let list_data_validators_url = serverurl + API_VERSION + 'analytics/list-data-validators';
export let list_departments_url = serverurl + API_VERSION + 'analytics/list-departments';


export let data_clerk_analytics_url = serverurl + API_VERSION + 'analytics/data-clerk-analytics';
export let data_validators_analytics_url = serverurl + API_VERSION + 'analytics/data-validator-analytics';
export let data_department_analytics_url = serverurl + API_VERSION + 'analytics/department-analytics';
export let data_document_status_analytics_url = serverurl + API_VERSION + 'analytics/document-status-analytics';

export let list_document_by_file_number_url = serverurl + API_VERSION + 'edms/document/filter-document-by-file-no';

export let create_department_url = serverurl + API_VERSION + 'edms/department/create';
export let edit_department_url = serverurl + API_VERSION + 'edms/department/edit-view';
export let list_department_url = serverurl + API_VERSION + 'edms/department/list-departments';
export let delete_department_url = serverurl + API_VERSION + 'edms/department/delete-view';
export let department_detail_url = serverurl + API_VERSION + 'edms/department/detail-view';


export let list_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/list-document-types';
export let create_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/create';
export let edit_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/edit-view';
export let delete_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/delete-view';
export let detail_document_types_url = serverurl + API_VERSION + 'edms/document-types-config/detail-view';


export let list_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/list-document-fields';
export let create_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/create';
export let edit_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/edit-view';
export let delete_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/delete-view';
export let detail_document_fields_url = serverurl + API_VERSION + 'edms/document-fields-config/detail-view';

export let list_input_types_url = serverurl + API_VERSION + 'edms/document-fields-config/list-input-types';
export let revoke_document_url = serverurl + API_VERSION + 'edms/document/revoke-document';

export let cleaner_post_validation_data_url = serverurl + API_VERSION + 'data-cleaning/post-cleaning-dataset-record';




export let data_cleaning_file_filter_url = serverurl + API_VERSION + 'data-cleaning/filter-document-by-file-no';



export let create_notifications_url = serverurl + API_VERSION + 'notices/create';
export let list_notifications_url = serverurl + API_VERSION + 'notices/list-notices';
export let delete_notifications_url = serverurl + API_VERSION + 'notices/create';
export let detail_notifications_url = serverurl + API_VERSION + 'notices/detail-view';
export let edit_notifications_url = serverurl + API_VERSION + 'notices/edit-view';
// ng serve --host 0.0.0.0


export let list_document_pending_revokation_url = serverurl + API_VERSION + 'edms/document-activity-view/pending-revokation-documents';
export let delete_document_records_details_url = serverurl + API_VERSION + 'edms/document-activity-view/delete-document-records-details';

export let post_document_swap_url = serverurl + API_VERSION + 'edms/document-types-config/swap-document-view';
export let document_approve_revoke_url = serverurl + API_VERSION + 'edms/document/approved-revoked-document';

export let create_document_comment_url = serverurl + API_VERSION + 'edms/validator-view/post-document-comment';


export let cleaning_create_document_types_url = serverurl + API_VERSION + 'data-cleaning/create-file-document-type-verified';
export let cleaning_update_document_types_url = serverurl + API_VERSION + 'data-cleaning/edit-file-document-type-verified';
export let cleaning_delete_document_types_url = serverurl + API_VERSION + 'data-cleaning/delete-file-document-type-verified';

export let data_cleaning_file_delete_url = serverurl + API_VERSION + 'data-cleaning/update-file';
export let data_cleaning_file_update_department = serverurl + API_VERSION + 'data-cleaning/update-file-department';



export let cleaning_create_parcel_information_url = serverurl + API_VERSION + 'data-cleaning/create-parcel-information';
export let cleaning_edit_parcel_information_url = serverurl + API_VERSION + 'data-cleaning/edit-parcel-information';


export let cleaning_create_parcel_owner_url = serverurl + API_VERSION + 'data-cleaning/create-parcel-owner-information';
export let cleaning_edit_parcel_owner_url = serverurl + API_VERSION + 'data-cleaning/edit-parcel-owner-information';
export let cleaning_delete_parcel_owner_url = serverurl + API_VERSION + 'data-cleaning/delete-parcel-owner-information';

export let list_entity_types_url = serverurl + API_VERSION + 'data-cleaning/list-entity-types';
export let start_data_cleaning_url = serverurl + API_VERSION + 'data-cleaning/start-data-cleaning';

export let change_data_cleaning_file_status_url = serverurl + API_VERSION + 'data-cleaning/post-file-status';
export let data_cleaning_file_comments_url = serverurl + API_VERSION + 'data-cleaning/file-comments';


export let data_cleaning_fetch_file_parcel_information_url = serverurl + API_VERSION + 'data-cleaning/file-parcel-information';

export let data_cleaning_fetch_document_type_verification_information_url = serverurl + API_VERSION + 'data-cleaning/file-document-type-verification-information';

export let list_cleaning_entity_types_url = serverurl + API_VERSION + 'data-cleaning/list-entity-types';
export let list_cleaning_parcel_numbering_types_url = serverurl + API_VERSION + 'data-cleaning/list-parcel-numbering-types';
export let list_cleaning_parcel_ownership_types_url = serverurl + API_VERSION + 'data-cleaning/list-parcel-ownership-types';
export let list_cleaning_parcel_status_url = serverurl + API_VERSION + 'data-cleaning/list-parcel-status';
export let list_cleaning_system_types_url = serverurl + API_VERSION + 'data-cleaning/list-cleaning-systems';
export let list_cleaning_ownership_rights_url = serverurl + API_VERSION + 'data-cleaning/list-ownership-rights';
export let list_cleaning_ownership_identification_types_url = serverurl + API_VERSION + 'data-cleaning/list-ownership-identification-types';
export let list_cleaning_file_status_url = serverurl + API_VERSION + 'data-cleaning/list-file-cleaning-status';


export let cleaning_create_parcel_beneficiary_url = serverurl + API_VERSION + 'data-cleaning/create-parcel-beneficiary';
export let cleaning_edit_parcel_beneficiary_url = serverurl + API_VERSION + 'data-cleaning/update-parcel-beneficiary';

export let cleaning_filter_parcel_owners_url = serverurl + API_VERSION + 'data-cleaning/filter-parcel-owners';
export let cleaning_filter_parcel_owners_beneficiaries_url = serverurl + API_VERSION + 'data-cleaning/filter-parcel-owners-beneficiaries';
export let cleaning_delete_parcel_beneficiary_url = serverurl + API_VERSION + 'data-cleaning/delete-parcel-owner-beneficiary';


