const Config = {
  nome: {
    message: [
      "Bem vindo a star interprise!",
      "Venha fazer parte da gnt!",
      "Qual é o seu nome?",
    ],
    type: "text",
  },
  idade: {
    message: ["Que legal {previousResponse}, mas qual é a sua idade?"],
    type: "number",
    restrictResponse: "18",
    usePreviousResponse: "nome",
  },
  cidade: {
    message: ["Já que tu tem {previousResponse} anos, tu mora em xique xique?"],
    type: "radio",
    name_radio_options: ["Sim", "Talvez", "Não", "Sempre"],
    usePreviousResponse: "idade",
  },
  email: {
    message: ["Qual é o seu email, {previousResponse}!"],
    type: "text",
    usePreviousResponse: "nome",
  },
};

export default Config;
