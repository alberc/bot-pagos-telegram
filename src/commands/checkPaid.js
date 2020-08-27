module.exports = (ctx) => {
  // 1. Get users and date
  const users = ctx.sessionDB.get("users").filter({ disabled: false }).value();
  const today = new Date();

  // 2. Get pending payment users
  const pending = users.filter(({ id }) => {
    const payment = ctx.sessionDB
      .get("payments")
      .find({
        user: id,
        year: today.getFullYear(),
        month: today.getMonth(),
      })
      .value();

    return !payment;
  });

  if (!pending.length) {
    return ctx.reply("¡Todos han pagado este mes! 🎉");
  }

  // 3. Format reply
  const replyStr = `Pendientes de pago: ${pending
    .map(({ name }) => name)
    .join(", ")}`;

  return ctx.reply(replyStr);
};
