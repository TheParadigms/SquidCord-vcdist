const Discord = require("./Discord");
exports.server = (serv) => {
  const settings = serv.plugins.squidcord.settings;
  require("./thrower").checkConfig(settings, serv);
  Discord.login(settings.token);
  Discord.setGuild(settings.guild);
  Discord.setChannel(settings.channel);
  Discord.setChatHandler((message) => {
    serv.broadcast(
      `§b[Discord] §7${message.author.tag}§f: §7${message.content}`
    );
  });
  Discord.setDefaultVC(settings.vc_default);
  Discord.setVoiceChannels(settings.vc_chnnels);
};
exports.player = (player, serv) => {
  player.on("chat", (message) => {
    Discord.broadcast(message, player);
  });
  player.on("connected", () => Discord.playerJoined(player));
  player.on("disconnected", () => Discord.playerLeft(player));
};
