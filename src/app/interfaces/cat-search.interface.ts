export interface ICatSearch {
  id: string;
  url: string;
  width: number;
  height: number;
  mime_type: string;
  breeds: [
    {
      id: number;
      name: string;
      weight:  string;
      height: string;
      life_span: string;
      breed_group: string
    }
  ];
  categories: []
}
