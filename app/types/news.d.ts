export interface NewsEntry {
  id?: number;
  title: string;
  description: string;
  date?: string;
  url: string;
  category: string;
  type: ChangelogType;
  content_html?: string;
}
