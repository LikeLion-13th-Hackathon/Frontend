// hooks/useMyPage.js
import { useEffect, useState } from 'react';
import { fetchMyPage } from '@/shared/api/account';

export default function useMyPage() {
  const [user, setUser] = useState(null);   // ← 최종 user만 보관
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        setLoading(true);
        const res = await fetchMyPage();
        console.log('[useMyPage] status:', res?.status);
        console.log('[useMyPage] data:', res?.data);

        // 응답 형태: { results: {...} }
        const u = res?.data?.results ?? null;
        if (mounted) setUser(u);
      } catch (e) {
        console.error('[useMyPage] error:', e?.response || e);
        if (mounted) setError(e);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  return { user, loading, error };
}
