const { format, utcToZonedTime } = require("date-fns-tz");

const getData = () => {
  const fusoBrasilia = "America/Sao_Paulo";

  const dataAtual = new Date();

  const dataBrasilia = utcToZonedTime(dataAtual, fusoBrasilia);

  const dataFormatada = format(dataBrasilia, "yyyy-MM-dd HH:mm:ss");

  return dataFormatada;
};

module.exports = getData;
