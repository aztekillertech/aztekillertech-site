import React, { useEffect } from 'react';

function TawkChatbot() {
  useEffect(() => {
    if (document.getElementById('tawk-script')) {
      return;
    }

    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();

    const script = document.createElement('script');
    script.id = 'tawk-script';
    script.async = true;
    script.src = 'https://embed.tawk.to/69e32834bb6b121c2fa77a1c/1jmfla3l9';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');

    script.onload = () => {
      if (window.Tawk_API) {
        window.Tawk_API.onLoad = function() {
          console.log('Tawk.to chat widget loaded successfully');
        };
      }
    };

    document.head.appendChild(script);

    return () => {
      const existingScript = document.getElementById('tawk-script');
      if (existingScript) {
        existingScript.remove();
      }
    };
  }, []);

  return null;
}

export default TawkChatbot;