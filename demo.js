// Demo glue for the GitHub Elements playground. Components are vendored in /vendor.
// Server-backed components talk to a fake endpoint: fetch() calls to mock/api/* are answered here.
const realFetch = window.fetch.bind(window)
const ROBOTS = ['Hubot','Bender','BB-8','R2-D2','C-3PO','WALL-E','EVE','Baymax','Data','Marvin','Johnny 5','Optimus Prime','Robby','K-2SO','Astro Boy','Rosie']
const TAKEN = ['hubot','octocat','admin','looscid']
const esc = s => s.replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]))
const html = (body, status = 200) => new Response(body, {status, headers: {'Content-Type': 'text/html; charset=utf-8'}})
const wait = ms => new Promise(r => setTimeout(r, ms))
function md(src) {
  let t = esc(src)
  t = t.replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>').replace(/(^|[^*])\*([^*]+?)\*/g, '$1<em>$2</em>').replace(/`([^`]+)`/g, '<code>$1</code>')
  return t.split(/\n{2,}/).map(p => '<p>' + p.replace(/\n/g, '<br>') + '</p>').join('')
}
window.fetch = async function (input, init = {}) {
  const req = input instanceof Request ? input : null
  const url = new URL(req ? req.url : String(input), location.href)
  const path = url.pathname.replace(/^.*\/mock\/api\//, '')
  if (!/\/mock\/api\//.test(url.pathname)) return realFetch(input, init)
  await wait(150)
  if (path === 'check-username') {
    const body = init.body || (req && await req.formData())
    const v = String((body && body.get && body.get('value')) || '').trim().toLowerCase()
    if (TAKEN.includes(v)) return html(`Sorry, ${esc(v)} is taken.`, 422)
    if (!/^[a-z0-9_-]{2,20}$/.test(v)) return html('Use 2 to 20 letters, numbers, dashes or underscores.', 422)
    return html(`Nice, ${esc(v)} is free.`)
  }
  if (path === 'robots') {
    const q = (url.searchParams.get('q') || '').toLowerCase()
    const hits = ROBOTS.filter(r => r.toLowerCase().includes(q)).slice(0, 8)
    return html(hits.map(r => `<li role="option">${esc(r)}</li>`).join('') ||
      '<li role="presentation" aria-hidden="true" data-no-result-found="true">No robots found</li>')
  }
  if (path === 'preview') return html(md(url.searchParams.get('body') || '') || '<p>Nothing yet.</p>')
  return html('Not found', 404)
}

const status = document.getElementById('status')
let clearT
function say(msg) {
  // The one status region on the page. Clear first so the same message twice is re-read.
  status.textContent = ''
  clearTimeout(clearT)
  setTimeout(() => { status.textContent = msg }, 60)
  clearT = setTimeout(() => { status.textContent = '' }, 6000)
}
window.__say = say

// Load components after the mock is in place.
const names = ['auto-check','auto-complete','clipboard-copy','details-dialog','details-menu','file-attachment','filter-input','g-emoji','image-crop','include-fragment','markdown-toolbar','relative-time','remote-input','tab-container','task-lists','text-expander','typing-effect']
window.__loaded = {}
await Promise.all(names.map(n => import(`./vendor/${n}-element.js`).then(() => { window.__loaded[n] = true }, e => { window.__loaded[n] = String(e); console.error(n, e) })))

// auto-check
const acInput = document.getElementById('ac-input'), acMsg = document.getElementById('ac-msg')
acInput.addEventListener('auto-check-start', () => { acMsg.textContent = 'Checking…' })
acInput.addEventListener('auto-check-success', async e => { const t = await e.detail.response.text(); acMsg.textContent = t; say(t) })
acInput.addEventListener('auto-check-error', async e => { const t = await e.detail.response.text(); e.detail.setValidity(t); acMsg.textContent = t; say(t) })

// auto-complete
const ac = document.querySelector('auto-complete'), acpMsg = document.getElementById('acp-msg')
ac.addEventListener('auto-complete-change', () => { acpMsg.textContent = ac.value ? `Picked: ${ac.value}` : 'Nothing picked yet.' })
ac.addEventListener('loadend', () => {
  const n = document.querySelectorAll('#robots-popup [role=option]').length
  if (document.getElementById('robots-input').value) say(n ? `${n} result${n === 1 ? '' : 's'}` : 'No robots found')
})

// clipboard-copy
document.addEventListener('clipboard-copy', () => say('Copied'))

// details-menu
document.querySelector('details-menu').addEventListener('details-menu-selected', e => {
  for (const b of e.currentTarget.querySelectorAll('[role=menuitemradio]')) b.setAttribute('aria-checked', String(b === e.detail.relatedTarget))
  say(`Favorite robot: ${e.detail.relatedTarget.textContent}`)
})

// file-attachment
document.querySelector('file-attachment').addEventListener('file-attachment-accepted', e => {
  const list = document.getElementById('file-list')
  const files = e.detail.attachments.map(a => a.file)
  list.innerHTML = files.map(f => `<li>${esc(f.name)} (${Math.max(1, Math.round(f.size / 1024))} KB)</li>`).join('') || '<li>No files yet.</li>'
  say(`${files.length} file${files.length === 1 ? '' : 's'} added`)
})

// filter-input
document.querySelector('filter-input').addEventListener('filter-input-updated', e => {
  const {count, total} = e.detail
  say(count ? `${count} of ${total} robots shown` : 'No robots match')
})

// g-emoji tone
const toneNames = ['default','light','medium light','medium','medium dark','dark']
for (const b of document.querySelectorAll('[data-tone]')) b.addEventListener('click', () => {
  document.getElementById('wave').tone = b.dataset.tone
  say(`Wave set to ${toneNames[b.dataset.tone]} skin tone`)
})

// image-crop
let cropT
document.getElementById('cropper').addEventListener('image-crop-change', e => {
  const {x, y, width, height} = e.detail
  const msg = `Crop: x ${Math.round(x)}, y ${Math.round(y)}, ${Math.round(width)} by ${Math.round(height)}`
  document.getElementById('crop-msg').textContent = msg
  clearTimeout(cropT); cropT = setTimeout(() => say(msg), 700) // one announcement after you stop moving
})

// include-fragment
document.getElementById('frag-btn').addEventListener('click', () => {
  const slot = document.getElementById('frag-slot')
  slot.innerHTML = '<include-fragment src="mock/fragment.html"><p>Loading…</p></include-fragment>'
  const f = slot.querySelector('include-fragment')
  f.addEventListener('include-fragment-replaced', () => say('Fragment loaded'))
  f.addEventListener('error', () => say('The fragment failed to load'))
})

// relative-time: point each one at a time relative to now
const now = Date.now(), min = 60e3
const rt = {'rt-5m': -5 * min, 'rt-3h': -180 * min, 'rt-2d': -2 * 1440 * min, 'rt-in': 10 * min, 'rt-dur': -95 * min}
for (const [id, d] of Object.entries(rt)) {
  const el = document.getElementById(id), when = new Date(now + d)
  el.textContent = when.toLocaleString()
  el.setAttribute('datetime', when.toISOString())
}

// task-lists
document.querySelector('task-lists').addEventListener('task-lists-check', e => {
  const li = document.querySelectorAll('.task-list-item')[e.detail.position[1]]
  say(`${li ? li.textContent.trim() : 'Item'} ${e.detail.checked ? 'checked' : 'unchecked'}`)
})

// text-expander
const PEOPLE = [['jack','Jack'],['jane','Jane'],['jay','Jay'],['looscid','Looscid'],['tab','Tab']]
const EMOJI = [['🚀','rocket'],['🤖','robot'],['💜','purple_heart'],['🔥','fire'],['👋','wave'],['🎉','tada'],['🙂','slightly_smiling_face']]
const te = document.querySelector('text-expander')
te.addEventListener('text-expander-change', e => {
  const {key, provide, text} = e.detail
  const ul = document.createElement('ul')
  ul.className = 'suggester'
  ul.setAttribute('role', 'listbox')
  ul.setAttribute('aria-label', key === '@' ? 'People' : 'Emoji')
  const q = text.toLowerCase()
  const items = key === '@'
    ? PEOPLE.filter(([h]) => h.startsWith(q)).map(([h, n]) => `<li role="option" id="te-${h}" data-value="@${h}">${n} (@${h})</li>`)
    : EMOJI.filter(([, n]) => n.includes(q)).map(([c, n]) => `<li role="option" id="te-${n}" data-value="${c}">${c} :${n}:</li>`)
  ul.innerHTML = items.slice(0, 6).join('')
  provide(Promise.resolve({matched: items.length > 0, fragment: ul}))
})
te.addEventListener('text-expander-value', e => { e.detail.value = e.detail.item.getAttribute('data-value') })
te.addEventListener('text-expander-committed', () => say('Inserted'))

// typing-effect replay
document.getElementById('type-again').addEventListener('click', () => {
  const old = document.getElementById('typer'), fresh = old.cloneNode(false)
  fresh.innerHTML = '<span data-target="typing-effect.content"></span><span data-target="typing-effect.cursor" aria-hidden="true">|</span>'
  old.replaceWith(fresh)
})

document.documentElement.dataset.ready = 'true'
