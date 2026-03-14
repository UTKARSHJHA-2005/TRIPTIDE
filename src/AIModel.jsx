const OPENROUTER_API_KEY = "YOUR_OPENROUTER_KEY";

export const generateTripPlan = async (place, days, travelGroup, budget) => {

const AI_PROMPT = `Generate Travel Plan for Location:${place} for ${days} days for ${travelGroup} in a ${budget} budget, give me hotels options list with hotel name,hotel address, price, hotle image url,geo coordinates, rating,descriptions and suggest itenary with placename,place details, place image url,geo coordinates,ticket pricing,rating,time traveleach of the location for ${days} days with each day plan with best time to visit in JSON format`;

  try {

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions",{
      method:"POST",
      headers:{
        "Authorization":`Bearer ${OPENROUTER_API_KEY}`,
        "Content-Type":"application/json",
        "HTTP-Referer":"http://localhost:5173",
        "X-Title":"AI Travel Planner"
      },
      body: JSON.stringify({
        model:"meta-llama/llama-3.1-8b-instruct:free",
        messages:[
          {
            role:"user",
            content:AI_PROMPT
          }
        ],
        temperature:1,
        max_tokens:4096
      })
    });

    const data = await response.json();

    return data.choices[0].message.content;

  } catch(error){
    console.error("OpenRouter Error:",error);
  }

};