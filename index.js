import openai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
    console.log(colors.bold.green("Welcome to Ariyan's ChatBOT!!!"));
    console.log(colors.bold.green("You can start chatting now with the BOT!!!"));

    const chatHistory = []; // to store the chat history
    while (true) {
        const userInput = readlineSync.question(colors.bold.yellow("You: "));

        if (userInput.toLowerCase() === "exit") {
            console.log(colors.bold.green("Ariyan Bot: Goodbye!"));
            return;
        }

        try {
            // Construct message history correctly
            const messages = chatHistory.map(({ role, content }) => ({ role, content }));

            // Add user input to the messages array
            messages.push({ role: "user", content: userInput });

            // Call the API with user input
            const completion = await openai.chat.completions.create({
                model: "gpt-3.5-turbo", // Change this if needed
                messages: messages,
            });

            // Get the assistant's response
            const completionText = completion.choices[0]?.message?.content || "No response";

            console.log(colors.bold.green("Ariyan Bot: ") + completionText);

            // Update chat history
            chatHistory.push({ role: "user", content: userInput });
            chatHistory.push({ role: "assistant", content: completionText });
        } catch (error) {
            console.log(colors.bold.red("Error: "), error.message);
        }
    }
}

main();
