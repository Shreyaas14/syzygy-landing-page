Thoughts and learnings:

---
May 3rd, 2025

I finally finished the landing page (well, enough of it to keep going). We lowkey need more devs here. I need to make a UI where people can submit contributions next.

Anyway, back to reading this RL book. Just gonna start from chapter 1 again.

Okay, my takeaways and thoughts from 1.1.

So, this problem space is interesting—reinforcement learning is a separate category from supervised and unsupervised learning because the requirements are inherently different. An agent learning via RL needs to have a goal, and the ability to have a complete understanding of the state space (of its environment). Does the idea of data being labelled or not even matter here then? I guess it’d just be a factor of the space for the agent to learn—so my current guess is no, that’s not an important distinction, but rather another factor for the agent to consider.

This idea of exploitation (using knowledge the agent already has to obtain a reward) versus exploration (trying new actions to discover potentially better selections in the future) is something that’s interesting too.

But I think I have a better picture of what we’re trying to solve here. It’s trying to figure out how an agent can maximize for a reward signal when thrown into an unknown environment—similarly to how humans “learn”.

Reading 1.2, the examples give a lot of clarity and adding “applications” here helps. But one interesting thing is that the state of the agent itself is considered into the decision-making that the agent does.

1.3. So each RL system has 4 main parts to it:
1. The policy—this is how the agent maps its percieved state of the environment to what action it should take accordingly.
2. The reward signal—A short-term goal for the RL agent to maximize over time. At first it sounded binary, but upon 3-5 business seconds of critical thinking, it was clear to me that a “score” makes more sense.
3. The value function—a goal which is good in the long-term. The total amount of reward an agent can expect to accumulate in the future, starting from some state X.
4. The model—this is what mimics environment behavior, and this is what allows the agent to make inferences on environment behavior given some state X.

I do need to read more, so will do that this week.

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
