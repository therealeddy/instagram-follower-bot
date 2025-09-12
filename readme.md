# 🚀 Instagram Follow Bot

Script em **Node.js + Puppeteer** para automatizar follows no Instagram.

---

## 📦 Instalação

```bash
npm i
```

## 🔗 Arquivos importantes

- **`config/infinite-scroll.js`** → script para colar no console do navegador que faz o scroll automático no modal de seguidores, permitindo carregar rapidamente todos os perfis.
- **`config/get-followers.js`** → script para colar no console do navegador (na página de seguidores do Instagram) e extrair os links dos perfis.
- **`config/links-example.js`** → arquivo de exemplo onde você deve colocar a lista de links dos perfis que deseja seguir.
- **`logs/progress.json`** → arquivo de log gerado após cada execução, mostra onde parou e quantos follows foram feitos.

## ▶️ Como rodar

Crie um arquivo em `config` chamado `links.js` contendo o array de links de perfis do Instagram obtidos a partir dos scripts `infinite-scroll.js` e `get-followers.js`.

Em seguida, inicialmente, execute o projeto com o comando:

```bash
npm start 0 1
```

Isso serve apenas para o script abrir o navegador e você conseguir **logar no Instagram**.  
Depois de logado, rode o comando conforme desejar:

```bash
npm start [startIndex] [maxFollows]
```

- `startIndex` → índice inicial da lista de links
- `maxFollows` → quantidade máxima de follows nesta execução

## ✅ Melhor estratégia

Se você quer **150 seguidores por dia**:

- Divide em **2 blocos de 75** (manhã e noite).
- Ou **3 blocos de 50** (manhã, tarde, noite).

👉 Isso deixa o padrão muito mais humano e diminui **MUITO** a chance de bloqueio.
