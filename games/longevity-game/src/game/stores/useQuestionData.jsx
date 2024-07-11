import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";
import questions from "../data/questions.json";

export default create(
  subscribeWithSelector((set) => {
    return {
      data: questions,
    };
  })
);
