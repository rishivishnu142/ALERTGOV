const fs = require('fs');
const PDFDocument = require('pdfkit-table');

// Data definition
const exactVillages = {
  'Coimbatore South': [
    'COIMBATORE OLD VILLAGE AND OLD TOWN', 'RAMANATHAPURAM', 'SOURIPALAYAM', 'UPPILIPALAYAM', 'SINGANALLUR'
  ],
  'Madukkarai': [
    'MADUKARAI', 'MAVUTHAMPATHY', 'PICHANUR', 'SEERAPALAYAM', 'ETTIMADAI', 'THIRUMALAYAMPALAYAM (S)', 
    'VAZHUKUPARAI', 'THIRUMALAYAMPALAYAM (N)', 'MALUMICHAMPATTY', 'PALATHURAI', 'KARUNCHAMIGOUNDENPALAYAM', 
    'THAMMAGOUNDANPALAYAM', 'NACHIPALAYAM', 'ARISIPALAYAM', 'MYLERIPALAYAM', 'OTHAKALMANDAPAM', 
    'CHETTYPALAYAM', 'OORATTUKUPPAI', 'KURICHY', 'VELLALUR'
  ],
  'Perur': [
    'IKARAIPOLUVAMPATTY (N)', 'MADAVARAYAPURAM', 'ALANTHURAI', 'POOLUVAMPATTI', 'SEMMEDU', 'THENKARAI', 
    'MADAMPATTY', 'THEETHIPALAYAM', 'PERURCHETTIPALAYM', 'NARASIPURAM', 'VELLIMALAIPATTINAM', 
    'JAKIRNAIKENPALAYAM', 'DEVARAYANPURAM', 'THONDAMUTHUR', 'THENAMANALLUR', 'KALIKANAIKEN PALAYAM', 
    'VADAVALLI', 'EAST CHITHIRAI CHAVADI', 'WEST CHITHIRAI CHAVADI', 'VEDAPATTY', 'PERUR', 'SUNDAKAMUTHUR', 
    'VEERA KERALAM', 'KOMARAPALAYAM', 'KUNIAMUTHUR'
  ],
  'Sulur': [
    'PADUVAMPALLI', 'KADUVETTIPALAYAM', 'MOPPIRIPALAYAM', 'KITTAMPALAYAM', 'SEMMANDAMPALAYAM', 
    'KARUMATHAMPATTY', 'KARAVAZHIMADAMPOOR', 'KANIYUR', 'ARASUR', 'NEELAMBUR', 'MYLAMPATTY', 'IRUGUR', 
    'RASIPALAYAM', 'KADAMPADI', 'KANGAYAMPALAYAM', 'SULUR', 'KANNAMPALAYAM', 'OTTERPALAYAM', 'PATTANAM', 
    'PEEDAMPALLI', 'KALLENGAL', 'APPANAIKENPATTY', 'PAPPAMPATTY', 'KALLAPALAYAM', 'PACHAPALAYAM', 
    'BOGAMPATTY', 'IDAYAPALAYAM', 'SELAKKARICHEL', 'VADAVALLI', 'POORANDAMPALAYAM', 'VARAPATTY', 
    'VADAMBACHERI', 'VADAVEDAMPATTY', 'KUMARAPALAYAM', 'MALAIPALAYAM', 'S.AYYAMPALAYAM', 'KAMMALAPATTY', 
    'JALLIPATTY', 'SENCHERIPUDUR', 'THALAKARI', 'J.KRISNAPURAM'
  ],
  'Coimbatore North': [
    'KALAPATTY (EAST)', 'VILANKURICHY', 'SARAVANMPATTY', 'VELLAKINAR', 'KALAPATTY (WEST)', 
    'CHINNAVEDAMPATTY', 'SANGANUR', 'GANAPATHY (E) and (W)', 'KRISHNARAYAPUARAM', 'THELUNGUPALAYAM', 
    'PULIYAKULAM', 'ANUPPERPALAYAM', 'NAIKENPALAYAM', 'GUDALUR (N) and (S)', 'PERIYANAIKANPALAYAM', 
    'VEERAPANDI', 'BILLICHI (E) and (W)', 'NARASIMMANAIKENPALAYAM', 'KURUDAMPALAYAM', 'THUDIYALUR', 
    'PANNIMADAI', 'NANJUNDAPURAM', 'CHINNATHADAGAM', 'VEERAPANDI', 'SOMAYAMPALAYAM', 'GOUNDENPALAYAM'
  ],
  'Mettupalayam': [
    'NELLITHURAI', 'ODANTHURAI', 'THEKKAMPATTY', 'SIKKADASAMPALAYAM', 'SIRUMUGAI', 'IRUMBURAI', 
    'CHINNAKALLIPATTY', 'MOODUTHURAI', 'ILUPPANATHAM', 'BELLEPALAYAM', 'JADAYAMPALAYAM', 
    'KEMMAARAMPALAYAM', 'THOLAMPALAYAM', 'VELLIYANKADU', 'KALAMPALAYAM', 'MARUDUR', 'KARAMADAI', 
    'BELLATHI', 'SIKKARAMPALAYAM'
  ],
  'Annur': [
    'ANNUR', 'PILLAYAPAMPALAYAM', 'KARIYAMPALAYAM', 'VADAVALLI', 'KUPPEPALAYAM', 'KATTAMPATTY', 
    'KUNNATHUR', 'MASAGOUNDENPALAYAM', 'PACHAPALAYAM', 'NARANAPURAM', 'KAREGOUNDENPALAYAM', 'BOGALUR', 
    'ODDERPALAYAM', 'KUPPANUR', 'AKKARI SENGAPALLY', 'KANUVAKARAI', 'AAMBOTHI', 'VADAKKALUR', 
    'ANNUR METTUPALAYAM', 'PASOOR', 'ALLAPALAYAM', 'KANJAMPALLY', 'VELLAMADAI', 'AGRAHARASAMAKULAM', 
    'KONDAYAMPALAYAM', 'SARKAR SAMAKULAM', 'KALLIPALAYAM', 'VELLANAIPATTY', 'KEERANATHAM', 'IDIKARAI'
  ],
  'Pollachi': [
    'ERIPATTY', 'POLYGOUNDAMPALAYAM', 'POOSARIPATTY', 'THIPPAMPATTY', 'CHANDIRA PURAM', 'CHINNA NEGAMAM', 
    'PERIYA NEGAMAM', 'AVALAPPAMPATTY', 'KONDEGOUNDENPALAYAM', 'MULANUR', 'A. NAGUR', 'KOLLAPATTY', 
    'VADAKIPALAYAM', 'DEVAMPADI', 'THALAKKARAI', 'MUTHUR', 'BODIPALAYAM', 'KULATHUR', 'SERVAKARAnPALAYAM', 
    'RASICHETTIPALAYAM', 'AYYAMPALAYAM', 'NALLUTHUKUZHULI', 'KUMARAPALAYAM', 'THIMAMKUTHU', 'PORAVIPALAYAM', 
    'SERVUKARANPALAYAM', 'RAMAPATTANAM', 'MANNUR', 'SANDEGOUNDANPALAYAM', 'KULLICHETTIPALAYAM', 'KAVILIPALAYAM', 
    'SIKKARAYAPURAM', 'POOSANAICKENTHALI', 'SANGAMPALAYAM', 'ACHIPATTY', 'OKKULIPALAYAM', 'KURUMBAPALAYAM', 
    'KULLAKAPALAYAM', 'THOPPAMPATTY', 'RASAKKAPALAYAM', 'VELLALAPALAYAM', 'ANUPPERPALAYAM', 'PULIYAMPATTY', 
    'KITTASOORAMPALAYAM', 'T. KOTTAMPATTY', 'POLLACHI', 'R. PONNAPURAM', 'GOMANGALAM', 'GOMANGALAMPUDUR', 
    'S.MALAYANDIPATTINAM', 'SEELAKAMPATTI', 'NALLAMPALLI', 'SOLAPALAYAM', 'NATTUKALPALAYAM', 'KANJAMPATTI', 
    'KOLARPATTI', 'KOOLANAIKENPATTI', 'SINJUVADI', 'KALLIPATTY', 'SOOLEESWARANPATTY', 'MAKKINAMPATTY', 
    'CHINNAMAPALAYAM', 'OONJAVELAMPATTY', 'ZAMIN UTHUKULI', 'ZAMIN KOTTAMPPATTY'
  ],
  'Kinathukadavu': [
    'METTUBAVI', 'PANAPATTI', 'VADACHITTOR', 'KURUNALLIPALAYAM', 'PERIYAKALANDAI', 'KATTAMPATTY', 
    'SURUKALANDAI', 'ANDIPALAYAM', 'KAPPALANKARAI', 'ARASAMPALAYAM', 'KONDAMPATTY', 'SOLAVAMPALAYAM', 
    'VADAPUDUR', 'KUTHIRAYALAMPALAYAM', 'POTTAYANDIPURAM', 'KINTHUKADAVU', 'SOKKANUR', 'KODANGIPALAYAM', 
    'CHETTIYAKKAPALAYAM', 'NALLATTIPALAYAM', 'KODAVADI', 'MUTHUR', 'SANKARAYAPURAM', 'GOVINDAPURAM', 
    'DEVARAYAPURAM', 'SOOLAKAL', 'METTUPALAYAM', 'KANIYALAMPALYAM', 'DEVANAMPALAYAM', 'VAKUTHAMPALAYAM', 
    'KAKKADAVU', 'KRISHNARAYAPURAM', 'SOZHANUR', 'VARADANUR', 'MULLIPATTI'
  ],
  'Valparai': [
    'ANAMALAI KUNDRUGAL'
  ],
  'Anamalai': [
    'ODAYAKULAM', 'ANAIMALAI', 'VETTAIKARANPUTHUR', 'KALIYAPURAM', 'THENSANGAMPALAYAM', 'SOMANTHURAI', 
    'THENSITTOR', 'PETHANAICKENUR', 'VAKKAMPALAYAM', 'NAICKENPALAYAM', 'SINGANALLUR', 'AMBARAMPALAYAM', 
    'MARCHANAICKENPALAYAM', 'PERIYAPODU', 'AATHUPOLLACHI', 'THALAVAIPALAYAM', 'PAZHAYUR', 'VEERALPATTI', 
    'THONDAMUTHUR', 'NALLUR', 'THENKUMARAPALAYAM', 'SAMATHUR', 'S. PONNAPURAM', 'KOTTUR', 'ANGALAKURICHI', 
    'KARIYAMCHEITTIPALAYAM', 'THURAIYUR', 'JALLIPATTY', 'KAMBALAPATTY', 'ARTHANARIPALAYAM', 'PILSINAMPALAYAM'
  ]
};

const taluks = [
  { name: 'Coimbatore South', villages: 5 },
  { name: 'Madukkarai', villages: 20 },
  { name: 'Perur', villages: 25 },
  { name: 'Sulur', villages: 41 },
  { name: 'Coimbatore North', villages: 26 },
  { name: 'Mettupalayam', villages: 19 },
  { name: 'Annur', villages: 30 },
  { name: 'Pollachi', villages: 65 },
  { name: 'Kinathukadavu', villages: 35 },
  { name: 'Valparai', villages: 1 },
  { name: 'Anamalai', villages: 31 }
];

let users = [];
users.push({ id: 'STA-TN', name: 'State Admin', role: 'state', area: 'Tamil Nadu' });
users.push({ id: 'COL-CBE', name: 'District Collector', role: 'collector', area: 'Coimbatore District' });
users.push({ id: 'DEC-CBE', name: 'District EOC Officer', role: 'district', area: 'Coimbatore District' });

taluks.forEach((taluk, tIdx) => {
  const talukId = "TAL-" + taluk.name.toUpperCase().replace(/ /g, '-');
  users.push({ id: talukId, name: taluk.name + " Taluk Officer", role: 'taluk', area: taluk.name + ' Taluk' });

  const specificVillages = exactVillages[taluk.name];
  for (let i = 1; i <= taluk.villages; i++) {
    let rawVillageName = specificVillages ? specificVillages[i-1] : (taluk.name + " Village " + i);
    const villageName = rawVillageName.split(' ').map(w => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase()).join(' ');
    users.push({
      id: "VEO-" + taluk.name.toUpperCase().replace(/ /g, '') + "-" + i,
      name: villageName + " Operator",
      role: 'village',
      area: villageName
    });
  }
});

// Create Document
const doc = new PDFDocument({ margin: 30, size: 'A4' });
doc.pipe(fs.createWriteStream('../AlertGov_Login_Credentials.pdf'));

doc.font('Helvetica-Bold').fontSize(18).text('AlertGov 4.0 - Login Credentials Directory', { align: 'center' });
doc.font('Helvetica').fontSize(10).text('Coimbatore District Directory (311 Accounts Generated)', { align: 'center' });
doc.moveDown(2);

const table = {
  title: "Authorized System Accounts",
  headers: [
    { label: "Account ID (Username)", property: "id", width: 140 },
    { label: "Password", property: "pass", width: 60 },
    { label: "Role", property: "role", width: 80 },
    { label: "Official Title", property: "title", width: 130 },
    { label: "Jurisdiction Area", property: "area", width: 100 }
  ],
  datas: users.map(u => ({
    id: u.id,
    pass: 'admin',
    role: u.role.toUpperCase(),
    title: u.name,
    area: u.area
  }))
};

doc.table(table, {
  prepareHeader: () => doc.font("Helvetica-Bold").fontSize(9),
  prepareRow: () => doc.font("Helvetica").fontSize(8)
});

doc.end();
console.log('PDF Generated Successfully at AlertGov_Login_Credentials.pdf');
