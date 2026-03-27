import React, { useState, useEffect } from "react";

function LoadingFallback({ name }) {
  return <div className="loading-fallback">Chargement {name}...</div>;
}

function RemoteMFE({ name, importFn }) {
  const [Component, setComponent] = useState(null);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    let cancelled = false;
    importFn()
      .then((mod) => {
        if (!cancelled) {
          setComponent(() => mod.default);
          setLoading(false);
        }
      })
      .catch((err) => {
        console.warn(`[MFE] ${name} indisponible :`, err.message);
        if (!cancelled) {
          setError(true);
          setLoading(false);
        }
      });
    return () => {
      cancelled = true;
    };
  }, [name, importFn]);

  if (loading) return <LoadingFallback name={name} />;
  if (error || !Component) return <OfflineFallback name={name} />;
  return <Component />;
}

export default RemoteMFE;
