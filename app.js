/**
 * NoteNest — App de Anotações
 * Autor: [Seu Nome]
 * Tecnologias: HTML, CSS, JavaScript Vanilla
 * Armazenamento: localStorage
 */

// ─── Estado ──────────────────────────────────────────────────
const state = {
  notes: JSON.parse(localStorage.getItem('notenest_notes')) || [],
  activeId: null,
  query: '',
};

// ─── DOM ─────────────────────────────────────────────────────
const notesList    = document.getElementById('notes-list');
const noteCount    = document.getElementById('note-count');
const searchInput  = document.getElementById('search-input');
const editorEmpty  = document.getElementById('editor-empty');
const editorContent= document.getElementById('editor-content');
const titleInput   = document.getElementById('note-title-input');
const noteBody     = document.getElementById('note-body');
const noteColor    = document.getElementById('note-color');
const editorMeta   = document.getElementById('editor-meta');
const wordCount    = document.getElementById('word-count');

// ─── Persistência ────────────────────────────────────────────
function save() {
  localStorage.setItem('notenest_notes', JSON.stringify(state.notes));
}

// ─── CRUD ─────────────────────────────────────────────────────
function createNote() {
  const note = {
    id: crypto.randomUUID(),
    title: 'Nova nota',
    body: '',
    color: 'default',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
  };
  state.notes.unshift(note);
  save();
  renderList();
  openNote(note.id);
  setTimeout(() => titleInput.select(), 50);
}

function deleteNote() {
  if (!state.activeId) return;
  if (!confirm('Excluir esta nota? Esta ação não pode ser desfeita.')) return;
  state.notes = state.notes.filter(n => n.id !== state.activeId);
  state.activeId = null;
  save();
  renderList();
  showEmpty();
}

function updateActiveNote() {
  const note = getActive();
  if (!note) return;
  note.title   = titleInput.value || 'Sem título';
  note.body    = noteBody.innerText;
  note.color   = noteColor.value;
  note.updatedAt = new Date().toISOString();
  save();
  renderList(); // refresh sidebar
  updateWordCount();
  updateMeta(note);
}

// ─── Seleção ─────────────────────────────────────────────────
function openNote(id) {
  state.activeId = id;
  const note = getActive();
  if (!note) return;

  editorEmpty.classList.add('hidden');
  editorContent.classList.remove('hidden');

  titleInput.value      = note.title;
  noteBody.innerText    = note.body;
  noteColor.value       = note.color;

  updateMeta(note);
  updateWordCount();
  applyColorTheme(note.color);
  renderList(); // atualiza active state na sidebar
}

function showEmpty() {
  editorEmpty.classList.remove('hidden');
  editorContent.classList.add('hidden');
  applyColorTheme('default');
}

function getActive() {
  return state.notes.find(n => n.id === state.activeId);
}

// ─── Renderização ─────────────────────────────────────────────
function getFilteredNotes() {
  if (!state.query) return state.notes;
  const q = state.query.toLowerCase();
  return state.notes.filter(n =>
    n.title.toLowerCase().includes(q) ||
    n.body.toLowerCase().includes(q)
  );
}

function renderList() {
  const filtered = getFilteredNotes();
  notesList.innerHTML = '';

  filtered.forEach(note => {
    const div = document.createElement('div');
    div.className = `note-card${note.id === state.activeId ? ' active' : ''}`;
    div.innerHTML = `
      <div class="note-card-title">
        <span class="color-dot dot-${note.color}"></span>
        ${escapeHtml(note.title)}
      </div>
      <div class="note-card-preview">${escapeHtml(note.body.slice(0, 80)) || 'Sem conteúdo'}</div>
      <div class="note-card-date">${formatDate(note.updatedAt)}</div>
    `;
    div.addEventListener('click', () => openNote(note.id));
    notesList.appendChild(div);
  });

  const total = state.notes.length;
  noteCount.textContent = `${total} ${total === 1 ? 'nota' : 'notas'}`;
}

// ─── Utilitários ──────────────────────────────────────────────
function updateMeta(note) {
  editorMeta.textContent = `Atualizado em ${formatDate(note.updatedAt)}`;
}

function updateWordCount() {
  const text = noteBody.innerText.trim();
  const words = text ? text.split(/\s+/).length : 0;
  wordCount.textContent = `${words} ${words === 1 ? 'palavra' : 'palavras'}`;
}

function applyColorTheme(color) {
  document.body.className = color !== 'default' ? `color-${color}` : '';
}

function formatDate(iso) {
  const d = new Date(iso);
  const now = new Date();
  const diff = now - d;
  if (diff < 60000) return 'agora mesmo';
  if (diff < 3600000) return `${Math.floor(diff / 60000)} min atrás`;
  if (diff < 86400000) return `${Math.floor(diff / 3600000)}h atrás`;
  return d.toLocaleDateString('pt-BR', { day: '2-digit', month: 'short' });
}

function escapeHtml(str) {
  const d = document.createElement('div');
  d.textContent = str;
  return d.innerHTML;
}

// ─── Autossave com debounce ───────────────────────────────────
let autoSaveTimer = null;
function scheduleAutoSave() {
  clearTimeout(autoSaveTimer);
  autoSaveTimer = setTimeout(updateActiveNote, 600);
}

// ─── Eventos ─────────────────────────────────────────────────
document.getElementById('btn-new').addEventListener('click', createNote);
document.getElementById('btn-empty-new').addEventListener('click', createNote);
document.getElementById('btn-delete-note').addEventListener('click', deleteNote);

titleInput.addEventListener('input', scheduleAutoSave);
noteBody.addEventListener('input', () => {
  scheduleAutoSave();
  updateWordCount();
});
noteColor.addEventListener('change', () => {
  applyColorTheme(noteColor.value);
  updateActiveNote();
});

searchInput.addEventListener('input', e => {
  state.query = e.target.value.trim();
  renderList();
});

// Atalhos de teclado
document.addEventListener('keydown', e => {
  if ((e.ctrlKey || e.metaKey) && e.key === 'n') {
    e.preventDefault();
    createNote();
  }
});

// ─── Start ───────────────────────────────────────────────────
renderList();
if (state.notes.length > 0) {
  openNote(state.notes[0].id);
}
