// const Imap = require("imap");
// const { simpleParser } = require("mailparser");
// const { checkUrlSafety } = require("./utils/phishingCheck");
// require("dotenv").config();

// let monitoring = false;

// const startMonitoring = (io) => {
//     if (monitoring) {
//         console.log("Monitoring already running.");
//         return;
//     }

//     monitoring = true;

//     const imap = new Imap({
//         user: process.env.EMAIL,
//         password: process.env.APP_PASSWORD,
//         host: "imap.gmail.com",
//         port: 993,
//         tls: true,
//         tlsOptions: { rejectUnauthorized: false },
//     });

//     imap.once("ready", () => {
//         console.log("Connected to email inbox.");
//         io.emit("log", "Connected to email inbox.");

//         const fetchEmails = () => {
//             imap.openBox("INBOX", false, (err, box) => {
//                 if (err) throw err;

//                 imap.search(["UNSEEN"], (err, results) => {
//                     if (err || !results.length) return;

//                     const fetcher = imap.fetch(results, { bodies: "" });

//                     fetcher.on("message", (msg) => {
//                         msg.on("body", (stream) => {
//                             simpleParser(stream, async (err, parsed) => {
//                                 if (err) throw err;

//                                 const sender = parsed.from.text;
//                                 const subject = parsed.subject;
//                                 const text = parsed.text;

//                                 const logMessage = `Checking email from ${sender} - Subject: ${subject}`;
//                                 console.log(logMessage);
//                                 io.emit("log", logMessage);

//                                 const urls = text.match(/https?:\/\/[^\s]+/g) || [];
//                                 for (const url of urls) {
//                                     const isSafe = await checkUrlSafety(url);
//                                     if (!isSafe) {
//                                         const phishingAlert = `⚠️ Phishing detected: ${url} from ${sender}`;
//                                         console.log(phishingAlert);
//                                         io.emit("log", phishingAlert);
//                                     }
//                                 }
//                             });
//                         });
//                     });

//                     fetcher.once("end", () => {
//                         console.log("Email fetching done.");
//                         io.emit("log", "Email fetching done.");
//                     });
//                 });
//             });
//         };

//         fetchEmails();
//         setInterval(fetchEmails, 60000); // Check every 60 seconds
//     });

//     imap.once("error", (err) => {
//         console.log("IMAP error:", err);
//         io.emit("log", `IMAP error: ${err.message}`);
//     });

//     imap.connect();
// };

// module.exports = { startMonitoring };


const Imap = require("imap");
const { simpleParser } = require("mailparser");
const { checkUrlSafety } = require("./utils/phishingCheck");
require("dotenv").config();

let monitoring = false;
const blockedSenders = new Set(); // Store blocked senders in memory

const startMonitoring = (io) => {
    if (monitoring) {
        console.log("🚀 Monitoring already running.");
        return;
    }

    monitoring = true;

    const imap = new Imap({
        user: process.env.EMAIL,
        password: process.env.APP_PASSWORD,
        host: "imap.gmail.com",
        port: 993,
        tls: true,
        tlsOptions: { rejectUnauthorized: false },
    });

    imap.once("ready", () => {
        console.log("✅ Connected to email inbox.");
        io.emit("log", "✅ Connected to email inbox.");

        const fetchEmails = () => {
            imap.openBox("INBOX", false, (err, box) => {
                if (err) {
                    console.error("Error opening inbox:", err);
                    return;
                }

                imap.search(["UNSEEN"], (err, results) => {
                    if (err || !results.length) {
                        console.log("📭 No new emails.");
                        return;
                    }

                    const fetcher = imap.fetch(results, { bodies: "", markSeen: true });

                    fetcher.on("message", (msg, seqno) => {
                        msg.on("body", (stream) => {
                            simpleParser(stream, async (err, parsed) => {
                                if (err) {
                                    console.error("Error parsing email:", err);
                                    return;
                                }

                                const sender = parsed.from.text;
                                const subject = parsed.subject;
                                const text = parsed.text;

                                const logMessage = `📩 Checking email from ${sender} - Subject: ${subject}`;
                                console.log(logMessage);
                                io.emit("log", logMessage);

                                if (blockedSenders.has(sender)) {
                                    console.log(`🚫 Sender ${sender} is blocked. Moving to Spam.`);
                                    io.emit("log", `🚫 Sender ${sender} is blocked. Moving to Spam.`);
                                    imap.move(seqno.toString(), "[Gmail]/Spam", (err) => {
                                        if (err) console.error("Error moving to Spam:", err);
                                    });
                                    return;
                                }

                                const urls = text.match(/https?:\/\/[^\s]+/g) || [];
                                let isPhishing = false;

                                for (const url of urls) {
                                    const isSafe = await checkUrlSafety(url);
                                    if (!isSafe) {
                                        const phishingAlert = `⚠️ Phishing detected: ${url} from ${sender}`;
                                        console.log(phishingAlert);
                                        io.emit("log", phishingAlert);
                                        isPhishing = true;
                                    }
                                }

                                if (isPhishing) {
                                    console.log(`🚨 Moving phishing email from ${sender} to Spam.`);
                                    io.emit("log", `🚨 Moving phishing email from ${sender} to Spam.`);
                                    imap.move(seqno.toString(), "[Gmail]/Spam", (err) => {
                                        if (err) console.error("Error moving to Spam:", err);
                                    });

                                    console.log(`🛑 Blocking sender: ${sender}`);
                                    io.emit("log", `🛑 Blocking sender: ${sender}`);
                                    blockedSenders.add(sender);
                                }
                            });
                        });
                    });

                    fetcher.once("end", () => {
                        console.log("✅ Email fetching done.");
                        io.emit("log", "✅ Email fetching done.");
                    });
                });
            });
        };

        fetchEmails();
        setInterval(fetchEmails, 30000); // Check every 30 seconds
    });

    imap.once("error", (err) => {
        console.error("IMAP error:", err);
        io.emit("log", `IMAP error: ${err.message}`);
    });

    imap.connect();
};

module.exports = { startMonitoring };
