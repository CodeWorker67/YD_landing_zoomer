import { useEffect, useState } from 'react';
import { AUTH_URL, SUPPORT_URL } from '@utils/constants';
import { sendLandingAdHit } from '@utils/adHit';
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
    sendLandingAdHit('entry', {});
    getYandexClientId().then((clientId) => {
      setAuthUrl(buildAuthUrl(AUTH_URL, clientId));
      setSupportUrl(buildSupportUrl(SUPPORT_URL, clientId));
      sendLandingAdHit('metrika_id', clientId ? { yandex_client_id: clientId } : {});
    });
  }, []);

  return { authUrl, supportUrl };
}
