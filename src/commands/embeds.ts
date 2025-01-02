import { Subcommand } from '@sapphire/plugin-subcommands';
import { embedHelper } from '../commons/embed';
import { isMessageInstance } from "@sapphire/discord.js-utilities";
import { Command } from "@sapphire/framework";
import { EmbedBuilder } from "discord.js";
import { embed_blocks, friends } from "../config";

// Society: 
// - name
// - desc
// - links


// Extend `Subcommand` instead of `Command`
export class EmbedsCommand extends Subcommand {
  public constructor(context: Subcommand.LoaderContext, options: Subcommand.Options) {
    super(context, {
      ...options,
      name: 'embeds',
      subcommands: [
        {
          name: "paid_member",
          chatInputRun: "chatInputRun"
        },
        {
          name: 'code_of_conduct',
          chatInputRun: 'chatInputRun'
        },
      ]
    });
  }

  registerApplicationCommands(registry: Subcommand.Registry) {
    registry.registerChatInputCommand((builder) =>
      builder
        .setName('embeds')
        .setDescription('Embed Admin Command')
        .addSubcommand((command) => command.setName('paid_member').setDescription('Paid Member embed'))
        .addSubcommand((command) => command.setName('code_of_conduct').setDescription('Code of Conduct Embed'))
    );
  }

  public async chatInputRun(interaction: Subcommand.ChatInputCommandInteraction) {

    // interaction.options.getSubcommand()
    const subcommand = interaction.options.getSubcommand();

    switch (subcommand) {
        case 'paid_member':
            // TODO
            // - write embed
            // - add buttons
            // - build form
            // - handle form
            break;
        case 'code_of_conduct':
            // TODO
            // - write embed
            // - add buttons
            // - handle buttons
            break;
        default:
            await interaction.reply({ content: 'Unknown subcommand', ephemeral: true });
            break;
    }
  }
}