module.exports = async (ctx) => {
  const commands = await ctx.getMyCommands();
  const info = commands.reduce(
    (acc, val) => `${acc}/${val.command} - ${val.description}\n`,
    ""
  );
  return ctx.reply(info);
};
