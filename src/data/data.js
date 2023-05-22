/*
    title
    type : multi, single, 
    limit : (optional),
    answers : [], 
    comments : true, false, 
    results : public, vote, private,
    closeDate : (optional), 
    closed: true, false
*/

export const examplePolls = [
  {
    id: "1",
    title: "Single Answer Poll",
    type: "single",
    answers: ["1", "2", "3", "4", "5"],
    comments: true,
    results: "public",
    closed: false,
  },
  {
    id: "2",
    title: "Multiple Answers Poll",
    type: "multi",
    answers: ["1", "2", "3", "4", "5"],
    comments: false,
    results: "public",
    closed: false,
  },
  {
    id: "3",
    title: "3 Answers Poll",
    type: "multi",
    limit: 3,
    answers: ["1", "2", "3", "4", "5"],
    comments: false,
    results: "public",
    closed: false,
  },
];

/*
    pollId
    type : multi, single, 
    limit : (optional),
    answers : [], 
    comments : true, false, 
    results : public, vote, private,
    closeDate : (optional), 
    closed: true, false
*/

export const exampleResponses = [
  {
    id: "1",
    pollId: "1",
    answers: ["1"],
    comment: "Some comment",
  },
  {
    id: "2",
    pollId: "1",
    answers: ["3"],
    comment: "Another comment",
  },
  {
    id: "3",
    pollId: "1",
    answers: ["5"],
    comment: "Another comment",
  },
  {
    id: "4",
    pollId: "1",
    answers: ["1"],
    comment: "Some comment",
  },
  {
    id: "5",
    pollId: "1",
    answers: ["3"],
    comment: "Another comment",
  },
  {
    id: "6",
    pollId: "1",
    answers: ["2"],
    comment: "",
  },
  {
    id: "7",
    pollId: "2",
    answers: ["1", "2", "3"],
  },
  {
    id: "8",
    pollId: "2",
    answers: ["2", "3", "4", "5"],
  },
  {
    id: "9",
    pollId: "2",
    answers: ["1", "5"],
  },
  {
    id: "10",
    pollId: "3",
    answers: ["1", "2", "5"],
  },
  {
    id: "11",
    pollId: "3",
    answers: ["1", "2"],
  },
  {
    id: "12",
    pollId: "3",
    answers: ["3", "2"],
  },
];
