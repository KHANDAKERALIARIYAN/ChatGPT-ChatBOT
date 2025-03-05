import openai from "./config/openai.js";
import readlineSync from "readline-sync";
import colors from "colors";

async function main() {
    console.log(colors.bold.green("Welcome to Ariyan's ChatBOT!!!"));
    console.log(colors.bold.green("You can start chatting now with the BOT!!!"));

    const chatHistory = []; // to store the chat history
    while (true) {
        const userInput = readlineSync.question(colors.bold.yellow("You: "));

        try{
            // construct message by iterating over the chat history
            const messages = chatHistory.map(([role, content]) => ({ role, content }));
            
            // add latest user input to the chat history
            messages.push({ role: "user", content: userInput });

            // call the api with user input
            const completion = await openai.createCompletion({
                model: "gpt-3.5-turbo",
                messages: messages,
            });

            // get completion text/content
            const completionText = completion.data.choices[0].message.content;
            
            if(userInput.toLowerCase() === "exit"){
                console.log(colors.bold.green("Ariyan Bot: ") + completionText);
                return ;
            }
            console.log(colors.bold.green("Ariyan Bot: ") + completionText);

            // update history with user input and assistant response
            chatHistory.push(["user", userInput]);
            chatHistory.push(["assistant", completionText]);
        }
        catch (error) {
            console.log(colors.bold.red(error));
        }
    }
}


main();