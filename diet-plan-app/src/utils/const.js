import water from "../assets/images/glass-of-water.svg";
import broccoli from "../assets/images/broccoli.svg";
import exercise from "../assets/images/exercise.svg";
import footprint from "../assets/images/footprint.svg";
import meditation from "../assets/images/meditation.svg";
import sleeping from "../assets/images/sleeping.svg";

export const detail = [
  {
    id: 1,
    question: "What’s your health goal? *",
    type: "fitnessGoals",
    option_type: "list",
    answer_type: null,
    answers: [
      { option: "I want to lose weight", isSelected: false },
      { option: "I want to manage my medical conditions", isSelected: false },
      { option: "I want to improve my overall health", isSelected: false },
      { option: "I want to learn more about HealthifyMe", isSelected: false },
    ],
  },
  {
    id: 2,
    question: "How old are you? *",
    type: "age",
    option_type: "list",
    answer_type: null,
    answers: [
      { option: "25 - 35 years", isSelected: false },
      { option: "36 - 45 years", isSelected: false },
      { option: "46 - 60 years", isSelected: false },
      { option: "over 60 years", isSelected: false },
    ],
  },
  {
    id: 3,
    question: "Select your gender *",
    type: "gender",
    option_type: "list",
    answer_type: null,
    answers: [
      { option: "Male", isSelected: false },
      { option: "Female", isSelected: false },
    ],
  },
  {
    id: 4,
    question: "Select your dietary preference *",
    type: "dietaryPreference",
    option_type: "list",
    answer_type: null,
    answers: [
      { option: "Vegetarian", isSelected: false },
      { option: "Non-Vegetarian", isSelected: false },
      { option: "Vegan", isSelected: false },
    ],
  },
  {
    id: 5,
    question: "Please enter your current weight below *",
    type: "weight",
    description: ["in Kilograms (kg)"],
    option_type: null,
    answer_type: "input",
  },
  {
    id: 6,
    question: "How tall are you? Please reply in centimetres(cm) *",
    description: [
      "You can refer to this chart for your height in cm.",
      "150 is 4 feet 11 inches",
      "155 is 5 feet 1 inch",
      "160 is 5 feet 3 inches",
      "165 is 5 feet 5 inches",
      "170 is 5 feet 7 inches",
      "175 is 5 feet 9 inches",
      "180 is 5 feet 11 inches",
      "185 is 6 feet 1 inch",
      "190 is 6 feet 3 inches",
    ],
    type: "height",
    option_type: null,
    answer_type: "input",
    // answers: [
    //   { option: "150 is 4 feet 11 inches", isSelected: false },
    //   { option: "155 is 5 feet 1 inch", isSelected: false },
    //   { option: "160 is 5 feet 3 inches", isSelected: false },
    //   { option: "165 is 5 feet 5 inches", isSelected: false },
    //   { option: "170 is 5 feet 7 inches", isSelected: false },
    //   { option: "175 is 5 feet 9 inches", isSelected: false },
    //   { option: "180 is 5 feet 11 inches", isSelected: false },
    //   { option: "185 is 6 feet 1 inch", isSelected: false },
    //   { option: "190 is 6 feet 3 inches", isSelected: false },
    // ],
  },
  {
    id: 7,
    question: "Are you at risk of any medical condition? *",
    type: "medicalHistory",
    option_type: "list",
    answer_type: null,
    answers: [
      { option: "PCOS/PCOD", isSelected: false },
      { option: "Diabetes", isSelected: false },
      { option: "Hypertension", isSelected: false },
      { option: "Physical Injury", isSelected: false },
      { option: "Cholesterol", isSelected: false },
      { option: "None", isSelected: false },
    ],
  },
];

export const dietNotes = [{ id: 1, img: water, title: '3-4 liters of Water' },
{ id: 2, img: broccoli, title: 'More green Veggies' },
{ id: 3, img: meditation, title: '10 mins Meditation' },
{ id: 4, img: exercise, title: '45 mins of Exercise' },
{ id: 5, img: sleeping, title: '08 hrs of Sleep' },
{ id: 6, img: footprint, title: '10,000 Steps/day' },
  ,]
