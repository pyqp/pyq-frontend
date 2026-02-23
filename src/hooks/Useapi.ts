import { useState, useEffect, useCallback, useRef } from 'react';
import { AxiosError } from 'axios';

// ── Generic API error extractor ───────────────────────────────────────────────
const extractError = (err: unknown): string => {
  if (err instanceof AxiosError) {
    return (err.response?.data as any)?.message ?? err.message ?? 'Something went wrong';
  }
  if (err instanceof Error) return err.message;
  return 'Something went wrong';
};

// ── useApi — for GET-style data fetching ─────────────────────────────────────
interface UseApiState<T> {
  data:      T | null;
  isLoading: boolean;
  error:     string | null;
  refetch:   () => void;
}

export function useApi<T>(
  fetcher:  () => Promise<{ data: { data: T } }>,
  deps:     unknown[] = [],
  options?: { skip?: boolean }
): UseApiState<T> {
  const [data, setData]         = useState<T | null>(null);
  const [isLoading, setLoading] = useState(!options?.skip);
  const [error, setError]       = useState<string | null>(null);
  const [tick, setTick]         = useState(0);
  const fetcherRef              = useRef(fetcher);
  fetcherRef.current            = fetcher;

  const refetch = useCallback(() => setTick((t) => t + 1), []);

  useEffect(() => {
    if (options?.skip) return;
    let cancelled = false;

    setLoading(true);
    setError(null);

    fetcherRef.current()
      .then(({ data: res }) => { if (!cancelled) setData(res.data); })
      .catch((err) => { if (!cancelled) setError(extractError(err)); })
      .finally(() => { if (!cancelled) setLoading(false); });

    return () => { cancelled = true; };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [tick, options?.skip, ...deps]);

  return { data, isLoading, error, refetch };
}

// ── useMutation — for POST/PUT/DELETE actions ─────────────────────────────────
interface UseMutationState<TData, TVariables> {
  mutate:    (variables: TVariables) => Promise<TData>;
  isLoading: boolean;
  error:     string | null;
  data:      TData | null;
  reset:     () => void;
}

export function useMutation<TData, TVariables = void>(
  mutationFn: (variables: TVariables) => Promise<{ data: { data: TData } }>,
  options?: {
    onSuccess?: (data: TData, variables: TVariables) => void;
    onError?:   (error: string) => void;
  }
): UseMutationState<TData, TVariables> {
  const [isLoading, setLoading] = useState(false);
  const [error, setError]       = useState<string | null>(null);
  const [data, setData]         = useState<TData | null>(null);

  const reset = useCallback(() => {
    setLoading(false);
    setError(null);
    setData(null);
  }, []);

  const mutate = useCallback(async (variables: TVariables): Promise<TData> => {
    setLoading(true);
    setError(null);
    try {
      const { data: res } = await mutationFn(variables);
      setData(res.data);
      options?.onSuccess?.(res.data, variables);
      return res.data;
    } catch (err) {
      const msg = extractError(err);
      setError(msg);
      options?.onError?.(msg);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [mutationFn, options]);

  return { mutate, isLoading, error, data, reset };
}