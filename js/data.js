/*
  Бүтээгдэхүүний өгөгдөл
  ----------------------
  Үнэ, нэр, тайлбар, зургийг энэ файлаас шууд засна.
  price      : нэг нэгжийн бөөний үнэ (төгрөг)
  minOrder   : хамгийн бага захиалгын тоо
  unit       : нэгж (ширхэг, хайрцаг, иж бүрдэл гэх мэт)
  image      : зургийн холбоос (images/ хавтас эсвэл бүтэн URL)
  credit     : зургийн эх сурвалж ба лиценз
  featured   : true бол нүүр хуудасны онцлох хэсэгт гарна
*/

window.CATALOG = {
  store: {
    name: "Турк Бөөний Барааны Агуулах",
    phone: "7711 2233",
    email: "info@turkbuuni.mn",
    address: "Улаанбаатар, Хан Уул дүүрэг, Үйлдвэрийн гудамж 12",
    hours: "Даваагаас бямба гараг хүртэл, 09:00 цагаас 19:00 цаг хүртэл"
  },

  categories: [
    { id: "home", name: "Гэр ахуйн бараа", icon: "home" },
    { id: "kitchen", name: "Гал тогооны хэрэгсэл", icon: "kitchen" },
    { id: "beauty", name: "Гоо сайхны бүтээгдэхүүн", icon: "beauty" },
    { id: "clothing", name: "Хувцас", icon: "clothing" },
    { id: "kids", name: "Хүүхдийн бараа", icon: "kids" },
    { id: "household", name: "Ахуйн хэрэглээ", icon: "household" },
    { id: "other", name: "Бусад", icon: "other" }
  ],

  products: [
    /* Гэр ахуйн бараа */
    {
      id: "p101", category: "home", featured: true,
      name: "Турк нэхмэл хивс 160×230",
      brand: "Anatolia Kilim", price: 189000, unit: "ширхэг", minOrder: 5, stock: 140,
      short: "Уламжлалт хээтэй, өтгөн нэхмэл, өдөр тутмын хэрэглээнд тэсвэртэй хивс.",
      description: "Анатолийн уламжлалт хээг орчин үеийн өнгөний шийдэлтэй хослуулсан нэхмэл хивс. Зочны өрөө, унтлагын өрөө, оффисын орчинд тохиромжтой. Ар тал нь гулсдаггүй, угаалгад өнгө алдахгүй.",
      details: [["Хэмжээ", "160 × 230 см"], ["Материал", "Полипропилен, хөвөн суурь"], ["Савлагаа", "Ороомог, 1 ширхэг"], ["Гарал үүсэл", "Газиантеп, Турк"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/c/c5/Carpet_Shop_in_Ankara_%286225340317%29.jpg/960px-Carpet_Shop_in_Ankara_%286225340317%29.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Carpet_Shop_in_Ankara_%286225340317%29.jpg\" target=\"_blank\" rel=\"noopener\">William Neuheisel from DC, US</a>, Wikimedia Commons, CC BY 2.0"
    },
    {
      id: "p102", category: "home", featured: true,
      name: "Пештемаль хөвөн алчуур",
      brand: "Denizli Tekstil", price: 24500, unit: "ширхэг", minOrder: 20, stock: 820,
      short: "Хамам болон далайн эрэгт зориулсан нимгэн, хурдан хатдаг хөвөн алчуур.",
      description: "Денизли хотын нэхмэлийн үйлдвэрт 100% хөвөнгөөр нэхсэн уламжлалт пештемаль алчуур. Хөнгөн, ус сайн шингээдэг, хурдан хатдаг тул зочид буудал, саун, спа төвүүдэд эрэлттэй.",
      details: [["Хэмжээ", "90 × 180 см"], ["Материал", "100% хөвөн"], ["Савлагаа", "Хайрцагт 20 ширхэг"], ["Өнгө", "6 төрлийн өнгө холимог"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/7/7a/Fouta_Orange.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Fouta_Orange.jpg\" target=\"_blank\" rel=\"noopener\">Art &amp; Bio</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p103", category: "home",
      name: "Мозайк шилэн дэнлүү",
      brand: "Kapalıçarşı Lamba", price: 58000, unit: "ширхэг", minOrder: 6, stock: 210,
      short: "Гар урлалын өнгөт шилэн мозайктай, дулаан гэрэлтэй ширээний дэнлүү.",
      description: "Истанбулын гар урчууд нэг бүрчлэн угсарсан өнгөт шилэн мозайк дэнлүү. Ресторан, кафе, зочид буудал болон бэлгийн дэлгүүрт борлуулахад тохиромжтой. E14 суурьтай чийдэн тохирно.",
      details: [["Өндөр", "36 см"], ["Материал", "Шил, гууль"], ["Цахилгаан", "220 В, E14"], ["Савлагаа", "Хамгаалалттай хайрцаг"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/3/3e/Turkish_mosaic_lamps_and_Moroccan-style_filigree_lanterns%2C_Bangladesh.jpg/960px-Turkish_mosaic_lamps_and_Moroccan-style_filigree_lanterns%2C_Bangladesh.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Turkish_mosaic_lamps_and_Moroccan-style_filigree_lanterns%2C_Bangladesh.jpg\" target=\"_blank\" rel=\"noopener\">Tanvir Rahat</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p104", category: "home",
      name: "Хөвөн ранфорс орны цагаан хэрэглэл",
      brand: "Bursa Home", price: 98000, unit: "иж бүрдэл", minOrder: 10, stock: 360,
      short: "Хоёр хүний орны хөнжлийн уут, даавуу, хоёр дэрний уут бүхий иж бүрдэл.",
      description: "Бурса хотод үйлдвэрлэсэн ранфорс хөвөн даавуун иж бүрдэл. Зөөлөн, агааржуулалт сайтай, олон удаа угаасан ч хэлбэр өнгөө хадгална.",
      details: [["Хэмжээ", "200 × 220 см"], ["Бүрдэл", "4 хэсэг"], ["Материал", "100% хөвөн ранфорс"], ["Савлагаа", "Бэлгийн уут"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Bed_in_Seattle_hotel.jpg/960px-Bed_in_Seattle_hotel.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Bed_in_Seattle_hotel.jpg\" target=\"_blank\" rel=\"noopener\">Liz Lawley</a>, Wikimedia Commons, CC BY SA 2.0"
    },

    /* Гал тогооны хэрэгсэл */
    {
      id: "p201", category: "kitchen", featured: true,
      name: "Турк цайны шилэн аяга, тавагтай",
      brand: "Anadolu Cam", price: 32000, unit: "6 ширхэгийн багц", minOrder: 12, stock: 960,
      short: "Алдартай алтанцэцгийн хэлбэрийн шилэн аяга, жижиг тавагны хамт.",
      description: "Турк цай уух уламжлалт алтанцэцгийн хэлбэртэй нимгэн шилэн аяга. Халуунд тэсвэртэй шилээр хийсэн бөгөөд кафе, ресторан, гэр бүлийн хэрэглээнд хамгийн их борлогддог бүтээгдэхүүн.",
      details: [["Багтаамж", "100 мл"], ["Бүрдэл", "6 аяга, 6 таваг"], ["Материал", "Халуунд тэсвэртэй шил"], ["Савлагаа", "Хайрцагт 12 багц"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Turkish_tea_with_classical_glass.jpg/960px-Turkish_tea_with_classical_glass.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Turkish_tea_with_classical_glass.jpg\" target=\"_blank\" rel=\"noopener\">eXploration Etoile</a>, Wikimedia Commons, CC0"
    },
    {
      id: "p202", category: "kitchen", featured: true,
      name: "Чайданлык давхар цайны данх",
      brand: "Ege Çelik", price: 76000, unit: "ширхэг", minOrder: 6, stock: 280,
      short: "Турк цай чанах зориулалттай, зэвэрдэггүй гангаар хийсэн давхар данх.",
      description: "Доод данханд ус буцалгаж, дээд данханд цайгаа уураар нэвчүүлдэг уламжлалт загвар. Индукц, хий, цахилгаан плитка дээр ашиглах боломжтой.",
      details: [["Багтаамж", "2.0 л ба 1.1 л"], ["Материал", "18/10 зэвэрдэггүй ган"], ["Суурь", "Индукцэд тохирно"], ["Баталгаа", "2 жил"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/14/Turkse_thee_maken_op_moderne_inductieplaat.JPG/960px-Turkse_thee_maken_op_moderne_inductieplaat.JPG",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Turkse_thee_maken_op_moderne_inductieplaat.JPG\" target=\"_blank\" rel=\"noopener\">Ellywa</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p203", category: "kitchen",
      name: "Зэс жезве, Турк кофе чанагч",
      brand: "Gaziantep Bakır", price: 29000, unit: "ширхэг", minOrder: 12, stock: 430,
      short: "Гараар урласан зэс жезве, модон бариултай.",
      description: "Турк кофе чанахад зориулсан уламжлалт зэс жезве. Дотор тал нь цагаан тугалгаар бүрсэн тул хүнсний аюулгүй байдлын шаардлага хангана.",
      details: [["Багтаамж", "250 мл"], ["Материал", "Зэс, модон бариул"], ["Савлагаа", "Хайрцагт 12 ширхэг"], ["Гарал үүсэл", "Газиантеп, Турк"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/13/Copper_cezve.jpg/960px-Copper_cezve.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Copper_cezve.jpg\" target=\"_blank\" rel=\"noopener\">Oksana Makarenko (UA Lora)</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p204", category: "kitchen",
      name: "Гар зурмал шаазан таваг",
      brand: "İznik Çini", price: 45000, unit: "ширхэг", minOrder: 10, stock: 175,
      short: "Изникийн хээтэй, гараар будсан чимэглэлийн шаазан таваг.",
      description: "Османы үеийн Изник хээг гараар зурсан шаазан таваг. Хана, ширээ чимэглэх болон бэлэг дурсгалын дэлгүүрт борлуулахад тохиромжтой.",
      details: [["Диаметр", "25 см"], ["Материал", "Шаазан, паалан"], ["Хэрэглээ", "Чимэглэл, хүнсний"], ["Савлагаа", "Нэг бүрчлэн хамгаалалттай"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Plate_Iznik_MBA_Lyon_E500-62.jpg/960px-Plate_Iznik_MBA_Lyon_E500-62.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Plate_Iznik_MBA_Lyon_E500-62.jpg\" target=\"_blank\" rel=\"noopener\">Тодорхойгүй зохиогч</a>, Wikimedia Commons, CC BY 2.5"
    },

    /* Гоо сайхны бүтээгдэхүүн */
    {
      id: "p301", category: "beauty", featured: true,
      name: "Чидуны тостой байгалийн саван",
      brand: "Ayvalık Zeytin", price: 6500, unit: "ширхэг", minOrder: 48, stock: 3200,
      short: "Айвалык хотын цэвэр чидуны тосоор хийсэн гар аргын саван.",
      description: "Химийн нэмэлтгүй, хүйтэн аргаар боловсруулсан чидуны тостой саван. Арьсыг хатаахгүй, мэдрэг арьстай хүмүүст ч тохиромжтой.",
      details: [["Жин", "150 г"], ["Найрлага", "Чидуны тос 90%"], ["Савлагаа", "Хайрцагт 48 ширхэг"], ["Хадгалах хугацаа", "36 сар"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4c/Bars_of_pure_Marseille_and_Aleppo_soap%2C_2024.jpg/960px-Bars_of_pure_Marseille_and_Aleppo_soap%2C_2024.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Bars_of_pure_Marseille_and_Aleppo_soap%2C_2024.jpg\" target=\"_blank\" rel=\"noopener\">DimiTalen</a>, Wikimedia Commons, CC0"
    },
    {
      id: "p302", category: "beauty",
      name: "Испартын сарнайн ус",
      brand: "Isparta Gül", price: 12500, unit: "ширхэг", minOrder: 24, stock: 1100,
      short: "Испартын сарнайн дэлбээг нэрж гаргасан байгалийн тоник.",
      description: "Дэлхийд алдартай Испартын сарнайн талбайгаас түүсэн дэлбээг уураар нэрж гаргасан цэвэр сарнайн ус. Нүүрний тоник, үс арчилгаа болон агаар сэргээгч болгон хэрэглэнэ.",
      details: [["Багтаамж", "250 мл"], ["Найрлага", "100% сарнайн нэрмэл ус"], ["Савлагаа", "Хайрцагт 24 ширхэг"], ["Гарал үүсэл", "Испарта, Турк"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/1/1a/Rose_and_water_bottle.jpg/960px-Rose_and_water_bottle.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Rose_and_water_bottle.jpg\" target=\"_blank\" rel=\"noopener\">Brianmetcalf</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p303", category: "beauty",
      name: "Нимбэгний колонья",
      brand: "Limon Kolonya", price: 15500, unit: "ширхэг", minOrder: 24, stock: 900,
      short: "Турк гэр бүл бүрт байдаг сэргээгч, ариутгагч үнэртэй ус.",
      description: "80 хэмийн спирттэй, нимбэгний сэргэг үнэртэй уламжлалт Турк колонья. Гар ариутгах, сэргээх зориулалттай. Зочид буудал, ресторан, такси үйлчилгээнд өргөн хэрэглэгддэг.",
      details: [["Багтаамж", "400 мл"], ["Спирт", "80°"], ["Үнэр", "Нимбэг"], ["Савлагаа", "Хайрцагт 24 ширхэг"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/86/Bottles_of_Original_Eau_de_Cologne.jpg/960px-Bottles_of_Original_Eau_de_Cologne.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Bottles_of_Original_Eau_de_Cologne.jpg\" target=\"_blank\" rel=\"noopener\">Викидим</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p304", category: "beauty",
      name: "Хамам кесе бээлий",
      brand: "Hamam Kese", price: 4800, unit: "ширхэг", minOrder: 50, stock: 2500,
      short: "Арьсны үхэжсэн эсийг арилгах уламжлалт хамамын бээлий.",
      description: "Турк хамамын уламжлалт кесе бээлий. Арьсыг гүн цэвэрлэж, цусны эргэлтийг сайжруулна. Спа, саун, гоо сайхны дэлгүүрт тохиромжтой.",
      details: [["Материал", "Вискоз"], ["Хэмжээ", "15 × 21 см"], ["Савлагаа", "Хайрцагт 50 ширхэг"], ["Өнгө", "Холимог"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/64/Gant_de_kessa.jpg/960px-Gant_de_kessa.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Gant_de_kessa.jpg\" target=\"_blank\" rel=\"noopener\">Sophienath</a>, Wikimedia Commons, CC BY SA 3.0"
    },

    /* Хувцас */
    {
      id: "p401", category: "clothing", featured: true,
      name: "Бурсагийн торгон ороолт",
      brand: "Bursa İpek", price: 38000, unit: "ширхэг", minOrder: 12, stock: 380,
      short: "Бурса хотын уламжлалт торгоор хийсэн хээтэй ороолт.",
      description: "Торгоны замын төв байсан Бурса хотын нэхмэлчдийн бүтээл. Зөөлөн гялбаатай, хөнгөн, бэлэг дурсгалд тохиромжтой.",
      details: [["Хэмжээ", "90 × 90 см"], ["Материал", "100% торго"], ["Савлагаа", "Бэлгийн хайрцаг"], ["Загвар", "8 төрлийн хээ"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/e/e7/Qipao_and_silk_scarves_on_display_at_a_shop_on_Fengqi_Road_%2820170202103143%29.jpg/960px-Qipao_and_silk_scarves_on_display_at_a_shop_on_Fengqi_Road_%2820170202103143%29.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Qipao_and_silk_scarves_on_display_at_a_shop_on_Fengqi_Road_%2820170202103143%29.jpg\" target=\"_blank\" rel=\"noopener\">N509FZ</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p402", category: "clothing",
      name: "Эрэгтэй хөвөн цамц",
      brand: "Istanbul Moda", price: 27000, unit: "ширхэг", minOrder: 24, stock: 640,
      short: "Турк хөвөн даавуугаар оёсон, хэлбэрээ хадгалдаг өдөр тутмын цамц.",
      description: "Эгейн бүсийн урт ширхэгтэй хөвөнгөөр нэхсэн даавуун цамц. Оффис болон өдөр тутмын хэрэглээнд тохиромжтой. Хэмжээ бүрээр хайрцаглана.",
      details: [["Хэмжээ", "S, M, L, XL, XXL"], ["Материал", "100% хөвөн"], ["Савлагаа", "Хайрцагт 24 ширхэг"], ["Өнгө", "Цагаан, цэнхэр, хар"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7d/Button_down_dress_shirts_for_men.jpg/960px-Button_down_dress_shirts_for_men.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Button_down_dress_shirts_for_men.jpg\" target=\"_blank\" rel=\"noopener\">Modern Fellows</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p403", category: "clothing",
      name: "Эмэгтэй нэхмэл ноосон цамц",
      brand: "Anka Triko", price: 42000, unit: "ширхэг", minOrder: 20, stock: 300,
      short: "Дулаахан, зөөлөн нэхмэл ноосон цамц, улирлын шинэ загвар.",
      description: "Ноос болон акрилын холимог утсаар нэхсэн эмэгтэй цамц. Өвөл, хаврын улиралд тохиромжтой, угаалгад агшдаггүй.",
      details: [["Хэмжээ", "S, M, L, XL"], ["Материал", "50% ноос, 50% акрил"], ["Савлагаа", "Хайрцагт 20 ширхэг"], ["Өнгө", "5 өнгө"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/a/a1/Grey_knitted_sweater.jpg/960px-Grey_knitted_sweater.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Grey_knitted_sweater.jpg\" target=\"_blank\" rel=\"noopener\">Тодорхойгүй зохиогч</a>, Wikimedia Commons, CC BY 2.0"
    },
    {
      id: "p404", category: "clothing",
      name: "Жинсэн өмд",
      brand: "Denim Ege", price: 46000, unit: "ширхэг", minOrder: 24, stock: 520,
      short: "Турк денимээр оёсон, сунадаг, эдэлгээ сайтай жинсэн өмд.",
      description: "Турк улс бол Европын томоохон денимийн үйлдвэрлэгч. Энэхүү жинсэн өмд нь бага зэрэг сунадаг даавуугаар хийгдсэн тул хөдөлгөөнд эвтэйхэн.",
      details: [["Хэмжээ", "28, 30, 32, 34, 36"], ["Материал", "98% хөвөн, 2% эластан"], ["Савлагаа", "Хайрцагт 24 ширхэг"], ["Загвар", "Шулуун"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/01/Jeans_Jeans_Jeans.jpg/960px-Jeans_Jeans_Jeans.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Jeans_Jeans_Jeans.jpg\" target=\"_blank\" rel=\"noopener\">Jcjeansandclothes</a>, Wikimedia Commons, CC BY SA 3.0"
    },

    /* Хүүхдийн бараа */
    {
      id: "p501", category: "kids", featured: true,
      name: "Нярайн хөвөн хувцасны иж бүрдэл",
      brand: "Minik Pamuk", price: 36000, unit: "иж бүрдэл", minOrder: 12, stock: 450,
      short: "Органик хөвөн даавуугаар хийсэн 5 хэсэгтэй нярайн хувцас.",
      description: "Нярайн нарийн арьсанд зориулсан органик хөвөн иж бүрдэл. Боди, өмд, малгай, бээлий, смокоос бүрдэнэ. Эмнэлэг болон бэлгийн дэлгүүрт тохиромжтой.",
      details: [["Нас", "Төрсөнөөс 6 сар хүртэл"], ["Бүрдэл", "5 хэсэг"], ["Материал", "100% органик хөвөн"], ["Савлагаа", "Бэлгийн хайрцаг"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Baby_Clothes_Clothes_my_parents_sent.jpg/960px-Baby_Clothes_Clothes_my_parents_sent.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Baby_Clothes_Clothes_my_parents_sent.jpg\" target=\"_blank\" rel=\"noopener\">nadimre</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p502", category: "kids",
      name: "Хүүхдийн модон тоглоом",
      brand: "Ahşap Oyun", price: 22000, unit: "иж бүрдэл", minOrder: 10, stock: 260,
      short: "Байгалийн будгаар будсан, хүүхдэд аюулгүй модон тоглоом.",
      description: "Хүүхдийн хөгжлийг дэмжих өнгөлөг модон шоо, барилгын иж бүрдэл. Хүүхдэд аюулгүй, хоргүй будаг ашигласан.",
      details: [["Нас", "2 насаас дээш"], ["Бүрдэл", "40 хэсэг"], ["Материал", "Хус мод"], ["Стандарт", "EN71"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/b/bc/A_pile_of_alphabet_wooden_blocks.jpg/960px-A_pile_of_alphabet_wooden_blocks.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:A_pile_of_alphabet_wooden_blocks.jpg\" target=\"_blank\" rel=\"noopener\">Bobjgalindo</a>, Wikimedia Commons, CC BY 4.0"
    },
    {
      id: "p503", category: "kids",
      name: "Хүүхдийн нүүртэй алчуур",
      brand: "Minik Havlu", price: 18500, unit: "ширхэг", minOrder: 20, stock: 700,
      short: "Малгайтай, зөөлөн хөвөн хүүхдийн усны алчуур.",
      description: "Усанд орсны дараа хүүхдийг бүрэн ороох зориулалттай малгайтай алчуур. Ус маш сайн шингээдэг, зөөлөн терри хөвөн.",
      details: [["Хэмжээ", "75 × 75 см"], ["Материал", "100% хөвөн терри"], ["Савлагаа", "Хайрцагт 20 ширхэг"], ["Загвар", "4 төрлийн амьтан"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/4/4b/Doris_Ota_Saito_Terry_towel%2C_hooded.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Doris_Ota_Saito_Terry_towel%2C_hooded.jpg\" target=\"_blank\" rel=\"noopener\">Doris Ota Saito</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p504", category: "kids",
      name: "Хүүхдийн тэрэг",
      brand: "Bebek Yolu", price: 365000, unit: "ширхэг", minOrder: 2, stock: 40,
      short: "Эвхэгддэг, хөнгөн, хоёр чиглэлд суудал эргэдэг хүүхдийн тэрэг.",
      description: "Хөнгөн цагаан хүрээтэй, нэг гараар эвхэгддэг хүүхдийн тэрэг. Суудал нь хэвтэх байрлалд ордог, нарны халхавчтай, сагстай.",
      details: [["Нас", "Төрсөнөөс 3 нас хүртэл"], ["Жин", "7.8 кг"], ["Хүрээ", "Хөнгөн цагаан"], ["Баталгаа", "1 жил"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/81/Stroller_or_pram_pic5.JPG/960px-Stroller_or_pram_pic5.JPG",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Stroller_or_pram_pic5.JPG\" target=\"_blank\" rel=\"noopener\">Alf van Beem</a>, Wikimedia Commons, CC0"
    },

    /* Ахуйн хэрэглээ */
    {
      id: "p601", category: "household", featured: true,
      name: "Угаалгын нунтаг 6 кг",
      brand: "Beyaz Ev", price: 42000, unit: "уут", minOrder: 10, stock: 900,
      short: "Цагаан болон өнгөт хувцсанд тохирох автомат угаалгын нунтаг.",
      description: "Хүйтэн усанд ч сайн угаадаг, толбо арилгах идэвхтэй бодистой нунтаг. 6 кг савлагаа нь 80 удаагийн угаалгад хүрнэ.",
      details: [["Жин", "6 кг"], ["Хэрэглээ", "Автомат машин"], ["Савлагаа", "Хайрцагт 3 уут"], ["Үнэр", "Хаврын цэцэг"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5e/Oxydol_Soap_Powder_-_TWCMS-G3776_%2816507577399%29.jpg/960px-Oxydol_Soap_Powder_-_TWCMS-G3776_%2816507577399%29.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Oxydol_Soap_Powder_-_TWCMS-G3776_%2816507577399%29.jpg\" target=\"_blank\" rel=\"noopener\">Tyne &amp; Wear Archives &amp; Museums</a>, Wikimedia Commons, Нээлттэй"
    },
    {
      id: "p602", category: "household",
      name: "Аяга угаагч шингэн 1.5 л",
      brand: "Temiz Ev", price: 9800, unit: "ширхэг", minOrder: 24, stock: 1800,
      short: "Тосыг хурдан задалдаг, гарт зөөлөн аяга угаагч шингэн.",
      description: "Өтгөрүүлсэн найрлагатай тул бага хэмжээгээр их аяга угаана. Нимбэгний үнэртэй, арьс хуурайшуулахгүй.",
      details: [["Багтаамж", "1.5 л"], ["Үнэр", "Нимбэг"], ["Савлагаа", "Хайрцагт 12 ширхэг"], ["Гарал үүсэл", "Турк"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/71/Afwasmiddel.jpg/960px-Afwasmiddel.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Afwasmiddel.jpg\" target=\"_blank\" rel=\"noopener\">M.Minderhoud</a>, Wikimedia Commons, CC BY SA 3.0"
    },
    {
      id: "p603", category: "household",
      name: "Гал тогооны цаасан алчуур",
      brand: "Marmara Kağıt", price: 14500, unit: "8 боодол", minOrder: 20, stock: 1400,
      short: "Гурван давхар, ус сайн шингээдэг цаасан алчуур.",
      description: "Бат бөх, гурван давхар цаасан алчуур. Гал тогоо, ресторан, оффисын хэрэглээнд тохиромжтой.",
      details: [["Давхар", "3 давхар"], ["Боодол", "8 ороомог"], ["Савлагаа", "Шуудайд 6 боодол"], ["Материал", "100% целлюлоз"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/5c/Toilet_paper_rolls_and_paper_towel_rolls_stacked_in_the_corner_of_an_orange_bathroom.jpg/960px-Toilet_paper_rolls_and_paper_towel_rolls_stacked_in_the_corner_of_an_orange_bathroom.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Toilet_paper_rolls_and_paper_towel_rolls_stacked_in_the_corner_of_an_orange_bathroom.jpg\" target=\"_blank\" rel=\"noopener\">Ser Amantio di Nicolao</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p604", category: "household",
      name: "Зэвэрдэггүй ган угаалтуур сойз",
      brand: "Mutfak Pro", price: 3200, unit: "ширхэг", minOrder: 100, stock: 5000,
      short: "Тогоо, хайруулын тавган дээрх хатсан бохирдлыг арилгана.",
      description: "Зэвэрдэггүй ган утсаар хийсэн угаалтуур. Удаан эдэлгээтэй, зэв үүсгэдэггүй.",
      details: [["Материал", "Зэвэрдэггүй ган"], ["Жин", "40 г"], ["Савлагаа", "Хайрцагт 100 ширхэг"], ["Хэрэглээ", "Гал тогоо"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8d/Steel-wool.jpg/960px-Steel-wool.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Steel-wool.jpg\" target=\"_blank\" rel=\"noopener\">Johan</a>, Wikimedia Commons, CC BY SA 3.0"
    },

    /* Бусад */
    {
      id: "p701", category: "other", featured: true,
      name: "Турк амттан лукум",
      brand: "Lokum Evi", price: 18000, unit: "500 г хайрцаг", minOrder: 24, stock: 1200,
      short: "Самар, сарнай, анарын амттай уламжлалт Турк амттан.",
      description: "Олон үеийн турш уламжлагдсан жороор хийсэн лукум. Хушга, пистачио болон сарнайн амтыг хослуулсан холимог хайрцаг.",
      details: [["Жин", "500 г"], ["Амт", "Холимог"], ["Савлагаа", "Хайрцагт 24 ширхэг"], ["Хадгалах хугацаа", "12 сар"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Turkish_Delight_lokum.jpg/960px-Turkish_Delight_lokum.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Turkish_Delight_lokum.jpg\" target=\"_blank\" rel=\"noopener\">Chris Brown</a>, Wikimedia Commons, CC BY 2.0"
    },
    {
      id: "p702", category: "other", featured: true,
      name: "Пистачиотой пахлава",
      brand: "Gaziantep Baklava", price: 52000, unit: "1 кг хайрцаг", minOrder: 10, stock: 300,
      short: "Газиантепийн пистачиогоор хийсэн шинэхэн пахлава.",
      description: "Нимгэн давхаргат зуурмаг, Газиантепийн ногоон пистачио, цөцгийн тосоор хийсэн уламжлалт амттан. Агаарын тээврээр долоо хоног бүр ирнэ.",
      details: [["Жин", "1 кг"], ["Хадгалах хугацаа", "21 хоног"], ["Савлагаа", "Металл хайрцаг"], ["Тээвэр", "Долоо хоног бүр"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/Pistachio_Baklava_from_Sarigerme%2C_Turkey_%2849070918302%29.jpg/960px-Pistachio_Baklava_from_Sarigerme%2C_Turkey_%2849070918302%29.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Pistachio_Baklava_from_Sarigerme%2C_Turkey_%2849070918302%29.jpg\" target=\"_blank\" rel=\"noopener\">dronepicr</a>, Wikimedia Commons, CC BY 2.0"
    },
    {
      id: "p703", category: "other",
      name: "Нунтагласан Турк кофе",
      brand: "Kahve Ocağı", price: 16500, unit: "250 г", minOrder: 24, stock: 1500,
      short: "Маш нарийн нунтагласан, жезвед чанах зориулалттай кофе.",
      description: "Бразилийн арабика үрийг шарж, Турк аргаар маш нарийн нунтагласан кофе. Өтгөн хөөсөрхөг, анхилуун үнэртэй.",
      details: [["Жин", "250 г"], ["Үр", "100% арабика"], ["Савлагаа", "Хайрцагт 24 ширхэг"], ["Хадгалах хугацаа", "18 сар"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Turkish_Coffee_with_Crema.jpg/960px-Turkish_Coffee_with_Crema.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Turkish_Coffee_with_Crema.jpg\" target=\"_blank\" rel=\"noopener\">Garrett Ziegler</a>, Wikimedia Commons, CC BY SA 4.0"
    },
    {
      id: "p704", category: "other",
      name: "Назар бонжук сахиус",
      brand: "Nazar Cam", price: 2500, unit: "ширхэг", minOrder: 100, stock: 6000,
      short: "Гар аргаар үлээсэн цэнхэр шилэн Турк сахиус.",
      description: "Муу нүднээс хамгаална гэж итгэдэг Туркийн алдартай бэлэг дурсгалын зүйл. Түлхүүрийн оосор, ханын чимэглэл болгон ашиглана.",
      details: [["Диаметр", "5 см"], ["Материал", "Шил"], ["Савлагаа", "Хайрцагт 100 ширхэг"], ["Хэрэглээ", "Бэлэг дурсгал"]],
      image: "https://upload.wikimedia.org/wikipedia/commons/thumb/7/78/Nazar_boncu%C4%9Fu.jpg/960px-Nazar_boncu%C4%9Fu.jpg",
      credit: "<a href=\"https://commons.wikimedia.org/wiki/File:Nazar_boncu%C4%9Fu.jpg\" target=\"_blank\" rel=\"noopener\">Eylulkizil</a>, Wikimedia Commons, CC BY SA 4.0"
    }
  ]
};
