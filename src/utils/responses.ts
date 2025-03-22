import { ContextAnalysis, CommunicationStyle } from '../types';

const RESPONSES = {
  eng: {
    technical: {
      positive: [
        "That's a great technical insight! Let me elaborate on that...",
        "You've got a solid understanding of the technical aspects. Here's what I think...",
        "Excellent technical observation! I can help you explore this further.",
      ],
      negative: [
        "I understand your technical concerns. Let's work through this together.",
        "I see the technical challenges you're facing. Here's a potential solution...",
        "Let's break down this technical issue and solve it step by step.",
      ],
      neutral: [
        "Let's analyze this technical aspect in detail.",
        "I can help you understand this technical concept better.",
        "Here's my technical perspective on this matter.",
      ],
    },
    personal: {
      positive: [
        "I'm glad you're feeling positive about this! Tell me more.",
        "That's wonderful to hear! Would you like to explore this further?",
        "Your enthusiasm is contagious! Let's discuss this more.",
      ],
      negative: [
        "I understand how you feel. Would you like to talk about it?",
        "I'm here to listen and help if I can.",
        "Let's work through this together and find a positive path forward.",
      ],
      neutral: [
        "I appreciate you sharing your thoughts with me.",
        "That's an interesting perspective. Could you tell me more?",
        "I'd like to understand your viewpoint better.",
      ],
    },
    greeting: {
      positive: ["Hello! It's great to see your enthusiasm!", "Hi there! You seem in good spirits!"],
      negative: ["Hello! I'm here to help if something's troubling you.", "Hi! Let's turn this day around together."],
      neutral: ["Hello! How can I assist you today?", "Hi there! What's on your mind?"],
    },
    farewell: {
      positive: ["Goodbye! Keep that positive energy!", "Take care! It was great chatting with you!"],
      negative: ["Goodbye! I hope things look up soon.", "Take care! Remember, tomorrow is a new day."],
      neutral: ["Goodbye! Have a great day!", "Take care! Feel free to chat again anytime."],
    },
    question: {
      what: ["Let me explain that for you...", "Here's what you need to know..."],
      why: ["The reason for that is...", "Let me explain why..."],
      how: ["Here's how it works...", "The process involves..."],
      when: ["The timing depends on...", "Let me check the timeline..."],
      where: ["The location is...", "You can find that..."],
      who: ["The person responsible is...", "That involves..."],
      yes_no: ["Yes, because...", "No, because..."],
    },
  },
  spa: {
    technical: {
      positive: [
        "¡Excelente observación técnica! Permíteme elaborar...",
        "Tienes un buen entendimiento de los aspectos técnicos. Esto es lo que pienso...",
        "¡Muy buena perspectiva técnica! Podemos explorar esto más a fondo.",
      ],
      negative: [
        "Entiendo tus preocupaciones técnicas. Trabajemos juntos en esto.",
        "Veo los desafíos técnicos que enfrentas. Aquí hay una posible solución...",
        "Analicemos este problema técnico paso a paso.",
      ],
      neutral: [
        "Analicemos este aspecto técnico en detalle.",
        "Puedo ayudarte a entender mejor este concepto técnico.",
        "Aquí está mi perspectiva técnica sobre este asunto.",
      ],
    },
    personal: {
      positive: [
        "¡Me alegra que te sientas positivo! Cuéntame más.",
        "¡Qué maravilloso! ¿Te gustaría explorar esto más a fondo?",
        "¡Tu entusiasmo es contagioso! Hablemos más sobre esto.",
      ],
      negative: [
        "Entiendo cómo te sientes. ¿Quieres hablar sobre ello?",
        "Estoy aquí para escucharte y ayudar si puedo.",
        "Trabajemos juntos para encontrar una solución positiva.",
      ],
      neutral: [
        "Aprecio que compartas tus pensamientos conmigo.",
        "Es una perspectiva interesante. ¿Podrías contarme más?",
        "Me gustaría entender mejor tu punto de vista.",
      ],
    },
    greeting: {
      positive: ["¡Hola! ¡Me alegra ver tu entusiasmo!", "¡Hola! ¡Pareces estar de buen humor!"],
      negative: ["¡Hola! Estoy aquí para ayudar si algo te preocupa.", "¡Hola! Juntos podemos mejorar este día."],
      neutral: ["¡Hola! ¿En qué puedo ayudarte hoy?", "¡Hola! ¿Qué tienes en mente?"],
    },
    farewell: {
      positive: ["¡Adiós! ¡Mantén esa energía positiva!", "¡Cuídate! ¡Fue genial charlar contigo!"],
      negative: ["¡Adiós! Espero que las cosas mejoren pronto.", "¡Cuídate! Recuerda, mañana es un nuevo día."],
      neutral: ["¡Adiós! ¡Que tengas un excelente día!", "¡Cuídate! No dudes en volver a charlar cuando quieras."],
    },
    question: {
      what: ["Déjame explicarte eso...", "Esto es lo que necesitas saber..."],
      why: ["La razón es...", "Déjame explicarte por qué..."],
      how: ["Así es como funciona...", "El proceso implica..."],
      when: ["El momento depende de...", "Déjame verificar el cronograma..."],
      where: ["La ubicación es...", "Puedes encontrarlo en..."],
      who: ["La persona responsable es...", "Esto involucra a..."],
      yes_no: ["Sí, porque...", "No, porque..."],
    },
  },
  fra: {
    technical: {
      positive: [
        "Excellente observation technique ! Permettez-moi de développer...",
        "Vous avez une bonne compréhension des aspects techniques. Voici ce que j'en pense...",
        "Très bonne perspective technique ! Nous pouvons approfondir cela.",
      ],
      negative: [
        "Je comprends vos préoccupations techniques. Travaillons ensemble sur ce point.",
        "Je vois les défis techniques auxquels vous faites face. Voici une solution possible...",
        "Analysons ce problème technique étape par étape.",
      ],
      neutral: [
        "Analysons cet aspect technique en détail.",
        "Je peux vous aider à mieux comprendre ce concept technique.",
        "Voici ma perspective technique sur cette question.",
      ],
    },
    personal: {
      positive: [
        "Je suis ravi(e) que vous soyez positif ! Dites-m'en plus.",
        "C'est merveilleux ! Voulez-vous approfondir ce sujet ?",
        "Votre enthousiasme est contagieux ! Parlons-en davantage.",
      ],
      negative: [
        "Je comprends ce que vous ressentez. Voulez-vous en parler ?",
        "Je suis là pour vous écouter et vous aider si possible.",
        "Travaillons ensemble pour trouver une solution positive.",
      ],
      neutral: [
        "J'apprécie que vous partagiez vos pensées avec moi.",
        "C'est une perspective intéressante. Pourriez-vous m'en dire plus ?",
        "J'aimerais mieux comprendre votre point de vue.",
      ],
    },
    greeting: {
      positive: ["Bonjour ! Ravi(e) de voir votre enthousiasme !", "Bonjour ! Vous semblez de bonne humeur !"],
      negative: ["Bonjour ! Je suis là pour vous aider si quelque chose vous préoccupe.", "Bonjour ! Ensemble, nous pouvons améliorer cette journée."],
      neutral: ["Bonjour ! Comment puis-je vous aider aujourd'hui ?", "Bonjour ! Qu'avez-vous à l'esprit ?"],
    },
    farewell: {
      positive: ["Au revoir ! Gardez cette énergie positive !", "Prenez soin de vous ! C'était un plaisir de discuter !"],
      negative: ["Au revoir ! J'espère que les choses s'amélioreront bientôt.", "Prenez soin de vous ! N'oubliez pas, demain est un nouveau jour."],
      neutral: ["Au revoir ! Passez une excellente journée !", "Prenez soin de vous ! N'hésitez pas à revenir discuter."],
    },
    question: {
      what: ["Laissez-moi vous expliquer cela...", "Voici ce que vous devez savoir..."],
      why: ["La raison est...", "Laissez-moi vous expliquer pourquoi..."],
      how: ["Voici comment cela fonctionne...", "Le processus implique..."],
      when: ["Le moment dépend de...", "Laissez-moi vérifier le calendrier..."],
      where: ["L'emplacement est...", "Vous pouvez le trouver..."],
      who: ["La personne responsable est...", "Cela implique..."],
      yes_no: ["Oui, parce que...", "Non, parce que..."],
    },
  },
  deu: {
    technical: {
      positive: [
        "Ausgezeichnete technische Beobachtung! Lassen Sie mich das näher erläutern...",
        "Sie haben ein gutes Verständnis der technischen Aspekte. Hier ist meine Meinung...",
        "Sehr gute technische Perspektive! Wir können das weiter vertiefen.",
      ],
      negative: [
        "Ich verstehe Ihre technischen Bedenken. Lassen Sie uns gemeinsam daran arbeiten.",
        "Ich sehe die technischen Herausforderungen, denen Sie gegenüberstehen. Hier ist eine mögliche Lösung...",
        "Analysieren wir dieses technische Problem Schritt für Schritt.",
      ],
      neutral: [
        "Lassen Sie uns diesen technischen Aspekt im Detail analysieren.",
        "Ich kann Ihnen helfen, dieses technische Konzept besser zu verstehen.",
        "Hier ist meine technische Perspektive zu dieser Angelegenheit.",
      ],
    },
    personal: {
      positive: [
        "Ich freue mich, dass Sie so positiv gestimmt sind! Erzählen Sie mehr.",
        "Das ist wunderbar! Möchten Sie das Thema vertiefen?",
        "Ihre Begeisterung ist ansteckend! Lassen Sie uns mehr darüber sprechen.",
      ],
      negative: [
        "Ich verstehe, wie Sie sich fühlen. Möchten Sie darüber sprechen?",
        "Ich bin hier, um zuzuhören und zu helfen, wenn ich kann.",
        "Lassen Sie uns gemeinsam eine positive Lösung finden.",
      ],
      neutral: [
        "Ich schätze, dass Sie Ihre Gedanken mit mir teilen.",
        "Das ist eine interessante Perspektive. Können Sie mir mehr darüber erzählen?",
        "Ich würde Ihren Standpunkt gerne besser verstehen.",
      ],
    },
    greeting: {
      positive: ["Hallo! Schön zu sehen, dass Sie so enthusiastisch sind!", "Hallo! Sie scheinen gut gelaunt zu sein!"],
      negative: ["Hallo! Ich bin hier, um zu helfen, wenn Sie etwas bedrückt.", "Hallo! Gemeinsam können wir diesen Tag verbessern."],
      neutral: ["Hallo! Wie kann ich Ihnen heute helfen?", "Hallo! Was haben Sie auf dem Herzen?"],
    },
    farewell: {
      positive: ["Auf Wiedersehen! Behalten Sie diese positive Energie!", "Machen Sie's gut! Es war schön, mit Ihnen zu plaudern!"],
      negative: ["Auf Wiedersehen! Ich hoffe, die Dinge werden bald besser.", "Machen Sie's gut! Denken Sie daran, morgen ist ein neuer Tag."],
      neutral: ["Auf Wiedersehen! Haben Sie einen schönen Tag!", "Machen Sie's gut! Kommen Sie gerne wieder zum Plaudern vorbei."],
    },
    question: {
      what: ["Lassen Sie mich das erklären...", "Hier ist, was Sie wissen müssen..."],
      why: ["Der Grund dafür ist...", "Lassen Sie mich erklären, warum..."],
      how: ["So funktioniert das...", "Der Prozess beinhaltet..."],
      when: ["Der Zeitpunkt hängt ab von...", "Lassen Sie mich den Zeitplan prüfen..."],
      where: ["Der Standort ist...", "Sie finden das..."],
      who: ["Die verantwortliche Person ist...", "Das betrifft..."],
      yes_no: ["Ja, weil...", "Nein, weil..."],
    },
  },
  ita: {
    technical: {
      positive: [
        "Eccellente osservazione tecnica! Permettimi di elaborare...",
        "Hai una buona comprensione degli aspetti tecnici. Ecco cosa ne penso...",
        "Ottima prospettiva tecnica! Possiamo approfondire questo aspetto.",
      ],
      negative: [
        "Capisco le tue preoccupazioni tecniche. Lavoriamo insieme su questo.",
        "Vedo le sfide tecniche che stai affrontando. Ecco una possibile soluzione...",
        "Analizziamo questo problema tecnico passo dopo passo.",
      ],
      neutral: [
        "Analizziamo questo aspetto tecnico in dettaglio.",
        "Posso aiutarti a capire meglio questo concetto tecnico.",
        "Ecco la mia prospettiva tecnica su questa questione.",
      ],
    },
    personal: {
      positive: [
        "Sono contento che tu sia positivo! Raccontami di più.",
        "Che meraviglioso! Vuoi approfondire questo argomento?",
        "Il tuo entusiasmo è contagioso! Parliamone ancora.",
      ],
      negative: [
        "Capisco come ti senti. Vuoi parlarne?",
        "Sono qui per ascoltare e aiutare se posso.",
        "Lavoriamo insieme per trovare una soluzione positiva.",
      ],
      neutral: [
        "Apprezzo che tu condivida i tuoi pensieri con me.",
        "È una prospettiva interessante. Potresti dirmi di più?",
        "Mi piacerebbe capire meglio il tuo punto di vista.",
      ],
    },
    greeting: {
      positive: ["Ciao! È bello vedere il tuo entusiasmo!", "Ciao! Sembri di buon umore!"],
      negative: ["Ciao! Sono qui per aiutare se qualcosa ti preoccupa.", "Ciao! Insieme possiamo migliorare questa giornata."],
      neutral: ["Ciao! Come posso aiutarti oggi?", "Ciao! Cosa hai in mente?"],
    },
    farewell: {
      positive: ["Arrivederci! Mantieni questa energia positiva!", "Stammi bene! È stato bello chiacchierare!"],
      negative: ["Arrivederci! Spero che le cose migliorino presto.", "Stammi bene! Ricorda, domani è un nuovo giorno."],
      neutral: ["Arrivederci! Buona giornata!", "Stammi bene! Torna a trovarmi quando vuoi."],
    },
    question: {
      what: ["Lascia che ti spieghi...", "Ecco cosa devi sapere..."],
      why: ["Il motivo è...", "Lascia che ti spieghi perché..."],
      how: ["Ecco come funziona...", "Il processo implica..."],
      when: ["Il momento dipende da...", "Lascia che controlli il programma..."],
      where: ["La posizione è...", "Puoi trovarlo..."],
      who: ["La persona responsabile è...", "Questo coinvolge..."],
      yes_no: ["Sì, perché...", "No, perché..."],
    },
  },
  por: {
    technical: {
      positive: [
        "Excelente observação técnica! Permita-me elaborar...",
        "Você tem uma boa compreensão dos aspectos técnicos. Aqui está o que penso...",
        "Ótima perspectiva técnica! Podemos explorar isso mais a fundo.",
      ],
      negative: [
        "Entendo suas preocupações técnicas. Vamos trabalhar juntos nisso.",
        "Vejo os desafios técnicos que você está enfrentando. Aqui está uma possível solução...",
        "Vamos analisar este problema técnico passo a passo.",
      ],
      neutral: [
        "Vamos analisar este aspecto técnico em detalhes.",
        "Posso ajudá-lo a entender melhor este conceito técnico.",
        "Aqui está minha perspectiva técnica sobre este assunto.",
      ],
    },
    personal: {
      positive: [
        "Fico feliz que você esteja positivo! Me conte mais.",
        "Que maravilhoso! Gostaria de explorar isso mais a fundo?",
        "Seu entusiasmo é contagiante! Vamos conversar mais sobre isso.",
      ],
      negative: [
        "Entendo como você se sente. Quer conversar sobre isso?",
        "Estou aqui para ouvir e ajudar se puder.",
        "Vamos trabalhar juntos para encontrar uma solução positiva.",
      ],
      neutral: [
        "Agradeço por compartilhar seus pensamentos comigo.",
        "É uma perspectiva interessante. Pode me contar mais?",
        "Gostaria de entender melhor seu ponto de vista.",
      ],
    },
    greeting: {
      positive: ["Olá! É ótimo ver seu entusiasmo!", "Oi! Você parece estar de bom humor!"],
      negative: ["Olá! Estou aqui para ajudar se algo o preocupa.", "Oi! Juntos podemos melhorar este dia."],
      neutral: ["Olá! Como posso ajudá-lo hoje?", "Oi! O que você tem em mente?"],
    },
    farewell: {
      positive: ["Tchau! Mantenha essa energia positiva!", "Cuide-se! Foi ótimo conversar com você!"],
      negative: ["Tchau! Espero que as coisas melhorem logo.", "Cuide-se! Lembre-se, amanhã é um novo dia."],
      neutral: ["Tchau! Tenha um ótimo dia!", "Cuide-se! Volte para conversar quando quiser."],
    },
    question: {
      what: ["Deixe-me explicar isso...", "Aqui está o que você precisa saber..."],
      why: ["A razão é...", "Deixe-me explicar por quê..."],
      how: ["É assim que funciona...", "O processo envolve..."],
      when: ["O momento depende de...", "Deixe-me verificar o cronograma..."],
      where: ["A localização é...", "Você pode encontrar isso..."],
      who: ["A pessoa responsável é...", "Isso envolve..."],
      yes_no: ["Sim, porque...", "Não, porque..."],
    },
  },
  rus: {
    technical: {
      positive: [
        "Отличное техническое наблюдение! Позвольте мне объяснить подробнее...",
        "У вас хорошее понимание технических аспектов. Вот что я думаю...",
        "Прекрасная техническая перспектива! Давайте рассмотрим это глубже.",
      ],
      negative: [
        "Я понимаю ваши технические опасения. Давайте работать над этим вместе.",
        "Я вижу технические проблемы, с которыми вы сталкиваетесь. Вот возможное решение...",
        "Давайте разберем эту техническую проблему пошагово.",
      ],
      neutral: [
        "Давайте проанализируем этот технический аспект подробно.",
        "Я могу помочь вам лучше понять эту техническую концепцию.",
        "Вот моя техническая перспектива по этому вопросу.",
      ],
    },
    personal: {
      positive: [
        "Я рад, что вы настроены позитивно! Расскажите больше.",
        "Это замечательно! Хотите обсудить это подробнее?",
        "Ваш энтузиазм заразителен! Давайте поговорим об этом больше.",
      ],
      negative: [
        "Я понимаю, как вы себя чувствуете. Хотите поговорить об этом?",
        "Я здесь, чтобы выслушать и помочь, если смогу.",
        "Давайте вместе найдем позитивное решение.",
      ],
      neutral: [
        "Я ценю, что вы делитесь своими мыслями со мной.",
        "Это интересная перспектива. Можете рассказать больше?",
        "Я хотел бы лучше понять вашу точку зрения.",
      ],
    },
    greeting: {
      positive: ["Здравствуйте! Приятно видеть ваш энтузиазм!", "Привет! Вы кажетесь в хорошем настроении!"],
      negative: ["Здравствуйте! Я здесь, чтобы помочь, если что-то беспокоит.", "Привет! Вместе мы можем улучшить этот день."],
      neutral: ["Здравствуйте! Как я могу помочь вам сегодня?", "Привет! Что у вас на уме?"],
    },
    farewell: {
      positive: ["До свидания! Сохраняйте эту позитивную энергию!", "Берегите себя! Было приятно поговорить!"],
      negative: ["До свидания! Надеюсь, скоро всё наладится.", "Берегите себя! Помните, завтра новый день."],
      neutral: ["До свидания! Хорошего дня!", "Берегите себя! Возвращайтесь поговорить в любое время."],
    },
    question: {
      what: ["Позвольте мне объяснить это...", "Вот что вам нужно знать..."],
      why: ["Причина в том, что...", "Позвольте объяснить, почему..."],
      how: ["Вот как это работает...", "Процесс включает..."],
      when: ["Время зависит от...", "Позвольте проверить расписание..."],
      where: ["Местоположение...", "Вы можете найти это..."],
      who: ["Ответственный человек...", "Это касается..."],
      yes_no: ["Да, потому что...", "Нет, потому что..."],
    },
  },
  jpn: {
    technical: {
      positive: [
        "素晴らしい技術的な観察ですね！詳しく説明させていただきます...",
        "技術的な側面をよく理解されていますね。私の考えをお伝えします...",
        "優れた技術的な視点です！もっと深く探ってみましょう。",
      ],
      negative: [
        "技術的な懸念はよく分かります。一緒に取り組んでいきましょう。",
        "直面している技術的な課題が見えます。可能な解決策をご提案します...",
        "この技術的な問題を段階的に分析していきましょう。",
      ],
      neutral: [
        "この技術的な側面を詳しく分析しましょう。",
        "この技術的な概念の理解をお手伝いできます。",
        "この件について、技術的な観点から私の見解をお伝えします。",
      ],
    },
    personal: {
      positive: [
        "そのポジティブな姿勢は素晴らしいですね！もっと教えてください。",
        "素晴らしいですね！もっと詳しくお話しされますか？",
        "そのような熱意は素晴らしいですね！もっとお話ししましょう。",
      ],
      negative: [
        "お気持ちはよく分かります。お話ししてみませんか？",
        "お話を伺い、できる限りお手伝いさせていただきます。",
        "一緒にポジティブな解決策を見つけていきましょう。",
      ],
      neutral: [
        "お考えを共有していただき、ありがとうございます。",
        "興味深い視点ですね。もっと詳しくお聞かせいただけますか？",
        "あなたの視点をもっと理解させていただきたいです。",
      ],
    },
    greeting: {
      positive: ["こんにちは！その熱意を拝見できて嬉しいです！", "こんにちは！ご機嫌よさそうですね！"],
      negative: ["こんにちは！何かお困りでしたら、お手伝いさせていただきます。", "こんにちは！一緒にこの日をより良いものにしていきましょう。"],
      neutral: ["こんにちは！本日はどのようなお手伝いができますか？", "こんにちは！何かお考えのことはありますか？"],
    },
    farewell: {
      positive: ["さようなら！その前向きな気持ちを大切にしてください！", "お気をつけて！お話できて楽しかったです！"],
      negative: ["さようなら！状況が良くなることを願っています。", "お気をつけて！明日は新しい日になりますよ。"],
      neutral: ["さようなら！良い一日をお過ごしください！", "お気をつけて！また気軽にお話しください。"],
    },
    question: {
      what: ["ご説明させていただきます...", "こちらが重要なポイントです..."],
      why: ["理由は...", "なぜかと申しますと..."],
      how: ["こちらが手順です...", "プロセスには以下が含まれます..."],
      when: ["タイミングは次第です...", "スケジュールを確認させていただきます..."],
      where: ["場所は...", "こちらでお探しいただけます..."],
      who: ["担当者は...", "関係者は..."],
      yes_no: ["はい、なぜなら...", "いいえ、なぜなら..."],
    },
  },
  kor: {
    technical: {
      positive: [
        "훌륭한 기술적 관찰이네요! 자세히 설명해 드리겠습니다...",
        "기술적 측면을 잘 이해하고 계시네요. 제 생각을 말씀드리자면...",
        "뛰어난 기술적 관점이에요! 더 자세히 살펴보시겠어요?",
      ],
      negative: [
        "기술적 우려 사항을 이해합니다. 함께 해결해 보시죠.",
        "직면하신 기술적 과제가 보입니다. 가능한 해결책을 제시해 드리겠습니다...",
        "이 기술적 문제를 단계별로 분석해 보겠습니다.",
      ],
      neutral: [
        "이 기술적 측면을 자세히 분석해 보겠습니다.",
        "이 기술적 개념을 더 잘 이해하실 수 있도록 도와드리겠습니다.",
        "이 문제에 대한 제 기술적 관점을 말씀드리겠습니다.",
      ],
    },
    personal: {
      positive: [
        "긍정적인 태도가 보기 좋네요! 더 말씀해 주세요.",
        "멋집니다! 이 주제에 대해 더 이야기해 보시겠어요?",
        "당신의 열정이 전해지네요! 더 이야기 나눠보아요.",
      ],
      negative: [
        "그런 감정을 이해합니다. 이야기 나누고 싶으신가요?",
        "제가 들어드리고 도움이 될 수 있다면 돕겠습니다.",
        "함께 긍정적인 해결책을 찾아보아요.",
      ],
      neutral: [
        "생각을 공유해 주셔서 감사합니다.",
        "흥미로운 관점이네요. 더 자세히 말씀해 주시겠어요?",
        "당신의 관점을 더 잘 이해하고 싶습니다.",
      ],
    },
    greeting: {
      positive: ["안녕하세요! 열정적인 모습이  보기 좋네요!", "안녕하세요! 기분이 좋아 보이시네요!"],
      negative: ["안녕하세요! 걱정되는 일이 있다면 도와드리겠습니다.", "안녕하세요! 함께 이 날을 더 좋게 만들어보아요."],
      neutral: ["안녕하세요! 오늘은 어떤 도움이 필요하신가요?", "안녕하세요! 무슨 생각을 하고 계신가요?"],
    },
    farewell: {
      positive: ["안녕히 가세요! 그 긍정적인 에너지를 유지하세요!", "잘 가세요! 대화 나눌 수 있어 즐거웠어요!"],
      negative: ["안녕히 가세요! 곧 상황이 나아지길 바랍니다.", "잘 가세요! 내일은 새로운 날이 될 거예요."],
      neutral: ["안녕히 가세요! 좋은 하루 보내세요!", "잘 가세요! 언제든 다시 이야기 나누어요."],
    },
    question: {
      what: ["설명해 드리겠습니다...", "알아야 할 내용은 다음과 같습니다..."],
      why: ["이유는...", "왜 그런지 설명해 드리면..."],
      how: ["다음과 같이 작동합니다...", "과정은 다음과 같습니다..."],
      when: ["시기는 다음에 따라 다릅니다...", "일정을 확인해 보겠습니다..."],
      where: ["위치는...", "다음에서 찾으실 수 있습니다..."],
      who: ["담당자는...", "관련된 사람은..."],
      yes_no: ["네, 왜냐하면...", "아니오, 왜냐하면..."],
    },
  },
  chi: {
    technical: {
      positive: [
        "很好的技术观察！让我详细说明...",
        "您对技术方面有很好的理解。这是我的想法...",
        "出色的技术视角！我们可以深入探讨。",
      ],
      negative: [
        "我理解您的技术顾虑。让我们一起解决这个问题。",
        "我看到您面临的技术挑战。这里有一个可能的解决方案...",
        "让我们逐步分析这个技术问题。",
      ],
      neutral: [
        "让我们详细分析这个技术方面。",
        "我可以帮助您更好地理解这个技术概念。",
        "这是我对这个问题的技术观点。",
      ],
    },
    personal: {
      positive: [
        "很高兴看到您这么积极！告诉我更多。",
        "太棒了！您想深入探讨这个话题吗？",
        "您的热情真是感染人！让我们多聊聊。",
      ],
      negative: [
        "我理解您的感受。您想谈谈吗？",
        "我在这里倾听，如果可以的话我会帮忙。",
        "让我们一起找到积极的解决方案。",
      ],
      neutral: [
        "感谢您与我分享您的想法。",
        "这是个有趣的观点。您能告诉我更多吗？",
        "我想更好地理解您的观点。",
      ],
    },
    greeting: {
      positive: ["你好！很高兴看到您这么有热情！", "你好！您看起来心情不错！"],
      negative: ["你好！如果有什么困扰您的事，我可以帮忙。", "你好！让我们一起让这一天变得更好。"],
      neutral: ["你好！今天我能帮您什么？", "你好！您在想什么？"],
    },
    farewell: {
      positive: ["再见！保持这种积极的能量！", "保重！很高兴能和您聊天！"],
      negative: ["再见！希望情况很快会好转。", "保重！记住，明天是新的一天。"],
      neutral: ["再见！祝您有愉快的一天！", "保重！随时欢迎再来聊天。"],
    },
    question: {
      what: ["让我解释一下...", "这是您需要知道的..."],
      why: ["原因是...", "让我解释为什么..."],
      how: ["这是运作方式...", "过程包括..."],
      when: ["时间取决于...", "让我检查一下时间表..."],
      where: ["位置在...", "您可以在这里找到..."],
      who: ["负责人是...", "这涉及到..."],
      yes_no: ["是的，因为...", "不是，因为..."],
    },
  },
  ara: {
    technical: {
      positive: [
        "ملاحظة تقنية ممتازة! دعني أوضح بالتفصيل...",
        "لديك فهم جيد للجوانب التقنية. إليك ما أفكر به...",
        "وجهة نظر تقنية رائعة! يمكننا استكشاف هذا بعمق أكبر.",
      ],
      negative: [
        "أتفهم مخاوفك التقنية. دعنا نعمل على هذا معاً.",
        "أرى التحديات التقنية التي تواجهها. إليك حل محتمل...",
        "دعنا نحلل هذه المشكلة التقنية خطوة بخطوة.",
      ],
      neutral: [
        "دعنا نحلل هذا الجانب التقني بالتفصيل.",
        "يمكنني مساعدتك في فهم هذا المفهوم التقني بشكل أفضل.",
        "إليك وجهة نظري التقنية حول هذه المسألة.",
      ],
    },
    personal: {
      positive: [
        "يسعدني أن أراك متفائلاً! أخبرني المزيد.",
        "هذا رائع! هل تود استكشاف هذا الموضوع أكثر؟",
        "حماسك معدي! دعنا نتحدث أكثر عن هذا.",
      ],
      negative: [
        "أتفهم شعورك. هل تريد التحدث عن ذلك؟",
        "أنا هنا للاستماع والمساعدة إن استطعت.",
        "دعنا نعمل معاً لإيجاد حل إيجابي.",
      ],
      neutral: [
        "أقدر مشاركتك أفكارك معي.",
        "وجهة نظر مثيرة للاهتمام. هل يمكنك إخباري المزيد؟",
        "أود فهم وجهة نظرك بشكل أفضل.",
      ],
    },
    greeting: {
      positive: ["مرحباً! يسعدني رؤية حماسك!", "أهلاً! يبدو أنك في مزاج جيد!"],
      negative: ["مرحباً! أنا هنا للمساعدة إذا كان هناك ما يقلقك.", "أهلاً! معاً يمكننا تحسين هذا اليوم."],
      neutral: ["مرحباً! كيف يمكنني مساعدتك اليوم؟", "أهلاً! ما الذي يدور في ذهنك؟"],
    },
    farewell: {
      positive: ["مع السلامة! حافظ على هذه الطاقة الإيجابية!", "اعتني بنفسك! كان من الرائع التحدث معك!"],
      negative: ["مع السلامة! آمل أن تتحسن الأمور قريباً.", "اعتني بنفسك! تذكر، غداً يوم جديد."],
      neutral: ["مع السلامة! أتمنى لك يوماً سعيداً!", "اعتني بنفسك! لا تتردد في العودة للدردشة متى شئت."],
    },
    question: {
      what: ["دعني أشرح ذلك...", "إليك ما تحتاج معرفته..."],
      why: ["السبب هو...", "دعني أشرح لماذا..."],
      how: ["هكذا يعمل...", "تتضمن العملية..."],
      when: ["يعتمد الوقت على...", "دعني أتحقق من الجدول الزمني..."],
      where: ["الموقع هو...", "يمكنك العثور عليه..."],
      who: ["الشخص المسؤول هو...", "هذا يتعلق بـ..."],
      yes_no: ["نعم، لأن...", "لا، لأن..."],
    },
  },
  hin: {
    technical: {
      positive: [
        "बहुत अच्छी तकनीकी समझ है! मैं विस्तार से बताता हूं...",
        "आपकी तकनीकी समझ बहुत अच्छी है। मेरा विचार है...",
        "उत्कृष्ट तकनीकी दृष्टिकोण! इसे और गहराई से समझते हैं।",
      ],
      negative: [
        "मैं आपकी तकनीकी चिंताओं को समझता हूं। आइए मिलकर इस पर काम करें।",
        "मैं देख रहा हूं कि आप किन तकनीकी चुनौतियों का सामना कर रहे हैं। यहां एक संभावित समाधान है...",
        "आइए इस तकनीकी समस्या को चरण-दर-चरण समझें।",
      ],
      neutral: [
        "आइए इस तकनीकी पहलू का विस्तार से विश्लेषण करें।",
        "मैं आपको इस तकनीकी अवधारणा को बेहतर समझने में मदद कर सकता हूं।",
        "इस विषय पर मेरा तकनीकी दृष्टिकोण यह है।",
      ],
    },
    personal: {
      positive: [
        "खुशी है कि आप सकारात्मक हैं! और बताइए।",
        "बहुत बढ़िया! क्या आप इस विषय पर और चर्चा करना चाहेंगे?",
        "आपका उत्साह संक्रामक है! चलिए इस पर और बात करते हैं।",
      ],
      negative: [
        "मैं समझता हूं आप कैसा महसूस कर रहे हैं। क्या आप इस बारे में बात करना चाहेंगे?",
        "मैं सुनने और मदद करने के लिए यहां हूं।",
        "आइए मिलकर एक सकारात्मक समाधान खोजें।",
      ],
      neutral: [
        "आपने अपने विचार साझा किए, इसकी मैं सराहना करता हूं।",
        "यह एक दिलचस्प दृष्टिकोण है। क्या आप और बता सकते हैं?",
        "मैं आपके दृष्टिकोण को बेहतर समझना चाहूंगा।",
      ],
    },
    greeting: {
      positive: ["नमस्ते! आपका उत्साह देखकर अच्छा लगा!", "नमस्ते! आप अच्छे मूड में दिख रहे हैं!"],
      negative: ["नमस्ते! अगर कोई परेशानी है तो मैं मदद के लिए यहां हूं।", "नमस्ते! आइए मिलकर इस दिन को बेहतर बनाएं।"],
      neutral: ["नमस्ते! आज मैं आपकी कैसे मदद कर सकता हूं?", "नमस्ते! आप क्या सोच रहे हैं?"],
    },
    farewell: {
      positive: ["अलविदा! यही सकारात्मक ऊर्जा बनाए रखें!", "ख्याल रखिएगा! आपसे बात करके अच्छा लगा!"],
      negative: ["अलविदा! उम्मीद है जल्द ही सब ठीक हो जाएगा।", "ख्याल रखिएगा! याद रखें, कल एक नया दिन है।"],
      neutral: ["अलविदा! आपका दिन शुभ हो!", "ख्याल रखिएगा! फिर से बात करने के लिए कभी भी आ सकते हैं।"],
    },
    question: {
      what: ["मैं समझाता हूं...", "यह जानना जरूरी है..."],
      why: ["इसका कारण है...", "मैं बताता हूं क्यों..."],
      how: ["यह कैसे काम करता है...", "प्रक्रिया में शामिल है..."],
      when: ["समय निर्भर करता है...", "मैं समय-सारिणी देख लेता हूं..."],
      where: ["स्थान है...", "आप इसे यहां पा सकते हैं..."],
      who: ["जिम्मेदार व्यक्ति है...", "इससे संबंधित है..."],
      yes_no: ["हां, क्योंकि...", "नहीं, क्योंकि..."],
    },
  },
};

export const SUPPORTED_LANGUAGES = [
  { code: 'eng', name: 'English' },
  { code: 'spa', name: 'Español' },
  { code: 'fra', name: 'Français' },
  { code: 'deu', name: 'Deutsch' },
  { code: 'ita', name: 'Italiano' },
  { code: 'por', name: 'Português' },
  { code: 'rus', name: 'Русский' },
  { code: 'jpn', name: '日本語' },
  { code: 'kor', name: '한국어' },
  { code: 'chi', name: '中文' },
  { code: 'ara', name: 'العربية' },
  { code: 'hin', name: 'हिन्दी' },
] as const;

export type SupportedLanguage = typeof SUPPORTED_LANGUAGES[number]['code'];

function adaptResponseStyle(response: string, style: CommunicationStyle): string {
  let adaptedResponse = response;

  // Match formality
  if (style.formality === 'informal') {
    adaptedResponse = adaptedResponse
      .replace('would you like', 'wanna')
      .replace('going to', 'gonna')
      .replace('Hello', 'Hey')
      .toLowerCase();
  }

  // Match emotional intensity
  if (style.emotionalIntensity === 'high') {
    adaptedResponse = adaptedResponse.replace(/[.!]$/g, '!!!');
  } else if (style.emotionalIntensity === 'low') {
    adaptedResponse = adaptedResponse.replace(/!+/g, '.');
  }

  // Match message style
  if (style.messageStyle.hasEmoji) {
    adaptedResponse += ' 😊';
  }

  if (style.messageStyle.hasAbbreviations) {
    adaptedResponse = adaptedResponse
      .replace('want to', 'wanna')
      .replace('going to', 'gonna')
      .replace('in my opinion', 'imo')
      .replace('to be honest', 'tbh');
  }

  if (style.messageStyle.isAllCaps) {
    adaptedResponse = adaptedResponse.toUpperCase();
  }

  // Match response length
  if (style.responseLength === 'short') {
    adaptedResponse = adaptedResponse.split('.')[0] + '.';
  } else if (style.responseLength === 'long' && adaptedResponse.length < 100) {
    adaptedResponse += ' Would you like me to elaborate further on this topic?';
  }

  return adaptedResponse;
}

export function generateContextualResponse(analysis: ContextAnalysis & { communicationStyle: CommunicationStyle }, language: string = 'eng'): string {
  const responses = RESPONSES[language as keyof typeof RESPONSES] || RESPONSES.eng;
  
  let baseResponse: string;
  
  if (analysis.questionType) {
    const questionResponses = responses.question[analysis.questionType];
    baseResponse = questionResponses[Math.floor(Math.random() * questionResponses.length)];
  } else if (analysis.topic === 'greeting' || analysis.topic === 'farewell') {
    const topicResponses = responses[analysis.topic as keyof typeof responses];
    baseResponse = topicResponses[analysis.sentiment][Math.floor(Math.random() * topicResponses[analysis.sentiment].length)];
  } else {
    const topicResponses = responses[analysis.topic as keyof typeof responses] || responses.personal;
    baseResponse = topicResponses[analysis.sentiment][Math.floor(Math.random() * topicResponses[analysis.sentiment].length)];
  }

  return adaptResponseStyle(baseResponse, analysis.communicationStyle);
}