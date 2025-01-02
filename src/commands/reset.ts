import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";
import { embedHelper } from "../commons/embed";
import { embed_blocks } from "../config";

export class ResetCommand extends Command {
  public constructor(context: Command.LoaderContext, options: Command.Options) {
    super(context, { ...options });
  }

  public override registerApplicationCommands(registry: Command.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder.setName("reset").setDescription("End-Of-Year Reset"),
    );
  }

  public override async chatInputRun(
    interaction: Command.ChatInputCommandInteraction,
  ) {
    // TODO
    // - for every user who has paid member role, take that role off them
    // - for every user who has course rep role, take that role off them

    // TODO: this code broke when testing, need to check over it...
//     const guild = interaction.guild;
//     if (!guild) return;

//     const paidMemberRole = guild.roles.cache.find(role => role.name === "Paid Member");
//     const courseRepRole = guild.roles.cache.find(role => role.name === "Course Rep");

//     if (!paidMemberRole || !courseRepRole) {
//       await interaction.reply("Roles not found.");
//       return;
//     }

//     const members = await guild.members.fetch();

//     for (const member of members.values()) {
//       if (member.roles.cache.has(paidMemberRole.id)) {
//         await member.roles.remove(paidMemberRole);
//       }
//       if (member.roles.cache.has(courseRepRole.id)) {
//         await member.roles.remove(courseRepRole);
//       }
//     }

//     await interaction.reply("Roles have been reset.");
  }
}
