module.exports = async (ctx) => {
  const args = ctx.state.command.splitArgs;
  const passwd = args && args.length > 0 && args[0];

  if (!passwd) {
    return ctx.reply("¡Debes introducir la contraseña 🤨!");
  }

  const invitation = ctx.sessionDB
    .get("invitations")
    .find({ token: passwd })
    .value();

  if (!invitation) {
    return ctx.reply("Invitación no encontrada 🤔");
  }

  if (invitation.used) {
    return ctx.reply("⛔️ Invitación ya usada");
  }

  const user = ctx.sessionDB.get("users").find({ id: ctx.from.id }).value();

  if (user) {
    return ctx.reply("¡Ya estás registrado!");
  }

  ctx.sessionDB
    .get("users")
    .insert({
      id: ctx.from.id,
      name: invitation.username,
      disabled: false,
    })
    .write();

  ctx.sessionDB
    .get("invitations")
    .find({ token: invitation.token })
    .assign({ used: true })
    .write();

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

  return ctx.reply(`Gracias por registrarte ${invitation.username} 👍`);
};
