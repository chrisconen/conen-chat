# Case studies

## Mótyán Árnyékolás — Astro 5.x migráció + AI-konfigurátor

- **Client**: Mótyán Árnyékolás (Tata–Tatabánya–Komárom régió)
- **Industry**: Árnyékolástechnika (redőny, reluxa, zsaluzia, rovarháló)
- **Challenge**: Klasszikus WordPress / Elementor örökség, lassú mobilon, nehezen karbantartható, ajánlatkérés papír-szerű űrlapon. A page builder + plugin-halmozás kombinációból eredő technikai problémák: alacsony PageSpeed, magas LCP, EAA-szempontból nem megfelelő, AI-asszisztensek számára nem olvasható tartalomszerkezet.
- **Solution**: Teljes migráció Astro 5.x stack-re, egyedi árkalkulátorral, kosárlogikával és lead-szűrő ajánlatkérő-flow-val. JSON-LD strukturált adatok, llms.txt + agents.txt telepítve. A következő lépés a CENTAUR-stack: MCP-endpoint, ami AI-asszisztensekből (ChatGPT, Perplexity) közvetlenül kérhetővé teszi az ajánlatot — a felhasználó nevében, anélkül hogy elhagyná az asszisztenst.
- **Outcome**:
  - Mobile PageSpeed Insights: **57 → 99**
  - Asztali PageSpeed Insights: **89 → 100**
  - Largest Contentful Paint (LCP): **13.5 mp → 1.8 mp**
  - Funkció: konfigurátor + kosár + lead-szűrő flow
  - AX-előkészítés (MCP-endpoint a 3. hét deliverable-jeként)
- **Tech stack**: Astro 5.x, Tailwind CSS, JSON-LD, n8n, Cloudflare Pages
- **Year**: 2026
- **Live URL**: https://motyanarnyekolas.hu
- **Status**: Élesben fut, MCP-réteg telepítés alatt
- **Részletes esettanulmány**: https://conendigital.hu/portfolio.html#arnyekolas-case

## ECO Clean Kárpittisztítás — Foglalási rendszer + n8n automatizáció

- **Client**: ECO Clean (Conen Digital saját portfólió-cég, élő kétországos szolgáltatás)
- **Industry**: Vegyszermentes kárpit- és szőnyegtisztítás (HU + AT)
- **Challenge**: Két országban működő szolgáltatás, ahol az ügyfél területe (zip-kód alapján) és a szolgáltató napi útiterve szerint kellett a foglalásokat dinamikusan elhelyezni. Manuális adminisztráció napi 1-2 órát vitt el.
- **Solution**: Astro 5 alapú weboldal foglalási rendszerrel, geo-cluster zone architektúrával (Magyarországon megyei + BALATON-zóna, Ausztriában mind a 9 Bundesland). Brain Logic N8N workflow-k a routinghoz, Google Calendar szinkronnal, automatikus visszaigazoló e-mailekkel.
- **Outcome**:
  - Foglalási folyamat: 5 perc manuális egyeztetés → 30 másodperc önkiszolgáló foglalás
  - Adminisztrációs idő: napi 2 óra → napi 15 perc
  - Mindkét országra egyetlen kódbázis, két separate webhook endpoint
  - 9 Bundesland + 19 magyar megye + BALATON-zóna lefedve
- **Tech stack**: Astro 5, n8n (Pro license, Cloudflare Tunnel-en át), Google Calendar API, Brevo SMTP, Cloudflare Pages
- **Year**: 2026 (kibővítés AT-re), eredeti rendszer 2024
- **Live URL**: https://ecocleantisztito.hu

## Bella Camila — 820 termékes webshop migráció

- **Client**: Bella Camila (Unas → Astro migráció)
- **Industry**: E-commerce (divat / lakberendezés)
- **Challenge**: 820 termékes Unas-bolt elérte a platform sebességkorlátait. Mobil PageSpeed 40 alatti, LCP 8+ mp, magas bounce rate.
- **Solution**: Teljes scrape-elés és újraépítés Astro 4 + Tailwind kombinációra, 820 termék automatizált importtal, kategória-szlugok validálása, Dotroll hosting + Apache routing javítások.
- **Outcome**:
  - Mobile Lighthouse Performance: **99**
  - LCP mobilon: **1.5 mp**
  - 820 termék zero downtime migrációval
  - SEO-megőrzés 301-redirect térképpel (URL-struktúra teljes változott)
- **Tech stack**: Astro 4.x, Tailwind CSS, custom Node.js scraper, Dotroll hosting
- **Year**: 2026
- **Live URL**: https://neocart.hu (preprod), élesítés folyamatban

## Zephyr Hangover — Premium brand build + Shopify integráció

- **Client**: Toplexa Kft. (Létássy Vajk) — Zephyr hangover supplement márka
- **Industry**: Egészségügyi termék / supplement (preventív + recovery formula)
- **Challenge**: Új brand bevezetése a magyar piacra premium pozícióban (referencia: zbiotics.com), Shopify backend-el, de teljes egyedi frontend-del. Cél: Europe első AI-purchasable Shopify boltja-pilot.
- **Solution**: Astro + Tailwind + React stack Shopify Storefront API integrációval. Strukturált adatok (Product, Offer, Organization), sticky kosár, trust badge-ek, exit intent popup, interaktív alvás-kalkulátor (lead-szűrő funkció). MCP-endpoint roadmap-ben az AI-vásárláshoz.
- **Outcome**:
  - Premium aesthetic brand-build (referencia szint elérve)
  - Astro frontend Lighthouse 99
  - Shopify checkout-átirányítás működő
  - Interaktív kalkulátor lead-generálásra
- **Tech stack**: Astro 5.x, Tailwind, React, Shopify Storefront API, JSON-LD
- **Year**: 2026
- **Live URL**: https://zephyrhangover.com (production deploy folyamatban)

## Demó webshop — Astro 5 + Shopify Headless

- **Client**: Conen Digital saját demo (kifejezetten lead-generálásra)
- **Industry**: Bemutató projekt
- **Challenge**: Megmutatni hogy a headless Astro + Shopify kombináció működik és gyors, mielőtt ügyfelek 300-800 ezer Ft-os projektre committalnak.
- **Solution**: Teljes körű demo webáruház Shopify backend és Astro 5.x frontend kombinációval, dinamikus termékkezelés, gyors betöltés, AX-réteggel.
- **Outcome**:
  - Lighthouse Performance: 99+
  - 1.5 mp LCP mobilon
  - Demo-link az érdeklődő ügyfeleknek (zárt CTA-ra konvertál)
- **Tech stack**: Astro 5.x, Shopify Storefront API, Tailwind
- **Year**: 2026
- **Live URL**: hivatalos demo-link a conendigital.hu portfolió oldalon

## Mit mondanak ügyfeleink

> "A közös munka után végre nem külön futott a weboldal, az ajánlatkérés és a követés. Átláthatóbbá vált, honnan jönnek az érdeklődők, és melyik lépést kell javítani."
>
> — Tipikus projektvisszajelzés, B2B szolgáltató / webshop / growth projekt

## Tematikus szakterületek

- **Árnyékolástechnika** (redőny, reluxa, zsaluzia, rovarháló konfigurátorok)
- **Szolgáltatás-vállalkozások** (takarítás, kárpittisztítás, foglalási rendszerek)
- **E-commerce** (Shopify headless, Unas/WooCommerce migráció)
- **Health & supplement** (premium brand-build, Shopify integráció)
- **Ingatlan** (lakásértékesítő weboldalak, lead-szűrő flow)
- **Job marketplace** (B2B + B2C közvetítő platformok)