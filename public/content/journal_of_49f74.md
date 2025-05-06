Thoughts and learnings:

---

April 25th, 2025

I've kinda been entertaining this idea of building an autonomous surveillance drone.

But this field of ML is really cool. Using code to replicate the human brain—at least, that’s how I look at it.

I started reading _“Intro to Reinforcement Learning”_ by Sutton and Barto, and I’m only on the preface, but I feel like I already have some interesting thoughts.

Just about the general idea of _“Machine Learning research”_—it’s so interesting that we created this infrastructure and tooling to build computer-human brains, but we still have things we don’t understand; so we research and discover things in the same way we do with natural sciences like Physics, Chemistry, or Biology. But we created all of this.

So in a way, maybe code is like mathematics—just a way for us to describe the systems around us, rather than something we invented. With code, we use it more so to augment our reality—making life more convenient, furthering science, etc.—but looking at it from this perspective of research, it is really interesting that we _“discover”_ things, when we invented the very foundation of all of it. Maybe not like, electricity, but everything a level above and on.

Outside of that, reading this preface, what is the “problem” which reinforcement learning aims to solve?

If I had wi-fi on this flight I’d be able to look it up (I’m on a flight to Austin right now), but Southwest’s wifi devex (this is a joke) sucks, so unfortunately I can’t look anything up.

I guess we can try to figure it out from what Sutton/Barto says in the preface.

> “This was simply the idea of a learning system that wants something, that adapts its behavior in order to maximize a special signal from its environment.” — Sutton, p.8

So is reinforcement learning meant to give adaptability to an AI system?

Right—I should also preface, I have a very limited understanding of anything ML. I was told this is a good starting point from a very smart colleague at xAI.

Anyway, going back to the original point.

Ahh, it would help so much if I could compare this to the human brain. But I’m still curious as to what the problem here is that RL solves—of course I know it’s super important, but yeah.

Okay, I heard somewhere online that LLM Reasoning uses RL, so maybe we can extrapolate it from there.

So:

- You prompt a model.
- The model ingests the prompt (after tokenizing, etc. _shoutout Natural Language Processing_).
- It thinks about what you say in the prompt, cycling the information back into itself.

So is RL the process of _thinking prior to responding_? Or is RL a smaller mechanism in that overall process?

You know, I feel like reading more will probably benefit here. So, I’ll go do that. #seeYouGuysSoon

Okay wait, last thing.

> He says that it’s the idea of a “learning system that wants something”.  
> What does this learning system even want?  
> “Adapts its behavior to maximize a special signal from its environment.”  

### I guess this is where my mind is at now:

- What is the problem which reinforcement learning aims to solve, in clear terms?  
- How does RL solve this idea of adaptability in an artificial intelligence?  
- What does a learning system _“want”_, and what does the _“environment”_ look like?

I go read now.

_Still haven’t read much LOL. But thought of something else._

In psychology, we have this idea of **positive/negative reinforcement**. Maybe it’s the same as that?

The model adapts by reinforcing certain trains of thought it has, thereby _“maximizing”_ the _“special signal”_.

Yeah maybe right, because they say here:

> "Particularly important have been the contributions establishing and developing the relationships to the theory of optimal control and dynamic programming."

Dynamic programming is recursive by nature, so maybe it is like a feedback loop of some kind.

I also have absolutely no idea (yet) what optimal control theory entails. But I am #hereForIt.

> “One full chapter is devoted to introducing the reinforcement learning problem whose solution we explore in the rest of the book.”  

Thank god, LOL

### Learnings from the chapter:

When we learn something, some sensory/motor-related reaction gives us a plethora of information: directly, and indirectly.  
We learn about the intricate relationship of cause and effect/consequence, and that in turn teaches us about our environment and the rules which exist.

Reinforcement learning involves a **closed-loop problem**, where an artificial intelligence takes actions to maximize for some kind of a signal. The results from the action feed back into the future decision-making of the AI, via some kind of a “reward signal”.

**Reinforcement learning is a separate category from supervised and unsupervised learning.**
