const $ = (selector) => document.querySelector(selector);
const $$ = (selector) => Array.from(document.querySelectorAll(selector));

// ── EmailJS ────────────────────────────────────────────────────
const EMAILJS_SERVICE_ID  = "service_c9wmx7z";
const EMAILJS_TEMPLATE_ID = "template_uewz39r";
const EMAILJS_PUBLIC_KEY  = "6mdmLa2PSXvc1BBOX";

const state = {
  activeService: null,
  checks: JSON.parse(localStorage.getItem("aztekiller-checks") || "{}"),
  activeFileId: localStorage.getItem("aztekiller-active-file") || null,
  importData: null,
  caseListMode: "active", // "active" | "history"
};

const universalSteps = [
  "Registrar hora, fecha, URL, usuario afectado, teléfono/correo de recuperación y último acceso legítimo.",
  "Cambiar contraseña desde un dispositivo limpio y activar 2FA con app autenticadora o llave física.",
  "Cerrar sesiones abiertas en todos los dispositivos y revisar apps conectadas, tokens, extensiones y reglas.",
  "Revisar correo y teléfono de recuperación; eliminar datos desconocidos y guardar capturas antes de borrar.",
  "Avisar a contactos/clientes con un mensaje corto para evitar estafas, pagos falsos o enlaces maliciosos.",
  "Documentar folios de soporte, enlaces enviados, respuestas y tiempos de espera.",
  "Después de recuperar acceso, auditar publicaciones, mensajes, reenvíos, filtros, permisos y facturación.",
  "Si hay amenazas, extorsión o datos sensibles, preservar evidencia y preparar reporte legal/plataforma."
];

const sharedFallbacks = [
  { label: "No insistir con contraseñas viejas si hay bloqueo temporal; esperar el tiempo indicado por la plataforma.", url: "" },
  { label: "Probar recuperación desde dispositivo, ubicación y red usados normalmente por el dueño real.", url: "" },
  { label: "Si soporte pide prueba de identidad, enviar solo por canales oficiales y guardar folio.", url: "" },
  { label: "Si el atacante cambió datos, buscar avisos de seguridad en correos antiguos para revertir cambios.", url: "" }
];

const baseSteps = {
  social: [
    "Abrir el enlace oficial de cuenta hackeada o recuperación.",
    "Intentar recuperar con correo, teléfono, usuario y dispositivo reconocido.",
    "Cambiar contraseña y cerrar todas las sesiones abiertas.",
    "Activar 2FA; preferir app autenticadora o llave física en vez de SMS.",
    "Revisar correos, teléfonos, usuarios, administradores, apps conectadas y permisos publicitarios.",
    "Eliminar publicaciones, mensajes, historias, anuncios o enlaces que no sean legítimos.",
    "Publicar aviso de control recuperado si hubo mensajes fraudulentos.",
    "Guardar evidencia y folios si se requiere escalación."
  ],
  email: [
    "Abrir recuperación oficial del proveedor desde navegador limpio.",
    "Recuperar acceso con teléfono, correo alterno, passkey o preguntas disponibles.",
    "Cambiar contraseña por una nueva y única; guardar en gestor seguro.",
    "Cerrar sesiones, revocar dispositivos, apps OAuth, contraseñas de aplicación y tokens.",
    "Revisar reenvíos, filtros, reglas, alias, firmas y respuestas automáticas.",
    "Revisar papelera, enviados y seguridad para detectar robo de cuentas vinculadas.",
    "Activar 2FA y descargar códigos de respaldo.",
    "Usar el correo recuperado para restablecer redes, bancos y servicios importantes."
  ],
  web: [
    "Poner el sitio en modo mantenimiento si hay contenido alterado o malware visible.",
    "Cambiar accesos de hosting, CMS, FTP/SFTP, SSH, panel DNS y base de datos.",
    "Revisar usuarios administradores, plugins, temas, archivos recientes y tareas programadas.",
    "Restaurar desde respaldo limpio y actualizar CMS, plugins, dependencias y permisos.",
    "Rotar llaves API, secretos, credenciales SMTP, tokens y claves de pago.",
    "Solicitar revisión de malware/lista negra si Google, navegador o antivirus bloquean el sitio.",
    "Revisar DNS, registros MX, CNAME, redirecciones y dominios agregados.",
    "Documentar cambios y preparar reporte para cliente o proveedor."
  ],
  content: [
    "Guardar evidencia: URLs, capturas, fecha, usuario que publica, búsquedas y mensajes.",
    "No negociar dentro de canales no oficiales; priorizar reporte y preservación de evidencia.",
    "Reportar contenido en la plataforma donde aparece y pedir retirada por privacidad, suplantación o derechos.",
    "Solicitar desindexación en buscadores cuando el contenido ya fue retirado o expone datos personales.",
    "Si hay material íntimo, menor de edad, extorsión o amenaza, escalar por canal especializado.",
    "Monitorear re-subidas con búsquedas exactas del nombre, usuario, teléfono, imagen y frases clave.",
    "Avisar a cuentas cercanas para no compartir, reenviar ni interactuar con la filtración.",
    "Cerrar el caso solo cuando haya evidencia de retirada o folio de escalación activo."
  ],
  identity: [
    "Confirmar si se trata de suplantación, robo de documento, SIM swap, pago fraudulento o dispositivo perdido.",
    "Bloquear accesos principales: correo, teléfono, banco, nube y redes.",
    "Contactar proveedor crítico por canal oficial y pedir bloqueo/revisión de actividad.",
    "Cambiar contraseñas, activar 2FA y cerrar sesiones en servicios relacionados.",
    "Guardar evidencia de movimientos, mensajes, llamadas, IPs, folios y capturas.",
    "Solicitar baja de perfiles falsos o anuncios fraudulentos.",
    "Revisar reportes de crédito, métodos de pago, cargos, envíos y direcciones nuevas.",
    "Preparar carpeta con evidencia para denuncia o soporte avanzado."
  ]
};

const data = {
  social: [
    ["Facebook", "Cuenta comprometida, perfil robado, publicaciones o anuncios fraudulentos.", "Critico", [["Recuperar Facebook", "https://m.facebook.com/login/identify"], ["Cuenta hackeada", "https://m.facebook.com/login/identify"]]],
    ["Instagram", "Cuenta hackeada, cambio de correo, robo de usuario o contenido fraudulento.", "Critico", [["Instagram hacked", "https://www.instagram.com/hacked/"], ["Restablecer password", "https://www.instagram.com/accounts/password/reset/"]]],
    ["X / Twitter", "Cuenta comprometida, correo cambiado o publicaciones no autorizadas.", "Alta", [["Restablecer password", "https://x.com/account/begin_password_reset"], ["Cuenta hackeada", "https://x.com/account/begin_password_reset"]]],
    ["TikTok", "Acceso perdido, cambios no autorizados o directos/publicaciones fraudulentas.", "Alta", [["Seguridad de cuenta", "https://support.tiktok.com/en/safety-hc/account-and-user-safety/account-safety"], ["Reportar problema", "https://www.tiktok.com/legal/report/feedback"]]],
    ["LinkedIn", "Perfil profesional comprometido, mensajes falsos o cambios de correo.", "Alta", [["Cuenta comprometida", "https://www.linkedin.com/help/linkedin/answer/a1340409"], ["Verificación identidad", "https://www.linkedin.com/help/linkedin/answer/a1339781"]]],
    ["Snapchat", "Acceso perdido, teléfono/correo cambiado o spam enviado.", "Alta", [["Cuenta comprometida", "https://help.snapchat.com/hc/en-us/articles/7012305621908"], ["Soporte", "https://help.snapchat.com/hc/en-us/articles/7012305621908"]]],
    ["Reddit", "Cuenta tomada, cambios de correo o actividad desconocida.", "Media", [["Reportar en Reddit", "https://www.reddit.com/report"], ["Solicitar ayuda", "https://www.reddit.com/report"]]],
    ["Pinterest", "Perfil comprometido o pines/mensajes no autorizados.", "Media", [["Cuenta comprometida", "https://help.pinterest.com/en/article/protect-your-account"], ["Contacto", "https://help.pinterest.com/en/contact"]]],
    ["YouTube", "Canal tomado, videos subidos, cambios de marca o strikes fraudulentos.", "Critico", [["Recuperar cuenta Google", "https://accounts.google.com/signin/recovery"], ["Cuenta YouTube hackeada", "https://support.google.com/youtube/answer/76187"]]],
    ["WhatsApp", "Cuenta registrada en otro teléfono, SIM swap o código robado.", "Critico", [["Cuenta robada", "https://faq.whatsapp.com/"], ["Contactar soporte", "https://www.whatsapp.com/contact/"]]],
    ["Telegram", "Sesión ajena, número tomado o chats sensibles.", "Alta", [["FAQ seguridad", "https://telegram.org/faq#q-what-do-i-do-if-my-account-is-hacked"], ["Soporte", "https://telegram.org/support"]]],
    ["Discord", "Token robado, servidor tomado, spam o Nitro fraudulento.", "Alta", [["Seguridad Discord", "https://discord.com/safety"], ["Cuenta comprometida", "https://discord.com/safety"]]],
    ["Twitch", "Canal tomado, stream no autorizado o pagos alterados.", "Alta", [["Cuenta comprometida", "https://help.twitch.tv/s/article/account-hacked"], ["Soporte", "https://help.twitch.tv/s/contactsupport"]]],
    ["Kick", "Canal comprometido o cambios de cuenta.", "Media", [["Soporte Kick", "https://help.kick.com/en/"], ["Enviar solicitud", "https://help.kick.com/en/articles/7066931-contact-us"]]],
    ["Threads", "Cuenta ligada a Instagram comprometida.", "Alta", [["Instagram hacked", "https://www.instagram.com/hacked/"], ["Restablecer Instagram", "https://www.instagram.com/accounts/password/reset/"]]],
    ["Tumblr", "Blog tomado, correo cambiado o publicaciones spam.", "Media", [["Cuenta hackeada", "https://help.tumblr.com/hc/en-us/articles/231256548"], ["Soporte", "https://www.tumblr.com/support"]]],
    ["Steam", "Cuenta gaming robada, inventario o pagos en riesgo.", "Alta", [["Steam recovery", "https://help.steampowered.com/en/wizard/HelpWithLogin"], ["Seguridad Steam", "https://help.steampowered.com/en/faqs/view/6639-EB3C-EC79-FF60"]]],
    ["PlayStation", "Cuenta PSN tomada o compras no autorizadas.", "Alta", [["Restablecer PSN", "https://www.playstation.com/support/account/password-reset-psn/"], ["Soporte cuenta", "https://www.playstation.com/support/account/"]]],
    ["Quora", "Cuenta comprometida o respuestas/mensajes falsos.", "Media", [["Quora recovery", "https://www.quora.com/"], ["Recuperar acceso", "https://www.quora.com/"]]],
    ["Medium", "Publicaciones o acceso no autorizado.", "Media", [["Medium recovery", "https://medium.com/"], ["Contacto", "https://help.medium.com/"]]]
  ],
  email: [
    ["Gmail / Google", "Correo principal, YouTube, Drive, Ads y Android vinculados.", "Critico", [["Recuperar Google", "https://accounts.google.com/signin/recovery"], ["Cuenta hackeada", "https://support.google.com/accounts/answer/6294825"]]],
    ["Outlook / Hotmail", "Microsoft, OneDrive, Xbox, Office y correo comprometidos.", "Critico", [["Recuperación Microsoft", "https://account.live.com/acsr"], ["Cuenta hackeada", "https://support.microsoft.com/account-billing/how-to-recover-a-hacked-or-compromised-microsoft-account-24ca907d-bcdf-a44b-4656-47f0cd89c245"]]],
    ["iCloud / Apple ID", "Apple ID, iPhone, iCloud, compras y dispositivos.", "Critico", [["iforgot Apple", "https://iforgot.apple.com/"], ["Apple ID comprometido", "https://support.apple.com/102560"]]],
    ["Proton Mail", "Correo cifrado, recuperación limitada si no hay métodos previos.", "Alta", [["Reset Proton", "https://account.proton.me/login?flow=reset"], ["Ayuda Proton", "https://proton.me/support/reset-password"]]],
    ["Yahoo Mail", "Correo Yahoo y servicios vinculados.", "Alta", [["Yahoo forgot", "https://login.yahoo.com/forgot"], ["Cuenta comprometida", "https://help.yahoo.com/kb/account"]]],
    ["AOL Mail", "Correo AOL comprometido.", "Media", [["AOL forgot", "https://login.aol.com/forgot"], ["Ayuda AOL", "https://help.aol.com/products/aol-mail"]]],
    ["Zoho Mail", "Correo empresarial o dominio administrado en Zoho.", "Alta", [["Zoho password", "https://accounts.zoho.com/password"], ["Soporte Zoho", "https://help.zoho.com/portal/en/home"]]],
    ["Fastmail", "Correo premium o dominio personal.", "Alta", [["Recuperación Fastmail", "https://www.fastmail.help/hc/en-us/articles/1500000279921"], ["Soporte", "https://support.fastmail.com/"]]],
    ["Tuta / Tutanota", "Correo cifrado con código de recuperación.", "Alta", [["Recuperar Tuta", "https://app.tuta.com/recover"], ["Ayuda Tuta", "https://tuta.com/support"]]],
    ["GMX", "Correo GMX comprometido.", "Media", [["Recuperación GMX", "https://www.gmx.com/security/password/"], ["Ayuda GMX", "https://support.gmx.com/"]]],
    ["Mail.com", "Correo mail.com comprometido.", "Media", [["Recuperación Mail.com", "https://support.mail.com/"], ["Ayuda Mail.com", "https://support.mail.com/"]]],
    ["Yandex Mail", "Correo Yandex comprometido.", "Media", [["Recuperación Yandex", "https://passport.yandex.com/restoration"], ["Ayuda Yandex", "https://yandex.com/support/passport/"]]],
    ["Hey", "Correo HEY comprometido.", "Media", [["Soporte HEY", "https://www.hey.com/support/"], ["Login", "https://app.hey.com/"]]],
    ["Rackspace Email", "Correo empresarial administrado.", "Alta", [["Soporte Rackspace", "https://docs.rackspace.com/docs/how-to-contact-rackspace-support"], ["Login", "https://apps.rackspace.com/"]]],
    ["GoDaddy Email", "Correo de dominio, Microsoft 365 o Workspace.", "Alta", [["Recuperar GoDaddy", "https://sso.godaddy.com/account/reset"], ["Ayuda GoDaddy", "https://www.godaddy.com/help"]]],
    ["Namecheap Private Email", "Correo de dominio administrado en Namecheap.", "Media", [["Soporte Namecheap", "https://www.namecheap.com/support/knowledgebase/category/217/private-email/"], ["Login", "https://privateemail.com/"]]],
    ["Correo corporativo", "Exchange, Google Workspace u otro proveedor interno.", "Critico", [["Microsoft admin", "https://admin.microsoft.com/"], ["Google Admin", "https://admin.google.com/"]]],
    ["Comcast Xfinity", "Correo de proveedor ISP.", "Media", [["Soporte Xfinity", "https://www.xfinity.com/support/"], ["Reset Xfinity", "https://www.xfinity.com/support/"]]],
    ["AT&T Mail", "Correo de proveedor ISP.", "Media", [["Soporte AT&T", "https://www.att.com/support/email-support/"], ["Reset AT&T", "https://www.att.com/support/email-support/"]]],
    ["Spectrum Mail", "Correo de proveedor ISP.", "Media", [["Spectrum sign in", "https://www.spectrum.net/"], ["Soporte Spectrum", "https://www.spectrum.net/support"]]]
  ],
  web: [
    ["WordPress", "Sitio alterado, admin tomado, plugins maliciosos o redirecciones.", "Critico", [["Hardening WordPress", "https://developer.wordpress.org/advanced-administration/security/hardening/"], ["Wordfence learning", "https://www.wordfence.com/learn/"]]],
    ["Wix", "Sitio o dominio administrado en Wix.", "Alta", [["Recuperar Wix", "https://support.wix.com/en/article/logging-in-to-your-wix-account"], ["Soporte Wix", "https://support.wix.com/"]]],
    ["Squarespace", "Sitio, dominio o tienda comprometida.", "Alta", [["Cuenta Squarespace", "https://support.squarespace.com/hc/en-us/articles/205815898"], ["Soporte", "https://support.squarespace.com/hc/en-us"]]],
    ["Shopify", "Tienda, pagos, usuarios o dominio en riesgo.", "Critico", [["Soporte Shopify", "https://www.shopify.com/mx/contacto"], ["Contacto Shopify", "https://www.shopify.com/mx/contacto"]]],
    ["Cloudflare", "DNS, WAF, dominio o tunnel comprometido.", "Critico", [["Cuenta Cloudflare", "https://developers.cloudflare.com/fundamentals/setup/account/account-security/"], ["Soporte", "https://developers.cloudflare.com/fundamentals/setup/account/account-security/"]]],
    ["GoDaddy Dominio", "Dominio, DNS, hosting o email tomado.", "Critico", [["Recuperar acceso", "https://sso.godaddy.com/account/reset"], ["Ayuda cuenta", "https://www.godaddy.com/help"]]],
    ["Namecheap Dominio", "Dominio, DNS o hosting comprometido.", "Critico", [["Cuenta Namecheap", "https://www.namecheap.com/support/knowledgebase/article.aspx/270/46/"], ["Soporte", "https://www.namecheap.com/support/knowledgebase/"]]],
    ["cPanel", "Hosting compartido, FTP, archivos o correos alterados.", "Alta", [["Seguridad cPanel", "https://docs.cpanel.net/knowledge-base/security/"], ["Documentación", "https://docs.cpanel.net/"]]],
    ["GitHub", "Repositorio, Pages, tokens o secrets filtrados.", "Critico", [["Recuperar GitHub", "https://docs.github.com/en/authentication/securing-your-account-with-two-factor-authentication-2fa/recovering-your-account-if-you-lose-your-2fa-credentials"], ["Cuenta comprometida", "https://docs.github.com/en/authentication/keeping-your-account-and-data-secure/preventing-unauthorized-access"]]],
    ["Google Search Console", "Propiedad tomada, sitemap spam o desindexación.", "Alta", [["Search Console", "https://search.google.com/search-console"], ["Sitio hackeado", "https://support.google.com/websearch/answer/6223687?hl=en"]]]
  ],
  content: [
    ["Google Search", "Eliminar resultados con datos personales, doxxing o contenido retirado.", "Alta", [["Remociones Google", "https://support.google.com/websearch/troubleshooter/3111061"], ["Contenido obsoleto", "https://search.google.com/search-console/remove-outdated-content"]]],
    ["Meta contenido", "Reportar suplantación, imágenes, amenazas o contenido privado en Facebook/Instagram.", "Alta", [["Reportes Meta", "https://m.facebook.com/login/identify"], ["Instagram privacy", "https://privacycenter.instagram.com/"]]],
    ["X contenido", "Reportar doxxing, imagen privada, amenazas o suplantación.", "Alta", [["Recuperar X", "https://x.com/account/begin_password_reset"], ["Restablecer X", "https://x.com/account/begin_password_reset"]]],
    ["TikTok contenido", "Reportar contenido abusivo, privado o suplantación.", "Alta", [["Reportar TikTok", "https://www.tiktok.com/legal/report/feedback"], ["Centro seguridad", "https://support.tiktok.com/en/safety-hc"]]],
    ["Reddit contenido", "Reportar doxxing, abuso, suplantación o imagen íntima.", "Alta", [["Reportar Reddit", "https://www.reddit.com/report"], ["Centro de ayuda", "https://www.reddit.com/report"]]],
    ["Discord abuso", "Reportar servidor, mensajes o amenazas.", "Alta", [["Reportar abuso", "https://discord.com/safety"], ["Seguridad", "https://discord.com/safety"]]],
    ["YouTube video", "Reportar video, privacidad, copyright o suplantación.", "Alta", [["Reportar YouTube", "https://support.google.com/youtube/answer/2802027"], ["Privacidad", "https://support.google.com/youtube/answer/142443"]]],
    ["DMCA / copyright", "Retirar copias de contenido propio o marca.", "Media", [["Google copyright", "https://support.google.com/legal/troubleshooter/1114905"], ["YouTube copyright", "https://support.google.com/youtube/answer/2807622"]]],
    ["StopNCII", "Prevención de re-subida de imagen íntima no consensuada para adultos.", "Critico", [["StopNCII", "https://stopncii.org/"], ["Ayuda", "https://stopncii.org/faq/"]]],
    ["NCMEC CyberTipline", "Material de menor de edad o explotación infantil.", "Critico", [["CyberTipline", "https://report.cybertip.org/"], ["NCMEC", "https://www.missingkids.org/gethelpnow/cybertipline"]]]
  ],
  identity: [
    ["Suplantación general", "Perfil falso, nombre/fotos robadas o estafa usando identidad.", "Alta", [["Google remociones", "https://support.google.com/websearch/troubleshooter/3111061"], ["FTC identity theft", "https://www.identitytheft.gov/"]]],
    ["SIM swap", "Número robado, SMS desviados o WhatsApp/2FA en riesgo.", "Critico", [["FTC SIM swap", "https://consumer.ftc.gov/consumer-alerts/2019/10/sim-swap-scams-how-protect-yourself"], ["WhatsApp robado", "https://faq.whatsapp.com/"]]],
    ["Bancos / pagos", "Cargos no reconocidos, tarjetas, PayPal o métodos de pago.", "Critico", [["PayPal seguridad", "https://www.paypal.com/us/security/report-suspicious-messages"], ["FTC fraude", "https://reportfraud.ftc.gov/"]]],
    ["Dispositivo perdido", "Teléfono o laptop robado con sesiones abiertas.", "Critico", [["Find My Apple", "https://www.icloud.com/find"], ["Find My Device Google", "https://www.google.com/android/find/"]]],
    ["Malware / infostealer", "Robo masivo de sesiones, cookies, passwords o wallets.", "Critico", [["Microsoft Safety Scanner", "https://learn.microsoft.com/en-us/defender-endpoint/safety-scanner-download"], ["Google seguridad", "https://myaccount.google.com/security"]]],
    ["Cripto / wallets", "Seed phrase, exchange o wallet comprometida.", "Critico", [["Coinbase seguridad", "https://www.coinbase.com/security"], ["Binance soporte", "https://www.binance.com/en/support"]]]
  ]
};

const categories = [
  ["social",   "Hackeo de red social",       "Instagram, Facebook, TikTok, X, WhatsApp, Discord y más.", data.social.length   + " flujos"],
  ["email",    "Hackeo de correo",            "Gmail, Hotmail, iCloud, Proton, Yahoo y correos corporativos.", data.email.length  + " flujos"],
  ["web",      "Página, dominio o hosting",   "WordPress, Shopify, Cloudflare, DNS, GitHub y administradores.", data.web.length  + " flujos"],
  ["content",  "Filtración o contenido",      "Remoción, doxxing, suplantación, privacidad y derechos.", data.content.length   + " flujos"],
  ["identity", "Identidad y dispositivos",    "SIM swap, bancos, malware, dispositivos y suplantación.", data.identity.length  + " flujos"]
];

const serviceLogos = {
  "Facebook": "https://www.google.com/s2/favicons?domain=facebook.com&sz=128",
  "Instagram": "https://www.google.com/s2/favicons?domain=instagram.com&sz=128",
  "X / Twitter": "https://www.google.com/s2/favicons?domain=x.com&sz=128",
  "TikTok": "https://www.google.com/s2/favicons?domain=tiktok.com&sz=128",
  "LinkedIn": "https://www.google.com/s2/favicons?domain=linkedin.com&sz=128",
  "Snapchat": "https://www.google.com/s2/favicons?domain=snapchat.com&sz=128",
  "Reddit": "https://www.google.com/s2/favicons?domain=reddit.com&sz=128",
  "Pinterest": "https://www.google.com/s2/favicons?domain=pinterest.com&sz=128",
  "YouTube": "https://www.google.com/s2/favicons?domain=youtube.com&sz=128",
  "WhatsApp": "https://www.google.com/s2/favicons?domain=whatsapp.com&sz=128",
  "Telegram": "https://www.google.com/s2/favicons?domain=telegram.org&sz=128",
  "Discord": "https://www.google.com/s2/favicons?domain=discord.com&sz=128",
  "Twitch": "https://www.google.com/s2/favicons?domain=twitch.tv&sz=128",
  "Kick": "https://www.google.com/s2/favicons?domain=kick.com&sz=128",
  "Threads": "https://www.google.com/s2/favicons?domain=threads.net&sz=128",
  "Tumblr": "https://www.google.com/s2/favicons?domain=tumblr.com&sz=128",
  "Steam": "https://www.google.com/s2/favicons?domain=steampowered.com&sz=128",
  "PlayStation": "https://www.google.com/s2/favicons?domain=playstation.com&sz=128",
  "Quora": "https://www.google.com/s2/favicons?domain=quora.com&sz=128",
  "Medium": "https://www.google.com/s2/favicons?domain=medium.com&sz=128",
  "Gmail / Google": "https://www.google.com/s2/favicons?domain=mail.google.com&sz=128",
  "Outlook / Hotmail": "https://www.google.com/s2/favicons?domain=outlook.live.com&sz=128",
  "iCloud / Apple ID": "https://www.google.com/s2/favicons?domain=icloud.com&sz=128",
  "Proton Mail": "https://www.google.com/s2/favicons?domain=proton.me&sz=128",
  "Yahoo Mail": "https://www.google.com/s2/favicons?domain=mail.yahoo.com&sz=128",
  "AOL Mail": "https://www.google.com/s2/favicons?domain=aol.com&sz=128",
  "Zoho Mail": "https://www.google.com/s2/favicons?domain=zoho.com&sz=128",
  "Fastmail": "https://www.google.com/s2/favicons?domain=fastmail.com&sz=128",
  "Tuta / Tutanota": "https://www.google.com/s2/favicons?domain=tuta.com&sz=128",
  "GMX": "https://www.google.com/s2/favicons?domain=gmx.com&sz=128",
  "Mail.com": "https://www.google.com/s2/favicons?domain=mail.com&sz=128",
  "Yandex Mail": "https://www.google.com/s2/favicons?domain=yandex.com&sz=128",
  "Hey": "https://www.google.com/s2/favicons?domain=hey.com&sz=128",
  "Rackspace Email": "https://www.google.com/s2/favicons?domain=rackspace.com&sz=128",
  "GoDaddy Email": "https://www.google.com/s2/favicons?domain=godaddy.com&sz=128",
  "Namecheap Private Email": "https://www.google.com/s2/favicons?domain=namecheap.com&sz=128",
  "WordPress": "https://www.google.com/s2/favicons?domain=wordpress.org&sz=128",
  "Shopify": "https://www.google.com/s2/favicons?domain=shopify.com&sz=128",
  "Cloudflare": "https://www.google.com/s2/favicons?domain=cloudflare.com&sz=128",
  "GitHub": "https://www.google.com/s2/favicons?domain=github.com&sz=128",
  "Google Search Console": "https://www.google.com/s2/favicons?domain=search.google.com&sz=128",
  "StopNCII": "https://www.google.com/s2/favicons?domain=stopncii.org&sz=128",
  "NCMEC CyberTipline": "https://www.google.com/s2/favicons?domain=missingkids.org&sz=128",
};

const statusConfig = {
  abierto:     { label: "Abierto",      emoji: "🔴", cls: "status-abierto"     },
  en_progreso: { label: "En progreso",  emoji: "🟡", cls: "status-en_progreso" },
  resuelto:    { label: "Resuelto",     emoji: "🟢", cls: "status-resuelto"    },
  cerrado:     { label: "Cerrado",      emoji: "⚫", cls: "status-cerrado"     },
};

// ── Helpers ──────────────────────────────────────────────────────────────────

function serviceObject(category, item) {
  return { category, name: item[0], desc: item[1], priority: item[2], links: item[3], steps: baseSteps[category], fallbacks: sharedFallbacks };
}

function generateCaseNumber() {
  const year = new Date().getFullYear();
  const prefix = `AZK-${year}-`;
  let max = 0;
  getFiles().forEach((f) => {
    if (f.fileNumber?.startsWith(prefix)) {
      const n = parseInt(f.fileNumber.slice(prefix.length), 10);
      if (!isNaN(n) && n > max) max = n;
    }
  });
  return `${prefix}${String(max + 1).padStart(4, "0")}`;
}

function fileFields() {
  return ["fileNumber", "caseName2", "fileEmail", "filePhone", "notifyEmail", "fileUsername", "casePriority2", "caseStatus", "fileContacts", "fileData", "caseSummary2", "caseNotes"];
}

function getFiles() { return JSON.parse(localStorage.getItem("aztekiller-files") || "[]"); }
function setFiles(files) { localStorage.setItem("aztekiller-files", JSON.stringify(files)); }

function readFileForm() {
  const get = (id) => { const el = $("#" + id); return el ? el.value.trim() : ""; };
  return {
    id: state.activeFileId || crypto.randomUUID(),
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    fileNumber:   get("fileNumber"),
    caseName:     get("caseName2"),
    fileEmail:    get("fileEmail"),
    filePhone:    get("filePhone"),
    notifyEmail:  get("notifyEmail"),
    fileUsername: get("fileUsername"),
    casePriority: get("casePriority2"),
    caseStatus:   get("caseStatus") || "abierto",
    fileContacts: get("fileContacts"),
    fileData:     get("fileData"),
    caseSummary:  get("caseSummary2"),
    caseNotes:    get("caseNotes"),
  };
}

function writeFileForm(payload = {}) {
  const set = (id, val) => { const el = $("#" + id); if (el) el.value = val || ""; };
  set("fileNumber",    payload.fileNumber);
  set("caseName2",     payload.caseName);
  set("fileEmail",     payload.fileEmail);
  set("filePhone",     payload.filePhone);
  set("notifyEmail",   payload.notifyEmail);
  set("fileUsername",  payload.fileUsername);
  set("casePriority2", payload.casePriority || "Critica");
  set("caseStatus",    payload.caseStatus || "abierto");
  set("fileContacts",  payload.fileContacts);
  set("fileData",      payload.fileData);
  set("caseSummary2",  payload.caseSummary);
  set("caseNotes",     payload.caseNotes);
  const title = $("#activeFileTitle");
  if (title) title.textContent = payload.fileNumber ? `Expediente ${payload.fileNumber}` : "Expediente nuevo";
}

function saveCase() {
  const file = readFileForm();
  if (!file.fileNumber && !file.caseName && !file.fileEmail && !file.filePhone) return;
  const files = getFiles();
  const idx = files.findIndex((f) => f.id === file.id || (file.fileNumber && f.fileNumber === file.fileNumber));
  const prev = idx >= 0 ? files[idx] : {};
  const merged = { ...prev, ...file, id: prev.id || file.id, createdAt: prev.createdAt || file.createdAt, updatedAt: new Date().toISOString() };
  if (idx >= 0) files[idx] = merged; else files.unshift(merged);
  state.activeFileId = merged.id;
  localStorage.setItem("aztekiller-active-file", merged.id);
  setFiles(files);
  writeFileForm(merged);
  renderFileResults();
  renderCaseStatsBar();
}

function loadCase() {
  const files = getFiles();
  const legacy = JSON.parse(localStorage.getItem("aztekiller-case") || "{}");
  const active = files.find((f) => f.id === state.activeFileId) || files[0] || legacy;
  if (active?.id) { state.activeFileId = active.id; localStorage.setItem("aztekiller-active-file", active.id); }
  writeFileForm(active || {});
  renderFileResults();
}

function newFile() {
  state.activeFileId = null;
  localStorage.removeItem("aztekiller-active-file");
  const num = generateCaseNumber();
  writeFileForm({ fileNumber: num, casePriority: "Critica", caseStatus: "abierto" });
  saveCase();
  renderFileResults();
  toast(`Expediente ${num} creado`, "success");
}

function openFile(id) {
  const file = getFiles().find((f) => f.id === id);
  if (!file) return;
  state.activeFileId = file.id;
  localStorage.setItem("aztekiller-active-file", file.id);
  writeFileForm(file);
  setView("case");
  renderFileResults();
  toast(`Expediente ${file.fileNumber || file.caseName} abierto`);
}

function deleteFile() {
  if (!state.activeFileId) { newFile(); return; }
  if (!confirm("¿Eliminar este expediente?")) return;
  setFiles(getFiles().filter((f) => f.id !== state.activeFileId));
  newFile();
  renderCaseStatsBar();
  toast("Expediente eliminado");
}

function setCaseListMode(mode) {
  state.caseListMode = mode;
  $$(".case-mode-btn").forEach((b) => b.classList.toggle("active", b.dataset.mode === mode));
  renderFileResults($("#fileSearch")?.value || "");
}

function renderFileResults(filter = "") {
  const target = $("#fileResults");
  if (!target) return;
  const query = filter.trim().toLowerCase();
  const activeStatuses = ["abierto", "en_progreso"];
  const historyStatuses = ["resuelto", "cerrado"];
  const allowed = state.caseListMode === "history" ? historyStatuses : activeStatuses;
  const files = getFiles().filter((f) => {
    const hay = [f.fileNumber, f.caseName, f.fileEmail, f.filePhone, f.fileUsername, f.fileContacts, f.fileData].join(" ").toLowerCase();
    const matchText   = !query || hay.includes(query);
    const matchStatus = allowed.includes(f.caseStatus || "abierto");
    return matchText && matchStatus;
  });

  target.innerHTML = files.length ? files.map((f) => {
    const st = statusConfig[f.caseStatus] || statusConfig.abierto;
    const pri = f.casePriority === "Critica" ? "pri-critica" : f.casePriority === "Alta" ? "pri-alta" : "pri-media";
    return `
    <article class="file-card ${f.id === state.activeFileId ? "active" : ""}">
      <div class="file-card-info">
        <div class="file-card-top">
          <strong>${f.fileNumber || "Sin número"}</strong>
          <span class="status-pill ${st.cls}">${st.emoji} ${st.label}</span>
        </div>
        <span class="file-card-name">${f.caseName || "Sin nombre"}</span>
        <small>${f.fileEmail || "Sin correo"}${f.filePhone ? " · " + f.filePhone : ""}</small>
        <span class="badge ${pri}">${f.casePriority || "Media"}</span>
      </div>
      <button data-open-file="${f.id}">Abrir</button>
    </article>`;
  }).join("") : `<p class="muted">No hay expedientes guardados todavía.</p>`;
}

function renderCaseStatsBar() {
  const bar = $("#caseStatsBar");
  if (!bar) return;
  const files = getFiles();
  if (!files.length) { bar.innerHTML = ""; return; }
  const counts = { abierto: 0, en_progreso: 0, resuelto: 0, cerrado: 0 };
  files.forEach((f) => { const s = f.caseStatus || "abierto"; if (counts[s] !== undefined) counts[s]++; });
  bar.innerHTML = `
    <div class="stat-chip stat-open"    >🔴 <strong>${counts.abierto}</strong> abiertos</div>
    <div class="stat-chip stat-progress">🟡 <strong>${counts.en_progreso}</strong> en progreso</div>
    <div class="stat-chip stat-resolved">🟢 <strong>${counts.resuelto}</strong> resueltos</div>
    <div class="stat-chip stat-closed"  >⚫ <strong>${counts.cerrado}</strong> cerrados</div>
    <div class="stat-chip stat-total"   >▤  <strong>${files.length}</strong> total</div>
  `;
}

function renderHeroStats() {
  const el = $("#heroStats");
  if (!el) return;
  const total = Object.values(data).reduce((s, arr) => s + arr.length, 0);
  const cats  = categories.length;
  const files = getFiles().length;
  el.innerHTML = `
    <div class="stat-chip"><small>Flujos</small><strong>${total}</strong></div>
    <div class="stat-chip"><small>Categorías</small><strong>${cats}</strong></div>
    <div class="stat-chip"><small>Expedientes</small><strong>${files}</strong></div>
    <div class="stat-chip"><small>Disponibilidad</small><strong>24/7</strong></div>
  `;
}

function persistChecks() { localStorage.setItem("aztekiller-checks", JSON.stringify(state.checks)); }

function toast(message, type = "") {
  const box = $("#toast");
  box.textContent = message;
  box.className = type ? `show ${type}` : "show";
  setTimeout(() => box.className = "", 2500);
}

function setView(view) {
  $$(".view").forEach((n) => n.classList.toggle("active", n.id === view));
  $$(".nav-btn").forEach((n) => n.classList.toggle("active", n.dataset.view === view));
  const cat = categories.find((c) => c[0] === view);
  $("#view-title").textContent = cat ? cat[1] : view === "case" ? "Expedientes" : "Inicio";
}

function iconFor(name) {
  const words = name.replace(/[^a-zA-Z0-9 ]/g, " ").trim().split(/\s+/);
  return words.slice(0, 2).map((w) => w[0]).join("").toUpperCase() || "?";
}

function tileMarkup(service, index) {
  const logo = serviceLogos[service.name];
  const catColors = { social: "#179cf4", email: "#11bfc7", web: "#7ed957", content: "#ffd337", identity: "#ef4f85" };
  const bg = catColors[service.category] || "#9b45ff";
  return `
    <button class="app-tile tile-${service.category}" data-service="${service.category}:${index}" title="${service.name}">
      <span class="app-icon" style="background:${bg}22;border-color:${bg}44">
        ${logo ? `<img src="${logo}" alt="${service.name}" loading="lazy" onerror="this.style.display='none';this.nextSibling.style.display='flex'">
        <span class="icon-fallback" style="display:none">${iconFor(service.name)}</span>` : `<span class="icon-fallback">${iconFor(service.name)}</span>`}
      </span>
      <small>${service.name}</small>
    </button>`;
}

function renderRecoveryTable() {
  $("#recoveryTable").innerHTML = ["social","email"].flatMap((cat) =>
    data[cat].map((item, i) => tileMarkup(serviceObject(cat, item), i))
  ).join("");
}

function renderServices(category, filter = "") {
  const target = $("#" + category + "Grid");
  if (!target) return;
  const query = filter.trim().toLowerCase();
  const services = data[category]
    .map((item, i) => ({ ...serviceObject(category, item), originalIndex: i }))
    .filter((s) => !query || `${s.name} ${s.desc}`.toLowerCase().includes(query));

  target.innerHTML = services.map((s) => {
    const logo = serviceLogos[s.name];
    const priClass = s.priority === "Critico" ? "hot" : s.priority === "Alta" ? "warm" : "";
    return `
    <article class="service-card">
      <div class="service-head">
        <span class="service-logo">
          ${logo ? `<img src="${logo}" alt="${s.name}" loading="lazy">` : iconFor(s.name)}
        </span>
        <span class="badge ${priClass}">${s.priority}</span>
      </div>
      <strong>${s.name}</strong>
      <p>${s.desc}</p>
      <footer>
        <button data-service="${category}:${s.originalIndex}">Abrir flujo</button>
        <button data-first-link="${category}:${s.originalIndex}" class="btn-ghost">Link rápido ↗</button>
      </footer>
    </article>`;
  }).join("");
}

function renderUniversalChecklist() {
  $("#universalChecklist").innerHTML = universalSteps.map((step, i) => {
    const id = `universal-${i}`;
    return `<label class="check-item"><input type="checkbox" data-check="${id}" ${state.checks[id] ? "checked" : ""}><span>${step}</span></label>`;
  }).join("");
}

function progressFor(service) {
  const prefix = `${service.category}-${service.name}-`;
  const done = service.steps.filter((_, i) => state.checks[prefix + i]).length;
  return Math.round((done / service.steps.length) * 100);
}

function updateProgress() {
  if (!state.activeService) return;
  const pct = progressFor(state.activeService);
  $("#progressText").textContent = `${pct}%`;
  $("#progressBar").style.width = `${pct}%`;
  $("#progressBar").style.background = pct === 100 ? "var(--green)" : pct > 50 ? "var(--amber)" : "var(--red)";
}

function openWorkflow(service) {
  state.activeService = service;
  $("#modalCategory").textContent = categories.find((c) => c[0] === service.category)?.[1] || service.category;
  $("#modalTitle").textContent = service.name;
  $("#workflowLinks").innerHTML = service.links.map(([label, url]) =>
    `<a href="${url}" target="_blank" rel="noreferrer">${label} ↗</a>`
  ).join("");
  const prefix = `${service.category}-${service.name}-`;
  $("#workflowSteps").innerHTML = service.steps.map((step, i) => {
    const id = prefix + i;
    return `<label class="check-item"><input type="checkbox" data-check="${id}" ${state.checks[id] ? "checked" : ""}><span>${i + 1}. ${step}</span></label>`;
  }).join("");
  $("#fallbackSteps").innerHTML = service.fallbacks.map((item) =>
    item.url
      ? `<a href="${item.url}" target="_blank" rel="noreferrer">${item.label}</a>`
      : `<div class="fallback-item"><span>→</span><span>${item.label}</span></div>`
  ).join("");
  updateProgress();
  $("#workflowModal").showModal();
}

function getServiceByToken(token) {
  const [category, rawIndex] = token.split(":");
  const item = data[category]?.[Number(rawIndex)];
  return item ? serviceObject(category, item) : null;
}

async function copyText(text, message) {
  await navigator.clipboard.writeText(text);
  toast(message, "success");
}

function serviceStepsText(service) {
  return [
    `Aztekiller Recovery Suite — ${service.name}`,
    "",
    "ENLACES:",
    ...service.links.map(([label, url]) => `→ ${label}: ${url}`),
    "",
    "CHECKLIST:",
    ...service.steps.map((step, i) => `${i + 1}. ${step}`),
    "",
    "SI NO FUNCIONA:",
    ...service.fallbacks.map((f) => `• ${f.label}`)
  ].join("\n");
}

// ── Export / Import ──────────────────────────────────────────────────────────

function exportCase() {
  saveCase();
  const payload = {
    _app: "aztekiller-recovery-suite",
    _version: "1.1",
    exportedAt: new Date().toISOString(),
    activeFileId: state.activeFileId,
    files: getFiles(),
    checks: state.checks
  };
  const blob = new Blob([JSON.stringify(payload, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `aztekiller-expedientes-${new Date().toISOString().slice(0, 10)}.json`;
  link.click();
  URL.revokeObjectURL(url);
  toast("Expedientes exportados", "success");
}

function openImportModal() {
  $("#importPreview").innerHTML = "";
  $("#importFileInput").value = "";
  $("#confirmImportBtn").classList.add("hidden");
  state.importData = null;
  $("#importModal").showModal();
}

function handleImportFile(file) {
  if (!file || !file.name.endsWith(".json")) { toast("Selecciona un archivo .json válido", "error"); return; }
  const reader = new FileReader();
  reader.onload = (e) => {
    try {
      const parsed = JSON.parse(e.target.result);
      if (!parsed.files || !Array.isArray(parsed.files)) throw new Error("Formato inválido");
      state.importData = parsed;
      const preview = $("#importPreview");
      preview.innerHTML = `
        <div class="import-info">
          <p><strong>${parsed.files.length}</strong> expediente(s) encontrado(s)</p>
          <p class="muted">Exportado el ${parsed.exportedAt ? new Date(parsed.exportedAt).toLocaleString("es-MX") : "fecha desconocida"}</p>
          <ul>${parsed.files.slice(0, 5).map((f) => `<li>${f.fileNumber || "Sin número"} — ${f.caseName || "Sin nombre"}</li>`).join("")}${parsed.files.length > 5 ? `<li>...y ${parsed.files.length - 5} más</li>` : ""}</ul>
        </div>`;
      $("#confirmImportBtn").classList.remove("hidden");
    } catch {
      toast("El archivo no es válido", "error");
    }
  };
  reader.readAsText(file);
}

function confirmImport() {
  if (!state.importData) return;
  const existing = getFiles();
  const incoming = state.importData.files;
  const merged = [...existing];
  let added = 0;
  incoming.forEach((f) => {
    if (!merged.find((e) => e.id === f.id)) { merged.unshift(f); added++; }
  });
  setFiles(merged);
  if (state.importData.checks) {
    Object.assign(state.checks, state.importData.checks);
    persistChecks();
  }
  renderFileResults();
  renderCaseStatsBar();
  renderHeroStats();
  $("#importModal").close();
  toast(`${added} expediente(s) importados`, "success");
}

// ── Panic ────────────────────────────────────────────────────────────────────

function panicFlow() {
  setView("case");
  const ts = new Date().toLocaleString("es-MX");
  const notes = $("#caseNotes");
  if (notes) notes.value += `\n\n[${ts}] ⚡ ACCIÓN RÁPIDA\n— Aislar cuenta/dispositivo.\n— Cambiar contraseña desde dispositivo limpio.\n— Cerrar sesiones.\n— Activar 2FA.\n— Guardar evidencia y folios.\n`;
  saveCase();
  toast("Plantilla de acción rápida agregada", "success");
}

function addCustom(category) {
  const name = prompt("Nombre del servicio o plataforma:");
  if (!name) return;
  const url = prompt("Link oficial de recuperación o soporte:");
  const link = url || `https://www.google.com/search?q=${encodeURIComponent(name + " account recovery official")}`;
  data[category].push([name, "Flujo personalizado agregado para respuesta rápida.", "Media", [["Abrir recurso", link]]]);
  renderServices(category);
  toast("Servicio agregado", "success");
}

// ── Notificaciones ───────────────────────────────────────────────────────────

function openNotifyModal() {
  // Si no hay número de expediente, generar uno ahora
  const numField = $("#fileNumber");
  if (numField && !numField.value.trim()) {
    numField.value = generateCaseNumber();
  }
  saveCase();
  const file = getFiles().find((f) => f.id === state.activeFileId) || readFileForm();
  const dest = file.notifyEmail || file.fileEmail;
  if (!dest) {
    toast("Agrega un correo de notificaciones al expediente primero", "error");
    return;
  }
  $("#notifyCase").textContent = file.fileNumber || generateCaseNumber();
  $("#notifyEmailDisplay").textContent = dest;
  $("#notifyMessage").value = "";
  $("#notifyModal").showModal();
}

async function sendCaseEmail() {
  if (EMAILJS_PUBLIC_KEY === "PUBLIC_KEY") {
    toast("Configura EmailJS — sigue las instrucciones pendientes", "error");
    return;
  }
  const file = getFiles().find((f) => f.id === state.activeFileId) || readFileForm();
  const dest  = file.notifyEmail || file.fileEmail;
  const msg   = $("#notifyMessage").value.trim();
  if (!msg) { toast("Escribe el mensaje de actualización", "error"); return; }

  const btn = $("#sendNotifyBtn");
  btn.disabled = true;
  btn.textContent = "Enviando...";

  try {
    await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
      to_email:       dest,
      case_number:    file.fileNumber  || "Sin número",
      client_name:    file.caseName    || "Cliente",
      case_status:    statusConfig[file.caseStatus]?.label || file.caseStatus || "Abierto",
      update_message: msg,
      from_name:      "AztekillerTech",
    }, { publicKey: EMAILJS_PUBLIC_KEY });

    const notes = $("#caseNotes");
    const ts = new Date().toLocaleString("es-MX");
    if (notes) notes.value += `\n[${ts}] ✉ Notificación enviada a ${dest}\n${msg}\n`;
    saveCase();

    $("#notifyModal").close();
    toast("Email enviado al cliente", "success");
  } catch (err) {
    toast("Error al enviar: " + (err?.text || err?.message || "revisa la config de EmailJS"), "error");
  } finally {
    btn.disabled = false;
    btn.textContent = "✉ Enviar email";
  }
}

// ── Boot ─────────────────────────────────────────────────────────────────────

function boot() {
  // Asignar número a expedientes que no tienen
  const files = getFiles();
  let changed = false;
  const year = new Date().getFullYear();
  const prefix = `AZK-${year}-`;
  let max = 0;
  files.forEach(f => {
    if (f.fileNumber?.startsWith(prefix)) {
      const n = parseInt(f.fileNumber.slice(prefix.length), 10);
      if (!isNaN(n) && n > max) max = n;
    }
  });
  files.forEach(f => {
    if (!f.fileNumber) {
      f.fileNumber = `${prefix}${String(++max).padStart(4, "0")}`;
      changed = true;
    }
  });
  if (changed) setFiles(files);

  renderHeroStats();
  renderRecoveryTable();
  renderCaseStatsBar();
  Object.keys(data).forEach((cat) => renderServices(cat));
  renderUniversalChecklist();
  loadCase();

  setView("case");

  setInterval(() => {
    $("#clock").textContent = new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  }, 1000);

  // Fix: Electron en Windows consume la barra espaciadora — insertarla manualmente
  document.addEventListener("keydown", (e) => {
    if (e.code !== "Space") return;
    const el = document.activeElement;
    if (!el || el.readOnly || el.disabled) return;
    if (el.tagName !== "TEXTAREA" && el.tagName !== "INPUT") return;
    if (el.type === "checkbox" || el.type === "radio" || el.type === "file") return;
    e.preventDefault();
    const s = el.selectionStart ?? el.value.length;
    const end = el.selectionEnd ?? el.value.length;
    el.value = el.value.slice(0, s) + " " + el.value.slice(end);
    el.selectionStart = el.selectionEnd = s + 1;
    el.dispatchEvent(new Event("input", { bubbles: true }));
  }, true);

  // Input events
  document.addEventListener("input", (e) => {
    if (e.target.matches("#fileSearch")) renderFileResults(e.target.value);
    if (e.target.matches(".search") && e.target.id !== "fileSearch") renderServices(e.target.id.replace("Search", ""), e.target.value);
    if (e.target.matches("#caseName, #casePriority, #caseSummary, #caseNotes, #caseName2, #fileEmail, #filePhone, #notifyEmail, #fileUsername, #casePriority2, #caseStatus, #fileContacts, #fileData, #caseSummary2")) saveCase();
  });

  document.addEventListener("change", (e) => {
    if (!e.target.matches("[data-check]")) return;
    state.checks[e.target.dataset.check] = e.target.checked;
    persistChecks();
    updateProgress();
  });

  document.addEventListener("click", (e) => {
    const view        = e.target.closest("[data-view]")?.dataset.view;
    const openView    = e.target.closest("[data-open-view]")?.dataset.openView;
    const svcToken    = e.target.closest("[data-service]")?.dataset.service;
    const firstLink   = e.target.closest("[data-first-link]")?.dataset.firstLink;
    const custom      = e.target.closest("[data-custom]")?.dataset.custom;
    const openFileId  = e.target.closest("[data-open-file]")?.dataset.openFile;

    if (view)       setView(view);
    if (openView)   setView(openView);
    if (svcToken)   openWorkflow(getServiceByToken(svcToken));
    if (firstLink)  { const s = getServiceByToken(firstLink); if (s) window.open(s.links[0][1], "_blank", "noreferrer"); }
    if (custom)     addCustom(custom);
    if (openFileId) openFile(openFileId);
  });

  // Buttons
  $("#btnEnAtencion").addEventListener("click", () => setCaseListMode("active"));
  $("#btnHistorial").addEventListener("click",  () => setCaseListMode("history"));

  $("#closeModal").addEventListener("click",       () => $("#workflowModal").close());
  $("#closeImportModal").addEventListener("click", () => $("#importModal").close());
  $("#panicBtn").addEventListener("click",         panicFlow);
  $("#exportBtn").addEventListener("click",        exportCase);
  $("#importBtn").addEventListener("click",        openImportModal);
  $("#printBtn").addEventListener("click",         () => window.print());
  $("#newFileBtn").addEventListener("click",       newFile);
  $("#saveFileBtn").addEventListener("click",      () => { saveCase(); toast("Expediente guardado", "success"); });
  $("#deleteFileBtn").addEventListener("click",    deleteFile);
  $("#confirmImportBtn").addEventListener("click", confirmImport);
  $("#importFileInput").addEventListener("change", (e) => handleImportFile(e.target.files[0]));

  $("#notifyBtn").addEventListener("click",         openNotifyModal);
  $("#closeNotifyModal").addEventListener("click",  () => $("#notifyModal").close());
  $("#cancelNotifyBtn").addEventListener("click",   () => $("#notifyModal").close());
  $("#sendNotifyBtn").addEventListener("click",     sendCaseEmail);

  $("#copyStepsBtn").addEventListener("click", () => {
    if (state.activeService) copyText(serviceStepsText(state.activeService), "Checklist copiado");
  });
  $("#markCriticalBtn").addEventListener("click", () => {
    if (!state.activeService) return;
    const p = $("#casePriority2"); if (p) p.value = "Critica";
    const s = $("#caseSummary2"); if (s) s.value = `${state.activeService.name}: caso marcado como crítico.`;
    saveCase();
    toast("Caso marcado como crítico", "error");
  });
  $("#copyBriefBtn").addEventListener("click", () => {
    saveCase();
    const f = getFiles().find((x) => x.id === state.activeFileId) || readFileForm();
    copyText(
      `Expediente: ${f.fileNumber || "Sin número"}\nNombre: ${f.caseName || ""}\nCorreo: ${f.fileEmail || ""}\nTeléfono: ${f.filePhone || ""}\nUsuario/red: ${f.fileUsername || ""}\nPrioridad: ${f.casePriority || ""}\nEstado: ${statusConfig[f.caseStatus]?.label || ""}\nContactos: ${f.fileContacts || ""}\nDatos: ${f.fileData || ""}\nResumen: ${f.caseSummary || ""}\nNotas:\n${f.caseNotes || ""}`,
      "Expediente copiado"
    );
  });
  $("#clearCaseBtn").addEventListener("click", () => {
    if (!confirm("¿Limpiar el formulario? El expediente guardado no se elimina.")) return;
    newFile();
  });
}

boot();
