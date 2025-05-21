export interface ZamerItem {
  id: number;
  date: string; 
  source: string;
  phase: string;
  paramU: number | null;
  paramI: number | null;
  paramP: number | null;
  paramQ: number | null;
  paramCos: number | null;
}