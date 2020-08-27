module.exports = async (ctx) => {
  await ctx.setMyCommands([
    {
      command: "/pagos",
      description: "Comprobar los pagos de este mes",
    },
    {
      command: "/invitacion",
      description: "Genera una invitación",
    },
  ]);

  return ctx.reply("Comandos actualizados ✅");
};
