import { create } from "zustand";
import { subscribeWithSelector } from "zustand/middleware";

export default create(
  subscribeWithSelector((set) => {
    return {
      phase: "readyToStart", // jaka faza gry
      lifes: 3,
      goodAnswers: 0, // na razie nie wiem czy będzie zycie się zwiększało czy nie a to potrzebne do stanu gry w interface
      badAnswers: 0, // na razie nie wiem czy będzie zycie się zwiększało czy nie a to potrzebne do stanu gry w interface
      titleToShow: "",
      answerToShow: 0, //0 - brak odpowiedzi, 1 - dobra, -1 - zła
      stars: 0,
      starsLimitToWin: 3,
      timeToResetAnswer: 1000,
      // ready - gra gotowa do rozpoczęcia na sam start
      // play - gra rozpoczęta
      // levelCompleted - poziom ukończony
      // levelFailed - poziom nie ukończony

      isPreloading: true,

      setGameLoaded: () =>
        //gra załadowana
        {
          set((state) => {
            return { isPreloading: false };
          });
        },

      setTitleToShow: (title) => {
        set((state) => {
          return { titleToShow: title };
        });
      },

      resetAnswerToShow: () => {
        set((state) => {
          return { answerToShow: 0 };
        });
      },

      lostLife: () => {
        set((state) => {
          console.log("lostLife");

          if (state.lifes === 1) {
            if (state.stars >= state.starsLimitToWin)
              return {
                lifes: state.lifes - 1,
                phase: "gameCompleted",
                titleToShow: "",
                answerToShow: -1,
              };
            else
              return {
                lifes: state.lifes - 1,
                phase: "gameFailed",
                titleToShow: "",
                answerToShow: -1,
              };
          } else
            return {
              lifes: state.lifes - 1,
              titleToShow: "",
              answerToShow: -1,
            };
        });
        setTimeout(() => {
          set((state) => ({ answerToShow: 0 }));
        }, 1000);
      },

      addLife: () => {
        set((state) => {
          console.log("addLife");

          return {
            goodAnswers: state.goodAnswers + 1,
            titleToShow: "",
            answerToShow: 1,
          };
        });
        setTimeout(() => {
          set((state) => ({ answerToShow: 0 }));
        }, 1000);
      },

      finish: () => {
        set((state) => {
          console.log("finish line reached");
          if (state.stars >= state.starsLimitToWin)
            return {
              lifes: state.lifes - 1,
              phase: "gameCompleted",
              badAnswers: state.badAnswers + 1,
            };
          else
            return {
              lifes: state.lifes - 1,
              phase: "gameFailed",
              badAnswers: state.badAnswers + 1,
            };
        });
      },

      getStar: () => {
        set((state) => {
          return { stars: state.stars + 1 };
        });
      },

      start: () =>
        //rozpędzanie opony
        {
          set((state) => {
            return { phase: "play" };
          });
        },

      setLevelCompleted: () => {
        set((state) => {
          console.log("LEVEL COMPLETED");

          return { phase: "levelCompleted" };
        });
      },

      setLevelFailed: () => {
        set((state) => {
          console.log("LEVEL FAILED");

          return { phase: "levelFailed" };
        });
      },

      restart: () => {
        console.log("!!! restart");
        //state.res
        set((state) => {
          return {
            phase: "play",
            stars: 0,
            lifes: 3,
            goodAnswers: 0,
            badAnswers: 0,
            titleToShow: "",
          };
        });
      },
    };
  })
);
