# 🎂 Birthday Surprise Website for Your Girlfriend ❤️

A romantic and interactive birthday website made specially for your girlfriend.

---

## 🌟 Features Included
1. **🎁 Surprise Gift Box Entry**: Starts with a cute gift box screen that she clicks to open.
2. **🎉 Confetti & Floating Hearts**: Beautiful festive animations when opened and during interactions.
3. **🎵 Happy Birthday Song in Background**:
   - Built-in cute birthday synthesizer tune that plays automatically on click!
   - You can also drop any favorite song (MP3) into the `music/` folder.
4. **📸 Memory Scrapbook (Polaroid Cards)**:
   - Polaroid photo gallery with pins, tilt animations, and sweet captions.
   - Includes an **"Add Another Memory Photo"** button right on the page to easily upload photos.
5. **🕯️ Interactive Birthday Cake**: She can click **"Make a Wish & Blow Candle"** to blow out the flame and trigger a celebration.
6. **💌 Romantic Love Letter**: Heartfelt birthday letter layout.
7. **💖 Secret Love Notes**: Flip-cards that reveal hidden sweet messages when tapped.

---

## 🚀 How to View the Website
Just double-click on [index.html](file:///e:/kalindu/index.html) to open it in Chrome, Edge, or any web browser!

---

## ✏️ How to Personalize It (Easy Steps)

### 1. Change Her Name
Open [index.html](file:///e:/kalindu/index.html) and find line 50:
```html
<h1 class="main-title">Happy Birthday, <span class="highlight-name" id="gfName">My Love</span>! 🎂</h1>
```
Replace `My Love` with her name!

### 2. Add Your Own Photos
1. Copy your photos into the `images/` folder (e.g. `images/photo1.jpg`, `images/photo2.jpg`).
2. In [index.html](file:///e:/kalindu/index.html), replace the `src="..."` in the `.polaroid-card` sections with `images/photo1.jpg`, etc.
3. *Or* simply open the page in your browser and click the **"➕ Add Another Memory Photo"** button!

### 3. Add a Custom Song
1. Copy your MP3 song into the `music/` folder.
2. Rename it to `happy-birthday.mp3` (or update the filename in [index.html](file:///e:/kalindu/index.html) line 24).
