import { useState, useEffect } from "react";
import "/src/style/App.css";
import NewGameDisplay from "./NewGameDisplay";
import MainGame from "./MainGame";
import UpgradeSection from "./UpgradeSection";
import ExtraAinsleySection from "./ExtraAinsleySection";
// import BigAinsleyButton from "./BigAinsleyButton";
//  We might separate the timer later
// import Timer from "./Timer";

// --- --- --- ---
// Audio
// --- --- --- ---
const readyCook = new Audio("/assets/sounds/ainsley-ready-steady-cook.mp3");
const stopCooking = new Audio(
  "/assets/sounds/ainsley-stop-cooking-applause.mp3"
);
// const yeBoi = new Audio /assets/sounds/ainsley-ye-boi.mp3");
// const redTomatah = new Audio /assets/sounds/ainsley-red-tomatah.mp3");
// const greenPepper = new Audio /assets/sounds/ainsley-green-pepper.mp3");

export default function App() {
  // --- --- --- ---
  // Main Variables
  // --- --- --- ---
  // harriotsNumber is our main 'Total Cookies'
  const [harriotsNumber, setHarriotsNumber] = useState(0);
  //  harriotsPerSecond the number of Harriots the user gets per second
  const [harriotsPerSecond, setHarriotsPerSecond] = useState(1);
  const [extraAinsleys, setExtraAinsleys] = useState([]);

  // --- --- --- ---
  // Upgrades
  // --- --- --- ---
  const [userStats, setUserStats] = useState({
    harriotsNumber: 0,
    harriotsPerSecond: 0,
    greenPeppers: 0,
    redTomatahs: 0,
    palletKnives: 0,
    quickieBag: 0,
    extraAinsleys: 0,
    hasFiveHarriots: false
  });

  const upgrades = [
    {
      id: 1,
      name: "Green Pepper",
      upgradeName: "greenPeppers",
      cost: 10,
      increaseValue: 1,
      imageSource: "/assets/images/green-pepper.png",
      audio: new Audio("/assets/sounds/ainsley-green-pepper.mp3")
    },
    {
      id: 2,
      name: "Red Tomatah",
      upgradeName: "redTomatahs",
      cost: 50,
      increaseValue: 10,
      imageSource: "/assets/images/red-tomato.png",
      audio: new Audio("/assets/sounds/ainsley-red-tomatah.mp3")
    },
    {
      id: 3,
      name: "Pallet Knife",
      upgradeName: "palletKnives",
      cost: 100,
      increaseValue: 10,
      imageSource: "/assets/images/pallet-knife.png",
      audio: new Audio("/assets/sounds/ainsley-pallet-knife-nice-and-hot.mp3")
    },
    {
      id: 4,
      name: "Quickie Bag",
      upgradeName: "quickieBag",
      cost: 500,
      increaseValue: 50,
      imageSource: "/assets/images/quickie-bag.png",
      audio: new Audio("/assets/sounds/ainsley-quickie-bag.mp3")
    },
    {
      id: 5,
      name: "Extra Ainsley",
      upgradeName: "extraAinsleys",
      cost: 100,
      increaseValue: "Another Spinning Ainsley",
      imageSource: "/assets/images/ainsley-yeah-boi-cartoon-square.png",
      audio: new Audio("/assets/sounds/ainsley-ye-boi.mp3"),
      onclick: addExtraAinsleys,
      argument: "audio"
    }
  ];

  // --- --- --- ---
  // This timer happens every second, and adds the 'harriotsPerSecond' to the 'harriotsNumber'.
  // --- --- --- ---

  useEffect(() => {
    // console.log("effect has been called");
    // setHarriotsNumber((currentHarriots) => currentHarriots + harriotsPerSecond);
    // console.log("TimerClean component useEffect callback");
    const interval = setInterval(() => {
      // console.log("interval has been called");
      setHarriotsNumber(
        (currentHarriots) => currentHarriots + harriotsPerSecond
      );
      updateUserStorage();

      // console.log(harriotsPerSecond);
    }, 1000);

    return () => {
      // console.log("TimerClean component useEffect cleanup");
      clearInterval(interval);
    };
  }, [harriotsPerSecond, updateUserStorage]);

  // -- Timer ends here --

  // --- --- --- ---
  // Main 'Cookie' button. When you click Ainsley, you get One Harriot
  // --- --- --- ---
  function increaseAinsleys() {
    setHarriotsNumber((currentCount) => {
      return currentCount + 1;
    });
    if (!userStats.hasFiveHarriots) {
      if (harriotsNumber > 3) {
        userStats.hasFiveHarriots = true;
      }
    }
  }
  // --- --- --- ---
  // Main Upgrade function. Takes the numbers passed in from the button. Also updates the userStats
  // --- --- --- ---
  function increaseHPS(string, upgradeCost, upgradeValue, audio, upgradeName) {
    console.log(string, upgradeCost, upgradeValue);
    console.log(upgradeName);

    if (harriotsNumber > upgradeCost - 1) {
      setUserStats((prevUserStats) => ({
        ...prevUserStats,
        [upgradeName]: prevUserStats[upgradeName] + 1
      }));
      setHarriotsNumber((currentNumber) => currentNumber - upgradeCost);
      setHarriotsPerSecond(harriotsPerSecond + upgradeValue);
      audio.play();
    }
  }

  // --- --- --- ---
  //   This is where we use a toggle to start the game
  // --- --- --- ---
  const [showMainGame, setShowMainGame] = useState(false);

  function handleShowMainGame() {
    showMainGame
      ? (stopCooking.play(), setHarriotsNumber(harriotsNumber))
      : (readyCook.play(),
        setHarriotsNumber(0),
        setHarriotsPerSecond(0),
        setExtraAinsleys([]));
    setShowMainGame(!showMainGame);
  }

  // --- --- --- ---
  //   This puts extra small spinning Ainsleys into an array, to be displayed on the page.
  // --- --- --- ---
  function addExtraAinsleys() {
    // If the user can afford the cosmetic, spinning Ainsley Disc:
    if (harriotsNumber > 99) {
      const yeBoi = new Audio("/assets/sounds/ainsley-ye-boi.mp3");
      yeBoi.play();
      // Take some Harriots as cost:
      setHarriotsNumber((currentHarriots) => currentHarriots - 100);
      // And add another image source to the array. Bit yucky but it works
      setExtraAinsleys([
        ...extraAinsleys,
        "/assets/images/ainsley-yeah-boi-cartoon-square.png"
      ]);
      setUserStats((prevUserStats) => ({
        ...prevUserStats,
        extraAinsleys: prevUserStats.extraAinsleys + 1
      }));
    }
  }

  function updateUserStorage() {
    const beautiful = new Audio("/assets/sounds/ainsley-thats-beautiful.mp3");
    if (harriotsNumber > 30 && harriotsNumber % 150 === 0) {
      beautiful.play();
    }
    userStats.harriotsNumber = harriotsNumber;
    userStats.harriotsPerSecond = harriotsPerSecond;
    localStorage.setItem("userStats", JSON.stringify(userStats));
  }

  // --- --- --- ---
  // Main Component chunk
  // --- --- --- ---
  return (
    <>
      <div className="overlay"></div>
      {!showMainGame ? (
        <NewGameDisplay onClick={handleShowMainGame} />
      ) : (
        <div className="main-app flex">
          <ExtraAinsleySection extraAinsleys={extraAinsleys} />
          <div className="audio-section">
            <audio
              id="gorillaz-player"
              src="/assets/sounds/gorillaz-192000-volume.mp3"
              controls
              loop
            ></audio>
            <p> Play some phat beats.</p>
          </div>
          <MainGame
            harriotsNumber={harriotsNumber}
            harriotsPerSecond={harriotsPerSecond}
            increaseAinsleys={increaseAinsleys}
          />
          <p>
            <span className="harriots-per-second">{harriotsPerSecond}</span>{" "}
            Ħarriots Per Second
          </p>
          {userStats.hasFiveHarriots ? (
            <>
              <UpgradeSection
                upgrades={upgrades}
                increaseHPS={increaseHPS}
                userStats={userStats}
              />
            </>
          ) : (
            <>
              <h2 className="click-his-face">Click his face</h2>
              <p>...and play some tunes at the top.</p>
            </>
          )}
          <button className="reset-button" onClick={handleShowMainGame}>
            Reset your game
          </button>
          <footer>
            <a href="https://www.linkedin.com/in/frankie-shrieves/">Frankie</a>,{" "}
            <a href="https://github.com/frank-ventures/teched-week06-project">
              Github
            </a>
            , Ainsley and stuff
          </footer>
        </div>
      )}
    </>
  );
}
