
const routes = { '/': 'Home', '/capabilities': 'Capabilities', '/equipment': 'Equipment', '/industries': 'Industries', '/quality': 'Quality', '/about': 'About', '/contact': 'Contact' };
const photo = (name, alt = '', className = '') => `<img class="${className}" src="/assets/${name}.jpg" alt="${alt}">`;
const bg = name => `style="--photo:url('/assets/${name}.jpg')"`;
const button = (href, label = 'Request a Quote', type = 'orange') => `<a class="button ${type}" href="${href}">${label}<span aria-hidden="true">→</span></a>`;
const quote = () => button('/contact');
const label = text => `<p class="eyebrow">${text}</p>`;
const sectionLabel = text => `<p class="section-label">${text}</p>`;
const title = (normal, accent) => `${normal}<strong>${accent}</strong>`;
const brand = home => `<a class="brand" href="/" aria-label="Apex Precision CNC home"><i aria-hidden="true"></i>${home ? '<span><b>APEX</b><small>PRECISION CNC</small></span>' : '<span>Precision CNC</span>'}</a>`;
const paths = {
 target:'M21 11a9 9 0 1 1-8-8 M17 11a5 5 0 1 1-4-4 M12 12l8-8m-4 1 4-1-1 4',
 layers:'m12 3 10 5-10 5L2 8z M2 12l10 5 10-5 M2 16l10 5 10-5',
 bolt:'m13 2-9 12h7l-1 8 10-12h-8z',
 cube:'m12 2 9 5v10l-9 5-9-5V7z M3 7l9 5 9-5 M12 12v10',
 shield:'M12 2l9 4v6c0 4-4 8-9 10-5-2-9-6-9-10V6z M8 12l3 3 5-6',
 check:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M7 12l3 3 7-7',
 cross:'M9 2h6v7h7v6h-7v7H9v-7H2V9h7z',
 plane:'m22 2-3 8-7 4 1 6-3 2-3-6-4-1-1-3 7-2 5-7z',
 gear:'m10 2 4 0 1 3 3-1 3 3-1 3 2 1v3l-3 1 1 3-3 3-3-1-1 2h-3l-1-3-3 1-3-3 1-3-2-1v-3l3-1-1-3 3-3 3 1z M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0',
 doc:'M5 2h10l4 4v16H5z M14 2v5h5 M8 11h8m-8 4h8m-8 4h4',
 bars:'M3 21h4v-7H3z M10 21h4V9h-4z M17 21h4V3h-4z',
 mill:'M4 3h16v4H4z M8 7v5h8V7 M10 12v5h4v-5 M12 17v3 M6 22h12',
 turn:'M3 6c0-5 18-5 18 0s-18 5-18 0zm0 0v12c0 5 18 5 18 0V6 M3 12c0 5 18 5 18 0',
 people:'M15 7a3 3 0 1 1-6 0 3 3 0 0 1 6 0 M5 21v-3a7 7 0 0 1 14 0v3 M5 5a3 3 0 0 0 0 6m14-6a3 3 0 0 1 0 6 M2 19v-2a5 5 0 0 1 3-4m17 6v-2a5 5 0 0 0-3-4',
 clock:'M22 12a10 10 0 1 1-20 0 10 10 0 0 1 20 0 M12 5v7l5 3',
};
const icon = name => `<svg class="icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.65" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${paths[name] || paths.cube}"/></svg>`;
const tile = ([name, heading, description, symbol, destination, badge]) => `<a ${bg(name)} class="photo-tile panel" href="${destination}">${symbol ? icon(symbol) : ''}<div>${badge ? `<span class="badge">${badge}</span>` : ''}<h3>${heading}</h3>${description ? `<p>${description}</p>` : ''}</div><span class="tile-arrow" aria-hidden="true">→</span></a>`;
const metrics = (items, heading = '') => `<section class="metrics ${heading ? 'has-heading' : ''}">${heading ? `<h2 class="panel">${heading}</h2>` : ''}${items.map(([symbol, heading, detail]) => `<div class="metric panel">${icon(symbol)}<h3>${heading}</h3>${detail ? `<p>${detail}</p>` : ''}</div>`).join('')}</section>`;
const list = items => `<ul class="checks">${items.map(item => `<li>${item}</li>`).join('')}</ul>`;
const hero = ({ eyebrow, heading, copy, image, secondary = '/capabilities', secondaryLabel = 'Our Capabilities', actions = true, extra = '' }) => `<section class="hero panel ${actions ? '' : 'no-actions'}">${photo(image, '', 'hero-photo')}<div class="hero-copy">${label(eyebrow)}<h1>${heading}</h1><p class="intro">${copy}</p>${actions ? `<div class="actions">${quote()}${button(secondary, secondaryLabel, 'outline')}</div>` : ''}${extra}</div></section>`;
const cta = (heading, copy, image = 'cta', extra = '') => `<section class="cta panel" ${bg(image)}><div><h2>${heading}</h2><p>${copy}</p></div><div class="actions">${quote()}${extra}</div></section>`;
const machines = [
 ['dmg','DMG MORI','DMU 50 5-Axis',[['Travel (X/Y/Z)','650 / 520 / 475 mm'],['Max RPM','20,000'],['Axes','5-Axis (3+2)'],['Work Envelope','Ø500 × 400 mm']]],
 ['mazak','Mazak','QT-250MY Turning Center',[['Max Turning Ø','340 mm'],['Max Length','1,000 mm'],['Max RPM','4,000'],['Axes','2-Axis with Live Tooling']]],
 ['citizen','Citizen','L20 Swiss-Type CNC',[['Bar Capacity','Ø3–20 mm'],['Max RPM','10,000'],['Axes','7-Axis'],['Main/Back Spindle','Yes']]],
 ['okuma','Okuma','GENOS M560-V',[['Travel (X/Y/Z)','1,050 / 560 / 460 mm'],['Max RPM','15,000'],['Axes','3-Axis'],['Table Size','1,300 × 560 mm']]],
];
const machineCards = (compact = false) => (compact ? machines.slice(0,3) : machines).map(([image, brandName, name, specs], i) => `<article class="machine panel">${photo(image, `${brandName} CNC machine`)}<h3>${compact ? ['5-Axis Milling','CNC Turning (Live Tooling)','Swiss-Type CNC'][i] : brandName+'<br>'+name}</h3>${compact ? `<p><strong>${brandName}</strong> &nbsp; | &nbsp; Qty: ${[4,6,3][i]}</p>` : ''}<dl>${specs.slice(0,compact ? 3 : 4).map(([k,v]) => `<div><dt>${k}</dt><dd>${v}</dd></div>`).join('')}</dl></article>`).join('');
const industryData = [
 ['aerospace','Aerospace &amp; Defense','plane','Precision housings, structural components and complex machined parts.'],
 ['medical','Medical &amp; Life Sciences','cross','Tight-tolerance components for instruments, devices and equipment.'],
 ['industrial','Industrial Equipment','gear','Durable components for demanding production and equipment applications.'],
 ['robotics','Automation &amp; Robotics','mill','Precision mounts, interfaces and parts for automated systems.'],
 ['tool','Tool &amp; Die','layers','Machined tooling, dies and fixtures for repeatable production.'],
 ['energy','Energy &amp; Power','bolt','Precision components for power and energy equipment.'],
 ['electronics','Semiconductor &amp; Electronics','bars','Machined plates and housings for electronics manufacturing equipment.'],
 ['transport','Transportation &amp; Heavy Equipment','cube','Reliable machined parts for transportation and heavy-duty equipment.'],
];
const capabilityData = [
 ['multi','Multi-Axis CNC Machining','3-, 4-, and 5-axis machining for complex, high-precision components.','','CNC Machining'],
 ['cap-turn','Turning','Live tooling for complex turned parts.'],
 ['cap-mill','Milling','Multi-axis milling for complex geometries and tight tolerances.'],
 ['edm','EDM','Precision machining for intricate features.'],
 ['secondary','Secondary Operations','Finishing, assembly and inspection to support production.'],
];
const details = (items, page) => `<section class="detail-list" aria-label="${page} details">${items.map(([id, heading, copy]) => `<details class="panel" id="${id}"><summary>${heading}</summary><p>${copy} ${button('/contact','Discuss your project','text-link')}</p></details>`).join('')}</section>`;

function home() {
 const cards = [
 ['equipment-hero','CNC Milling','3-, 4- &amp; 5-axis milling for complex, high-precision parts.','mill','/capabilities#cap-mill'],
 ['turning','CNC Turning','Precision turning with live tooling for complex, multi-feature parts.','turn','/capabilities#cap-turn'],
 ['swiss','Swiss Machining','High-precision, small-diameter parts with tight tolerances.','target','/equipment#swiss'],
 ['batch','Prototyping to Production','Rapid prototypes, low-volume, and high-volume production runs.','layers','/equipment#capacity'],
 ];
 return hero({eyebrow:'Precision • Speed • Reliability',heading:title('Precision CNC<br>Machining','Built for What’s Next'),copy:'High-precision CNC machining from prototype to full production. Tight tolerances, complex geometries, and dependable delivery — all in one partner.',image:'home-hero',secondaryLabel:'View Our Capabilities',extra:`<div class="hero-points">${[['target','±0.0002″','Tolerances'],['bolt','Fast','Turnaround'],['layers','Prototype to','Production']].map(([i,a,b])=>`<div>${icon(i)}<span><b>${a}</b><br>${b}</span></div>`).join('')}</div>`}) +
 `<section class="home-cap"><div class="panel dark accent intro-panel">${sectionLabel('Our Capabilities')}<h2>Full-Spectrum<br>CNC Machining</h2><p>From complex, tight-tolerance parts to scalable production runs, we deliver precision manufacturing across a range of CNC processes.</p>${button('/capabilities','Explore All Capabilities','white')}</div>${cards.map(tile).join('')}</section>
 <section class="home-mid"><div class="panel light fleet">${sectionLabel('Equipment &amp; Capacity')}<a class="count" href="/equipment#machine-list">20+ CNC Machines</a><h2>Advanced CNC Equipment<br>for Demanding Parts</h2><p>A modern, high-precision machine shop with the capacity,<br> accuracy, and flexibility to support your program.</p><div class="machines">${machineCards(true)}</div></div>
 <div class="panel home-quality dark" ${bg('inspection')}>${sectionLabel('Quality &amp; Certifications')}<h2>Quality You<br>Can Count On</h2><p>A rigorous quality system, advanced inspection equipment, and certified processes ensure your parts meet exact specifications.</p><a class="metric-link" href="/quality">${metrics([['shield','ISO 9001 Certified'],['target','CMM Inspection','Up to 1,000 mm'],['check','In-Process &amp; Final Inspection','FAI, SPC, PPAP']])}</a></div></section>
 <section class="home-industries"><div>${sectionLabel('Industries Served')}<h2>Precision Parts for High-Performance Industries</h2><p>Trusted by innovative companies across demanding, highly regulated industries.</p></div>${[['home-aero','Aerospace','plane','aerospace'],['home-medical','Medical','cross','medical'],['home-industrial','Industrial','gear','industrial'],['home-defense','Defense','shield','aerospace']].map(([im,h,i,id])=>tile([im,h,'',i,'/industries#'+id])).join('')}</section>
 <section class="home-process panel light"><div>${sectionLabel('Our Process')}<h2>A Simple,<br>Reliable Process</h2><p>A clear, responsive workflow from RFQ to delivery, built to keep your project on time and on spec.</p></div><ol>${[['doc','Request a Quote','Send your drawing, CAD information, and requirements.'],['cube','DFM &amp; Quote','We review for manufacturability and provide a detailed quote.'],['mill','Machining &amp; Quality','Precision machining with in-process and final inspection.'],['cube','Delivery','On-time delivery with documentation as needed.']].map(([i,h,d],n)=>`<li class="panel">${icon(i)}<span>${n+1}</span><h3>${h}</h3><p>${d}</p></li>`).join('')}</ol></section>` +
 cta('Let’s Build <strong>Your Next Part</strong>','From rapid prototypes to full production, Apex Precision CNC delivers high-quality, precision-machined parts — on time and to spec.','flange',button('/contact','Talk to Our Team','outline'));
}

function capabilities() {
 return hero({eyebrow:'Our Capabilities',heading:title('Comprehensive<br>CNC Manufacturing','Capabilities'),copy:'Advanced machining, precision manufacturing, and value-added services to take your parts from concept to production.',image:'cap-hero',actions:false}) +
 `<section class="cap-grid">${capabilityData.map(([im,h,d,i,badge],n)=>tile([im,h,n===0?d:'',i,'#'+im,badge])).join('')}</section>` +
 metrics([['target','±0.0002″','Tolerances'],['layers','60″ × 40″ × 40″','Max Part Size'],['cube','Prototype to Production'],['check','Full-Service Inspection']],'Capability Highlights') +
 `<section class="value-add panel light">${photo('blocks','Precision-machined metal blocks')}<div>${label('Value-Added Services')}<h2>More Than Machining</h2><p>A complete manufacturing solution with the finishing, assembly, and quality support your program requires.</p></div>${list(['Finishing &amp; Surface Treatments','Assembly &amp; Sub-Assembly','Precision Inspection &amp; Reporting','Inventory &amp; Program Management'])}</section>` +
 cta('Let’s Build Your Next Part','Discuss your project with our engineering team.') + details(capabilityData,'Machining');
}

function equipment() {
 return hero({eyebrow:'Our Equipment',heading:title('Advanced CNC<br>Equipment','Built for Precision'),copy:'A modern, high-capacity machine fleet with the latest CNC technology, giving you the accuracy, efficiency, and production flexibility to meet a wide range of needs — from prototypes to full production.',image:'equipment-hero',secondary:'#machine-list',secondaryLabel:'View Machine List'}) +
 `<section class="equipment-grid">
 ${tile(['impeller','5-Axis<br>Milling','Complex geometries, tight tolerances, and multi-side machining in fewer setups.','','#machine-list','5-Axis Milling'])}
 ${tile(['turning','CNC Turning','High-precision turning with live tooling for complex, multi-feature parts.','','#machine-list'])}
 ${tile(['swiss','Swiss-Type<br>CNC','High-precision, small-diameter parts with exceptional repeatability.','','#machine-list']).replace('class="photo-tile','id="swiss" class="photo-tile')}
 ${tile(['horizontal','Horizontal<br>Machining','Efficient, high-volume machining with excellent accuracy and rigidity.','','#capacity'])}
 <a class="inspection-link panel light" href="/quality">${photo('inspection','Inspection probe measuring a metal component')}<div><h2>Inspection<br>Equipment</h2><p>Advanced inspection and metrology to verify accuracy, quality, and consistency.</p><span class="tile-arrow" aria-hidden="true">→</span></div></a>
 ${metrics([['mill','20+ CNC Machines'],['cube','Up to 5-Axis'],['target','Tight Tolerance Work'],['layers','Prototype to Production']],'Equipment Highlights')}</section>
 <section id="machine-list" class="fleet equipment-fleet light panel"><div>${sectionLabel('Our Machine List')}<h2>Key CNC Machines<br>in Our Fleet</h2><p>A modern mix of multi-axis, turning, Swiss-type, and vertical machining centers from industry-leading brands.</p>${button('/contact','Ask About Machine Availability','outline')}</div><div class="machines">${machineCards()}</div></section>
 <section id="capacity" class="capacity"><div class="panel dark accent intro-panel">${label('Capacity &amp; Support')}<h2>${title('Production Capacity with','Built-In Flexibility')}</h2><p>The equipment, tooling, and support to adapt to your part, volume, and timeline requirements.</p></div><div class="capacity-items">${[
 ['cube','Machine Capacity','A versatile fleet for small, complex, and high-volume parts.'],['image','machining'],['mill','Tooling Flexibility','Extensive tooling and workholding options for a wide range of sizes and geometries.'],
 ['image','blocks'],['clock','Lights-Out Production','Automated machining to keep production moving and lead times short.'],['layers','Value-Added Support','Programming, fixturing, inspection, and process optimization.'],['image','inspection']].map(([i,h,d])=>i==='image'?photo(h,'','panel'):`<article class="panel light">${icon(i)}<div><h3>${h}</h3><p>${d}</p></div></article>`).join('')}</div></section>` +
 cta('Equipment That’s Ready for <strong>Your Next Part</strong>','Leverage our advanced CNC equipment, skilled team, and production flexibility to bring your parts to life.','flange');
}

function industries() {
 return hero({eyebrow:'Industries We Serve',heading:title('Precision<br>Components for<br>Demanding','Industries'),copy:'Reliable, high-precision machining for industries where performance, quality, and consistency are critical.',image:'industries-hero'}) +
 `<section class="industry-grid">${industryData.map(([im,h,i])=>tile([im,h,'',i,'#'+im])).join('')}</section>` +
 metrics([['target','Tight Tolerances','Precision you can count on'],['layers','Complex Geometries','Advanced multi-axis capabilities'],['cube','Diverse Materials','Metals, alloys, and engineered plastics'],['bolt','From Prototype to Production','Flexible, scalable manufacturing']],'Built for High-Performance Applications') +
 cta('Your Industry. Our Precision.','Let’s talk about your component, specifications, and production needs.') +
 details(industryData.map(([id,h,,d])=>[id,h,d]),'Industry');
}

function quality() {
 return hero({eyebrow:'Our Quality Commitment',heading:title('Precision Backed<br>by a Rigorous','Quality System'),copy:'From first article to final inspection, we ensure every part meets your exact specifications with traceable, repeatable processes.',image:'quality-hero'}) +
 metrics([['shield','Consistent Quality','Parts to spec, every time'],['layers','Full Traceability','Materials, processes, and inspection records'],['bars','Process Control','SPC and continuous improvement'],['target','Customer Confidence','Verified quality from prototype to production']]) +
 `<section class="quality-grid">${photo('cmm','CMM probe verifying a machined component','panel')}<article class="panel light"><h2 class="slash">Our Quality Capabilities</h2><p>A comprehensive inspection and quality program that ensures accuracy, traceability, and reliable results throughout the entire manufacturing process.</p>${list(['CMM Inspection (Full 3D Verification)','First Article Inspection (FAI)','In-Process and Final Inspection','SPC &amp; Process Monitoring','Material Traceability &amp; Certification','Inspection Reporting and Documentation'])}</article><div>${photo('gauge','Digital precision micrometer','panel')}${photo('rings','Precision machined rings','panel')}</div></section>` +
 metrics([['target','ISO 9001:2015','Quality Management System'],['check','AS9100','Aerospace Quality (if applicable)'],['gear','ITAR Compliant','Controlled Manufacturing (when required)'],['doc','PPAP Support','Production Part Approval Process'],['cube','FAI','First Article Inspection']],'Quality Certifications') +
 cta('A Higher Standard of Precision','Quality you can count on — from prototype to production.');
}

function about() {
 return `<div class="about-grid"><div class="about-left">${hero({eyebrow:'About Precision CNC',heading:title('A Trusted<br>Manufacturing','Partner'),copy:'A modern CNC machine shop with a commitment to precision, quality, and long-term customer partnerships.',image:'operator'})}
 ${metrics([['doc','20+','Years in Manufacturing'],['people','50+','Customers'],['gear','40+','CNC Machines'],['mill','15,000+','Parts Produced Monthly']])}
 <section class="facility">${photo('shop','Machine shop floor','panel')}<article class="panel light"><h2 class="slash">Our Facility</h2><p>A modern, well-equipped facility built for precision, capacity, and efficiency — from prototype to full production.</p>${list(['Climate-Controlled Environment','Advanced CNC Equipment','Quality Inspection &amp; Metrology','Scalable Production Capacity'])}</article></section>
 ${cta('Let’s Build Something Together','From single parts to long-term production, we’re ready to support your next project.','story')}</div>
 <div class="about-right"><section class="story panel light"><article><h2 class="slash">Our Story</h2><p>Precision CNC was founded on a simple idea — deliver high-quality machined parts, on time, with a level of service customers can count on. What started as a small machine shop has grown into a full-service manufacturing partner for a wide range of industries.</p></article>${photo('story','Close-up of a machined metal component','panel')}</section>
 <section class="principle dark panel" ${bg('inspection')}>${icon('target')}<h2>Built on Precision,<br>Service, and Trust.</h2></section>
 <section class="about-values"><h2>Our Core Values</h2>${metrics([['target','Precision','Consistent results to exact specifications.'],['people','Partnership','A long-term focus on your success.'],['shield','Quality','Built into every process and part.'],['people','People','A skilled, dedicated team that takes pride in their work.']])}</section>
 <section class="team panel dark">${photo('team','Machined parts in the shop')}<article><h2 class="slash">Our Team</h2><p>A team of experienced machinists, programmers, and quality professionals who are passionate about manufacturing and solving complex challenges.</p></article></section></div></div>`;
}

function contact() {
 return hero({eyebrow:'Request a Quote',heading:title('Let’s Build','Your Next Part'),copy:'Tell us about your component, specifications, and production needs.',image:'equipment-hero',actions:false}) +
 `<section class="rfq panel light"><h2>Project details</h2><p>Fields marked with an asterisk are required.</p><form action="/api/rfq" method="post"><div class="form-fields">
 <label>Full name *<input name="name" autocomplete="name" required maxlength="100"></label>
 <label>Work email *<input name="email" type="email" autocomplete="email" required maxlength="254"></label>
 <label>Company<input name="company" autocomplete="organization" maxlength="120"></label>
 <label>Phone<input name="phone" type="tel" autocomplete="tel" maxlength="40"></label>
 <label>Material<input name="material" maxlength="100"></label>
 <label>Estimated quantity<input name="quantity" type="number" min="1" max="100000000" step="1"></label>
 <label class="full">Project requirements *<textarea name="requirements" rows="6" required minlength="10" maxlength="4000" placeholder="Include dimensions, tolerances, target delivery date, and relevant drawing details."></textarea></label></div>
 <button class="button orange" type="submit">Submit Request <span aria-hidden="true">→</span></button><p id="form-status" role="status" aria-live="polite"></p></form></section>`;
}

const pages = { '/': home, '/capabilities': capabilities, '/equipment': equipment, '/industries': industries, '/quality': quality, '/about': about, '/contact': contact };
function footer(path) {
 const links = (heading, items) => `<section><h2>${heading}</h2><ul>${items.map(([url, name]) => `<li><a href="${url}"${url === path ? ' aria-current="page"' : ''}>${name}</a></li>`).join('')}</ul></section>`;
 return `<footer class="apex-footer">
 <div class="footer-grid">
 <section class="footer-brand">${brand(true)}
 <p>High-precision CNC machining from prototype to full production. Tight tolerances, complex geometries, and dependable delivery.</p>
 <ul class="footer-promises">${[['target','Precision<br>Machining'],['layers','Prototype to<br>Production'],['bolt','On-Time<br>Delivery']].map(([symbol, text]) => `<li>${icon(symbol)}<span>${text}</span></li>`).join('')}</ul>
 </section>
 ${links('Quick Links', Object.entries(routes).filter(([url]) => url !== '/contact'))}
 ${links('Capabilities', [['/capabilities#cap-mill','CNC Milling'],['/capabilities#cap-turn','CNC Turning'],['/equipment#swiss','Swiss Machining'],['/capabilities#multi','Multi-Axis (3, 4 &amp; 5-Axis)'],['/equipment#capacity','Prototyping'],['/equipment#machine-list','Production Machining']])}
 ${links('Industries', [['/industries#aerospace','Aerospace'],['/industries#medical','Medical'],['/industries#industrial','Industrial'],['/industries#aerospace','Defense'],['/industries#robotics','Automation'],['/industries#energy','Energy &amp; Power']])}
 <section class="footer-contact"><h2>Get in Touch</h2><p>Share your specifications, quantities, and target timeline with our team.</p>${quote()}</section>
 </div>
 <div class="footer-bottom">© ${new Date().getFullYear()} Apex Precision CNC. All rights reserved.</div>
 </footer>`;
}
export function render(path, content, pageTitle) {
 const homePage = path === '/';
 return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1"><meta name="description" content="Apex Precision CNC provides precision machining, inspection, and production support from prototype to production."><title>${pageTitle || routes[path]} | Apex Precision CNC</title><link rel="stylesheet" href="/style.css"><script src="/site.js" defer></script></head>
 <body class="page-${homePage ? 'home' : path.slice(1)}"><a class="skip" href="#main">Skip to content</a>
 <header class="header">${brand(homePage)}${homePage ? '<span class="tagline">Precision Machining<br>Prototype to Production</span>' : ''}<nav aria-label="Main navigation">${Object.entries(routes).filter(([url])=>url!=='/contact').map(([url,name])=>`<a href="${url}"${url===path?' aria-current="page"':''}>${name}</a>`).join('')}</nav>${button('/contact','Request a Quote',homePage?'orange':'outline')}</header>
 <main id="main">${content ?? pages[path]?.() ?? '<section class="panel light missing"><h1>Page not found</h1><a href="/">Return home</a></section>'}</main>${footer(path)}</body></html>`;
}
export function isPage(path) { return Object.hasOwn(pages, path); }
