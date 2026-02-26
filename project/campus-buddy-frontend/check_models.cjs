const { GoogleGenerativeAI } = require("@google/generative-ai");

async function check() {
    const genAI = new GoogleGenerativeAI("AIzaSyC7dgOm_qGk5wglEVn0WX6eZKE7Bii8eqQ");
    try {
<<<<<<< HEAD
        console.log("Listing models...");
        // The SDK doesn't have a direct 'listModels' yet in some versions, 
        // but we can try to fetch a known one with a different method.
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const result = await model.generateContent("test");
        console.log("Success with gemini-1.5-flash");
=======
        // There is no listModels in the client-side SDK directly usually, 
        // but the REST API has it.
        // Let's try to just hit one that is ALMOST ALWAYS there for free tier.
        const models = ["gemini-1.5-flash", "gemini-1.5-pro", "gemini-1.0-pro"];
        for (const m of models) {
            try {
                console.log(`Checking ${m}...`);
                const model = genAI.getGenerativeModel({ model: m });
                const result = await model.generateContent("hi");
                console.log(`Success with ${m}: ${result.response.text()}`);
            } catch (e) {
                console.log(`Fail ${m}: ${e.message}`);
            }
        }
>>>>>>> 7d6b07693c5922b645f3c6f9161b66e5f398ac1f
    } catch (e) {
        console.error("Error:", e.message);
    }
}

check();
