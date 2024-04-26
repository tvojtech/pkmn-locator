export interface Address {
  guid: string;
  type: string;
  name: string;
  full_address: string;
  formatted_address: string | null;
  street_address: string;
  secondary_address: string;
  location_map_link: string;
  address: string;
  country_code: string;
  country_code_alpha_3: string;
  latitude: number;
  longitude: number;
  state: string;
  city: string | null;
  country: string;
  postal_code: string;
}

export interface ContactInformation {
  contact_phone: string;
  contact_email: string;
  website: string;
}

export interface Metadata {
  details: string | null;
  category: string;
  update_key: string;
  contact_email: string;
  contact_phone: string;
  event_website: string;
  pcom_update_key: string;
  sanctioned_date: string;
  third_party_url: string | null;
  on_site_admission: string;
  pcom_sync_success: boolean;
  version_sync_history: {
    [key: string]: {
      success: boolean;
      update_key: string;
      sync_datetime: string;
    };
  };
  sanction_validation_data: any; // You can define a type for this if you have the structure
  on_site_registration_datetime: string;
  on_site_registration_duration: number;
}

export interface Activity {
  guid: string;
  address: Address;
  contact_information: ContactInformation;
  metadata: Metadata;
  name: string;
  payment_options: string;
  start_datetime: string;
  activity_type: string;
  large_event_guid: string;
  league_guid: string;
  tags: string[];
  activity_format: string;
  products: string[];
  status: string;
  when: string;
  premier_event_series_guid: string;
  pokemon_url: string;
  local_id: string;
  distance: number;
}

export interface ActivityData {
  activities: Activity[];
  activity_groups: Record<string, any>; // Define type if needed
}
