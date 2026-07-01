const moongoose = require("mongoose");

/** Interview Report Schema
 * job description schema
 * interview report schema
 * self description
 *
 *score :{
    matchScore : number,
} 
 * 
 * Technical questions :[{
 *    question : string,
 *    intention : string,
 *    answer : string,}]
 * 
 * behavorial question :[{
 *    question : string,
 *    intention : string,
 *    answer : string,}]
 * 
 * skill gaps :[{
 *    skill: "",
 *  severity :{
 *     type: string,
 *    enum : ["low", "medium", "high"]
 * }
 * }]
 * 
 * preparation plan :[{
 *   day : number,
 *    focus : string,
 *  tasks : [String]
 * 
 * }]
 */

const preparationPlanSchema = new moongoose.Schema({
    day: {
        type: Number,
        required: [true, "Day is required"],
    },

    focus:{
        type: String,
        required: [true, "Focus is required"],
    },

    tasks: {
        type: [String],
        required: [true, "Tasks are required"],
    }
})

const technicalQuestionSchema = new moongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "technical ,Question is required"],
        },

        intention: {
            type: String,
            required: [true, "intention is required"],
        },

        answer: {
            type: String,
            required: [true, "answer is required"],
        },
    },
    {
        _id: false,
    },
);

const behavorialQuestionSchema = new moongoose.Schema(
    {
        question: {
            type: String,
            required: [true, "technical ,Question is required"],
        },

        intention: {
            type: String,
            required: [true, "intention is required"],
        },

        answer: {
            type: String,
            required: [true, "answer is required"],
        },
    },
    {
        _id: false,
    },
);

const skillGapSchema = new moongoose.Schema({
    skill: {
        type: String,
        required: [true, "skill is required"]
    },

    severity: {
        type: String,
        enum: ["low", "medium", "high"],
        required: [true, "severity is required"]
    },
},

    {
        _id: false
    }
);

const interviewReportSchema = new moongoose.Schema({
    jobDescription: {
        type: String,
        required: [true, "Job description is required"],
    },

    resume: {
        type: String,
    },

    selfDescription: {
        type: String,
    },

    matchScore: {
        type: Number,
        min: 0,
        max: 100,
    },

    technicalQuestions: [technicalQuestionSchema],
    behavorialQuestions: [behavorialQuestionSchema],
    skillGaps: [skillGapSchema],
    preparationPlan: [preparationPlanSchema],
}, {
    timestamps: true
});


const interviewReportModel = moongoose.model("InterviewReport", interviewReportSchema);

module.exports = interviewReportModel;