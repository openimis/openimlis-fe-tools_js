import React, { useState, useCallback, useRef, useEffect } from "react";

const ReportBro = (props) => {
  const { definition, onChange, ...delegated } = props;
  const [isReady, setReady] = useState(false);
  const iframeRef = useRef(null);

  useEffect(() => {
    const elm = iframeRef.current;
    if (!elm) return;

    const listener = (event) => {
      try {
        const message = JSON.parse(event.data);
        switch (message.type) {
          case "READY":
            setReady(true);
            break;
          case "SAVE":
            onChange(JSON.stringify(message.payload));
            break;
        }
      } catch (err) {
        console.warn("Message cannot be handled by this component");
      }
    };
    window.addEventListener("message", listener);

    return () => window.removeEventListener("message", listener);
  }, []);

  const postMessage = useCallback(
    (message) => {
      try {
        iframeRef.current.contentWindow.postMessage(JSON.stringify(message), "*");
      } catch (err) {
        console.error(err);
      }
    },
    [iframeRef]
  );

  useEffect(() => {
    if (isReady && definition) {
      postMessage({ type: "LOAD", payload: JSON.parse(definition) });
    }
  }, [definition, isReady]);

  return (
    <iframe
      ref={iframeRef}
      src={`/api/report/reportbro/designer`}
      frameBorder="0"
      width="100%"
      height="100%"
      allowFullScreen
      {...delegated}
    />
  );
};

export default ReportBro;
