/* ════════════════════════════════════════════════════════════════════
   SOUL GAME — ANALYSIS GENERATOR (4 TABS, LAZY LOAD)
   Initial API call generates only the Map tab. Other tabs show a Generate
   button; each triggers its own API call when the user requests it.
   ════════════════════════════════════════════════════════════════════ */

/* ── FIXED SHELL: head + style + tab-bar + script. {{VIEWS}} = generated content ── */
const REPORT_STYLE = `
:root {
    --bg: #F7F6F3;
    --card: #FFFFFF;
    --text: #1A1A1A;
    --text2: #3D3D3D;
    --text3: #6B6B6B;
    --text-muted: #9A9A9A;
    --border: #E8E6E1;
    --border-light: #F0EFEB;
    --accent: #C9A84C;
    --accent-soft: rgba(201,168,76,0.08);
    --accent-border: rgba(201,168,76,0.25);
    --red-bg: #FEF2F2;
    --red-border: #FECACA;
    --red-text: #991B1B;
    --red-muted: #B45309;
    --green-bg: #F0FDF4;
    --green-border: #BBF7D0;
    --green-text: #065F46;
    --green-muted: #047857;
    --amber-bg: #FFFBEB;
    --amber-border: #FDE68A;
    --amber-text: #92400E;
    --purple-bg: #FAF5FF;
    --purple-border: #E9D5FF;
    --purple-text: #6B21A8;
    --accent-laringeo: #3B82F6;
    --accent-cardiaco: #10B981;
    --accent-plexo: #F59E0B;
    --accent-frontal: #8B5CF6;
}
* { margin: 0; padding: 0; box-sizing: border-box; }
body {
    font-family: 'DM Sans', sans-serif;
    background: var(--bg);
    color: var(--text);
    line-height: 1.6;
    -webkit-font-smoothing: antialiased;
}

/* ── TAB BAR ── */
.tab-bar {
    position: sticky;
    top: 0;
    z-index: 100;
    background: rgba(247,246,243,0.92);
    backdrop-filter: blur(12px);
    -webkit-backdrop-filter: blur(12px);
    border-bottom: 1px solid var(--border);
    padding: 0 20px;
    display: flex;
    justify-content: center;
    gap: 4px;
}
.tab-btn {
    font-family: 'DM Sans', sans-serif;
    font-size: 13px;
    font-weight: 600;
    padding: 14px 24px;
    border: none;
    background: none;
    color: var(--text-muted);
    cursor: pointer;
    position: relative;
    transition: color 0.2s;
}
.tab-btn:hover { color: var(--text3); }
.tab-btn.active { color: var(--text); }
.tab-btn.active::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 16px;
    right: 16px;
    height: 2px;
    background: var(--accent);
    border-radius: 2px 2px 0 0;
}
.tab-btn .tab-badge {
    display: inline-block;
    font-size: 9px;
    font-weight: 700;
    letter-spacing: 0.04em;
    text-transform: uppercase;
    padding: 1px 6px;
    border-radius: 4px;
    margin-left: 6px;
    vertical-align: middle;
}
.tab-badge-leve { background: var(--green-bg); color: var(--green-text); border: 1px solid var(--green-border); }
.tab-badge-completo { background: var(--purple-bg); color: var(--purple-text); border: 1px solid var(--purple-border); }
.tab-badge-lembrete { background: var(--amber-bg); color: var(--amber-text); border: 1px solid var(--amber-border); }
.tab-badge-acoes { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }

/* VIEW 4: AÇÕES */
.acoes-page { max-width: 680px; margin: 0 auto; padding: 40px 20px 80px; }
.acoes-header { text-align: center; margin-bottom: 36px; animation: fadeUp 0.5s ease both; }
.acoes-header-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
.acoes-header h1 { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 6px; }
.acoes-header-sub { font-size: 13px; color: var(--text-muted); max-width: 440px; margin: 0 auto; }
.acao-principal { background: var(--text); color: #F5F5F0; border-radius: 20px; padding: 28px; margin-bottom: 10px; animation: fadeUp 0.5s ease 0.05s both; }
.acao-principal-label { font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 12px; }
.acao-principal-titulo { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; color: #F5F5F0; line-height: 1.3; margin-bottom: 10px; }
.acao-principal-porque { font-size: 14px; color: rgba(255,255,255,0.7); line-height: 1.6; }
.acao-principal-porque strong { color: rgba(255,255,255,0.9); }
.ferramenta-amostra { background: var(--card); border: 1px solid var(--border); border-radius: 16px; margin-bottom: 32px; overflow: hidden; animation: fadeUp 0.5s ease 0.08s both; }
.ferramenta-amostra-header { padding: 14px 20px; background: var(--border-light); display: flex; align-items: center; gap: 10px; }
.ferramenta-amostra-badge { font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 3px 10px; border-radius: 6px; background: var(--purple-bg); color: var(--purple-text); border: 1px solid var(--purple-border); }
.ferramenta-amostra-nome { font-size: 13px; font-weight: 700; color: var(--text); }
.ferramenta-amostra-body { padding: 18px 20px; }
.ferramenta-amostra-script { font-size: 14px; color: var(--text2); line-height: 1.65; font-style: italic; background: var(--accent-soft); border-radius: 10px; padding: 16px 18px; border-left: 3px solid var(--accent); }
.ferramenta-amostra-script strong { color: var(--text); font-style: normal; }
.ferramenta-amostra-nota { font-size: 12px; color: var(--text-muted); margin-top: 12px; line-height: 1.5; display: flex; align-items: flex-start; gap: 6px; }
.ferramenta-amostra-nota-icon { flex-shrink: 0; margin-top: 1px; }
.timing-section { margin-bottom: 28px; }
.timing-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.timing-badge { display: inline-flex; align-items: center; gap: 5px; font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 5px 12px; border-radius: 8px; }
.timing-agora { background: var(--red-bg); color: var(--red-text); border: 1px solid var(--red-border); }
.timing-semana { background: var(--amber-bg); color: var(--amber-text); border: 1px solid var(--amber-border); }
.timing-continuo { background: #EFF6FF; color: #1E40AF; border: 1px solid #BFDBFE; }
.timing-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: var(--text); }
.acao-list { display: flex; flex-direction: column; gap: 10px; }
.acao-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 18px 22px; transition: border-color 0.2s; }
.acao-card:hover { border-color: var(--accent-border); }
.acao-card-top { display: flex; gap: 14px; align-items: flex-start; }
.acao-num { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 13px; font-weight: 700; color: #fff; flex-shrink: 0; margin-top: 1px; }
.acao-content { flex: 1; }
.acao-titulo { font-size: 15px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.acao-desc { font-size: 13px; color: var(--text3); line-height: 1.55; margin-bottom: 8px; }
.acao-tags { display: flex; gap: 6px; flex-wrap: wrap; }
.acao-tag { font-size: 9px; font-weight: 700; letter-spacing: 0.04em; text-transform: uppercase; padding: 2px 8px; border-radius: 6px; }
.acao-tag-chakra { background: var(--border-light); color: var(--text-muted); }
.acao-tag-tipo-prescritivo { background: var(--green-bg); color: var(--green-text); }
.acao-tag-tipo-capacidade { background: var(--purple-bg); color: var(--purple-text); }
.acao-ferramenta-hint { margin-top: 12px; padding-top: 12px; border-top: 1px solid var(--border-light); display: flex; align-items: flex-start; gap: 8px; }
.acao-ferramenta-hint-icon { font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.acao-ferramenta-hint-text { font-size: 12px; color: var(--text-muted); line-height: 1.5; }
.acao-ferramenta-hint-text strong { color: var(--text3); }
.travar-box { background: var(--amber-bg); border: 1px solid var(--amber-border); border-radius: 16px; padding: 20px 22px; margin-bottom: 28px; }
.travar-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--amber-text); margin-bottom: 10px; }
.travar-item { display: flex; gap: 10px; margin-bottom: 10px; align-items: flex-start; }
.travar-item:last-child { margin-bottom: 0; }
.travar-sinal { font-size: 13px; font-weight: 700; color: var(--amber-text); flex-shrink: 0; margin-top: 1px; }
.travar-text { font-size: 13px; color: var(--text2); line-height: 1.55; }
.resultado-box { background: var(--green-bg); border: 1px solid var(--green-border); border-radius: 16px; padding: 22px; }
.resultado-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--green-text); margin-bottom: 12px; }
.resultado-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 480px) { .resultado-grid { grid-template-columns: 1fr; } }
.resultado-item { display: flex; gap: 8px; align-items: flex-start; }
.resultado-check { color: var(--green-muted); font-size: 14px; flex-shrink: 0; margin-top: 1px; }
.resultado-text { font-size: 13px; color: var(--green-text); line-height: 1.5; }
.tab-view { display: none; }
.tab-view.active { display: block; }

/* VIEW 1: MAPA */
.page { max-width: 680px; margin: 0 auto; padding: 40px 20px 80px; }
.m-header { text-align: center; margin-bottom: 36px; animation: fadeUp 0.5s ease both; }
.m-header-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
.m-header h1 { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 6px; }
.m-header-sub { font-size: 13px; color: var(--text-muted); }
.situacao { background: var(--text); color: #F5F5F0; border-radius: 16px; padding: 22px 26px; margin-bottom: 28px; animation: fadeUp 0.5s ease 0.05s both; }
.situacao-label { font-size: 9px; font-weight: 700; letter-spacing: 0.15em; text-transform: uppercase; color: rgba(255,255,255,0.4); margin-bottom: 8px; }
.situacao-text { font-size: 14px; line-height: 1.7; color: rgba(255,255,255,0.82); font-style: italic; }
.section { margin-bottom: 24px; }
.section-header { display: flex; align-items: center; gap: 10px; margin-bottom: 14px; }
.section-icon { width: 32px; height: 32px; border-radius: 10px; display: flex; align-items: center; justify-content: center; font-size: 15px; flex-shrink: 0; }
.section-title { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: var(--text); }
.nec-raiz-icon { background: #FFF7ED; border: 1px solid #FDBA74; }
.raiz-strip { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; }
.raiz-item { display: flex; align-items: center; gap: 14px; padding: 16px 20px; border-bottom: 1px solid var(--border-light); transition: background 0.2s; }
.raiz-item:last-child { border-bottom: none; }
.raiz-item:hover { background: var(--border-light); }
.raiz-dot { width: 10px; height: 10px; border-radius: 50%; flex-shrink: 0; position: relative; }
.raiz-dot::after { content: ''; position: absolute; inset: -4px; border-radius: 50%; border: 1.5px solid; opacity: 0.2; }
.raiz-chakra { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); width: 80px; flex-shrink: 0; }
.raiz-need { font-family: 'Fraunces', serif; font-size: 18px; font-weight: 600; color: var(--text); flex: 1; }
.estrat-atuais-icon { background: var(--red-bg); border: 1px solid var(--red-border); }
.estrat-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 480px) { .estrat-grid { grid-template-columns: 1fr; } }
.estrat-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; transition: border-color 0.2s; }
.estrat-card:hover { border-color: var(--red-border); }
.estrat-chakra { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
.estrat-chakra-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 5px; vertical-align: middle; }
.estrat-text { font-size: 14px; color: var(--text2); line-height: 1.55; font-weight: 500; }
.estrat-tag { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; padding: 2px 8px; border-radius: 6px; margin-top: 10px; }
.tag-bloqueado { background: #FEF3C7; color: #92400E; }
.tag-excessivo { background: #FEE2E2; color: #991B1B; }
.nec-icon { background: var(--green-bg); border: 1px solid var(--green-border); }
.nec-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 480px) { .nec-grid { grid-template-columns: 1fr; } }
.nec-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 20px; transition: border-color 0.2s; }
.nec-card:hover { border-color: var(--green-border); }
.nec-chakra { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 6px; }
.nec-chakra-dot { display: inline-block; width: 7px; height: 7px; border-radius: 50%; margin-right: 5px; vertical-align: middle; }
.nec-text { font-size: 14px; color: var(--text2); line-height: 1.55; font-weight: 500; }
.res-icon { background: #EFF6FF; border: 1px solid #BFDBFE; }
.res-container { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
.res-cols { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 480px) { .res-cols { grid-template-columns: 1fr; } }
.res-col { padding: 20px 22px; }
.res-col-want { border-right: 1px solid var(--border-light); }
@media (max-width: 480px) { .res-col-want { border-right: none; border-bottom: 1px solid var(--border-light); } }
.res-col-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 14px; display: flex; align-items: center; gap: 6px; }
.res-col-want .res-col-label { color: var(--green-text); }
.res-col-have .res-col-label { color: var(--red-text); }
.res-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 12px; }
.res-item:last-child { margin-bottom: 0; }
.res-bullet { width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
.res-col-want .res-bullet { background: var(--green-muted); }
.res-col-have .res-bullet { background: var(--red-text); opacity: 0.5; }
.res-item-text { font-size: 13.5px; line-height: 1.55; color: var(--text2); }
.res-gap-bar { display: flex; align-items: center; gap: 12px; padding: 14px 22px; background: var(--border-light); }
.res-gap-label { font-size: 11px; font-weight: 600; color: var(--text-muted); white-space: nowrap; }
.res-gap-track { flex: 1; height: 6px; background: var(--red-bg); border-radius: 99px; overflow: hidden; }
.res-gap-fill { height: 100%; border-radius: 99px; background: linear-gradient(90deg, var(--red-border), var(--amber-border), var(--green-border)); }
.cap-icon { background: #FDF4FF; border: 1px solid #F0ABFC; }
.cap-list { display: flex; flex-direction: column; gap: 8px; }
.cap-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 16px 20px; display: flex; align-items: baseline; gap: 12px; transition: border-color 0.2s; }
.cap-item:hover { border-color: var(--accent-border); }
.cap-name { font-size: 14px; font-weight: 700; color: var(--text); white-space: nowrap; flex-shrink: 0; }
.cap-dash { color: var(--border); flex-shrink: 0; }
.cap-desc { font-size: 13px; color: var(--text3); line-height: 1.5; font-style: italic; }
.cap-chakra-tag { display: inline-flex; align-items: center; gap: 4px; font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; color: var(--text-muted); background: var(--border-light); padding: 3px 8px; border-radius: 6px; margin-left: auto; flex-shrink: 0; white-space: nowrap; }
.cap-chakra-tag-dot { width: 5px; height: 5px; border-radius: 50%; }
.lic-icon { background: var(--purple-bg); border: 1px solid var(--purple-border); }
.lic-list { display: flex; flex-direction: column; gap: 10px; }
.lic-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 22px; display: flex; gap: 14px; align-items: flex-start; transition: border-color 0.2s; }
.lic-item:hover { border-color: var(--accent-border); }
.lic-num { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 700; color: var(--accent); line-height: 1; flex-shrink: 0; padding-top: 2px; }
.lic-title { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.lic-desc { font-size: 13px; color: var(--text3); line-height: 1.6; }
.rec-icon { background: var(--green-bg); border: 1px solid var(--green-border); }
.rec-grid { display: grid; grid-template-columns: repeat(3, 1fr); gap: 10px; }
@media (max-width: 520px) { .rec-grid { grid-template-columns: 1fr 1fr; } }
.rec-card { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 18px 16px; text-align: center; transition: all 0.25s; }
.rec-card:hover { border-color: var(--green-border); background: var(--green-bg); }
.rec-emoji { font-size: 22px; margin-bottom: 8px; }
.rec-name { font-size: 13px; font-weight: 700; color: var(--text); margin-bottom: 3px; }
.rec-sub { font-size: 11px; color: var(--text-muted); line-height: 1.4; }
.trans-icon { background: var(--accent-soft); border: 1px solid var(--accent-border); }
.trans-container { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
.trans-header-row { display: grid; grid-template-columns: 1fr 40px 1fr; border-bottom: 1px solid var(--border); }
.trans-col-header { padding: 14px 20px; font-size: 11px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; text-align: center; }
.trans-col-before { background: var(--red-bg); color: var(--red-text); }
.trans-col-arrow { display: flex; align-items: center; justify-content: center; color: var(--text-muted); font-size: 14px; background: var(--border-light); }
.trans-col-after { background: var(--green-bg); color: var(--green-text); }
.trans-row { display: grid; grid-template-columns: 1fr 40px 1fr; border-bottom: 1px solid var(--border-light); }
.trans-row:last-child { border-bottom: none; }
.trans-row-label { grid-column: 1 / -1; padding: 12px 20px 0; font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; color: var(--text-muted); }
.trans-cell { padding: 8px 20px 14px; font-size: 13px; line-height: 1.55; }
.trans-cell-before { color: var(--red-muted); }
.trans-cell-arrow { display: flex; align-items: center; justify-content: center; color: var(--border); font-size: 16px; }
.trans-cell-after { color: var(--green-muted); font-weight: 500; }
.trans-badge-row { display: grid; grid-template-columns: 1fr 40px 1fr; padding: 16px 20px; background: var(--border-light); }
.trans-badge { display: inline-flex; align-items: center; justify-content: center; padding: 4px 14px; border-radius: 999px; font-size: 11px; font-weight: 700; letter-spacing: 0.03em; text-transform: uppercase; }
.badge-10 { background: var(--red-bg); color: var(--red-text); border: 1px solid var(--red-border); }
.badge-30 { background: var(--green-bg); color: var(--green-text); border: 1px solid var(--green-border); }
.trans-badge-center { display: flex; align-items: center; justify-content: center; }
.int-ext-container { background: var(--card); border: 1px solid var(--border); border-radius: 16px; overflow: hidden; }
.int-ext-cols { display: grid; grid-template-columns: 1fr 1fr; }
@media (max-width: 480px) { .int-ext-cols { grid-template-columns: 1fr; } }
.int-ext-col { padding: 20px 22px; }
.int-ext-col-int { border-right: 1px solid var(--border-light); }
@media (max-width: 480px) { .int-ext-col-int { border-right: none; border-bottom: 1px solid var(--border-light); } }
.int-ext-col-label { font-size: 10px; font-weight: 700; letter-spacing: 0.08em; text-transform: uppercase; margin-bottom: 12px; display: flex; align-items: center; gap: 6px; }
.int-ext-col-int .int-ext-col-label { color: var(--accent-plexo); }
.int-ext-col-ext .int-ext-col-label { color: var(--accent-laringeo); }
.int-ext-item { display: flex; align-items: flex-start; gap: 10px; margin-bottom: 10px; }
.int-ext-item:last-child { margin-bottom: 0; }
.int-ext-bullet { width: 6px; height: 6px; border-radius: 50%; margin-top: 7px; flex-shrink: 0; }
.int-ext-col-int .int-ext-bullet { background: var(--accent-plexo); opacity: 0.6; }
.int-ext-col-ext .int-ext-bullet { background: var(--accent-laringeo); opacity: 0.6; }
.int-ext-item-text { font-size: 13.5px; line-height: 1.55; color: var(--text2); }
.int-ext-badge { display: inline-block; font-size: 9px; font-weight: 700; letter-spacing: 0.05em; text-transform: uppercase; padding: 2px 8px; border-radius: 6px; }
.int-ext-badge-pode { background: #DBEAFE; color: #1E40AF; }
.int-ext-badge-nao { background: #FEE2E2; color: #991B1B; }
.int-ext-footer { padding: 14px 22px; background: var(--border-light); font-size: 13px; color: var(--text3); line-height: 1.5; text-align: center; }
.int-ext-footer strong { color: var(--text2); }
.int-ext-icon { background: #EFF6FF; border: 1px solid #BFDBFE; }
.cta-deep { background: var(--card); border: 2px dashed var(--accent-border); border-radius: 16px; padding: 22px 18px; text-align: center; cursor: pointer; transition: all 0.25s; }
.cta-deep:hover { border-color: var(--accent); background: var(--accent-soft); }
.cta-deep-icon { font-size: 22px; margin-bottom: 6px; }
.cta-deep-title { font-family: 'Fraunces', serif; font-size: 16px; font-weight: 600; color: var(--text); margin-bottom: 4px; }
.cta-deep-sub { font-size: 12px; color: var(--text3); line-height: 1.4; }
.m-footer { text-align: center; margin-top: 48px; padding-top: 24px; border-top: 1px solid var(--border); color: var(--text-muted); font-size: 11px; }
.m-footer-mark { font-family: 'Fraunces', serif; font-size: 14px; color: var(--accent); margin-bottom: 4px; }

/* VIEW 2: RELATÓRIO COMPLETO */
.full-page { max-width: 720px; margin: 0 auto; padding: 24px 16px 80px; }
.full-header { text-align: center; margin-bottom: 40px; padding-top: 20px; }
.full-header-label { font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.18em; }
.full-header h1 { font-family: 'Fraunces', serif; font-size: 30px; color: var(--text); margin-top: 6px; font-weight: 600; }
.full-header-sub { font-size: 14px; color: var(--text3); margin-top: 8px; }
.caso-box { background: #1F2937; color: #F9FAFB; border-radius: 16px; padding: 24px 28px; margin-bottom: 40px; }
.caso-box .label { font-size: 11px; font-weight: 700; color: #9CA3AF; text-transform: uppercase; letter-spacing: 0.1em; margin-bottom: 10px; }
.caso-box p { font-size: 15px; line-height: 1.7; color: #E5E7EB; font-style: italic; }
.modulo { margin-bottom: 48px; }
.modulo-header { display: flex; align-items: center; gap: 12px; margin-bottom: 20px; padding-bottom: 12px; border-bottom: 2px solid var(--border-light); }
.modulo-num { background: var(--text); color: #fff; width: 32px; height: 32px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; flex-shrink: 0; }
.modulo-title { font-family: 'Fraunces', serif; font-size: 22px; color: var(--text); font-weight: 600; }
.modulo p { font-size: 15px; margin-bottom: 16px; color: var(--text); line-height: 1.7; }
.modulo .destaque { background: var(--border-light); border-left: 3px solid var(--text-muted); padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 14px; color: var(--text); line-height: 1.7; }
.modulo .destaque-positivo { background: var(--green-bg); border-left: 3px solid var(--accent-cardiaco); padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 14px; color: var(--green-text); line-height: 1.7; }
.modulo .destaque-alerta { background: var(--amber-bg); border-left: 3px solid var(--accent-plexo); padding: 14px 18px; border-radius: 0 10px 10px 0; margin: 16px 0; font-size: 14px; color: var(--amber-text); line-height: 1.7; }
.formula-step { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 16px 20px; margin: 12px 0; }
.formula-step .step-label { font-size: 11px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
.formula-step p { font-size: 14px; margin-bottom: 0; line-height: 1.7; }
.protocolo-etapa { background: var(--card); border: 1px solid var(--border); border-radius: 14px; padding: 20px 24px; margin-bottom: 16px; }
.protocolo-etapa .etapa-header { display: flex; align-items: center; gap: 10px; margin-bottom: 12px; }
.etapa-num { width: 28px; height: 28px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 14px; font-weight: 700; color: #fff; flex-shrink: 0; }
.etapa-title { font-size: 17px; font-weight: 700; color: var(--text); }
.lembrete-box { padding: 12px 16px; border-radius: 10px; margin: 8px 0; font-size: 15px; line-height: 1.5; font-style: italic; }
.lembrete-p1 { background: #FEF2F2; border-left: 3px solid #EF4444; color: #991B1B; }
.lembrete-p2 { background: var(--green-bg); border-left: 3px solid var(--accent-cardiaco); color: var(--green-text); }
.ext-table { width: 100%; border-collapse: separate; border-spacing: 0; margin: 16px 0; font-size: 13px; }
.ext-table th { background: var(--border-light); padding: 10px 14px; text-align: left; font-weight: 700; font-size: 11px; text-transform: uppercase; letter-spacing: 0.04em; color: var(--text3); }
.ext-table th:first-child { border-radius: 10px 0 0 0; }
.ext-table th:last-child { border-radius: 0 10px 0 0; }
.ext-table td { padding: 10px 14px; border-bottom: 1px solid var(--border-light); vertical-align: top; line-height: 1.6; }
.badge { display: inline-block; padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.badge-sim { background: #DBEAFE; color: #1E40AF; }
.badge-nao { background: #FEE2E2; color: #991B1B; }
.hud-divider { text-align: center; margin: 56px 0 40px; position: relative; }
.hud-divider::before { content: ''; position: absolute; top: 50%; left: 0; right: 0; height: 1px; background: var(--border); }
.hud-divider span { background: var(--bg); padding: 0 20px; position: relative; font-size: 11px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.15em; }
.hud-container { max-width: 460px; margin: 0 auto; }
.hud-header { text-align: center; margin-bottom: 24px; }
.hud-header .hud-label { font-size: 10px; font-weight: 700; color: #CBD5E1; text-transform: uppercase; letter-spacing: 0.18em; }
.hud-header .hud-title { font-size: 22px; font-weight: 700; color: var(--text); margin-top: 4px; }
.hud-score { background: #111827; border-radius: 14px; padding: 16px 20px; margin-bottom: 20px; display: flex; align-items: center; gap: 16px; }
.hud-score-circle { width: 52px; height: 52px; border-radius: 50%; border: 3px solid var(--accent-laringeo); display: flex; align-items: center; justify-content: center; font-size: 18px; font-weight: 700; color: var(--accent-laringeo); flex-shrink: 0; }
.hud-score-info { flex: 1; }
.hud-score-title { font-size: 13px; font-weight: 600; color: #F9FAFB; }
.hud-score-sub { font-size: 11px; color: #9CA3AF; margin-top: 2px; }
.xp-bar { display: flex; align-items: center; gap: 8px; margin-top: 6px; }
.xp-bar-track { flex: 1; height: 6px; background: #374151; border-radius: 99px; overflow: hidden; }
.xp-bar-fill { height: 100%; border-radius: 99px; }
.xp-bar-label { font-size: 11px; font-weight: 700; color: #9CA3AF; min-width: 32px; text-align: right; }
.xp-bar-light .xp-bar-track { background: #E5E7EB; }
.hud-lembrete { background: var(--card); border: 1px solid var(--border); border-radius: 12px; padding: 12px 16px; margin-bottom: 20px; }
.hud-lembrete .lem-label { font-size: 10px; font-weight: 700; color: var(--text-muted); text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 6px; }
.hud-lembrete .lem-text { font-size: 13px; color: var(--text); line-height: 1.5; font-style: italic; }
.hud-card { background: var(--card); border-radius: 14px; border: 1px solid var(--border-light); margin-bottom: 12px; overflow: hidden; }
.hud-card-header { padding: 16px 18px; display: flex; align-items: center; gap: 12px; }
.hud-card-emoji { font-size: 28px; line-height: 1; }
.hud-card-info { flex: 1; }
.hud-card-name { font-size: 16px; font-weight: 700; color: var(--text); }
.hud-card-badges { display: flex; align-items: center; gap: 6px; margin-top: 2px; flex-wrap: wrap; }
.hud-badge { padding: 2px 8px; border-radius: 99px; font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.04em; }
.hud-badge-blocked { background: #FEF3C7; color: #D97706; }
.hud-badge-excessive { background: #EDE9FE; color: #7C3AED; }
.hud-badge-role { color: #9CA3AF; font-weight: 600; font-size: 10px; }
.hud-card-body { padding: 0 18px 18px; }
.hud-card-tema { font-size: 12px; color: var(--text-muted); font-weight: 500; margin-bottom: 14px; }
.hud-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
.hud-col-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.06em; margin-bottom: 8px; display: flex; align-items: center; gap: 4px; }
.hud-col-label .dot { display: inline-block; width: 6px; height: 6px; border-radius: 50%; }
.hud-col-red .hud-col-label { color: #DC2626; }
.hud-col-red .dot { background: #EF4444; }
.hud-col-green .hud-col-label { color: #059669; }
.hud-col-green .dot { background: #10B981; }
.hud-item { font-size: 12px; padding: 7px 10px; border-radius: 8px; margin-bottom: 4px; line-height: 1.4; }
.hud-item-red { background: #FEF3C7; color: #92400E; }
.hud-item-green { background: #ECFDF5; color: #065F46; }
.hud-missao { margin-top: 14px; border: 1px dashed; border-radius: 10px; padding: 10px 14px; }
.hud-missao-label { font-size: 10px; font-weight: 700; text-transform: uppercase; letter-spacing: 0.05em; margin-bottom: 4px; }
.hud-missao-text { font-size: 13px; color: var(--text); line-height: 1.5; }
.hud-footer { text-align: center; padding: 28px 0 16px; font-size: 10px; color: #CBD5E1; }

/* VIEW 3: LEMBRETES */
.lem-page { max-width: 680px; margin: 0 auto; padding: 40px 20px 80px; }
.lem-header { text-align: center; margin-bottom: 36px; animation: fadeUp 0.5s ease both; }
.lem-header-eyebrow { font-size: 10px; font-weight: 700; letter-spacing: 0.2em; text-transform: uppercase; color: var(--accent); margin-bottom: 8px; }
.lem-header h1 { font-family: 'Fraunces', serif; font-size: 30px; font-weight: 600; color: var(--text); line-height: 1.2; margin-bottom: 6px; }
.lem-header-sub { font-size: 13px; color: var(--text-muted); max-width: 400px; margin: 0 auto; }
.lem-central { background: var(--text); color: #F5F5F0; border-radius: 20px; padding: 32px 28px; text-align: center; margin-bottom: 32px; animation: fadeUp 0.5s ease 0.05s both; }
.lem-central-icon { font-size: 28px; margin-bottom: 12px; }
.lem-central-frase { font-family: 'Fraunces', serif; font-size: 22px; font-weight: 600; line-height: 1.4; color: #F5F5F0; margin-bottom: 12px; }
.lem-central-sub { font-size: 13px; color: rgba(255,255,255,0.5); font-style: italic; }
.lem-section { margin-bottom: 28px; }
.lem-section-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--text-muted); margin-bottom: 12px; padding-left: 2px; }
.frase-list { display: flex; flex-direction: column; gap: 10px; }
.frase-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px 22px; transition: all 0.25s; }
.frase-card:hover { border-color: var(--accent-border); box-shadow: 0 2px 12px rgba(0,0,0,0.04); }
.frase-top { display: flex; align-items: center; gap: 10px; margin-bottom: 10px; }
.frase-chakra-dot { width: 8px; height: 8px; border-radius: 50%; flex-shrink: 0; }
.frase-chakra-name { font-size: 10px; font-weight: 700; letter-spacing: 0.06em; text-transform: uppercase; color: var(--text-muted); }
.frase-texto { font-family: 'Fraunces', serif; font-size: 19px; font-weight: 600; color: var(--text); line-height: 1.4; margin-bottom: 8px; }
.frase-contexto { font-size: 13px; color: var(--text3); line-height: 1.55; }
.conceito-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 10px; }
@media (max-width: 480px) { .conceito-grid { grid-template-columns: 1fr; } }
.conceito-card { background: var(--card); border: 1px solid var(--border); border-radius: 16px; padding: 20px; transition: all 0.25s; }
.conceito-card:hover { border-color: var(--green-border); background: var(--green-bg); }
.conceito-emoji { font-size: 20px; margin-bottom: 10px; }
.conceito-titulo { font-size: 14px; font-weight: 700; color: var(--text); margin-bottom: 4px; }
.conceito-desc { font-size: 12px; color: var(--text3); line-height: 1.5; }
.antidoto-list { display: flex; flex-direction: column; gap: 8px; }
.antidoto-item { background: var(--card); border: 1px solid var(--border); border-radius: 14px; overflow: hidden; display: grid; grid-template-columns: 1fr auto 1fr; align-items: stretch; }
.antidoto-antiga { padding: 14px 16px; font-size: 13px; color: var(--red-text); background: var(--red-bg); line-height: 1.5; font-style: italic; }
.antidoto-seta { display: flex; align-items: center; justify-content: center; padding: 0 8px; color: var(--text-muted); font-size: 14px; background: var(--border-light); }
.antidoto-nova { padding: 14px 16px; font-size: 13px; color: var(--green-muted); background: var(--green-bg); line-height: 1.5; font-weight: 500; }
.mantra-strip { background: var(--accent-soft); border: 1px solid var(--accent-border); border-radius: 16px; padding: 24px; text-align: center; }
.mantra-label { font-size: 10px; font-weight: 700; letter-spacing: 0.12em; text-transform: uppercase; color: var(--accent); margin-bottom: 12px; }
.mantra-frase { font-family: 'Fraunces', serif; font-size: 20px; font-weight: 600; color: var(--text); line-height: 1.4; margin-bottom: 8px; }
.mantra-sub { font-size: 12px; color: var(--text3); }
@keyframes fadeUp { from { opacity: 0; transform: translateY(14px); } to { opacity: 1; transform: translateY(0); } }

/* TAB PLACEHOLDER & ON-DEMAND GENERATION */
.tab-placeholder {
    max-width: 480px;
    margin: 80px auto;
    padding: 48px 32px;
    text-align: center;
    background: var(--card);
    border: 1px dashed var(--border);
    border-radius: 20px;
}
.tab-placeholder-icon { font-size: 40px; margin-bottom: 16px; }
.tab-placeholder h2 {
    font-family: 'Fraunces', serif;
    font-size: 24px;
    font-weight: 600;
    color: var(--text);
    margin-bottom: 10px;
}
.tab-placeholder p {
    font-size: 14px;
    color: var(--text3);
    line-height: 1.65;
    margin-bottom: 24px;
}
.tab-placeholder-note {
    font-size: 12px;
    color: var(--text-muted);
    margin-top: 14px;
}
.tab-generate-btn {
    display: inline-flex;
    align-items: center;
    gap: 8px;
    padding: 14px 28px;
    background: var(--text);
    color: #F5F5F0;
    border: none;
    border-radius: 12px;
    font-family: 'DM Sans', sans-serif;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    transition: background 0.2s, transform 0.2s;
}
.tab-generate-btn:hover { background: #374151; transform: translateY(-1px); }
.tab-generate-btn:disabled { opacity: 0.5; cursor: not-allowed; transform: none; }
.tab-loading {
    max-width: 400px;
    margin: 100px auto;
    padding: 40px;
    text-align: center;
}
.tab-loading-spinner {
    width: 32px; height: 32px;
    border: 3px solid var(--border);
    border-top-color: var(--accent);
    border-radius: 50%;
    animation: spin 0.8s linear infinite;
    margin: 0 auto 20px;
}
@keyframes spin { to { transform: rotate(360deg); } }
.tab-loading p { font-size: 14px; color: var(--text3); font-style: italic; }

@media print { body { padding: 0; } .tab-bar { display: none; } }
`;

const TAB_BAR_HTML = `<nav class="tab-bar">
    <button class="tab-btn active" onclick="switchTab('mapa')" id="btn-mapa">✦ Map<span class="tab-badge tab-badge-leve">Light</span></button>
    <button class="tab-btn" onclick="switchTab('completo')" id="btn-completo">📖 Full Report<span class="tab-badge tab-badge-completo">Full</span></button>
    <button class="tab-btn" onclick="switchTab('lembretes')" id="btn-lembretes">💡 Reminders<span class="tab-badge tab-badge-lembrete">Practical</span></button>
    <button class="tab-btn" onclick="switchTab('acoes')" id="btn-acoes">⚡ Actions<span class="tab-badge tab-badge-acoes">Do</span></button>
</nav>`;

const TAB_SCRIPT = `<script>
function switchTab(tab) {
    document.querySelectorAll('.tab-view').forEach(function(v){ v.classList.remove('active'); });
    document.querySelectorAll('.tab-btn').forEach(function(b){ b.classList.remove('active'); });
    var view = document.getElementById('view-' + tab);
    var btn = document.getElementById('btn-' + tab);
    if (view) view.classList.add('active');
    if (btn) btn.classList.add('active');
    window.scrollTo({ top: 0, behavior: 'smooth' });
}
function requestTabGeneration(tab) {
    window.parent.postMessage({ source: 'soul-game-report', type: 'generate-tab', tab: tab }, '*');
}
function showTabLoading(tab, message) {
    var el = document.getElementById('view-' + tab);
    if (!el) return;
    el.innerHTML = '<div class="tab-loading"><div class="tab-loading-spinner"></div><p>' + message + '</p></div>';
    switchTab(tab);
}
window.addEventListener('message', function(e) {
    if (!e.data || e.data.source !== 'soul-game-parent') return;
    if (e.data.type === 'switch-tab') switchTab(e.data.tab);
    if (e.data.type === 'tab-loading') showTabLoading(e.data.tab, e.data.message);
});
<\/script>`;

const TAB_META = {
    completo: {
        icon: '📖',
        title: 'Full Report',
        description: 'Deep narrative analysis with all 4 modules — why you function this way, what to do, and what happens outside you.',
        buttonLabel: 'Generate Full Report',
        loadingMessage: 'Writing your full report...'
    },
    lembretes: {
        icon: '💡',
        title: 'Reminders',
        description: 'Anchor phrases, concepts, and antidotes to review when the situation activates again.',
        buttonLabel: 'Generate Reminders',
        loadingMessage: 'Preparing your reminders...'
    },
    acoes: {
        icon: '⚡',
        title: 'Actions',
        description: 'Concrete steps for the next 48 hours, this week, and ongoing development.',
        buttonLabel: 'Generate Actions',
        loadingMessage: 'Building your action plan...'
    }
};

function buildPlaceholderTab(tabId) {
    const m = TAB_META[tabId];
    return '<div class="tab-view" id="view-' + tabId + '">\n'
        + '<div class="tab-placeholder">\n'
        + '<div class="tab-placeholder-icon">' + m.icon + '</div>\n'
        + '<h2>' + m.title + '</h2>\n'
        + '<p>' + m.description + '</p>\n'
        + '<button type="button" class="tab-generate-btn" onclick="requestTabGeneration(\'' + tabId + '\')">' + m.buttonLabel + '</button>\n'
        + '<p class="tab-placeholder-note">API credits are used only when you generate this tab.</p>\n'
        + '</div>\n</div>';
}

function buildReportDocument(name, tabContents) {
    const title = name ? ('Soul Game — ' + name) : 'Soul Game';
    const views = [
        tabContents.mapa,
        tabContents.completo || buildPlaceholderTab('completo'),
        tabContents.lembretes || buildPlaceholderTab('lembretes'),
        tabContents.acoes || buildPlaceholderTab('acoes')
    ].join('\n');
    return '<!DOCTYPE html>\n<html lang="en">\n<head>\n<meta charset="UTF-8">\n'
        + '<meta name="viewport" content="width=device-width, initial-scale=1.0">\n'
        + '<title>' + title + '</title>\n'
        + '<link href="https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700&family=Fraunces:ital,opsz,wght@0,9..144,400;0,9..144,600;0,9..144,700;1,9..144,400&display=swap" rel="stylesheet">\n'
        + '<style>' + REPORT_STYLE + '</style>\n</head>\n<body>\n'
        + TAB_BAR_HTML + '\n'
        + views + '\n'
        + TAB_SCRIPT + '\n</body>\n</html>';
}

/* ── SYSTEM PROMPTS: shared methodology + per-tab output ── */
const BASE_METHODOLOGY = `You are Veda — the Soul Game diagnostic generator. From a person's account of a situation that bothers them, you produce structured HTML analysis tabs.

# ROLE AND TONE
You show the person: (1) what the situation is ASKING FOR (needs), (2) why they GET STUCK (the pattern behind it), (3) what TO DO (concrete prescription), (4) what they DON'T CONTROL (the external part).
Tone: educate through recognition, never through blame. No guru energy, no mysticism. Chakras are a DIAGNOSTIC SYSTEM — axes of human need, like a character's "stats": each can be in LACK (blocked), PROPORTIONAL, or EXCESS.
Speak in the SECOND PERSON, using the person's NAME, with warm firmness. Do not invent facts outside the account; when you assume (e.g. childhood history), mark it as a hypothesis ("Perhaps...", "At some point you learned that...").
OPEN RING PRINCIPLE: integration is not a permanent state, it is the capacity to return. The pattern will reactivate; evolution is measured by how quickly the person comes back. Every analysis ends by pointing this out.

# THE 7 CHAKRAS (need axes)
Use ONLY the chakras the situation activates (usually 3 to 4). One is the PRIMARY (greatest leverage). The others are Secondary / Support.
| Chakra | Emoji | Dot color | Theme | Root Need |
| Root | 🔴 | #C0564B | Security & Belonging | Feeling safe and belonging |
| Sacral | 🟠 | #D97A3D | Pleasure, Emotion & Creativity | Feeling pleasure and flowing |
| Solar Plexus | ☀️ | #E8A317 | Power & Identity | Feeling worthy and capable |
| Heart | 💚 | #4CAF82 | Love & Compassion | Feeling loved and connected |
| Throat | 🔵 | #4A9FD9 | Communication & Truth | Feeling heard and authentic |
| Third Eye | 👁️ | #7C6BB0 | Perception, Clarity & Intuition | Seeing with clarity |
| Crown | 👑 | #C77DBA | Purpose, Meaning & Trust | Feeling that it makes sense / trusting the process |
Highlight colors (borders/missions/labels): Throat #3B82F6 (var --accent-laringeo) · Heart #10B981 (--accent-cardiaco) · Solar Plexus #F59E0B (--accent-plexo) · Third Eye/Crown #8B5CF6 (--accent-frontal). For Root/Sacral, use the dot color itself.
Opposition pairs (one side in excess compensates the other in lack): Root↔Crown · Sacral↔Third Eye · Solar Plexus↔Heart. Throat is the exception: it mediates the expression of the others.

# STATES
- LACK (Blocked): the need exists but is not being met. Function stuck (e.g. blocked Throat = swallows what they feel).
- PROPORTIONAL (Balanced): met in the right measure. This is the target.
- EXCESS: the function dominates and throws off balance (e.g. Heart excess = compassion turned into self-erasure).
Diagnose each active chakra as Lack or Excess. Often an excess FEEDS a lack (e.g. Heart excess sustains blocked Throat). Show this chain.

# THE TWO FORCES
Almost every situation gets stuck because there are two opposing forces. Name both early: the LEGITIMATE force that wants to act (anger, desire, real need) and the one that BRAKES (anticipatory guilt, fear, shame — usually arrives BEFORE action). The person's discomfort IS the friction between them.

# OLD MIND × NEW MIND
Old Mind: automatic, fast program (triggers guilt/fear, rationalizes retreat). New Mind: the part that already knows what to do, but is slower. The problem is not KNOWING — it's that the Old Mind is faster. The prescription gives the New Mind tools to win the race.

# POSITIVE INTENTION
The old program is NOT the enemy. It was an intelligent solution to a past situation and tries to protect something the person loves. "Your system is not your enemy — it's taking care of something, just with a strategy that no longer serves."

# THE TWO LAYERS OF THE CODE (Module 2)
Layer 1 — Species Code: evolutionary/ancestral root of the behavior. Legitimizes without pathologizing.
Layer 2 — Story Code: where, in THIS person's life, the pattern was learned (hypothesis). Always close with: it wasn't weakness, it was the intelligence of the child/person they were.

# INTERNAL × EXTERNAL
Separate what DEPENDS on the person ("Can change") from what does NOT (the other's reaction, other people's decisions — "Can't control"). The work is parallel: resolve the internal to be able to act, act on the external to prove the old program was wrong.

# THE PRICE TO ACCEPT
Each new strategy charges a toll — and it is not the obstacle, it is the healthy cost of leaving the block. Name the price for each chakra (e.g. Throat — the exposure of displeasing; Heart — the guilt of not pleasing; Solar Plexus — the tension of holding the position). Accepting the price consciously IS the health.

# VERSION 1.0 → 3.0
Before/after in five lines: Thought, Emotion, Action, Result, Identity. 1.0 is reactive (swallows, pretends, accumulates). 3.0 holds truth and love at the same time. The Identity line is the strongest.

# PROCESS (think before writing)
1. Summarize the situation in 2-3 sentences, in the person's voice. 2. Identify the two forces. 3. Map 3-4 active chakras, marking state and which is Primary. 4. Find the chain (which excess feeds which lack). 5. Formulate the Positive Intention. 6. Define the central prescription. 7. Separate internal × external. 8. Name the main tool (replicable script, e.g. "Respectful Confrontation = love + what hurt + what I need").

# LANGUAGE RULES
Second person + name. Recognize, don't blame. Verbs of movement (navigate, hold, cross) — avoid promising permanent cure (the ring reopens). Concrete: ready scripts, phrases to repeat, dated actions (48h / 7 days). No guru, no mystic. The external is honest — never promise control over the other. Always end on the open ring.

═══════════════════════════════════════════════════════════════════
# OUTPUT FORMAT — ABSOLUTE RULES (MAP TAB ONLY)
═══════════════════════════════════════════════════════════════════
Return ONLY raw HTML: exactly ONE <div class="tab-view"> block for the Map tab.
- Do NOT write text before or after. Do NOT use markdown code blocks. Do NOT include <!DOCTYPE>, <html>, <head>, <style>, <nav class="tab-bar"> or <script>.
- Start DIRECTLY with: <div class="tab-view active" id="view-mapa">
- End with the closing </div> that closes view-mapa (do NOT include other tabs).
- Use EXACTLY the class names and structure from the skeleton below.
- Section icon emojis may vary by theme, but keep the CLASSES.

MAP SKELETON (fill in for the account received; [brackets] = fill in; "repeat" = one per item):

<div class="tab-view active" id="view-mapa">
<div class="page">
  <div class="m-header"><div class="m-header-eyebrow">Soul Game</div><h1>Situation Map</h1><div class="m-header-sub">What life is asking, teaching, and offering</div></div>
  <div class="situacao"><div class="situacao-label">Your Situation</div><div class="situacao-text">[summary of the account in 1st person, condensed]</div></div>
  <div class="section">
    <div class="section-header"><div class="section-icon nec-raiz-icon">🌱</div><div class="section-title">Root Needs</div></div>
    <div class="raiz-strip">
      <div class="raiz-item"><div class="raiz-dot" style="background:#4CAF82;border-color:#4CAF82"></div><div class="raiz-chakra">[Chakra]</div><div class="raiz-need">[root need]</div></div>
      <!-- repeat 1 raiz-item per active chakra -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon estrat-atuais-icon">🔴</div><div class="section-title">Current Strategies</div></div>
    <div class="estrat-grid">
      <div class="estrat-card"><div class="estrat-chakra"><span class="estrat-chakra-dot" style="background:#4CAF82"></span>[Chakra] — [Excessive|Blocked]</div><div class="estrat-text">[old strategy]</div><div class="estrat-tag tag-excessivo">Excessive</div></div>
      <!-- repeat per chakra; use tag-bloqueado/Blocked when it's lack -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon nec-icon">🟢</div><div class="section-title">New Strategies</div></div>
    <div class="nec-grid">
      <div class="nec-card"><div class="nec-chakra"><span class="nec-chakra-dot" style="background:#4CAF82"></span>[Chakra]</div><div class="nec-text">[healthy version]</div></div>
      <!-- repeat per chakra -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon res-icon">🪙</div><div class="section-title">The Price to Accept</div></div>
    <p style="font-size:13px;color:var(--text3);margin:-4px 0 14px;line-height:1.6">Each new strategy charges a price. It is not the obstacle — it is the healthy cost of leaving the block.</p>
    <div class="nec-grid">
      <div class="nec-card"><div class="nec-chakra"><span class="nec-chakra-dot" style="background:#4CAF82"></span>[Chakra]</div><div class="nec-text">[the honest toll]</div></div>
      <!-- repeat per chakra -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon res-icon">🎯</div><div class="section-title">Result</div></div>
    <div class="res-container">
      <div class="res-cols">
        <div class="res-col res-col-want"><div class="res-col-label">✦ What you want</div>
          <div class="res-item"><div class="res-bullet"></div><div class="res-item-text">[item]</div></div><!-- 3 items -->
        </div>
        <div class="res-col res-col-have"><div class="res-col-label">◆ What you have today</div>
          <div class="res-item"><div class="res-bullet"></div><div class="res-item-text">[item]</div></div><!-- 3 items -->
        </div>
      </div>
      <div class="res-gap-bar"><div class="res-gap-label">Gap</div><div class="res-gap-track"><div class="res-gap-fill" style="width:35%"></div></div><div class="res-gap-label" style="color:var(--text3)">The distance between the two is the challenge</div></div>
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon int-ext-icon">🔀</div><div class="section-title">Internal vs External</div></div>
    <div class="int-ext-container"><div class="int-ext-cols">
      <div class="int-ext-col int-ext-col-int"><div class="int-ext-col-label">☀️ Depends on you</div>
        <div class="int-ext-item"><div class="int-ext-bullet"></div><div class="int-ext-item-text">[action] <span class="int-ext-badge int-ext-badge-pode">Can change</span></div></div><!-- repeat -->
      </div>
      <div class="int-ext-col int-ext-col-ext"><div class="int-ext-col-label">🌍 Doesn't depend on you</div>
        <div class="int-ext-item"><div class="int-ext-bullet"></div><div class="int-ext-item-text">[external variable] <span class="int-ext-badge int-ext-badge-nao">Can't control</span></div></div><!-- repeat -->
      </div>
    </div><div class="int-ext-footer"><strong>The work is parallel</strong> — [phrase]</div></div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon cap-icon">💎</div><div class="section-title">Capabilities in Development</div></div>
    <div class="cap-list">
      <div class="cap-item"><div class="cap-name">[Capability]</div><div class="cap-dash">—</div><div class="cap-desc">[short description]</div><div class="cap-chakra-tag"><span class="cap-chakra-tag-dot" style="background:#4CAF82"></span> [Chakra]</div></div><!-- 5 to 6 items -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon lic-icon">📖</div><div class="section-title">Lessons</div></div>
    <div class="lic-list">
      <div class="lic-item"><div class="lic-num">1</div><div><div class="lic-title">[title]</div><div class="lic-desc">[description]</div></div></div><!-- 2 to 3 lessons -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon rec-icon">🏆</div><div class="section-title">Rewards</div></div>
    <div class="rec-grid">
      <div class="rec-card"><div class="rec-emoji">💚</div><div class="rec-name">[short name]</div><div class="rec-sub">[subtitle]</div></div><!-- 6 cards -->
    </div>
  </div>
  <div class="section">
    <div class="section-header"><div class="section-icon trans-icon">⚡</div><div class="section-title">Before → After</div></div>
    <div class="trans-container">
      <div class="trans-header-row"><div class="trans-col-header trans-col-before">Version 1.0</div><div class="trans-col-arrow">→</div><div class="trans-col-header trans-col-after">Version 3.0</div></div>
      <div class="trans-row"><div class="trans-row-label">💭 Thought</div></div>
      <div class="trans-row"><div class="trans-cell trans-cell-before">[before]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[after]</div></div>
      <div class="trans-row"><div class="trans-row-label">❤️‍🔥 Emotion</div></div>
      <div class="trans-row"><div class="trans-cell trans-cell-before">[before]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[after]</div></div>
      <div class="trans-row"><div class="trans-row-label">⚡ Action</div></div>
      <div class="trans-row"><div class="trans-cell trans-cell-before">[before]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[after]</div></div>
      <div class="trans-row"><div class="trans-row-label">🎯 Result</div></div>
      <div class="trans-row"><div class="trans-cell trans-cell-before">[before]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[after]</div></div>
      <div class="trans-row"><div class="trans-row-label">🪪 Identity</div></div>
      <div class="trans-row" style="border-bottom:none"><div class="trans-cell trans-cell-before">[before]</div><div class="trans-cell trans-cell-arrow">→</div><div class="trans-cell trans-cell-after">[after]</div></div>
      <div class="trans-badge-row"><div style="text-align:center"><span class="trans-badge badge-10">Adolescent</span></div><div class="trans-badge-center" style="color:var(--text-muted);font-size:12px">→</div><div style="text-align:center"><span class="trans-badge badge-30">Mature</span></div></div>
    </div>
  </div>
  <div style="display:grid;grid-template-columns:1fr 1fr;gap:12px;margin-top:32px">
    <div class="cta-deep" onclick="switchTab('completo')"><div class="cta-deep-icon">📖</div><div class="cta-deep-title">Full Report</div><div class="cta-deep-sub">Narrative analysis with all 4 modules — generate when ready</div></div>
    <div class="cta-deep" onclick="switchTab('lembretes')"><div class="cta-deep-icon">💡</div><div class="cta-deep-title">Reminders</div><div class="cta-deep-sub">Phrases and concepts — generate when ready</div></div>
  </div>
  <div class="m-footer"><div class="m-footer-mark">✦</div>Soul Game · Situation Map</div>
</div>
</div>

CHECKLIST: clear Primary chakra; two forces named; lack/excess chain; Positive Intention; internal × external; Price to Accept; open ring; warm firm tone.
REMEMBER: respond with ONLY the single view-mapa tab-view div, nothing else.`;

const TAB_SKELETONS = {
    completo: `<div class="tab-view" id="view-completo">
<div class="full-page">
  <div class="full-header"><div class="full-header-label">Soul Game 2.0</div><h1>Full Report</h1><div class="full-header-sub">Modules 1 to 4</div></div>
  <div class="caso-box"><div class="label">Case — [Name]</div><p>[person's full account, in italics]</p></div>
  <div class="modulo">
    <div class="modulo-header"><div class="modulo-num">1</div><div class="modulo-title">What's happening with you</div></div>
    <p>[open by naming the TWO FORCES]</p><p>[describe the chain: trigger → need → brake → retreat → consequence, with <strong>bold</strong> on key terms]</p>
    <div class="destaque"><strong>The center of the problem:</strong> [name the Primary chakra and the lack/excess chain]</div>
    <p>[the visible cost today]</p>
  </div>
  <div class="modulo">
    <div class="modulo-header"><div class="modulo-num">2</div><div class="modulo-title">Why you function this way</div></div>
    <div class="formula-step"><div class="step-label" style="color:var(--accent-laringeo)">Layer 1 — The Species Code</div><p>[evolutionary origin]</p></div>
    <div class="formula-step"><div class="step-label" style="color:var(--accent-plexo)">Layer 2 — Your Story Code</div><p>[personal hypothesis]</p></div>
    <div class="formula-step"><div class="step-label" style="color:var(--accent-cardiaco)">Positive Intention</div><p>[what the system protects] <strong>Your system is not your enemy.</strong></p></div>
    <div class="formula-step"><div class="step-label" style="color:var(--accent-plexo)">Why it's no longer efficient</div><p>[the old strategy now erodes what it wanted to protect]</p></div>
    <div class="formula-step" style="border-color:var(--accent-cardiaco)"><div class="step-label" style="color:var(--accent-cardiaco)">Updated Version</div><p>[balance phrase per chakra, in <em>italics</em>]</p></div>
    <div class="formula-step" style="border:2px solid var(--accent-border);background:var(--accent-soft)"><div class="step-label" style="color:var(--accent)">The Price to Accept — the healthy side of discomfort</div><p>[introduction]</p><p><strong style="color:var(--accent-laringeo)">[Chakra]:</strong> [price]</p><!-- 1 per chakra --></div>
  </div>
  <div class="modulo">
    <div class="modulo-header"><div class="modulo-num">3</div><div class="modulo-title">What to do when the pattern activates</div></div>
    <p>[introduce Old Mind × New Mind]</p>
    <div class="protocolo-etapa"><div class="etapa-header"><div class="etapa-num" style="background:#8B5CF6">1</div><div class="etapa-title">Dissociate</div></div><p style="font-size:14px">[recognize the program]</p><div class="destaque" style="border-left-color:#8B5CF6;background:#F5F3FF"><em>"[dissociation phrase]"</em></div></div>
    <div class="protocolo-etapa"><div class="etapa-header"><div class="etapa-num" style="background:#F59E0B">2</div><div class="etapa-title">Remember</div></div><div class="lembrete-box lembrete-p1"><strong>Part 1 (neutralizes the Old Mind):</strong><br>"[phrase]"</div><div class="lembrete-box lembrete-p2"><strong>Part 2 (activates the New Mind):</strong><br>"[phrase]"</div></div>
    <div class="protocolo-etapa"><div class="etapa-header"><div class="etapa-num" style="background:#10B981">3</div><div class="etapa-title">Practice</div></div><p style="font-size:14px">[concrete action]</p><div class="destaque-positivo"><em>"[ready script]"</em></div><p style="font-size:14px"><strong>What to expect:</strong> [...]</p><p style="font-size:14px"><strong>If they react badly:</strong> [...]</p><div class="destaque-alerta"><strong>⚠️ Likely sticking point:</strong> [...]</div></div>
  </div>
  <div class="modulo">
    <div class="modulo-header"><div class="modulo-num">4</div><div class="modulo-title">What's happening outside of you</div></div>
    <p>[opening about the external part]</p>
    <table class="ext-table"><thead><tr><th>Variable</th><th>Gap</th><th>Influence</th><th>Prescription</th></tr></thead><tbody>
      <tr><td><strong>[variable]</strong></td><td>[gap]</td><td><span class="badge badge-nao">Can't control</span></td><td>[prescription]</td></tr>
      <tr><td><strong>[variable]</strong></td><td>[gap]</td><td><span class="badge badge-sim">Can influence</span></td><td>[prescription]</td></tr>
    </tbody></table>
    <p><strong>The variable you can't control:</strong> [...]</p>
    <div class="destaque"><strong>The internal/external crossroads:</strong> [...]</div>
  </div>
</div>
</div>`,
    lembretes: `<div class="tab-view" id="view-lembretes">
<div class="lem-page">
  <div class="lem-header"><div class="lem-header-eyebrow">Soul Game</div><h1>Reminders</h1><div class="lem-header-sub">Phrases and concepts to remember when the situation activates</div></div>
  <div class="lem-central"><div class="lem-central-icon">💡</div><div class="lem-central-frase">"[New Mind anchor phrase]"</div><div class="lem-central-sub">[when to use]</div></div>
  <div class="lem-section" style="animation:fadeUp 0.5s ease 0.1s both">
    <div class="lem-section-label">🔑 One phrase per chakra</div>
    <div class="frase-list">
      <div class="frase-card"><div class="frase-top"><div class="frase-chakra-dot" style="background:#4CAF82"></div><div class="frase-chakra-name">[Chakra]</div></div><div class="frase-texto">"[short phrase]"</div><div class="frase-contexto">[when to use]</div></div><!-- 1 per chakra -->
    </div>
  </div>
  <div class="lem-section" style="animation:fadeUp 0.5s ease 0.15s both">
    <div class="lem-section-label">✦ Concepts to carry</div>
    <div class="conceito-grid">
      <div class="conceito-card"><div class="conceito-emoji">⚔️</div><div class="conceito-titulo">[X ≠ Y]</div><div class="conceito-desc">[explanation]</div></div><!-- 6 cards of the "X ≠ Y" type -->
    </div>
  </div>
  <div class="lem-section" style="animation:fadeUp 0.5s ease 0.2s both">
    <div class="lem-section-label">🛡 Antidotes — when the old program speaks</div>
    <div class="antidoto-list">
      <div class="antidoto-item"><div class="antidoto-antiga">"[old program phrase]"</div><div class="antidoto-seta">→</div><div class="antidoto-nova">"[New Mind response]"</div></div><!-- 4-5 -->
    </div>
  </div>
  <div class="lem-section" style="animation:fadeUp 0.5s ease 0.25s both">
    <div class="mantra-strip"><div class="mantra-label">✦ Pocket mantra</div><div class="mantra-frase">"[integrating phrase]"</div><div class="mantra-sub">[when to repeat]</div></div>
  </div>
  <div class="m-footer"><div class="m-footer-mark">✦</div>Soul Game · Reminders</div>
</div>
</div>`,
    acoes: `<div class="tab-view" id="view-acoes">
<div class="acoes-page">
  <div class="acoes-header"><div class="acoes-header-eyebrow">Soul Game</div><h1>Recommended Actions</h1><div class="acoes-header-sub">What to do, when to do it, and what each action develops in you</div></div>
  <div class="acao-principal"><div class="acao-principal-label">⚡ Central Prescription</div><div class="acao-principal-titulo">[main action]</div><div class="acao-principal-porque"><strong>Why:</strong> [the why in one sentence]</div></div>
  <div class="ferramenta-amostra"><div class="ferramenta-amostra-header"><span class="ferramenta-amostra-badge">🔧 Tool</span><span class="ferramenta-amostra-nome">[Name] — sample</span></div><div class="ferramenta-amostra-body"><div class="ferramenta-amostra-script"><strong>"[script applied to the case]"</strong></div><div class="ferramenta-amostra-nota"><span class="ferramenta-amostra-nota-icon">💎</span><span>[note: full version generalizes to any relationship]</span></div></div></div>
  <div class="timing-section" style="animation:fadeUp 0.5s ease 0.1s both">
    <div class="timing-header"><div class="timing-badge timing-agora">🔴 Now</div><div class="timing-title">Next 48h</div></div>
    <div class="acao-list">
      <div class="acao-card"><div class="acao-card-top"><div class="acao-num" style="background:#E85454">1</div><div class="acao-content"><div class="acao-titulo">[title]</div><div class="acao-desc">[description]</div><div class="acao-tags"><span class="acao-tag acao-tag-chakra">🔵 [Chakra]</span><span class="acao-tag acao-tag-tipo-prescritivo">Prescription</span></div></div></div></div><!-- 2-3 actions; number sequentially -->
    </div>
  </div>
  <div class="timing-section" style="animation:fadeUp 0.5s ease 0.15s both">
    <div class="timing-header"><div class="timing-badge timing-semana">🟡 This Week</div><div class="timing-title">Next 7 days</div></div>
    <div class="acao-list">
      <div class="acao-card"><div class="acao-card-top"><div class="acao-num" style="background:#F59E0B">4</div><div class="acao-content"><div class="acao-titulo">[title]</div><div class="acao-desc">[description]</div><div class="acao-tags"><span class="acao-tag acao-tag-chakra">☀️ [Chakra]</span><span class="acao-tag acao-tag-tipo-prescritivo">Prescription</span></div><div class="acao-ferramenta-hint"><div class="acao-ferramenta-hint-icon">💎</div><div class="acao-ferramenta-hint-text"><strong>Capability activated:</strong> [...]</div></div></div></div></div><!-- 2-3 actions -->
    </div>
  </div>
  <div class="timing-section" style="animation:fadeUp 0.5s ease 0.2s both">
    <div class="timing-header"><div class="timing-badge timing-continuo">🔵 Ongoing</div><div class="timing-title">Development</div></div>
    <div class="acao-list">
      <div class="acao-card"><div class="acao-card-top"><div class="acao-num" style="background:#3B82F6">7</div><div class="acao-content"><div class="acao-titulo">Monitor your return speed</div><div class="acao-desc">[OPEN RING: the ring will open again; evolution is not never opening again, it's closing faster]</div><div class="acao-tags"><span class="acao-tag acao-tag-chakra">👑 Crown</span><span class="acao-tag acao-tag-tipo-capacidade">Capability</span></div></div></div></div>
      <div class="acao-card"><div class="acao-card-top"><div class="acao-num" style="background:#3B82F6">8</div><div class="acao-content"><div class="acao-titulo">When you get stuck again, don't punish yourself — recalibrate</div><div class="acao-desc">[relapse is not failure, it's the next round]</div><div class="acao-tags"><span class="acao-tag acao-tag-chakra">💚 [Chakra]</span><span class="acao-tag acao-tag-tipo-capacidade">Capability</span></div></div></div></div>
    </div>
  </div>
  <div class="travar-box" style="animation:fadeUp 0.5s ease 0.25s both"><div class="travar-label">⚠️ Signs the old program won the round</div>
    <div class="travar-item"><div class="travar-sinal">→</div><div class="travar-text"><strong>Endless postponement:</strong> [...]</div></div>
    <div class="travar-item"><div class="travar-sinal">→</div><div class="travar-text"><strong>Rationalization:</strong> [...]</div></div>
    <div class="travar-item"><div class="travar-sinal">→</div><div class="travar-text"><strong>Compensation:</strong> [...]</div></div>
    <div class="travar-item"><div class="travar-sinal">→</div><div class="travar-text"><strong>Displacement:</strong> [...]</div></div>
  </div>
  <div class="resultado-box" style="animation:fadeUp 0.5s ease 0.3s both"><div class="resultado-label">✅ Expected result if you follow through</div>
    <div class="resultado-grid">
      <div class="resultado-item"><div class="resultado-check">✓</div><div class="resultado-text">[item]</div></div><!-- 6 items -->
    </div>
  </div>
  <div class="m-footer"><div class="m-footer-mark">✦</div>Soul Game · Recommended Actions</div>
</div>
</div>`
};

const CORE_METHODOLOGY = BASE_METHODOLOGY.slice(0, BASE_METHODOLOGY.indexOf('═══════════════════════════════════════════════════════════════════\n# OUTPUT FORMAT'));
const MAP_SYSTEM_PROMPT = BASE_METHODOLOGY;

function buildTabSystemPrompt(tabId) {
    const meta = TAB_META[tabId];
    const skeleton = TAB_SKELETONS[tabId];
    return CORE_METHODOLOGY + `

═══════════════════════════════════════════════════════════════════
# OUTPUT FORMAT — ABSOLUTE RULES (${meta.title.toUpperCase()} TAB ONLY)
═══════════════════════════════════════════════════════════════════
Return ONLY raw HTML: exactly ONE <div class="tab-view"> block for the ${meta.title} tab.
- Do NOT write text before or after. Do NOT use markdown code blocks. Do NOT include <!DOCTYPE>, <html>, <head>, <style>, <nav>, or <script>.
- Start DIRECTLY with: <div class="tab-view" id="view-${tabId}">
- End with the closing </div> for that tab only.
- Stay consistent with the Situation Map already provided in the user message.
- Use EXACTLY the class names and structure from the skeleton below.

SKELETON:
${skeleton}

REMEMBER: respond with ONLY the single view-${tabId} tab-view div, nothing else.`;
}

const LOADING_MESSAGES = [
    "Reading your situation carefully...",
    "Identifying the two forces in conflict...",
    "Mapping the chakras involved...",
    "Finding the lack/excess chain...",
    "Building your situation map..."
];

const TAB_LOADING_MESSAGES = {
    completo: "Writing your full report...",
    lembretes: "Preparing your reminders...",
    acoes: "Building your action plan..."
};

const API_ENDPOINT = '/api/analyze';

function escapeHtmlSafe(s) {
    const div = document.createElement('div');
    div.textContent = s == null ? '' : String(s);
    return div.innerHTML;
}

function renderChatMarkdown(raw) {
    let t = String(raw == null ? '' : raw)
        .replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
    t = t.replace(/\*\*([^*]+)\*\*/g, '<b>$1</b>').replace(/__([^_]+)__/g, '<b>$1</b>');
    t = t.replace(/(^|[\s(])\*([^*\n]+)\*(?=[\s).,!?:;]|$)/g, '$1<i>$2</i>');
    const lines = t.split('\n');
    let html = '', inList = false;
    for (const line of lines) {
        const m = line.match(/^\s*[-•]\s+(.*)$/);
        if (m) {
            if (!inList) { html += '<ul>'; inList = true; }
            html += '<li>' + m[1] + '</li>';
        } else {
            if (inList) { html += '</ul>'; inList = false; }
            if (line.trim() !== '') html += '<p>' + line + '</p>';
        }
    }
    if (inList) html += '</ul>';
    return html || '<p></p>';
}

class JogoDaAlmaGerador {
    constructor() {
        this.reportHtml = '';
        this.lastName = '';
        this.lastSituation = '';
        this.tabContents = { mapa: null, completo: null, lembretes: null, acoes: null };
        this.generatingTab = null;
        this.isGenerating = false;
        this.chatHistory = [];
        this.chatStreaming = false;
        this.init();
    }

    init() {
        this.cacheDOM();
        this.bindEvents();
    }

    cacheDOM() {
        this.nameInput = document.getElementById('nameInput');
        this.userInput = document.getElementById('userInput');
        this.charCount = document.getElementById('charCount');
        this.generateBtn = document.getElementById('generateBtn');
        this.statusBox = document.getElementById('statusBox');
        this.loadingText = document.getElementById('loadingText');
        this.loadingCount = document.getElementById('loadingCount');
        this.errorMsg = document.getElementById('errorMsg');
        this.resultSection = document.getElementById('resultSection');
        this.resultFrame = document.getElementById('resultFrame');
        this.downloadHtmlBtn = document.getElementById('downloadHtmlBtn');
        this.openTabBtn = document.getElementById('openTabBtn');
        this.newAnalysisBtn = document.getElementById('newAnalysisBtn');
        this.ctaBtn = document.getElementById('ctaBtn');
        this.chatMessages = document.getElementById('chatMessages');
        this.chatSuggest = document.getElementById('chatSuggest');
        this.chatInput = document.getElementById('chatInput');
        this.chatSend = document.getElementById('chatSend');
    }

    bindEvents() {
        this.generateBtn.addEventListener('click', () => this.handleGenerate());
        this.userInput.addEventListener('input', () => this.updateCharCount());
        this.userInput.addEventListener('keydown', (e) => { if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) this.handleGenerate(); });
        this.downloadHtmlBtn.addEventListener('click', () => this.downloadHTML());
        this.openTabBtn.addEventListener('click', () => this.openInNewTab());
        this.newAnalysisBtn.addEventListener('click', () => this.resetForm());
        this.ctaBtn.addEventListener('click', () => document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' }));
        this.chatSend.addEventListener('click', () => this.sendChat());
        this.chatInput.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); this.sendChat(); }
        });
        this.chatInput.addEventListener('input', () => {
            this.chatInput.style.height = 'auto';
            this.chatInput.style.height = Math.min(this.chatInput.scrollHeight, 150) + 'px';
        });
        window.addEventListener('message', (e) => {
            if (!e.data || e.data.source !== 'soul-game-report') return;
            if (e.data.type === 'generate-tab') this.generateTab(e.data.tab);
        });
    }

    updateCharCount() {
        const len = this.userInput.value.length;
        this.charCount.textContent = len > 0 ? (len + ' characters') : '';
    }

    async handleGenerate() {
        const situation = this.userInput.value.trim();
        const name = this.nameInput.value.trim();
        if (this.isGenerating) return;

        var emailEl = document.getElementById('emailInput');
        var email = emailEl ? emailEl.value.trim() : '';
        var savedEmail = null;
        try { savedEmail = localStorage.getItem('sg_lead'); } catch (e) {}
        if (!savedEmail) {
            if (!email || email.indexOf('@') < 1) {
                this.showToast('Enter your email to generate your analysis (we send you a copy and your next step)', true);
                if (emailEl) emailEl.focus();
                return;
            }
            try { localStorage.setItem('sg_lead', email); } catch (e) {}
            var SG_WEBHOOK = 'https://projeto1-n8n.dpmo2b.easypanel.host/webhook/jogo-da-alma-leads';
            if (SG_WEBHOOK.indexOf('http') === 0) {
                try { fetch(SG_WEBHOOK, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ nome: name, email: email, origem: 'soul-game-analysis', ts: new Date().toISOString() }) }); } catch (e) {}
            }
        }

        if (situation.length < 30) {
            this.showToast('Describe the situation in more detail for an accurate analysis', true);
            return;
        }

        this.lastName = name;
        this.lastSituation = situation;
        this.tabContents = { mapa: null, completo: null, lembretes: null, acoes: null };
        this.chatHistory = [];
        if (this.chatMessages) {
            this.chatMessages.innerHTML = '';
            this.chatSuggest.innerHTML = '';
        }
        this.isGenerating = true;
        this.generateBtn.disabled = true;
        this.userInput.disabled = true;
        this.errorMsg.style.display = 'none';
        this.resultSection.style.display = 'none';
        this.statusBox.style.display = 'flex';
        this.startLoadingMessages();

        await this.generate(name, situation);
    }

    startLoadingMessages() {
        let idx = 0;
        this.loadingText.textContent = LOADING_MESSAGES[0];
        this.loadingInterval = setInterval(() => {
            idx = (idx + 1) % LOADING_MESSAGES.length;
            this.loadingText.textContent = LOADING_MESSAGES[idx];
        }, 4000);
    }

    stopLoadingMessages() {
        if (this.loadingInterval) { clearInterval(this.loadingInterval); this.loadingInterval = null; }
    }

    async generate(name, situation) {
        try {
            const userContent = (name ? ('Name: ' + name + '\n\n') : '') + 'Report:\n' + situation;
            const fullText = await this.callAnalysisAPI(MAP_SYSTEM_PROMPT, userContent, 16000);
            const mapHtml = this.extractSingleTab(fullText, 'mapa');
            if (!mapHtml) {
                throw new Error('The model response was not in the expected format (Map tab missing). Try again.');
            }
            this.tabContents.mapa = mapHtml;
            this.rebuildAndRenderReport('mapa');
        } catch (err) {
            this.stopLoadingMessages();
            this.statusBox.style.display = 'none';
            this.errorMsg.innerHTML = '<strong>Error generating analysis:</strong> ' + this.escapeHtml(err.message) + '<br><br>Please try again in a moment.';
            this.errorMsg.style.display = 'block';
        } finally {
            this.stopLoadingMessages();
            this.isGenerating = false;
            this.generateBtn.disabled = false;
            this.userInput.disabled = false;
        }
    }

    async generateTab(tabId) {
        if (!TAB_META[tabId]) return;
        if (this.tabContents[tabId] || this.generatingTab || !this.lastSituation) return;

        this.generatingTab = tabId;
        this.postToFrame({ type: 'tab-loading', tab: tabId, message: TAB_LOADING_MESSAGES[tabId] });

        try {
            const userContent = this.buildTabUserContent(tabId);
            const fullText = await this.callAnalysisAPI(buildTabSystemPrompt(tabId), userContent, 16000);
            const tabHtml = this.extractSingleTab(fullText, tabId);
            if (!tabHtml) {
                throw new Error('Invalid format for ' + TAB_META[tabId].title + '. Try again.');
            }
            this.tabContents[tabId] = tabHtml;
            this.rebuildAndRenderReport(tabId);
            this.showToast(TAB_META[tabId].title + ' ready');
        } catch (err) {
            this.rebuildAndRenderReport(tabId);
            this.showToast('Error: ' + err.message, true);
        } finally {
            this.generatingTab = null;
        }
    }

    buildTabUserContent(tabId) {
        let s = '';
        if (this.lastName) s += 'Name: ' + this.lastName + '\n\n';
        s += 'Report:\n' + this.lastSituation + '\n\n';
        if (this.tabContents.mapa) {
            s += 'Situation Map (already generated — stay consistent):\n';
            s += this.stripHtml(this.tabContents.mapa) + '\n\n';
        }
        s += 'Generate the ' + TAB_META[tabId].title + ' tab now.';
        return s;
    }

    async callAnalysisAPI(systemPrompt, userContent, maxTokens) {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages: [
                    { role: 'system', content: systemPrompt },
                    { role: 'user', content: userContent }
                ],
                max_tokens: maxTokens || 16000,
                temperature: 0.8
            })
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const errData = await response.json().catch(() => ({}));
                const errMsg = typeof errData.error === 'string'
                    ? errData.error
                    : (errData.error && errData.error.message) || response.statusText;
                throw new Error(errMsg);
            }
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith('data: ')) continue;
                const data = trimmed.slice(6);
                if (data === '[DONE]') continue;
                try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content;
                    if (delta) {
                        fullText += delta;
                        if (this.statusBox.style.display === 'flex') {
                            this.loadingCount.textContent = fullText.length.toLocaleString('en-US') + ' characters';
                        }
                    }
                } catch (_) { /* skip malformed chunks */ }
            }
        }
        return fullText;
    }

    extractSingleTab(raw, tabId) {
        let text = raw.trim().replace(/```html/gi, '').replace(/```/g, '').trim();
        const marker = 'id="view-' + tabId + '"';
        const markerIdx = text.indexOf(marker);
        if (markerIdx === -1) return '';
        const divStart = text.lastIndexOf('<div class="tab-view', markerIdx);
        if (divStart === -1) return '';
        text = text.slice(divStart);
        const scriptIdx = text.search(/<script[\s>]/i);
        if (scriptIdx !== -1) text = text.slice(0, scriptIdx);
        text = text.replace(/<\/body>[\s\S]*$/i, '').replace(/<\/html>[\s\S]*$/i, '');
        return this.extractBalancedDiv(text);
    }

    extractBalancedDiv(html) {
        let depth = 0;
        let started = false;
        let end = -1;
        const re = /<div\b[^>]*>|<\/div>/gi;
        let match;
        while ((match = re.exec(html)) !== null) {
            if (match[0].indexOf('</div>') === 0) {
                depth--;
                if (started && depth === 0) {
                    end = match.index + match[0].length;
                    break;
                }
            } else {
                depth++;
                started = true;
            }
        }
        return end === -1 ? '' : html.slice(0, end).trim();
    }

    stripHtml(html) {
        const tmp = document.createElement('div');
        tmp.innerHTML = html;
        return (tmp.textContent || tmp.innerText || '').replace(/\s+/g, ' ').trim().slice(0, 8000);
    }

    rebuildAndRenderReport(activeTab) {
        this.reportHtml = buildReportDocument(this.lastName, this.tabContents);
        const tab = activeTab || 'mapa';
        this.resultFrame.onload = () => {
            this.postToFrame({ type: 'switch-tab', tab: tab });
            this.resultFrame.onload = null;
        };
        this.resultFrame.srcdoc = this.reportHtml;
        this.stopLoadingMessages();
        this.statusBox.style.display = 'none';
        this.resultSection.style.display = 'block';
        if (!this.generatingTab) {
            this.resultSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
        if (this.tabContents.mapa && this.chatHistory.length === 0) {
            this.initChat();
        }
    }

    initChat() {
        this.chatHistory = [];
        this.chatMessages.innerHTML = '';
        const name = this.lastName || 'you';
        const primary = this.extractMapHighlight(this.tabContents.mapa);
        const welcome = primary
            ? `Ready, ${escapeHtmlSafe(name)}. Your map points to <b>${escapeHtmlSafe(primary)}</b> as the main leverage — the place where the smallest move shifts the rest. Ask anything: why these two forces clash, what to do first, how to act without erasing yourself, or request a sample script.`
            : `Ready, ${escapeHtmlSafe(name)}. Your Situation Map is ready. Ask anything about the two forces, your chakras, the prescription, or how to take the first step.`;
        this.appendChat('ai', welcome, true);
        this.chatHistory.push({
            role: 'assistant',
            content: primary
                ? `Ready, ${name}. Your map points to ${primary} as the main leverage. Ask anything about your analysis.`
                : `Ready, ${name}. Your Situation Map is ready. Ask anything about your analysis.`
        });
        this.renderChatSuggestions(primary);
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';
    }

    extractMapHighlight(mapHtml) {
        if (!mapHtml) return '';
        const text = this.stripHtml(mapHtml);
        const primaryMatch = text.match(/Primary[^:]*:\s*([^.|\n]+)/i);
        if (primaryMatch) return primaryMatch[1].trim().slice(0, 80);
        const forceMatch = text.match(/(?:Legitimate force|Force that acts)[^:]*:\s*([^.|\n]+)/i);
        if (forceMatch) return forceMatch[1].trim().slice(0, 80);
        return '';
    }

    renderChatSuggestions(primary) {
        const suggestions = primary
            ? [
                `Why is ${primary} the main focus?`,
                'What are the two forces in conflict?',
                "What's the first practical step?",
                'How do I do this without erasing myself?',
                'Give me a sample script for this situation.'
            ]
            : [
                'What are the two forces in conflict?',
                'Which chakra should I focus on first?',
                "What's the first practical step?",
                'How do I do this without erasing myself?',
                'Give me a sample script for this situation.'
            ];
        this.chatSuggest.innerHTML = suggestions.map(s =>
            `<button type="button" class="chat-chip">${escapeHtmlSafe(s)}</button>`
        ).join('');
        this.chatSuggest.querySelectorAll('.chat-chip').forEach(chip => {
            chip.addEventListener('click', () => {
                if (this.chatStreaming) return;
                this.chatInput.value = chip.textContent;
                this.sendChat();
            });
        });
    }

    appendChat(role, html, isHtml) {
        const wrap = document.createElement('div');
        wrap.className = 'chat-msg ' + (role === 'user' ? 'user' : 'ai');
        const avatar = document.createElement('div');
        avatar.className = 'chat-avatar ' + (role === 'user' ? 'me' : 'ai');
        avatar.textContent = role === 'user' ? 'Me' : '✦';
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = isHtml ? html : renderChatMarkdown(html);
        wrap.appendChild(avatar);
        wrap.appendChild(bubble);
        this.chatMessages.appendChild(wrap);
        this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        return bubble;
    }

    buildChatContext() {
        const tabs = {};
        if (this.tabContents.mapa) tabs.situation_map = this.stripHtml(this.tabContents.mapa).slice(0, 6000);
        if (this.tabContents.completo) tabs.full_report = this.stripHtml(this.tabContents.completo).slice(0, 6000);
        if (this.tabContents.lembretes) tabs.reminders = this.stripHtml(this.tabContents.lembretes).slice(0, 4000);
        if (this.tabContents.acoes) tabs.actions = this.stripHtml(this.tabContents.acoes).slice(0, 4000);
        return {
            name: this.lastName || '',
            situation_report: this.lastSituation,
            generated_tabs: tabs
        };
    }

    buildChatSystemPrompt() {
        const ctx = this.buildChatContext();
        return `You are the Soul Game conversation companion. The person just received a structured analysis of their situation and now wants to GO DEEPER and ASK QUESTIONS. Answer based on the analysis context below.

## HOW TO RESPOND
- English, warm and precise, no mysticism or guru tone. Use the person's name when you have it.
- Keep answers SHORT and direct (2–4 short paragraphs max, or a tight bullet list). Do not repeat the whole report — answer exactly what was asked.
- Use **bold** sparingly for essentials. Bullet lists with "-" are fine.
- Use movement verbs (navigate, hold, cross) — never promise permanent cure (the open ring reopens).
- When it fits, ask ONE question back so they can resonate and go deeper — you are a navigator, not an oracle.

## PRINCIPLES THAT MUST NOT BREAK
- The goal is never "more." It is **proportional to the situation**. The solution is always proportional, never a pole (neither lack nor excess).
- **Integration is not fusion**: fitting in is not becoming what the other wants or erasing yourself.
- **Open ring**: the "after" is not permanent; the next situation reopens the game.
- **Only the individual is measured** — never diagnose the other person involved.
- **Two forces**: name the legitimate force and the brake when relevant.
- **Old Mind × New Mind**: the problem is not knowing — it's that the Old Mind is faster.
- **Positive intention**: the old program protects something they love; it is not the enemy.
- Do not invent numbers or diagnoses that contradict the analysis. If they ask something outside scope, respond with good sense while keeping the method.

## THE 7 CHAKRAS (reference)
Root=security/belonging · Sacral=pleasure/emotion · Solar Plexus=power/identity · Heart=love/connection · Throat=truth/expression · Third Eye=clarity/perception · Crown=purpose/meaning. Each can be Lack, Proportional, or Excess.

## ANALYSIS CONTEXT (base everything on this)
${JSON.stringify(ctx, null, 1)}`;
    }

    async sendChat() {
        if (this.chatStreaming) return;
        const text = this.chatInput.value.trim();
        if (!text) return;
        if (!this.tabContents.mapa) {
            this.appendChat('ai', 'Generate your Situation Map first, then we can talk about your results.', false);
            return;
        }

        this.appendChat('user', text, false);
        this.chatHistory.push({ role: 'user', content: text });
        this.chatInput.value = '';
        this.chatInput.style.height = 'auto';

        this.chatStreaming = true;
        this.chatSend.disabled = true;
        const bubble = this.appendChat('ai', '', true);
        bubble.classList.add('streaming');

        try {
            const messages = [
                { role: 'system', content: this.buildChatSystemPrompt() },
                ...this.chatHistory
            ];
            let acc = '';
            const full = await this.streamChatAPI(messages, (delta) => {
                acc += delta;
                bubble.innerHTML = renderChatMarkdown(acc);
                this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
            });
            bubble.classList.remove('streaming');
            bubble.innerHTML = renderChatMarkdown(full || acc);
            this.chatHistory.push({ role: 'assistant', content: full || acc });
        } catch (err) {
            bubble.classList.remove('streaming');
            bubble.innerHTML = renderChatMarkdown('I had trouble answering right now: ' + (err.message || err) + '\n\nPlease try again in a moment.');
        } finally {
            this.chatStreaming = false;
            this.chatSend.disabled = false;
            this.chatMessages.scrollTop = this.chatMessages.scrollHeight;
        }
    }

    async streamChatAPI(messages, onDelta) {
        const response = await fetch(API_ENDPOINT, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                messages,
                max_tokens: 1400,
                temperature: 0.7
            })
        });

        if (!response.ok) {
            const contentType = response.headers.get('content-type') || '';
            if (contentType.includes('application/json')) {
                const errData = await response.json().catch(() => ({}));
                const errMsg = typeof errData.error === 'string'
                    ? errData.error
                    : (errData.error && errData.error.message) || response.statusText;
                throw new Error(errMsg);
            }
            throw new Error('Error ' + response.status + ': ' + response.statusText);
        }

        const reader = response.body.getReader();
        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';

        while (true) {
            const { done, value } = await reader.read();
            if (done) break;
            buffer += decoder.decode(value, { stream: true });
            const lines = buffer.split('\n');
            buffer = lines.pop() || '';
            for (const line of lines) {
                const trimmed = line.trim();
                if (!trimmed || !trimmed.startsWith('data: ')) continue;
                const data = trimmed.slice(6);
                if (data === '[DONE]') continue;
                try {
                    const parsed = JSON.parse(data);
                    const delta = parsed.choices && parsed.choices[0] && parsed.choices[0].delta && parsed.choices[0].delta.content;
                    if (delta) {
                        fullText += delta;
                        if (onDelta) onDelta(delta);
                    }
                } catch (_) { /* skip malformed chunks */ }
            }
        }
        return fullText;
    }

    postToFrame(msg) {
        if (this.resultFrame.contentWindow) {
            this.resultFrame.contentWindow.postMessage(Object.assign({ source: 'soul-game-parent' }, msg), '*');
        }
    }

    renderResult() {
        this.rebuildAndRenderReport('mapa');
    }

    downloadHTML() {
        if (!this.reportHtml) return;
        const slug = (this.lastName ? this.lastName.toLowerCase().normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '') : 'analysis');
        const date = new Date().toISOString().slice(0, 10);
        this.downloadFile(this.reportHtml, 'soul-game-' + slug + '-' + date + '.html', 'text/html');
    }

    openInNewTab() {
        if (!this.reportHtml) return;
        const blob = new Blob([this.reportHtml], { type: 'text/html;charset=utf-8' });
        const url = URL.createObjectURL(blob);
        window.open(url, '_blank');
        setTimeout(() => URL.revokeObjectURL(url), 60000);
    }

    downloadFile(content, filename, mimeType) {
        const blob = new Blob([content], { type: mimeType + ';charset=utf-8' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = filename;
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        URL.revokeObjectURL(url);
    }

    resetForm() {
        this.userInput.value = '';
        this.nameInput.value = '';
        this.charCount.textContent = '';
        this.reportHtml = '';
        this.lastSituation = '';
        this.tabContents = { mapa: null, completo: null, lembretes: null, acoes: null };
        this.generatingTab = null;
        this.chatHistory = [];
        this.chatMessages.innerHTML = '';
        this.chatSuggest.innerHTML = '';
        this.resultFrame.srcdoc = '';
        this.resultSection.style.display = 'none';
        this.errorMsg.style.display = 'none';
        document.getElementById('ferramenta').scrollIntoView({ behavior: 'smooth' });
        this.userInput.focus();
    }

    escapeHtml(text) {
        const div = document.createElement('div');
        div.textContent = text;
        return div.innerHTML;
    }

    showToast(message, isError) {
        const existing = document.querySelector('.toast');
        if (existing) existing.remove();
        const toast = document.createElement('div');
        toast.className = 'toast ' + (isError ? 'toast-error' : 'toast-success');
        toast.textContent = message;
        document.body.appendChild(toast);
        requestAnimationFrame(() => toast.classList.add('show'));
        setTimeout(() => { toast.classList.remove('show'); setTimeout(() => toast.remove(), 300); }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new JogoDaAlmaGerador();

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => { if (entry.isIntersecting) entry.target.classList.add('visible'); });
    }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });
    document.querySelectorAll('.animate-in').forEach(el => observer.observe(el));
});
