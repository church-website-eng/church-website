export const defaultChurchInfo = {
  churchName: "Celestial Church of Christ",
  cathedralName: "Goshen Cathedral",
  motto: "\u201cIjo Mimo ti Kristi lati Orun wa\u201d \u2014 The Holy Church of Christ from Heaven. Join us in worship, prayer, and spiritual growth as we walk in the light of God.",
  subtitle: "Ayo Mother Parish \u2022 Arch Diocese of Canada | National Headquarter",
  street: "441 Rubidge Street",
  city: "Peterborough",
  province: "ON",
  phone: "",
  email: "info@cccgoshencathedral.ca",
  facebookUrl: "https://www.facebook.com/celestialchurchofchristayomotherparish",
  youtubeUrl: "https://www.youtube.com/watch?v=LkVAqyR1088",
  instagramUrl: "https://www.instagram.com/celestialchurchcanadahq/",
  audiomackUrl: "",
  logoUrl: "/images/logo.jpeg",
};

export const defaultServiceTimes = {
  services: [
    { day: "Sunday", times: ["10:00 AM \u2013 1:00 PM \u2014 Main Sunday Service"] },
    { day: "Wednesday", times: ["9:00 AM \u2014 Seeker Service", "6:00 PM \u2014 Mercy Day Service"] },
    { day: "Friday", times: ["8:00 PM \u2014 Special Service for Prophets, Prophetesses, Dreamers & Visioneers"] },
    { day: "1st Thursday", times: ["10:00 PM \u2013 1:00 AM \u2014 New Moon Service"] },
    { day: "Saturday", times: ["7:00 AM \u2013 7:30 AM \u2014 Sanctuary Cleaning"] },
  ],
  worshipAspects: [
    "White Sutana (Robes)",
    "Barefoot Entry",
    "Incense & Holy Water",
    "Seven Candles on the Altar",
  ],
};

export const defaultStats = {
  items: [
    { label: "Years of Faith", value: 79, suffix: "+" },
    { label: "Members", value: 200, suffix: "+" },
    { label: "Ministries", value: 8, suffix: "" },
    { label: "Weekly Services", value: 5, suffix: "" },
  ],
};

export const defaultAnnouncements = {
  items: [
    {
      id: "1",
      title: "Lenten Season Begins",
      date: "February 26, 2026",
      type: "important",
      body: "The Lenten season has begun. All members are encouraged to observe fasting and prayer as we prepare our hearts for Easter. Special Lenten services will be held every Wednesday evening.",
    },
    {
      id: "2",
      title: "Monthly Thanksgiving \u2014 March 2026",
      date: "March 1, 2026",
      type: "event",
      body: "Our monthly thanksgiving service will hold on the first Sunday of March. Please come with your thanksgiving offerings. Special prayers for all March-born members.",
    },
    {
      id: "3",
      title: "New Moon Service \u2014 March",
      date: "March 5, 2026",
      type: "event",
      body: "The New Moon Service for March will hold on Thursday, March 5th. All prophets, prophetesses, dreamers, and visioneers are especially invited.",
    },
    {
      id: "4",
      title: "Youth Conference Registration Open",
      date: "February 20, 2026",
      type: "info",
      body: "Registration is now open for the Arch Diocese Youth Conference happening in April. Please see the Youth Leader for registration forms or register online through the Members Portal.",
    },
    {
      id: "5",
      title: "Welfare Committee \u2014 Food Drive",
      date: "February 18, 2026",
      type: "info",
      body: "The Welfare Committee is organizing a food drive for families in need in the Peterborough area. Donations of non-perishable food items can be dropped off at the church any service day.",
    },
  ],
};

export const defaultAbout = {
  beliefs: [
    {
      title: "The Holy Bible",
      description: "We believe in the Holy Bible as the inspired and infallible Word of God, the foundation of our faith and the guide for all aspects of Christian living.",
    },
    {
      title: "Prayer & Prophecy",
      description: "The Celestial Church of Christ is guided by the Holy Spirit through prayer, visions, and divine prophecy as revealed to our members.",
    },
    {
      title: "Holy Sacraments",
      description: "We observe the sacraments of Baptism by immersion, Holy Communion, and the washing of feet as commanded by our Lord Jesus Christ.",
    },
    {
      title: "White Garment (Sutana)",
      description: "Members worship in white garments symbolising purity, holiness, and our heavenly citizenship, as revealed by divine instruction.",
    },
  ],
  historyParagraphs: [
    "The Celestial Church of Christ (CCC) was founded on 29 September 1947 in Porto-Novo, Dahomey (now Republic of Benin) by the late Pastor-Founder, Rev. Samuel Bilewu Joseph Oshoffa, through divine revelation and the guidance of the Holy Spirit.",
    "Goshen Cathedral, Ayo Mother Parish, stands as the National Headquarter of the Arch Diocese of Canada, serving as a beacon of faith, prayer, and spiritual renewal for CCC members across the nation. Our parish is dedicated to upholding the tenets, doctrines, and divine instructions that define the Celestial Church of Christ worldwide.",
    "As a Celestial family in Canada, we continue to proclaim the gospel of Jesus Christ, worship in the power of the Holy Spirit, and extend the love of God to our community and beyond.",
  ],
  leadership: [
    { id: "1", name: "VSE Kunle Lawal", title: "Shepherd-in-Charge — Goshen Cathedral", bio: "Leading the Goshen Cathedral parish with divine guidance, pastoral care, and an unwavering commitment to the spiritual growth of all members. Serving as the shepherd of the Arch Diocese of Canada, National Headquarter.", photo: "/images/head-of-church.jpeg" },
    { id: "2", name: "Church Secretary", title: "Church Secretary", bio: "Managing parish administration, communications, and record-keeping to ensure the smooth operation of Goshen Cathedral.", photo: "" },
    { id: "3", name: "Mother-in-Celestial", title: "Mother-in-Celestial", bio: "Guiding the women's fellowship, prayer ministries, and welfare activities with love and spiritual wisdom.", photo: "" },
  ],
};

export const defaultGiveSettings = {
  funds: [
    { name: "General Tithe", email: "info@cccgoshencathedral.ca" },
    { name: "Building Fund", email: "info@cccgoshencathedral.ca" },
    { name: "Missions & Evangelism", email: "info@cccgoshencathedral.ca" },
    { name: "Youth Ministry", email: "info@cccgoshencathedral.ca" },
    { name: "Welfare & Outreach", email: "info@cccgoshencathedral.ca" },
    { name: "Thanksgiving Offering", email: "info@cccgoshencathedral.ca" },
    { name: "Special Seed / Harvest", email: "info@cccgoshencathedral.ca" },
    { name: "Other Donations", email: "info@cccgoshencathedral.ca" },
  ],
  presetAmounts: [25, 50, 100, 250],
  headerQuote:
    "Each of you should give what you have decided in your heart to give, not reluctantly or under compulsion, for God loves a cheerful giver.",
  autoDepositEnabled: true,
  taxDeductible: true,
};

export const defaultShepherdCorner = {
  name: "VSE Kunle Lawal",
  title: "Shepherd-in-Charge — Goshen Cathedral",
  bio: "Leading the Goshen Cathedral parish with divine guidance, pastoral care, and an unwavering commitment to the spiritual growth of all members.",
  photo: "/images/head-of-church.jpeg",
  messageTitle: "A Word from the Shepherd",
  messageBody: "Beloved in Christ, let us continue to walk in faith, love, and obedience to God's word. Remember that our strength comes from the Lord, and in every season, He remains faithful. Stay prayerful, stay connected, and let the light of Christ shine through you.",
  videoUrl: "",
};

export const defaultCharacterOfWeek = {
  name: "Onesimus",
  title: "The Faithful Servant",
  verse: "Philemon 1:10-11",
  description:
    "Once a runaway slave, Onesimus became a faithful servant of Christ through Paul's ministry. His transformation shows that no one is beyond God's redemptive power.",
  imageUrl: "",
};

export const defaultThemeSettings = {
  fontSerif: "Georgia",
  fontSans: "system-ui",
  fontSize: "default",
  primaryColor: "#1a237e",
  accentColor: "#c62828",
  goldColor: "#d4a017",
};

export const defaultCareers = {
  intro: "We believe every member has gifts to share. Whether you're looking to serve part-time, volunteer, or explore a career in ministry support, there are many ways to get involved at Goshen Cathedral.",
  careers: [
    { id: "1", title: "Youth Program Coordinator", type: "volunteer", description: "Help organize and lead our youth ministry programs, events, and outreach activities.", requirements: "Experience working with youth, strong organizational skills", contact: "info@cccgoshencathedral.ca" },
    { id: "2", title: "Media & Communications", type: "volunteer", description: "Assist with live streaming, social media, photography, and video production for church services and events.", requirements: "Familiarity with social media platforms, basic video/photo skills", contact: "info@cccgoshencathedral.ca" },
    { id: "3", title: "Music Ministry Volunteer", type: "volunteer", description: "Join the choir or music team. Singers and instrumentalists of all levels are welcome.", requirements: "A heart for worship, willingness to attend rehearsals", contact: "info@cccgoshencathedral.ca" },
  ],
  volunteerAreas: [
    { id: "1", name: "Ushering & Hospitality", description: "Welcome visitors and members, assist during services, and ensure a warm church experience." },
    { id: "2", name: "Children's Church", description: "Teach and care for children during Sunday services with engaging Bible lessons and activities." },
    { id: "3", name: "Kitchen & Fellowship", description: "Help prepare and serve food for after-service fellowship and special church events." },
    { id: "4", name: "Cleaning & Maintenance", description: "Keep God's house beautiful by helping with sanctuary cleaning and facility upkeep." },
    { id: "5", name: "Welfare & Outreach", description: "Visit the sick, support families in need, and organize community outreach programs." },
    { id: "6", name: "Technical / AV Team", description: "Operate sound systems, projectors, and live-streaming equipment during services." },
  ],
};

export const defaultMinistries = {
  items: [
    { name: "Men's Fellowship", description: "Brotherhood in Christ \u2014 men gathering for prayer, Bible study, and mutual support. Building godly men who lead their families and serve the church.", leader: "Men's Leader", icon: "shield" },
    { name: "Women's Fellowship (Mothers-in-Celestial)", description: "A powerful ministry of women united in prayer, welfare, and spiritual nurturing. The Mothers-in-Celestial guide and support the entire parish family.", leader: "Mother-in-Celestial", icon: "heart" },
    { name: "Youth Ministry", description: "Empowering young people ages 13\u201330 through fellowship, leadership training, outreach, and spiritual development. The future of the church.", leader: "Youth Leader", icon: "star" },
    { name: "Children's Ministry", description: "Nurturing the youngest members of our church through age-appropriate Bible lessons, songs, and activities. Training children in the way of the Lord.", leader: "Children's Coordinator", icon: "book" },
    { name: "Choir & Music Ministry", description: "Leading the congregation in praise and worship through hymns, celestial songs, and spiritual choruses. Music that lifts the soul to heaven.", leader: "Choir Director", icon: "music" },
    { name: "Ushering Ministry", description: "Welcoming worshippers with warmth and maintaining order during services. The first point of contact for visitors and members alike.", leader: "Head Usher", icon: "users" },
    { name: "Welfare & Outreach", description: "Caring for the needy within and outside the church. Coordinating food drives, hospital visits, and community assistance programs.", leader: "Welfare Committee", icon: "heart" },
    { name: "Prayer Warriors", description: "A dedicated team of intercessors who pray for the church, its members, and all submitted prayer requests. Available for special prayer sessions.", leader: "Prayer Coordinator", icon: "shield" },
  ],
};
