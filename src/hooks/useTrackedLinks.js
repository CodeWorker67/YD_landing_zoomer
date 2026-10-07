import { useEffect, useState } from 'react';
import { AUTH_URL, SUPPORT_URL } from '@utils/constants';
import {
  buildAuthUrl,
  buildSupportUrl,
  getYandexClientId,
} from '@utils/trackedLinks';

/** AUTH и SUPPORT с ?start= и ClientID из Яндекс.Метрики. */
export function useTrackedLinks() {
  const [authUrl, setAuthUrl] = useState(() => buildAuthUrl(AUTH_URL, null));
  const [supportUrl, setSupportUrl] = useState(SUPPORT_URL);

  useEffect(() => {
    getYandexClientId().then((clientId) => {
      setAuthUrl(buildAuthUrl(AUTH_URL, clientId));
      setSupportUrl(buildSupportUrl(SUPPORT_URL, clientId));
    });
  }, []);

  return { authUrl, supportUrl };
}
