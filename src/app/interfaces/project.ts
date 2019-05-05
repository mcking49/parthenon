
export interface Project {
  title: string;
  url: string | null; // The URL will only be null when a project is created as it is automatically generated.
  category: string;
  year: number;
  imageUrls: string[];
  logoUrl: string;
  brief: string[];
  conclusion?: string[];
}
