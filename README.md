# 📝 NoteNest

> **App de anotações minimalista** com editor rico, temas de cor e busca instantânea — 100% no navegador, sem backend.

![Status](https://img.shields.io/badge/status-live-brightgreen?style=flat-square)
![HTML](https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white)
![CSS](https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white)
![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black)

---

## 📸 Preview

```
╭──────────────┬──────────────────────────────────────────╮
│  N NoteNest  │  Reunião de planejamento                  │
│  [+ Nova]    │  Atualizado há 2 min                      │
│  🔍 buscar   │  ──────────────────────────────────────   │
│  ──────────  │  Pauta da reunião:                        │
│  ● Reunião   │  • Revisar metas do Q3                    │
│    2 min     │  • Distribuir responsabilidades           │
│  ● Ideias    │  • Definir próximos sprints               │
│    1h atrás  │                                           │
│  2 notas     │                              18 palavras  │
╰──────────────┴──────────────────────────────────────────╯
```

## ✨ Funcionalidades

- 📄 Editor de texto completo e editável diretamente
- 🎨 **4 temas de cor** para organizar visualmente suas notas
- 🔍 **Busca em tempo real** por título e conteúdo
- 💾 **Autossave automático** (salva 600ms após parar de digitar)
- 🕐 Timestamps relativos ("2 min atrás", "1h atrás")
- 🔢 Contador de palavras em tempo real
- ⌨️ Atalho `Ctrl+N` / `Cmd+N` para nova nota
- 📱 Interface responsiva

---

## 🚀 Como usar

```bash
git clone https://github.com/seu-usuario/notenest.git
cd notenest
open index.html
```

Ou com servidor local:
```bash
npx serve .
# acesse http://localhost:3000
```

---

## 📁 Estrutura

```
notenest/
├── index.html   # Layout com sidebar e editor
├── style.css    # Design editorial com CSS Variables
├── app.js       # Lógica de notas e autossave
└── README.md    # Documentação
```

---

## 🧠 Arquitetura

```javascript
// Modelo de dados de uma nota
{
  id:        "uuid",           // Identificador único
  title:     "Título",         // Título editável
  body:      "Conteúdo...",    // Corpo da nota
  color:     "yellow",         // Tema de cor
  createdAt: "ISO 8601",       // Data de criação
  updatedAt: "ISO 8601",       // Data da última edição
}
```

**Autossave com debounce:**
```javascript
// Evita salvar em cada tecla digitada
function scheduleAutoSave() {
  clearTimeout(timer);
  timer = setTimeout(updateActiveNote, 600); // 600ms de delay
}
```

---

## 💡 Conceitos aplicados

| Conceito | Implementação |
|----------|---------------|
| Autossave | `debounce` com `setTimeout` |
| Editor | `contenteditable` nativo |
| Busca | `.filter()` com regex case-insensitive |
| Temas | CSS classes dinâmicas + CSS Variables |
| Datas | `Intl.DateTimeFormat` + diff relativo |

---

## 🗺️ Roadmap

- [ ] Exportar nota como `.txt` ou `.md`
- [ ] Tags e organização por pastas
- [ ] Formatação rica (negrito, itálico, listas)
- [ ] Sincronização com nuvem (Firebase)
- [ ] Modo escuro

---

## 📄 Licença

MIT © [Seu Nome]
