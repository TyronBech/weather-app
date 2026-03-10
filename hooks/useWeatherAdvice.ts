import { useCallback, useState } from "react";

/**
 * Custom hook to fetch AI-generated weather advice based on current weather conditions.
 * It manages the advice text, loading state, and any errors that may occur during the fetch.
 *
 * @returns An object containing the advice, loading state, error message, and a function to fetch advice.
 */
export function useWeatherAdvice() {
  const [advice, setAdvice] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchAdvice = useCallback(
    async (weatherData: {
      temperature: number;
      weatherCode: number;
      rainChance: number;
      windSpeed: number;
      humidity: number;
      isDay: number;
    }) => {
      setLoading(true);
      setError(null);

      const baseUrl = process.env.EXPO_PUBLIC_GROQ_API_BASE_URL;
      const apiKey = process.env.EXPO_PUBLIC_GROQ_API_KEY;
      const model = process.env.EXPO_PUBLIC_GROQ_MODEL;

      if (!baseUrl || !apiKey || !model) {
        setError(
          "GROQ API is not configured correctly. Please set EXPO_PUBLIC_GROQ_API_BASE_URL, EXPO_PUBLIC_GROQ_API_KEY, and EXPO_PUBLIC_GROQ_MODEL.",
        );
        setLoading(false);
        return;
      }

      try {
        // Call the GROQ API to get weather advice based on current conditions
        const response = await fetch(baseUrl, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${apiKey}`,
          },
          body: JSON.stringify({
            model,
            max_tokens: 100,
            messages: [
              {
                role: "system",
                content: `You give 1-2 sentences only of advice that is funny, slightly over-the-top, but genuinely useful. `,
              },
              {
                role: "user",
                content: `Current conditions:
                            - Temperature: ${weatherData.temperature}°C
                            - Rain chance: ${weatherData.rainChance}%
                            - Wind speed: ${weatherData.windSpeed} km/h
                            - Humidity: ${weatherData.humidity}%
                            - Time of day: ${weatherData.isDay === 1 ? "Daytime" : "Nighttime"}
                            Give me your best weather advice for going outside right now.`,
              },
            ],
          }),
        });
        if (!response.ok) {
          const errBody = await response.json().catch(() => ({}));
          throw new Error(
            (errBody as any)?.error?.message ?? `API error ${response.status}`,
          );
        }
        const data = await response.json();
        const text = data.choices?.[0]?.message?.content;
        if (!text) throw new Error("Unexpected response from AI");
        setAdvice(text.trim());
      } catch (err) {
        setError(err instanceof Error ? err.message : String(err));
      } finally {
        setLoading(false);
      }
    },
    [],
  );
  return { advice, loading, error, fetchAdvice };
}
