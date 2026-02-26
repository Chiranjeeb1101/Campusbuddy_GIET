const { GoogleGenerativeAI } = require("@google/generative-ai");

async function check() {
    const genAI = new GoogleGenerativeAI("AIzaSyC7dgOm_qGk5wglEVn0WX6eZKE7Bii8eqQ");
    try {
        console.log("Listing models...");
        // The SDK doesn't have a direct 'listModels' yet in some versions, 
        // but we can try to fetch a known one with a different method.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("Success with gemini-1.5-flash");
    } catch (e) {
        console.error("Error:", e.message);
    }
}

check();
