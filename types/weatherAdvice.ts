// type for weather advice hook
export interface WeatherAdviceProps {
  advice: string | null;
  loading: boolean;
  error: string | null;
}