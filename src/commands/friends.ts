import { Subcommand } from '@sapphire/plugin-subcommands';
import { embedHelper } from '../commons/embed';
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { ActionRowBuilder, ButtonBuilder, ButtonStyle, EmbedBuilder } from "discord.js";
import { embed_blocks, friends, friends_list_embed } from "../config";

// TODO: auto register sub commands based off of configured values. 


// Extend `Subcommand` instead of `Command`
export class FriendsCommand extends Subcommand {
  public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: 'friends',
      subcommands: [
        {
          name: "list",
          chatInputRun: "chatInputList",
          default: true
        },
        {
          name: "info",
          type: "group",
          entries: [
            {
              name: 'boardgames',
              chatInputRun: 'chatInputSoc'
            },
            {
              name: 'gaming',
              chatInputRun: 'chatInputSoc'
            },
            {
              name: 'robsoc',
              chatInputRun: 'chatInputSoc'
            },
            {
              name: 'freeside',
              chatInputRun: 'chatInputSoc'
            },
            {
              name: 'support_networks',
              chatInputRun: 'chatInputSoc'
            }
          ]
        }
      ]
    });
  }

  registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand((builder) => builder
      .setName('friends')
      .setDescription('Friends of HullCSS')
      .addSubcommand((command) => command.setName('list').setDescription('List Organisations that we are friends with :3'))
      .addSubcommandGroup((group) => group
      .setName('info')
      .setDescription('More Info on Friends')
        .addSubcommand((command) => command.setName('boardgames').setDescription('Info About Boardgames Society'))
        .addSubcommand((command) => command.setName('gaming').setDescription('Info About Gaming Society'))
        .addSubcommand((command) => command.setName('robsoc').setDescription('Info About Robsoc'))
        .addSubcommand((command) => command.setName('freeside').setDescription('Info about Support Networks'))
        .addSubcommand((command) =>command.setName('support_networks').setDescription('Info about Support Networks'))
      ) 
    );
  }

  public async chatInputList(interaction: Subcommand.ChatInputCommandInteraction) {
    return interaction.reply({
        embeds: [friends_list_embed()],
        // ephemeral: true,
    });
    // await interaction.reply({ embeds: [e], ephemeral: true });

  }

  public async chatInputSoc(interaction: Subcommand.ChatInputCommandInteraction) {

    const soc = friends[interaction.options.getSubcommand()];

    if (!soc) {
      const embed = embedHelper(
        {
          name: "Error",
          desc: "No Soc with That Name :("
        }
      );

      const msg = await interaction.reply({
        embeds: [embed],
        // ephemeral: true,
        fetchReply: true,
      });

      return;
    }

    const embed = embedHelper(
      {
        name: soc.name,
        desc: soc.desc
      }, 
      interaction
    );

    const row = new ActionRowBuilder<ButtonBuilder>();

    if (soc.urls) {
      Object.values(soc.urls).forEach((url) => {
        row.addComponents(
          new ButtonBuilder()
            .setLabel(url.name)
            .setStyle(ButtonStyle.Link)
            .setURL(url.url ?? "")
        );
      });
    }

    const msg = await interaction.reply({
      embeds: [embed],
      components: [row],
      // ephemeral: true,
      fetchReply: true,
    });
  }

}