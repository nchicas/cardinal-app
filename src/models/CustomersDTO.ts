export interface CustomersDTO {
  customers: Customer[];
}

export interface Customer {
  bank_id: string;
  customer_id: string;
  customer_number: string;
  legal_name: string;
  mobile_phone_number: string;
  email: string;
  face_image: FaceImage;
  date_of_birth: Date;
  relationship_status: string;
  dependants: number;
  dob_of_dependants: any[];
  credit_rating: CreditRating;
  credit_limit: CreditLimit;
  highest_education_attained: string;
  employment_status: string;
  kyc_status: boolean;
  last_ok_date: Date;
  title: string;
  branch_id: string;
  name_suffix: string;
  customer_attributes: any[];
}

export interface CreditLimit {
  currency: string;
  amount: string;
}

export interface CreditRating {
  rating: string;
  source: string;
}

export interface FaceImage {
  url: string;
  date: Date;
}
