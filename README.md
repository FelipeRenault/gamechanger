## Game Changer

A template to create slides with simple prompts and a fixed scoreboard that allows players to keep track of their points

## Public page

You can access it for free here on [GitHub pages](https://feliperenault.github.io/gamechanger/), without installing anything!

## Configuration

- Make sure you allow autoplay for the webpage on your browser so the sounds play correctly
- On the cover, you'll see a `⚙️` button. Click there (or press `S`) to edit the game and `Apply` the changes when you're done
- Your changes should be saved on your browser, however, if making lots of changes, such as creating players and prompts, make sure to export a backup file as explained below
- You can click `Download config.json` to export your settings file. That file can later be imported with the button on the top right of the settings page to automatically import all settings, including players, prompts, cover image and sounds

## Installing

- [Node.js](https://nodejs.org/en/download)
- npm (installed with node)
  - _Built and tested with node v25.0.0_

## Run locally

```bash
npm install
npm run dev
```

Open the local URL shown by Vite, usually `http://localhost:5173/`.

## Local settings

- Leaving the exported `config.json` file on the `public` folder will automatically import the settings when running the code, however, browser local storage still has a higher priority

## Contributing

Good luck. The original project was made in Python with Streamlit. It's still available on the [streamlit](https://github.com/FelipeRenault/gamechanger/tree/streamlit) branch. There, I could grasp what was going on. However, due to latency issues when hosting the game on Streamlit's cloud, AI suggested I should migrate to a native web option. So I did, well, _it_ did. Now I don't have much knowledge of what's going on anymore, since I'm not a frontend dev, but I'm glad it's working. If you want to contribute to the project, feel free. I'll likely have a superficial look into it and approve if it's a nice feature and works fine :)

## Credits

- Cover, prompt font and slide change sound: juxtapositionally on [Reddit](https://www.reddit.com/r/GameChangerTV/comments/1feccfu/here_it_is_a_game_changer_powerpoint_template/), files on [Google Drive](https://drive.google.com/drive/folders/1fzeI7gSl5iFhhU4Wv3XM1ihaxa9uAhbB)
- 7-segment display font (DSEG7): [keshikan.net](https://www.keshikan.net/fonts-e.html) and [GitHub](https://github.com/keshikan/DSEG)
- Gain point sound: floraphonic on [pixabay](https://pixabay.com/sound-effects/film-special-effects-copper-bell-ding-25-204990/)
- Lose point sound: eritnhut1992 on [pixabay](https://pixabay.com/sound-effects/film-special-effects-buzzer-or-wrong-answer-20582/)
