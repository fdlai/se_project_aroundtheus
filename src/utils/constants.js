export const initialCards = [
  {
    name: "El Capitan",
    link: "https://images.unsplash.com/photo-1426604966848-d7adac402bff?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
  },
  {
    name: "Wanaka, New Zealand",
    link: "https://www.wallpaperup.com/uploads/wallpapers/2013/09/25/151365/348f3c49b5e5d78bae772578dc1e9d36.jpg",
  },
  {
    name: "Lake Atitl\u00E1n",
    link: "https://www.roadaffair.com/wp-content/uploads/2017/10/lake-atitlan-guatemala-shutterstock_189649244.jpg",
  },
  {
    name: "Banff, Canada",
    link: "https://i2.wp.com/www.erikastravels.com/wp-content/uploads/2015/11/P1170327.jpg",
  },
  {
    name: "Grand Canyon",
    link: "https://www.wallpaperflare.com/static/15/193/266/arches-national-park-utah-rock-nature-wallpaper.jpg",
  },
  {
    name: "Amazon Rainforest",
    link: "https://foundtheworld.com/wp-content/uploads/2015/12/Amazon-Rainforest-9.jpg",
  },
];

export const configObject = {
  formSelector: ".modal__form",
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__submit-button",
  inactiveButtonClass: "modal__submit-button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
};

export const apiSettings = {
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "cb8f3768-1e1a-47c8-a0f6-f4754f9bab87",
    "Content-Type": "application/json",
  },
};
