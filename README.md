# Abort Missile!

A typing game based on Missile Command.

[live link](https://adamjacobson.github.io/Abort-Missile/)

## Background

_Missile Command_ is an old game which involves shooting down missiles before they hit the ground, destroying the players city in the process. There are several modern incarnations.

In _Abort Missile!_ the player must type words which match the self-destruct codes of incoming missiles.

The player withstand only 3 strikes before the game ends. The game is played in waves with a certain number of missiles coming in each one and the words required to abort them getting longer each time.

## Functionality and MVPs

In the game, the following features will be available
- User can view instructions on the game
- User can begin the game and pause at any time
- Missiles will spawn at the top of the screen at regular intervals
- Missiles will have a displayed word associated with them displayed underneath. The length of the word should be dependent on current difficulty
- Once player types the corresponding word, the missile is destroyed. The letters typed will appear as a different color under the missile to indicate a match
- The player has 3 "lives" shown as little buildings. A missile hitting the ground will remove one of these.
- Once all lives are lost, the game is over. User will be shown their final score and prompted to play again.

## Wireframes

![overview](https://github.com/AdamJacobson/Abort-Missile/blob/master/docs/wireframes/overview.png)

## Technologies and Architecture

- Vanilla JavaScript for structure. jQuery for DOM manipulation.
- HTML5 vanilla canvas with no libraries.
- Webpack to bundle javascript files.

The following script files will be needed:

`game.js` which will hold the game state, user lives, score and all active missiles

`missile.js` which represents one missile. Has the code associated with it and a point value.

## Technical Hurdles to Consider

A missile should be a self contained object and element on the screen. Rendering a new one at a random location shouldn't be too hard. I need to decide if it would be easier to use vanilla DOM elements or have the game inside a Canvas. I know I can animate something moving with CSS fairly easily. I will also need to detect when the missile has reached the bottom of the screen in order to trigger an event. Or, I could use the same time given to the animation to set a timeout event. The timeout will be cleared on the missile being destroyed. This would require the missiles to fall straight down, rather than at an angle because that would change the travel time.

## Implementation Timeline

**Day 1 (Sat)**: Decide on any technologies required. Setup project on GitHub. Render basic page to GH-Pages site.

**Day 2 (Sun)**: Get basic game functionality: rendering game, missile spawning, impact and destructions. Game over detection.

**Day 3 (Mon)**: Scoring and lives updating on change

**Day 4 (Tue)**: Background graphics, missiles and explosions.

**Day 5 (Wed)**: Waves and increasing difficulty.

**Day 6 (Thu)**: Final touchups and tweaking
