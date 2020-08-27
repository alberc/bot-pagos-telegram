const { customAlphabet } = require("nanoid/non-secure");

const alphabet = "123456789ABCDEFGHIJKLMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz";
const nanoid = customAlphabet(alphabet, 6);

module.exports = (ctx) => {
  const args = ctx.state.command.splitArgs;
  const username = args && args.length > 0 && args[0];

  if (!username) {
    return ctx.reply("¡Debes introducir el nombre!");
  }

  const token = nanoid();

  ctx.sessionDB
    .get("invitations")
    .insert({
      token,
      used: false,
      username,
    })
    .write();

  return ctx.reply(`Invitación creada: ${token}`);
};
