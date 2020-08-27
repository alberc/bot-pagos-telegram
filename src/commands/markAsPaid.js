module.exports = (ctx) => {
  // 1. Get user ID and date
  const userId = ctx.from.id;
  const today = new Date();

  // 2. Check if user is registered
  const user = ctx.sessionDB
    .get("users")
    .filter({ disabled: false })
    .find({ id: userId })
    .value();
  if (!user) {
    return ctx.reply("⛔️ Usuario no encontrado o desactivado");
  }

  // 3. Check if users has paid
  const payment = ctx.sessionDB
    .get("payments")
    .find({
      user: userId,
      year: today.getFullYear(),
      month: today.getMonth(),
    })
    .value();

  if (payment) {
    return ctx.reply("¡Ya has pagado este mes! 🥳");
  }

  // 3. Mark user has paid for the year/month
  ctx.sessionDB
    .get("payments")
    .insert({
      user: ctx.from.id,
      year: today.getFullYear(),
      month: today.getMonth(),
    })
    .write();

  return ctx.reply(`¡Guardado!, Gracias ${user.name} 🥳`);
};
