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

  if (!payment) {
    return ctx.reply("¡Aún no has pagado este mes!");
  }

  ctx.sessionDB.get("payments").remove({ id: payment.id }).write();

  return ctx.reply(`Pago de este mes eliminado 😢`);
};
