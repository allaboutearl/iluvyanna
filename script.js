const DEFAULT = {
  herName:"for yanna",
  yourName:"Your Boyfriend",
  welcomeTitle:"To whom my heart belongs",
  startButtonText:"START ♡",
  sceneText:"Tap along the path to guide Usagi ♡",
  journeyVaultMessage:"I saved some little moments of us here ♡",
  journeyButtonText:"See Our Memories →",
  finalTitle:"One Last Thing... ♡",
  favoritePhoto:"images/favorite.jpg",
  musicUrl:"audio/we_fell_in_love_in_october.mp3",
  memories:[
    {image:"images/couple_moment_1_1790745140334.jpg",message:"A little moment worth keeping.",date:"Exhibit I"},
    {image:"images/couple_moment_2_1790745153430.jpg",message:"One of my favorite memories of us.",date:"Exhibit II"},
    {image:"images/couple_moment_3_1790745165850.jpg",message:"A memory I want to keep close.",date:"Exhibit III"}
  ],
  loveLetter:`happy girlfriend day, darling!

i honestly don't know where to start since we just started and we haven't been together for that long yet. we're still at the very beginning of everything. so i might not have yet many stories to tell or memories to look back. but even with the little time we've had together. im really grateful for having you. it sometimes feel unreal because you'd almost do everything you can just to make me happy. out of all people i could've met, i somehow ended up meeting you, getting close to you, and being someone i can genuinely love and call mine. im really happy that we ended up choosing each other, and i get to be someone who could stay besides you, having a quality time for each other, and hopefully makes your days a little better.

i know we’re still getting to know each other in so many ways. there are probably still a lot of things about me that you don’t know, and the same goes for you. we’ll still have moments where we misunderstand each other, moments where we don’t know what to say, random conversations that make absolutely no sense, and probably a lot of little things we’ll have to learn about each other along the way. but honestly, i like that we’re still at that stage. there’s something nice about knowing that there’s still so much of you for me to discover.

i want to know the little things too. the random thoughts that suddenly appear in your head, the things that make you happy for no reason, the things you get excited about, the things you’re embarrassed to talk about, your favorite little habits, the stories you’ve never gotten around to telling me, and even the parts of yourself that you think are difficult to understand. you don’t have to show me everything all at once. i’m okay with learning you slowly. and i hope you know that you don’t have to be a certain way around me just to be loved. you don’t have to always be happy, always know what to say, or always have the perfect response. you can be quiet. you can be tired. you can have a bad day. you can take your time when you need to process things. i’m not expecting you to be perfect, because i’m definitely not perfect either. i just want us to be able to be ourselves around each other without feeling like we have to constantly perform or prove something.

i also want to say sorry about what happened last night and about how i handled everything. i know our argument started because of the misunderstanding about the pictures you posted sa tiktok mo and i realize na i could’ve communicated my feelings better instead of letting my emotions take over.

hindi naman ako galit sayo for being yourself or for posting what you want. i know na it’s your choice, and i respect that. i just got worried when i saw the revealing pictures, pero i didn’t know how to properly express that without making it seem like i was judging you or telling you what you can and can’t do. i’m not thinking badly of you at all. i just care about you, and sometimes that makes me overthink and become more protective than i should be. i’m sorry if my reaction made you feel controlled or judged, that was never my intention. i should’ve just calmly told you that i was worried instead of turning it into an argument. i’m really sorry about it darling. i’ll try to communicate better next time.

at the end of everything, i just want you to know kung gaano ako ka-grateful na dumating ka sa buhay ko. i know na we’re still starting out, and marami pa tayong kailangan matutunan about each other, pero genuinely happy ako sa kung anong meron tayo ngayon. hindi ko naman kailangan na ma-figure out natin agad lahat. i just want us to keep being honest with each other, mag-usap kapag may mga bagay na mahirap, and enjoy the little moments na meron tayo. whatever happens next, gusto ko na mangyari siya naturally, without pressure or expectations. i’ll keep trying to understand you, appreciate you, and be here for you as long as comfortable ka na nandito ako. again, happy girlfriend day, darling. i’m really happy na nakilala kita, and i hope this is only the beginning of many more memories na mabubuo natin together.`
};

const KEY="gf_day_usagi_html_v1";
let config=loadConfig(), page=1, journeyStep=0, letterDone=false;

function loadConfig(){
  try{return {...DEFAULT,...JSON.parse(localStorage.getItem(KEY)||"{}")}}catch{return {...DEFAULT}}
}
function saveConfig(){localStorage.setItem(KEY,JSON.stringify(config))}
const $=s=>document.querySelector(s);
const esc=s=>String(s??"").replace(/[&<>"']/g,m=>({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"}[m]));
function toast(t){const x=$("#toast");x.textContent=t;x.classList.add("show");setTimeout(()=>x.classList.remove("show"),1800)}
function beep(type="pop"){
  try{
    const C=window.AudioContext||window.webkitAudioContext,c=new C(),o=c.createOscillator(),g=c.createGain();
    o.type="sine";o.frequency.value=type==="sparkle"?660:659;
    o.frequency.exponentialRampToValueAtTime(type==="sparkle"?1046:1046,c.currentTime+.12);
    g.gain.setValueAtTime(.08,c.currentTime);g.gain.exponentialRampToValueAtTime(.001,c.currentTime+.16);
    o.connect(g);g.connect(c.destination);o.start();o.stop(c.currentTime+.17);
  }catch{}
}
function confetti(){
  for(let i=0;i<22;i++){
    const h=document.createElement("span");h.textContent=["💖","✨","🌸","♡"][i%4];h.className="heart-pop";
    h.style.left=(20+Math.random()*60)+"%";h.style.top=(45+Math.random()*15)+"%";document.body.appendChild(h);
    setTimeout(()=>h.remove(),1200);
  }
}
function startMusic(){
  const a=$("#music");a.currentTime=Math.min(10,a.duration||10);a.play().catch(()=>{});
}
function updateChrome(){
  $("#backBtn").disabled=page===1;
  $("#pageCount").textContent=`${page}/4`;
  $("#progress").innerHTML=[1,2,3,4].map(n=>`<button class="${n===page?"current":n<page?"done":"future"}" data-page="${n}">♥</button>`).join("");
  document.querySelectorAll("#progress button").forEach(b=>b.onclick=()=>{go(+b.dataset.page)});
}
function go(n){beep();page=Math.max(1,Math.min(4,n));render();window.scrollTo({top:0,behavior:"smooth"})}
$("#backBtn").onclick=()=>{if(page>1)go(page-1)};

function render(){
  updateChrome();
  [1,2,3,4].forEach(n=>$("#page"+n).classList.toggle("active",n===page));
  if(page===1) render1();
  if(page===2) render2();
  if(page===3) render3();
  if(page===4) render4();
}

function render1(){
  $("#page1").innerHTML=`
    <div class="welcome">
      <div class="kicker">A LITTLE SURPRISE FOR</div>
      <div class="usagi">🐰</div>
      <div class="name">${esc(config.herName)}</div>
      <h1>${esc(config.welcomeTitle)}</h1>
      <p class="subtle">made with a lot of love ♡</p>
      <button class="primary" id="start">${esc(config.startButtonText)}</button>
      <button class="secondary" id="edit1" style="margin-top:12px">Edit ♡</button>
    </div>`;
  $("#start").onclick=()=>{startMusic();confetti();beep("sparkle");go(2)};
  $("#edit1").onclick=openEditor;
}

function render2(){
  $("#page2").innerHTML=`
    <div class="journey">
      <div class="sky">
        <div class="sun">☀️</div>
        <div class="clouds">☁️　🌸　✨　☁️　💖　⭐　☁️　🌷　✨　☁️</div>
        <div class="hills"></div><div class="road"></div>
        <div class="path-dots">${[0,1,2,3,4].map(i=>`<span class="path-dot" data-step="${i}"></span>`).join("")}</div>
        <div class="car" id="car">🚗</div>
      </div>
      <div class="journey-card">
        <div style="font-size:42px">🐰</div>
        <h2>Our Little Journey</h2>
        <p>${esc(config.sceneText)}</p>
        <button class="primary" id="driveBtn">${journeyStep<4?"Guide Usagi ♡":"Open the Museum →"}</button>
      </div>
      <div class="vault" id="vault"><div class="vault-box"><div class="usagi">🐰</div><h2>${esc(config.journeyVaultMessage)}</h2><p>We made it! Let's look at our memories.</p><button class="primary" id="museumBtn">${esc(config.journeyButtonText)}</button></div></div>
    </div>`;
  document.querySelectorAll(".path-dot").forEach(d=>d.onclick=()=>drive(+d.dataset.step));
  $("#driveBtn").onclick=()=>journeyStep<4?drive(journeyStep+1):openVault();
}
function drive(step){
  journeyStep=Math.min(4,step);const car=$("#car");if(!car)return;
  car.classList.add("driving");car.style.left=(12+journeyStep*19)+"%";beep();
  setTimeout(()=>car.classList.remove("driving"),550);
  if(journeyStep>=4) setTimeout(openVault,650);
  else $("#driveBtn").textContent="Keep going ♡";
}
function openVault(){$("#vault")?.classList.add("show");confetti();beep("sparkle");$("#museumBtn").onclick=()=>go(3)}

function render3(){
  const ms=config.memories||[];
  $("#page3").innerHTML=`
    <div class="museum">
      <div class="museum-title"><h2>🏛️ OUR MEMORIES 🏛️</h2><p>The Permanent Gallery of Our Moments</p></div>
      <div class="curator"><span class="mini">🐰</span><span>Welcome! Tap any frame to inspect closely ♡</span></div>
      <div class="exhibits">${ms.map((m,i)=>`
        <article class="exhibit" data-i="${i}">
          <div class="frame"><img src="${esc(m.image)}" alt="Memory ${i+1}" onerror="this.style.display='none'"></div>
          <div class="plaque"><strong>✦ Exhibit ${["I","II","III","IV","V","VI"][i]||i+1} · ${esc(m.date||"Permanent Archive")}</strong><span>"${esc(m.message||"Cherished Moment")}"</span><br><small>Curated with love ♡</small></div>
        </article>`).join("")}</div>
      <button class="primary next-museum" id="nextMuseum">NEXT →</button>
      <button class="secondary next-museum" id="edit3">Edit Photos & Messages</button>
    </div>`;
  document.querySelectorAll(".exhibit").forEach(e=>e.onclick=()=>{beep("sparkle");confetti();toast("A memory worth keeping ♡")});
  $("#nextMuseum").onclick=()=>go(4);
  $("#edit3").onclick=openEditor;
}

function render4(){
  $("#page4").innerHTML=`
    <div class="final">
      <h2>${esc(config.finalTitle)}</h2>
      <div class="hero-bunny">🐰💌</div>
      <div class="letter"><div id="letterText" class="typewriter"></div>
        <div class="letter-tools"><span>Tap the letter to reveal it ♡</span><button class="secondary" id="loveBtn">♥ Send Love</button></div>
      </div>
      <button class="primary restart" id="restart">Read From Beginning ♡</button>
      <button class="secondary restart" id="edit4">Edit Surprise</button>
    </div>`;
  $("#loveBtn").onclick=e=>{e.stopPropagation();confetti();beep("sparkle")};
  $("#restart").onclick=()=>{journeyStep=0;letterDone=false;go(1)};
  $("#edit4").onclick=openEditor;
  typeLetter();
}
function typeLetter(){
  const box=$("#letterText");if(!box)return;
  let i=0;const text=config.loveLetter;
  const tick=()=>{i++;box.textContent=text.slice(0,i);if(i<text.length){let d=28,c=text[i-1];if(/[.!?]/.test(c))d*=2.4;else if(/[,;]/.test(c))d*=1.6;setTimeout(tick,d)}else{letterDone=true;confetti();}};
  box.onclick=()=>{box.textContent=text;letterDone=true};
  tick();
}

function openEditor(){
  $("#modal").classList.remove("hidden");
  $("#modal").innerHTML=`<div class="modal-card">
    <h2>🐰 Customize Your Surprise ♡</h2>
    <div class="field"><label>Welcome Title</label><input id="eTitle" value="${esc(config.welcomeTitle)}"></div>
    <div class="field"><label>Her Name / Dedication</label><input id="eName" value="${esc(config.herName)}"></div>
    <div class="field"><label>Journey Message</label><input id="eJourney" value="${esc(config.sceneText)}"></div>
    <div class="field"><label>Final Title</label><input id="eFinal" value="${esc(config.finalTitle)}"></div>
    <div class="field"><label>Love Letter</label><textarea id="eLetter">${esc(config.loveLetter)}</textarea></div>
    ${config.memories.map((m,i)=>`<div class="field"><label>Memory ${i+1} image path</label><input id="eImg${i}" value="${esc(m.image)}"><label style="margin-top:5px">Memory ${i+1} caption</label><input id="eMsg${i}" value="${esc(m.message||"")}"></div>`).join("")}
    <div class="modal-actions"><button class="secondary" id="cancelEdit">Cancel</button><button class="primary" style="margin:0" id="saveEdit">Save ♡</button></div>
    <button class="secondary" style="width:100%;margin-top:9px" id="resetEdit">Reset Defaults</button>
  </div>`;
  $("#cancelEdit").onclick=()=>$("#modal").classList.add("hidden");
  $("#saveEdit").onclick=()=>{
    config.welcomeTitle=$("#eTitle").value;config.herName=$("#eName").value;config.sceneText=$("#eJourney").value;config.finalTitle=$("#eFinal").value;config.loveLetter=$("#eLetter").value;
    config.memories.forEach((m,i)=>{m.image=$("#eImg"+i).value;m.message=$("#eMsg"+i).value});
    saveConfig();$("#modal").classList.add("hidden");toast("Saved ♡");render();
  };
  $("#resetEdit").onclick=()=>{if(confirm("Reset the surprise to its defaults?")){localStorage.removeItem(KEY);config=loadConfig();$("#modal").classList.add("hidden");render();}};
}

function makeDecor(){
  const d=document.getElementById("background-decorations");
  [["🌸","8%","8%"],["✨","15%","82%"],["💖","28%","10%"],["⭐","38%","86%"],["🌷","52%","6%"],["♡","65%","84%"],["✨","78%","12%"],["🎀","88%","89%"]].forEach((p,i)=>{
    const s=document.createElement("span");s.textContent=p[0];s.className="bg-particle";s.style.top=p[1];s.style.left=p[2];s.style.animationDelay=(i*.3)+"s";s.style.fontSize=(12+i%3*5)+"px";d.appendChild(s)
  });
}
document.addEventListener("click",e=>{
  if(page===4 && !e.target.closest("button") && !e.target.closest(".modal-card")){
    const h=document.createElement("span");h.textContent="💖";h.className="heart-pop";h.style.left=e.clientX+"px";h.style.top=e.clientY+"px";document.body.appendChild(h);setTimeout(()=>h.remove(),1200)
  }
});
makeDecor();render();
