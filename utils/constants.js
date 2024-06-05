var Constants = {
  get_api_base_url: function () {
    if (location.hostname == "localhost") {
      return "http://localhost/web-2024/backend/";
    } else {
      return "https://sea-turtle-app-tidm4.ondigitalocean.app/backend/";
    }
  },
};
