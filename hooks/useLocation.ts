import * as Location from "expo-location";
import { useCallback, useEffect, useRef, useState } from "react";

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
  const isMountedRef = useRef(true);
  const requestIdRef = useRef(0);

  const refetch = useCallback(async () => {
    if (!isMountedRef.current) return;

    const requestId = ++requestIdRef.current;

    setLoading(true);
    setError(null);

    try {
      const { status } = await Location.requestForegroundPermissionsAsync();
      if (!isMountedRef.current || requestId !== requestIdRef.current) return;

      if (status !== "granted") {
        setError("Permission to access location was denied");
        return;
      }

      const loc = await Location.getCurrentPositionAsync({});
      if (!isMountedRef.current || requestId !== requestIdRef.current) return;

      const { latitude, longitude } = loc.coords;
      setCoordinates({ latitude, longitude });

      const [place] = await Location.reverseGeocodeAsync({
        latitude,
        longitude,
      });
      if (!isMountedRef.current || requestId !== requestIdRef.current) return;

      if (place) {
        setLocationDetails({
          city: place.city ?? place.district ?? place.subregion ?? undefined,
          region: place.region ?? undefined,
          country: place.country ?? undefined,
        });
      }

      return { latitude, longitude };
    } catch (err) {
      if (isMountedRef.current && requestId === requestIdRef.current) {
        setError(err instanceof Error ? err.message : String(err));
      }
    } finally {
      if (isMountedRef.current && requestId === requestIdRef.current) {
        setLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    isMountedRef.current = true;

    return () => {
      isMountedRef.current = false;
    };
  }, []);

  return { coordinates, loading, error, locationDetails, refetch };
}
