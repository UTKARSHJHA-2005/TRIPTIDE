const OPENROUTER_API_KEY = import.meta.env.VITE_OPENROUTER_API;
console.log(OPENROUTER_API_KEY);

export const AI_Prompt = `
Generate a travel plan.

Location: {place}
Duration: {days} days
Budget: {budget}
Travel group: {travelGroup}

Return ONLY valid JSON.

Rules:
- No markdown
- No explanations
- No text outside JSON
- Limit hotels to 3
- Limit places per day to 4

JSON format:

{
 "location": "",
 "duration": "",
 "budget": "",
 "hotels":[
  {
   "hotel_name":"",
   "hotel_address":"",
   "price_range":"",
   "rating":"",
   "description":""
  }
 ],
 "itinerary":[
  {
   "day":1,
   "places":[
    {
     "place_name":"",
     "place_details":"",
     "ticket_pricing":"",
     "rating":"",
     "travel_time":"",
     "best_time_to_visit":""
    }
   ]
  }
 ]
}
`;
export const generateTripPlan = async (prompt) => {
  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": window.location.origin,
          "X-Title": "AI Travel Planner",
        },
        body: JSON.stringify({
          model: "openrouter/free",
          messages: [{ role: "user", content: prompt }],
          temperature: 1,
          max_tokens: 4096,
        }),
      },
    );

    const data = await response.json();

    if (!data.choices) {
      console.error("OpenRouter error:", data);
      throw new Error("AI response failed");
    }

    return data.choices[0].message.content;
  } catch (error) {
    console.error("OpenRouter fetch error:", error);
    throw error;
  }
};
