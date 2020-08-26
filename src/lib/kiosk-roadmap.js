import { GestureController } from './GestureController.js';

import './roadmap-view.js';
import './roadmap-split.js';
import './roadmap-split-left.js';
import './roadmap-split-right.js';
import './roadmap-overview.js';
import './roadmap-bubbles.js';
import './roadmap-bubble.js';
import './roadmap-game.js';
import './roadmap-tabs.js';
import './roadmap-tab.js';
import './roadmap-pips.js';
import './roadmap-pip.js';

let content = `
  <style>
    :host {
      display: block;
      position: relative;
      height: 100%;
      width: 100%;
    }
    
    :host * {
      box-sizing: border-box;
    }
    
    .hidden {
      display: none;
    }

    main {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 240px;
      overflow: hidden;
    }
    
    main > * {
      position: absolute;
      top: 0;
      left: 0;
    }

    nav {
      display: block;
      position: absolute;
      bottom: 240px;
      left: 0;
      right: 0;
      height: 150px;
      text-align: center;
    }
    
    roadmap-pips {
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
    }    

    footer {
      position: absolute;
      bottom: 0;
      left: 0;
      right: 0;
      height: 240px;
      background: #d5000d;
    }
    
    roadmap-tabs {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
    }
    
    roadmap-tabs,
    roadmap-pips {
      opacity: 0;
      pointer-events: none;
      transition-property: opacity;
      transition-duration: 0.8s;
      transition-timing-function: ease;
    }
    
    .visible {
      opacity: 1;
      pointer-events: auto;
    }
    
    span.pop {
      color: red;
      display: block;
      margin-bottom: 1rem;
    }
    
    ul[slot=bullets] {
      padding-left: 0;
    }
    
    ul[slot=bullets] li {
      position: relative;
      display: block;
      margin-left: 50px;
      margin-bottom: 60px;
    }
    
    ul[slot=bullets] li.break-after {
      break-after: column;
    }
    
    ul[slot=bullets] li:before {
      content: "●";
      position: absolute;
      top: 0;
      right: calc(100% + 0.25em);
      font-size: 1em;
    }
    
    #back {
      position: fixed;
      bottom: 0;
      right: 0;
      z-index: 999999;
      width: 240px;
      padding: 40px 0;
      background: transparent;
      border: 0;
      text-align: center;
      color: #6d6d6d;
      font-family: "proxima nova bold";
      font-size: 1em;
      text-shadow: 1px 1px white, -1px -1px #444;
      display: flex;
      flex-flow: column nowrap;
      align-items: center;
      align-content: center;
      justify-content: center;
      transition-property: background, opacity;
      transition-timing-function: ease;
      transition-duration: 0.4s;
      margin-top: auto;
      opacity: 1;
      outline: none;
    }
    
    #back img {
      margin-bottom: 1em;
      filter:
        drop-shadow(0px 2px 0px white)
        drop-shadow(0px -2px 0px #444);
    }
    
    #back.hidden {
      opacity: 0;
      pointer-events: none;
    }
  </style>

  <main>
    <!-- SPLIT VIEW -->
    
    <roadmap-view id="intro">
      <roadmap-split>
        <roadmap-split-left>
          <h2> GAME ROADMAP </h2>
        </roadmap-split-left>
        <roadmap-split-right>
          <h2> GAME ROADMAP </h2>
        </roadmap-split-right>
      </roadmap-split>
    </roadmap-view>
    
    <!-- D49J -->
    
    <roadmap-view class="overview" data-system="D49J">
      <roadmap-overview>
        <img slot="title" src="sprites/logo-main-49.png">
        <roadmap-bubbles slot="bubbles">
          <roadmap-bubble data-title="Q1">
            <img src="sprites/logo-dynamitedash.png">
            <img src="sprites/logo-piggypennies.png">
          </roadmap-bubble>
          <roadmap-bubble data-title="Q2">
            <img src="sprites/logo-silenthill-escape.png">
            <img src="sprites/logo-silenthill-return.png">
            <img src="sprites/logo-kingdom.png">
            <img src="sprites/logo-pirate.png">
          </roadmap-bubble>
          <roadmap-bubble data-title="Q3">
            <img src="sprites/logo-aztec.png">
            <img src="sprites/logo-giza.png">
            <img src="sprites/logo-jackpot-wealth.png">
            <img src="sprites/logo-jackpot-fortune.png">
            <img src="sprites/logo-mayanchief.png">
            <img src="sprites/logo-chinashores.png">
          </roadmap-bubble>
          <roadmap-bubble data-title="Q4">
            <img src="sprites/logo-gowest.png">
            <img src="sprites/logo-masked-warrior.png">
            <img src="sprites/logo-xiang-luck.png">
            <img src="sprites/logo-xiang-wonderful.png">
          </roadmap-bubble>
        </roadmap-bubbles>
      </roadmap-overview>
    </roadmap-view>
    
    <!-- D49J / Q1 -->
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q1">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-dynamitedash-large.png">
        <img slot="logo2" src="sprites/logo-allaboard.png">
        <img slot="cabinet" src="sprites/single-allaboard-left.png">
        <p slot="description">
          FOLLOW THE PROSPECTOR TO A GOLDMINE OF FREE GAMES AND
          PROGRESSIVE JACKPOTS. PART OF THE PROVEN ALL ABOARD™ SLOT SERIES,
          EXPLOSIVE ACTION IS THE NAME OF THE GAME.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li> 1-Level linked progressive </li>
          <li> 4-Level non-incrementing jackpots </li>
          <li class="break-after"> Stay &amp; Spin™ </li>
          <li> Free game feature with increased wilds </li>
          <li> Two options for linked progressive reset value </li>
          <li> Line configuration options: F5, F10, F25, F50 </li>
          <li> Max Bet level options: 5, 8, 10 </li>
          <li> Denominations options: 1¢, 2¢, 5¢, 10¢, 25¢, $1 </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q1">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-piggypennies-large.png">
        <img slot="logo2" src="sprites/logo-allaboard.png">
        <img slot="cabinet" src="sprites/single-allaboard-piggy.png">
        <p slot="description">
          AS PART OF THE ALL ABOARD™ SLOT SERIES, PIGGY PENNIES IS A
          SYMBOL-DRIVEN ROMP LED BY A CHARMING CROWNED CHARACTER
          WHERE GOLDEN PROGRESSIVE OPPORTUNITIES ABOUND.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li> 1-Level linked progressive </li>
          <li> 4-Level non-incrementing jackpots </li>
          <li class="break-after"> Stay &amp; Spin™ </li>
          <li> Free game feature with increased wilds </li>
          <li> Two options for linked progressive reset value </li>
          <li> Line configuration options: F5, F10, F25, F50 </li>
          <li> Max Bet level options: 5, 8, 10 </li>
          <li> Denominations options: 1¢, 2¢, 5¢, 10¢, 25¢, $1 </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <!-- D49J / Q2 -->
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q2">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-silenthill-escape.png">
        <img slot="cabinet" src="sprites/single-silenthill-escape.png">
        <p slot="description">
          PRISONER-TURNED-PROTAGONIST MURPHY PENDLETON IS YOUR GUIDE
          THROUGH SILENT HILL'S HAUNTED ADVENTURES, ENCOUNTERING ZOMBIES
          AND BATTLING TOWERING MONSTERS FOR DRAMATIC JACKPOTS.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li> 2-Level linked progressives </li>
          <li class="break-after"> 3-Level standalone progressives </li>
          <li> Stay &amp; Spin™ </li>
          <li> ULTRA REELS 1024 WAYS™ </li>
          <li> Increased wilds during the free games </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q2">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-silenthill-return.png">
        <img slot="cabinet" src="sprites/single-silenthill-return.png">
        <p slot="description">
          YOUNG HEROINE HEATHER MASON COMES TO SILENT HILL ON A MISSION
          TO AVENGE HER ADOPTED FATHER. AS SHE TRIES TO FIND HER WAY THROUGH
          THE FOG, STRANGE SPIRITS AWAKEN SYMBOL-DRIVEN BONUSES.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li> 2-Level linked progressives </li>
          <li class="break-after"> 3-Level standalone progressives </li>
          <li> Stay &amp; Spin™ </li>
          <li> ULTRA REELS 1024 WAYS™ </li>
          <li> Free game feature with gigantic bonus symbols </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q2">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-kingdom-large.png">
        <img slot="cabinet" src="sprites/single-oceanspin.png">
        <p slot="description">
          UNDER THE SEA, OPPORTUNITY BUBBLES AND BURSTS IN CURRENTS OF
          INSTANT PROGRESSIVE JACKPOTS. FLOAT ALONG THROUGH A CORAL REEF
          AND KEEP COMPANY WITH MERMAIDS FOR FORTUNE-FILLED FUN.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li> Ocean Spin feature </li>
          <li class="break-after"> Credit prize awards </li>
          <li> Wheel spin bonus </li>
          <li> Random multipliers </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q2">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-pirate-large.png">
        <img slot="logo2" src="sprites/logo-oceanspin.png">
        <img slot="cabinet" src="sprites/single-pirate.png">
        <p slot="description">
          AHOY, MATEY! JOIN THE CREW AND HIT THE HIGH SEAS FOR AN
          ISLAND-HOPPING ADVENTURE FULL OF EXCITING FREE GAMES AND
          INSTANT PROGRESSIVE TREASURE.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li class="break-after"> Ocean Spin feature </li>
          <li> Credit prize awards </li>
          <li> Wheel spin bonus </li>
          <li> Random multipliers </li>
        </ul>
      </roadmap-game>
    </roadmap-view>

    <!-- D49J / Q3 -->

    <roadmap-view class="details" data-system="D49J" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-aztec-large.png">
        <img slot="cabinet" src="sprites/single-aztec.png">
        <p slot="description">
          THE ANCIENT EMPIRES OF MESOAMERICA HOLD TREASURE BEYOND
          IMAGINING, AS INTREPID PLAYERS EXPLORE GOLDEN PYRAMIDS IN
          SEARCH OF PROGRESSIVE JACKPOT REWARDS.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li> Strike Zone™ </li>
          <li> Cash Prize feature </li>
          <li class="break-after"> Wild-wild-wild added feature </li>
          <li> Free games feature </li>
          <li> Jackpot wheel feature </li>
          <li> Bonus Cache™ </li>
          <li> Multipliers </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-giza-large.png">
        <img slot="cabinet" src="sprites/single-giza.png">
        <p slot="description">
          THE MYSTERIES OF ANCIENT EGYPT REVEAL THEMSELVES ACROSS THE
          REELS. IF THE GODS ARE WITH YOU, THE SPHINX WILL USHER YOU
          INTO THE GREAT PYRAMIDS, AND THE PROGRESSIVE TREASURES WITHIN.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li> Strike Zone™ </li>
          <li> Cash Prize feature </li>
          <li class="break-after"> Wild-wild-wild added feature </li>
          <li> Free games feature </li>
          <li> Jackpot wheel feature </li>
          <li> Bonus Cache™ </li>
          <li> Multipliers</li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-jackpot-wealth.png">
        <img slot="cabinet" src="sprites/single-jackpot-wealth.png">
        <p slot="description">
          THIS BRILLIANTLY COLORED GAME IS A GLITTERING SHOWCASE OF
          ASIAN ART, WHERE FORTUNE IS BESTOWED ON THOSE WHO
          PURSUE ITS BLESSINGS.
        </p>
        <ul slot="bullets">
          <li> Integrated, symbol-driven jackpots </li>
          <li> Free game feature with progressive wilds </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-jackpot-fortune.png">
        <img slot="cabinet" src="sprites/single-jackpot-fortune.png">
        <p slot="description">
          THIS GAME COMBINES POWER, PROFIT AND PROTECTION—MAKING A
          PERFECTLY INSPIRING SLOT GAME CELEBRATION.
        </p>
        <ul slot="bullets">
          <li> Integrated, symbol-driven jackpots </li>
          <li> Free game feature with progressive wilds </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-mayanchief.png">
        <img slot="cabinet" src="sprites/single-mayanchief.png">
        <p slot="description">
          KONAMI'S POPULAR MAYAN CHIEF, ARRAYED IN HIS SIGNATURE
          GOLDEN HEADDRESS, MAKES A MASTERFUL RETURN.
        </p>
        <ul slot="bullets">
          <li> Inspired by Konami's classic Mayan Chief™ </li>
          <li> Integrated progressive jackpot game </li>
          <li> 2-Level linked progressive </li>
          <li> 2-Symbols-in-1 on the center reel </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-chinashores.png">
        <img slot="cabinet" src="sprites/single-chinashores.png">
        <p slot="description">
          THE FUN OF KONAMI'S ICONIC CHINA SHORES™ GOES TO ALL-NEW
          HEIGHTS IN A TOWERING PORTRAIT-ORIENTED GAME, COMPLETE
          WITH THE FAMILIAR GIANT PANDA YOU ALL KNOW AND LOVE.
        </p>
        <ul slot="bullets">
          <li> Inspired by Konami's classic China Shores™ </li>
          <li> Integrated progressive jackpot game </li>
          <li> 2-Level linked progressive </li>
          <li> 2-Symbols-in-1 on the center reel </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <!-- D49J / Q4 -->

    <roadmap-view class="details" data-system="D49J" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-gowest-large.png">
        <img slot="logo2" src="sprites/logo-allaboard.png">
        <img slot="cabinet" src="sprites/single-gowest.png">
        <p slot="description">
          THE ALL ABOARD™ SLOT SERIES HEADS INTO THE OLD WEST, WHERE
          STALWART SHERIFFS CHASE WILY OUTLAWS IN THE QUEST TO STOP
          A GREAT TRAIN ROBBERY.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li class="break-after">  1-Level linked progressive </li>
          <li> 4-Level non-incrementing jackpots </li>
          <li> Stay &amp; Spin™ </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-masked-warrior-large.png">
        <img slot="logo2" src="sprites/logo-allaboard.png">
        <img slot="cabinet" src="sprites/single-masked-warrior.png">
        <p slot="description">
          FEUDAL JAPAN IS THE BACKDROP FOR THIS INTRIGUE-FILLED INSTALLMENT
          OF ALL ABOARD™. SHINOBI, BETTER KNOWN AS NINJAS, PRACTICE THE
          LEGENDARY ART OF SUBTERFUGE, REVEALING PRIZES TO THOSE
          WHO CAN KEEP UP.
        </p>
        <ul slot="bullets">
          <li> Integrated linked progressive </li>
          <li class="break-after"> 1-Level linked progressive </li>
          <li> 4-Level non-incrementing jackpots </li>
          <li> Stay &amp; Spin™ </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-xiang-luck.png">
        <img slot="cabinet" src="sprites/single-xiang-luck.png">
        <p slot="description">
          As part of the Xiang Long Ju Bao series, Good Luck Festival
          gives you plenty to celebrate. Captivating Asian-inspired
          artwork turns heads and commands attention—with play that will
          keep the party going on and on and on.
        </p>
        <ul slot="bullets">
          <li> Integrated progressive jackpot game </li>
          <li> 1-Level linked progressive </li>
          <li class="break-after"> 4-Level fixed jackpots </li>
          <li> Hold &amp; Pay™ Feature, with a player-selectable spin bonus </li>
          <li> Ingot feature, with a chance to reveal instant credit awards, jackpots, or the Hold &amp; Pay feature </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D49J" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-xiang-wonderful.png">
        <img slot="cabinet" src="sprites/single-xiang-wonderful.png">
        <p slot="description">
          Brimming with splendor and magic, Wonderful Festival—part of
          the Xiang Long Ju Bo series—makes every spin an event.
          Distinctive Far East elements create an enchanting experience
          for players. It’s a celebration they won’t want to miss!
        </p>
        <ul slot="bullets">
          <li> Integrated progressive jackpot game </li>
          <li> 1-Level linked progressive </li>
          <li class="break-after"> 4-Level fixed jackpots </li>
          <li> Hold &amp; Pay™ Feature, with a player-selectable spin bonus </li>
          <li> Ingot feature, with a chance to reveal instant credit awards, jackpots, or the Hold &amp; Pay feature </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <!-- D27 -->
    
    <roadmap-view class="overview" data-system="D27">
      <roadmap-overview>
        <img slot="title" src="sprites/logo-main-27.png">
        <roadmap-bubbles slot="bubbles">
          <roadmap-bubble data-title="Q3">
            <img src="sprites/logo-fever-pots.png">
            <img src="sprites/logo-fever-charms.png">
            <img src="sprites/logo-selexion-kp3.png">
          </roadmap-bubble>
          <roadmap-bubble data-title="Q4">
            <img src="sprites/logo-celestial-moon.png">
            <img src="sprites/logo-celestial-sun.png">
            <img src="sprites/logo-playslike-bull.png">
            <img src="sprites/logo-playslike-cobra.png">
            <img src="sprites/logo-playslike-moai.png">
            <img src="sprites/logo-playslike-volcanic.png">
            <img src="sprites/logo-playslike-elemental.png">
            <img src="sprites/logo-selexion-cp1.png">
          </roadmap-bubble>
          <roadmap-bubble data-title="Q1" class="special">
            <img src="sprites/logo-patrick-pots.png">
            <img src="sprites/logo-wishes.png">
            <img src="sprites/logo-coinstreak.png">
            <img src="sprites/logo-selexion-cp2.png">
          </roadmap-bubble>
          <roadmap-bubble data-title="Q2">
            <img src="sprites/logo-mystical-temple.png">
            <img src="sprites/logo-future-series.png">
            <img src="sprites/logo-chinashores-link.png">
          </roadmap-bubble>
        </roadmap-bubbles>
      </roadmap-overview>
    </roadmap-view>
    
    <!-- D27 / Q3 -->
    
    <roadmap-view class="details" data-system="D27" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-fever-pots.png">
        <img slot="cabinet" src="sprites/cabinet-fever-pots-27-red-topper-iso.png">
        <p slot="description">
          THE EXCITEMENT CAN’T BE CONTAINED WHEN THESE POTS FILL AND REFILL WITH
          FORTUNE, THANKS TO THE REPEAT FEVER FEATURE. 
        </p>
        <ul slot="bullets">
          <li> Get paid again and again in the <br> Repeat Fever feature </li>
          <li> Progressive jackpot feature can be <br> triggered during base game or <br> Repeat Fever feature </li>
          <li> 1-level linked progressive jackpot, 1-level <br> stand-alone progressive jackpot, and 2-level <br> non-incrementing jackpot </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-fever-charms.png">
        <img slot="cabinet" src="sprites/cabinet-fever-charms-27-blue-topper-iso.png">
        <p slot="description">
          YOU’LL BE CHARMED, AGAIN AND AGAIN, AS GLITTERING ICONS OF THE EAST REWARD
          THOSE WHO TRIGGER THE REPEAT FEVER FEATURE ON THE WAY TO ALLURING PROGRESSIVES. 
        </p>
        <ul slot="bullets">
          <li> Get paid again and again in the <br> Repeat Fever feature </li>
          <li> Progressive jackpot feature can be <br> triggered during base game or <br> Repeat Fever feature </li>
          <li> 1-level linked progressive jackpot, 1-level <br> stand-alone progressive jackpot, and 2-level <br> non-incrementing jackpot </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q3">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-selexion-kp3.png">
        <img slot="logo1" src="sprites/logo-selexion-2020-q3.png">
        <img slot="cabinet" src="sprites/cabinet-selexion-27-2020-q3.png">
        <p slot="description">
          THIS IS A WHOLE LOT OF WOW IN ONE PACKAGE. EVERY TITLE IS A STANDOUT AND
          EACH OPTION IS BUILT FOR FLEXIBILITY. IT’S OUR WAY OF SAYING, “YOU CAN HAVE IT ALL!” 
        </p>
        <ul slot="bullets">
          <li> Popular multi-game software allows players to select from a mix of proven KP3+ Platform™ titles </li>
          <li> Operator can choose how many of these themes are enabled </li>
          <li> Instantaneous game selection, denomination and language options create flexibility and convenience </li>
          <li> Dynamic button panel instantly adapts to game & language selection and displays all available themes in the game selection menu </li>
          <li> Defaults to multi-game attract screen on idle, with games displayed according to performance </li>
          <li> Featured titles include: Chili Chili Fire™ | Dragon’s Law Twin Fever™ | Sparkling Roses™ | Lion Carnival™ | Cobra Hearts™ | Lotus Land™ | Mammoth Power™ | 5 Elemental Legends™ </li>
        </ul>
      </roadmap-game>
    </roadmap-view>

    <!-- D27 / Q4 -->
    
    <roadmap-view class="details" data-system="D27" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-celestial-moon.png">
        <img slot="cabinet" src="sprites/cabinet-celestial-moon-27-blue-topper-iso.png">
        <p slot="description">
          SHOOT FOR THE MOON WITH THE STRIKE ZONE™ FEATURE ON EVERY SPIN. THE HIGHER
          THE BET, THE BIGGER THE RICHES—FOR A GLOW-UP OF COSMIC PROPORTIONS.
        </p>
        <ul slot="bullets">
          <li> Win up to 20 free games and 2x pay! </li>
          <li> The Strike Zone™ appears on every spin, and its size is determined by the player’s Strike Zone bet level </li>
          <li class="break-after"> Any Wild Symbol appearing in the Strike Zone randomly transforms into either 2X WILD or 3X WILD </li>
          <li> Each Scatter (Moon) symbol appearing in the Strike Zone changes to Special Scatter (Special Moon) symbol </li>
          <li> Wheel feature is triggered if one or more Special Scatter symbols appear when the free game feature is triggered or retriggered </li>
          <li> Wheel prizes include: credits, additional free games and upgrade multipliers to 3X and 5X </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-celestial-sun.png">
        <img slot="cabinet" src="sprites/cabinet-celestial-sun-27-red-topper-iso.png">
        <p slot="description">
          IT’S EVERYTHING UNDER THE SUN, ALL IN ONE HOTTER-THAN-HOT GAME: WILD
          SYMBOLS, THE STRIKE ZONE™ FEATURE ON EVERY SPIN, WHEEL PRIZES, AND
          UPGRADE MULTIPLIERS.
        </p>
        <ul slot="bullets">
          <li> Win up to 20 free games and 2x pay! </li>
          <li> The Strike Zone™ appears on every spin, and its size is determined by the player’s Strike Zone bet level </li>
          <li class="break-after"> Any Wild Symbol appearing in the Strike Zone randomly transforms into either 2X WILD or 3X WILD </li>
          <li> Each Scatter (Sun) symbol appearing in the Strike Zone changes to Special Scatter (Special Sun) symbol </li>
          <li> Wheel feature is triggered if one or more Special Scatter symbols appear when the free game feature is triggered or retriggered </li>
          <li> Wheel prizes include: credits, additional free games and upgrade multipliers to 3X and 5X </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-playslike-bull.png">
        <img slot="cabinet" src="sprites/cabinet-playslike-bull-27-red-topper-iso.png">
        <p slot="description">
          STEP INTO THE RING AND TAKE THIS GAME BY THE HORNS. SHOWERS OF GOLDEN
          ROSES, MAGNIFICENT SNORTING BULLS, AND THE BALANCE OF FORTUNE™ WILL HAVE
          YOU SHOUTING “OLÉ!” 
        </p>
        <ul slot="bullets">
          <li> New game inspired by the success of <br> Konami’s popular Bull Mystery™ </li>
          <li> Action Stacked Symbols® on all reels </li>
          <li> Free Games pay 2x and are always <br> played on max lines </li>
          <li> Balance of Fortune™ Feature allows free games to be exchanged for Super Free Games </li>
          <li> Players can win up to 12 Free Games on each active payline, or weigh their chances with the Balance of Fortune™ Feature </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-playslike-cobra.png">
        <img slot="cabinet" src="sprites/cabinet-playslike-cobra-27-blue-topper-iso.png">
        <p slot="description">
          PLAYS LIKE, AND PAYS LIKE. FORTUNE STRIKES WITH WILD MULTIPLIERS, FREE GAMES,
          AND A CAPTIVATING SNAKE CHARMER WHO RAISES GOLDEN OPPORTUNITIES.
        </p>
        <ul slot="bullets">
          <li> New game inspired by the success of Konami’s popular Cobra Hearts™ </li>
          <li> Reels 2, 3 and 4 contain a number of positions that are randomly replaced with wild multipliers before the reel spin </li>
          <li> If a wild multiplier substitutes in a win, it will multiply the pay by 2x, 3x or 5x, respectively </li>
          <li> During the Free Games, any wild multiplier symbols appearing one frame out of the reel window replace the symbol above/below it </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-playslike-moai.png">
        <img slot="cabinet" src="sprites/cabinet-playslike-moai-27-blue-topper-iso.png">
        <p slot="description">
          MYSTERIOUS STONE MONUMENTS, PAINTED MASKS, AND PACIFIC ISLAND CHARM HOLD
          ACTION STACKED SYMBOLS® ON EVERY GORGEOUS REEL.
        </p>
        <ul slot="bullets">
          <li> New game inspired by the success of <br> Konami’s popular Great Moai™ </li>
          <li class="break-after"> Action Stacked Symbols® appear <br> on all reels </li>
          <li> Randomly, full reel Wild symbols appear during/after the reel spin, during the Wild Feature </li>
          <li> During the Wild Feature, full reel Wild symbols may have 2x multiplier </li>
          <li> Wild Feature occurs frequently during the free games </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-playslike-elemental.png">
        <img slot="cabinet" src="sprites/cabinet-playslike-elemental-27-red-topper-iso.png">
        <p slot="description">
          DAZZLINGLY BEJEWELED AND STACKED WITH TREASURE, IT’S LITTLE WONDER THAT THIS
          GAME IS POPULAR. ESPECIALLY WHEN THERE’S A 40X PAY POSSIBILITY.
        </p>
        <ul slot="bullets">
          <li> New game inspired by the success of Konami’s popular 5 Elemental Legends™ </li>
          <li> Action Stacked Symbols® appear on all reels except reel 3 and includes all symbols except Wild and Scatter </li>
          <li> 2 Symbols in 1 appear on reel 3 </li>
          <li> Wild symbol appears only on reel 3 and substitutes for all symbols except Scatter </li>
          <li> Win up to 20 Free Games or up to 40x pay </li>
          <li> During the Free Game Feature, player selects the number of free games and multiplier options, or the Mystery option </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-playslike-volcanic.png">
        <img slot="cabinet" src="sprites/cabinet-playslike-volcanic-27-blue-topper-iso.png">
        <p slot="description">
          ERUPTING WITH WILD SYMBOLS, RANDOM MULTIPLIERS, AND ACTION STACKED
          SYMBOLS®, THIS POPULAR “PLAYS LIKE” IS AN ISLAND OF UNTAPPED WEALTH.
        </p>
        <ul slot="bullets">
          <li> New game inspired by the success of Konami’s popular Volcanic Rock Fire™ </li>
          <li> Action Stacked Symbols® </li>
          <li> Xtra Reward® </li>
          <li> Wild feature randomly scatters additional wild symbols across the reels </li>
          <li> Random multipliers up to 10x can also be awarded during the wild feature </li>
          <li> Free game feature </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q4">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-selexion-cp1.png">
        <img slot="logo1" src="sprites/logo-selexion-2020-q4.png">
        <img slot="cabinet" src="sprites/cabinet-selexion-27-2020-q4.png">
        <p slot="description">
          A CURATED COLLECTION OF K2V PLATFORM™ PERFORMERS FINDS VIVID LIFE IN THE
          NEW DIMENSION 27™ PACKAGE, PROVING THAT CHOICES ARE A BEAUTIFUL THING.
        </p>
        <ul slot="bullets">
          <li> Popular multi-game software allows players to select from a mix of proven K2V Platform™ titles </li>
          <li> Operator can choose how many of these themes are enabled </li>
          <li> Instantaneous game selection, denomination and language options create flexibility and convenience </li>
          <li> Dynamic button panel instantly adapts to game & language selection and displays all available themes in the game selection menu </li>
          <li> Defaults to multi-game attract screen on idle, with games displayed according to performance </li>
          <li> Featured titles include: Roman Tribune™ | Ancient Dragon™ | Money Blast™ | China Shores™ | Rawhide™ </li>
        </ul>
      </roadmap-game>
    </roadmap-view>

    <!-- D27 / Q1 -->
    
    <roadmap-view class="details" data-system="D27" data-phase="Q1">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-patrick-pots.png">
        <img slot="cabinet" src="sprites/cabinet-comingsoon-27-red.png">
        <p slot="description">
          <span class="pop"> ALL-NEW • ORIGINAL </span> CAPTURE THE LUCK OF THE LEPRECHAUN
          AND FOLLOW HIM THROUGH A SHIMMERING WORLD OF GREEN TO GOLDEN JACKPOTS.
        </p>
        <ul slot="bullets">
          <li class="break-after"> Original new Konami Game </li>
          <li> Leprechaun themed title, with shimmering gold and green animated art </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q1">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-wishes.png">
        <img slot="cabinet" src="sprites/cabinet-comingsoon-27-blue.png">
        <p slot="description">
          <span class="pop"> ALL-NEW • ORIGINAL </span> MAGICAL ADVENTURE AND
          ASTOUNDING LUCK MAKE THIS TITLE EVERYTHING YOU COULD POSSIBLY WISH FOR.
        </p>
        <ul slot="bullets">
          <li class="break-after"> Original new Konami Game </li>
          <li> Players can discover astounding luck and adventure when they awaken the magic power of the lamp  </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q1">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-coinstreak.png">
        <img slot="cabinet" src="sprites/cabinet-comingsoon-27-red.png">
        <p slot="description">
          <span class="pop"> ALL-NEW • ORIGINAL SERIES </span>
          BRING YOUR GOOD FORTUNE TO THE BANK. 
        </p>
        <ul slot="bullets">
          <li class="break-after"> Original new Konami Game </li>
          <li> Players can bring their good fortune to the bank when they take their shot at Coin Streak </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q1">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-selexion-cp2.png">
        <img slot="logo1" src="sprites/logo-selexion-2021-q1.png">
        <img slot="cabinet" src="sprites/cabinet-selexion-27-2021-q1.png">
        <p slot="description">
          ADVENTURES FROM AROUND THE WORLD. EXOTIC THEMES AND ICONIC CHARACTERS.
          THESE PLAYER-FAVORITES FROM THE K2V PLATFORM™ MAKE THE MOST OF THE MULTIGAME FORMAT.
        </p>
        <ul slot="bullets">
          <li> Popular multi-game software allows players to select from a mix of proven K2V Platform™ titles </li>
          <li> Operator can choose how many of these themes are enabled </li>
          <li> Instantaneous game selection, denomination and language options create flexibility and convenience </li>
          <li> Dynamic button panel instantly adapts to game & language selection and displays all available themes in the game selection menu </li>
          <li> Defaults to multi-game attract screen on idle, with games displayed according to performance </li>
          <li> Featured titles include: China Shores Boosted Wins & Spins™ | Mayan Chief™ | Chip City™ | China Mystery™ | Jumpin’ Jalapenos™ | African Diamond™ </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <!-- D27 / Q2 -->
    
    <roadmap-view class="details" data-system="D27" data-phase="Q2">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-mystical-temple.png">
        <img slot="cabinet" src="sprites/cabinet-comingsoon-27-red.png">
        <p slot="description">
          IN EVERY CORNER OF THE WORLD, ANCIENT TEMPLES AND LINKED PROGRESSIVE
          TREASURES LIE IN WAIT. EXPLORE, COLLECT THE SYMBOLS, AND OPEN THE MASSIVE
          STONE DOORS TO UNTOLD RICHES.
        </p>
        <ul slot="bullets">
          <li class="break-after"> Inspired by Konami’s popular Mystical Temple™ </li>
          <li> Linked progressive series </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q2">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-future-series.png">
        <img slot="cabinet" src="sprites/cabinet-comingsoon-27-blue.png">
        <p slot="description">
          COMING SOON <br>
          AN ORIGINAL NEW JACKPOT SERIES 
        </p>
        <ul slot="bullets">
          <li class="break-after"> Original new jackpot series  </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
    
    <roadmap-view class="details" data-system="D27" data-phase="Q2">
      <roadmap-game>
        <img slot="logo1" src="sprites/logo-chinashores-link.png">
        <img slot="cabinet" src="sprites/cabinet-comingsoon-27-red.png">
        <p slot="description">
          THIS IS THE TITLE THAT CREATED A DYNASTY. SPANNING PLATFORMS AND SPREADING
          THE WEALTH, IT’S COMING TO DIMENSION 27™ WITH LINKED PROGRESSIVES.
        </p>
        <ul slot="bullets">
          <li class="break-after"> Inspired by Konami’s popular China Shores™ </li>
          <li> Linked progressive series </li>
        </ul>
      </roadmap-game>
    </roadmap-view>
  </main>

  <nav>
    <!--
    <roadmap-pips data-system="D49J" data-phase="Q1">
      <roadmap-pip></roadmap-pip>
    </roadmap-pips>
    -->
  </nav>

  <footer>
    <roadmap-tabs data-system="default">
      <roadmap-tab class="active"> <span> 2020 / 2021 </span> </roadmap-tab>
    </roadmap-tabs>
    
    <roadmap-tabs data-system="2020">
      <roadmap-tab class="active"> <span> 2020 </span> </roadmap-tab>
    </roadmap-tabs>
    
    <roadmap-tabs data-system="D49J">
      <roadmap-tab data-phase="Q1"> <span> Q1 </span> </roadmap-tab>
      <roadmap-tab data-phase="Q2"> <span> Q2 </span> </roadmap-tab>
      <roadmap-tab data-phase="Q3"> <span> Q3 </span> </roadmap-tab>
      <roadmap-tab data-phase="Q4"> <span> Q4 </span> </roadmap-tab>
    </roadmap-tabs>

    <roadmap-tabs data-system="D27">
      <roadmap-tab data-phase="Q3"> <span> Q3 </span> </roadmap-tab>
      <roadmap-tab data-phase="Q4"> <span> Q4 </span> </roadmap-tab>
      <roadmap-tab data-phase="Q1"> <span> Q1 </span> </roadmap-tab>
      <roadmap-tab data-phase="Q2"> <span> Q2 </span> </roadmap-tab>
    </roadmap-tabs>
  </footer>
  
  <button id="back" class="hidden"> <img src="sprites/icon-back.png" alt=""> <span> BACK </span> </button>
`;

class KioskRoadmap extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode : 'open' });
    this.shadowRoot.innerHTML = content;
  }
  
  connectedCallback() {
    let roadmap = this;
    roadmap.init();
  }
  
  get views() {
    return Array.from(this.ui.main.children);
  }
  
  get viewDelay() {
    let node = this.ui.main.firstElementChild;
    let d = parseFloat(getComputedStyle(node).getPropertyValue('transition-duration')) * 1000;
    if (!d) { d = 250; }
    return d;
  }
  
  init() {
    let roadmap = this;
    roadmap.ui = {};
    
    roadmap.ui.main = roadmap.shadowRoot.querySelector('main');
    roadmap.ui.intro = roadmap.shadowRoot.querySelector('#intro');
    roadmap.ui.nav = roadmap.shadowRoot.querySelector('nav');
    roadmap.ui.footer = roadmap.shadowRoot.querySelector('footer');
    roadmap.ui.back = roadmap.shadowRoot.querySelector('button#back');

    roadmap.ui.intro.querySelector('roadmap-split-left').addEventListener('click', event => {
      roadmap.showTabs('2020');
      roadmap.showOverview('D49J');
    });
    
    roadmap.ui.intro.querySelector('roadmap-split-right').addEventListener('click', event => {
      roadmap.showTabs('default');
      roadmap.showOverview('D27');
    });
    
    roadmap.ui.main.querySelectorAll('.overview').forEach(o => {
      o.querySelectorAll('roadmap-bubble').forEach(b => {
        b.logos.forEach((icon, index) => {
          icon.addEventListener('click', event => {
            roadmap.showTabs(o.dataset.system);
            roadmap.showNav(o.dataset.system, b.dataset.title, index);
            roadmap.showGame(o.dataset.system, b.dataset.title, index);
          });
        });
      });
    });
    
    roadmap.ui.main.querySelectorAll('.details').forEach(d => {
      let g = new GestureController(d);
      let selector = `[data-system="${d.dataset.system}"][data-phase="${d.dataset.phase}"]`;
      let siblings = roadmap.ui.main.querySelectorAll('roadmap-view' + selector);
      siblings = Array.from(siblings);
      let index = siblings.indexOf(d);
      
      if (index+1 <= siblings.length-1) {
        g.on('left', event => {
          roadmap.showGame(d.dataset.system, d.dataset.phase, index+1);
        });
      }
      
      if (index-1 >= 0) {
        g.on('right', event => {
          roadmap.showGame(d.dataset.system, d.dataset.phase, index-1);
        });
      }
    });
    
    roadmap.buildNav = function(system, phase) {
      let pips = document.createElement('roadmap-pips');
      pips.dataset.system = system;
      pips.dataset.phase = phase;
      
      let selector = `[data-system="${system}"][data-phase="${phase}"]`;
      
      let pf = document.createDocumentFragment();
      roadmap.ui.main.querySelectorAll('roadmap-view' + selector).forEach((v,i) => {
        let pip = document.createElement('roadmap-pip');
        pip.addEventListener('click', event => {
          roadmap.showGame(system, phase, i);
        });
        pf.append(pip);
      });
      pips.append(pf);
      
      pips.addEventListener('next', event => {
        roadmap.showGame(system, phase, pips.index+1);
      });
      
      pips.addEventListener('prev', event => {
        roadmap.showGame(system, phase, pips.index-1);
      });
      
      roadmap.ui.nav.append(pips);
    };
    
    roadmap.showNav = function(system, phase, index) {
      let selector = `[data-system="${system}"][data-phase="${phase}"]`;
      roadmap.hideNavs();
      let nav = roadmap.ui.nav.querySelector('roadmap-pips' + selector);
      nav.classList.add('visible');
    };
    
    roadmap.hideNavs = function() {
      roadmap.ui.nav.querySelectorAll('roadmap-pips').forEach(n => {
        n.querySelectorAll('roadmap-pip').forEach(p => {
          p.classList.remove('active');
        });
        n.classList.remove('visible');
      });
    };
    
    roadmap.queue = [];
    
    roadmap.queueView = function(view, callback) {
      let v = {
        view: view,
        callback : callback
      };
      roadmap.queue = [v];
      roadmap.runQueue();      
    };
    
    roadmap.runQueue = function() {
      if (roadmap.running === true) { return; }
      roadmap.running = true;
      let v = roadmap.queue.shift();
      roadmap.showView(v.view, function() {
        v.callback(v.view);
        roadmap.running = false;
        if (roadmap.queue.length) {
          roadmap.runQueue();
        }
      });
    };
    
    roadmap.showView = function(selector, callback) {
      roadmap.hideViews(function(){
        setTimeout(function(){
          let v; if (typeof selector == 'string') {
            v = roadmap.ui.main.querySelector(selector);
          } else { v = selector; }
          if (v) { v.classList.add('visible'); }
          typeof callback == 'function' && callback(v);
        }, 150);
      });
    };
    
    roadmap.hideViews = function(callback) {
      roadmap.hideParts();
      roadmap.views.forEach((v,i) => {
        v.classList.remove('visible');
        v.classList.add('hiding');
        setTimeout(function(){
          v.classList.remove('hiding');
          if (
            i == roadmap.views.length-1 &&
            typeof callback == 'function'
          ) {
            callback();
          }
        }, roadmap.viewDelay);
      });
    };
    
    roadmap.hideParts = function() {
      roadmap.hideIntro();
      roadmap.hideOverviews();
      roadmap.hideGames();
    };
    
    roadmap.showIntro = function() {
      roadmap.hideBack();
      roadmap.showTabs('default');
      roadmap.showView('#intro', function(v) {
        v.querySelector('roadmap-split-left').show();
        v.querySelector('roadmap-split-right').show();
      });
    };
    
    roadmap.hideIntro = function() {
      roadmap.ui.main.querySelector('#intro roadmap-split-left').hide();
      roadmap.ui.main.querySelector('#intro roadmap-split-right').hide();
    }
    
    roadmap.showOverview = function(system, quick) {
      roadmap.showBack();
      roadmap.showTabs(system);
      
      if (system == 'D49J') { roadmap.showTabs('2020');
      } else { roadmap.showTabs('default'); }
      
      roadmap.showView(`.overview[data-system=${system}]`, v => {
        let o = v.querySelector('roadmap-overview');
        if (!o) return;
        if (quick === true) { o.quickShow(); }
        else { o.show(); }
      });
    };
    
    roadmap.hideOverviews = function() {
      roadmap.ui.main.querySelectorAll('.overview').forEach(o => {
        o.querySelector('roadmap-overview').hide();
        o.classList.remove('visible');
      });
    };
    
    roadmap.showGame = function(system, phase, index) {
      let selector = `[data-system=${system}][data-phase=${phase}]`;
      
      let pips = roadmap.ui.nav.querySelector('roadmap-pips' + selector);
      let details = roadmap.ui.main.querySelectorAll('.details' + selector)[index];
      let tab = roadmap.ui.footer.querySelector(`roadmap-tabs.visible roadmap-tab[data-phase=${phase}]`);

      roadmap.showBack();
      roadmap.hideNavs();
      roadmap.showNav(system, phase);

      pips.activate(index);
      
      roadmap.ui.footer.querySelectorAll('roadmap-tab').forEach(t => {
        t.classList.remove('active');
      });

      if (tab) { tab.classList.add('active'); }

      roadmap.queueView(details, v => {
        if (!v) { return; }
        let g = v.querySelector('roadmap-game');
        if (g) g.show();
      });
    };
    
    roadmap.hideGames = function() {
      let games = roadmap.ui.main.querySelectorAll('roadmap-game.active');
      if (games.length) { roadmap.hiding = true; }
      games.forEach((g, i) => {
        g.hide(function(){
          if (i == games.length-1) {
            roadmap.hiding = false;
          }
        });
      });
    };    
    
    roadmap.showTabs = function(system) {
      roadmap.hideTabs();
      let t = roadmap.ui.footer.querySelector(`roadmap-tabs[data-system="${system}"]`);
      if (t) {
        t.classList.add('visible');
        t.querySelector('roadmap-tab').classList.add('active');
      } else {
        console.warn(`tabs for ${system} not found`);
      }
    };
    
    roadmap.hideTabs = function() {
      roadmap.ui.footer.querySelectorAll('roadmap-tabs').forEach(t => {
        t.querySelectorAll('roadmap-tab').forEach(tab => {
          tab.classList.remove('active');
        });
        t.classList.remove('visible');
      });
    };
    
    roadmap.showBack = function() {
      roadmap.ui.back.classList.remove('hidden');
    }
    
    roadmap.hideBack = function() {
      roadmap.ui.back.classList.add('hidden');
    }
    
    roadmap.ui.footer.querySelectorAll('roadmap-tabs').forEach(f => {
      f.querySelectorAll('roadmap-tab').forEach(t => {
        if (
          f.dataset.system == 'D49J' ||
          f.dataset.system == 'D27'
        ) {
          roadmap.buildNav(f.dataset.system, t.dataset.phase);
        }
        
        t.addEventListener('click', event => {
          roadmap.showNav(f.dataset.system, t.dataset.phase, 0);
          roadmap.showGame(f.dataset.system, t.dataset.phase, 0);
        });
      });
    });
    
    roadmap.ui.back.addEventListener('click', event => {
      let ag = roadmap.ui.main.querySelector('.details.visible');
      
      if (ag) {
        roadmap.hideGames();
        roadmap.hideNavs();
        roadmap.showOverview(ag.dataset.system, true);
        if (ag.dataset.system == 'D49J') {
          roadmap.showTabs('2020');
        } else {
          roadmap.showTabs('default');
        }
        return;
      } else {
        roadmap.hideOverviews();
        roadmap.showIntro();
      }
    });
  }
}

customElements.define('kiosk-roadmap', KioskRoadmap);
