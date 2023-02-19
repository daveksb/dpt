export const environment = {
  production: true,
  apiPrefix: 'https://cockpit.dpt.go.th/dpt',
  emailValidator:
    /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/,
  phoneValidator: /((\+66|0)(\d{1,2}\-?\d{3}\-?\d{3,4}))/gm,
};
