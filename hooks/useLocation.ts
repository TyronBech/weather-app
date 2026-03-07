import * as Location from "expo-location";
import { useEffect, useState } from "react";

interface LocationDetails {
  city?: string;
  region?: string;
  country?: string;
}

export function useLocation() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [coordinates, setCoordinates] = useState<{
    latitude: number;
    longitude: number;
  } | null>(null);
  const [locationDetails, setLocationDetails] =
    useState<LocationDetails | null>(null);

  useEffect(() => {
    let isMounted = true;

    (async () => {
      if (!isMounted) return;
      setLoading(true);
      setError(null);
      try {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (!isMounted) return;
        if (status !== "granted") {
          setError("Permission to access location was denied");
          return;
        }
        const loc = await Location.getCurrentPositionAsync({});
        if (!isMounted) return;
        const { latitude, longitude } = loc.coords;
        setCoordinates({ latitude, longitude });

        const [place] = await Location.reverseGeocodeAsync({
          latitude,
          longitude,
        });
        if (!isMounted) return;
        if (place) {
          setLocationDetails({
            city: place.city ?? place.district ?? place.subregion ?? undefined,
            region: place.region ?? undefined,
            country: place.country ?? undefined,
          });
        }
      } catch (err) {
        if (isMounted) {
          setError(err instanceof Error ? err.message : String(err));
        }
      } finally {
        if (isMounted) {
          setLoading(false);
        }
      }
    })();

    return () => {
      isMounted = false;
    };
  }, []);

  return { coordinates, loading, error, locationDetails };
}
