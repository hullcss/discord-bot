import { ButtonBuilder, EmbedBuilder } from "@discordjs/builders";
import type { exec } from "./structs/execs";
import type { Org } from "./structs/orgs";
import { embedHelper } from "./commons/embed";
import type { ndurl } from "./structs/ndurl";
import { ButtonStyle, Embed } from "discord.js";


// HashMap for Exec Info
export const execs: { [key: string]: exec|undefined } = {
    president: {
        role_name: "President",
        name: "rand",
        discord_id: 667396400576987147,
        github_url: "todo"
    },
    vice_president: {
        role_name: "Vice-President",
        name: "alex",
        discord_id: 252001272146821120,
        github_url: "todo"
    },
    treasurer: {
        role_name: "Treasurer",
        name: "erika",
        discord_id: 207122643223052288,
        github_url: "todo"
    },
    social_secretary: {
        role_name: "Social Secretary",
        name: "jack",
        discord_id: 433633207917871104,
        github_url: "todo"
    },
    webmaster: {
        role_name: "Webmaster",
        name: "ash",
        discord_id: 609463800818827264,
        github_url: "https://github.com/ash-entwisle"
    },
    social_media_manager: {
        role_name: "Social Media Manager",
        name: "bailey",
        discord_id: 638360627823247390,
        github_url: "todo"
    }
}

// HashMap for important channel IDs
export const channel_ids: { [key: string]: number } = {
    general: 427875246801027072,
    roles: 427873938333499404,
    rules: 973982410612027503,
    member_requests: 768465164898271244,
    intro: 1284640980162580611
};

// HashMap for important role IDs
export const role_ids: { [key: string]: number } = {
    code_of_conduct: 973646380771979304,
    paid_member: 1258041215182442539,
    course_rep: 493738161713709077
};

export const guild_id: number = 427865794467069962;

export const important_links: { [key: string]: ndurl } = {
    fssr: {
        name: "Freeside Student Resources",
        desc: "A list of resources made by students, staff, and alumni",
        url: "https://github.com/FreesideHull/StudentResources"
    },
    gh: {
        name: "GitHub Student Developer Pack",
        desc: "A collection of free resources for students provided by GitHub",
        url: "https://education.github.com/pack"
    },
    adt: {
        name: "Azure Dev Tools for Teaching",
        desc: "Access to Microsoft software and services for educational purposes",
        url: "https://azure.microsoft.com/en-gb/free/students/"
    }, 
    jb: {
        name: "JetBrains IDE Package",
        desc: "Professional development tools for students",
        url: "https://www.jetbrains.com/community/education/#students"
    }
}

// Friends
export const friends: { [key: string]: Org } = {
    freeside: {
        name: "Freeside",
        desc: "The Linux User Group at the University",
        urls: {
            discord: {
                name: "Discord Server",
                url: "https://discord.gg/WugkvVjNZD"
            },
            website: {
                name: "Website",
                url: "https://freeside.co.uk"
            }
        }
    },
    robsoc: {
        name: "RobSoc",
        desc: "Hull Universities Robotics Society",
        urls: {
            instagram: {
                name: "RobSoc Instagram",
                url: "https://www.instagram.com/hull_rs/"
            },
            husu: {
                name: "RobSoc HUSU Page",
                url: "https://hulluniunion.com/activities/view/Robotics"
            }
        }
    },
    boardgames: {
        name: "Boardgames",
        desc: "Hull University Boardgames Society",
        urls: {
            discord: {
                name: "Discord",
                url: "https://discord.gg/c9cCae8xmW"
            },
            instagram: {
                name: "Instagram",
                url: "https://www.instagram.com/huboardgames/"
            },
            husu: {
                name: "HUSU Page",
                url: "https://hulluniunion.com/activities/view/Board-Games-Society"
            }
        }
    },
    gaming: {
        name: "Gaming",
        desc: "Hull University Gaming Society",
        urls: {
            discord: {
                name: "Discord",
                url: "https://discord.gg/Z4zfMYrn2J"
            },
            instagram: {
                name: "Instagram",
                url: "https://www.instagram.com/hull_university_gaming/"
            },
            husu: {
                name: "HUSU Page",
                url: "https://hulluniunion.com/activities/view/gaming-society"
            }
        }
    },
    support_networks: {
        name: "Support Networks",
        desc: "HUSU Support Networks",
        urls: {
            // pto: {
            //     name: "Email",
            //     url: "mailto:supportnetworks.pto@hull.ac.uk"
            // },
            husu: {
                name: "HUSU Page",
                url: "https://hulluniunion.com/join-in/support-networks"
            }
        }
    }
}

export const embed_blocks: { [key: string]: ndurl } = {
    ping: {
        name: "Ping",
        desc: "Pinging..."
    },
    pmr_embed: {
        name: "Paid Member Request:", 
        desc: `Press the button below and fill in the form to request the <@paidmember> role`
    },
    pmr_benefits: {
        name: "Benefits?",
        desc: "- Come to every event\n- Vote in AGMs and EGMs\n- Access a special area, just for paid members\n- And support the society you are apart of!\n"
    },
    pmr_paying: {
        name: "Pay for a Membership",
        desc: `To pay for a membership, click on the [\`buy membership\`](https://links.hullcss.org/husu) button below, then hit the green button and fill in your student info. An exec will then review your request and give you the role! Membership costs £5`
    },
    pmr_disclaimer: {
        name: "Disclaimer.",
        desc: "This is a manual process, executive members need to verify that you have paid your membership and then manually give you the role. There may be no notification when you recieve your role, if you have any questions feel free to reach out to an exec!"
    }
}



export function welcome_message(user_id: string): string {
    let msg: string = `Hey <@${user_id}>, Welcome to HullCSS! Feel free to select your roles using the \`Channels and Roles\` Section. Make sure to also accept the <#${channel_ids["rules"]}>`
    return msg;
}

export function paid_member_req(): EmbedBuilder {
    
    const e: EmbedBuilder = embedHelper({
        name: "Paid Member Request:", 
        desc: `Press the button below and fill in the form to request the <@paidmember> role`
    });

    let benefits: string = "Come to every event\n Vote in AGMs and EGMs\n Access a special area, just for paid members\n And support the society you are apart of!\n";
    
    let disclaimer: string = "This is a manual process, executive members need to verify that you have paid your membership and then manually give you the role. There may be no notification when you recieve your role, if you have any questions feel free to reach out to an exec!"
    let paying: string = "To pay for a membership, click on the [`buy membership`]() button below, then hit the green button and fill in your student info. An exec will then review your request and give you the role! Membership costs £5"

    e.addFields(
        { name: "Benefits?", value: benefits },
        { name: "Disclaimer!", value: disclaimer },
        { name: "Pay for a membership", value: paying }
    );

    return e;
}

export function welcome_dm(user_id: string): EmbedBuilder {

    const e: EmbedBuilder = embedHelper({
        name: "lorem",
        desc: "ipsum"
    });

    
    const buying_membership: string = "";

    return e;
}


// Pulling bot token out of env
export const token = process.env.BOT_TOKEN;