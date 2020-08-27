require("dotenv").config();

const adminId = process.env.ADMIN_ID;

module.exports = async (ctx) => {
  const user = ctx.sessionDB.get("users").find({ id: ctx.from.id }).value();

  if (!user) {
    return ctx.reply("⛔️ No estás registrado ⛔️");
  }

  ctx.sessionDB
    .get("users")
    .find({ id: ctx.from.id })
    .assign({ disabled: false })
    .write();

  ctx.telegram.sendMessage(adminId, `Se ha activado el usuario ${user.name}`);

  await ctx.setMyCommands([
    {
      command: "/pagar",
      description: "Marca este mes como pagado",
    },
    {
      command: "/olvidar",
      description: "Elimina el pago de este mes",
    },
    {
      command: "/desactivar",
      description: "Desactiva el usuario",
    },
  ]);

  return ctx.reply("¡Usuario activado! 👍");
};
