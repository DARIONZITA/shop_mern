import React, { useEffect } from 'react';

const FacebookChat = () => {
  useEffect(() => {
    // Carregar o SDK do Facebook Messenger
    window.fbAsyncInit = function() {
      FB.init({
        appId: '758465522653440',
        autoLogAppEvents: true,
        xfbml: true,
        version: 'v15.0'
      });
    };

    (function(d, s, id) {
      var js, fjs = d.getElementsByTagName(s)[0];
      if (d.getElementById(id)) return;
      js = d.createElement(s); js.id = id;
      js.src = "https://connect.facebook.net/en_US/sdk.js#xfbml=1&version=v15.0&appId=758465522653440&autoLogAppEvents=1";
      fjs.parentNode.insertBefore(js, fjs);
    }(document, 'script', 'facebook-jssdk'));
  }, []);

  return (
    <div className="fb-customerchat"
         attribution="setup_tool"
         page_id="104650231911396"
         theme_color="#6C84B0"
         logged_in_greeting="Olá! Como posso ajudar?"
         logged_out_greeting="Olá! Como posso ajudar?">
    </div>
  );
};

export default FacebookChat;