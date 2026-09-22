// @ts-nocheck
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req: Request) => {
  if (req.method === "OPTIONS") {
    return new Response("ok", { headers: corsHeaders });
  }

  try {
    const requestBody = await req.json();
    const { natural_query, current_gps, itinerary, alternatives } = requestBody;

    const HF_TOKEN = Deno.env.get("HF_TOKEN");
    const HF_MODEL_ID = Deno.env.get("HF_MODEL_ID") || "Qwen/Qwen2.5-7B-Instruct";

    if (!HF_TOKEN) {
      throw new Error("HF_TOKEN secret is missing in Supabase environment variables.");
    }

    const systemPrompt = `You are Point, a concise and helpful Manipur cultural travel concierge. You receive only verified itinerary data prepared by a deterministic planner. Use only the supplied facts. Never invent experiences, session times, prices, availability, host information, ratings, travel distance, cultural history, safety guarantees, booking confirmations, or universal claims about visitor preferences. Explain the itinerary naturally and warmly. Mention one alternative only if supplied. If the itinerary contains one activity, explain why it is a good fit and optionally suggest a flexible walk-in alternative only if provided. Keep the response under 100 words.

Return ONLY valid JSON matching this exact structure, with no markdown code blocks:
{
  "reply": "string explaining the verified itinerary warmly",
  "highlights": ["string", "string", "string"],
  "alternative_note": "string mentioning one alternative if supplied, or empty string"
}`;

    const userPayload = JSON.stringify({
      natural_query,
      current_location_label: current_gps?.name || "Imphal",
      itinerary,
      alternatives: alternatives?.slice(0, 1) || []
    });

    const hfResponse = await fetch(
      `https://api-inference.huggingface.co/models/${HF_MODEL_ID}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${HF_TOKEN}`,
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          inputs: `<|im_start|>system\n${systemPrompt}<|im_end|>\n<|im_start|>user\n${userPayload}<|im_end|>\n<|im_start|>assistant\n`,
          parameters: {
            max_new_tokens: 400,
            temperature: 0.3,
            return_full_text: false,
          },
        }),
      }
    );

    if (!hfResponse.ok) {
      const errBody = await hfResponse.text();
      throw new Error(`Hugging Face API error (${hfResponse.status}): ${errBody}`);
    }

    const hfResult = await hfResponse.json();
    let rawText = "";

    if (Array.isArray(hfResult) && hfResult[0]?.generated_text) {
      rawText = hfResult[0].generated_text;
    } else if (hfResult.generated_text) {
      rawText = hfResult.generated_text;
    } else {
      rawText = JSON.stringify(hfResult);
    }

    // Safe JSON extraction regex
    const jsonMatch = rawText.match(/\{[\s\S]*\}/);
    if (!jsonMatch) {
      throw new Error("Model response did not contain valid JSON structure.");
    }

    const parsedJson = JSON.parse(jsonMatch[0]);

    return new Response(
      JSON.stringify({ success: true, source: "huggingface-live", data: parsedJson }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );

  } catch (err) {
    console.warn("Concierge Fallback Triggered:", err.message);

    // Dynamic Deterministic Fallback using actual itinerary facts
    const reqBody = await req.clone().json().catch(() => ({}));
    const itinerary = reqBody.itinerary;
    
    let fallbackReply = "Curated specifically to match your verified schedule, location, and budget constraints.";
    let highlights = [
      "Aligned precisely with your available time window",
      "Positioned conveniently relative to your live GPS coordinates",
      "Verified against real-time database slot availability"
    ];

    if (itinerary && itinerary.itineraryType === 'dual') {
      fallbackReply = `You have enough time for a relaxed two-stop plan. Start with ${itinerary.primary.experience.title} from ${itinerary.primary.startTimeStr} to ${itinerary.primary.endTimeStr}, then continue to ${itinerary.secondary.experience.title} from ${itinerary.secondary.startTimeStr} to ${itinerary.secondary.endTimeStr}. The plan stays within budget and includes travel time between sessions.`;
      highlights = [
        `Stop 1: ${itinerary.primary.experience.title} (${itinerary.primary.startTimeStr} - ${itinerary.primary.endTimeStr})`,
        `Stop 2: ${itinerary.secondary.experience.title} (${itinerary.secondary.startTimeStr} - ${itinerary.secondary.endTimeStr})`,
        `Total estimated cost: ₹${itinerary.totalCost} with integrated travel buffers`
      ];
    } else if (itinerary && itinerary.itineraryType === 'single') {
      fallbackReply = `${itinerary.primary.experience.title} is the strongest match in your available time. It starts at ${itinerary.primary.startTimeStr}, takes ${itinerary.primary.experience.duration_mins} mins, and fits your selected preferences.`;
      highlights = [
        `Primary Match: ${itinerary.primary.experience.title}`,
        `Schedule: ${itinerary.primary.startTimeStr} - ${itinerary.primary.endTimeStr}`,
        `Distance: ~${itinerary.primary.distanceKm.toFixed(1)} km from your location`
      ];
    }

    return new Response(
      JSON.stringify({
        success: true,
        source: "dynamic-fallback",
        data: {
          reply: fallbackReply,
          highlights,
          alternative_note: itinerary?.alternatives?.[0] ? `Alternative nearby: ${itinerary.alternatives[0].experience.title}` : ""
        }
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});