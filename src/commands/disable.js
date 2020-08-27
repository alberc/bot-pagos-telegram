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
    .assign({ disabled: true })
    .write();

  ctx.telegram.sendMessage(
    adminId,
    `Se ha desactivado el usuario ${user.name}`
  );

  await ctx.setMyCommands([
    {
      command: "/activar",
      description: "Activa el usuario",
    },
  ]);

  return ctx.reply("Usuario desactivado");
};
