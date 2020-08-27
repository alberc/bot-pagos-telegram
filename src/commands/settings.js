module.exports = async (ctx) => {
  await ctx.setMyCommands([
    {
      command: "/registro",
      description: "Registra el usuario",
    },
  ]);
  return ctx.reply("Comandos actualizados ✅");
};
