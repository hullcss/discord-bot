import { Events, Listener } from "@sapphire/framework";
import { Message, MessageFlags } from "discord.js";
import { embedHelper } from "../commons/embed";
import type { EmbedBuilder } from "discord.js";

export class HasSenderAcceptedCOCListener extends Listener {
  public constructor(
    context: Listener.LoaderContext,
    options: Listener.Options,
  ) {
    super(context, {
      ...options,
      event: Events.MessageCreate,
    });
  }

  public async run(message: Message) {
    // check if the author has accepted the CoC
    // if not, delete the message and dm them asking to accept the CoC
    // if yes, do nothing

    if (message.author.bot) return;

    // check if author has the role HULLCSS_ROLE_COC
    if (!message.member?.roles.cache.has(process.env.HULLCSS_ROLE_COC!)) {
      // const msg = `
      //   Thanks for participating in the community, You need to accept the Code of Conduct to chat in the server.
      //   Please accept the CoC in the [#roles](https://discord.com/channels/427865794467069962/973982410612027503) channel.
      //   You won't be able to chat in the server until you accept the CoC.`;


      let url: string = "https://discord.com/channels/427865794467069962/973982410612027503";
      let msg: string = "";

      msg += "Thanks for participating in the in the community, however to send messages, you ***must*** accept the Code of Conduct. ";
      msg += `This can be found in the [#roles](${url}) channel in our discord. \n`;
      msg += "If you need a hand, please feel free to message an exec. \n\n"
      msg += `> \`${message.content}\``


      const e = embedHelper(
        "Please Accept the Code of Conduct",
        msg,
        message,
      );

      e.setURL(url);

      // TODO: it doesnt see this as ephemeral
      // let r = message.reply({
      //   content: msg,
      //   ephemeral: true,
      //   fetchReply: true,
      // });

      // await r;

      message.delete();

      message.author.send({
        embeds: [e],
      });
    }
  }
}
