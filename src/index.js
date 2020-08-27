require("dotenv").config();

const { Telegraf } = require("telegraf");
const LocalSession = require("telegraf-session-local");
const commandParts = require("telegraf-command-parts");

const markAsPaid = require("./commands/markAsPaid");
const checkPaid = require("./commands/checkPaid");
const register = require("./commands/register");
const invite = require("./commands/invite");
const enable = require("./commands/enable");
const disable = require("./commands/disable");
const admin = require("./commands/admin");
const help = require("./commands/help");
const settings = require("./commands/settings");
const undo = require("./commands/undo");

const adminId = process.env.ADMIN_ID;
const bot = new Telegraf(process.env.BOT_TOKEN);
const localSession = new LocalSession({
  database: "db.json",
  state: {
    users: [],
    payments: [],
    invitations: [],
  },
});

bot.use(localSession.middleware());
bot.use(commandParts());

const checkAdminMiddleware = (ctx, next) => {
  if (!ctx.from || String(ctx.from.id) !== String(adminId)) {
    return ctx.reply("⛔️ No autorizado ⛔️");
  } else {
    return next();
  }
};

bot.settings(settings);
bot.help(help);
bot.command("admin", checkAdminMiddleware, admin);
bot.command("pagar", markAsPaid);
bot.command("olvidar", undo);
bot.command("pagos", checkAdminMiddleware, checkPaid);
bot.command("registro", register);
bot.command("invitacion", checkAdminMiddleware, invite);
bot.command("activar", enable);
bot.command("desactivar", disable);

bot.startPolling();
