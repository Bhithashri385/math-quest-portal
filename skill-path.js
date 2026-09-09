const SkillPath = (() => {
  let curriculum = null;
  let currentTopic = null;
  let currentSkill = null;
  let score = 0;
  let attempts = 0;

  async function init() {
    try {
      const response = await fetch('data/curriculum/skill-path.json');
      curriculum = await response.json();
    } catch (err) {
      console.warn('Skill Path curriculum unavailable', err);
    }
  }

  function show() {
    if (!curriculum) return alert('Skill Path is still loading. Please try again.');
    document.querySelectorAll('.page').forEach(p => p.classList.remove('active'));
    document.getElementById('skill-path-page').classList.add('active');
    renderTopics();
  }

  function renderTopics() {
    const root = document.getElementById('skill-path-root');
    root.innerHTML = `<div class="skill-hero"><div><span class="skill-kicker">LEARN • PRACTICE • MASTER</span><h1>Choose your Math Quest</h1><p>Build speed and understanding one skill at a time.</p></div></div><div class="skill-topic-grid">${curriculum.topics.map((t,i)=>`<button class="skill-topic-card" onclick="SkillPath.openTopic('${t.id}')"><span class="skill-topic-icon">${t.icon}</span><span><b>${i+1}. ${t.title}</b><small>${t.description}</small><em>${t.skills.length} skills</em></span><strong>→</strong></button>`).join('')}</div>`;
  }

  function openTopic(id) {
    currentTopic = curriculum.topics.find(t => t.id === id);
    const root = document.getElementById('skill-path-root');
    root.innerHTML = `<button class="skill-back" onclick="SkillPath.renderTopics()">← All topics</button><div class="skill-topic-heading"><span>${currentTopic.icon}</span><div><h1>${currentTopic.title}</h1><p>${currentTopic.description}</p></div></div><div class="skill-list">${currentTopic.skills.map((s,i)=>`<button onclick="SkillPath.startSkill(${i})"><span class="skill-number">${i+1}</span><span><b>${s}</b><small>Practice with fresh questions every time</small></span><strong>Start →</strong></button>`).join('')}</div>`;
  }

  function startSkill(index) {
    currentSkill = { name: currentTopic.skills[index], index };
    score = 0; attempts = 0;
    renderQuestion();
  }

  function rand(min,max){ return Math.floor(Math.random()*(max-min+1))+min; }
  function shuffle(a){ return a.sort(()=>Math.random()-.5); }

  function makeQuestion() {
    const topic = currentTopic.id;
    const skill = currentSkill.name.toLowerCase();
    let a,b,answer,text;
    if (topic === 'multiplication') {
      const match = skill.match(/table (\d+)/); const table = match ? Number(match[1]) : rand(2,9);
      b=rand(0,12); answer=table*b; text=`${table} × ${b} = ?`;
    } else if (topic === 'number-properties' && skill.includes('odd')) {
      a=rand(1,999); answer=a%2===0?'Even':'Odd'; text=`Is ${a} odd or even?`;
    } else if (topic === 'number-properties' && skill.includes('round')) {
      const base=skill.includes('1000')?1000:skill.includes('100')?100:10; a=rand(base,base*9); answer=Math.round(a/base)*base; text=`Round ${a} to the nearest ${base}.`;
    } else if (topic === 'subtraction-120' || (topic==='add-sub-10' && skill.includes('subtract')) || (topic==='add-sub-20' && skill.includes('subtract'))) {
      const max=topic==='subtraction-120'?120:topic==='add-sub-20'?20:10; a=rand(2,max); b=rand(1,Math.min(10,a)); answer=a-b; text=`${a} − ${b} = ?`;
    } else {
      const max=topic==='addition-120'?120:topic==='add-sub-20'?20:10; a=rand(0,max); b=rand(0,Math.min(10,max-a)); answer=a+b; text=`${a} + ${b} = ?`;
    }
    const options = typeof answer==='number' ? shuffle([...new Set([answer, answer+1, Math.max(0,answer-1), answer+2])]).slice(0,4) : ['Odd','Even'];
    return {text,answer,options};
  }

  function renderQuestion() {
    const q=makeQuestion(); window.__skillQuestion=q;
    const root=document.getElementById('skill-path-root');
    root.innerHTML=`<button class="skill-back" onclick="SkillPath.openTopic('${currentTopic.id}')">← ${currentTopic.title}</button><div class="practice-card"><span class="skill-kicker">${currentSkill.name}</span><div class="practice-stats"><span>Score <b>${score}</b></span><span>Questions <b>${attempts}</b></span></div><div class="practice-question">${q.text}</div><div class="practice-options">${q.options.map(o=>`<button onclick='SkillPath.answer(${JSON.stringify(o)})'>${o}</button>`).join('')}</div><p id="skill-feedback" class="skill-feedback"></p></div>`;
  }

  function answer(value) {
    attempts++;
    const correct=String(value)===String(window.__skillQuestion.answer);
    if(correct) score++;
    const feedback=document.getElementById('skill-feedback');
    feedback.textContent=correct?'✓ Great job!':'Try again — the answer is '+window.__skillQuestion.answer;
    feedback.className='skill-feedback '+(correct?'good':'retry');
    setTimeout(renderQuestion,700);
  }

  return {init,show,renderTopics,openTopic,startSkill,answer};
})();
document.addEventListener('DOMContentLoaded', SkillPath.init);
