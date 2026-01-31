// mobile/app.js — small helpers for switching views
function $id(id){ return document.getElementById(id) }

document.addEventListener('DOMContentLoaded', ()=>{
  const btnForm = $id('btn-form')
  const btnPreview = $id('btn-preview')
  const btnExport = $id('btn-export')
  const sectionForm = document.querySelector('.builder')
  const sectionPreview = $id('mobile-preview')

  function showForm(){ sectionForm.style.display = ''; sectionPreview.style.display = 'none' }
  function showPreview(){ sectionForm.style.display = 'none'; sectionPreview.style.display = ''; }

  btnForm.addEventListener('click', ()=>{ showForm(); window.scrollTo({top:0,behavior:'smooth'}) })
  btnPreview.addEventListener('click', ()=>{ showPreview(); window.scrollTo({top:0,behavior:'smooth'}) })
  btnExport.addEventListener('click', ()=>{ // trigger export from shared script
    if(typeof exportPDF === 'function'){ exportPDF() }
    else { window.print() }
  })

  // small handler: nav-preview (header) toggles preview
  const navPreview = $id('nav-preview')
  if(navPreview) navPreview.addEventListener('click', ()=>{ showPreview(); window.scrollTo({top:0,behavior:'smooth'}) })

  // Beforeinstallprompt install flow: show header install button if available
  let deferredPrompt
  const btnInstall = $id('btn-install')
  window.addEventListener('beforeinstallprompt', (e)=>{
    e.preventDefault(); deferredPrompt = e; if(btnInstall) btnInstall.style.display = '';
  })
  if(btnInstall){ btnInstall.addEventListener('click', async ()=>{
    if(!deferredPrompt) return
    deferredPrompt.prompt()
    const choice = await deferredPrompt.userChoice
    deferredPrompt = null
    btnInstall.style.display = 'none'
  }) }
})
