(() => {
  'use strict';

  const fields = {
    base:{black:['红茶','Hồng trà'],green:['绿茶','Trà xanh'],coffee:['咖啡','Cà phê']},
    temp:{cold:['加冰','Có đá'],hot:['热的','Nóng']},
    sugar:{none:['不加糖','Không đường'],less:['少糖','Ít đường'],regular:['正常糖','Đường thường']}
  };
  const keys = Object.keys(fields);
  const capacity = 3;
  const active = state => state.tickets.filter(ticket => ticket.status === 'waiting');
  const queued = state => state.tickets.filter(ticket => ticket.status === 'queued');
  const secondsLeft = (state,ticket) => Math.max(0,ticket.deadline - state.time);
  const cupReady = cup => keys.every(key => Object.hasOwn(fields[key],cup[key]));
  const hasCup = cup => keys.some(key => Object.hasOwn(fields[key],cup[key]));
  const differences = (expected,cup) => keys.filter(key => expected[key] !== cup[key]);

  function pickShift(orders,known,byHan,shuffle) {
    const pack = shuffle(orders);
    const result = [];
    const pick = (pool,test) => {
      const entry = pool.find(item => !result.includes(item) && test(item));
      if (entry) result.push(entry);
    };
    for (const tier of [1,2,3]) {
      const pool = pack.filter(item => item.tier === tier);
      if (tier === 3) {
        pick(pool,item => !!item.revision);
        pick(pool,item => !!item.sequence);
      }
      pick(pool,item => known[byHan.get(item.target)?.id]);
      const size = tier === 3 ? 7 : tier*2;
      while (result.length < size && pool.some(item => !result.includes(item))) pick(pool,() => true);
    }
    return result;
  }

  function admit(state,events) {
    let present = active(state).length;
    for (const ticket of queued(state)) {
      if (present === capacity || (present && ticket.arrival > state.time)) break;
      ticket.status = 'waiting';
      ticket.arrived = state.time;
      ticket.deadline = state.time + ticket.patience;
      events.push({kind:'arrival',ticket});
      present++;
    }
    state.done = present === 0 && queued(state).length === 0;
  }

  function createShift(plan,rush = true) {
    const tickets = plan.map((entry,index) => ({id:entry.id,entry,paper:entry,remaining:[...entry.cups],status:'queued',
      arrival:Math.max(0,index-1) * 9,patience:[40,47,50][entry.tier-1],deadline:0,arrived:0,
      delivered:0,sent:[],mistakes:0,revised:false,helped:false,focusMiss:false,lastWrong:null}));
    const state = {time:0,rush,tickets,cup:{},spare:{},coins:0,combo:0,bestCombo:0,servedCups:0,done:false};
    admit(state,[]);
    return state;
  }

  function elapse(state,delta) {
    const events = [];
    if (state.done || !Number.isFinite(delta) || delta < 0) return events;
    state.time += delta;
    for (const ticket of active(state)) {
      if (state.rush && secondsLeft(state,ticket) === 0) {
        ticket.status = 'left';
        state.combo = 0;
        events.push({kind:'left',ticket});
        continue;
      }
      const revision = ticket.entry.revision;
      if (!ticket.revised && !ticket.delivered && revision && state.time >= ticket.arrived + revision.after) {
        ticket.revised = true;
        ticket.paper = revision;
        ticket.remaining = [...revision.cups];
        ticket.deadline = Math.max(ticket.deadline,state.time + 22);
        ticket.focusMiss = false;
        events.push({kind:'revision',ticket});
      }
    }
    admit(state,events);
    return events;
  }

  function ingredient(state,field,value) {
    if (!state.done && Object.hasOwn(fields,field) && Object.hasOwn(fields[field],value)) state.cup[field] = value;
  }

  function swap(state) {
    [state.cup,state.spare] = [state.spare,state.cup];
  }

  function nearest(cups,cup) {
    return cups.reduce((best,candidate) => differences(candidate,cup).length < differences(best,cup).length ? candidate : best);
  }

  function serve(state,id) {
    const ticket = active(state).find(ticket => ticket.id === id);
    if (!ticket || !cupReady(state.cup)) return null;
    const {remaining,paper} = ticket;
    const matched = remaining.findIndex(expected => differences(expected,state.cup).length === 0);
    const index = paper.sequence && matched > 0 ? -1 : matched;
    if (index < 0) {
      const expected = paper.sequence ? remaining[0] : nearest(remaining,state.cup);
      const kind = paper.sequence && matched > 0 ? 'sequence' : 'recipe';
      const mismatch = differences(expected,state.cup);
      const focusMiss = !ticket.focusMiss && (paper.axis === kind || mismatch.includes(paper.axis));
      ticket.focusMiss ||= focusMiss;
      ticket.mistakes++;
      if (state.rush) ticket.deadline -= 4;
      state.combo = 0;
      const event = {ok:false,ticket,expected,cup:{...state.cup},kind,mismatch,paper,focusMiss};
      const {cup} = event;
      ticket.lastWrong = {expected,cup,kind,mismatch,paper};
      return event;
    }

    const [delivered] = remaining.splice(index,1);
    ticket.sent.push(delivered);
    ticket.delivered++;
    state.cup = {};
    state.servedCups++;
    const completed = remaining.length === 0;
    const events = [];
    const fresh = state.rush && secondsLeft(state,ticket) > 20 ? 2 : 0;
    state.combo++;
    state.bestCombo = Math.max(state.bestCombo,state.combo);
    const coins = 8 + fresh + (ticket.helped ? 0 : Math.min(state.combo-1,4));
    state.coins += coins;
    if (completed) {
      ticket.status = 'served';
      admit(state,events);
    }
    return {ok:true,ticket,completed,coins,events};
  }

  window.HAN_NIGHT_TEA = {fields,keys,active,queued,secondsLeft,cupReady,hasCup,pickShift,createShift,elapse,ingredient,swap,serve};
})();
