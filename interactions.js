(()=>{
const agendas={human:{label:"Research area · Human–AI interaction",title:"Design machine intelligence around the realities of work.",copy:"I study where people hesitate, improvise, lose context, or compensate for a system—and where an ML-assisted recommendation can strengthen judgment without obscuring agency. The research question is not simply whether a model can predict an action, but whether that action is relevant, explainable, and useful in context.",goal:"Define when machine assistance improves judgment—and when it introduces new cognitive or operational burden.",impact:"Translate findings into interaction principles, evaluation criteria, and roadmap decisions for human-centered AI.",methods:"Contextual interviews · Workflow observation · Friction mapping · Recommendation framing",evidence:"Task success · Confidence · Adoption · Time saved · Workarounds reduced"},search:{label:"Research area · Conversational AI and discovery",title:"Treat language and model behavior as product evidence.",copy:"At 3–5 million queries a day, language reveals vocabulary, intent, uncertainty, unmet needs, and model gaps. I connect NLP and LLM behavior with search analytics, qualitative feedback, intent flows, and experimentation to determine which improvements create real user value.",goal:"Develop evaluation approaches that connect intent recognition and response quality to the user’s ability to complete meaningful work.",impact:"Inform search strategy, conversational design, model prioritization, feedback mechanisms, and experiments using evidence from real language behavior.",methods:"Query-pattern analysis · Intent taxonomy · NLP evaluation · A/B testing · Qualitative triangulation",evidence:"Relevance · Intent success · Reformulation · Task completion · Experience quality"},platform:{label:"Research area · AI platform adoption",title:"Make intelligent capability reusable, measurable, and governable.",copy:"AI platform value appears when teams can discover, integrate, evaluate, and reuse capabilities without heroic effort. I investigate onboarding friction, orchestration patterns, model adoption, API and data dependencies, and the operating mechanisms required for enterprise scale.",goal:"Identify the technical, organizational, and governance conditions that turn isolated AI features into reusable enterprise capabilities.",impact:"Shape platform architecture, onboarding models, capability standards, adoption measures, and investment priorities for sustainable scale.",methods:"Partner interviews · Service blueprints · Dependency mapping · Adoption analytics",evidence:"Integration cadence · Time to value · Capability reuse · Adoption · Operational burden"},governance:{label:"Research area · Responsible ML scale",title:"Evaluate the system, not only the model.",copy:"Scaling ML-enabled products requires more than offline performance. I examine decision rights, guardrails, rollout strategy, model and product metrics, feedback loops, explainability, reliability, and unintended consequences so intelligent systems remain useful after launch.",goal:"Build practical evaluation frameworks that reveal who benefits, what can fail, where accountability sits, and when deployment should pause.",impact:"Turn responsible-AI principles into operating decisions: thresholds, guardrails, rollout criteria, monitoring, escalation paths, and durable feedback loops.",methods:"Risk framing · Model evaluation · Experiment design · Governance mapping · Phased rollout",evidence:"Quality · Reliability · Adoption · Explainability · Outcome lift · Unintended effects"}};
const radars={human:{values:[95,61,78,70,72],caption:"Human context leads; model and operational evidence complete the decision."},search:{values:[76,92,89,84,66],caption:"Model behavior and behavioral evidence lead, interpreted through real language and task context."},platform:{values:[62,72,74,96,86],caption:"Scale and governance lead when intelligent capability must become reusable infrastructure."},governance:{values:[71,83,91,87,100],caption:"Governance leads, balanced by evaluation evidence, model quality, and durable adoption."}};
function setRadar(key){const radar=radars[key],points=radar.values.map((value,index)=>{const angle=-Math.PI/2+index*Math.PI*2/5,r=value*.98;return`${Math.cos(angle)*r},${Math.sin(angle)*r}`});document.querySelector("#radar-shape").setAttribute("points",points.join(" "));document.querySelectorAll(".agenda-radar circle").forEach((circle,index)=>{const [x,y]=points[index].split(",");circle.setAttribute("cx",x);circle.setAttribute("cy",y)});document.querySelector("#radar-caption").textContent=radar.caption}
document.querySelectorAll("[data-agenda]").forEach(b=>b.addEventListener("click",()=>{const a=agendas[b.dataset.agenda];document.querySelectorAll("[data-agenda]").forEach(x=>x.classList.toggle("active",x===b));["label","title","copy","goal","impact","methods","evidence"].forEach(k=>document.querySelector("#agenda-"+k).textContent=a[k]);setRadar(b.dataset.agenda)}));
const cases={frontline:{lens:"human",q:"Where does the work become harder than it should be?",m:"Method · Contextual interviews + workflow observation",o:"Decision · Prioritize friction blocking confident completion"},integration:{lens:"system",q:"What makes a valuable integration slow or difficult to repeat?",m:"Method · Partner interviews + blueprint + dependency mapping",o:"Decision · Standardize the highest-friction onboarding constraint"},quality:{lens:"evidence",q:"Which query failures cause the greatest loss of time or trust?",m:"Method · Query patterns + intent review + triangulation",o:"Decision · Test the improvement with the clearest user value"}};
const lenses={human:["Human lens","Study the work, not only the request.","Listen for friction, workarounds, and the moments where people lose confidence or time."],system:["System lens","Trace the constraint behind the symptom.","Map dependencies, incentives, governance, data movement, and technical choices."],evidence:["Evidence lens","Ask what would change the decision.","Triangulate qualitative, behavioral, operational, and experiment signals before committing."]};
const lensCards={human:{question:["Observe","Where does the work break down?"],evidence:["Patterns","Which behaviors and workarounds repeat?"],experiment:["Prototype","What change improves confidence safely?"],impact:["Experience","Did effort, trust, and task success improve?"]},system:{question:["Constraint","Where does the system restrict the work?"],evidence:["Dependencies","Which handoffs create the recurring pattern?"],experiment:["Leverage","What is the safest point of intervention?"],impact:["Flow","Did reliability and throughput improve?"]},evidence:{question:["Assumption","Which belief carries the most decision risk?"],evidence:["Signals","Where do qualitative and quantitative signals agree?"],experiment:["Test","What evidence would change the decision?"],impact:["Attribution","What changed—and can we attribute it?"]}};
const guide={human:{question:["Observe the work before defining it.","Separate the stated request from the job, context, and friction people actually experience."],evidence:["Look for patterns across lived experience.","Combine interviews, observation, support themes, and behavior—not the loudest anecdote."],experiment:["Make the idea tangible enough to learn.","Prototype the smallest change that can reveal comprehension, confidence, and task success."],impact:["Measure a better experience, not more activity.","Look for reduced effort, stronger confidence, completion, and fewer workarounds."]},system:{question:["Locate the constraint behind the symptom.","Frame the problem across actors, dependencies, incentives, governance, and information flow."],evidence:["Trace where the system creates the pattern.","Use service blueprints, dependency maps, failure modes, latency, and operational signals."],experiment:["Intervene at the safest leverage point.","Test one dependency or operating mechanism while protecting reliability downstream."],impact:["Evaluate the flow of the whole system.","Measure reliability, integration speed, handoffs, burden, and unintended consequences."]},evidence:{question:["Name the assumption carrying the most risk.","Ask which uncertainty could reverse the decision—not which metric is easiest to collect."],evidence:["Triangulate before concluding.","Compare qualitative themes, behavioral patterns, model measures, operations, and counter-evidence."],experiment:["Design a test that can change the decision.","Define the hypothesis, threshold, guardrails, and learning plan before shipping."],impact:["Separate change from attribution.","Examine baselines, indicators, confounders, durability, and who benefited."]}};
let lens="human",caseKey="frontline";const visited=new Set(),map=document.querySelector(".map article");
function prog(){document.querySelector("#progress").textContent=`${visited.size} of 4 stages explored`;document.querySelectorAll(".progress i").forEach((x,i)=>x.classList.toggle("done",i<visited.size))}
function setLens(k){lens=k;document.querySelectorAll("[data-lens]").forEach(x=>x.classList.toggle("active",x.dataset.lens===k));const v=lenses[k];document.querySelector("#map-label").textContent=v[0];document.querySelector("#map-title").textContent=v[1];document.querySelector("#map-copy").textContent=v[2];document.querySelectorAll("[data-stage]").forEach(x=>{x.classList.remove("active");const card=lensCards[k][x.dataset.stage];x.querySelector("b").textContent=card[0];x.querySelector("span").textContent=card[1]})}
function setCase(k){caseKey=k;const c=cases[k];document.querySelectorAll("[data-case]").forEach(x=>x.classList.toggle("active",x.dataset.case===k));document.querySelector("#brief-q").textContent=c.q;document.querySelector("#brief-m").textContent=c.m;document.querySelector("#brief-o").textContent=c.o;visited.clear();prog();setLens(c.lens)}
document.querySelectorAll("[data-case]").forEach(b=>b.addEventListener("click",()=>setCase(b.dataset.case)));document.querySelectorAll("[data-lens]").forEach(b=>b.addEventListener("click",()=>setLens(b.dataset.lens)));document.querySelectorAll("[data-stage]").forEach(b=>b.addEventListener("click",()=>{visited.add(b.dataset.stage);prog();document.querySelectorAll("[data-stage]").forEach(x=>x.classList.toggle("active",x===b));document.querySelector("#map-label").textContent=`${lens} lens · ${b.dataset.stage}`;document.querySelector("#map-title").textContent=guide[lens][b.dataset.stage][0];document.querySelector("#map-copy").textContent=guide[lens][b.dataset.stage][1];map.classList.remove("pulse");requestAnimationFrame(()=>map.classList.add("pulse"))}));document.querySelector("#reset").addEventListener("click",()=>setCase(caseKey));
const stories={ai:{note:"From connected systems and behavioral signals to conversational intelligence, model evaluation, and enterprise AI strategy.",reading:"Analytics, experimentation, and intelligent-product judgment accelerate into enterprise AI strategy and responsible scale.",senior:"Shapes enterprise intelligence, orchestration, Next Best Actions, evaluation, adoption, and responsible AI platform scale.",pm3:"Treated 3–5M daily queries as an AI product-learning system linking intent quality, experiments, feedback, and task outcomes.",manager1:"Connected product analytics and frontline research to intelligent recommendations developed with Applied AI partners.",cognizant:"Built the analytical, API, experimentation, and risk foundations required for explainable enterprise decision products.",cohum:"Engineered an IoT-enabled decision-support system where data, context, privacy, and human urgency had to work together."},research:{note:"From investigating technical behavior to turning millions of signals into strategic decisions.",reading:"Published inquiry develops into continuous product research, evidence synthesis, and decision framing at enterprise scale.",senior:"Research synthesis connects workflow evidence, platform signals, and strategic decisions.",pm3:"Millions of daily conversational queries became a behavioral research system for discovering intent friction.",manager1:"Product and usage insights revealed friction across associate workflows and informed intelligent recommendations.",cognizant:"Stakeholder discovery and risk mapping turned migration uncertainty into testable requirements.",cohum:"Technical investigation connected architecture choices to reliability, usability, and response time."},platform:{note:"From connected components to reusable capabilities across enterprise ecosystems.",reading:"Engineering foundations evolve into platform orchestration, reusable capabilities, governance, and reliable enterprise adoption.",senior:"Defines intelligence capabilities, orchestration patterns, governance, and platform direction.",pm3:"Governed core mobile experiences and conversational capabilities across a platform serving 1.2M+ daily users.",manager1:"Supported platform delivery, backlog refinement, UAT, releases, and intelligent recommendations across associate workflows.",cognizant:"Designed traceable migration workflows across data dependencies and operational risks.",cohum:"Built connected healthcare and emergency-response components where reliability was foundational."},leadership:{note:"From technical ownership to aligning evidence, teams, roadmaps, and enterprise outcomes.",reading:"Leadership grows from technical ownership into cross-functional alignment, portfolio judgment, strategy, and measurable outcomes.",senior:"Aligns stakeholders around evidence-backed priorities, experiments, governance, and outcomes.",pm3:"Led cross-functional optimization, accessibility standards, external-team onboarding, and feedback-to-resolution improvements.",manager1:"Coordinated Engineering, UX, Analytics, Applied AI, and platform teams around successful feature delivery.",cognizant:"Converted competing needs into visible risks and sequenced decisions.",cohum:"Built credibility through delivery and clear communication across technical constraints."}};
document.querySelectorAll("[data-career]").forEach(b=>b.addEventListener("click",()=>{const key=b.dataset.career,s=stories[key],chart=document.querySelector(".capability-chart");document.querySelectorAll("[data-career]").forEach(x=>x.classList.toggle("active",x===b));document.querySelector("#career-note").textContent=s.note;document.querySelectorAll("[data-role]").forEach(r=>r.querySelector("[data-summary]").textContent=s[r.dataset.role]);chart.dataset.focus=key;chart.classList.remove("focus-change");requestAnimationFrame(()=>chart.classList.add("focus-change"));document.querySelector("#capability-reading-label").textContent=b.textContent;document.querySelector("#capability-reading-copy").textContent=s.reading}));
setCase("frontline");document.querySelector('[data-career="ai"]')?.click();
})();

/* Portfolio-grounded assistant and feedback relay. */
(() => {
  const root = document.getElementById("krkp-assistant");
  if (!root) return;
  const launcher = document.getElementById("assistant-launcher");
  const panel = document.getElementById("assistant-panel");
  const close = document.getElementById("assistant-close");
  const askTab = document.getElementById("assistant-ask-tab");
  const feedbackTab = document.getElementById("assistant-feedback-tab");
  const chat = document.getElementById("assistant-chat");
  const questionForm = document.getElementById("assistant-question");
  const questionInput = document.getElementById("assistant-input");
  const feedbackForm = document.getElementById("assistant-feedback");
  const feedbackStatus = document.getElementById("feedback-status");
  const suggestionBox = root.querySelector(".assistant-suggestions");

  const knowledge = [
    {
      terms: ["ai", "artificial intelligence", "niche", "machine learning", "ml", "model", "nlp"],
      answer: "Kajal’s niche is AI—specifically research-grounded enterprise intelligence. She has led conversational AI and NLP products across 3–5M daily queries, shaped recommendation and Next Best Action concepts, connected model evaluation to task outcomes, and built platform strategy for reusable, governed AI. Her differentiator is combining AI product judgment with analytics, experimentation, human-centered research, and responsible scale."
    },
    {
      terms: ["experience", "career", "background", "journey", "years", "roles"],
      answer: "Kajal has 8+ years across software engineering, enterprise product management, analytics, and AI product leadership. Her journey spans connected healthcare at COHUM, B2B migration and risk platforms at Cognizant, and large-scale frontline, conversational, and enterprise intelligence products at Walmart."
    },
    {
      terms: ["research", "agenda", "interest", "goal", "future"],
      answer: "Her research agenda connects human–AI interaction, conversational discovery, platform adoption, and responsible scale. Her long-term goal is to develop practical methods for deciding when enterprise AI is useful, how it should behave, and whether it deserves to scale."
    },
    {
      terms: ["publication", "published", "paper", "papers", "orcid", "journal"],
      answer: "Kajal has three published papers covering visual cryptography, IoT-enabled emergency medical services, and an emergency response system with location tracking. Her ORCID is 0009-0008-0770-6758, and direct paper links are available in the Publications section."
    },
    {
      terms: ["metric", "impact", "scale", "users", "queries", "kpi", "result"],
      answer: "Her portfolio includes research across 3–5 million daily conversational queries, products supporting 1.2M+ daily users, a 4.5-star frontline experience, feedback cycles reduced from weeks to days, and platform integration cadence accelerated from roughly one annually to three in one quarter."
    },
    {
      terms: ["analytics", "data", "sql", "python", "r", "experiment"],
      answer: "Kajal combines product analytics, experimentation, behavioral signals, and qualitative research. Her toolkit includes SQL, Python, R, data modeling, BI, A/B testing, KPI design, and evaluation frameworks connecting model performance to user and business outcomes."
    },
    {
      terms: ["product", "strategy", "platform", "b2b", "b2c"],
      answer: "Her product practice spans both B2B and B2C contexts: enterprise platforms, partner ecosystems, consumer-grade frontline experiences, conversational products, data and migration systems, and connected IoT solutions. She translates evidence into roadmaps, reusable capabilities, governance, and adoption."
    },
    {
      terms: ["leadership", "manage", "team", "stakeholder"],
      answer: "Kajal leads through research synthesis and shared decision clarity. She aligns engineering, UX, analytics, applied AI, operations, and platform partners; frames measurable outcomes; and balances user value, technical constraints, governance, and enterprise-scale adoption."
    },
    {
      terms: ["education", "degree", "university", "school"],
      answer: "Kajal holds an MS in Management Information Systems from the University at Buffalo, SUNY, and a BE in Computer Engineering from Savitribai Phule Pune University."
    },
    {
      terms: ["contact", "email", "linkedin", "github", "connect"],
      answer: "You can contact Kajal at pandeykajalradhekrishna@gmail.com, connect on LinkedIn at linkedin.com/in/kajal-pandey, view technical work on GitHub, or explore her ORCID research profile. You can also use the Feedback tab here."
    }
  ];

  const suggestionDeck = [
    ["What is Kajal’s niche?", "What AI products has she led?", "Summarize her experience"],
    ["What are her research goals?", "What has she published?", "How does she evaluate AI?"],
    ["Show her product impact", "What are her strongest metrics?", "How does she use analytics?"],
    ["What is her leadership style?", "Which industries has she worked in?", "What is her technical background?"],
    ["What is her B2B and B2C experience?", "How does she approach responsible AI?", "How can I contact Kajal?"]
  ];
  let suggestionPage = 0;
  let suggestionTimer;

  const renderSuggestions = () => {
    suggestionBox.replaceChildren();
    suggestionDeck[suggestionPage].forEach((question) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = question;
      suggestionBox.appendChild(button);
    });
    suggestionPage = (suggestionPage + 1) % suggestionDeck.length;
  };

  const restartSuggestions = () => {
    window.clearInterval(suggestionTimer);
    suggestionTimer = window.setInterval(() => {
      if (!panel.hidden && !chat.hidden) renderSuggestions();
    }, 7200);
  };

  const addMessage = (text, type) => {
    const message = document.createElement("p");
    message.className = `assistant-message assistant-${type}`;
    message.textContent = text;
    chat.appendChild(message);
    chat.scrollTop = chat.scrollHeight;
  };

  const answerQuestion = (question) => {
    const normalized = question.toLowerCase();
    let best = null;
    let bestScore = 0;
    knowledge.forEach((entry) => {
      const score = entry.terms.reduce((total, term) => total + (normalized.includes(term) ? (term.includes(" ") ? 3 : 1) : 0), 0);
      if (score > bestScore) { best = entry; bestScore = score; }
    });
    return best ? best.answer : "Hmm—my portfolio model needs a little more training before I can answer that confidently. Please share this question in the Feedback tab so Kajal can teach me and I can provide a better answer next time. For a direct human response, you can also reach Kajal at pandeykajalradhekrishna@gmail.com or through the Contact section.";
  };

  const openPanel = () => {
    panel.hidden = false;
    launcher.setAttribute("aria-expanded", "true");
    restartSuggestions();
    window.setTimeout(() => questionInput.focus(), 50);
  };
  const closePanel = () => {
    panel.hidden = true;
    launcher.setAttribute("aria-expanded", "false");
    window.clearInterval(suggestionTimer);
  };
  const selectMode = (mode) => {
    const feedback = mode === "feedback";
    chat.hidden = feedback;
    questionForm.hidden = feedback;
    feedbackForm.hidden = !feedback;
    askTab.classList.toggle("active", !feedback);
    feedbackTab.classList.toggle("active", feedback);
    askTab.setAttribute("aria-selected", String(!feedback));
    feedbackTab.setAttribute("aria-selected", String(feedback));
  };

  renderSuggestions();
  launcher.addEventListener("click", () => panel.hidden ? openPanel() : closePanel());
  close.addEventListener("click", closePanel);
  askTab.addEventListener("click", () => selectMode("ask"));
  feedbackTab.addEventListener("click", () => selectMode("feedback"));
  suggestionBox.addEventListener("click", (event) => {
    const button = event.target.closest("button");
    if (!button) return;
    addMessage(button.textContent, "user");
    window.setTimeout(() => addMessage(answerQuestion(button.textContent), "bot"), 180);
    renderSuggestions();
    restartSuggestions();
  });
  questionForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const question = questionInput.value.trim();
    if (!question) return;
    addMessage(question, "user");
    questionInput.value = "";
    window.setTimeout(() => addMessage(answerQuestion(question), "bot"), 220);
  });

  feedbackForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    const button = feedbackForm.querySelector("button[type='submit']");
    button.disabled = true;
    button.textContent = "Sending…";
    feedbackStatus.textContent = "Delivering your feedback to Kajal…";
    try {
      const response = await fetch("https://formsubmit.co/ajax/pandeykajalradhekrishna@gmail.com", {
        method: "POST",
        headers: { Accept: "application/json" },
        body: new FormData(feedbackForm)
      });
      if (!response.ok) throw new Error("Delivery failed");
      feedbackForm.reset();
      feedbackStatus.textContent = "Thank you—your feedback was sent to Kajal.";
      button.textContent = "Sent ✓";
    } catch (error) {
      const data = new FormData(feedbackForm);
      const subject = encodeURIComponent("Portfolio feedback");
      const body = encodeURIComponent(`From: ${data.get("name") || "Portfolio visitor"}\nEmail: ${data.get("email") || "Not provided"}\n\n${data.get("message")}`);
      feedbackStatus.innerHTML = `Automatic delivery was unavailable. <a href="mailto:pandeykajalradhekrishna@gmail.com?subject=${subject}&body=${body}">Open your email app to send it →</a>`;
      button.disabled = false;
      button.textContent = "Try again";
    }
  });
})();

(()=>{
const analytics=document.querySelector("details.audience");
if(!analytics)return;
analytics.addEventListener("toggle",()=>{
  const label=analytics.querySelector("summary b");
  label.textContent=analytics.open?"Close data −":"Open data +";
  if(analytics.open)analytics.querySelectorAll(".audience-mix i em").forEach(bar=>{const width=bar.style.width;bar.style.width="0";requestAnimationFrame(()=>bar.style.width=width)});
});
})();

(()=>{
const mapEl=document.querySelector("#inquiry-map"),canvas=document.querySelector("#mindmap-lines"),center=mapEl?.querySelector("article"),cards=[...(mapEl?.querySelectorAll("[data-stage]")||[])],ctx=canvas?.getContext("2d");
function drawMindMap(){
  if(!mapEl||!canvas||!center||!ctx)return;
  const ratio=window.devicePixelRatio||1;canvas.width=mapEl.clientWidth*ratio;canvas.height=mapEl.clientHeight*ratio;ctx.setTransform(ratio,0,0,ratio,0,0);ctx.clearRect(0,0,mapEl.clientWidth,mapEl.clientHeight);
  const mr=mapEl.getBoundingClientRect(),cr=center.getBoundingClientRect(),hub={x:cr.left-mr.left+cr.width/2,y:cr.top-mr.top+cr.height/2,rx:cr.width/2,ry:cr.height/2};
  cards.forEach((card,index)=>{
    const r=card.getBoundingClientRect(),box={x:r.left-mr.left+r.width/2,y:r.top-mr.top+r.height/2,hw:r.width/2,hh:r.height/2},active=card.classList.contains("active");
    const towardHub={x:hub.x-box.x,y:hub.y-box.y},startScale=Math.min(box.hw/Math.max(Math.abs(towardHub.x),.001),box.hh/Math.max(Math.abs(towardHub.y),.001));
    const start={x:box.x+towardHub.x*startScale,y:box.y+towardHub.y*startScale},towardCard={x:box.x-hub.x,y:box.y-hub.y};
    const endScale=1/Math.sqrt((towardCard.x*towardCard.x)/(hub.rx*hub.rx)+(towardCard.y*towardCard.y)/(hub.ry*hub.ry)),end={x:hub.x+towardCard.x*endScale,y:hub.y+towardCard.y*endScale};
    ctx.beginPath();ctx.setLineDash(active?[]:[5,8]);ctx.strokeStyle=active?"#e0bd79":index%2?"#5f86ad":"#5ba7a7";ctx.lineWidth=active?2.6:1.25;ctx.moveTo(start.x,start.y);ctx.lineTo(end.x,end.y);ctx.stroke();
  });
}
cards.forEach(card=>card.addEventListener("click",()=>requestAnimationFrame(drawMindMap)));
document.querySelectorAll("[data-lens],[data-case],#reset").forEach(control=>control.addEventListener("click",()=>requestAnimationFrame(drawMindMap)));
window.addEventListener("resize",drawMindMap);window.addEventListener("load",drawMindMap);requestAnimationFrame(drawMindMap);
})();

(()=>{
const reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const hero=document.querySelector(".hero");
if(hero&&!reduceMotion){
  hero.addEventListener("pointermove",event=>{
    const rect=hero.getBoundingClientRect();
    hero.style.setProperty("--pointer-x",`${((event.clientX-rect.left)/rect.width)*100}%`);
    hero.style.setProperty("--pointer-y",`${((event.clientY-rect.top)/rect.height)*100}%`);
  });
}
const revealItems=document.querySelectorAll(".section-head,.snapshot-title,.journey-shell,.sankey-shell,.agenda h2,.agenda-grid,.agenda-radar,.lab-intro,.case-row,.lens-row,.brief,.work h2,.cases,.publication-title,.research-arc,.paper-list,.project-heading,.project-list,.career h2,.career-controls,.capability-chart,.timeline,.profile>div,.contact>p,.contact h2,.contact div");
if(reduceMotion||!("IntersectionObserver" in window)){
  revealItems.forEach(item=>item.classList.add("is-visible"));
  return;
}
revealItems.forEach(item=>item.classList.add("reveal-ready"));
const observer=new IntersectionObserver(entries=>{
  entries.forEach(entry=>{
    if(entry.isIntersecting){
      entry.target.classList.add("is-visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12,rootMargin:"0px 0px -6% 0px"});
revealItems.forEach(item=>observer.observe(item));
})();

(()=>{
const chapters={
foundation:{label:"Foundation · Engineering and published research",title:"Build systems where reliability becomes human impact.",copy:"My foundation combined software engineering with research into connected healthcare, IoT-enabled emergency response, information access, privacy, and visual security—teaching me that architecture is inseparable from trust and usability.",tags:["Software engineering","Connected systems","3 publications","Privacy & reliability"]},
enterprise:{label:"Expansion · Enterprise product and analytics",title:"Translate complex systems into decisions people can trust.",copy:"I moved from implementation into product leadership across B2B data migration and risk platforms, using stakeholder research, API and data dependencies, experimentation, traceability, and analytical thinking to make enterprise change understandable.",tags:["B2B platforms","Data migration","Risk products","Experimentation"]},
scale:{label:"Scale · Frontline and conversational AI",title:"Use millions of interactions as continuous product research.",copy:"At enterprise scale, I connected query behavior, intent failures, qualitative feedback, accessibility, A/B tests, and store observation to improve conversational and frontline experiences serving more than 1.2 million daily users.",tags:["3–5M queries","Conversational AI","1.2M+ users","4.5-star experience"]},
intelligence:{label:"Present focus · Enterprise intelligence",title:"Turn signals into relevant, governable action.",copy:"I am shaping the product strategy, orchestration, evaluation, and adoption patterns that help intelligent capabilities move from isolated features into reusable enterprise platforms.",tags:["Next Best Actions","AI platform strategy","Model evaluation","Responsible scale"]},
horizon:{label:"Career direction · Research-led AI leadership",title:"Lead AI products that improve judgment—not merely automate activity.",copy:"My goal is to lead human-centered AI and decision-intelligence portfolios where research, product analytics, model evaluation, and responsible governance work together to create durable value at enterprise scale.",tags:["AI portfolio leadership","Human–AI systems","Applied research","Trustworthy adoption"]}
};
const detail=document.querySelector(".journey-detail");
document.querySelectorAll("[data-journey]").forEach(button=>button.addEventListener("click",()=>{
  const chapter=chapters[button.dataset.journey];
  document.querySelectorAll("[data-journey]").forEach(item=>item.classList.toggle("active",item===button));
  detail.classList.remove("switching");requestAnimationFrame(()=>detail.classList.add("switching"));
  document.querySelector("#journey-label").textContent=chapter.label;
  document.querySelector("#journey-title").textContent=chapter.title;
  document.querySelector("#journey-copy").textContent=chapter.copy;
  document.querySelector("#journey-tags").replaceChildren(...chapter.tags.map(tag=>{const span=document.createElement("span");span.textContent=tag;return span}));
}));
})();

(()=>{
const copy={
all:["The complete story","My practice moves deliberately from observation to framing, delivery, learning, and scale—connecting human context, technical judgment, and behavioral evidence at every stage."],
research:["Discovery chapters","Research helps me resist premature solutions: I study the work, expose the real decision, and define what evidence would justify investment."],
systems:["Delivery chapters","Systems thinking turns a promising idea into usable, governable capability—and turns a proven experience into something the enterprise can sustain."],
analytics:["Learning chapter","Analytics closes the loop: behavioral signals, experiments, and model evaluation reveal whether the product changed confidence, relevance, and outcomes."]
};
const note=document.querySelector("#sankey-note");
document.querySelectorAll("[data-sankey]").forEach(button=>button.addEventListener("click",()=>{
  const selected=button.dataset.sankey;
  document.querySelectorAll("[data-sankey]").forEach(item=>item.classList.toggle("active",item===button));
  document.querySelector(".sankey-canvas").dataset.filter=selected;
  window.dispatchEvent(new CustomEvent("career-flow-filter",{detail:selected}));
  note.classList.remove("switching");requestAnimationFrame(()=>note.classList.add("switching"));
  note.querySelector("b").textContent=copy[selected][0];note.querySelector("span").textContent=copy[selected][1];
}));
})();

(()=>{
const canvas=document.querySelector("#career-flow");if(!canvas)return;
const ctx=canvas.getContext("2d"),reduceMotion=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const categories=["research","systems","analytics"],colors={research:[91,220,199],systems:[116,165,235],analytics:[241,190,92]};
const sourceY=[.18,.49,.8],goalY=[.18,.49,.8];
let width=0,height=0,filter="all",frame=0,pointer={x:.5,y:.5,inside:false};
const noise=n=>{const x=Math.sin(n*9283.31)*43758.5453;return x-Math.floor(x)};
const curves=Array.from({length:150},(_,i)=>{
  const category=i%3,branch=i%5,target=branch<3?category:(category+branch)%3;
  return{category,target,j1:(noise(i+1)-.5)*.15,j2:(noise(i+101)-.5)*.17,bend:(noise(i+301)-.5)*.15,width:.45+noise(i+501)*1.3,speed:.00013+noise(i+701)*.00018,phase:noise(i+901),alpha:1};
});
const stars=Array.from({length:105},(_,i)=>({x:.08+noise(i+1200)*.84,y:.07+noise(i+1400)*.86,r:.45+noise(i+1600)*1.75,phase:noise(i+1800)*Math.PI*2,drift:2+noise(i+2000)*8,hue:noise(i+2200)*360}));
let paused=false;
function resize(){
  const rect=canvas.getBoundingClientRect(),ratio=Math.min(window.devicePixelRatio||1,2);
  width=rect.width;height=rect.height;canvas.width=Math.round(width*ratio);canvas.height=Math.round(height*ratio);ctx.setTransform(ratio,0,0,ratio,0,0);
}
function bezier(p0,p1,p2,p3,t){
  const m=1-t;return{x:m*m*m*p0.x+3*m*m*t*p1.x+3*m*t*t*p2.x+t*t*t*p3.x,y:m*m*m*p0.y+3*m*m*t*p1.y+3*m*t*t*p2.y+t*t*t*p3.y};
}
function draw(time=0){
  filter=canvas.parentElement.dataset.filter||"all";
  ctx.clearRect(0,0,width,height);
  ctx.strokeStyle="rgba(154,205,218,.045)";ctx.lineWidth=1;
  for(let x=0;x<width;x+=42){ctx.beginPath();ctx.moveTo(x,0);ctx.lineTo(x,height);ctx.stroke()}
  for(let y=0;y<height;y+=42){ctx.beginPath();ctx.moveTo(0,y);ctx.lineTo(width,y);ctx.stroke()}
  stars.forEach((star,index)=>{
    const twinkle=.38+.38*(.5+.5*Math.sin(time*.002+star.phase)),x=star.x*width+Math.sin(time*.00035+star.phase)*star.drift,y=star.y*height+Math.cos(time*.00028+star.phase)*star.drift,hue=(star.hue+time*.012)%360;
    ctx.beginPath();ctx.arc(x,y,star.r*(1+twinkle*.45),0,Math.PI*2);ctx.fillStyle=`hsla(${hue},65%,76%,${twinkle})`;ctx.shadowColor=`hsla(${hue},75%,68%,.8)`;ctx.shadowBlur=star.r>1.2?6:2;ctx.fill();ctx.shadowBlur=0;
    const next=stars[index+1];if(next){const nx=next.x*width+Math.sin(time*.00035+next.phase)*next.drift,ny=next.y*height+Math.cos(time*.00028+next.phase)*next.drift,d=Math.hypot(nx-x,ny-y);if(d<width*.1){ctx.beginPath();ctx.moveTo(x,y);ctx.lineTo(nx,ny);ctx.strokeStyle=`hsla(${(hue+next.hue)/2},55%,72%,${Math.max(0,.13-d/width)})`;ctx.lineWidth=.65;ctx.stroke()}}
  });
  curves.forEach((curve,i)=>{
    const category=categories[curve.category],muted=filter!=="all"&&filter!==category,color=colors[category],targetAlpha=muted?.055:1;
    curve.alpha+=(targetAlpha-curve.alpha)*.055;
    const p0={x:width*.2,y:height*(sourceY[curve.category]+curve.j1)};
    const p1={x:width*.38,y:height*(.5+curve.bend)};
    const p2={x:width*.62,y:height*(.5-curve.bend+curve.j2*.18)};
    const p3={x:width*.8,y:height*(goalY[curve.target]+curve.j2)};
    ctx.beginPath();ctx.moveTo(p0.x,p0.y);ctx.bezierCurveTo(p1.x,p1.y,p2.x,p2.y,p3.x,p3.y);
    ctx.strokeStyle=`rgba(${color.join(",")},${.06+.19*curve.alpha})`;ctx.lineWidth=.35+curve.width*curve.alpha;ctx.stroke();
    if(curve.alpha>.4&&i%3===0){
      const t=(curve.phase+time*curve.speed)%1,point=bezier(p0,p1,p2,p3,t);
      const particleHue=([166,215,41][curve.category]+Math.sin(time*.001+i)*24+time*.006)%360;
      ctx.beginPath();ctx.arc(point.x,point.y,1.6+curve.width*.85,0,Math.PI*2);ctx.fillStyle=`hsla(${particleHue},82%,67%,${.4+.55*curve.alpha})`;ctx.shadowColor=`hsla(${particleHue},90%,62%,.9)`;ctx.shadowBlur=10;ctx.fill();ctx.shadowBlur=0;
    }
  });
  categories.forEach((category,index)=>{
    const color=colors[category],active=filter==="all"||filter===category;
    for(let side=0;side<2;side++)for(let i=0;i<18;i++){
      const x=width*((side?.73:.2)+noise(index*100+i+side*500)*.07),goalIndex=side?[0,2,1][index]:index,y=height*((side?goalY[goalIndex]:sourceY[index])+(noise(index*200+i+side*600)-.5)*.17),r=.7+noise(index*300+i)*2.5;
      ctx.beginPath();ctx.arc(x,y,r,0,Math.PI*2);ctx.fillStyle=`rgba(${color.join(",")},${active?.56:.07})`;ctx.shadowColor=`rgba(${color.join(",")},.7)`;ctx.shadowBlur=active?5:0;ctx.fill();ctx.shadowBlur=0;
    }
  });
  const glow=ctx.createRadialGradient(width*.5,height*.5,0,width*.5,height*.5,height*.24);glow.addColorStop(0,"rgba(91,220,199,.13)");glow.addColorStop(1,"rgba(91,220,199,0)");ctx.fillStyle=glow;ctx.fillRect(width*.25,height*.15,width*.5,height*.7);
  if(!paused){frame=requestAnimationFrame(draw)}
}
window.addEventListener("career-flow-filter",event=>{filter=event.detail;if(paused)draw(performance.now())});
canvas.addEventListener("pointermove",event=>{const r=canvas.getBoundingClientRect();pointer={x:(event.clientX-r.left)/r.width,y:(event.clientY-r.top)/r.height,inside:true}});
document.querySelector("#flow-motion").addEventListener("click",event=>{paused=!paused;event.currentTarget.textContent=paused?"Play motion":"Pause motion";event.currentTarget.setAttribute("aria-pressed",String(paused));if(paused){cancelAnimationFrame(frame)}else{frame=requestAnimationFrame(draw)}});
window.addEventListener("resize",()=>{resize();if(paused)draw(performance.now())});resize();draw();
})();

(()=>{
const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const progress=document.querySelector("#quest-progress"),percent=document.querySelector("#quest-percent"),level=document.querySelector("#quest-level"),header=document.querySelector("header");
const levels=[
  {id:"top",name:"Level 1 · Origin"},
  {id:"snapshot",name:"Level 2 · Career map"},
  {id:"research",name:"Level 3 · Research agenda"},
  {id:"work",name:"Level 4 · Product evidence"},
  {id:"publications",name:"Level 5 · Public record"},
  {id:"career",name:"Level 6 · Leadership arc"},
  {id:"contact",name:"Final level · Connect"}
];
function updateQuest(){
  const max=document.documentElement.scrollHeight-innerHeight,p=max?Math.min(100,Math.max(0,scrollY/max*100)):0;
  progress.style.width=`${p}%`;percent.textContent=`${Math.round(p)}% explored`;header.style.setProperty("--quest-scroll",`${p}%`);
  let current=levels[0];
  levels.forEach(item=>{const node=document.getElementById(item.id);if(node&&node.getBoundingClientRect().top<innerHeight*.48)current=item});
  level.textContent=current.name;
  document.querySelectorAll("nav a").forEach(link=>link.classList.toggle("quest-active",link.getAttribute("href")===`#${current.id}`));
}
let ticking=false;
if(progress&&percent&&level&&header){
  window.addEventListener("scroll",()=>{if(!ticking){requestAnimationFrame(()=>{updateQuest();ticking=false});ticking=true}},{passive:true});
  window.addEventListener("resize",updateQuest);updateQuest();
}
if(!reduce)document.addEventListener("pointerdown",event=>{
  if(!event.target.closest("button,a,summary"))return;
  const colors=["#70d6c8","#df6f72","#f0a35b","#9b79b5"];
  for(let i=0;i<7;i++){
    const spark=document.createElement("i"),angle=Math.PI*2*i/7,distance=18+Math.random()*24;
    spark.className="quest-spark";spark.style.left=`${event.clientX}px`;spark.style.top=`${event.clientY}px`;spark.style.setProperty("--sx",`${Math.cos(angle)*distance}px`);spark.style.setProperty("--sy",`${Math.sin(angle)*distance}px`);spark.style.setProperty("--spark-color",colors[i%colors.length]);document.body.appendChild(spark);spark.addEventListener("animationend",()=>spark.remove());
  }
});
})();

(()=>{
const storageKey="krkp-first-visit-tour-v2",overlay=document.querySelector("#first-visit-tour");
if(!overlay)return;
const steps=[
  {id:"top",kicker:"Stop 1 · Welcome platform",title:"Meet Kajal RadheKrishna Pandey.",copy:"Read this introduction while exploring the opening platform. When you are ready, select Next stop to travel through the portfolio."},
  {id:"snapshot",kicker:"Stop 2 · Career platform",title:"Start with the breadth of the journey.",copy:"This platform summarizes the industries, business models, technologies, disciplines, education, and research identity that shape Kajal’s product perspective."},
  {id:"research",kicker:"Stop 3 · Research platform",title:"Explore the questions behind the roadmap.",copy:"This platform introduces four research areas: human–AI interaction, conversational discovery, platform adoption, and responsible machine-learning scale."},
  {id:"work",kicker:"Stop 4 · Evidence platform",title:"Follow evidence into decisions.",copy:"This platform contains verified outcomes, KPI systems, analytical frameworks, and product contributions across conversational AI, platforms, and decision intelligence."},
  {id:"publications",kicker:"Stop 5 · Publication platform",title:"Connect scholarship with applied work.",copy:"This platform connects published research with the evolution from engineering inquiry to an enterprise AI and product-research practice."},
  {id:"career",kicker:"Stop 6 · Leadership platform",title:"View the career through multiple lenses.",copy:"This platform lets you switch between AI, research, platform, and leadership perspectives, then inspect the evidence behind each role."},
  {id:"contact",kicker:"Stop 7 · Connection platform",title:"Continue the conversation.",copy:"The final platform provides direct paths to discuss human-centered AI, research, product analytics, enterprise intelligence, and platform strategy."}
];
let index=0;
const count=document.querySelector("#tour-count"),kicker=document.querySelector("#tour-kicker"),title=document.querySelector("#tour-title"),copy=document.querySelector("#tour-copy"),back=document.querySelector("#tour-back"),next=document.querySelector("#tour-next"),skip=document.querySelector("#tour-skip"),map=document.querySelector("#tour-map");
steps.forEach(()=>map.appendChild(document.createElement("i")));
function render(scroll=true){
  const step=steps[index];count.textContent=`STOP ${String(index+1).padStart(2,"0")} / ${String(steps.length).padStart(2,"0")}`;kicker.textContent=step.kicker;title.textContent=step.title;copy.textContent=step.copy;back.disabled=index===0;next.textContent=index===steps.length-1?"Finish tour ✓":"Next stop →";
  map.querySelectorAll("i").forEach((dot,i)=>{dot.classList.toggle("done",i<index);dot.classList.toggle("current",i===index)});
  document.querySelectorAll(".tour-target").forEach(node=>node.classList.remove("tour-target"));
  const target=document.getElementById(step.id);target?.classList.add("tour-target");
  if(scroll)target?.scrollIntoView({behavior:"smooth",block:"start"});
}
function finish(){localStorage.setItem(storageKey,"complete");overlay.hidden=true;document.body.classList.remove("tour-open");document.querySelectorAll(".tour-target").forEach(node=>node.classList.remove("tour-target"))}
function openTour(){index=0;overlay.hidden=false;document.body.classList.add("tour-open");render(false);next.focus()}
back.addEventListener("click",()=>{if(index>0){index--;render()}});
next.addEventListener("click",()=>{if(index===steps.length-1){finish()}else{index++;render()}});
skip.addEventListener("click",finish);
document.addEventListener("keydown",event=>{if(overlay.hidden)return;if(event.key==="Escape")finish();if(event.key==="ArrowRight")next.click();if(event.key==="ArrowLeft")back.click()});
document.querySelector("#replay-tour")?.addEventListener("click",openTour);
if(!localStorage.getItem(storageKey))setTimeout(openTour,650);
})();

(()=>{
const namespace="kajal-radhekrishna-pandey-portfolio",base=`https://api.counterapi.dev/v1/${namespace}`;
const countedKey="krkp-audience-counted-v1",uniqueKey="krkp-unique-counted-v1";
const mobile=/Mobi|Android|iPhone|iPad|Tablet/i.test(navigator.userAgent)?"mobile":"desktop";
const language=(navigator.language||"unknown").toLowerCase(),languageGroup=language.startsWith("en")?"english":"other";
const timezone=Intl.DateTimeFormat().resolvedOptions().timeZone||"Unknown";
const region=timezone.startsWith("America/")?"americas":/^(Europe|Africa|Atlantic)\//.test(timezone)?"emea":/^(Asia|Australia|Pacific|Indian)\//.test(timezone)?"apac":"other";
const increment=name=>fetch(`${base}/${name}/up`,{cache:"no-store"}).then(response=>{if(!response.ok)throw new Error("counter");return response.json()});
const get=name=>fetch(`${base}/${name}`,{cache:"no-store"}).then(response=>response.ok?response.json():{count:0}).then(data=>Number(data.count??data.value??0));
const firstUnique=!localStorage.getItem(uniqueKey),firstAudience=!localStorage.getItem(countedKey);
const viewJob=increment("page-views"),uniqueJob=firstUnique?increment("unique-visitors"):Promise.resolve(),audienceJobs=firstAudience?[increment(`device-${mobile}`),increment(`language-${languageGroup}`),increment(`region-${region}`)]:[];
Promise.allSettled([viewJob,uniqueJob,...audienceJobs]).then(results=>{
  if(firstUnique&&results[1].status==="fulfilled")localStorage.setItem(uniqueKey,"counted");
  if(firstAudience&&results.slice(2).every(result=>result.status==="fulfilled"))localStorage.setItem(countedKey,"counted");
  return Promise.all([get("page-views"),get("unique-visitors"),get("device-desktop"),get("device-mobile"),get("language-english"),get("language-other"),get("region-americas"),get("region-emea"),get("region-apac")]);
}).then(([views,unique,desktop,mobileCount,english,other,americas,emea,apac])=>{
  document.querySelector("#analytics-views").textContent=new Intl.NumberFormat().format(views);
  document.querySelector("#analytics-unique").textContent=new Intl.NumberFormat().format(unique);
  document.querySelector("#analytics-repeat").textContent=new Intl.NumberFormat().format(Math.max(0,views-unique));
  document.querySelector("#analytics-frequency").textContent=unique?`${(views/unique).toFixed(1)}×`:"—";
  document.querySelector("#analytics-timezone").textContent="3 regions";
  document.querySelector("#analytics-status").textContent="Live totals · unique visitors approximate unique browsers";
  const groups=[["desktop",desktop,desktop+mobileCount],["mobile",mobileCount,desktop+mobileCount],["english",english,english+other],["other",other,english+other],["americas",americas,americas+emea+apac],["emea",emea,americas+emea+apac],["apac",apac,americas+emea+apac]];
  groups.forEach(([id,value,total])=>{document.querySelector(`#mix-${id}-count`).textContent=value;document.querySelector(`#mix-${id}`).style.width=`${total?value/total*100:0}%`});
}).catch(()=>{
  document.querySelector("#analytics-views").textContent="—";
  document.querySelector("#analytics-status").textContent="Public counter temporarily unavailable";
});
})();
/* Ambient profile network: research, systems, analytics, product, and AI. */
(() => {
  const canvas = document.getElementById("profile-ambient");
  if (!canvas) return;

  const ctx = canvas.getContext("2d");
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const palette = ["#70d6c8", "#df6f72", "#f0a35b", "#9b79b5"];
  const disciplines = ["AI", "RESEARCH", "PRODUCT", "ANALYTICS", "SYSTEMS"];
  let width = 0;
  let height = 0;
  let pixelRatio = 1;
  let scrollOffset = window.scrollY;
  let nodes = [];
  const pointer = { x: -1000, y: -1000, active: false };

  const hash = (index) => {
    const value = Math.sin(index * 9283.31 + 17.17) * 43758.5453;
    return value - Math.floor(value);
  };

  const colorWithAlpha = (hex, alpha) => {
    const number = parseInt(hex.slice(1), 16);
    return `rgba(${number >> 16},${(number >> 8) & 255},${number & 255},${alpha})`;
  };

  const buildNodes = () => {
    const count = width < 700 ? 22 : 34;
    nodes = Array.from({ length: count }, (_, index) => ({
      x: hash(index * 7 + 1) * width,
      y: hash(index * 7 + 2) * height,
      vx: (hash(index * 7 + 3) - 0.5) * 0.18,
      vy: (hash(index * 7 + 4) - 0.5) * 0.15,
      radius: 1.4 + hash(index * 7 + 5) * 2.3,
      depth: 0.15 + hash(index * 7 + 6) * 0.45,
      color: palette[index % palette.length],
      label: index < disciplines.length ? disciplines[index] : ""
    }));
  };

  const resize = () => {
    width = window.innerWidth;
    height = Math.max(300, window.innerHeight - (width < 700 ? 96 : 82));
    pixelRatio = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = Math.round(width * pixelRatio);
    canvas.height = Math.round(height * pixelRatio);
    canvas.style.width = `${width}px`;
    canvas.style.height = `${height}px`;
    ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    buildNodes();
  };

  const displayY = (node) => {
    const shifted = node.y + scrollOffset * node.depth * 0.035;
    return ((shifted % height) + height) % height;
  };

  const render = (time = 0) => {
    ctx.clearRect(0, 0, width, height);

    if (!reduceMotion) {
      nodes.forEach((node) => {
        node.x += node.vx;
        node.y += node.vy;
        if (node.x < -12) node.x = width + 12;
        if (node.x > width + 12) node.x = -12;
        if (node.y < -12) node.y = height + 12;
        if (node.y > height + 12) node.y = -12;

        if (pointer.active) {
          const dy = displayY(node) - pointer.y;
          const dx = node.x - pointer.x;
          const distance = Math.hypot(dx, dy);
          if (distance > 1 && distance < 150) {
            const force = (150 - distance) / 15000;
            node.x += dx * force;
            node.y += dy * force;
          }
        }
      });
    }

    for (let a = 0; a < nodes.length; a += 1) {
      for (let b = a + 1; b < nodes.length; b += 1) {
        const first = nodes[a];
        const second = nodes[b];
        const firstY = displayY(first);
        const secondY = displayY(second);
        const distance = Math.hypot(first.x - second.x, firstY - secondY);
        if (distance < 185) {
          ctx.beginPath();
          ctx.moveTo(first.x, firstY);
          ctx.lineTo(second.x, secondY);
          ctx.strokeStyle = colorWithAlpha(first.color, (1 - distance / 185) * 0.32);
          ctx.lineWidth = 1;
          ctx.stroke();

          if (!reduceMotion && (a + b) % 7 === 0) {
            const progress = (time * 0.000045 + hash(a * 31 + b)) % 1;
            const pulseX = first.x + (second.x - first.x) * progress;
            const pulseY = firstY + (secondY - firstY) * progress;
            ctx.beginPath();
            ctx.arc(pulseX, pulseY, 2.2, 0, Math.PI * 2);
            ctx.fillStyle = colorWithAlpha(first.color, 0.82);
            ctx.fill();
          }
        }
      }
    }

    nodes.forEach((node, index) => {
      const y = displayY(node);
      const pulse = reduceMotion ? 1 : 1 + Math.sin(time * 0.0008 + index) * 0.16;
      ctx.beginPath();
      ctx.arc(node.x, y, node.radius * pulse * 3.2, 0, Math.PI * 2);
      ctx.fillStyle = colorWithAlpha(node.color, 0.065);
      ctx.fill();
      ctx.beginPath();
      ctx.arc(node.x, y, node.radius * pulse, 0, Math.PI * 2);
      ctx.fillStyle = colorWithAlpha(node.color, 0.78);
      ctx.fill();

      if (node.label) {
        ctx.font = "700 10px ui-monospace, SFMono-Regular, Menlo, monospace";
        ctx.letterSpacing = "1px";
        ctx.fillStyle = colorWithAlpha(node.color, 0.72);
        ctx.fillText(node.label, node.x + 10, y - 9);
      }
    });

    if (!reduceMotion) window.requestAnimationFrame(render);
  };

  window.addEventListener("resize", resize, { passive: true });
  window.addEventListener("scroll", () => { scrollOffset = window.scrollY; }, { passive: true });
  window.addEventListener("pointermove", (event) => {
    pointer.x = event.clientX;
    pointer.y = event.clientY - (width < 700 ? 96 : 82);
    pointer.active = true;
  }, { passive: true });
  document.documentElement.addEventListener("pointerleave", () => { pointer.active = false; });

  resize();
  render();
})();
