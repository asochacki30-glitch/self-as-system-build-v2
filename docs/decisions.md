# Design Decisions

I chose cursor speed as the single gesture for this system because it lets one simple input drive a clear range of behavior — from calm and precise at low speed, to chaotic and broken at high speed — without needing multiple separate controls.

I kept the core contrast from my original tests: patience produces something soft and organic (curves and circular nodes), while carelessness or speed produces something sharp and broken (geometric shards). This felt like the most "me" idea across all four tests, since it turns a simple mouse movement into a small judgment about how the person is behaving.

I moved away from the original circle-and-line sigil because it felt too static on its own — the drawing system itself became more interesting and more expressive than a single fixed shape.

## v2 Decisions

I chose to cut the geometric shatter behavior specifically because I had already identified it, in my own v1 reflection, as the part most likely to clutter the canvas — it had no built-in limit on how much could accumulate. Once it was gone, I wanted fast movement to still mean something rather than just doing nothing, so I made it cause the existing drawing to dissolve quickly instead. This reused the same fade mechanism v1 already had, just tuned to run much faster above the threshold — so nothing new was added, only the existing rule was pushed harder.