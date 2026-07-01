const { GoogleGenAI } = require("@google/genai");
const { z } = require("zod");
const { zodToJsonSchema } = require("zod-to-json-schema");

const ai = new GoogleGenAI({
  apiKey: process.env.GOOGLE_GENAI_API_KEY,
});

async function invokeGeminiAi() {
  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: "Hello gemini ! Explain what is interview ?",
  });

  console.log(response.text);
}

const interviewReportSchema = z.object({
  matchScore: z
    .number()
    .min(0)
    .max(100)
    .describe(
      "The score between 0 and 100indicating how well the candidate's profile matches the job description.",
    ),

  technicalQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The technical question that can be asked in the interview.",
          ),
        intension: z
          .string()
          .describe(
            "The intension of interviewer behind asking this question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover in the answer, what approach to take while answering this question.",
          ),
      }),
    )
    .describe(
      "Technical questions that can be asked in the interview, along with their intension .",
    ),

  behavioralQuestions: z
    .array(
      z.object({
        question: z
          .string()
          .describe(
            "The behavioral question that can be asked in the interview.",
          ),
        intension: z
          .string()
          .describe(
            "The intension of interviewer behind asking this question.",
          ),
        answer: z
          .string()
          .describe(
            "How to answer this question, what points to cover in the answer, what approach to take while answering this question.",
          ),
      }),
    )
    .describe(
      "Behavioral questions that can be asked in the interview, along with their intension and how to answer them .",
    ),

  skillGaps: z
    .array(
      z.object({
        skill: z.string().describe("The skill that the candidate is lacking."),
        severity: z
          .enum(["low", "medium", "high"])
          .describe(
            "The severity of the skill gap i.e how important is this skill for the job role.",
          ),
      }),
    )
    .describe(
      "List of skill gaps in candidate's profile along with there severity",
    ),

  preparationPlan: z
    .array(
      z.object({
        day: z
          .number()
          .describe("The day number in preparation plan starting from 1."),
        focus: z
          .string()
          .describe(
            "The focus area for this day in preparation plan, e.g. Data Structures, System Design, Behavioral Questions etc.",
          ),
        tasks: z
          .array(z.string())
          .describe(
            "List of tasks to be completed on this day to follow the preparation plan, e.g. Read a book, Watch a video, Solve problems etc.",
          ),
      }),
    )
    .describe(
      "A detailed preparation plan for the candidate to improve their skills and prepare for the interview efficiently, with day-wise tasks and focus areas.",
    ),
});

async function generateInterviewReport({
  resume,
  selfDescription,
  jobDescription,
}) {
  const prompt = `You are an expert interview coach. Analyze the candidate's resume and job description, then generate a structured interview preparation report.

IMPORTANT: Your response must contain ONLY these fields:
- matchScore: a number from 0-100
- technicalQuestions: array of {question, intension, answer}
- behavioralQuestions: array of {question, intension, answer}  
- skillGaps: array of {skill, severity: "low"/"medium"/"high"}
- preparationPlan: array of {day, focus, tasks}

Do NOT add any other fields.

Resume: ${resume}
Self Description: ${selfDescription}
Job Description: ${jobDescription}`;



const response = await ai.models.generateContent({
  model: "gemini-2.5-flash",
  contents: prompt,
  config: {
    responseMimetype: "application/json",
    responseSchema: zodToJsonSchema(interviewReportSchema),
  }
})

 return JSON.parse(response.text);
}

module.exports = generateInterviewReport;
