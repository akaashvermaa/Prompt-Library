import fs from 'fs';
import path from 'path';

const rawText = `PROMPT 01 — Luxury Perfume / Cosmetics Hero Shot
Best platform: Flux Pro, Midjourney
Use case: High-end beauty brand campaign, magazine ad, website hero

A [product name] perfume bottle made of frosted amber glass, placed on a
cracked dry salt flat at blue hour. The bottle catches the last sliver of
orange horizon light. No props, no hands. Shot with a 100mm macro lens,
f/2.2, extreme material detail on the glass stopper — subtle refraction
visible inside the liquid. Background is deep navy gradient sky. Commercial
fragrance photography, Dior campaign quality.

Midjourney version:
luxury perfume bottle, frosted amber glass, cracked salt flat, blue hour,
orange rim light, macro lens, extreme glass refraction detail, deep navy
sky, no text, commercial fragrance photography, Dior campaign quality
--ar 4:5 --style raw --v 7

----------------------------------------------------------------

PROMPT 02 — Skincare Product with Ingredient Story
Best platform: Flux Pro, DALL-E 3
Use case: DTC skincare brand, social media ads, Shopify hero image

A glass serum bottle half-submerged in a bed of fresh [hero ingredient —
e.g., rosehip seeds / turmeric roots / sea kelp]. Overhead shot, slightly
angled at 15 degrees off vertical. Cool diffused daylight from a north-facing
window. Matte ceramic surface beneath the ingredient pile. The product label
is blurred and unreadable. Editorial clean beauty photography, no background
clutter, soft shadow beneath the bottle, hyper-detailed ingredient texture.

----------------------------------------------------------------

PROMPT 03 — Watch Hero Shot — In-Hand Lifestyle
Best platform: Flux Pro
Use case: Watch brand marketing, e-commerce, editorial feature

Close-up of a man's wrist wearing a [watch description — e.g., matte black
titanium dive watch with a green dial] against an out-of-focus industrial
concrete wall. Natural midday light from above left. The watch crystal catches
a single specular highlight. Sleeve of a raw denim jacket partially visible.
Shot on a Leica Q3, 28mm, f/1.7. Skin texture realistic, subtle vein detail.
Editorial men's watch photography, no additional props.

----------------------------------------------------------------

PROMPT 04 — Premium Packaging on Textured Surface
Best platform: Flux Pro, DALL-E 3
Use case: Packaging concept, brand presentation, agency pitch

A matte black rigid gift box with a [brand category — e.g., whisky / candle /
jewellery] product inside, lid open at 45 degrees, placed on aged brushed
brass sheet. Single overhead softbox light. The interior of the box is lined
with deep forest green tissue paper, slightly crumpled. The exterior has a
blind-embossed logo visible only in raking light. Luxury packaging photography,
no hands, no text visible, shadow falls naturally to the right.

----------------------------------------------------------------

PROMPT 05 — Food & Beverage — Cut Fruit Macro
Best platform: Flux Pro, Midjourney
Use case: FMCG packaging, juice brand, health food marketing

Extreme macro of a [fruit — e.g., blood orange / dragon fruit / yuzu] sliced
in half, suspended mid-air with motion freeze at 1/8000s shutter. Fine water
mist droplets visible on the cut surface. Background is pure deep black.
Single strobe from below illuminating the interior pulp — the translucency
of the flesh glows. Commercial food photography, Canon R5, 180mm macro,
ISO 100. No shadows on background.

Midjourney version:
blood orange sliced in half, suspended mid-air, water droplets, extreme
macro, translucent glowing pulp, black background, single strobe from below,
commercial food photography, motion freeze --ar 1:1 --style raw --v 7

----------------------------------------------------------------

PROMPT 06 — High Fashion Editorial — Studio Minimalist
Best platform: Midjourney, Flux Pro
Use case: Fashion brand lookbook, editorial spread, agency portfolio

editorial fashion photograph, model in an oversized ivory raw-edge wool coat,
standing in an empty white infinity studio, harsh single overhead strobe
creating a pool of light with sharp falloff, strong downward shadow beneath
the chin, model looking down, movement in the coat hem, medium format camera
aesthetic, Raf Simons runway quality, no accessories, no background texture
--ar 2:3 --style raw --v 7

----------------------------------------------------------------

PROMPT 07 — Fashion Lookbook — Outdoor Location
Best platform: Flux Pro, Midjourney
Use case: Seasonal lookbook, streetwear brand, e-commerce editorial

A model wearing [garment description — e.g., a washed indigo utility jacket
over wide-leg beige trousers] walking through an empty covered parking garage
at 7am. Sodium vapor ceiling lights cast a yellow wash from above. Wet
concrete floor creates a clean reflection beneath the figure. Shot from
behind at a slight low angle. Unposed, caught-in-motion feel. Shot on a
Contax 645 with Kodak Portra 800. Grain visible. No direct eye contact.

----------------------------------------------------------------

PROMPT 08 — Jewellery on Skin — Extreme Close-Up
Best platform: Flux Pro
Use case: Fine jewellery brand, luxury campaign, e-commerce detail shot

Extreme close-up of a [jewellery piece — e.g., thin 18k gold chain necklace
with a raw sapphire pendant] resting on a collarbone. Natural window light
from the left, soft and diffused through linen curtains. Skin in precise
focus — pore texture and fine hair visible. The sapphire facets catch a
single point of light. Background is blurred shoulder of a cream silk garment.
Commercial jewellery photography, no retouching on skin, no props.

----------------------------------------------------------------

PROMPT 09 — Shoe Product — Floating Against Minimal Background
Best platform: Flux Pro, DALL-E 3
Use case: Sneaker / footwear brand, e-commerce, campaign visual

A [shoe description — e.g., low-top white leather trainer with gum sole]
floating at a 35-degree angle against a pale stone grey seamless background.
Lit with two large softboxes — one from each side — creating an even, clean
shadow directly beneath the shoe. The leather texture is visible at the toe
cap. Laces are perfectly tied. Commercial shoe photography, no hands, no
environment, no props. Perfectly centred in frame.

----------------------------------------------------------------

PROMPT 10 — Brutalist Architecture — Dramatic Dusk Light
Best platform: Midjourney, Flux Pro
Use case: Architecture studio portfolio, editorial, cultural institution

brutalist concrete cultural centre, raw béton brut facade with deep shadow
recesses, photographed at dusk, the sky a gradient of amber to deep violet,
long exposure blue in the reflective plaza puddles, a single lit interior
window warm amber against the cold exterior, Tadao Ando influence, wide
angle architectural photography, no people, no text --ar 16:9 --style raw
--v 7

----------------------------------------------------------------

PROMPT 11 — Japandi Interior — Morning Atmosphere
Best platform: Flux Pro, DALL-E 3
Use case: Interior design studio, real estate premium listing, hospitality brand

A photorealistic render of a Japandi bedroom interior at 7am. Low platform
bed with linen bedding in undyed natural white. A single bonsai on a low
walnut shelf. Shoji screen diffusing early morning light — the shadow of
bamboo branches falls across the tatami floor. No art on walls. A ceramic
bedside cup of green tea with visible steam. Wide angle, 24mm, architectural
photography quality. No people.

----------------------------------------------------------------

PROMPT 12 — Retail Store Interior — Concept Design
Best platform: DALL-E 3, Flux Pro
Use case: Retail design concept presentation, brand identity, investor deck

A photorealistic visualization of a premium [brand type — e.g., tea / skincare
/ bookshop] retail store interior. Curved raw plaster walls in warm sand tone.
Recessed lighting with tight beam angles creating pools of light on product
displays. Aged brass fixture details. Terrazzo floor in off-white with grey
aggregate. No customers, no staff, shot from the entrance looking in —
showing the full depth of the space. Interior design photography quality.

----------------------------------------------------------------

PROMPT 13 — Treehouse / Cabin — Atmospheric Night Scene
Best platform: Midjourney
Use case: Hospitality brand, travel editorial, short-term rental marketing

remote cedar treehouse perched in old-growth Douglas firs, photographed at
night, warm amber light glowing from inside through floor-to-ceiling glass
panels, light snowfall beginning, the canopy catches the first dusting of
snow, deep navy sky above, no moon, stars slightly visible, fog in the valley
below, long exposure 4 minutes, architectural photography, Airbnb Luxe quality
--ar 16:9 --style raw --v 7

----------------------------------------------------------------

PROMPT 14 — Album Cover — Conceptual Art Direction
Best platform: Midjourney
Use case: Music artist release, Spotify canvas, merch

conceptual album cover, ambient electronic music, a single rusted metal chair
submerged under perfectly clear shallow water, shot from directly above,
the chair casts a refracted shadow on the sandy bottom, hyper-real yet
surreal, muted aqua and oxidised copper tones, no text, no people, fine art
photography aesthetic, square format --ar 1:1 --style raw --v 7 --s 200

----------------------------------------------------------------

PROMPT 15 — Book Cover — Literary Fiction
Best platform: Midjourney, DALL-E 3
Use case: Publisher, self-published author, reading app thumbnail

A literary fiction book cover image: a fog-filled valley at dawn seen from
above through a gap in dense pine trees — a lone country road cuts a straight
line through the fog, disappearing into the white. Muted olive and grey
palette, no people, no text, no artificial light. Printed on matte paper
aesthetic — slightly desaturated, fine grain. The composition leaves clear
space at the top third for a title.

Midjourney version:
literary fiction book cover, fog-filled valley at dawn, aerial gap through
pine trees, single road disappearing into white fog, muted olive and grey,
no people, no text, matte grain, title space at top --ar 2:3 --style raw
--v 7 --s 150 --no text

----------------------------------------------------------------

PROMPT 16 — Brand Identity Mood Board Visual
Best platform: Midjourney, Flux Pro
Use case: Brand agency presentation, identity deck, client pitch

A styled flat lay of brand identity reference materials for a [brand
archetype — e.g., premium Japanese whisky brand / sustainable outdoor
apparel / heritage leather goods] spread on a aged oak table. Items include:
torn kraft paper swatches in earthy tones, a small bottle of the brand's hero
material (leather / ceramic / glass), one dried botanical, a short stack of
matte paper business cards with blind embossing only. Overhead 4:5 format,
natural side light, no text visible.

----------------------------------------------------------------

PROMPT 17 — Magazine Cover Visual — No Text
Best platform: Midjourney, Flux Pro
Use case: Publisher concept, media brand pitch, editorial design

editorial magazine cover image, no text, a [subject: woman in her 60s
with silver hair] photographed in a clean white studio, direct eye contact,
wearing a single-colour draped silk garment in warm terracotta, medium format
camera quality, soft even fill lighting with a touch of shadow under the jaw,
zero retouching aesthetic, pores visible, Vogue Italia visual quality
--ar 2:3 --style raw --v 7

----------------------------------------------------------------

PROMPT 18 — Sci-Fi Environment — Concept Art
Best platform: Midjourney
Use case: Game studio, film pre-production, concept art portfolio

abandoned deep-space mining colony, pressurised dome cracked on one side,
rust and mineral stain down the exterior, the interior illuminated only by
emergency red lighting casting long shadows across abandoned drilling equipment,
outside is airless red rock desert under a starless black sky, painted concept
art style, matte painting quality, widescreen cinematic --ar 21:9 --style raw
--v 7 --s 300

----------------------------------------------------------------

PROMPT 19 — Surreal Advertising Visual
Best platform: Midjourney
Use case: Creative agency, award-entry campaign visual, art director concept

surreal advertising visual, a [product — e.g., glass water bottle] standing
perfectly upright at the centre of a vast white salt flat, around it in a
perfect circle, hundreds of dried flowers slowly being pulled toward it as
if by magnetism, shot from a low angle, golden hour side light, hyper-real
photography with surreal impossible physics, no text, no person --ar 16:9
--style raw --v 7 --s 250 --weird 150

----------------------------------------------------------------

PROMPT 20 — Character Design Sheet — Game Asset
Best platform: Midjourney, Stable Diffusion
Use case: Game studio, indie developer, character art brief

masterpiece, best quality, character design sheet, [character concept — e.g.,
desert nomad scout in a low-tech dystopia] — three views: front, 3/4, back,
consistent lighting across all three panels, muted sand and charcoal palette
with a single accent colour (faded teal), detailed costume construction
visible — stitching, layered fabrics, utility pouches — concept art style,
clean white background, no text labels, artstation quality

----------------------------------------------------------------

PROMPT 21 — Bioluminescent Nature — Fine Art
Best platform: Midjourney
Use case: Limited edition print, gallery piece, creative portfolio

bioluminescent plankton illuminating shallow ocean waves breaking on a black
sand beach at 2am, no moon, stars reflected in the wet sand between waves,
each breaking wave a vivid electric blue-green, a small figure standing at
the shoreline with their back to camera for scale, long exposure 25 seconds,
fine art nature photography, National Geographic quality, no artificial light
sources except the bioluminescence --ar 16:9 --style raw --v 7

----------------------------------------------------------------

PROMPT 22 — Macro Texture — Abstract Background Asset
Best platform: Flux Pro, Midjourney
Use case: Presentation background, brand texture asset, print design

Extreme macro of [texture — e.g., hand-hammered copper sheet / raw concrete
surface / aged papyrus paper], shot at exactly 90 degrees to the surface,
perfectly even raking light from the right side to emphasise surface relief,
the entire frame is texture with no reference to scale, muted and desaturated
colour palette, no artefacts, repeatable tile-ready quality, commercial
texture photography.

----------------------------------------------------------------

PROMPT 23 — Neon Sign in Dark Atmospheric Interior
Best platform: Ideogram, DALL-E 3
Use case: Bar / restaurant branding, content creation, event backdrop

A photorealistic neon sign reading "[YOUR TEXT]" mounted on an exposed dark
brick wall inside a dimly lit bar interior. The neon tubes are warm rose pink.
The surrounding wall is barely lit — just the neon glow and a faint cool
backlight behind the sign creating a halo. Foreground is slightly out of
focus — a blurred bar counter with glassware. No other text visible. Bar
photography aesthetic. Photorealistic, no illustrative style.

Best platform note: Use Ideogram for text accuracy. Paste exact text in quotes.

----------------------------------------------------------------

PROMPT 24 — Embossed / Debossed Text on Material
Best platform: Ideogram, Flux Pro
Use case: Brand mockup, packaging design, stationery brand

A photorealistic close-up of thick 600gsm cotton paper business card with the
text "[BRAND NAME]" debossed (pressed into the surface, not raised) in the
centre. Raking light from the left at 15 degrees to the surface reveals the
depth of the deboss. Paper texture is clearly visible — rough cotton grain.
No ink, no colour — only the deboss impression. Shot on a 100mm macro lens.
Luxury stationery photography. Single card, centred, no background clutter.

Best platform note: Use Ideogram for accurate text rendering.

----------------------------------------------------------------

PROMPT 25 — Street Signage / Wayfinding in Urban Scene
Best platform: Ideogram, DALL-E 3
Use case: Brand design system, urban photography, wayfinding concept

A photorealistic street-level photograph in a [city aesthetic — e.g.,
mid-century Tokyo alley / Brutalist London side street / Haussmann Paris
courtyard] showing a wayfinding sign reading "[YOUR TEXT]" in a clean
sans-serif typeface on a black powder-coated metal panel. The scene is
overcast — flat diffused daylight. No people. The sign post has aged
slightly but the text is clear. Shot on a 35mm lens.

Best platform note: Use Ideogram. Specify text in quotation marks exactly.

----------------------------------------------------------------

PROMPT 26 — Environmental Portrait — Craft or Profession
Best platform: Flux Pro, Midjourney
Use case: Brand storytelling, documentary editorial, About page photography

A documentary-style environmental portrait of [subject description —
e.g., a glassblower, early 50s, weathered hands] at work in their studio.
The room is dark except for the orange glow of the furnace at the left frame
edge, which provides the key light — warm and directional. The subject is
mid-process, focused, not looking at camera. Shot on a 35mm film camera,
Kodak Tri-X 400, pushed to ISO 1600. Grain heavy. No flash, no fill light.

----------------------------------------------------------------

PROMPT 27 — Silhouette Portrait — Graphic and Bold
Best platform: Midjourney, DALL-E 3
Use case: Poster design, creative campaign, speaker profile visual

A perfectly exposed silhouette of [subject description — e.g., a standing
figure with natural curly hair] against a large floor-to-ceiling window.
Outside the window is a bright overcast white sky — the exposure is set
purely for the exterior, rendering the interior figure as a perfect black
shape. The rim of the hair catches a faint backlight halo. No facial features
visible. Clean and graphic. The figure is positioned slightly left of centre,
leaving composition space to the right.

Midjourney version:
silhouette portrait, figure with natural curly hair, floor-to-ceiling window,
overcast white sky background, pure black silhouette, subtle hair rim light,
graphic and bold, composition space right of frame --ar 4:5 --style raw --v 7

----------------------------------------------------------------

PROMPT 28 — Sports / Athlete — Motion and Intensity
Best platform: Flux Pro, Midjourney
Use case: Sports brand campaign, athlete sponsor content, editorial

A high-energy editorial sports photograph of [athlete description — e.g.,
a female sprinter leaving the starting blocks] captured at 1/4000s shutter.
Motion blur in the hands and feet, face and torso in sharp focus. Shot from
a low angle — camera almost at track level — making the figure tower against
a pure white overcast sky. The kit colour is [colour]. No stadium, no crowd —
pure athlete against sky. Commercial sports photography, Nike campaign quality.

----------------------------------------------------------------

PROMPT 29 — LinkedIn Thought Leadership Banner Image
Best platform: DALL-E 3, Flux Pro
Use case: LinkedIn article banner, personal brand header, newsletter cover

A clean professional banner image (16:9) for a thought leadership article
about [topic — e.g., the future of remote work / AI in healthcare / supply
chain resilience]. Visual concept: [e.g., a single wooden desk with a laptop
and a plant at a window overlooking a misty city skyline at dawn]. No people.
Muted colour palette — cool blue-grey tones. No text, no infographics, no
icons. Photorealistic, not illustrated. Leave the left third compositionally
open for text overlay.

----------------------------------------------------------------

PROMPT 30 — Podcast Cover Art — Bold and Typographic
Best platform: Ideogram, Midjourney
Use case: Podcast artwork (3000x3000px), Spotify / Apple Podcasts

A bold podcast cover art for a show called "[PODCAST NAME]" about [topic].
Design language: [e.g., brutalist, high-contrast, black background, single
Pantone red accent colour, large bold condensed typeface for the show name,
smaller subtitle underneath]. Geometric composition, no photography, no
faces, purely graphic and typographic. Square format.

Best platform note: Use Ideogram for the final version with correct text.
Use Midjourney (--no text) first to develop the visual concept and colour,
then recreate in Ideogram with text added.

----------------------------------------------------------------

PROMPT 31 — Twitter / X Header — Abstract Visual Brand
Best platform: Midjourney, Flux Pro
Use case: Social profile header, personal brand, newsletter masthead

abstract brand header image, [brand palette — e.g., warm terracotta, raw
linen, muted sage], horizontal format 3:1, a photographically textured
surface — e.g., aged plaster wall with subtle relief pattern — lit with
extremely soft raking light, no objects, no people, no text, designed as a
clean brand background with no focal point competing for attention, commercial
photography of texture, extremely high resolution --ar 3:1 --style raw --v 7

----------------------------------------------------------------

PROMPT 32 — Risograph Print Style Illustration
Best platform: Midjourney
Use case: Zine cover, music poster, indie brand, editorial illustration

risograph print illustration, [subject — e.g., a cyclist riding through a
rain-soaked city at night], limited 3-colour palette (deep teal, warm coral,
off-white), deliberate ink misregistration creating that hallmark riso offset,
halftone dot texture visible throughout, flat design, bold simplified shapes,
no gradients, printed poster aesthetic --ar 2:3 --style raw --v 7 --s 200

----------------------------------------------------------------

PROMPT 33 — Architectural Blueprint / Technical Drawing Style
Best platform: DALL-E 3, Midjourney
Use case: Design brand identity, architect website, technical editorial

A detailed architectural blueprint-style illustration of [subject — e.g.,
a mid-century modern house / a futuristic transit station / an artisan
coffee machine], rendered as a precise technical cross-section drawing.
White lines on deep navy blue background. Dimension annotation lines visible.
Fine hatching for materials. No photographic elements. Draughting aesthetic,
1960s technical drawing style. No text labels.

----------------------------------------------------------------

PROMPT 34 — Woodcut / Linocut Print Style
Best platform: Midjourney, Stable Diffusion
Use case: Craft beer label, artisan food brand, folk music poster

woodcut print illustration, bold black and white relief carving style,
[subject — e.g., a leaping salmon / a mountain range / an old lighthouse],
strong graphic contrast, visible gouge texture in the white areas, raw
hand-carved aesthetic, rough paper texture as background, traditional Japanese
mokuhanga influence, no colour, high contrast, square format --ar 1:1
--style raw --v 7 --s 300

----------------------------------------------------------------

PROMPT 35 — AI Prompt Optimizer (Use Claude to Write Better Prompts)
Best platform: Use Claude first, then paste into Midjourney / Flux / DALL-E
Use case: Any project where you want a genuinely strong prompt, not a generic one

Paste this into Claude:

You are a professional AI art director with deep experience in Midjourney v7,
Flux Pro, and DALL-E 3. I want to generate an image for this purpose:

Project type: [e.g., perfume campaign / book cover / game concept art]
Intended platform to generate on: [Midjourney / Flux Pro / DALL-E 3]
Core visual concept in my head: [describe it roughly, even vaguely]
Mood or feeling it must convey: [e.g., melancholy / powerful / serene]
Style references I like: [name photographers, directors, painters, or brands]
What to avoid: [e.g., AI clichés, purple gradients, overly clean CGI look]

Write me one single, highly specific, platform-optimised prompt. Do not give
me 3 versions. Give me the best one. Include camera, lens, lighting, specific
compositional details, colour palette, and any relevant platform parameters.
Explain in one sentence why you made the key choices you did.
`;

function slugify(text) {
  return text.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
}

const chunks = rawText.split('----------------------------------------------------------------');

const parsedPrompts = chunks.map((chunk, i) => {
  const lines = chunk.trim().split('\n');
  const titleLine = lines.find(l => l.startsWith('PROMPT'));
  if (!titleLine) return null;

  const titleMatch = titleLine.match(/PROMPT \d+\s*—\s*(.*)/);
  const title = titleMatch ? titleMatch[1].trim() : "Unknown Title";

  const bestForLine = lines.find(l => l.startsWith('Best platform:'));
  const platformsStr = bestForLine ? bestForLine.replace('Best platform:', '').trim() : '';
  const platformsMap = {
    'midjourney': 'midjourney',
    'dall-e 3': 'dalle3',
    'flux pro': 'fluxpro',
    'flux': 'fluxpro',
    'ideogram': 'ideogram',
    'stable diffusion': 'stablediffusion',
    'claude': 'claude'
  };
  
  const imgPlatforms = [];
  const textPlatforms = [];
  const lowerPlatStr = platformsStr.toLowerCase();
  
  Object.keys(platformsMap).forEach(key => {
    if (lowerPlatStr.includes(key)) {
      if (key === 'claude') {
        textPlatforms.push('claude');
      } else {
        imgPlatforms.push(platformsMap[key]);
      }
    }
  });

  const whenToUseStart = lines.findIndex(l => l.startsWith('Use case:'));
  let useCase = "";
  let promptBodyStartIndex = whenToUseStart + 1;
  if (whenToUseStart !== -1) {
    const useCaseLines = [];
    useCaseLines.push(lines[whenToUseStart].replace('Use case:', '').trim());
    for (let j = whenToUseStart + 1; j < lines.length; j++) {
      if (lines[j].trim() === '') {
        promptBodyStartIndex = j + 1;
        break;
      }
      useCaseLines.push(lines[j].trim());
    }
    useCase = useCaseLines.join(' ');
  }

  const promptLines = lines.slice(promptBodyStartIndex);
  const promptBody = promptLines.join('\n').trim();

  let description = useCase;
  if (description.length > 120) {
    description = description.substring(0, 117) + '...';
  }

  return {
    id: 'img-' + String(i + 21).padStart(3, '0'),
    slug: slugify(title),
    title: title,
    description: description,
    prompt: promptBody,
    category: "image-prompts",
    platforms: textPlatforms.length > 0 ? textPlatforms : ["any"],
    imagePlatforms: imgPlatforms,
    tags: ["image", "generation", title.split(' ')[0].toLowerCase()],
    difficulty: "intermediate",
    featured: false,
    source: "Community",
    useCase: useCase
  };
}).filter(Boolean);

const existingPath = path.join('d:', 'Prompt', 'newjson', 'image-prompts.json');
let existing = JSON.parse(fs.readFileSync(existingPath, 'utf-8'));

for (const p of parsedPrompts) {
  if (!existing.some(e => e.slug === p.slug)) {
    existing.push(p);
  }
}

fs.writeFileSync(existingPath, JSON.stringify(existing, null, 2));
console.log('Added ' + parsedPrompts.length + ' prompts. Total is now ' + existing.length + '.');

const catPath = path.join('d:', 'Prompt', 'newjson', 'categories.json');
const cats = JSON.parse(fs.readFileSync(catPath, 'utf-8'));
const devCat = cats.find(c => c.slug === 'image-prompts');
if (devCat) {
  devCat.count = existing.length;
}
fs.writeFileSync(catPath, JSON.stringify(cats, null, 2));
console.log('Updated categories.json image-prompts count to ' + existing.length + '.');
