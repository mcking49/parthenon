import { Image } from './image';

export interface Profile {
  firstName: string;
  lastName: string;
  jobTitle: string;
  email: string;
  phone: string;
  linkedInUrl: string;
  profileImg: Image;
}
