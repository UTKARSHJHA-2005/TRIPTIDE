const OPENROUTER_API_KEY = "";

export const AI_Prompt = `
Generate Travel Plan for Location:{place} for {days} days for {travelGroup} in a {budget} budget.

Return ONLY VALID JSON.

Rules:
1. Do not include explanations
2. Do not include markdown
3. Do not include text before or after JSON
4. Return valid JSON only


Give:
- Hotels list with
hotel_name
hotel_address
price_range
hotel_image_url
geo_coordinates
rating
description

- Itinerary with
place_name
place_details
place_image_url
geo_coordinates
ticket_pricing
rating
travel_time

Provide each day plan with best_time_to_visit.

Return ONLY valid JSON.
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
